const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;


const users = {};
const tokens = {};
const games = {};

const GRID_SIZE = 10;
const OBSTACLES_COUNT = 12; 



function makeToken() { return uuidv4(); }
function now() { return new Date().toISOString(); }

function placeObstacles() {
  const obs = new Set();
  while (obs.size < OBSTACLES_COUNT) {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    
    if ((x === 0 && y === 0) || (x === GRID_SIZE - 1 && y === GRID_SIZE - 1)) continue;
    obs.add(`${x},${y}`);
  }
  return Array.from(obs).map(s => {
    const [x, y] = s.split(',').map(Number);
    return { x, y };
  });
}

function manhattan(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function inBounds(pos) {
  return pos.x >= 0 && pos.x < GRID_SIZE && pos.y >= 0 && pos.y < GRID_SIZE;
}

function occupiedByObstacle(pos, game) {
  return game.obstacles.some(o => o.x === pos.x && o.y === pos.y);
}

function positionsEqual(a, b) {
  return a.x === b.x && a.y === b.y;
}

function getOpponent(game, playerId) {
  if (!game.players || game.players.length < 2) return null;
  return game.players.find(p => p.id !== playerId) || null;
}

function computeValidMoves(playerPos, game) {
  const deltas = { up: {x:0,y:-1}, down: {x:0,y:1}, left: {x:-1,y:0}, right: {x:1,y:0} };
  const valid = {};
  for (const [dir, d] of Object.entries(deltas)) {
    const p = {x: playerPos.x + d.x, y: playerPos.y + d.y};
    if (!inBounds(p)) continue;
    if (occupiedByObstacle(p, game)) continue;
   
    const opp = getOpponent(game, playerPos.ownerId);
    if (opp && positionsEqual(p, opp.position)) continue;
    valid[dir] = p;
  }
  return valid;
}


function authMiddleware(req, res, next) {
  const h = req.headers.authorization || '';
  const token = h.replace(/^Bearer\s+/i, '');
  if (!token || !tokens[token]) return res.status(401).json({ error: 'Unauthorized' });
  const userId = tokens[token];
  req.user = users[userId];
  next();
}

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });

  if (Object.values(users).some(u => u.username === username)) {
    return res.status(400).json({ error: 'username already taken' });
  }

  const id = uuidv4();
  const passwordHash = await bcrypt.hash(password, 8);
  users[id] = { id, username, passwordHash, createdAt: now() };
  return res.json({ id, username });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });

  const user = Object.values(users).find(u => u.username === username);
  if (!user) return res.status(400).json({ error: 'invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ error: 'invalid credentials' });

  const token = makeToken();
  tokens[token] = user.id;
  return res.json({ token, user: { id: user.id, username: user.username } });
});



app.post('/api/games', authMiddleware, (req, res) => {
  const creator = req.user;
  const gameId = uuidv4();

  const game = {
    id: gameId,
    createdAt: now(),
    status: 'waiting', 
    players: [
      {
        id: creator.id,
        username: creator.username,
        position: { x: 0, y: 0 },
        base: { x: 0, y: 0 },
        joinedAt: now(),
      }
    ],
    obstacles: placeObstacles(),
    currentTurn: creator.id,
    winner: null,
    log: [`${creator.username} created the game`]
  };

  games[gameId] = game;
  return res.json({ gameId, game });
});


app.post('/api/games/:gameId/join', authMiddleware, (req, res) => {
  const { gameId } = req.params;
  const user = req.user;
  const game = games[gameId];
  if (!game) return res.status(404).json({ error: 'game not found' });
  if (game.players.some(p => p.id === user.id)) return res.status(400).json({ error: 'already in the game' });
  if (game.players.length >= 2) return res.status(400).json({ error: 'game already has two players' });

  const player2 = {
    id: user.id,
    username: user.username,
    position: { x: GRID_SIZE - 1, y: GRID_SIZE - 1 }, 
    base: { x: GRID_SIZE - 1, y: GRID_SIZE - 1 },
    joinedAt: now()
  };
  game.players.push(player2);
  game.status = 'ongoing';
  game.log.push(`${user.username} joined the game`);
  return res.json({ game });
});

app.get('/api/games/:gameId', authMiddleware, (req, res) => {
  const { gameId } = req.params;
  const game = games[gameId];
  if (!game) return res.status(404).json({ error: 'game not found' });

  return res.json({ game });
});

app.post('/api/games/:gameId/move', authMiddleware, (req, res) => {
  const { gameId } = req.params;
  const { direction } = req.body || {};
  const user = req.user;
  const game = games[gameId];
  if (!game) return res.status(404).json({ error: 'game not found' });
  if (game.status !== 'ongoing') return res.status(400).json({ error: 'game is not ongoing' });

  
  const player = game.players.find(p => p.id === user.id);
  if (!player) return res.status(403).json({ error: 'not a player in this game' });

  if (game.currentTurn !== user.id) return res.status(400).json({ error: "not your turn" });

  const deltas = { up: {x:0,y:-1}, down: {x:0,y:1}, left: {x:-1,y:0}, right: {x:1,y:0} };
  if (!deltas[direction]) return res.status(400).json({ error: 'invalid direction' });

  const newPos = { x: player.position.x + deltas[direction].x, y: player.position.y + deltas[direction].y };

  if (!inBounds(newPos)) return res.status(400).json({ error: 'move out of bounds' });
  if (occupiedByObstacle(newPos, game)) return res.status(400).json({ error: 'blocked by obstacle' });

  
  const opponent = getOpponent(game, user.id);
  if (opponent && positionsEqual(newPos, opponent.position)) {
    return res.status(400).json({ error: 'cannot move onto opponent tile' });
  }

  if (opponent && positionsEqual(newPos, opponent.base)) {
    player.position = newPos;
    game.status = 'finished';
    game.winner = { id: player.id, username: player.username, reason: 'moved into opponent base' };
    game.log.push(`${player.username} moved into opponent base and won!`);
    return res.json({ game, message: 'You captured the opponent base and won!' });
  }

  player.position = newPos;
  game.log.push(`${player.username} moved ${direction} to (${newPos.x},${newPos.y})`);

  if (opponent) game.currentTurn = opponent.id;
  else game.currentTurn = player.id; 

  return res.json({ game });
});


app.post('/api/games/:gameId/attack', authMiddleware, (req, res) => {
  const { gameId } = req.params;
  const user = req.user;
  const game = games[gameId];
  if (!game) return res.status(404).json({ error: 'game not found' });
  if (game.status !== 'ongoing') return res.status(400).json({ error: 'game is not ongoing' });
  const player = game.players.find(p => p.id === user.id);
  if (!player) return res.status(403).json({ error: 'not a player in this game' });

  if (game.currentTurn !== user.id) return res.status(400).json({ error: "not your turn" });

  const opponent = getOpponent(game, user.id);
  if (!opponent) return res.status(400).json({ error: 'no opponent yet' });

  const dist = manhattan(player.position, opponent.base);
  if (dist !== 1) return res.status(400).json({ error: 'must be adjacent to opponent base to attack' });

  game.status = 'finished';
  game.winner = { id: player.id, username: player.username, reason: 'attacked opponent base' };
  game.log.push(`${player.username} attacked and captured opponent base!`);
  return res.json({ game, message: `${player.username} attacked and won!` });
});
app.get('/api/games/:gameId/valid-moves', authMiddleware, (req, res) => {
  const { gameId } = req.params;
  const user = req.user;
  const game = games[gameId];
  if (!game) return res.status(404).json({ error: 'game not found' });
  const player = game.players.find(p => p.id === user.id);
  if (!player) return res.status(403).json({ error: 'not a player in this game' });
  const playerPos = { x: player.position.x, y: player.position.y, ownerId: user.id };
  const valid = computeValidMoves(playerPos, game);
  return res.json({ valid });
});
app.get('/api/games', authMiddleware, (req, res) => {
  const list = Object.values(games).map(g => ({ id: g.id, status: g.status, playersCount: g.players.length, createdAt: g.createdAt }));
  return res.json({ games: list });
});
app.get("/", (req, res) => {
  res.send("🎮 Multiplayer Strategy Game API is running! Use /api/... endpoints.");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

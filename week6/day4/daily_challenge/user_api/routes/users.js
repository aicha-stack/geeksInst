const express = require('express');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const usersFile = path.join(__dirname, '..', 'users.json');

function readUsers() {
    try {
        const data = fs.readFileSync(usersFile, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function writeUsers(users) {
    try {
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
        return true;
    } catch (err) {
        return false;
    }
}

router.post('/register', async (req, res) => {
    const { name, lastName, email, username, password } = req.body;
    if (!name || !lastName || !email || !username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const users = readUsers();
    if (users.some(u => u.username === username)) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = { id: Date.now().toString(), name, lastName, email, username, password: hashedPassword };
    users.push(newUser);

    if (!writeUsers(users)) {
        return res.status(500).json({ error: 'Failed to save user' });
    }

    res.json({ message: 'User registered successfully', user: { id: newUser.id, username: newUser.username } });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

    const users = readUsers();
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
});
router.get('/users', (req, res) => {
    const users = readUsers().map(u => ({ id: u.id, username: u.username, email: u.email }));
    res.json(users);
});
router.get('/users/:id', (req, res) => {
    const users = readUsers();
    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ id: user.id, username: user.username, email: user.email });
});
router.put('/users/:id', (req, res) => {
    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === req.params.id);
    if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

    const { name, lastName, email, username, password } = req.body;

    if (username && users.some((u, i) => u.username === username && i !== userIndex)) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    if (password) {
        const hashedPassword = bcrypt.hashSync(password, 8);
        users[userIndex].password = hashedPassword;
    }

    if (name) users[userIndex].name = name;
    if (lastName) users[userIndex].lastName = lastName;
    if (email) users[userIndex].email = email;
    if (username) users[userIndex].username = username;

    if (!writeUsers(users)) return res.status(500).json({ error: 'Failed to update user' });

    res.json({ message: 'User updated successfully', user: users[userIndex] });
});

module.exports = router;

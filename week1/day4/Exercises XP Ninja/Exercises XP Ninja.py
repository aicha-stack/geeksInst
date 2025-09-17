import time
import copy

class Grid:
    def __init__(self, rows, cols, initial_state=None):
        self.rows = rows
        self.cols = cols
        if initial_state:
            self.grid = initial_state
        else:
            self.grid = [[0 for _ in range(cols)] for _ in range(rows)]

    def display(self):
        for row in self.grid:
            line = "".join("█" if cell else " " for cell in row)
            print(line)
        print("\n" + "-" * self.cols)

    def count_neighbors(self, row, col):
        directions = [(-1,-1), (-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0), (1,1)]
        count = 0
        for dr, dc in directions:
            r, c = row + dr, col + dc
            if 0 <= r < self.rows and 0 <= c < self.cols:
                count += self.grid[r][c]
        return count

class GameOfLife(Grid):
    def next_generation(self):
        new_grid = copy.deepcopy(self.grid)
        for r in range(self.rows):
            for c in range(self.cols):
                neighbors = self.count_neighbors(r, c)
                if self.grid[r][c] == 1:
                    if neighbors < 2 or neighbors > 3:
                        new_grid[r][c] = 0
                else:
                    if neighbors == 3:
                        new_grid[r][c] = 1
        self.grid = new_grid

# Example initial states
blinker = [
    [0,0,0,0,0],
    [0,1,1,1,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
]

glider = [
    [0,0,1,0,0],
    [1,0,1,0,0],
    [0,1,1,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
]

game = GameOfLife(5, 5, blinker)

for _ in range(10):
    game.display()
    game.next_generation()
    time.sleep(0.5)

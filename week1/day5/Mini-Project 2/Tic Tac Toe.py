def display_board(board):
    print("\n")
    print(f" {board[0]} | {board[1]} | {board[2]} ")
    print("---|---|---")
    print(f" {board[3]} | {board[4]} | {board[5]} ")
    print("---|---|---")
    print(f" {board[6]} | {board[7]} | {board[8]} ")
    print("\n")

def player_input(player, board):
    while True:
        pos = input(f"Player {player}, enter your move (1-9): ")
        if pos.isdigit():
            pos = int(pos) - 1
            if 0 <= pos <= 8 and board[pos] == " ":
                return pos
        print("Invalid move. Try again.")

def check_win(board):
    winning_combinations = [
        [0,1,2], [3,4,5], [6,7,8],   
        [0,3,6], [1,4,7], [2,5,8],  
        [0,4,8], [2,4,6]             
    ]
    for combo in winning_combinations:
        if board[combo[0]] == board[combo[1]] == board[combo[2]] != " ":
            return board[combo[0]]
    return None

def play():
    board = [" "] * 9
    current_player = "X"
    for turn in range(9):
        display_board(board)
        move = player_input(current_player, board)
        board[move] = current_player
        winner = check_win(board)
        if winner:
            display_board(board)
            print(f"Player {winner} wins! 🎉")
            return
        current_player = "O" if current_player == "X" else "X"
    display_board(board)
    print("It's a tie! 🤝")

play()

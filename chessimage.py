import chess
import chess.svg
import chess.pgn
import sys
import io

arg1 = sys.argv[1]
arg2 = sys.argv[2]
arg3 = sys.argv[3]
ori = None
if(arg3 == "0"):
    ori = chess.WHITE
else:
    ori = chess.BLACK


pgn = io.StringIO(arg1)
game = chess.pgn.read_game(pgn)
board = game.board()

last = None

for move in game.mainline_moves():
    board.push(move)
    last = move

boardsvg = chess.svg.board(board=board, lastmove=last, size=arg2, orientation=ori)
boardsvg.encode("utf-8")
print(boardsvg)
sys.stdout.flush()
#f = open("1.svg", "w")
#f.write(boardsvg)
#f.close()
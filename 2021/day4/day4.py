# from test_input import *
from real_input import *

def format_boards(board_input):
	boards = board_input.split('\n\n')
	
	formatted_boards = []
	for board in boards:
		rows = board.split('\n')
		new_board = []
		for row in rows:
			row = row.split()
			new_board.append(row)
		formatted_boards.append(new_board)
	return formatted_boards

def mark_number(boards, num):
	new_boards = []
	for board in boards:
		new_board = []
		for row in board:
			new_row = []
			for item in row:
				if item != 'x' and int(item) == num:
					new_row.append('x')
				else:
					new_row.append(item)
			new_board.append(new_row)
		new_boards.append(new_board)
	return new_boards

def check_for_bingo(board):
	cols = [0, 0, 0, 0, 0]
	for row in board:
		row_count = 0
		for i in range(len(row)):
			if (row[i] == 'x'):
				cols[i] += 1
				row_count += 1
		if row_count == 5:
			return True
	for col in cols:
		if col == 5:
			return True
	return False

def calc_score(board, num):
	count = 0
	for row in board:
		for item in row:
			if item != 'x':
				count += int(item)
	return num * count

def main(nums, board_input):
	formatted_boards = format_boards(board_input)
	for num in nums:
		formatted_boards = mark_number(formatted_boards, num)
		for board in formatted_boards:
			if check_for_bingo(board):
				return calc_score(board, num)

def main2(nums, board_input):
	formatted_boards = format_boards(board_input)
	last_bingo_board = []
	for num in nums:
		formatted_boards = mark_number(formatted_boards, num)
		count = 0
		for board in formatted_boards:
			if not check_for_bingo(board):
				count += 1
				last_bingo_board = board
		# end it
		if count == 1:
			formatted_boards = [last_bingo_board]
			for num in nums:
				formatted_boards = mark_number(formatted_boards, num)
				for board in formatted_boards:
					if check_for_bingo(board):
							return calc_score(board, num)




print(main2(nums, boards))
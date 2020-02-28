# Sliding 15-Puzzle
import sys
import random
import time
import copy 
import queue
import random
from collections import deque

# global monster_visited
# monster_visited = [[], [], []]
def isGoal(state, goals):
	(monster_data, _) = state
	print(monster_data, goals)
	# Due to the nanture of the color swapping depending on the order there are multiple winning states.
	for i in range(len(goals)):
		(row, col) = goals[i]
		if(monster_data[i][0] != row or monster_data[i][1] != col):
			return False
	return True

# This function swaps the two colors passed in on the scene.
def color_swap( color1, color2, state):
	new_state = copy.deepcopy(state)
	for i in range(len(state)):
		for j in range(len(state[0])):
			tile = state[i][j]
			if(tile == color1):
				new_state[i][j] = color2                   
			elif(tile == color2):
				new_state[i][j] = color1
	return new_state 
   
# This function finds the row, col, and color of the monsters in the state.
def find_monsters(state):
	positions = []
	for i in range(len(state)):
		for j in range(len(state[0])):
			(monster, _) = state[i][j]
			if(monster != 0):
				positions.append((i, j, monster)) #row, col, color
	return positions

def rankPerm(perm):    
	return str(perm)

		

def doNothing(path):
	pass

def heuristicMedium(state, goals):
	steps = 0
	mtype = 0
	(monsters, _) = state

	for monster in monsters:

		(gRow, gCol) = goals[mtype]

		steps += abs(monster[0] - gRow) + abs(gCol - monster[1])
		mtype += 1

	return steps


# this function finds all of the 1 step neighbors. Swaping colors or moving one square counts as 1 step.
# this function also makes sure you cannot have tow monsters occupy the same square.
def neighbors(state, goals):
	(monster_data, level_data) = state
	neighborhood = []
	all_positions_arr = []
	
	for i in range(len(monster_data)):
		(row, col) = goals[i]
		if(monster_data[i][0] != row or monster_data[i][1] != col):
			x = all_positions(monster_data[i], level_data, i + 1)
			if(len(x) == 0):
				x = [monster_data[i]]
			all_positions_arr.append(x)
		else:
			x = [monster_data[i]]
			all_positions_arr.append(x)
	
	for i in range(len(all_positions_arr[0])):
		for j in range(len(all_positions_arr[1])):
			for k in range(len(all_positions_arr[2])):
				if(all_positions_arr[0][i] != all_positions_arr[1][j] and all_positions_arr[0][i] != all_positions_arr[2][k] and all_positions_arr[1][j] != all_positions_arr[2][k]):						
					neighborhood.append(([all_positions_arr[0][i], all_positions_arr[1][j], all_positions_arr[2][k]], level_data))
					neighborhood.append(([all_positions_arr[0][i], all_positions_arr[1][j], all_positions_arr[2][k]],color_swap(1, 2, level_data)))
					neighborhood.append(([all_positions_arr[0][i], all_positions_arr[1][j], all_positions_arr[2][k]],color_swap(1, 3, level_data)))
					neighborhood.append(([all_positions_arr[0][i], all_positions_arr[1][j], all_positions_arr[2][k]],color_swap(2, 3, level_data)))
				


	
	return neighborhood


# prints state in a semi nice way.
def printBoard(state):
	for row in state:
		print(row)
	print("\n")



def all_positions(monster_pos, level_data, monster_type):
	positions = []
	queue = deque([monster_pos])
	visited = [monster_pos]

	while queue:
		v = queue.popleft()
		if(v[0] < len(level_data) - 1 and level_data[v[0] + 1][v[1]] == monster_type and [v[0] + 1, v[1]] not in visited):
			queue.append([v[0] + 1, v[1]])
			visited.append([v[0] + 1, v[1]])
			positions.append([v[0] + 1, v[1]])
		
		if(v[0] > 0 and level_data[v[0] - 1][v[1]] == monster_type and [v[0] - 1, v[1]] not in visited):
			queue.append([v[0] - 1, v[1]])
			visited.append([v[0] - 1, v[1]])
			positions.append([v[0] - 1, v[1]])

		
		if(v[1] < len(level_data[0]) - 1 and level_data[v[0]][v[1] + 1] == monster_type and [v[0], v[1]+1] not in visited):
			queue.append([v[0], v[1]+1])
			visited.append([v[0], v[1] + 1])
			positions.append([v[0], v[1] + 1])

		
		if(v[1] > 0 and level_data[v[0]][v[1] - 1] == monster_type and [v[0], v[1] - 1] not in visited):
			queue.append([v[0], v[1]-1])
			visited.append([v[0], v[1]-1])
			positions.append([v[0], v[1] - 1])
		
	return positions

def AStar(S, goals, neighborhoodFn, goalFn, visitFn, heuristicFn):
	global maxTime, data
	startTime = time.time()
	st = set() 

	
	frontier = queue.PriorityQueue()

	frontier.put((0, [S]))

	while frontier.qsize() > 0:
		(_, path) = frontier.get()
		node = path[-1]

		# check time
		currentTime = time.time()

		if currentTime - startTime > maxTime:
			return [-1, None]
		
		if goalFn(node, goals):
			visitFn(path)
			currentTime = time.time()
			return [currentTime - startTime, path]
		
		else:
			neighborhood = neighborhoodFn(node, goals)

			for neighbor in neighborhood:
				rank = rankPerm(neighbor)
				if neighbor not in path and rank not in st:
					st.add(rank)
					newPath = path + [neighbor]
					pastCost = len(newPath)-1
					futureCost = heuristicFn(neighbor, goals)
					totalCost = pastCost + futureCost
					frontier.put((totalCost, newPath))


	return [-1, None]



if __name__ == "__main__":
	global maxTime, data

	solved = 0
	solved5 = 0
	solved30 = 0
	solved100 = 0
	
	maxTime = 200
	numTests = 1
	
	swapNumber = []

	level_data = [[1,1,2,2,3,3],[2,2,2,2,3,3],[3,3,2,2,1,1],[1,1,2,2,3,3],[1,1,1,1,3,3],[1,1,2,2,3,3]]
	monster_data = [[5, 0],[3, 0],[1, 0]]
	# monster_data = [[0, 2],[1, 5],[5, 5]]

	goals = [(0, 2),(1, 5), (5, 5)]

	for i in range(numTests):
		# state = generate_level(6,6)
		# levels123.append(state)
		print("\nRunning test " + str(i+1) + " out of " + str(numTests))
		# printBoard(convertLevelDataToState(state[0], state[1]))
		printBoard(level_data)

		# nl = color_swap(1,2,level_data)
		# printBoard(nl)

		# print(all_positions(monster_data[0], nl, 1))
		
		[runTime, path] = AStar((monster_data, level_data), goals, neighbors, isGoal, doNothing, heuristicMedium)
		if runTime == -1:
			print("no solution found")
		else:
			solved += 1
			print("solution\n")
			for i in path:
				(monster, board) = i
				print(monster)
				print("")
				printBoard(board)

			print("solved in " + str(len(path)-1) + " moves")
			print("solved in " + str(runTime) + " seconds")

		if runTime <= 101:
			solved100 += 1
		if runTime <= 30:
			solved30 += 1
		if runTime <= 5: 
			solved5 += 1

	print("Total Solved:" + str(solved)+"\n")
	print("\n")
	# print("Number of Swaps per level:", swapNumber)
	print("\n")
	print("Solved in 5 seconds: " + str(solved5) + "/" + str(numTests))
	print("Solved in 30 seconds: " + str(solved30) + "/" + str(numTests))
	print("Solved in 100 seconds: " + str(solved100) + "/" + str(numTests))





# starting board is a 6 by 6 matrix with tuples as the values. The tuple is in the form (player type, tile type).
# 1 = yellow, 2 = blue, 3 = red applies for both player type and tile type. 0 in player type means there is no player
# on the tile.

# state = [ [(0, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)],
#                 [(3, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)],
#                 [(0, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)],
#                 [(2, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)],
#                 [(0, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)],
#                 [(1, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)] ]

# the goals are stored in an array with the value (row, col) in the tuple. The index of the goal is the color type it is.

# goals = [(1, 5), (5, 5),(0, 2)]

[  [[4, 0], [3, 0], [2, 0]], 
   [[4, 0], [3, 0], [2, 1]], 
   [[5, 1], [3, 0], [2, 0]], 
   [[5, 1], [3, 0], [2, 1]], 
   [[4, 1], [3, 0], [2, 0]], 
   [[4, 1], [3, 0], [2, 1]], 
   [[3, 1], [3, 0], [2, 0]], 
   [[3, 1], [3, 0], [2, 1]], 
   [[4, 2], [3, 0], [2, 0]], 
   [[4, 2], [3, 0], [2, 1]], 
   [[4, 3], [3, 0], [2, 0]], 
   [[4, 3], [3, 0], [2, 1]]]





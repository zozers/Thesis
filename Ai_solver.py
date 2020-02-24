# Sliding 15-Puzzle
import sys
import random
import time
import copy 
import queue

def isGoal(state, goals):
	goalStates = []
	goalState = copy.deepcopy(state)
	
	for row in range(len(goalState)):
		for col in range(len(goalState[0])):
			try:
				(monster, tile) = goalState[row][col]
				temp = goals.index((row, col)) + 1
				goalState[row][col] = (temp, tile)

			except ValueError:
				(monster, tile) = goalState[row][col]
				if(monster != 0):
					goalState[row][col] = (0, tile)
				
	goalStates.append(goalState)
	
	newGoal = copy.deepcopy(goalState)
	goalStates.append(color_swap( 1, 2, newGoal))
	
	newGoal = copy.deepcopy(goalState)
	goalStates.append(color_swap( 2, 1, newGoal))

	newGoal = copy.deepcopy(goalState)
	goalStates.append(color_swap( 3, 1, newGoal))

	newGoal = copy.deepcopy(goalState)
	goalStates.append(color_swap( 1, 3, newGoal))

	newGoal = copy.deepcopy(goalState)
	goalStates.append(color_swap( 3, 2, newGoal))

	# for i in goalStates:
	# 	printBoard(i)

	return state in goalStates

def color_swap( color1, color2, state):
	for i in range(len(state)):
		for j in range(len(state[0])):
			(monster, tile) = state[i][j]
			if(tile == color1):
				state[i][j] = (monster, color2)                   
			elif(tile == color2):
				state[i][j] = (monster, color1)
	return state 
   
def find_monsters(state):
	positions = []
	for i in range(len(state)):
		for j in range(len(state[0])):
			(monster, _) = state[i][j]
			if(monster != 0):
				positions.append((i, j, monster)) #row, col, color
	return positions
			   
def count_swaps(path):
	swaps = 0
	for i in range(len(path[1:])-1):
		lastPos = find_monsters(path[0+i])

		monsters = find_monsters(path[1+ i])

		if(lastPos == monsters):
			swaps += 1
	return swaps



def neighbors(state):
	neighborhood = []
	
	# find monster positions
	monsters = find_monsters(state)


	moveNum = 0 

	for monster in monsters:
		(row, col, color) = monster

		# check left

		if( col > 0):
			(empty, leftColor) = state[row][col -1] 
			if leftColor == color:
				moveNum += 1
				newState = copy.deepcopy(state)
				newState[row][col - 1] = (color, leftColor)
				(old_player, old_tile) = newState[row][col]
				newState[row][col] = (0,old_tile )
				neighborhood.append(newState)

		# check right

		 

		if(col < len(state) - 1):
			(empty, rightColor) = state[row][col +1]
			if rightColor == color:
				moveNum += 1
				newState = copy.deepcopy(state)
				newState[row][col + 1] = (color, rightColor)
				(old_player, old_tile) = newState[row][col]
				newState[row][col] = (0,old_tile )
				neighborhood.append(newState)

		# check up
		  
		if(row > 0):
			(empty, upColor) = state[row][col]
			if( upColor == color):
				moveNum += 1
				newState = copy.deepcopy(state)
				newState[row - 1][col] = (color, upColor)
				(old_player, old_tile) = newState[row][col]
				newState[row][col] = (0, old_tile )
				neighborhood.append(newState)

		# check down

		if(row < len(state[0]) - 1):
			(empty, downColor) = state[row + 1][col]
			if downColor == color:
				moveNum += 1
				newState = copy.deepcopy(state)
				newState[row + 1][col] = (color, downColor)
				(old_player, old_tile) = newState[row][col]
				newState[row][col] = (0,old_tile )
				neighborhood.append(newState)
	
	newState = copy.deepcopy(state)
	neighborhood.append(color_swap( 1, 2, newState))


	newState = copy.deepcopy(state)
	neighborhood.append(color_swap( 1, 3, newState))

	newState = copy.deepcopy(state)
	neighborhood.append(color_swap( 2, 3, newState))

	
	return neighborhood


# def	swap_neighbors(state):
# 	neighborhood = []
# 	#color swaps
# 	newState = copy.deepcopy(state)
# 	neighborhood.append(color_swap( 1, 2, newState))


# 	newState = copy.deepcopy(state)
# 	neighborhood.append(color_swap( 1, 3, newState))

# 	newState = copy.deepcopy(state)
# 	neighborhood.append(color_swap( 2, 3, newState))

# 	return neighborhood

def printBoard(state):
	for row in state:
		print(row)
	print("\n")

def heuristicBad(state):
	return 0


def heuristicMedium(state, goals):
	steps = 0
	monsters = find_monsters(state)

	for monster in monsters:
		(row, col, monsterType) = monster

		(gRow, gCol) = goals[monsterType - 1]

		steps += abs(row - gRow) + abs(gCol - col)

	return steps


# def heuristicGood(state):
#     total = 0
#     for row in range(4):
#         for col in range(4):
#             index = 4*row + col
#             correct = index+1
#             incorrect = state[index]
#             if incorrect == 16: continue
#             incorrectRow = int((incorrect-1)/4)
#             incorrectCol = (incorrect-1)%4
#             distance = abs(incorrectRow-row) + abs(incorrectCol-col)
#             total += distance
#     return total

def AStar(S, goals, neighborhoodFn, goalFn, visitFn, heuristicFn):
	global maxTime, data
	startTime = time.time()
	st = set() 

	
	frontier = queue.PriorityQueue()
	for s in S:
		frontier.put((0, [s]))

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
			neighborhood = neighborhoodFn(node)

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
def convertLevelDataToState(level_data, monster_pos):
	

	state = []
	for i in range(len(level_data)):
		temp = []
		for j in range(len(level_data[0])):
			if([i, j] in monster_pos):
				monsterType = monster_pos.index([i, j]) + 1
			else:
				monsterType = 0
			temp.append((monsterType, level_data[i][j]))
		state.append(temp)
	return state



def rankPerm(perm):    
    return str(perm)

		

def doNothing(path):
	pass


if __name__ == "__main__":
	global maxTime, data
	
	solved = 0
	
	maxTime = 100
	numTests = 3

	
	state1 = [ [(0, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)],
				[(3, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)],
				[(0, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)],
				[(2, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)],
				[(0, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)],
				[(1, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)] ]

	state2 = [ [(0, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)],
				[(3, 2), (0, 2), (0, 2), (0, 2), (0, 3), (0, 3)],
				[(0, 3), (0, 3), (0, 2), (0, 2), (0, 1), (0, 1)],
				[(2, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)],
				[(0, 1), (0, 1), (0, 1), (0, 1), (0, 3), (0, 3)],
				[(1, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)] ]

	state3 = convertLevelDataToState([[2,1,2,1,3,3],[1,2,2,2,1,3],[3,3,1,2,1,2],[1,1,2,1,3,1],[1,3,1,3,2,3],[1,2,1,2,1,3]], [ [5, 0],[3, 0],[1, 0] ])

	states = [state1, state2, state3]

	goals = [(0, 2),(1, 5), (5, 5)]

	for i in range(numTests):


		print("\nRunning test " + str(1) + " out of " + str(numTests))
		printBoard(state3)
		
		[runTime, path] = AStar([states[i]], goals, neighbors, isGoal, doNothing, heuristicMedium)
		if runTime == -1:
		    print("no solution found")
		else:
		    print("solution\n")
		    for i in path:
		    	printBoard(i)

		    print(count_swaps(path))

		print("solved in " + str(len(path)-1) + " moves")
		print("solved in " + str(runTime) + " seconds")
			


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





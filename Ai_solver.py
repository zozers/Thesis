# Sliding 15-Puzzle
import sys
import random
import time
import copy 
import queue
import random

def isGoal(state, goals):
	# Due to the nanture of the color swapping depending on the order there are multiple winning states.
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

	return state in goalStates

# This function swaps the two colors passed in on the scene.
def color_swap( color1, color2, state):
	for i in range(len(state)):
		for j in range(len(state[0])):
			(monster, tile) = state[i][j]
			if(tile == color1):
				state[i][j] = (monster, color2)                   
			elif(tile == color2):
				state[i][j] = (monster, color1)
	return state 
   
# This function finds the row, col, and color of the monsters in the state.
def find_monsters(state):
	positions = []
	for i in range(len(state)):
		for j in range(len(state[0])):
			(monster, _) = state[i][j]
			if(monster != 0):
				positions.append((i, j, monster)) #row, col, color
	return positions

# This funftion takes in a solution and calculates how many swaps take place.		   
def count_swaps(path):
	swaps = 0
	for i in range(len(path[1:])-1):
		lastPos = find_monsters(path[0+i])

		monsters = find_monsters(path[1+ i])

		if(lastPos == monsters):
			swaps += 1
	return swaps


# this function finds all of the 1 step neighbors. Swaping colors or moving one square counts as 1 step.
# this function also makes sure you cannot have tow monsters occupy the same square.
def neighbors(state):
	neighborhood = []
	
	# find monster positions
	monsters = find_monsters(state)

	monster1 = monsters[0]
	monster2 = monsters[1]
	monster3 = monsters[2]

	(r1, c1, co1) = monster1
	(r2, c2, co2) = monster2
	(r3, c3, co3) = monster3

	moveNum = 0 

	for monster in monsters:
		(row, col, color) = monster

		# check left
		if( col > 0):
			(empty, leftColor) = state[row][col -1] 
			if leftColor == color and [row, (col-1)] not in [[r1, c1], [r2, c2], [r3, c3]]:
				moveNum += 1
				newState = copy.deepcopy(state)
				newState[row][col - 1] = (color, leftColor)
				(old_player, old_tile) = newState[row][col]
				newState[row][col] = (0,old_tile )
				neighborhood.append(newState)

		# check right
		if(col < len(state) - 1):
			(empty, rightColor) = state[row][col +1]
			if rightColor == color and [row, (col + 1)] not in [[r1, c1], [r2, c2], [r3, c3]]:
				moveNum += 1
				newState = copy.deepcopy(state)
				newState[row][col + 1] = (color, rightColor)
				(old_player, old_tile) = newState[row][col]
				newState[row][col] = (0,old_tile )
				neighborhood.append(newState)

		# check up
		if(row > 0):
			(empty, upColor) = state[row - 1][col]
			if( upColor == color and [(row - 1), col] not in [[r1, c1], [r2, c2], [r3, c3]]):
				moveNum += 1
				newState = copy.deepcopy(state)
				newState[row - 1][col] = (color, upColor)
				(old_player, old_tile) = newState[row][col]
				newState[row][col] = (0, old_tile )
				neighborhood.append(newState)

		# check down
		if(row < len(state[0]) - 1):
			(empty, downColor) = state[row + 1][col]
			if downColor == color and [(row + 1), col] not in [[r1, c1], [r2, c2], [r3, c3]]:
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


# prints state in a semi nice way.
def printBoard(state):
	for row in state:
		print(row)
	print("\n")

def heuristicBad(state):
	return 0
				

# better number the closer each monster is to its respective goal.
def heuristicMedium(state, goals):
	steps = 0
	monsters = find_monsters(state)

	for monster in monsters:
		(row, col, monsterType) = monster

		(gRow, gCol) = goals[monsterType - 1]

		steps += abs(row - gRow) + abs(gCol - col)

	return steps


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

# this function takes in the data I had in my game.js to generate a state. 
# example:
# level_data = [[1,1,2,2,3,3],[1,1,2,2,3,3],[1,1,2,2,3,3],[1,1,2,2,3,3],[1,1,2,2,3,3],[1,1,2,2,3,3]]
# monster_pos = [ [5, 0],[3, 0],[1, 0] ]

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

def generate_level(width, height):
	
	monster = []
	goal = []
	level_data = []

	for i in range(3):
		temp1 = [random.randrange(0, 5), random.randrange(0, 5)]

		while temp1 in monster:
			temp1 = [random.randrange(0, 5), random.randrange(0, 5)]
		
		monster.append(temp1)
		
		temp2 = (random.randrange(0, 5), random.randrange(0, 5))
		while temp2 in goal:
			temp2 = (random.randrange(0, 5), random.randrange(0, 5))
		goal.append(temp2)
	
	for row in range(width):
		temp = []
		for col in range(height):
			temp.append(random.randrange(1,4))
		level_data.append(temp)
	print("level_data",level_data)
	return [level_data, monster, goal]





def rankPerm(perm):    
	return str(perm)

		

def doNothing(path):
	pass


if __name__ == "__main__":
	global maxTime, data
	
	solved = 0
	solved5 = 0
	solved30 = 0
	solved100 = 0
	
	maxTime = 200
	numTests = 1

	swapNumber = []

	
	state1 = [ [(0, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)],
				[(3, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)],
				[(0, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)],
				[(2, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)],
				[(0, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)],
				[(1, 1), (0, 1), (0, 2), (0, 2), (0, 3), (0, 3)] ]

	state2 = convertLevelDataToState([[1,1,2,2,3,3],[2,2,2,2,3,3],[3,3,2,2,1,1],[1,1,2,2,3,3],[1,1,1,1,3,3],[1,1,2,2,3,3]], [ [5, 0],[3, 0],[1, 0] ])

	state3 = convertLevelDataToState([[2,1,2,1,3,3],[1,2,2,2,1,3],[3,3,1,2,1,2],[1,1,2,1,3,1],[1,3,1,3,2,3],[1,2,1,2,1,3]], [ [5, 0],[3, 0],[1, 0] ])

	state4 = generate_level(6, 6)

	print("monster",state4[1])


	# states = [state1, state2, state3, convertLevelDataToState(state4[0], state4[1])]
	states = [convertLevelDataToState(state4[0], state4[1])]
	goals = state4[2]

	print("goals",goals)
	# goals = [(0, 2),(1, 5), (5, 5)]

	for i in range(numTests):


		print("\nRunning test " + str(i+1) + " out of " + str(numTests))
		printBoard(states[i])
		
		[runTime, path] = AStar([states[i]], goals, neighbors, isGoal, doNothing, heuristicMedium)
		if runTime == -1:
			print("no solution found")
		else:
			solved += 1
			print("solution\n")
			for i in path:
				printBoard(i)

			print(count_swaps(path))
			swapNumber.append(count_swaps(path))
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
	print("Number of Swaps per level:", swapNumber)
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





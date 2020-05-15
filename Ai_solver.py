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
	# print(monster_data, goals)
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
	(monsters, tiles) = state
	check_movement = 0
	no_move = 0
	on_goal = 0

	i = 0
	for monster in monsters:

		if(i == 0):
			other_monsters = monster_data[1:]
		elif(i == 1):
			other_monsters = [monster_data[0], monster_data[2]]
		else:
			other_monsters = [monster_data[0], monster_data[1]]

		(gRow, gCol) = goals[mtype]
		steps += abs(monster[0] - gRow) + abs(monster[1] - gCol)
		mtype += 1

		if((abs(monster[0] - gRow) == 0 and abs(monster[1] - gCol) == 0 )):
			on_goal += 1
		else:
			check_movement = len(all_positions(monster, tiles, mtype, other_monsters))			
			if(check_movement == 0):
				no_move += 1
		i += 1

	total_movable = 3 - on_goal

	can_move = total_movable - no_move
	return (steps/(can_move+1))

def heuristicZero(state, goals):
	return 0

# this function finds all of the 1 step neighbors. Swaping colors or moving one square counts as 1 step.
# this function also makes sure you cannot have two monsters occupy the same square.
def neighbors(state, goals):
	(monster_data, level_data) = state
	neighborhood = []
	all_positions_arr = []
	
	for i in range(len(monster_data)):
		if(i == 0):
			other_monsters = monster_data[1:]
		elif(i == 1):
			other_monsters = [monster_data[0], monster_data[2]]
		else:
			other_monsters = [monster_data[0], monster_data[1]]

		(row, col) = goals[i]
		if(monster_data[i][0] != row or monster_data[i][1] != col):
			x = all_positions(monster_data[i], level_data, i + 1, other_monsters)
			all_positions_arr.append(x)
		else:
			x = [monster_data[i]]
			all_positions_arr.append(x)
	
	for i in range(len(all_positions_arr[0])):
		for j in range(len(all_positions_arr[1])):
			for k in range(len(all_positions_arr[2])):
				if(all_positions_arr[0][i] != all_positions_arr[1][j] and all_positions_arr[0][i] != all_positions_arr[2][k] and all_positions_arr[1][j] != all_positions_arr[2][k]):						
					neighborhood.append(([all_positions_arr[0][i], all_positions_arr[1][j], all_positions_arr[2][k]], color_swap(1, 2, level_data)))
					neighborhood.append(([all_positions_arr[0][i], all_positions_arr[1][j], all_positions_arr[2][k]], color_swap(1, 3, level_data)))
					neighborhood.append(([all_positions_arr[0][i], all_positions_arr[1][j], all_positions_arr[2][k]], color_swap(2, 3, level_data)))
					
	return neighborhood


# prints state in a semi nice way.
def printBoard(state):
	for row in state:
		print(row)
	print("\n")


def all_positions(monster_pos, level_data, monster_type, other_monsters):
	positions = []
	queue = deque([monster_pos])
	visited = [monster_pos]

	while queue:
		v = queue.popleft()
		if(v[0] < len(level_data) - 1 and level_data[v[0] + 1][v[1]] == monster_type and [v[0] + 1, v[1]] not in visited and [v[0] + 1, v[1]] not in other_monsters):
			queue.append([v[0] + 1, v[1]])
			visited.append([v[0] + 1, v[1]])
			positions.append([v[0] + 1, v[1]])
		
		if(v[0] > 0 and level_data[v[0] - 1][v[1]] == monster_type and [v[0] - 1, v[1]] and [v[0] - 1, v[1]] not in visited):
			queue.append([v[0] - 1, v[1]])
			visited.append([v[0] - 1, v[1]])
			positions.append([v[0] - 1, v[1]])

		
		if(v[1] < len(level_data[0]) - 1 and level_data[v[0]][v[1] + 1] == monster_type and [v[0], v[1]+1] not in visited and [v[0], v[1]+1] not in other_monsters):
			queue.append([v[0], v[1]+1])
			visited.append([v[0], v[1] + 1])
			positions.append([v[0], v[1] + 1])

		
		if(v[1] > 0 and level_data[v[0]][v[1] - 1] == monster_type and [v[0], v[1] - 1] not in visited and [v[0], v[1]-1]not in other_monsters):
			queue.append([v[0], v[1]-1])
			visited.append([v[0], v[1]-1])
			positions.append([v[0], v[1] - 1])
	positions.append(monster_pos)
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
					pastCost = len(path) - 1
					futureCost = heuristicFn(neighbor, goals)
					totalCost = pastCost + futureCost
					frontier.put((totalCost, newPath))	
	return [-1, None]

def generating_solution_neighbors(state, goal):
	neighbor = []
	(monster_pos, monster_type, tiles, other_monsters) = state


	# print("position", monster_pos)

	if(monster_pos[0] > 0):
		if(tiles[monster_pos[0] - 1][monster_pos[1]] == monster_type and [monster_pos[0] - 1, monster_pos[1]] not in other_monsters):
			neighbor.append(([monster_pos[0] - 1,monster_pos[1]], monster_type, tiles, other_monsters))
	if(monster_pos[1] > 0):
		if(tiles[monster_pos[0]][monster_pos[1] - 1] == monster_type and [monster_pos[0], monster_pos[1] - 1] not in other_monsters):
			neighbor.append(([monster_pos[0],monster_pos[1] - 1], monster_type, tiles, other_monsters))

	if(monster_pos[0] < len(tiles[0])-1):
		if(tiles[monster_pos[0] + 1][monster_pos[1]] == monster_type  and [monster_pos[0] + 1, monster_pos[1]] not in other_monsters):
			neighbor.append(([monster_pos[0] + 1,monster_pos[1]], monster_type, tiles, other_monsters))
	if(monster_pos[1] < len(tiles)-1):
		if(tiles[monster_pos[0]][monster_pos[1] + 1] == monster_type and [monster_pos[0], monster_pos[1] + 1] not in other_monsters):
			neighbor.append(([monster_pos[0],monster_pos[1] + 1], monster_type, tiles, other_monsters))
	
	return neighbor

def generating_solution_check_goals(state, goal):
	(monster_pos, monster_type, tiles, _) = state
	if(monster_pos == goal):
		return True
	else:
		return False

def get_movement_between(old_pos, new_pos, monster_type, tiles, other_monsters):
	state = (old_pos, monster_type, tiles, other_monsters)
	[runtime, path] = AStar(state, new_pos, generating_solution_neighbors, generating_solution_check_goals, doNothing, heuristicZero)

	moves = []

	starting_pos = path[0]
	(old_pos, _, _, _) = starting_pos

	for i in range(0, len(path)-1):
		current_pos = path[i+1]
		(new_pos, _, _, _) = current_pos

		print("old", old_pos)
		print("new", new_pos)
		if(old_pos[0] < new_pos[0]):
			moves.append([monster_type, "d"])
		if(old_pos[0] > new_pos[0]):
			moves.append([monster_type, "u"])
		if(old_pos[1] < new_pos[1]):
			moves.append([monster_type, "r"])
		if(old_pos[1] > new_pos[1]):
			moves.append([monster_type, "l"])

		old_pos = new_pos
	print(moves)

	return moves

def generate_moves(path):
	moves = []
	(monsters_start, start_tiles) = path[0]
	past_state = path[0]
	
	for state in path[1:]:
		monsters_current, current_tiles = state
		swaped = False

		if(state == path[-1]):
			swaped = True

		for i in range(len(monsters_current)):
			other_monsters = copy.deepcopy(monsters_current)
			other_monsters.pop(i)
			temp = get_movement_between(monsters_start[i], monsters_current[i], i+1,  start_tiles, other_monsters)
			for i in temp:
				moves.append(i)
		for i in range(len(start_tiles)):
			for j in range(len(start_tiles[0])):
				if(swaped == True):
					break

				tile1 = start_tiles[i][j]
				tile2 = current_tiles[i][j]
				if(tile1 != tile2):

					moves.append([[tile1, tile2], "s"])
					swaped = True
			if(swaped == True):
				break

		(monsters_start, start_tiles) = state

	return moves

def generate_level_data(row, col):
	level_data = []
	for i in range(row):
		temp = []
		for j in range(col):
			temp.append(random.randrange(1,4))
		level_data.append(temp)
	return level_data

def generate_monster_data(num, row, col):
	monster_data = []

	for i in range(num):
		monster_data.append([random.randrange(0, row), random.randrange(0, col)])
	return monster_data

def generate_goal_data(num, row, col):
	goal_data = []
	for i in range(num):
		goal_data.append((random.randrange(0, row), random.randrange(0, col)))
	return goal_data

if __name__ == "__main__":
	global maxTime, data

	solved = 0
	solved5 = 0
	solved30 = 0
	solved100 = 0
	
	maxTime = 400
	numTests = 1
	

	level_data = [[1,1,1,1,1,1],[1,2,2,2,2,1],[1,2,3,3,2,1],[1,2,3,3,2,1],[1,2,2,2,2,1],[1,1,1,1,1,1]]
	monster_data = [[1, 2],[3, 4],[5, 0]]	
	goals = [(0, 0),(3, 3), (4, 5)]

	for i in range(numTests):

		print("\nRunning test " + str(i+1) + " out of " + str(numTests))
		

		# level_data = generate_level_data(6, 6)
		# monster_data = generate_monster_data(3, 6, 6)
		# goals = generate_goal_data(3, 6, 6)
		
		# printBoard(level_data)
		print(level_data)
		print("\n")

		print(monster_data)
		print("\n")
		print(goals)
		print("\n")

		[runTime, path] = AStar((monster_data, level_data), goals, neighbors, isGoal, doNothing, heuristicMedium)
		
		if(runTime != -1):	
			solved += 1
			print("solution\n")
			solution = generate_moves(path)
			print(str(solution))

			# for i in path:
			# 	(monster, board) = i
			# 	print(monster)
			# 	print("")
			# 	printBoard(board)

			print("solved in " + str(len(path)-2) + " Swaps")
			print("solved in " + str(runTime) + " seconds") 
			# if(runTime >= 60 and len(path)-2 >= 5):
			# 	f = open("hard.txt", "a")
			# 	f.write(
			# 	'''
			# 	this.level'''+str(i)+''' = {
			# 		"boardInfo":'''+str(level_data)+''',
			# 		"MonsterPos": '''+str(monster_data)+''',
			# 		"GoalPos": ''' + str(goals)+''',
			# 		"Swaps":''' +str(len(path)-2)+''',
			# 		"AiSolution": '''+ str(solution)+'''
			# 		}'''	
			# 	)
			# 	f.close()
			
			# if(runTime >= 5 and runTime <= 60 and len(path)-2 >= 4):
			# 	f = open("medium.txt", "a")
			# 	f.write(
			# 	'''
			# 	this.level'''+str(i)+''' = {
			# 		"boardInfo":'''+str(level_data)+''',
			# 		"MonsterPos": '''+str(monster_data)+''',
			# 		"GoalPos": ''' + str(goals)+''',
			# 		"Swaps":''' +str(len(path)-2)+''',
			# 		"AiSolution": '''+ str(solution)+'''
			# 		}'''	
			# 	)
			# 	f.close()
			
			# if(runTime < 5 and len(path)-2 >= 5):
			# 	f = open("easy.txt", "a")
			# 	f.write(
			# 	'''
			# 	this.level'''+str(i)+''' = {
			# 		"boardInfo":'''+str(level_data)+''',
			# 		"MonsterPos": '''+str(monster_data)+''',
			# 		"GoalPos": ''' + str(goals)+''',
			# 		"Swaps":''' +str(len(path)-2)+''',
			# 		"AiSolution": '''+ str(solution)+'''
			# 		}'''	
			# 	)
			# 	f.close()

			if runTime >= 101:
				solved100 += 1
			if runTime <= 30:
				solved30 += 1
			if runTime <= 5: 
				solved5 += 1

	print("Total Solved:" + str(solved)+"\n")
	print("\n")
	print("\n")
	print("Solved in 5 seconds: " + str(solved5) + "/" + str(numTests))
	print("Solved in 30 seconds: " + str(solved30) + "/" + str(numTests))
	print("Solved in 30 seconds or more: " + str(solved100) + "/" + str(numTests))









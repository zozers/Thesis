export default class  LevelInfo {
  
	constructor() { 
		
		this.leveltest = {
			"boardInfo": [[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1]],
			"MonsterPos": [[5, 0],[3, 0],[1, 0]],
			"GoalPos": [[0, 2], [1, 5], [5, 5]],
			"Swaps": 5,
			"AiSolution": [[[1, 3], 's'], [[2, 3], 's'], [[2, 3], 's'], [[1, 3], 's']]
		}

		this.level1 = {
			"boardInfo": [[1,1,1,1,1,1],[1,2,2,2,2,1],[1,2,3,3,2,1],[1,2,3,3,2,1],[1,2,2,2,2,1],[1,1,1,1,1,1]],
			"MonsterPos": [[1, 2],[3, 4],[5, 0]],
			"GoalPos": [[0, 0],[3, 3], [4, 5]],
			"Swaps": 2,
			"AiSolution": [[1, 'u'], [1, 'l'], [1, 'l'], [[1, 3], 's'], [3, 'r'], [3, 'r'], [3, 'r'], [3, 'r'], [3, 'r'], [3, 'u'], [[2, 1], 's'], [2, 'l']]
		}


		this.level2 = {
			"boardInfo":[[2, 1, 2, 1, 2, 3], [1, 2, 1, 3, 2, 2], [3, 3, 2, 3, 1, 1], [1, 3, 1, 1, 1, 2], [3, 1, 2, 2, 2, 2], [2, 3, 2, 2, 2, 1]],
			"MonsterPos": [[5, 5], [2, 2], [1, 1]],
			"GoalPos": [[0, 5], [0, 0], [2, 0]],
			"Swaps":5,
			"AiSolution": [[3, 'd'], [[2, 1], 's'], [1, 'u'], [1, 'u'], [2, 'u'], [[1, 2], 's'], [1, 'u'], [2, 'u'], [[2, 1], 's'], [1, 'u'], [1, 'l'], [1, 'u'], [2, 'l'], [3, 'l'], [[1, 2], 's'], [2, 'l'], [[1, 3], 's'], [1, 'r']]
		}

		this.level3 = {
			"boardInfo":[[1, 2, 2, 3, 1, 1], [3, 1, 2, 1, 2, 3], [1, 2, 3, 3, 3, 2], [3, 3, 1, 1, 2, 1], [2, 1, 3, 2, 2, 1], [2, 1, 2, 1, 1, 3]],
			"MonsterPos": [[0, 2], [1, 2], [0, 3]],
			"GoalPos": [[5, 5], [2, 1], [1, 3]],
			"Swaps":5,
			"AiSolution": [[2, 'u'], [2, 'l'], [[1, 2], 's'], [1, 'd'], [2, 'd'], [[1, 3], 's'], [1, 'd'], [1, 'r'], [1, 'r'], [[3, 1], 's'], [1, 'd'], [1, 'd'], [[2, 1], 's'], [1, 'r'], [2, 'd'], [[1, 3], 's'], [1, 'd'], [3, 'd']]
		}

		this.level4 = {
			"boardInfo":[[3, 1, 1, 3, 1, 1], [1, 3, 1, 3, 1, 1], [2, 2, 1, 3, 2, 3], [1, 1, 3, 2, 1, 2], [3, 1, 1, 1, 2, 1], [2, 3, 1, 3, 3, 2]],
			"MonsterPos": [[3, 1], [5, 3], [0, 5]],
			"GoalPos": [[0, 2], [4, 1], [3, 0]],
			"Swaps":5,
			"AiSolution": [[[3, 1], 's'], [1, 'r'], [3, 'l'], [3, 'd'], [[1, 3], 's'], [1, 'u'], [1, 'u'], [1, 'u'], [3, 'l'], [3, 'd'], [[3, 1], 's'], [3, 'l'], [[3, 2], 's'], [2, 'u'], [2, 'l'], [2, 'l'], [3, 'l'], [3, 'l'], [[2, 3], 's'], [3, 'd']]
		}

		this.level5 = {
			"boardInfo": [[1,1,2,2,3,3],[2,2,2,2,3,3],[3,3,2,2,1,1],[1,1,2,2,3,3],[1,1,1,1,3,3],[1,1,2,2,3,3]],
			"MonsterPos": [[5, 0],[3, 0],[1, 0]],
			"GoalPos": [[0, 2], [1, 5], [5, 5]],
			"Swaps": 4,
			"AiSolution": [[1, 'u'], [1, 'r'], [1, 'u'], [3, 'd'], [3, 'r'], [[2, 3], 's'], [2, 'u'], [3, 'r'], [3, 'r'], [3, 'd'], [[3, 2], 's'], [2, 'u'], [2, 'r'], [2, 'r'], [2, 'r'], [3, 'r'], [3, 'r'], [3, 'd'], [[1, 2], 's'], [1, 'r'], [1, 'u'], [1, 'u'], [1, 'u'], [3, 'd'], [[2, 3], 's'], [2, 'r'], [2, 'r']]
		}

		this.level6 = {
			"boardInfo": [[2,1,2,1,3,3],[1,2,2,2,1,3],[3,3,1,2,1,2],[1,1,2,1,3,1],[1,3,1,3,2,3],[1,2,1,2,1,3]],
			"MonsterPos": [[5, 0],[3, 0],[1, 0]],
			"GoalPos": [[0, 2], [1, 5], [5, 5]],
			"Swaps": 10,
			"AiSolution": [[1, 'u'], [3, 'd'], [3, 'r'], [[2, 3], 's'], [1, 'u'], [2, 'u'], [3, 'u'], [3, 'r'], [3, 'r'], [[1, 2], 's'], [1, 'u'], [2, 'u'], [3, 'd'], [[3, 2], 's'], [1, 'r'], [2, 'r'], [2, 'r'], [3, 'r'], [[3, 1], 's'], [1, 'r'], [2, 'r'], [3, 'd'], [[2, 1], 's'], [1, 'u'], [1, 'l'], [2, 'r'], [[2, 3], 's'], [1, 'r'], [2, 'r'], [3, 'r'], [[3, 2], 's'], [1, 'u'], [3, 'd'], [3, 'd']]

		}

		this.level7 = {
			"boardInfo": [[1, 3, 1, 2, 1, 3], [2, 3, 1, 3, 2, 1], [2, 3, 2, 1, 3, 2], [2, 1, 1, 1, 2, 3], [3, 1, 3, 2, 2, 3], [1, 1, 1, 2, 1, 3]],
			"MonsterPos": [[1, 0], [0, 1], [1, 3]],
			"GoalPos": [[2, 5],[1, 5], [4, 2] ],
			"Swaps": 8,
			"AiSolution": [[1, 'u'], [[1, 2], 's'], [1, 'd'], [1, 'd'], [2, 'r'], [2, 'd'], [[2, 3], 's'], [1, 'd'], [2, 'l'], [2, 'u'], [3, 'd'], [3, 'd'], [3, 'l'], [3, 'l'], [3, 'd'], [3, 'd'], [3, 'r'], [[3, 1], 's'], [1, 'r'], [1, 'r'], [1, 'r'], [1, 'u'], [2, 'd'], [3, 'r'], [3, 'u'], [3, 'r'], [[1, 2], 's'], [1, 'r'], [2, 'r'], [2, 'u'], [3, 'l'], [[1, 3], 's'], [1, 'r'], [2, 'd'], [3, 'l'], [[2, 3], 's'], [2, 'r'], [[2, 1], 's'], [2, 'r'], [[3, 2], 's'], [2, 'r']]
		}

		this.level8 = {
			"boardInfo": [[1,1,2,2,3,3],[1,1,2,2,3,3],[1,1,2,2,3,3],[1,1,2,2,3,3],[1,1,2,2,3,3],[1,1,2,2,3,3]],
			"MonsterPos": [[5, 0],[3, 0],[1, 0]],
			"GoalPos": [[0, 2], [1, 5], [5, 5]],
			"Swaps": 5,
			"AiSolution": [[1, 'u'], [1, 'r'], [1, 'u'], [1, 'u'], [1, 'u'], [1, 'u'], [[1, 2], 's'], [1, 'r'], [1, 'r'], [2, 'u'], [2, 'r'], [2, 'u'], [[2, 3], 's'], [1, 'l'], [3, 'd'], [3, 'r'], [3, 'd'], [3, 'd'], [3, 'd'], [[3, 1], 's'], [3, 'r'], [3, 'r'], [[3, 2], 's'], [2, 'r'], [2, 'r'], [3, 'r'], [3, 'r'], [[2, 3], 's'], [2, 'r'], [2, 'r']]

		}

		this.level9 = {
			"boardInfo": [[3, 1, 3, 3, 2, 2], [1, 2, 1, 3, 1, 3], [3, 3, 3, 2, 1, 3], [3, 1, 1, 3, 2, 1], [3, 2, 2, 3, 2, 2], [3, 2, 2, 2, 2, 2]],
			"MonsterPos": [[1, 3], [1, 0], [3, 3]],
			"GoalPos": [[0, 0], [2, 0], [0, 1]],
			"Swaps": 5,
			"AiSolution": [[1, 'l'], [[3, 1], 's'], [1, 'u'], [3, 'l'], [3, 'l'], [[1, 3], 's'], [1, 'l'], [3, 'u'], [[3, 2], 's'], [2, 'd'], [3, 'u'], [[2, 1], 's'], [1, 'l'], [[2, 3], 's'], [3, 'u']]

		}

	
		this.level10 = {
			"boardInfo":[[2, 2, 1, 3, 2, 1], [1, 3, 3, 1, 1, 3], [1, 1, 3, 2, 3, 2], [3, 2, 1, 3, 2, 3], [2, 2, 1, 3, 3, 3], [2, 3, 1, 2, 3, 1]],
			"MonsterPos": [[3, 1], [4, 2], [1, 4]],
			"GoalPos": [[1, 1], [3, 5], [5, 0]],
			"Swaps":4,
			"AiSolution": [[1, 'u'], [1, 'l'], [1, 'u'], [3, 'd'], [[2, 3], 's'], 'sad', [3, 'l'], [[3, 2], 's'], [3, 'd'], [3, 'd'], [[1, 3], 's'], [3, 'l'], [[2, 3], 's'], [1, 'r'], [3, 'l'], [3, 'l'], [3, 'd']]
		}

		this.level11 = {
			"boardInfo":[[2, 1, 2, 1, 3, 3], [1, 2, 2, 2, 1, 3], [3, 3, 1, 2, 1, 2], [1, 1, 2, 1, 3, 1], [1, 3, 1, 3, 2, 3], [1, 2, 1, 2, 1, 3]],
			"MonsterPos": [[5, 0], [3, 0], [1, 0]],
			"GoalPos": [[0, 2], [1, 5], [5, 5]],
			"Swaps":7,
			"AiSolution": [[1, 'u'], [1, 'u'], [1, 'r'], [[2, 3], 's'], [2, 'u'], [2, 'r'], [3, 'r'], [3, 'r'], [3, 'r'], [3, 'd'], [[3, 2], 's'], [2, 'u'], [2, 'r'], [2, 'r'], [[1, 3], 's'], [1, 'u'], [3, 'r'], [[2, 1], 's'], [1, 'u'], [1, 'r'], [[3, 2], 's'], [2, 'r'], [3, 'd'], [[2, 3], 's'], [1, 'u'], [2, 'r'], [3, 'r'], [[3, 2], 's'], [3, 'd'], [3, 'd']]
		}

		this.level12 = {
			"boardInfo":[[2, 1, 2, 2, 3, 1], [2, 3, 3, 1, 3, 1], [2, 2, 3, 3, 2, 1], [1, 2, 1, 2, 1, 3], [3, 1, 3, 3, 3, 1], [2, 2, 1, 3, 1, 3]],
			"MonsterPos": [[0, 3], [4, 0], [5, 3]],
			"GoalPos": [[4, 5], [3, 3], [2, 5]],
			"Swaps":6,
			"AiSolution": [[1, 'd'], [3, 'u'], [3, 'r'], [[1, 3], 's'], [1, 'r'], [3, 'u'], [[2, 3], 's'], [2, 'r'], [3, 'u'], [[2, 1], 's'], [1, 'r'], [1, 'd'], [2, 'r'], [[1, 2], 's'], [1, 'd'], [2, 'u'], [[3, 2], 's'], [2, 'r'], [3, 'r'], [[3, 1], 's'], [1, 'd']]
		}

		this.level13 = {
			"boardInfo":[[1, 3, 3, 1, 2, 3], [1, 2, 1, 3, 1, 1], [3, 1, 2, 1, 2, 2], [2, 1, 2, 1, 1, 3], [1, 2, 2, 1, 1, 2], [3, 3, 2, 1, 1, 3]],
			"MonsterPos": [[5, 2], [3, 5], [2, 2]],
			"GoalPos": [[1, 4], [5, 1], [3, 0]],
			"Swaps":5,
			"AiSolution": [[1, 'r'], [1, 'u'], [1, 'u'], [1, 'u'], [2, 'd'], [[1, 2], 's'], [1, 'r'], [2, 'l'], [2, 'd'], [2, 'l'], [[2, 1], 's'], [1, 'u'], [2, 'l'], [2, 'u'], [2, 'l'], [[1, 3], 's'], [3, 'l'], [3, 'd'], [[3, 2], 's'], [3, 'l'], [[2, 1], 's'], [2, 'd']]
		}

		this.game = [this.level1, this.level2, this.level3, this.level4, this.level5, this.level6, this.level7, this.level8, this.level9, this.level10, this.level11, this.level12, this.level13];
	}
	
	get_level(levelNum){

		let level = this.game[levelNum];

		return level;


	}
}

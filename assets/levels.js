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
			"boardInfo": [[1,1,2,2,3,3],[2,2,2,2,3,3],[3,3,2,2,1,1],[1,1,2,2,3,3],[1,1,1,1,3,3],[1,1,2,2,3,3]],
			"MonsterPos": [[5, 0],[3, 0],[1, 0]],
			"GoalPos": [[0, 2], [1, 5], [5, 5]],
			"Swaps": 4,
			"AiSolution": [[1, 'u'], [1, 'r'], [1, 'u'], [3, 'd'], [3, 'r'], [[2, 3], 's'], [2, 'u'], [3, 'r'], [3, 'r'], [3, 'd'], [[3, 2], 's'], [2, 'u'], [2, 'r'], [2, 'r'], [2, 'r'], [3, 'r'], [3, 'r'], [3, 'd'], [[1, 2], 's'], [1, 'r'], [1, 'u'], [1, 'u'], [1, 'u'], [3, 'd'], [[2, 3], 's'], [2, 'r'], [2, 'r']]
		}

		this.level2 = {
			"boardInfo": [[2,1,2,1,3,3],[1,2,2,2,1,3],[3,3,1,2,1,2],[1,1,2,1,3,1],[1,3,1,3,2,3],[1,2,1,2,1,3]],
			"MonsterPos": [[5, 0],[3, 0],[1, 0]],
			"GoalPos": [[0, 2], [1, 5], [5, 5]],
			"Swaps": 10,
			"AiSolution": [[1, 'u'], [3, 'd'], [3, 'r'], [[2, 3], 's'], [1, 'u'], [2, 'u'], [3, 'u'], [3, 'r'], [3, 'r'], [[1, 2], 's'], [1, 'u'], [2, 'u'], [3, 'd'], [[3, 2], 's'], [1, 'r'], [2, 'r'], [2, 'r'], [3, 'r'], [[3, 1], 's'], [1, 'r'], [2, 'r'], [3, 'd'], [[2, 1], 's'], [1, 'u'], [1, 'l'], [2, 'r'], [[2, 3], 's'], [1, 'r'], [2, 'r'], [3, 'r'], [[3, 2], 's'], [1, 'u'], [3, 'd'], [3, 'd']]

		}

		this.level3 = {
			"boardInfo": [[1, 3, 1, 2, 1, 3], [2, 3, 1, 3, 2, 1], [2, 3, 2, 1, 3, 2], [2, 1, 1, 1, 2, 3], [3, 1, 3, 2, 2, 3], [1, 1, 1, 2, 1, 3]],
			"MonsterPos": [[1, 0], [0, 1], [1, 3]],
			"GoalPos": [[2, 5],[1, 5], [4, 2] ],
			"Swaps": 8,
			"AiSolution": [[1, 'u'], [[1, 2], 's'], [1, 'd'], [1, 'd'], [2, 'r'], [2, 'd'], [[2, 3], 's'], [1, 'd'], [2, 'l'], [2, 'u'], [3, 'd'], [3, 'd'], [3, 'l'], [3, 'l'], [3, 'd'], [3, 'd'], [3, 'r'], [[3, 1], 's'], [1, 'r'], [1, 'r'], [1, 'r'], [1, 'u'], [2, 'd'], [3, 'r'], [3, 'u'], [3, 'r'], [[1, 2], 's'], [1, 'r'], [2, 'r'], [2, 'u'], [3, 'l'], [[1, 3], 's'], [1, 'r'], [2, 'd'], [3, 'l'], [[2, 3], 's'], [2, 'r'], [[2, 1], 's'], [2, 'r'], [[3, 2], 's'], [2, 'r']]
		}

		this.level4 = {
			"boardInfo": [[1,1,2,2,3,3],[1,1,2,2,3,3],[1,1,2,2,3,3],[1,1,2,2,3,3],[1,1,2,2,3,3],[1,1,2,2,3,3]],
			"MonsterPos": [[5, 0],[3, 0],[1, 0]],
			"GoalPos": [[0, 2], [1, 5], [5, 5]],
			"Swaps": 5,
			"AiSolution": [[1, 'u'], [1, 'r'], [1, 'u'], [1, 'u'], [1, 'u'], [1, 'u'], [[1, 2], 's'], [1, 'r'], [1, 'r'], [2, 'u'], [2, 'r'], [2, 'u'], [[2, 3], 's'], [1, 'l'], [3, 'd'], [3, 'r'], [3, 'd'], [3, 'd'], [3, 'd'], [[3, 1], 's'], [3, 'r'], [3, 'r'], [[3, 2], 's'], [2, 'r'], [2, 'r'], [3, 'r'], [3, 'r'], [[2, 3], 's'], [2, 'r'], [2, 'r']]

		}


		this.level5 = {
			"boardInfo": [[3, 1, 3, 3, 2, 2], [1, 2, 1, 3, 1, 3], [3, 3, 3, 2, 1, 3], [3, 1, 1, 3, 2, 1], [3, 2, 2, 3, 2, 2], [3, 2, 2, 2, 2, 2]],
			"MonsterPos": [[1, 3], [1, 0], [3, 3]],
			"GoalPos": [[0, 0], [2, 0], [0, 1]],
			"Swaps": 5,
			"AiSolution": [[1, 'l'], [[3, 1], 's'], [1, 'u'], [3, 'l'], [3, 'l'], [[1, 3], 's'], [1, 'l'], [3, 'u'], [[3, 2], 's'], [2, 'd'], [3, 'u'], [[2, 1], 's'], [1, 'l'], [[2, 3], 's'], [3, 'u']]

		}

	
		this.level6 = {
			"boardInfo":[[2, 2, 1, 3, 2, 1], [1, 3, 3, 1, 1, 3], [1, 1, 3, 2, 3, 2], [3, 2, 1, 3, 2, 3], [2, 2, 1, 3, 3, 3], [2, 3, 1, 2, 3, 1]],
			"MonsterPos": [[3, 1], [4, 2], [1, 4]],
			"GoalPos": [(1, 1), (3, 5), (5, 0)],
			"Swaps":4,
			"AiSolution": [[1, 'u'], [1, 'l'], [1, 'u'], [3, 'd'], [[2, 3], 's'], 'sad', [3, 'l'], [[3, 2], 's'], [3, 'd'], [3, 'd'], [[1, 3], 's'], [3, 'l'], [[2, 3], 's'], [1, 'r'], [3, 'l'], [3, 'l'], [3, 'd']]
		}

		// this.game = [this.level6,this.level6,this.level6,this.level6,this.level6]

		this.game = [this.level1, this.level2, this.level3, this.level4, this.level5, this.level6];
	}
	
	get_level(levelNum){

		let level = this.game[levelNum];

		return level;


	}
}

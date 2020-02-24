export default class  LevelInfo {
  
	constructor() { 
		this.leveltest = {
			"boardInfo": [[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1]],
			"MonsterPos": [[5, 0],[3, 0],[1, 0]],
			"GoalPos": [[1, 5], [5, 5],[0, 2]],
			"Swaps": 5
		} 
		this.level1 = {
			"boardInfo": [[1,1,2,2,3,3],[1,1,2,2,3,3],[1,1,2,2,3,3],[1,1,2,2,3,3],[1,1,2,2,3,3],[1,1,2,2,3,3]],
			"MonsterPos": [[5, 0],[3, 0],[1, 0]],
			"GoalPos": [[1, 5], [5, 5],[0, 2]],
			"Swaps": 5
		}

		this.level2 = {
			"boardInfo": [[1,1,2,2,3,3],[2,2,2,2,3,3],[3,3,2,2,1,1],[1,1,2,2,3,3],[1,1,1,1,3,3],[1,1,2,2,3,3]],
			"MonsterPos": [[5, 0],[3, 0],[1, 0]],
			"GoalPos": [[1, 5], [5, 5],[0, 2]],
			"Swaps": 4
		}

		this.level3 = {
			"boardInfo": [[2,1,2,1,3,3],[1,2,2,2,1,3],[3,3,1,2,1,2],[1,1,2,1,3,1],[1,3,1,3,2,3],[1,2,1,2,1,3]],
			"MonsterPos": [[5, 0],[3, 0],[1, 0]],
			"GoalPos": [[1, 5], [5, 5],[0, 2]],
			"Swaps": 10
		}

		this.game = [this.level1, this.level2, this.level3];
	}
	
	get_level(levelNum){

		let level = this.game[levelNum];

		return level;


	}
}

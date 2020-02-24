let game;
let gameOptions = {
    gemSize: 80,
    boardOffset: {
        x: 680,
        y: 320
    },
    localStorageName: "GameLogic"
}

window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: 0x222222,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            width: 1920,
            height: 1080
        },
        scene: playGame
    }
    game = new Phaser.Game(gameConfig);
    window.focus()
}

class playGame extends Phaser.Scene{

    constructor(){
        super("PlayGame");
        this.sprites = [];

    }
    preload(){
        this.load.spritesheet("tiles", "assets/sprites/tiles.png", {
            frameWidth: gameOptions.gemSize,
            frameHeight: gameOptions.gemSize
        });
        this.load.image('button', 'assets/sprites/new_button.png');
        this.load.image('red_blue', 'assets/sprites/red_blue.png');
        this.load.image('yellow_red', 'assets/sprites/yellow_red.png');
        this.load.image('yellow_blue', 'assets/sprites/yellow_blue.png');
        this.load.image('monster', 'assets/sprites/monster.png');
        this.load.image('star', 'assets/sprites/star.png');


    }
    create(){
        this.GameLogic = new GameLogic({
            rows: 6,
            columns: 6,
            items: 3,
        });

        // localStorage.setItem(gameOptions.localStorageName,JSON.stringify({
        //         CurrentLevel: 0,
        //         MaxLevelSolved: 1
        //     }));

        console.log("local storage length", JSON.parse(localStorage.getItem(gameOptions.localStorageName)).length);
        if(localStorage.getItem(gameOptions.localStorageName) == null || localStorage.getItem(gameOptions.localStorageName).length != 2){
            console.log("Back to zero");
            localStorage.setItem(gameOptions.localStorageName,JSON.stringify({
                CurrentLevel: 0,
                MaxLevelSolved: 0

            }));
        }


        this.savedData = JSON.parse(localStorage.getItem(gameOptions.localStorageName));

        this.GameLogic.maxLevelSolved = this.savedData.MaxLevelSolved;
        this.GameLogic.levelnum = this.savedData.CurrentLevel;

        console.log("local storage", this.savedData);

        console.log(this.GameLogic.maxLevelSolved);
        console.log(this.GameLogic.levelnum);

        // this.GameLogic.levelnum = 0;
        this.GameLogic.generateBoard();
        this.drawField();
        this.buttons();
        this.monsters();
    }

    new(button){
        button.destroy();
        this.sprites = [];
        this.GameLogic.generateBoard();
        this.drawField();
        this.buttons();
        this.monsters();
        console.log(this.sprites);
    }
    
    drawField(){
        this.poolArray = [];
        for(let i = 0; i < this.GameLogic.getRows(); i ++){
            for(let j = 1; j <= this.GameLogic.getColumns(); j ++){
                let gemX = gameOptions.boardOffset.x + gameOptions.gemSize * j + gameOptions.gemSize / 2;
                let gemY = gameOptions.boardOffset.y + gameOptions.gemSize * i + gameOptions.gemSize / 2;
                let gem = this.add.sprite(gemX, gemY, "tiles", this.GameLogic.getValueAt(i, j-1)-1);
                this.sprites.push(gem);
            }
        }


    }

    buttons(){

        let button1 = this.add.sprite(game.config.width / 2-165, game.config.height - 200, 'red_blue').setInteractive();
        this.sprites.push(button1);
        
        // let rbText = this.add.text(game.config.width / 2 - 245, game.config.height - 220, "Swap R-B", { font: '35px Arial', color: '0x222222' });


        let button2 = this.add.sprite(game.config.width / 2 + 48, game.config.height - 200, 'yellow_red').setInteractive();
        this.sprites.push(button2);

        // let ryText = this.add.text(game.config.width / 2 - 25, game.config.height - 220, "Swap R-Y", { font: '35px Arial', color: '0x222222' });
    
           
        let button3 = this.add.sprite(game.config.width / 2 + 260, game.config.height - 200, 'yellow_blue').setInteractive();
        this.sprites.push(button3);

        // let ybText = this.add.text(game.config.width / 2 + 185, game.config.height - 220, "Swap Y-B", { font: '35px Arial', color: '0x222222' });
    

        let swapText = this.add.text(game.config.width/ 2 - 220, game.config.height/5 - 130, "Swaps Left: ", { font: '85px Arial', fill: '#BDBDBD'});
        this.sprites.push(swapText);
        this.GameLogic.displaySwap(swapText);

        let prev = this.add.sprite(game.config.width/ 2 - 165, game.config.height/5 + 30, 'button').setInteractive();
        if(this.GameLogic.levelnum > 0){
            prev.setTint(0xffffff);
        }
        else{
            prev.setTint(0xe22121);
        }
       
        this.sprites.push(prev);

        let prevText = this.add.text(game.config.width/2 - 255, game.config.height/5 + 10, "Previos Level", { font: '30px Arial', color: '0x222222' });

        let reset = this.add.sprite(game.config.width / 2 + 48, game.config.height/5 + 30, 'button').setInteractive();
        this.sprites.push(reset);

        let resetText = this.add.text(game.config.width/2 - 30, game.config.height/5 + 10, "Reset Level", { font: '30px Arial', color: '0x222222' });


        let next = this.add.sprite(game.config.width/ 2 + 260, game.config.height/5 + 30, 'button').setInteractive();
        if(this.GameLogic.levelnum < this.GameLogic.maxLevelSolved && this.GameLogic.levelnum < this.GameLogic.totallevels){
            next.setTint(0xffffff);

        }
        else{
            next.setTint(0xe22121);
        }
       
        this.sprites.push(next);
        
        let nextText = this.add.text(game.config.width/2 + 190, game.config.height/5 + 10, "Next Level", { font: '30px Arial', color: '0x222222' });
        

        button1.on('pointerdown', function (pointer) 
        {

            this.GameLogic.swapColors(2, 3, swapText);
            console.log("swapped");
            this.drawField();
            this.GameLogic.displaySwap(swapText);


        }, this);

        button2.on('pointerdown', function (pointer) 
        {

            this.GameLogic.swapColors(1, 3, swapText);
            console.log("swapped");
            this.drawField();
            this.GameLogic.displaySwap(swapText);


        }, this);

        button3.on('pointerdown', function (pointer) 
        {

            this.GameLogic.swapColors(1, 2, swapText);
            console.log("swapped");
            this.drawField();
            this.GameLogic.displaySwap(swapText);


        }, this);

        next.on('pointerdown', function (pointer)
        {
            for( let i=0; i < this.sprites.length; i++){
                this.sprites[i].destroy();
            }

            this.GameLogic.next();

            this.new(next);

        }, this);

        prev.on('pointerdown', function (pointer)
        {
            for( let i=0; i < this.sprites.length; i++){
                this.sprites[i].destroy();
            }

            this.GameLogic.prev();

            this.new(prev);

        }, this);

        reset.on('pointerdown', function (pointer)
        {
            for( let i=0; i < this.sprites.length; i++){
                this.sprites[i].destroy();
            }

            this.GameLogic.reset();
            this.new(reset);

        }, this);
    }

    goal(){

        let pos1 = this.GameLogic.levels.goals[this.GameLogic.levelnum][0];
        let goal1 = this.add.sprite(gameOptions.boardOffset.x + gameOptions.gemSize * (pos1[1]+1) +gameOptions.gemSize / 2, gameOptions.boardOffset.y + gameOptions.gemSize * pos1[0] + gameOptions.gemSize / 2, 'star');
        goal1.setDepth(1);
        goal1.setTint(0x2ca7b2);
        goal1.position = pos1;
        this.sprites.push(goal1);

        let pos2 = this.GameLogic.levels.goals[this.GameLogic.levelnum][1];
        let goal2 = this.add.sprite(gameOptions.boardOffset.x + gameOptions.gemSize * (pos2[1]+1) +gameOptions.gemSize / 2, gameOptions.boardOffset.y + gameOptions.gemSize * pos2[0] + gameOptions.gemSize / 2, 'star');
        goal2.setDepth(1);
        goal2.setTint(0xe84e4e);
        goal2.position = pos2;
        this.sprites.push(goal2);

        let pos3 =  this.GameLogic.levels.goals[this.GameLogic.levelnum][2];
        let goal3 = this.add.sprite(gameOptions.boardOffset.x + gameOptions.gemSize * (pos3[1]+1) +gameOptions.gemSize / 2, gameOptions.boardOffset.y + gameOptions.gemSize * pos3[0] + gameOptions.gemSize / 2, 'star');
        goal3.setDepth(1);
        goal3.setTint(0xf7c83b);
        goal3.position = pos3;
        this.sprites.push(goal3);
        return [goal1, goal2, goal3];

    }

    monsters(){

        let goals = this.goal();

        let goal1 = goals[0];
        let goal2 = goals[1];
        let goal3 = goals[2];


        let pos1 = this.GameLogic.monsterStartPos[this.GameLogic.levelnum][0];
        let monster1 = this.add.sprite(gameOptions.boardOffset.x + gameOptions.gemSize * (pos1[1] + 1) + gameOptions.gemSize / 2, gameOptions.boardOffset.y + gameOptions.gemSize * pos1[0] + gameOptions.gemSize / 2, 'monster').setInteractive({ draggable: true });
        this.sprites.push(monster1);

        monster1.setTint(0xf7c83b);
        monster1.depth = 2;
        monster1.position = pos1;
        monster1.type = 1;
        monster1.goalPos = goal3.position;
        monster1.movable = true;
        monster1.atGoal = false;
        monster1.win = false;

        let pos2 = this.GameLogic.monsterStartPos[this.GameLogic.levelnum][1];
        let monster2 = this.add.sprite(gameOptions.boardOffset.x + gameOptions.gemSize * (pos2[1] + 1) + gameOptions.gemSize / 2, gameOptions.boardOffset.y + gameOptions.gemSize * pos2[0] + gameOptions.gemSize / 2, 'monster').setInteractive({ draggable: true });
        this.sprites.push(monster2);

        monster2.setTint(0x2ca7b2);
        monster2.depth = 2;
        monster2.position = pos2;
        monster2.type = 2;
        monster2.goalPos = goal1.position;
        monster2.movable = true;
        monster2.atGoal = false;
        monster2.win = false;

        let pos3 = this.GameLogic.monsterStartPos[this.GameLogic.levelnum][2];
        let monster3 = this.add.sprite(gameOptions.boardOffset.x + gameOptions.gemSize * (pos3[1] + 1) + gameOptions.gemSize / 2, gameOptions.boardOffset.y + gameOptions.gemSize * pos3[0] + gameOptions.gemSize / 2, 'monster').setInteractive({ draggable: true });
        this.sprites.push(monster3);

        monster3.setTint(0xe84e4e);
        monster3.depth = 2;
        monster3.position = pos3;
        monster3.type = 3;
        monster3.goalPos = goal2.position;
        monster3.movable = true;
        monster3.atGoal = false;
        monster3.win = false;

        this.GameLogic.monsterPos = [monster1.position, monster2.position, monster3.position];


        monster1.on('drag', function (pointer, dragX, dragY) {

            this.GameLogic.monsterMove(monster1, dragX, dragY, 40);

            if(monster1.win == true){
                console.log("NEXT");
                this.next();

            }

        }, this);

        monster2.on('drag', function (pointer, dragX, dragY) {

            this.GameLogic.monsterMove(monster2, dragX, dragY, 40);
            if(monster2.win == true){
                console.log("NEXT");
                this.next();

            }

        }, this);

        monster3.on('drag', function (pointer, dragX, dragY) {

            this.GameLogic.monsterMove(monster3, dragX, dragY, 40);
            if(monster3.win == true){
                console.log("NEXT");
                this.next();

            }

        }, this);

    
        

    }


    next(monsters){
        
        if(this.GameLogic.checkEnd()){
            let winText = this.add.text(game.config.width / 2 - 75, game.config.height /2, "YOU WIN!", { font: '55px Arial', color: '0x222222' });
        }

        else{
            let nextButton = this.add.sprite(game.config.width / 2 + 48, game.config.height/2, 'button').setInteractive();
            let nextText = this.add.text(game.config.width / 2 - 35, game.config.height /2-15, "Next Level", { font: '35px Arial', color: '0x222222' });
            this.sprites.push(nextButton);
            this.sprites.push(nextText);

            nextButton.on('pointerdown', function (pointer)
            {

                for( let i=0; i < this.sprites.length; i++){
                    this.sprites[i].destroy();
                }

                this.GameLogic.next();

                this.new(nextButton);

            }, this);
        }
    }
        

}
class GameLogic{

    // constructor, simply turns obj information into class properties
    constructor(obj){
        if(obj == undefined){
            obj = {}
        }
        this.rows = (obj.rows != undefined) ? obj.rows : 6;
        this.columns = (obj.columns != undefined) ? obj.columns : 6;
        this.items = (obj.items != undefined) ? obj.items : 3;
        this.goalsReached = 0;

        this.swapAmmounts = [5, 4, 10];
        this.swaps = null;
        this.leveltest = [[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1],[1,1,1,1,1,1]];
        this.level1 = [[1,1,2,2,3,3],[1,1,2,2,3,3],[1,1,2,2,3,3],[1,1,2,2,3,3],[1,1,2,2,3,3],[1,1,2,2,3,3]];
        this.level2 = [[1,1,2,2,3,3],[2,2,2,2,3,3],[3,3,2,2,1,1],[1,1,2,2,3,3],[1,1,1,1,3,3],[1,1,2,2,3,3]];
        this.level3 = [[2,1,2,1,3,3],[1,2,2,2,1,3],[3,3,1,2,1,2],[1,1,2,1,3,1],[1,3,1,3,2,3],[1,2,1,2,1,3]];

        this.levelnum = 0;
        this.maxLevelSolved = 0;
        // this.levels = [this.leveltest,this.level1, this.level2, this.level3]
        this.levels = [this.level1, this.level2, this.level3];

        this.levels.goals = [[[1, 5], [5, 5],[0, 2]],[[1, 5], [5, 5],[0, 2]],[[1, 5], [5, 5],[0, 2]]];

        this.totallevels = 2; // levelnum starts at 0 
        this.monsterStartPos = [ [ [5, 0],[3, 0],[1, 0] ], [ [5, 0],[3, 0],[1, 0] ], [ [5, 0],[3, 0],[1, 0] ]];
        this.monsterPos = null;

        // this.canNext = false;
        // this.canPrev = false;
    }

    // generates the game board from the levels
    generateBoard(){
        this.gameArray = [];
        for(let i = 0; i < this.rows; i ++){
            this.gameArray[i] = [];
            for(let j = 0; j < this.columns; j ++){
                let Value = this.levels[this.levelnum][i][j];
                this.gameArray[i][j] = {
                    value: Value,
                    row: i,
                    column: j,
                    piece: 0
                }
            }
        }
        console.log(this.gameArray)
    }

    swapColors(c1, c2, swapText){

        console.log(this.swaps);
        
        if(this.swaps > 0){
            for(let i=0; i < this.columns; i ++){
                for(let j = 0; j < this.rows; j ++){

                    if(this.gameArray[i][j].value == c1){
                        this.gameArray[i][j].value = c2                    
                    }

                    else if(this.gameArray[i][j].value == c2){
                        this.gameArray[i][j].value = c1
                    }

                }
            }

            this.swaps -=1;

        }
        
        
    }

    displaySwap(swapText){
        if(this.swaps == null){
            this.swaps = this.swapAmmounts[this.levelnum]
        }

        swapText.setText('Swaps Left: ' + this.swaps);

    }

    // returns the number of board rows
    getRows(){
        return this.rows;
    }

    // returns the number of board columns
    getColumns(){
        return this.columns;
    }

    
    // returns the value of the item at (row, column), or false if it's not a valid pick
    
    validPick(row, column){
        return row >= 0 && row < this.rows && column >= 0 && column < this.columns && this.gameArray[row] != undefined && this.gameArray[row][column] != undefined;
    }

    getValueAt(row, column){

        if(!this.validPick(row, column)){
            console.log("invalid move")
            console.log(row);
            console.log(column);
            return false;
        }

        else{
            return this.gameArray[row][column].value;

        }
    }

    compareArray(a1, a2){
        for(let i = 0; i< a1.length; i++){
            if(a1[i] != a2[i]){
                return false;
            }
        }
        return true;
    }

    checkGoal(monster, dragX, dragY, buff){

        if(this.compareArray(monster.position, monster.goalPos) && monster.atGoal == false){
            console.log("YAY");
            monster.movable = false;
            monster.setInteractive({ draggable: false });
            monster.atGoal = true;
            monster.setTint(0x4ee84e);
            return true;
        }
        return false;

    }

    monsterMove(monster, dragX, dragY, buff){ 
        //moving right        
        if(dragX - buff > monster.x && this.getValueAt(monster.position[0], monster.position[1]+1) == monster.type && monster.movable == true && JSON.stringify(this.monsterPos).indexOf(JSON.stringify([monster.position[0], monster.position[1]+1])) == -1){
                let newPosition = [monster.position[0], monster.position[1]+1];
                this.movePiece(monster.position[0], monster.position[1], newPosition[0], newPosition[1]);
                monster.x += 80;
                monster.position = newPosition;
                this.monsterPos[monster.type] = monster.position;
        }
        
        //moving down
        else if(dragY - buff > monster.y && this.getValueAt(monster.position[0]+1, monster.position[1]) == monster.type && monster.movable == true && JSON.stringify(this.monsterPos).indexOf(JSON.stringify([monster.position[0]+1, monster.position[1]])) == -1){
            let newPosition = [monster.position[0]+1, monster.position[1]];
            this.movePiece(monster.position[0], monster.position[1], newPosition[0], newPosition[1]);
            monster.y += 80;
            monster.position = newPosition;
            this.monsterPos[monster.type] = monster.position;



        }

        //moving left
        else if(dragX+ buff < monster.x && this.getValueAt(monster.position[0], monster.position[1]-1) == monster.type && monster.movable == true && JSON.stringify(this.monsterPos).indexOf(JSON.stringify([monster.position[0], monster.position[1]-1])) == -1){
            let newPosition = [monster.position[0], monster.position[1]-1];
            this.movePiece(monster.position[0], monster.position[1], newPosition[0], newPosition[1]);

            monster.x -= 80;
            monster.position = newPosition;
            this.monsterPos[monster.type] = monster.position;

        }

        //moving up
        else if(dragY+buff < monster.y && this.getValueAt(monster.position[0]-1, monster.position[1]) == monster.type && monster.movable == true && JSON.stringify(this.monsterPos).indexOf(JSON.stringify([monster.position[0]-1, monster.position[1]])) == -1){
            let newPosition = [monster.position[0]-1, monster.position[1]];
            this.movePiece(monster.position[0], monster.position[1], newPosition[0], newPosition[1]);

            monster.y -= 80;
            monster.position = newPosition;
            this.monsterPos[monster.type] = monster.position;


        }

        if(this.checkGoal(monster, dragX, dragY, buff)){
            console.log("goal reached");

            this.goalsReached ++;

            if(this.goalsReached == 3){
                monster.win = true;
                if(this.levelnum == this.maxLevelSolved){
                    this.maxLevelSolved += 1;

                }

                localStorage.setItem(gameOptions.localStorageName,JSON.stringify({
                    CurrentLevel: this.levelnum,
                    MaxLevelSolved: this.maxLevelSolved
                }));
            }
            
        }

    }


    movePiece(OldRow, OldColumn, NewRow, NewColumn){
        
        if(this.validPick(OldRow, OldColumn)){
            this.gameArray[OldRow][OldColumn].piece = 0;

        }

        if(this.validPick(NewRow, NewColumn)){
            this.gameArray[NewRow][NewColumn].piece = 1;

        }

    }

    next(){
        if(this.levelnum < this.totallevels && this.levelnum < this.maxLevelSolved){
            this.levelnum ++;
            localStorage.setItem(gameOptions.localStorageName,JSON.stringify({
                CurrentLevel: this.levelnum,
                MaxLevelSolved: this.maxLevelSolved

            }));

            this.goalsReached = 0;
            this.swaps = this.swapAmmounts[this.levelnum];

    
        }
    }

    prev(){
        if(this.levelnum > 0){
            this.levelnum --;
            localStorage.setItem(gameOptions.localStorageName,JSON.stringify({
                CurrentLevel: this.levelnum,
                MaxLevelSolved: this.maxLevelSolved
            }));

            this.goalsReached = 0;
            this.swaps = this.swapAmmounts[this.levelnum];
    
        }

    }

    reset(){
        this.goalsReached = 0;
        this.swaps = this.swapAmmounts[this.levelnum];
    }

    checkEnd(){
        if(this.levelnum == this.totallevels){
            return true;
        }
        else{
            return false;
        }
    
    }



}
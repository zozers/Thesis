import LevelInfo from './assets/levels.js'
let game;
let gameOptions = {
    gemSize: 80,
    boardOffset: {
        x: 80,
        y: 320
    },

    localStorageName: "ThesisGameLogic"
}

window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: 0x222222,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            width: 800,
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
        this.monsterArr = [];
        this.aiTiles = [];
        this.aiTimeline;
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
        this.load.image("home", 'assets/sprites/home.png');
        this.load.image("bar", 'assets/sprites/bar.png');
        this.load.image("back_arrow", 'assets/sprites/back_arrow.png');
    }

    create(){
        this.GameLogic = new GameLogic({
            rows: 6,
            columns: 6,
            items: 3,
        });


        if(localStorage.getItem(gameOptions.localStorageName) == null || Object.keys(JSON.parse(localStorage.getItem(gameOptions.localStorageName))).length != 2){
            console.log("Back to zero");
            localStorage.setItem(gameOptions.localStorageName,JSON.stringify({
                CurrentLevel: 0,
                MaxLevelSolved: 0

            }));
        }

        if(this.GameLogic.ai_mode == false){
            this.savedData = JSON.parse(localStorage.getItem(gameOptions.localStorageName));
            this.GameLogic.maxLevelSolved = this.savedData.MaxLevelSolved;
            this.GameLogic.levelnum = this.savedData.CurrentLevel;

        }

        
        let obj = this.GameLogic.levelInfo.get_level(this.GameLogic.levelnum);
        console.log(obj);

        this.GameLogic.currentLevelBoard = obj.boardInfo;
        this.GameLogic.currentLevelMonsters = obj.MonsterPos;
        this.GameLogic.currentLevelGoals = obj.GoalPos;
        this.GameLogic.swaps = obj.Swaps;
        this.GameLogic.generateBoard();            
        this.drawField();
        this.buttons();
        this.monsters();

        
 
    }

    new(button){

        if(this.GameLogic.ai_mode == true){
            this.GameLogic.generateBoard();
            this.aidrawField();
            this.buttons();
            this.monsters();
        }
        else{
            button.destroy();
            this.sprites = [];

            let obj = this.GameLogic.levelInfo.get_level(this.GameLogic.levelnum);
            console.log(obj);
            this.GameLogic.currentLevelBoard = obj.boardInfo;
            this.GameLogic.currentLevelGoals = obj.GoalPos;
            this.GameLogic.currentLevelMonsters = obj.MonsterPos;
            this.GameLogic.swaps = obj.Swaps;


            this.GameLogic.generateBoard();
            this.drawField();
            this.buttons();
            this.monsters();
        }

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

        let button1 = this.add.sprite(game.config.width / 2- 220, game.config.height - 200, 'red_blue');
        console.log(this.GameLogic.ai_mode);
        if(this.GameLogic.ai_mode == false){
            console.log(this.GameLogic.ai_mode);
            button1.setInteractive();
        }
        this.sprites.push(button1);
        
        let button2 = this.add.sprite(game.config.width / 2 + 0, game.config.height - 200, 'yellow_red');
        if(this.GameLogic.ai_mode == false){
            button2.setInteractive();
        }
        
        this.sprites.push(button2);
    
           
        let button3 = this.add.sprite(game.config.width / 2 + 220, game.config.height - 200, 'yellow_blue');
        if(this.GameLogic.ai_mode == false){
            button3.setInteractive();
        }
        this.sprites.push(button3);
        let swapText;
        if(this.GameLogic.ai_mode == false){
            swapText = this.add.text(game.config.width/ 2 - 250, game.config.height/5 - 130, "Swaps Left: ", { font: '85px Arial', fill: '#BDBDBD'});
            this.sprites.push(swapText);
            this.GameLogic.displaySwap(swapText);

        }
        else{
            swapText = this.add.text(game.config.width/ 2 - 250, game.config.height/5 - 130, "AI Mode!", { font: '85px Arial', fill: '#BDBDBD'});
            this.sprites.push(swapText);
        }

        let prev = this.add.sprite(game.config.width/ 2 - 220, game.config.height/5 + 30, 'button').setInteractive();
        
        if(this.GameLogic.levelnum > 0){
            prev.setTint(0xffffff);
        }
        else{
            prev.setTint(0xe22121);
        }
       
        this.sprites.push(prev);

        if(this.GameLogic.ai_mode == false){
            let prevText = this.add.text(game.config.width/2 - 310 , game.config.height/5 + 10, "Previous Level", { font: '28px Arial', color: '0x222222' });
            this.sprites.push(prevText);
        }
        else{
            let prevText = this.add.text(game.config.width/2 - 310 , game.config.height/5 + 10, "Stop", { font: '28px Arial', color: '0x222222' });
            this.sprites.push(prevText);
        }
        
        let reset = this.add.sprite(game.config.width / 2 , game.config.height/5 + 30, 'button').setInteractive();
        this.sprites.push(reset);

        let resetText = this.add.text(game.config.width/2 - 80, game.config.height/5 + 10, "Reset Level", { font: '30px Arial', color: '0x222222' });
        this.sprites.push(resetText);


        let next = this.add.sprite(game.config.width/ 2 + 220, game.config.height/5 + 30, 'button').setInteractive();
        if(this.GameLogic.levelnum < this.GameLogic.maxLevelSolved && this.GameLogic.levelnum < this.GameLogic.totallevels || this.GameLogic.ai_mode == true){
            next.setTint(0xffffff);

        }
        else{
            next.setTint(0xe22121);
        }
       
        this.sprites.push(next);
        if(this.GameLogic.ai_mode == false){

            let nextText = this.add.text(game.config.width/2 + 150, game.config.height/5 + 10, "Next Level", { font: '30px Arial', color: '0x222222' });
            this.sprites.push(nextText);
        }
        else{
            let nextText = this.add.text(game.config.width/2 + 150, game.config.height/5 + 10, "Start", { font: '30px Arial', color: '0x222222' });
            this.sprites.push(nextText);
        }

        // let home = this.add.sprite(game.config.width/2 - 290, game.config.height/5 + 140, "home").setInteractive();
        // this.sprites.push(home);
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
 
            if(this.GameLogic.ai_mode == true){
                // ai
                this.GameLogic.reset();
                this.new(reset);
                this.aiMovement(this.GameLogic.instructions, this.monsterArr); 
            }
            else{
                this.GameLogic.next();
                this.new(next);
            }

        }, this);

        prev.on('pointerdown', function (pointer)
        {
            if(this.GameLogic.ai_mode == true){
                this.timeline.stop();
            }
            else{

                for( let i=0; i < this.sprites.length; i++){
                    this.sprites[i].destroy();
                }

                this.GameLogic.prev();

                this.new(prev);
            }
            



        }, this);

        reset.on('pointerdown', function (pointer){
        
        for( let i=0; i < this.sprites.length; i++){
            this.sprites[i].destroy();
        }
    
        this.GameLogic.reset();
        this.new(reset);

        }, this);

        // home.on('pointerdown', function(pointer)
        // {

        //     for( let i=0; i < this.sprites.length; i++){
        //         this.sprites[i].destroy();
        //     }
        
        //     this.menu(home);


        // }, this);
    }

    goal(){

        let pos1 = this.GameLogic.currentLevelGoals[0];
        let goal1 = this.add.sprite(gameOptions.boardOffset.x + gameOptions.gemSize * (pos1[1]+1) +gameOptions.gemSize / 2, gameOptions.boardOffset.y + gameOptions.gemSize * pos1[0] + gameOptions.gemSize / 2, 'star');
        goal1.setDepth(1);
        goal1.setTint(0x2ca7b2);
        goal1.position = pos1;
        this.sprites.push(goal1);

        let pos2 = this.GameLogic.currentLevelGoals[1];
        console.log(pos2);
        let goal2 = this.add.sprite(gameOptions.boardOffset.x + gameOptions.gemSize * (pos2[1]+1) +gameOptions.gemSize / 2, gameOptions.boardOffset.y + gameOptions.gemSize * pos2[0] + gameOptions.gemSize / 2, 'star');
        goal2.setDepth(1);
        goal2.setTint(0xe84e4e);
        goal2.position = pos2;
        this.sprites.push(goal2);

        let pos3 =  this.GameLogic.currentLevelGoals[2];
        let goal3 = this.add.sprite(gameOptions.boardOffset.x + gameOptions.gemSize * (pos3[1]+1) +gameOptions.gemSize / 2, gameOptions.boardOffset.y + gameOptions.gemSize * pos3[0] + gameOptions.gemSize / 2, 'star');
        goal3.setDepth(1);
        goal3.setTint(0xf7c83b);
        goal3.position = pos3;
        this.sprites.push(goal3);
        return [goal1, goal2, goal3];

    }

    monsters(){
        this.monsterArr = [];
        let goals = this.goal();

        let goal1 = goals[0];
        let goal2 = goals[1];
        let goal3 = goals[2];


        let pos1 = this.GameLogic.currentLevelMonsters[0];
        let monster1 = this.add.sprite(gameOptions.boardOffset.x + gameOptions.gemSize * (pos1[1] + 1) + gameOptions.gemSize / 2, gameOptions.boardOffset.y + gameOptions.gemSize * pos1[0] + gameOptions.gemSize / 2, 'monster');
        if(this.GameLogic.ai_mode == false){
            monster1.setInteractive({ draggable: true });
        }
        this.sprites.push(monster1);
        this.monsterArr.push(monster1);


        monster1.setTint(0xf7c83b);
        monster1.depth = 2;
        monster1.position = pos1;
        monster1.type = 1;
        monster1.goalPos = goal3.position;
        monster1.movable = true;
        monster1.atGoal = false;
        monster1.win = false;

        let pos2 = this.GameLogic.currentLevelMonsters[1];
        let monster2 = this.add.sprite(gameOptions.boardOffset.x + gameOptions.gemSize * (pos2[1] + 1) + gameOptions.gemSize / 2, gameOptions.boardOffset.y + gameOptions.gemSize * pos2[0] + gameOptions.gemSize / 2, 'monster');
        if(this.GameLogic.ai_mode == false){
            monster2.setInteractive({ draggable: true });
        }
        this.sprites.push(monster2);
        this.monsterArr.push(monster2);

        monster2.setTint(0x2ca7b2);
        monster2.depth = 2;
        monster2.position = pos2;
        monster2.type = 2;
        monster2.goalPos = goal1.position;
        monster2.movable = true;
        monster2.atGoal = false;
        monster2.win = false;

        let pos3 = this.GameLogic.currentLevelMonsters[2];
        let monster3 = this.add.sprite(gameOptions.boardOffset.x + gameOptions.gemSize * (pos3[1] + 1) + gameOptions.gemSize / 2, gameOptions.boardOffset.y + gameOptions.gemSize * pos3[0] + gameOptions.gemSize / 2, 'monster');
        if(this.GameLogic.ai_mode == false){
            monster3.setInteractive({ draggable: true });
        }
        this.sprites.push(monster3);
        this.monsterArr.push(monster3);

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
            let winText = this.add.text(game.config.width / 2 - 120, game.config.height /2-15, "YOU WIN!", { font: '55px Arial', color: '0x222222' });
        }

        else{
            let nextButton = this.add.sprite(game.config.width / 2 , game.config.height/2, 'button').setInteractive();
            let nextText = this.add.text(game.config.width / 2 - 80, game.config.height /2-15, "Next Level", { font: '35px Arial', color: '0x222222' });
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

    menu(house){
        
        house.destroy();
        let back_arrow = this.add.sprite(game.config.width/2 - 290, game.config.height/5 + 140, "back_arrow").setInteractive();
        let bar1 = this.add.sprite(game.config.width / 2 , game.config.height/5 + 40, 'bar').setInteractive();
        let bar2 = this.add.sprite(game.config.width / 2 , game.config.height/5 + 220, 'bar').setInteractive();
        let bar3 = this.add.sprite(game.config.width / 2 , game.config.height/5 + 420, 'bar').setInteractive();

        bar1.setTint(0x2ca7b2);
        bar2.setTint(0x2ca7b2);
        bar3.setTint(0x2ca7b2);

        this.sprites.push(back_arrow);
        this.sprites.push(bar1);
        this.sprites.push(bar2);
        this.sprites.push(bar3);

        back_arrow.on('pointerdown', function (pointer){
            for( let i=0; i < this.sprites.length; i++){
                    this.sprites[i].destroy();
            }

            this.GameLogic.reset();
            this.new(back_arrow);
        
        }, this)


    }


    aidrawField(){
        this.aiTiles = [];
        for(let i = 0; i < this.GameLogic.getRows(); i ++){
            var row = []
            for(let j = 1; j <= this.GameLogic.getColumns(); j ++){
                let gemX = gameOptions.boardOffset.x + gameOptions.gemSize * j + gameOptions.gemSize / 2;
                let gemY = gameOptions.boardOffset.y + gameOptions.gemSize * i + gameOptions.gemSize / 2;
                let gem = this.add.sprite(gemX, gemY, "tiles", this.GameLogic.getValueAt(i, j-1)-1);
                gem.type = this.GameLogic.getValueAt(i, j-1)
                this.sprites.push(gem);
                row.push(gem);
                
            }
            this.aiTiles.push(row);
        }
    }

    aiMovement(instructions, monsters){
        let m1, m2, m3, direction, type, monster, m1Pos, m2Pos, m3Pos, pos;
        let monsterArr = [];
        let posArr = [];
        this.timeline = this.tweens.createTimeline();
        let game;
        for(let i=0; i < monsters.length; i++){
            if(monsters[i].type == 1){
                m1 = monsters[i];
                monsterArr.push(m1);
                m1Pos = [m1.x, m1.y];
                posArr.push(m1Pos);
            }
            else if(monsters[i].type == 2){
                m2 = monsters[i];
                monsterArr.push(m2);
                m2Pos = [m2.x, m2.y];
                posArr.push(m2Pos);
            }
            else{
                m3 = monsters[i];
                monsterArr.push(m3);
                m3Pos = [m3.x, m3.y];
                posArr.push(m3Pos);

            }

        }

        for(let j=0; j < instructions.length; j++){
            
            if(instructions[j][0].length == 2){
                game = this.GameLogic.gameArray;

                let c1Pos = this.GameLogic.ai_position_of_colors(instructions[j][0][0]);

                let c2Pos = this.GameLogic.ai_position_of_colors(instructions[j][0][1]);

                console.log("c1", instructions[j][0][0]);
                console.log("c2", instructions[j][0][1]);

                for(let p = 0; p < c1Pos.length; p ++){
                    var temp = this.aiTiles[c1Pos[p][0]][c1Pos[p][1]];
                    
                    this.timeline.add({
                        targets: this.aiTiles[c1Pos[p][0]][c1Pos[p][1]],
                        delay: 1,
                        duration: 50,
                        ease: 'Power2',
                        x: gameOptions.boardOffset.x + gameOptions.gemSize * (c2Pos[p][1] + 1) + gameOptions.gemSize / 2,
                        y: gameOptions.boardOffset.y + gameOptions.gemSize * c2Pos[p][0] + gameOptions.gemSize / 2
                    });

                    this.timeline.add({
                        targets: this.aiTiles[c2Pos[p][0]][c2Pos[p][1]],
                        delay: 1,
                        duration: 50,
                        ease: 'Power2',
                        x: gameOptions.boardOffset.x + gameOptions.gemSize * (c1Pos[p][1] + 1) + gameOptions.gemSize / 2,
                        y: gameOptions.boardOffset.y + gameOptions.gemSize * c1Pos[p][0] + gameOptions.gemSize / 2
                    });
                    this.aiTiles[c1Pos[p][0]][c1Pos[p][1]] = this.aiTiles[c2Pos[p][0]][c2Pos[p][1]];
                    this.aiTiles[c2Pos[p][0]][c2Pos[p][1]] = temp;


                }
                this.GameLogic.swapColors(instructions[j][0][0], instructions[j][0][1]);
            }
            else{
                direction = instructions[j][1];
                type = instructions[j][0];

                monster = monsterArr[type-1];
                pos = posArr[type-1];
                
                if(direction == "r"){
                    pos[0] += 80;
                    this.timeline.add({
                        targets:monster,
                        delay: 1,
                        duration: 500,
                        ease: 'Power2',
                        x:pos[0]
                    });
                }

                if(direction == "l"){
                    pos[0] -= 80;
                    this.timeline.add({
                        targets:monster,
                        delay: -1,
                        duration: 500,
                        ease: 'Power2',
                        x:pos[0]
                    });
                }

                if(direction == "u"){
                    pos[1] -= 80;
                    this.timeline.add({
                        targets:monster,
                        delay: -1,
                        duration: 500,
                        ease: 'Power2',
                        y:pos[1]
                    });
                }

                if(direction == "d"){
                    pos[1] += 80;
                    this.timeline.add({
                        targets:monster,
                        delay: -1,
                        duration: 500,
                        ease: 'Power2',
                        y:pos[1]
                    });
                }
            }

        }
            this.timeline.play();
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

        this.currentLevelBoard = null;
        this.currentLevelGoals = null;
        this.currentLevelMonsters = null;

        this.gameArray = [];

        this.swaps = null;

        this.levelInfo = new LevelInfo();
        this.levelnum = 0;
        this.maxLevelSolved = 0;

        this.totallevels = 2; // levelnum starts at 0 
        this.monsterPos = null;

        this.ai_mode = false;
        this.instructions = [[1, 'r'], [1, 'u'], [1, 'u'], [1, 'u'], [1, 'u'], [1, 'u'], [[2, 1], 's'], [1, 'r'], [2, 'r'], [2, 'u'], [2, 'u'], [[3, 2], 's'], [3, 'd'], [3, 'd'], [3, 'd'], [3, 'd'], [3, 'r'], [[1, 3], 's'], [3, 'r'], [3, 'r'], [[2, 3], 's'], [2, 'r'], [2, 'r'], [3, 'r'], [3, 'r'], [[3, 2], 's'], [2, 'r'], [2, 'r']];
        // this.instructions = [[1, 'u'], [[3, 2], 's'], [2, 'u'], [2, 'r'], [3, 'r'], [3, 'r'], [3, 'r'], [[2, 3], 's'], [2, 'u'], [2, 'r'], [1, 'u'], [1, 'r'], [[3, 1], 's'], [3, 'r'], [2, 'r'], [3, 'd'], [1, 'u'], [[1, 2], 's'], [1, 'u'], [[2, 3], 's'], [2, 'r'], [1, 'r'], [3, 'd'], [1, 'u'], [[3, 2], 's'], [2, 'r'], [3, 'r'], [[2, 3], 's'], [3, 'd'], [3, 'd']];
        // this.instructions = [[[1, 2], 's'], [[3, 2], 's']];
    }

    // generates the game board from the levels
    generateBoard(){
        for(let i = 0; i < this.rows; i ++){
            this.gameArray[i] = [];
            for(let j = 0; j < this.columns; j ++){
                let Value = this.currentLevelBoard[i][j];
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
            this.swaps = this.levelInfo.get_level(this.levelnum).Swaps;
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
    // answer to first level generated [[1, 'r'], [1, 'u'], [1, 'u'], [1, 'u'], [1, 'u'], [1, 'u'], [[2, 1], 's'], [1, 'r'], [2, 'r'], [2, 'u'], [2, 'u'], [[3, 2], 's'], [3, 'd'], [3, 'd'], [3, 'd'], [3, 'd'], [3, 'r'], [[1, 3], 's'], [3, 'r'], [3, 'r'], [[2, 3], 's'], [2, 'r'], [2, 'r'], [3, 'r'], [3, 'r'], [[3, 2], 's'], [2, 'r'], [2, 'r']]


    ai_position_of_colors(color){
        let position = [];

        for(let i = 0; i<this.gameArray.length; i++){
            for(let j = 0; j < this.gameArray[0].length; j++){
                if(this.gameArray[i][j].value == color){
                    position.push([this.gameArray[i][j].row, this.gameArray[i][j].column])
                }
            }
        }
        return position;
        

    }

    monsterMove(monster, dragX, dragY, buff){ 
        //moving right 
        if(dragX - buff > monster.x && this.getValueAt(monster.position[0], monster.position[1]+1) == monster.type && monster.movable == true && JSON.stringify(this.monsterPos).indexOf(JSON.stringify([monster.position[0], monster.position[1]+1])) == -1){
                console.log("right");      
                let newPosition = [monster.position[0], monster.position[1]+1];
                this.movePiece(monster.position[0], monster.position[1], newPosition[0], newPosition[1]);
                monster.x += 80;
                monster.position = newPosition;
                console.log(monster.position);
                this.monsterPos[monster.type - 1] = monster.position;
        }
        
        //moving down       
        else if(dragY - buff > monster.y && this.getValueAt(monster.position[0]+1, monster.position[1]) == monster.type && monster.movable == true && JSON.stringify(this.monsterPos).indexOf(JSON.stringify([monster.position[0]+1, monster.position[1]])) == -1){
            console.log("down");
            let newPosition = [monster.position[0]+1, monster.position[1]];
            this.movePiece(monster.position[0], monster.position[1], newPosition[0], newPosition[1]);
            monster.y += 80;
            monster.position = newPosition;
            this.monsterPos[monster.type - 1] = monster.position;



        }

        //moving left
        else if(dragX+ buff < monster.x && this.getValueAt(monster.position[0], monster.position[1]-1) == monster.type && monster.movable == true && JSON.stringify(this.monsterPos).indexOf(JSON.stringify([monster.position[0], monster.position[1]-1])) == -1){
            console.log("left");
            let newPosition = [monster.position[0], monster.position[1]-1];
            this.movePiece(monster.position[0], monster.position[1], newPosition[0], newPosition[1]);

            monster.x -= 80;
            monster.position = newPosition;
            this.monsterPos[monster.type - 1] = monster.position;

        }

        //moving up
        else if(dragY+buff < monster.y && this.getValueAt(monster.position[0]-1, monster.position[1]) == monster.type && monster.movable == true && JSON.stringify(this.monsterPos).indexOf(JSON.stringify([monster.position[0]-1, monster.position[1]])) == -1){
            console.log("up");    
            let newPosition = [monster.position[0]-1, monster.position[1]];
            this.movePiece(monster.position[0], monster.position[1], newPosition[0], newPosition[1]);

            monster.y -= 80;
            monster.position = newPosition;
            this.monsterPos[monster.type - 1] = monster.position;


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
            this.swaps = this.levelInfo.get_level(this.levelnum).Swaps;
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
            this.swaps = this.levelInfo.get_level(this.levelnum).Swaps;
    
        }

    }

    reset(){
        this.goalsReached = 0;
        this.swaps = this.levelInfo.get_level(this.levelnum).Swaps;
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
// LEVEL DESIGN
function Level(){
    //ARENA AND STUFF
    this.width = 640;
    this.height = 400;
    this.inGame = false;

    this.createCanvas = function(){
        var canvas = createCanvas(this.width,this.height);
        canvas.parent('stage');
    }

    this.arena = function(){
        noStroke();
        background("#22AF97");
        fill("#14A088");
        rectMode(CORNER);
        rect(width/2,0,width/2,height);
    }

    this.score = function(){

        // PLAYER1
        fill("#14A088");
        textSize(150);
        textFont("Montserrat");
        textAlign(CENTER, CENTER);
        text(GAMEDATA.points1, 160, 200);

        // PLAYER2
        fill("#22AF97");
        textSize(150);
        textFont("Montserrat");
        textAlign(CENTER, CENTER);
        text(GAMEDATA.points2, 480, 200);

    }

    // OVERLAY INTERFACE

    this.overlay = function(){

        RoomInput = createInput('');
        RoomInput.parent("EnterRoomOverlayWindow");

        var but = createButton('Join Room');
        but.parent("EnterRoomOverlayWindow");
        but.mousePressed(setRoom);

    }

    // CHECK WIN

    this.checkWin = function(){
        if(PLAYERID === 1){

            if(GAMEDATA.points1 >= 21){
                // WINNER
                var WinnerOverlay = document.getElementById('WinnerOverlay');
                WinnerOverlay.className = "overlay";
                // STOP
                noLoop();
            }

            if(GAMEDATA.points2 >= 21){
                // LOSER
                var LoserOverlay = document.getElementById('LoserOverlay');
                LoserOverlay.className = "overlay";
                // STOP
                noLoop();
            }


        }else{

            if(GAMEDATA.points2 >= 21){
                // WINNER
                var WinnerOverlay = document.getElementById('WinnerOverlay');
                WinnerOverlay.className = "overlay";
                // STOP
                noLoop();
            }

            if(GAMEDATA.points1 >= 21){
                // LOSER
                var LoserOverlay = document.getElementById('LoserOverlay');
                LoserOverlay.className = "overlay";
                // STOP
                noLoop();
            }

        }
    }

    // GAME STATES

    this.gameStates = function(){
        if(ROOMSETTINGS.player === 0){
            // ENTER ROOM PHASE
            // console.log("ENTER ROOM ID");
            var EnterRoomOverlay = document.getElementById('EnterRoomOverlay');
            EnterRoomOverlay.className = "overlay";
        } 
        
        else if(ROOMSETTINGS.player === 1){
            // WAITING FOR PLAYER 2 PHASE
            // console.log("WAITING ON PLAYER 2");
            var EnterRoomOverlay = document.getElementById('EnterRoomOverlay');
            EnterRoomOverlay.className = "hide";

            var WaitingOverlay = document.getElementById('WaitingOverlay');
            WaitingOverlay.className = "overlay";
        } 
        
        else if(ROOMSETTINGS.player === 2){
            // GAME READY PHASE
            // console.log("START GAME");

            var EnterRoomOverlay = document.getElementById('EnterRoomOverlay');
            EnterRoomOverlay.className = "hide";

            var WaitingOverlay = document.getElementById('WaitingOverlay');
            WaitingOverlay.className = "hide";

            this.inGame = true;

        } 

        this.checkWin();
    }

    

}
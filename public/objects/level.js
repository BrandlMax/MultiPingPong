// LEVEL DESIGN
function Level(){
    //ARENA AND STUFF
    this.width = 640;
    this.height = 400;
    this.inGame = false;

    // MANIPULATION
    this.body = document.getElementById("body");
    this.title = document.getElementById("maintitle");
    this.canvas = document.getElementById("defaultCanvas0");

    this.createCanvas = function(){
        var canvas = createCanvas(this.width,this.height);
        canvas.parent('stage');
    }

    this.arena = function(){
        noStroke();

        if(catmode){
            background("#CB56BE");
            fill("#B14BA6");
            rectMode(CORNER);
            rect(width/2,0,width/2,height);
        }
        else{
            background("#22AF97");
            fill("#14A088");
            rectMode(CORNER);
            rect(width/2,0,width/2,height);
        }
    }

    this.score = function(){

        // PLAYER1
        if(catmode){
            fill("#B14BA6");
        } else{
            fill("#14A088");
        }
        textSize(150);
        textFont("Montserrat");
        textAlign(CENTER, CENTER);
        text(GAMEDATA.points1, 160, 200);

        // PLAYER2
        if(catmode){
            fill("#CB56BE");
        } else{
            fill("#22AF97");
        }
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

    this.nocatmode = function(){
        this.title.innerHTML = "PING PONG˚";
        this.body.style.backgroundImage  = "none";
        this.canvas.style.opacity = "1";
    }

    this.catmode = function(){
        this.title.innerHTML = "<em>Cat</em> Pong";
        this.body.style.backgroundImage  = "url(../img/universe1.jpg)";
        this.canvas.style.opacity = "0.9";
    }

    

}
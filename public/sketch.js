// NODEJS

// INIT VARS
var TRANSFER;
var LEVEL;
var BALL;
var PLAYER1;
var PLAYER2;

// INIT GAMEDATA
var GAMEDATA;
var GAMESETTINGS;
var PLAYERID = 0;

// DISPLAY ELEMENTS
var RoomInput;

//
// SETUP
// 
function setup() {

    document.ontouchmove = function(event){
        event.preventDefault();
    }

    //
    //NODEJS
    //

    // NODE HELPER & COMMUNICATION
    TRANSFER = new Transfer();

    // CONNECT TO SERVER
    // LOCAL NETWORK
    //TRANSFER.connectToServer("http://192.168.0.105:1337");
    // LOCAL MACHINE
    TRANSFER.connectToServer("http://pongmultiplayer.herokuapp.com");

    // FRAMERATE
    smooth();
    // frameRate(30);
    
    // SETUP GAMEFIELD
    LEVEL = new Level();
    LEVEL.createCanvas();
    LEVEL.arena();


    // SETUP GAMEDATA
    GAMEDATA = {
        room: 0,
        gamestate: 0,
        points1: 0,
        points2: 0,

        player1: {
            x: 30,
            y: 165,
            w: 10,
            h: 70
        },

        player2: {
            x: 610,
            y: 165,
            w: 10,
            h: 70
        },

        ball:{
            x: 320,
            y: 200,
            size: 15,
            speedX: 3,
            speedY: 3
        }
    }

    // GAMESETTING
    ROOMSETTINGS = {
        player: 0,
    }

    //SETUP BALL
    BALL = new Ball();

    // SETUP PLAYERS
    PLAYER1 = new Player();
    PLAYER2 = new Player();

    
    // GET DATA FROM SERVER AND RUN FUNCTION
    TRANSFER.socket.on('GameData', TRANSFER.updateFromServer);
    TRANSFER.socket.on('RoomSettings', TRANSFER.updateRoomSettings);
    TRANSFER.socket.on('RoomFull', TRANSFER.RoomFull);


    //INTERFACE
    LEVEL.overlay();

    // CONTROL MESSAGES
    TRANSFER.socket.on('Message', function(data) {
        console.log(data);
    });

}


// GET ROOM DATA & ENTER ROOM
function setRoom(){
    var room = RoomInput.value();
    TRANSFER.room = room;
    GAMEDATA.room = TRANSFER.room;
    TRANSFER.enterRoom();
}



// INTERACTION & CONTROL
function mouseMoved(){
    if(PLAYERID === 1){
        GAMEDATA.player1.y = mouseY;
    }

    if(PLAYERID === 2){
        GAMEDATA.player2.y = mouseY;
    }
}

function mouseClicked(){
    BALL.onMove = true;
}

// IPAD / TOUCH INTERACTION
function touchMoved() {
    if(PLAYERID === 1){
        GAMEDATA.player1.y = mouseY;
    }

    if(PLAYERID === 2){
        GAMEDATA.player2.y = mouseY;
    }
}


//
// RENDER
// 

function draw() {
    
    LEVEL.arena();
    LEVEL.score();
    LEVEL.gameStates();

    // BALL
    BALL.ball();
    BALL.move();

    // PLAYER
    PLAYER1.player1();
    PLAYER2.player2();

    // UPDATE
    TRANSFER.sendDataToServer(GAMEDATA);
}
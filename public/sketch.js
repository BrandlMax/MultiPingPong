// NODEJS

// INIT VARS
var TRANSFER;
var LEVEL;
var BALL;
var PLAYER1;
var PLAYER2;

// INIT GAMEDATA
var GAMEDATA;
var GAMEDATAP2;
var GAMESETTINGS;
var PLAYERID = 0;

// DISPLAY ELEMENTS
var RoomInput;


// TESTMODE
var testmode = false;

//CATMODE
var catmode = false;
var p1img;
var p2img;
var catpurr;
var catmeow1;
var catmeow2;
var catlose;

//
// SETUP
//

function preload(){

    // SOUNDS BY http://www.orangefreesounds.com/
    catpurr = loadSound('sound/cat.mp3');
    catmeow1 = loadSound('sound/meow1.wav');
    catmeow2 = loadSound('sound/meow2.mp3');
    catlose = loadSound('sound/lose.wav');
}

function setup() {
    
    // LOAD IMAGES & SOUND
    p1img = loadImage("img/player1.png"); 
    p2img = loadImage("img/player2.png"); 


    document.ontouchmove = function(event){
        event.preventDefault();
    }

    //
    //NODEJS
    //

    // NODE HELPER & COMMUNICATION
    TRANSFER = new Transfer();

    // CONNECT TO SERVER
    // LOCAL NETWORK MACBOOK
    // TRANSFER.connectToServer("http://192.168.0.105:1337");
    // HEROKU TEST
    TRANSFER.connectToServer("https://pongmultiplayer.herokuapp.com/");
    // LOCALHOST
    // TRANSFER.connectToServer("http://localhost:1337");

    // FRAMERATE
    smooth();
    // frameRate(30);
    
    // SETUP GAMEFIELD
    LEVEL = new Level();
    LEVEL.createCanvas();
    LEVEL.arena();


    // SETUP GAMEDATA
    // HOST
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

        ball:{
            x: 320,
            y: 200,
            size: 15,
            speedX: 3,
            speedY: 3
        }
    }

    // GAMEDATA P2
    GAMEDATAP2 = {
        room: 0,
        player2: {
            x: 610,
            y: 165,
            w: 10,
            h: 70
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

    // FOR PLAYER 2
    TRANSFER.socket.on('GameDataP2', TRANSFER.updateFromServerP2);


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
    GAMEDATAP2.room = TRANSFER.room;
    TRANSFER.enterRoom();
}



// INTERACTION & CONTROL
function mouseMoved(){
    if(PLAYERID === 1){
        GAMEDATA.player1.y = mouseY;
    }

    if(PLAYERID === 2){
        GAMEDATAP2.player2.y = mouseY;
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
        GAMEDATAP2.player2.y = mouseY;
    }
}


// ACTIVATE AUTOPILOT
function keyPressed() {
    // ACTIVATE AUTOPILOT WITH "T"
    if (keyCode === 84) {
        testmode = !testmode;
    }

    if (keyCode === 67) {
        catmode = !catmode;

        catpurr.setVolume(0.5);

        if(catmode){
            LEVEL.catmode();
            //catpurr.play();
            catpurr.loop();
        }else{
            LEVEL.nocatmode();
            catpurr.stop();
        }
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

    if(PLAYERID === 1){
        BALL.move();
    }
    


    //AUTOPILOT
    if(testmode){
        TRANSFER.autopilot();
    }

    //CATMODE
    if(catmode){
        if( GAMEDATA.ball.speedX > -10 && GAMEDATA.ball.speedX < 10){
            this.body.style.backgroundImage  = "url(../img/universe1.jpg)";
        }else{
            this.body.style.backgroundImage  = "url(../img/bg.gif)";
        }
    }

    // PLAYER
    PLAYER1.player1();
    PLAYER2.player2();

    // UPDATE
    if(PLAYERID === 1){
        TRANSFER.sendDataToServer(GAMEDATA);
    }else{
         TRANSFER.sendDataToServerP2(GAMEDATAP2);
    }
    
}
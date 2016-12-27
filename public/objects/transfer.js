// COMMUNICATION TO SERVER
// NODER HELPER

// COMMANDS:
// SEND DATA 
// socket.emit('msg', keyCode);
// GET DATA AND RUN FUNCTION WITH DATA PARAMETER
// socket.on('msg', incomeLog);

function Transfer(){
    // TALK TO SERVER & TRANSFER DATA

    this.socket;
    this.room;
    this.serverGAMEDATA;
    this.serverGAMEDATAP2;


    // 1. CONNECT
    this.connectToServer = function(url){    
        // CONNECT TO SOCKET SERVER 
        this.socket = io.connect(url);
    }


    // 2. SET ROOM
    this.enterRoom = function(){
        this.socket.emit('room', this.room);
    }


    // 3. SEND GAME DATA
    this.sendDataToServer = function(GAMEDATA){
        // SEND DATA TO SERVER
            this.socket.emit('GameData', GAMEDATA);
    }

    this.sendDataToServerP2 = function(GAMEDATAP2){
        // SEND DATA TO SERVER
            this.socket.emit('GameDataP2', GAMEDATAP2);
    }


    // 4. GET GAME DATA
    this.updateFromServer = function(serverGAMEDATA){
        // GET DATA FROM SERVER AND UPDATE
        this.serverGAMEDATA = serverGAMEDATA;
        GAMEDATA = serverGAMEDATA;
       
    }

    this.updateFromServerP2 = function(serverGAMEDATAP2){
        this.serverGAMEDATAP2 = serverGAMEDATAP2;
        GAMEDATAP2 = serverGAMEDATAP2;
    }


    // ROOM SETTINGS
    this.updateRoomSettings = function(serverROOMSETTINGS){

        ROOMSETTINGS = serverROOMSETTINGS;

        // SET PLAYERID
        if(PLAYERID === 0){
            PLAYERID = ROOMSETTINGS.player;
            console.log("PLAYERID: " + PLAYERID);
        }

        console.log(serverROOMSETTINGS);
    }

    // IF ROOM IS FULL

    this.RoomFull = function(data){
        var error = createDiv(data);
        error.addClass("error");
        error.parent("EnterRoomOverlayWindow");
    }


    // AUTOPILOT

    this.autopilot = function(){
        GAMEDATAP2.player2.y = GAMEDATA.ball.y;
        //console.log(GAMEDATA.ball.y +  " : " + GAMEDATAP2.player2.y);
    }

    
}
// PLAYER
function Player(count){

    this.player1 = function(){

        var x = GAMEDATA.player1.x;
        var y = GAMEDATA.player1.y;
        var w = GAMEDATA.player1.w;
        var h = GAMEDATA.player1.h;

        // BLOCKER
        if(y < h/2){
            y = h/2
        } else if( y > 400-h/2){
            y = 400-h/2;
        }

        rectMode(CENTER);
        rect(x,y,w,h);
    }

    this.player2 = function(){

        var x = GAMEDATAP2.player2.x;
        var y = GAMEDATAP2.player2.y;
        var w = GAMEDATAP2.player2.w;
        var h = GAMEDATAP2.player2.h;

        // BLOCKER
        if(y < h/2){
            y = h/2
        } else if( y > 400-h/2){
            y = 400-h/2;
        }

        rectMode(CENTER);
        rect(x,y,w,h);
    }

}
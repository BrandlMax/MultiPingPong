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

        if(catmode){
            imageMode(CENTER);
            var reso = p1img.height / h;
            image(p1img, x, y, p1img.width / reso, p1img.height/reso);
        } else{
            rectMode(CENTER);
            rect(x,y,w,h);
        }
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

        if(catmode){
            imageMode(CENTER);
            var reso = p1img.height / h;
            image(p2img, x, y, p2img.width / reso, p2img.height/reso);
        } else{
            rectMode(CENTER);
            rect(x,y,w,h);
        }
    }

}
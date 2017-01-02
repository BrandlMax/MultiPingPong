// BALL
function Ball(){
    // BALL PHYSICS AND STUFF

    this.onMove = false;

    this.ball = function(){

        var x = GAMEDATA.ball.x;
        var y = GAMEDATA.ball.y;
        var s = GAMEDATA.ball.size;


        fill('#ffffff');
        ellipse(x, y, s, s);

    }

    this.move = function(){

        var speedX = GAMEDATA.ball.speedX;
        var speedY = GAMEDATA.ball.speedY;

        if(this.onMove){
            GAMEDATA.ball.x = GAMEDATA.ball.x + speedX;
            GAMEDATA.ball.y = GAMEDATA.ball.y + speedY;

             this.checkCollision();
        }


    }

    this.speedUp = function(){
        if(GAMEDATA.ball.speedX < 0){
            GAMEDATA.ball.speedX = GAMEDATA.ball.speedX - 0.5;
        }else{
            GAMEDATA.ball.speedX = GAMEDATA.ball.speedX + 0.5;
        }

        if(GAMEDATA.ball.speedY < 0){
            GAMEDATA.ball.speedY = GAMEDATA.ball.speedY - 0.5;
        }else{
            GAMEDATA.ball.speedY = GAMEDATA.ball.speedY + 0.5;
        }
    }

    this.checkCollision = function(){

        // GET DATA
        var x = GAMEDATA.ball.x;
        var y = GAMEDATA.ball.y;
        var s = GAMEDATA.ball.size;
    
        var p1x = GAMEDATA.player1.x;
        var p1y = GAMEDATA.player1.y;
        var p1h = GAMEDATA.player1.h;
        var p1w = GAMEDATA.player1.w;

        var p2x = GAMEDATAP2.player2.x;
        var p2y = GAMEDATAP2.player2.y;
        var p2h = GAMEDATAP2.player2.h;
        var p2w = GAMEDATAP2.player2.w;

        // DIRECTION CHANGE
        function verticalCol(){
            GAMEDATA.ball.speedX *= -1;
        }

        function horizontalCol(){
            GAMEDATA.ball.speedY *= -1;
        }

        // WALLS
        if(x <= 0+s/2){

            GAMEDATA.ball.x = 0+s/2;
            // RESET BALL
            GAMEDATA.ball.x = LEVEL.width/2;
            GAMEDATA.ball.y = LEVEL.height/2;
            // ENEMY DIRECTION
            verticalCol();
            // RESET SPEED
            GAMEDATA.ball.speedX = 3;
            GAMEDATA.ball.speedY = 3;
            // POINT PLAYER 2
            if(LEVEL.inGame){
            GAMEDATA.points2 = GAMEDATA.points2 + 1;
            }
        } else if(x >= LEVEL.width-s/2){

            GAMEDATA.ball.x = LEVEL.width-s/2;
            // RESET BALL
            GAMEDATA.ball.x = LEVEL.width/2;
            GAMEDATA.ball.y = LEVEL.height/2;
            // ENEMY DIRECTION 
            verticalCol();
            // RESET SPEED
            GAMEDATA.ball.speedX = -3;
            GAMEDATA.ball.speedY = -3;
            // POINT PLAYER 1
            if(LEVEL.inGame){
                GAMEDATA.points1 = GAMEDATA.points1 + 1;
            }
            
        } else if(y <= 0+s/2){
            GAMEDATA.ball.y = 0+s/2;
            horizontalCol();
        } else if(y >= LEVEL.height-s/2){
            GAMEDATA.ball.y = LEVEL.height-s/2;
            horizontalCol();
           
        }

        // QUICK & DIRTY
        // PLAYER
        var paddleXArea1 = x >= (p1x - p1w/2) && x <= (p1x+p1w/2 + (-1*GAMEDATA.ball.speedX));
        var paddleYArea1 = y >= (p1y-p1h/2) && y <= (p1y+p1h/2);

        var paddleXArea2 = x >= (p2x-p2w/2 - GAMEDATA.ball.speedX) && x <= (p2x+p2w/2);
        var paddleYArea2 = y >= (p2y-p2h/2) && y <= (p2y+p2h/2);


        if(paddleXArea1 && paddleYArea1){
            if(y === p1y-p1h/2 || y === p1y+p1h/2){
                this.speedUp();
                horizontalCol();
            }else{
                this.speedUp();
                verticalCol();
            }
        }

        if(paddleXArea2 && paddleYArea2){
            if(y === p2y-p2h/2 || y === p2y+p2h/2){
                this.speedUp();
                horizontalCol();
            }else{
                this.speedUp();
                verticalCol();
            }
        }
    }

}
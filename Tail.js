// ====
// Tail
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Tail(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
      
    // Default sprite and scale, if not otherwise specified
    this.sprite = g_sprites.snakeBoddy;
    this.scale  = this.scale  || 1;
    this.isWaiting = true;
    this.isBlue = false;
    this.isTail = true;
    console.log("this can kill you: " + this.canItKill);
    this.decDelay = 1;
    this.num = 50;
    // this.cx = this.cx-10;

};

Tail.prototype = new Entity();

Tail.prototype.delay = 200 / NOMINAL_UPDATE_INTERVAL;

Tail.prototype.getNewPos = function(){
    this.isWaiting = false;


    this.cx = this.follow.cx; 
    this.cy = this.follow.cy;
    this.direction = this.follow.direction;
    // this.shouldUpdate();

    this.delay = 200 / NOMINAL_UPDATE_INTERVAL;
}

Tail.prototype.shouldUpdate = function() {
    var u = 30;
    // console.log(this.cx + " -- " + this.follow.cx   );
    /*if(util.distSq(this.cx, this.cy, this.follow.cx, this.follow.cy) > util.square(u)){
        this.cx = this.follow.cx;
        this.cy = this.follow.cy;
        
        // this.isWaiting = false;
    } */
    switch (this.direction) {
        case 'U':
            this.cx = this.follow.cx;
            this.cy = this.follow.cy+20;
            break;
        case 'D':
            this.cx = this.follow.cx;
            this.cy = this.follow.cy-20;
            break;
        case 'R':
            this.cx = this.follow.cx-20;
            this.cy = this.follow.cy;
            break;
        case 'L':
            this.cx = this.follow.cx+20;
            this.cy = this.follow.cy;
            break;
    
        default:
            break;
    }
    // this.direction = this.follow.direction;

    

}



Tail.prototype.update = function (du) {

    spatialManager.unregister(this);
    
    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    if(!this.follow.isWaiting){
        this.isWaiting=true;
    }
    
    if(this.isWaiting){
        this.delay -= 0.4 + this.decDelay;
    }

    var stig = game_score.get_score();

    if(stig > this.num){
        this.decDelay *= 1.3;
        this.num += 50;
    }

    if (this.delay < 0) {
        this.getNewPos();
    }
    // this.shouldUpdate();
    
    


    this.rotation += this.velRot;
    this.rotation = util.wrapRange(this.rotation, 0, consts.FULL_CIRCLE);

    this.wrapPosition();

    this.updateSprite();
    
    spatialManager.register(this);
};

Tail.prototype.getRadius = function () {
    // Skoða þetta 
    return this.scale * (this.sprite.width / 2) * 0.9;
};

/*
Tail.prototype.turnBlue = function() {
    this.isBlue = true;
}*/


Tail.prototype.updateSprite = function () {
    if(entityManager.getSnakeIsBlue()) this.isBlue = true;
    else this.isBlue = false;
    if(this.isBlue) this.sprite = g_sprites.snakeBoddyBlue;
    else this.sprite = g_sprites.snakeBoddy;
}

Tail.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};

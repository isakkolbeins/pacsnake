// ======
// Snake
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Snake(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);


}

Snake.prototype = new Entity();

// Initial, inheritable, default values
Snake.prototype.rotation = 0;
Snake.prototype.cx = 200;
Snake.prototype.cy = 200;
Snake.prototype.velX = 1;
Snake.prototype.velY = 0;



Ship.prototype.KEY_UP = 'W'.charCodeAt(0);
Ship.prototype.KEY_DOWN  = 'S'.charCodeAt(0);
Ship.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Ship.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);


Snake.prototype.update = function (du) {

    spatialManager.unregister(this);

    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }
    if (keys[this.KEY_UP] /*&& this.velY <= 0*/){
        console.log("up pressed");
        this.velX = 0;
        this.velY = 1; 
    }

    this.calculateDirection();
   
    this.cx += this.velX * du;
    this.cy += this.velY * du;

    this.rotation = util.wrapRange(this.rotation,
                                0, consts.FULL_CIRCLE);

    this.wrapPosition();
    

    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.takeHit;
        if (canTakeHit) canTakeHit.call(hitEntity); 
        return entityManager.KILL_ME_NOW;
    }
        
    spatialManager.register(this);
};

Snake.prototype.calculateDirection = function () {
    //console.log("direction");

    if (keys[this.KEY_UP] /*&& this.velY <= 0*/){
        console.log("up pressed");
        this.velX = 0;
        this.velY = 1; 
    }
    if (keys[this.KEY_DOWN] && this.velY >= 0){
        this.velX = 0;
        this.velY = -1; 
    }  
    if (keys[this.KEY_LEFT] && this.velX <= 0){
        this.velX = 1;
        this.velY = 0; 
    }  
    if (keys[this.KEY_RIGHT] && this.velX >= 0){
        this.velX = -1;
        this.velY = 0; 
    } 
};

Snake.prototype.getRadius = function () {
    return 4;
};

Snake.prototype.takeHit = function () {
    // Ath hvort matur eða drepa

    this.kill();  
};

Snake.prototype.render = function (ctx) {

    g_sprites.snakeHead.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );

    ctx.globalAlpha = 1;
};

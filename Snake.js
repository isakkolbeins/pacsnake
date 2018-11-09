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
Snake.prototype.speed = 2;
Snake.prototype.velX = 2;
Snake.prototype.velY = 0;
Snake.prototype.direction = 'R';
Snake.prototype.isBlue = false;



Snake.prototype.KEY_UP = 'W'.charCodeAt(0);
Snake.prototype.KEY_DOWN  = 'S'.charCodeAt(0);
Snake.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Snake.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);


Snake.prototype.update = function (du) {

    spatialManager.unregister(this);

    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }
   
    this.calculateDirection();
   
    this.cx += this.velX * du;
    this.cy += this.velY * du;

    this.rotation = util.wrapRange(this.rotation,
                                0, consts.FULL_CIRCLE);

    this.wrapPosition();
    
/*
    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.takeHit;
        if (canTakeHit) canTakeHit.call(hitEntity); 
        return entityManager.KILL_ME_NOW;
    }*/
        
    spatialManager.register(this);
};

Snake.prototype.calculateDirection = function () {

    if (keys[this.KEY_UP] && this.direction != 'D'){
        this.velX = 0;
        this.velY = -1*this.speed;
        this.direction = 'U';
        this.rotation = -Math.PI/2;
    }
    if (keys[this.KEY_DOWN] && this.direction != 'U'){
        this.velX = 0;
        this.velY = this.speed; 
        this.direction = 'D';
        this.rotation = Math.PI/2;
    }  
    if (keys[this.KEY_LEFT] && this.direction != 'R'){
        this.velX = -1*this.speed;
        this.velY = 0; 
        this.direction = 'L';
        this.rotation = 0;
    }  
    if (keys[this.KEY_RIGHT] && this.direction != 'L'){
        this.velX = this.speed;
        this.velY = 0; 
        this.direction = 'R';
        this.rotation = 0;
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
    
    if(this.direction == 'L') {
        if(!this.isBlue){
            g_sprites.snakeHeadL.drawWrappedCentredAt(
                ctx, this.cx, this.cy, this.rotation
            );
        }else{
            g_sprites.snakeHeadBlueL.drawWrappedCentredAt(
                ctx, this.cx, this.cy, this.rotation
            );
        }

    }
    else {
        if(!this.isBlue){
            g_sprites.snakeHeadR.drawWrappedCentredAt(
                ctx, this.cx, this.cy, this.rotation
            );
        }else{
            g_sprites.snakeHeadBlueR.drawWrappedCentredAt(
                ctx, this.cx, this.cy, this.rotation
            );
        }
    }
    
        
    ctx.globalAlpha = 1;
};

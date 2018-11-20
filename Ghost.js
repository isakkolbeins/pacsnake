// ==========
// Ghost STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Ghost(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.randomisePosition();


    if(!this.color){
        this.color = 0;
    }

    switch (this.color) {
        case 0:
        this.sprite = g_sprites.ghostRed;
            break;
        case 1:
        this.sprite = g_sprites.ghostOrange;
            break;
        case 2:
        this.sprite = g_sprites.ghostPink;
            break;
        case 3:
        this.sprite = g_sprites.ghostBlue;
            break;

        default:
        this.sprite = this.sprite.ghostBlue;
            break;
    }

    // Set normal drawing scale, and warp state off
    this.scale = 1;
    // this._isWarping = false;
    this.isEdible = false;
    this.hasRespawned = false;

    this.rememberResets();


};

Ghost.prototype = new Entity();

Ghost.prototype.delay = 1000 / NOMINAL_UPDATE_INTERVAL;

Ghost.prototype.randomisePosition = function () {
    // Rock randomisation defaults (if nothing otherwise specified)
    this.cx = this.cx || 360 + Math.random() * 80;
    this.cy = this.cy || 370 + Math.random() * 60;
    var ran = Math.floor(Math.random()*4);
    switch (ran) {
        case 0:
        this.velX = 1;
        this.velY = 0;
            break;
        case 1:
        this.velX = -1;
        this.velY = 0;
            break;
        case 2:
        this.velY = 1;
        this.velX = 0;
            break;
        case 3:
        this.velY = -1;
        this.velX = 0;
            break;

        default:
            break;
    }
    this.rotation = this.rotation || 0;
};

Ghost.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
    this.reset_sprite = this.sprite;
};



// Initial, inheritable, default values
Ghost.prototype.rotation = 0;
//Ghost.prototype.velX = 0;
//Ghost.prototype.velY = 1;


/*
Ghost.prototype.getSnake = function(){
    var hitEntitys = spatialManager.findEntityInRange(this.cx,this.cy,10);

    hitEntitys.forEach(hitEntity => {
        if(!hitEntity.isBlue){
            hitEntity.kill();
            g_isUpdatePaused = true;

        }
    });
}
*/


Ghost.prototype._moveToASafePlace = function () {

    // Move to a safe place some suitable distance away
    var origX = this.cx,
        origY = this.cy,
        MARGIN = 40,
        isSafePlace = false;

    for (var attempts = 0; attempts < 100; ++attempts) {

        var warpDistance = 100 + Math.random() * g_canvas.width /2;
        var warpDirn = Math.random() * consts.FULL_CIRCLE;

        this.cx = origX + warpDistance * Math.sin(warpDirn);
        this.cy = origY - warpDistance * Math.cos(warpDirn);

        this.wrapPosition();

        // Don't go too near the edges, and don't move into a collision!
        if (!util.isBetween(this.cx, MARGIN, g_canvas.width - MARGIN)) {
            isSafePlace = false;
        } else if (!util.isBetween(this.cy, MARGIN, g_canvas.height - MARGIN)) {
            isSafePlace = false;
        } else {
            isSafePlace = !this.isColliding();
        }

        // Get out as soon as we find a safe place
        if (isSafePlace) break;

    }
};

Ghost.prototype.getBestMove = function() {
    // AI pælingar random sammt ekki random eftir leveli ?
    var snakePos = entityManager.getSnakePos();

    var bestX = snakePos.cx - this.cx;
    var bestY = snakePos.cy - this.cy;

    if (Math.abs(bestX) >= Math.abs(bestY)){
        this.velY = 0;
        this.velX = bestX/Math.abs(bestX);
   } else {
        this.velX = 0;
        this.velY = bestY/Math.abs(bestY);
    }
}

Ghost.prototype.getWorstMove = function() {
    var snakePos1 = entityManager.getSnakePos();

    var worstX = snakePos1.cx - this.cx;
    var worstY = snakePos1.cy - this.cy;

    if (Math.abs(worstX) >= Math.abs(worstY)){
        this.velX = 0;
        this.velY = worstX/Math.abs(worstX);
   } else {
        this.velY = 0;
        this.velX = worstY/Math.abs(worstY);
    }
}

Ghost.prototype.getRandomMove = function() {
    var rand = Math.floor(Math.random()*4 +1);
    switch (rand) {
        case 1:
            this.velX = 1;
            this.velY = 0;
            break;
        case 2:
            this.velX = -1;
            this.velY = 0;
            break;
        case 3:
            this.velX = 0;
            this.velY = 1;
            break;
        case 4:
            this.velX = 0;
            this.velY = -1;
            break;
        default:
            this.velX = 1;
            this.velY = 0;
            break;
    }

}

Ghost.prototype.update = function (du) {

    spatialManager.unregister(this);

    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    var rand = Math.random();

    this.delay -= du;

    if(entityManager.getSnakeIsBlue() && !this.hasRespawned){
        this.isEdible = true;
        this.sprite = g_sprites.ghostEdible;
    } else if (!entityManager.getSnakeIsBlue() && !this.hasRespawned){
        this.isEdible = false;
        this.sprite = this.reset_sprite;
    }

    if(this.delay < 0){
        if(this.isEdible){
            /// ATH ---- skoða eh skrítið
            //this.getWorstMove();
            if (rand > 0.2){
                this.getWorstMove();
            }else {
                this.getRandomMove();
            }
        this.delay = 1000 / NOMINAL_UPDATE_INTERVAL;
        }else{
            if (rand > 0.2){
                this.getBestMove();
            }else {
                this.getRandomMove();
            }
        this.delay = 1000 / NOMINAL_UPDATE_INTERVAL;
        }
    }
    this.wrapPosition();

    if(Level.checkCollisionGhost((this.cx + this.velX * du), (this.cy + this.velY * du))){
        this.cx -= this.velX * du;
        this.cy -= this.velY * du;
    } else {
        this.cx += this.velX * du;
        this.cy += this.velY * du;
    }



    spatialManager.register(this);

};


Ghost.prototype.getRadius = function () {
    return this.scale * (this.sprite.width / 2);
};

Ghost.prototype.eat = function () {
    game_score.add_score(20);
    this.kill();
};

Ghost.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
    this.rotation = this.reset_rotation;
    this.sprite = this.reset_sprite;
};

Ghost.prototype.respawn = function(){
    this.reset();
    this.setPos(g_canvas.width*0.5,g_canvas.height*0.5);
    this.isEdible = false;
    this.hasRespawned = true;
    this.resurrect();
    entityManager.resurrectGhost(this);
}

Ghost.prototype.render = function (ctx) {
    this.sprite.drawWrappedCentredAt(
	ctx, this.cx, this.cy, this.rotation
    );
};

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

    this.rememberResets();

    if(!this.color){
        this.color = 0;
    }
    
    // Default sprite, if not otherwise specified
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
        this.sprite = this.sprite;
            break;
    }
    
    // Set normal drawing scale, and warp state off
    this._scale = 1;
    this._isWarping = false;
};

Ghost.prototype = new Entity();

Ghost.prototype.randomisePosition = function () {
    // Rock randomisation defaults (if nothing otherwise specified)
    this.cx = this.cx || Math.random() * g_canvas.width;
    this.cy = this.cy || Math.random() * g_canvas.height;
    this.rotation = this.rotation || 0;
};

Ghost.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};



// Initial, inheritable, default values
Ghost.prototype.rotation = 0;
//Ghost.prototype.cx = 200;
//Ghost.prototype.cy = 200;
Ghost.prototype.velX = 0;
Ghost.prototype.velY = 1;


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

Ghost.prototype.getNextMove = function(level) {
    // AI pælingar random sammt ekki random eftir leveli ? 
    


}
    
Ghost.prototype.update = function (du) {

    spatialManager.unregister(this);


    
    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    this.cx += this.velX * du;
    this.cy += this.velY * du;

    this.wrapPosition();

};


Ghost.prototype.getRadius = function () {
    return this.sprite.width;
};

Ghost.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
    this.rotation = this.reset_rotation;
};


Ghost.prototype.render = function (ctx) {
    this.sprite.drawWrappedCentredAt(
	ctx, this.cx, this.cy, this.rotation
    );
};

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

    // this.delayMax = 20;

};

Tail.prototype = new Entity();

Tail.prototype.getNewPos = function(){
    this.cx = this.follow.cx; 
    this.cy = this.follow.cy;
}

Tail.prototype.update = function (du) {

    
    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);
    
    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }
    
    if (this.delay >= this.delayMax){
        this.getNewPos();
        this.delay = 0;
    }

    this.delay += this.delayMax/10 ;
    // setTimeout(this.getNewPos, 100);

    
    this.rotation += 1 * this.velRot;
    this.rotation = util.wrapRange(this.rotation, 0, consts.FULL_CIRCLE);

    this.wrapPosition();
    
    spatialManager.register(this);
};

Tail.prototype.getRadius = function () {
    return this.scale * (this.sprite.width / 2) * 0.9;
};



Tail.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};

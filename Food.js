"use strict";

function Food(descr){
    this.setup(descr);
    this.rememberResets();

    this.sprite = g_sprites.snakeBoddy;
    this._scale = 1;
    this._isWarping = false;

    this.isEdible = true;
    this.eaten = false;
};


Food.prototype = new Entity();

var radius = 10;

Food.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};

Food.prototype.eat = function(){
    this.kill();
};

Food.prototype.update = function(){

    spatialManager.unregister(this);

    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    spatialManager.register(this);
};

Food.prototype.render = function(ctx){

    this.sprite.scale = this.scale;
    this.sprite.alpha = 0.7;
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};

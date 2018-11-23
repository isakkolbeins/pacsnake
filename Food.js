// ======
// FOOD
// ======

"use strict";

function Food(descr){
    this.setup(descr);

    this.sprite = g_sprites.snakeBoddy;
    this.rememberResets();

    this.scale = 0.4;
    this._isWarping = false;

    this.canBeEaten = true;
    this.eaten = false;
};


Food.prototype = new Entity();

var radius =7;

Food.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_sprite = this.sprite;

};

Food.prototype.reset = function(){
    this.setPos(this.reset_cx, this.reset_cy);

    this.sprite = this.reset_sprite;
}

Food.prototype.eat = function(){
    this.kill();

    setTimeout(this.respawn_food.bind(this),60000);
};

Food.prototype.getRadius = function () {
    return this.scale * (this.sprite.width / 2) * 0.9;
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

Food.prototype.respawn_food = function(){
        this.resurrect();
        entityManager.createFood(this);
}

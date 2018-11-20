"use strict";

function Food(descr){
    this.setup(descr);
    
    this.sprite = g_sprites.snakeBoddy;
    this.rememberResets();

    
    this._scale = 1;
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

    setTimeout(this.respawn_food.bind(this),3000);
};

Food.prototype.update = function(){

    spatialManager.unregister(this);

    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    spatialManager.register(this);
};

Food.prototype.render = function(ctx){

    ctx.save();
    ctx.fillStyle = "yellow";
    util.fillCircle(ctx,this.cx,this.cy,radius);
    ctx.restore();
};

Food.prototype.respawn_food = function(){

    this.resurrect();
    entityManager.generateFood(this);
}

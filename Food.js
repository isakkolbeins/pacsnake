"use strict";

function Food(descr){
    this.setup(descr);
    this.rememberResets();

    this._scale = 1;
    this._isWarping = false;

    this.cx = descr.cx;
    this.cy = descr.cy;
    this.eaten = false;
};

Food.prototype = new Entity();

Food.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};

Food.prototype.eat = function(){
    this.kill();
};

Food.prototype.render = function(){

    util.fillCircle(g_ctx,this.cx,this.cy,5);
};

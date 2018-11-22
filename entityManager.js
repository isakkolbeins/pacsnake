// =================
// ENTITY MANAGEMENT
// =================


"use strict";

var entityManager = {

// "PRIVATE" DATA

_ghosts  : [],
_bullets : [],
_tail    : [],
_snake   : [],
_powerup : [],
_food : [],
_bShowRocks : true,



// "PRIVATE" METHODS

_generateGhosts : function() {
    var i,
        ghostCount = 4;

    for (i = 0; i < ghostCount; ++i) {
        this.generateGhost({color:i});

    }
},

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._food, this._tail, this._snake, this._powerup, this._ghosts];
},

init: function() {
    this._generateGhosts();
    this.generatePowerUp();
},

generateSnake : function(descr) {
    var snake = new Snake(descr);
    this._snake.push(snake);
    this.generateTail(this._snake[0]);
    for (let i = 0; i < descr.length; i++) {
        this.generateTail(this._tail[i]);
    }
},

generateTail : function(follow) {
    var delay = 0;
    var delayMax = this._tail.length;

    var itCanKill = true;

    if(this._tail.length <5){
        itCanKill = false;
    }

    var descr = {
        follow : follow,
        cx : follow.cx,
        cy : follow.cy,
        direction : follow.direction,
        delay : delay,
        canItKill: itCanKill,
        delayMax : delayMax
    };
    this._tail.push(new Tail(descr));
},

generateGhost : function(descr) {
    this._ghosts.push(new Ghost(descr));
},

resurrectGhost : function(ghost) {
    this._ghosts.push(ghost);
},

generatePowerUp : function(descr) {
    this._powerup.push(new PowerUp(descr));
    for (var i = 0; i < this._ghosts.length; i++) {
        this._ghosts[i].hasRespawned = false;
    }
},

getSnakePos : function() {
    var pos = {
        cx : this._snake[0].cx,
        cy : this._snake[0].cy
    };
    return pos;
},

getSnakeIsBlue : function() {
    if(this._snake[0]){
        return this._snake[0].isBlue;
    }
    return false;
},

getSnakeHasLittleTime : function() {
    return this._snake[0].hasLittleTime;
},

generateFood : function(food){
    this._food.push(food);
},


update: function(du) {
    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;


        while (i < aCategory.length) {

            if (aCategory === this._tail){
                if ((Math.floor((game_score.get_score()+80)/10))>this._snake[0].length) {
                    this._snake[0].length += 1;
                    var len = this._tail.length;
                    this.generateTail(aCategory[len-1]);
                }

            }

            var status = aCategory[i].update(du);

            if (status === this.KILL_ME_NOW) {
                if(aCategory === this._ghosts){
                    var deadGhost = aCategory[i];
                    setTimeout(deadGhost.respawn.bind(deadGhost), 3000);
                    aCategory.splice(i,1);
                } else {
                    aCategory.splice(i,1);
                }

                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array
            }
            else {
                ++i;
            }
        }
    }



},

render: function(ctx) {

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        // Ef tail byrja aftast að rendera looks better
        if (aCategory === this._tail){
            for (var i = aCategory.length-1; i >=0 ; --i) {
                aCategory[i].render(ctx);
            }
        } else{
            for (var i = 0; i < aCategory.length; ++i) {
                aCategory[i].render(ctx);
            }
        }
    }

    game_score.show_score(ctx);

    if(g_isUpdatePaused){
        util.noPause(ctx);
    }
}

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();

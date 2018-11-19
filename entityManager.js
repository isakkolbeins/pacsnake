/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

// "PRIVATE" DATA

_ghosts  : [],
_bullets : [],
// _ships   : [],
_tail    : [],
_snake   : [],
_powerup : [],
_bShowRocks : true,

// "PRIVATE" METHODS

_generateGhosts : function() {
    var i,
        ghostCount = 4;

    for (i = 0; i < ghostCount; ++i) {
        this.generateGhost({color:i});
        
    }
},

/*
_findNearestShip : function(posX, posY) {
    var closestShip = null,
        closestIndex = -1,
        closestSq = 1000 * 1000;

    for (var i = 0; i < this._ships.length; ++i) {

        var thisShip = this._ships[i];
        var shipPos = thisShip.getPos();
        var distSq = util.wrappedDistSq(
            shipPos.posX, shipPos.posY, 
            posX, posY,
            g_canvas.width, g_canvas.height);

        if (distSq < closestSq) {
            closestShip = thisShip;
            closestIndex = i;
            closestSq = distSq;
        }
    }
    return {
        theShip : closestShip,
        theIndex: closestIndex
    };
},*/

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
    this._categories = [this._bullets, this._tail, this._snake, this._ghosts, this._powerup];
},

init: function() {
    this._generateGhosts();
    //this._generateShip();
    this.generatePowerUp();
},

generateSnake : function(descr) {
    this._snake.push(new Snake(descr));
    this.generateTail(this._snake[0]);
    for (let i = 0; i < descr.length; i++) {
        this.generateTail(this._tail[i]);
    }
},

generateTail : function(follow) {
    var delay = 0;// this._tail.length;
    var delayMax = this._tail.length;

    var descr = {   follow : follow,
        cx : follow.cx,
        cy : follow.cy,
        direction : follow.direction,
        delay : delay,
        delayMax : delayMax};

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
},

getSnakePos : function() {
    var pos = {
        cx : this._snake[0].cx,
        cy : this._snake[0].cy
    };
    return pos;
},

getSnakeIsBlue : function() {
    return this._snake[0].isBlue;
},





/*
fireBullet: function(cx, cy, velX, velY, rotation) {
    this._bullets.push(new Bullet({
        cx   : cx,
        cy   : cy,
        velX : velX,
        velY : velY,

        rotation : rotation
    }));
},

generateRock : function(descr) {
    this._rocks.push(new Rock(descr));
},

generateShip : function(descr) {
    this._ships.push(new Ship(descr));
},

killNearestShip : function(xPos, yPos) {
    var theShip = this._findNearestShip(xPos, yPos).theShip;
    if (theShip) {
        theShip.kill();
    }
},

yoinkNearestShip : function(xPos, yPos) {
    var theShip = this._findNearestShip(xPos, yPos).theShip;
    if (theShip) {
        theShip.setPos(xPos, yPos);
    }
},

resetShips: function() {
    this._forEachOf(this._ships, Ship.prototype.reset);
},

haltShips: function() {
    this._forEachOf(this._ships, Ship.prototype.halt);
},	

toggleRocks: function() {
    this._bShowRocks = !this._bShowRocks;
},*/

update: function(du) {
    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        while (i < aCategory.length) {

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

    var debugX = 10, debugY = 100;
    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        
        // Ef tail byrja aftast að rendera looks better
        if (aCategory === this._tail){
            for (var i = aCategory.length-1; i >=0 ; --i) {

                aCategory[i].render(ctx);
                // debug.text(".", debugX + i * 10, debugY);
    
            }
        }else{
        for (var i = 0; i < aCategory.length; ++i) {

            aCategory[i].render(ctx);

        }
    }
        debugY += 10;
    }
}

}



setInterval(function(){
        entityManager.generatePowerUp();
    },3000);

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();


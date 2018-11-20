// =========
// PACKSNAKE
// =========
/*

-- game info --
-- rules --
-- group info --
----- færa í readmefile --



*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// ====================
// CREATE BEGINNING SNAKE
// ====================

function createBeginningSnake() {

    entityManager.generateSnake({
        cx : 100,
        cy : 100,
        length : 2,
        direction : 'R',
    });

}

//========================
// CREATE FOOD
//=========================

function createFood(){
    entityManager.generateFood(new Food({cx:60,cy:60}));
    entityManager.generateFood(new Food({cx:740,cy:60}));
    entityManager.generateFood(new Food({cx:60,cy:740}));
    entityManager.generateFood(new Food({cx:740,cy:740}));
}


//=========================
// SHOW SCORE
//=========================

var game_score = {
    score : 0,

add_score : function(num){
    this.score = this.score + num;
},

show_score : function(ctx){
    ctx.save();
    ctx.fillStyle="white";
    ctx.font="bold 20px Arial";
    var text = "Score: " + this.score;
    ctx.fillText(text,350, 20);
    ctx.restore();

}
}


 


// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {

    processDiagnostics();

    entityManager.update(du);

}

// GAME-SPECIFIC DIAGNOSTICS

var g_renderSpatialDebug = false;
var KEY_SPATIAL = keyCode('X');
var g_isPaused = false;
var KEY_PAUSE   = keyCode('P');;

/*
var g_useGravity = false;
var g_useAveVel = true;

var KEY_GRAVITY = keyCode('G');
var KEY_AVE_VEL = keyCode('V');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');
var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');

var KEY_K = keyCode('K'); */

function processDiagnostics() {

    if (eatKey(KEY_PAUSE)) g_isPaused = !g_isPaused;
    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;
/*
    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;
    if (eatKey(KEY_HALT)) entityManager.haltShips();
    if (eatKey(KEY_RESET)) entityManager.resetShips();
    if (eatKey(KEY_0)) entityManager.toggleRocks();
    if (eatKey(KEY_1)) entityManager.generateShip({
        cx : g_mouseX,
        cy : g_mouseY,
        sprite : g_sprites.ship});
    if (eatKey(KEY_2)) entityManager.generateShip({
        cx : g_mouseX,
        cy : g_mouseY,
        sprite : g_sprites.ship2
        });
    if (eatKey(KEY_K)) entityManager.killNearestShip(
        g_mouseX, g_mouseY); */
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    entityManager.render(ctx);

    if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        levelBackground : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/background.png",

        ghostBlue       : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_ghostBlue.png",
        ghostRed        : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_ghostRead.png",
        ghostPink       : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_ghostPink.png",
        ghostOrange     : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_ghostOrange.png",
        ghostEdible     : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_ghostEdible.png",

        snakeBoddy      : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeBoddy.png",
        snakeBoddyBlue  : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeBoddyBlue.png",

        snakeHead0L     : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeHead0.png",
        snakeHead1L     : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeHead1.png",
        snakeHead2L     : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeHead2.png",
        snakeHead3L     : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeHead3.png",

        snakeHead0R     : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_SnakeHeadR0.png",
        snakeHead1R     : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_SnakeHeadR1.png",
        snakeHead2R     : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_SnakeHeadR2.png",
        snakeHead3R     : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_SnakeHeadR3.png",

        snakeHeadBlue0L : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeHeadBlue0.png",
        snakeHeadBlue1L : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeHeadBlue1.png",
        snakeHeadBlue2L : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeHeadBlue2.png",
        snakeHeadBlue3L : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeHeadBlue3.png",

        snakeHeadBlue0R : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_SnakeHeadBlueR0.png",
        snakeHeadBlue1R : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_SnakeHeadBlueR1.png",
        snakeHeadBlue2R : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_SnakeHeadBlueR2.png",
        snakeHeadBlue3R : "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_SnakeHeadBlueR3.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    g_sprites.ghostBlue     = new Sprite([g_images.ghostBlue]);
    g_sprites.ghostRed      = new Sprite([g_images.ghostRed]);
    g_sprites.ghostOrange   = new Sprite([g_images.ghostOrange]);
    g_sprites.ghostPink     = new Sprite([g_images.ghostPink]);
    g_sprites.ghostEdible   = new Sprite([g_images.ghostEdible]);

    g_sprites.snakeBoddy    = new Sprite([g_images.snakeBoddy]);
    g_sprites.snakeBoddyBlue= new Sprite([g_images.snakeBoddyBlue]);

    g_sprites.snakeHeadL     = new Sprite([ g_images.snakeHead0L,
                                            g_images.snakeHead1L,
                                            g_images.snakeHead2L,
                                            g_images.snakeHead3L]);

    g_sprites.snakeHeadR     = new Sprite([ g_images.snakeHead0R,
                                            g_images.snakeHead1R,
                                            g_images.snakeHead2R,
                                            g_images.snakeHead3R]);

    g_sprites.snakeHeadBlueL = new Sprite([ g_images.snakeHeadBlue0L,
                                            g_images.snakeHeadBlue1L,
                                            g_images.snakeHeadBlue2L,
                                            g_images.snakeHeadBlue3L]);

    g_sprites.snakeHeadBlueR = new Sprite([  g_images.snakeHeadBlue0R,
                                            g_images.snakeHeadBlue1R,
                                            g_images.snakeHeadBlue2R,
                                            g_images.snakeHeadBlue3R]);

    entityManager.init();
    createBeginningSnake();
    createFood();

    main.init();
}

// Kick it off
requestPreloads();


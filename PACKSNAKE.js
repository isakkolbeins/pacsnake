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

// var g_canvas = document.getElementById("myCanvas");
// var g_ctx = g_canvas.getContext("2d");
// var g_backgound;

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// ====================
// CREATE BEGINNING SNAKE
// ====================

function createBeginningSnake() {

    entityManager.generateSnake({
        cx: 100,
        cy: 100,
        length: 2,
        direction: 'R',
    });

}

//========================
// CREATE FOOD
//=========================

function createFood() {

    var x = 60;
    var y = 60;

    for (var i = 0; i < 18; i++) {
        for (var j = 0; j < 18; j++) {

            if ((i < 2) || (i > 15)) {
                entityManager.generateFood(new Food({ cx: x, cy: y }));
            }
            else if ((j < 2) || (j > 15)) {
                entityManager.generateFood(new Food({ cx: x, cy: y }));
            }
            else if (((i === 5) || (i === 6)) && ((j > 3) && (j < 14))) {
                entityManager.generateFood(new Food({ cx: x, cy: y }));
            }
            else if (((i === 11) || (i === 12)) && ((j > 3) && (j < 14))) {
                entityManager.generateFood(new Food({ cx: x, cy: y }));
            }
            else if (((j === 4) || (j === 5)) && ((i >= 5) && (i <= 12))) {
                entityManager.generateFood(new Food({ cx: x, cy: y }));
            }
            else if (((j === 12) || (j === 13)) && ((i >= 5) && (i <= 12))) {
                entityManager.generateFood(new Food({ cx: x, cy: y }));
            }


            x += 40;
        }
        x = 60;
        y += 40;
    }


}


//=========================
// SHOW SCORE
//=========================

var game_score = {
    score: 0,

    add_score: function (num) {
        if(!g_gameOver){        // To prevent js hackers
            this.score = this.score + num;
        }
    },


    get_score: function () {
        return this.score;
    },

    show_score: function (ctx) {
        ctx.save();
        ctx.fillStyle = "white";
        ctx.textAlign="center";
        ctx.font = "bold 20px Arial";
        var text = "Score: " + this.score;
        ctx.fillText(text, 400, 20);
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
    // If the game is over, stop the updates
    if (!g_gameOver) {
        entityManager.update(du);
        audioManager.update(du);
    } else gameOver.update(du); // If over, start countdown to animation


}

// GAME-SPECIFIC DIAGNOSTICS

var g_renderSpatialDebug = false;
var KEY_SPATIAL = keyCode('X');
var g_isPaused = false;
var KEY_PAUSE = keyCode('P');;

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
/*var animationFinished = false;
var startAnimation = false;
function triggerGameOver() {
    startAnimation = true;
}*/

function renderSimulation(ctx) {
    // Render all the entities in enitiyManager
    entityManager.render(ctx);
    // If the game is over, draw an overlay and start the gameover animation
    if(g_gameOver) gameOver.render(ctx);

    if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        levelBackground: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/backgroundvol2.png",

        ghostBlue: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_ghostBlue.png",
        ghostRed: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_ghostRead.png",
        ghostPink: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_ghostPink.png",
        ghostOrange: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_ghostOrange.png",
        ghostEdible: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_ghostEdible.png",
        ghostWhite: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_ghostWhite.png",
        ghostEyes: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_ghostEyes.png",

        snakeBoddy: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeBoddy.png",
        snakeBoddyBlue: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeBoddyBlue.png",

        snakeHead0L: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeHead0.png",
        snakeHead1L: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeHead1.png",
        snakeHead2L: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeHead2.png",
        snakeHead3L: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeHead3.png",

        snakeHead0R: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_SnakeHeadR0.png",
        snakeHead1R: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_SnakeHeadR1.png",
        snakeHead2R: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_SnakeHeadR2.png",
        snakeHead3R: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_SnakeHeadR3.png",

        snakeHeadBlue0L: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeHeadBlue0.png",
        snakeHeadBlue1L: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeHeadBlue1.png",
        snakeHeadBlue2L: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeHeadBlue2.png",
        snakeHeadBlue3L: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeHeadBlue3.png",

        snakeHeadBlue0R: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_SnakeHeadBlueR0.png",
        snakeHeadBlue1R: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_SnakeHeadBlueR1.png",
        snakeHeadBlue2R: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_SnakeHeadBlueR2.png",
        snakeHeadBlue3R: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_SnakeHeadBlueR3.png",

        snakeHeadDeadL: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeHeadDeadL.png",
        snakeHeadDeadR: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeHeadDeadR.png",
        snakeHeadDeadBlueL: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeHeadDeadBlueL.png",
        snakeHeadDeadBlueR: "https://notendur.hi.is/~iak5/tolvuleikjaforritun/PackSnake/img/sprite_snakeHeadDeadBlueR.png",


        gameFinished: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver80.png"
    };

    getGameOver(requiredImages);


    imagesPreload(requiredImages, g_images, preloadDone);
}

function getGameOver(json) {
    for(var i = 0; i < 80; i++){
        var num = i;
        if (i<10) num = "0"+i;
        // console.log("gameOver"+num + " = https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver"+ num +".png")
        json["gameOver"+num] = "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver"+ num +".png" ;
    }
}

function getGameOverImgs(){
    var gameOverImgs = [];
    Object.keys(g_images).forEach(key => {
        if(key.includes("gameOver")){
            gameOverImgs.push(g_images[key]);
        }
    });
    return gameOverImgs;
}

var g_sprites = {};

function preloadDone() {

    g_sprites.ghostBlue = new Sprite(1, [g_images.ghostBlue]);
    g_sprites.ghostRed = new Sprite(1, [g_images.ghostRed]);
    g_sprites.ghostOrange = new Sprite(1, [g_images.ghostOrange]);
    g_sprites.ghostPink = new Sprite(1, [g_images.ghostPink]);
    g_sprites.ghostEdible = new Sprite(1, [g_images.ghostEdible]);

    g_sprites.snakeBoddy = new Sprite(1, [g_images.snakeBoddy]);
    g_sprites.snakeBoddyBlue = new Sprite(1, [g_images.snakeBoddyBlue]);

    g_sprites.snakeHeadDeadL = new Sprite(1, [g_images.snakeHeadDeadL]);
    g_sprites.snakeHeadDeadR = new Sprite(1, [g_images.snakeHeadDeadR]);
    g_sprites.snakeHeadDeadBlueL = new Sprite(1, [g_images.snakeHeadDeadBlueL]);
    g_sprites.snakeHeadDeadBlueR = new Sprite(1, [g_images.snakeHeadDeadBlueR]);

    var snakeUpdateSpeed = 0.03;

    g_sprites.snakeHeadL = new Sprite(snakeUpdateSpeed,
    [g_images.snakeHead0L,
    g_images.snakeHead1L,
    g_images.snakeHead2L,
    g_images.snakeHead3L]);

    g_sprites.snakeHeadR = new Sprite(snakeUpdateSpeed,
    [g_images.snakeHead0R,
    g_images.snakeHead1R,
    g_images.snakeHead2R,
    g_images.snakeHead3R]);

    g_sprites.snakeHeadBlueL = new Sprite(snakeUpdateSpeed,
    [g_images.snakeHeadBlue0L,
    g_images.snakeHeadBlue1L,
    g_images.snakeHeadBlue2L,
    g_images.snakeHeadBlue3L]);

    g_sprites.snakeHeadBlueR = new Sprite(snakeUpdateSpeed,
    [g_images.snakeHeadBlue0R,
    g_images.snakeHeadBlue1R,
    g_images.snakeHeadBlue2R,
    g_images.snakeHeadBlue3R]);

    g_sprites.ghostBlinking = new Sprite(0.005,
    [g_images.ghostEdible,
    g_images.ghostWhite]);

    g_sprites.gameFinished = new Sprite(1, [g_images.gameFinished]);



    //g_sprites.gameOver = new Sprite(0.005, g_images.gameOver);
    var gameOverImgs = getGameOverImgs();


    g_sprites.gameOver = new Sprite(0.04, gameOverImgs);
/*
    gameOverImgs.forEach(img => {
        console.log(img.name);
    });*/

    entityManager.init();
    audioManager.init();
    createBeginningSnake();
    createFood();

    main.init();
}

// Kick it off
requestPreloads();



var g_canDie = false;

function canDie() {
    g_canDie = true;
}

setTimeout(canDie, 3000);

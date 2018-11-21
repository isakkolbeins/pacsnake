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
var g_gameOver = false;
var g_backgound;

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
        this.score = this.score + num;
    },

    get_score: function () {
        return this.score;
    },

    show_score: function (ctx) {
        ctx.save();
        ctx.fillStyle = "white";
        ctx.font = "bold 20px Arial";
        var text = "Score: " + this.score;
        ctx.fillText(text, 350, 20);
        ctx.restore();
    }
}

var pause = {

    paused: function (ctx) {
        ctx.font = "bold 24px Arial";
        var msg = "There is NO";
        var msg1 = "pausing in";
        var msg2 = "REAL LIFE!!";
        ctx.fillText(msg, 332, 380);
        ctx.fillText(msg1, 340, 405);
        ctx.fillText(msg2, 332, 435);
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
        gameFinished: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver80.png"
/*
        gameOver00: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver00.png",
        gameOver01: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver01.png",
        gameOver02: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver02.png",
        gameOver03: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver03.png",
        gameOver04: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver04.png",
        gameOver05: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver05.png",
        gameOver06: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver06.png",
        gameOver07: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver07.png",
        gameOver08: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver08.png",
        gameOver09: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver09.png",
        gameOver10: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver10.png",
        gameOver11: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver11.png",
        gameOver12: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver12.png",
        gameOver13: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver13.png",
        gameOver14: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver14.png",
        gameOver15: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver15.png",
        gameOver16: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver16.png",
        gameOver17: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver17.png",
        gameOver18: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver18.png",
        gameOver19: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver19.png",
        gameOver20: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver20.png",
        gameOver21: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver21.png",
        gameOver22: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver22.png",
        gameOver23: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver23.png",
        gameOver24: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver24.png",
        gameOver25: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver25.png",
        gameOver26: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver26.png",
        gameOver27: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver27.png",
        gameOver28: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver28.png",
        gameOver29: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver29.png",
        gameOver30: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver30.png",
        gameOver31: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver31.png",
        gameOver32: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver32.png",
        gameOver33: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver33.png",
        gameOver34: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver34.png",
        gameOver35: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver35.png",
        gameOver36: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver36.png",
        gameOver37: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver37.png",
        gameOver38: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver38.png",
        gameOver39: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver39.png",
        gameOver40: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver40.png",
        gameOver41: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver41.png",
        gameOver42: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver42.png",
        gameOver43: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver43.png",
        gameOver44: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver44.png",
        gameOver45: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver45.png",
        gameOver46: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver46.png",
        gameOver47: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver47.png",
        gameOver48: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver48.png",
        gameOver49: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver49.png",
        gameOver50: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver50.png",
        gameOver51: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver51.png",
        gameOver52: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver52.png",
        gameOver53: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver53.png",
        gameOver54: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver54.png",
        gameOver55: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver55.png",
        gameOver56: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver56.png",
        gameOver57: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver57.png",
        gameOver58: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver58.png",
        gameOver59: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver59.png",
        gameOver60: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver60.png",
        gameOver61: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver61.png",
        gameOver62: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver62.png",
        gameOver63: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver63.png",
        gameOver64: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver64.png",
        gameOver65: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver65.png",
        gameOver66: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver66.png",
        gameOver67: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver67.png",
        gameOver68: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver68.png",
        gameOver69: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver69.png",
        gameOver70: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver70.png",
        gameOver71: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver71.png",
        gameOver72: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver72.png",
        gameOver73: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver73.png",
        gameOver74: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver74.png",
        gameOver75: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver75.png",
        gameOver76: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver76.png",
        gameOver77: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver77.png",
        gameOver78: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver78.png",
        gameOver79: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver79.png",
        gameOver80: "https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver80.png"
*/
        //gameOver: getGameOver(),
    };

    getGameOver(requiredImages);
    

    imagesPreload(requiredImages, g_images, preloadDone);
}

function getGameOver(json) {
    for(var i = 0; i < 80; i++){
        var num = i;
        if (i<10) num = "0"+i;
        console.log("gameOver"+num + " = https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/GameOver/sprite_gameOver"+ num +".png")
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
    console.log(gameOverImgs[81]);
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
        /*[g_images.gameOver00, 
        g_images.gameOver00,
        g_images.gameOver01,
        g_images.gameOver02,
        g_images.gameOver03,
        g_images.gameOver04,
        g_images.gameOver05,
        g_images.gameOver06,
        g_images.gameOver07,
        g_images.gameOver08,
        g_images.gameOver09,
        g_images.gameOver10,
        g_images.gameOver11,
        g_images.gameOver12,
        g_images.gameOver13,
        g_images.gameOver14,
        g_images.gameOver15,
        g_images.gameOver16,
        g_images.gameOver17,
        g_images.gameOver18,
        g_images.gameOver19,
        g_images.gameOver20,
        g_images.gameOver21,
        g_images.gameOver22,
        g_images.gameOver23,
        g_images.gameOver24,
        g_images.gameOver25,
        g_images.gameOver26,
        g_images.gameOver27,
        g_images.gameOver28,
        g_images.gameOver29,
        g_images.gameOver30,
        g_images.gameOver31,
        g_images.gameOver32,
        g_images.gameOver33,
        g_images.gameOver34,
        g_images.gameOver35,
        g_images.gameOver36,
        g_images.gameOver37,
        g_images.gameOver38,
        g_images.gameOver39,
        g_images.gameOver40,
        g_images.gameOver41,
        g_images.gameOver42,
        g_images.gameOver43,
        g_images.gameOver44,
        g_images.gameOver45,
        g_images.gameOver46,
        g_images.gameOver47,
        g_images.gameOver48,
        g_images.gameOver49,
        g_images.gameOver50,
        g_images.gameOver51,
        g_images.gameOver52,
        g_images.gameOver53,
        g_images.gameOver54,
        g_images.gameOver55,
        g_images.gameOver56,
        g_images.gameOver57,
        g_images.gameOver58,
        g_images.gameOver59,
        g_images.gameOver60,
        g_images.gameOver61,
        g_images.gameOver62,
        g_images.gameOver63,
        g_images.gameOver64,
        g_images.gameOver65,
        g_images.gameOver66,
        g_images.gameOver67,
        g_images.gameOver68,
        g_images.gameOver69,
        g_images.gameOver70,
        g_images.gameOver71,
        g_images.gameOver72,
        g_images.gameOver73,
        g_images.gameOver74,
        g_images.gameOver75,
        g_images.gameOver76,
        g_images.gameOver77,
        g_images.gameOver78,
        g_images.gameOver79,
        g_images.gameOver80,
    ]*/
    g_backgound = g_images.levelBackground;

    entityManager.init();
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
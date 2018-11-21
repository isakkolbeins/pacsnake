// =========
// GameOver
// =========


"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var gameOver = {
    animationFinished : false,
    startAnimation : false,
    buttonHover : false,


    update : function(du) {
        /*if(!this.startAnimation){
            g_sprites.gameOver.setToFirstFrame();
        }*/
         setTimeout(() => {
                this.startAnimation = true;        
         }, 1000);
        

    },

    render : function(ctx) {
        util.drawOverlay(ctx);
        if(this.startAnimation){ 
            if(!this.animationFinished){
                g_sprites.gameOver.drawWrappedCentredAt(ctx, 400, 400, 0);
            } else{
                g_sprites.gameFinished.drawWrappedCentredAt(ctx, 400, 400, 0);
                util.drawReplay(ctx);
            }
            if(g_sprites.gameOver.isLastFrame()) this.animationFinished = true;
        } 
    
    }




}







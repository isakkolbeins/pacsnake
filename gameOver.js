// =========
// GameOver
// =========


"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var gameOver = {
    animationFinished : false,
    startAnimation : false,


    update : function(du) {
        setTimeout(() => {
            this.startAnimation = true;        
        }, 700);
    },

    render : function(ctx) {
        util.drawOverlay(ctx);
        if(this.startAnimation){        
    
            if(!this.animationFinished){
                g_sprites.gameOver.drawWrappedCentredAt(ctx, 400, 400, 0);
            } else{
                g_sprites.gameFinished.drawWrappedCentredAt(ctx, 400, 400, 0);
                
            }
            if(g_sprites.gameOver.isLastFrame()) this.animationFinished = true;
        } 
    
    }




}







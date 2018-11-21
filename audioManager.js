"use strict";

var audioManager = {

    // Audio management
    audioMain       : new Audio(),
    audioBlue       : new Audio(),
    initialAudio    : true,
    loopSource      : 'https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/Music/loopGB',
    fadeOutInterval : 0,
    fadeInInterval  : 0,
    KEY_MUTE        : 'M'.charCodeAt(0),
    musicMuted      : false,

    // Initialiser
    init : function() {
        // Audio file urls
        this.audioMain.src = 'https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/Music/GB';
        this.audioBlue.src = 'https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/Music/Blue';

        // Event listeners to detect when the music finishes
        this.audioBlue.addEventListener("ended", this.playMainMusic.bind(this));
        this.audioMain.addEventListener("ended", this.switchToLoopAudio.bind(this));

        this.playMainMusic();
    },

    // Update function, mainly for the mute option
    update : function(du) {
        if (this.muteKeyPressed()) {
            this.muteMusic();
        }
    },

    // Plays main music
    playMainMusic : function() {
        this.audioBlue.pause();
        this.audioBlue.currentTime = 0;
        this.audioMain.play();
    },

    // Stops main music and plays blue music
    playBlueMusic : function() {
        this.audioBlue.play();

        // Pauses main music after 0.5 seconds for fade out purposes
        setTimeout(this.audioMain.pause(), 500);
        setTimeout(this.switchToLoopAudio.bind(this), 500);
    },

    // Stops all music
    stopMusic : function() {
        this.audioMain.pause();
        this.audioBlue.pause();
    },

    // Mutes all music
    muteMusic : function() {
        this.audioMain.volume = 0;
        this.audioBlue.volume = 0;
    },

    // Switches main audio to looped version
    switchToLoopAudio : function() {
        if (this.initialAudio) {
            this.initialAudio = false;
            this.audioMain.src = this.loopSource;
            this.audioMain.currentTime = 0;
            this.audioMain.loop = true;
            this.playMainMusic();
        }
    },

    // Fades out audio A and fades in audio B
    fade : function(audioFadeOut, audioFadeIn) {
        this.audioFadeIn.volume = 0;
        this.fadeInInterval = setInterval(this.fadeIn(this.audioFadeIn), 50);
        this.fadeOutInterval = setInterval(this.fadeOut(this.audioFadeOut), 50);
    },

    // Fades in audio
    fadeIn : function(audio) {
        if(audio.volume < 1){
            audio.volume += 0.1;
        }
        if (audio.volume === 1.0) {
            clearInterval(this.fadeInInterval);
        }
    },

    // Fades out audio
    fadeOut : function(audio) {
        if(audio.volume > 0){
            audio.volume -= 0.1;
        }
        if (audio.volume === 0.0) {
            clearInterval(this.fadeOutInterval);
        }
    },

    muteKeyPressed : function() {
        if (eatKey(this.KEY_MUTE)) {
            this.musicMuted = !this.musicMuted;
        }
        return this.musicMuted;
    }

}

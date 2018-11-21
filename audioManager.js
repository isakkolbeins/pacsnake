var audioManager = {

    // Audio management
    audioMain : new Audio(),
    audioBlue : new Audio(),
    initialAudio : true,
    fadeOutInterval : 0,
    fadeInInterval : 0,

    // Initialiser
    init : function() {
        // Audio file urls
        this.audioMain.src = 'https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/Music/GB';
        this.audioBlue.src = 'https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/Music/Blue';

        // Event listeners to detect when the music finishes
        this.audioBlue.addEventListener("ended", function(){
            this.audioBlue.pause();
            this.audioBlue.currentTime = 0;
            this.playMainMusic();
        });

        this.audioMain.addEventListener("ended", switchToLoopAudio(););
    },



    // Plays main music
    playMainMusic : function() {
        this.audioMain.play();
    },

    // Stops main music and plays blue music
    playBlueMusic : function() {
        this.audioBlue.play();

        // Pauses main music after 0.5 seconds for fade out purposes
        setTimeout(function() {
            this.audioMain.pause();
            this.switchToLoopAudio();
        }, 500)
    },

    // Switches main audio to looped version
    switchToLoopAudio : function() {
        if (this.initialAudio) {
            this.initialAudio = false;
            this.audioMain.src = 'https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/Music/loopGB';
            this.audioMain.currentTime = 0;
            this.audioMain.loop = true;
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
    }

}

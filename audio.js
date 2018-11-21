// Audio management
var audioPlaying = false;
var audioMain = new Audio();
var audioBlue = new Audio();
var initialAudio = true;
var fadeOutInterval, fadeInInterval;

// Audio file urls
audioMain.src = 'https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/Music/GB';
audioBlue.src = 'https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/Music/Blue';

// Event listeners to detect when the music finishes
audioBlue.addEventListener("ended", function(){
    audioBlue.pause();
    audioBlue.currentTime = 0;
    playMainMusic();
});

audioMain.addEventListener("ended", switchToLoopAudio(););

// Plays main music
function playMainMusic() {
    audioMain.play();
}

// Stops main music and plays blue music
function playBlueMusic() {
    audioBlue.play();

    // Pauses main music after 0.5 seconds for fade out purposes
    setTimeout(function() {
        audioMain.pause();
        switchToLoopAudio();
    }, 500)
}

// Switches main audio to looped version
function switchToLoopAudio() {
    if (initialAudio) {
        initialAudio = false;
        audioMain.src = 'https://notendur.hi.is/boo11/Tolvuleikjaforritun/pac-snake/Music/loopGB';
        audioMain.currentTime = 0;
        audioMain.loop = true;
    }
}

// Fades out audio A and fades in audio B
function fade(audioFadeOut, audioFadeIn) {
    audioFadeIn.volume = 0;
    fadeInInterval = setInterval(fadeIn(audioFadeIn), 50);
    fadeOutInterval = setInterval(fadeOut(audioFadeOut), 50);
}

// Fades in audio
function fadeIn(audio) {
    if(audio.volume < 1){
        audio.volume += 0.1;
    }
    if (audio.volume === 1.0) {
        clearInterval(fadeInInterval);
    }
}

// Fades out audio
function fadeOut(audio) {
    if(audio.volume > 0){
        audio.volume -= 0.1;
    }
    if (audio.volume === 0.0) {
        clearInterval(fadeOutInterval);
    }
}

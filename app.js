const app = () => { 
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const replay = document.querySelector(".replay");
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');


    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //Time Display
    const timeDisplay = document.querySelector('.time-display');
    const outlineLength = outline.getTotalLength();
    //Duration
    const timeSelect = document.querySelectorAll('.time-select button')
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;

    //Pick different sounds
    sounds.forEach(sound =>{
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });


    //Play sound
    play.addEventListener('click', () =>{
         checkPlaying(song);
    });

   
    //Select sound
    timeSelect.forEach(option =>{
        option.addEventListener('click', function(){
            fakeDuration = this.getAttribute('data-time');
            //timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });

    //Create a function specific to stop and play the Sounds
    const checkPlaying = song =>{
        if(song.paused){
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        }else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    //We can animated the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let secunds = Math.floor(elapsed % 60); // text in portuguese
        let minutes = Math.floor(elapsed / 60);  // text in portugueses

        //Animated the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        //Animated the text
        timeDisplay.textContent = `${minutes}:${secunds}`;// text in portugueses


        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg'
            video.pause();
        }

    };
};

app();
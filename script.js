const candyAudio = new Audio('./audios/Candy.mp3');
const darkAudio=  new Audio('./audios/Darkstar Somebody to heal.mp3');
const abhiAudio = new Audio('./audios/Abhi Na jaao Chhod Kar.mp3');
const brunoAudio = new Audio('./audios/Bruno Major - The Most Beautiful Thing.mp3');
const pantherAudio = new Audio('./audios/Panther - Parinda ft. Priyanka Meher.mp3');
const huronAudio = new Audio('./audios/the night we met.mp3');
const sawyerAudio=new Audio('./audios/Sawyer Hill  Look At The Time.mp3')
const pillsAudio= new Audio('./audios/pills On My Mind.mp3')
const gonnaAudio= new Audio('./audios/Brent Morgan  Gonna Be Okay.mp3')

const prevBtn = document.getElementById('backwarded'); 
const playBtn = document.getElementById('paused'); 
const nextBtn = document.getElementById('forwarded'); 
const songName = document.querySelector('.song-name');
const songImage = document.querySelector('.banner img');
const lines = document.querySelector('.lineChild');
const linemove = document.querySelector('.line');
const strt = document.querySelector('#startt');
const end = document.querySelector('#endd');

const songs = [
    { ele: candyAudio, audioName: 'Candy - Paolo Nutini', imgUrl: './pictures/OIP.jpeg'},
    { ele: abhiAudio, audioName: 'Abhi Na jaao Chhod Kar - Asha Bhosle, M. Rafi', imgUrl: './pictures/dev-anand.jpg' },
    { ele: darkAudio, audioName:'Somebody to heal - Darkstar', imgUrl:'./pictures/SOMEBODY TO HEAL.jpg'},
    { ele: brunoAudio, audioName: 'The most beautiful thing - Bruno Mars', imgUrl: './pictures/Bruno-Major-The-Most-Beautiful-Thing.jpeg' },
    { ele: pantherAudio, audioName: 'Parinda - Panther ft. Priyanka', imgUrl: './pictures/Screenshot 2024-03-12 225111.png' },
    { ele: huronAudio, audioName: 'The night we met - Lord Huron', imgUrl: './pictures/the night we met.jpeg' },
    { ele: sawyerAudio, audioName: 'Look at the time - Sawyer Hill', imgUrl: './pictures/look at the time.jpg' },
    { ele: pillsAudio, audioName: 'Pills On My Mind - SarpDansh ft.Big Scratch', imgUrl: './pictures/Screenshot 2024-03-14 092525.png' },
    { ele: gonnaAudio, audioName: 'Gonna Be Okay - Brent Morgan', imgUrl:'./pictures/brenet gonna.jpeg'}
];

const updateProgressBar = () => {
    const currentTime = currentSong.currentTime;
    const duration = currentSong.duration;
    const progress = (currentTime / duration) * 100;
    lines.style.width = `${progress}%`;
    strt.textContent = formatTime(currentTime);
    end.textContent = formatTime(duration);
};

const onTimeUpdate = () => {
    updateProgressBar();
};

for (const song of songs) {
    song.ele.addEventListener('timeupdate', onTimeUpdate);
}

for (const song of songs) {
    song.ele.addEventListener('ended', () => {
        updateSong('next');
        playPauseSong();
        updateSongImage();
    });
}

let current = 0;
let currentSong = songs[current].ele;
songName.textContent = songs[current].audioName;

playBtn.addEventListener('click', () => {
    playPauseSong();
});

nextBtn.addEventListener('click', () => {
    updateSong('next');
    playPauseSong();
    updateSongImage();
    formatTime();
});
prevBtn.addEventListener('click', () => {
    updateSong('prev');
    playPauseSong();
    updateSongImage();
    formatTime();
});

const updateSong = (action) => {
    currentSong.pause();
    currentSong.currentTime = 0;
    if (action === 'next') {
        current++;
        if (current > songs.length - 1) current = 0;
    }
    if (action === 'prev') {
        current--;
        if (current < 0) current = songs.length - 1;
    }
    currentSong = songs[current].ele;
    songName.textContent = songs[current].audioName;
};

const playPauseSong = () => {
    if (currentSong.paused) {
        currentSong.play();
        playBtn.className = 'fa-solid fa-pause';
    } else {
        currentSong.pause();
        playBtn.className = 'fa-solid fa-play';
    }
};

const updateSongImage = () => {
    songImage.src = songs[current].imgUrl;
};

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

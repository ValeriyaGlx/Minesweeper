const playList = [
  {
    title: "ckick-left",
    src: "../src/sounds/click-left.mp3",
  },
  {
    title: "click-rigth",
    src: "../src/sounds/click-right.mp3",
  },
  {
    title: "mine",
    src: "../src/sounds/mine.mp3",
  },
  {
    title: "new-game",
    src: "../src/sounds/new-game.mp3",
  },
  {
    title: "win",
    src: "../src/sounds/win.mp3",
  },
];

const audio = new Audio();
audio.volume = 0;
audio.currentTime = 0;
audio.autoplay = "false";

export function playAudio(e) {
  if (e.target.classList.contains("opened-mine")) {
    audio.src = playList[2].src;
  } else {
    audio.src = playList[0].src;
  }

  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise.then((_) => {}).catch((error) => {});
  }
}

export function rightClickSound() {
  audio.src = playList[1].src;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then((_) => {}).catch((error) => {});
  }
}

export function winSound() {
  audio.src = playList[4].src;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then((_) => {}).catch((error) => {});
  }
}

export function newGameSound() {
  audio.autoplay = "false";
  audio.src = playList[3].src;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then((_) => {}).catch((error) => {});
  }
}

export function addSound(e) {
  const not = e.target.childNodes[1] || document.querySelector(".not-sound");
  if (not.classList.contains("not-sound")) {
    audio.volume = 0.75;
  } else {
    audio.volume = 0;
  }
  document.querySelector(".sound div").classList.toggle("not-sound");
}

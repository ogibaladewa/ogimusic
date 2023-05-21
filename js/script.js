const elAlbumList = document.querySelector(".album-list");
const elSongList = document.querySelector(".song-list");

//Fetch all song from songs.json
fetch("./json/songs.json")
  .then((response) => response.json())
  .then((json) => {
    getAlbumList(json);
    json.forEach((song) => {
      showSong(song);
    });
  });

//Function to get all album list from songs.json
function getAlbumList(json) {
  var lookup = {};
  var items = json;
  var albums = [];
  var coverAlbums = [];
  var bands = [];

  for (var item, i = 0; (item = items[i++]); ) {
    var album = item.album;
    var coverAlbum = item.coverAlbum;
    var band = item.band;

    if (!(album in lookup)) {
      lookup[album] = 1;
      albums.push(album);
      coverAlbums.push(coverAlbum);
      bands.push(band);
    }
  }
  showAlbum(albums, coverAlbums, bands);
}

//Function to display album in album list
function showAlbum(albums, coverAlbums, bands) {
  for (let i = 0; i < albums.length; i++) {
    let elAlbum = document.createElement("div");
    let elAlbumCover = document.createElement("div");
    let elAlbumCoverImg = document.createElement("img");
    let elAlbumText = document.createElement("div");
    let spanAlbumTitle = document.createElement("span");
    let textAlbumTitle = document.createTextNode(albums[i]);
    let spanAlbumBand = document.createElement("span");
    let textAlbumBand = document.createTextNode(bands[i]);

    elAlbum.classList.add("album");
    elAlbumCover.classList.add("album-cover");
    elAlbumText.classList.add("album-text");
    spanAlbumTitle.classList.add("album-title");
    spanAlbumBand.classList.add("album-band");
    elAlbumCoverImg.setAttribute("src", `assets/images/${coverAlbums[i]}`);

    elAlbumCover.appendChild(elAlbumCoverImg);
    spanAlbumTitle.appendChild(textAlbumTitle);
    spanAlbumBand.appendChild(textAlbumBand);
    elAlbumText.appendChild(spanAlbumTitle);
    elAlbumText.appendChild(spanAlbumBand);
    elAlbum.appendChild(elAlbumCover);
    elAlbum.appendChild(elAlbumText);

    elAlbumList.appendChild(elAlbum);
  }
}

//Function to display song in song list
function showSong(song) {
  let elSong = document.createElement("div");
  let elSongCover = document.createElement("div");
  let elSongCoverImg = document.createElement("img");
  let elSongText = document.createElement("div");
  let spanSongTitle = document.createElement("span");
  let textSongTitle = document.createTextNode(song.title);
  let spanSongBand = document.createElement("span");
  let textSongBand = document.createTextNode(song.band);

  elSong.classList.add("song");
  elSongCover.classList.add("song-cover");
  elSongText.classList.add("song-text");
  spanSongTitle.classList.add("song-title");
  spanSongBand.classList.add("song-band");
  elSongCoverImg.setAttribute("src", `assets/images/${song.coverAlbum}`);

  elSongCover.appendChild(elSongCoverImg);
  spanSongTitle.appendChild(textSongTitle);
  spanSongBand.appendChild(textSongBand);
  elSongText.appendChild(spanSongTitle);
  elSongText.appendChild(spanSongBand);
  elSong.appendChild(elSongCover);
  elSong.appendChild(elSongText);

  elSongList.appendChild(elSong);
}

let progressPlayer = document.querySelector(".progress-player");
let currentSong = document.querySelector(".current-song");
let playButtonIcon = document.querySelector(".play-button-icon");

console.log(progressPlayer);

currentSong.onloadedmetadata = function () {
  console.log(currentSong.duration);
  progressPlayer.max = currentSong.duration;
  progressPlayer.value = currentSong.currentTime;
};

function playPause() {
  if (playButtonIcon.classList.contains("fa-pause")) {
    currentSong.pause();
    playButtonIcon.classList.remove("fa-pause");
    playButtonIcon.classList.add("fa-play");
  } else {
    currentSong.play();
    playButtonIcon.classList.remove("fa-play");
    playButtonIcon.classList.add("fa-pause");
  }
}

if (currentSong.play()) {
  setInterval(() => {
    progressPlayer.value = currentSong.currentTime;
  }, 500);
}

progressPlayer.onchange = function () {
  currentSong.currentTime = progressPlayer.value;
};

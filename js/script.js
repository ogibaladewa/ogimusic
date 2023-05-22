const elAlbumList = document.querySelector(".album-list");
const elSongList = document.querySelector(".song-list");

//Function to fetch data from songs.json and do the callback
function fetchSongs(callback, filterAlbum, album, isClickedAllSongs) {
  fetch("./json/songs.json")
    .then((response) => response.json())
    .then((json) => {
      if (!filterAlbum) {
        if (!isClickedAllSongs) {
          getAlbumList(json);
        }
        json.forEach((song) => {
          callback(song);
        });
      } else {
        json.forEach((song) => {
          if (song.album === album) {
            callback(song);
          }
        });
      }
    });
}

//Run fetchSongs to show all songs
fetchSongs(showSong, false);

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
    elAlbum.setAttribute("album-title", albums[i]);
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

    elAlbum.addEventListener("click", loadSongByAlbum);
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
  elSong.setAttribute("song-title", song.title);
  elSong.setAttribute("song-band", song.band);
  elSong.setAttribute("song-cover-album", song.coverAlbum);
  elSong.setAttribute("song-file-name", song.fileName);
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

  elSong.addEventListener("click", openSongContainer);
}

function loadAllSongs() {
  let allSong = document.querySelector(".all-song");
  let allAlbum = document.querySelectorAll(".album");
  allAlbum.forEach((album) => {
    if (album.classList.contains("active")) {
      album.classList.remove("active");
    }
  });
  allSong.classList.add("active");

  elSongList.innerHTML = "";
  fetchSongs(showSong, false, "", true);
}

function loadSongByAlbum() {
  let allAlbum = document.querySelectorAll(".album");
  allAlbum.forEach((album) => {
    if (album.classList.contains("active")) {
      album.classList.remove("active");
    }
  });
  this.classList.add("active");

  elSongList.innerHTML = "";
  let albumTitle = this.getAttribute("album-title");
  fetchSongs(showSong, true, albumTitle);
  console.log("album-title: " + this.getAttribute("album-title"));
}

let progressPlayer = document.querySelector(".progress-player");
let currentSong = document.querySelector(".current-song");
let playButtonIcon = document.querySelector(".play-button-icon");

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

function openSongContainer() {
  const containerSong = document.querySelector(".container-song");
  const currentSong = document.querySelector(".current-song");
  const sourceSong = document.querySelector(".source-song");
  const songDetailsCoverImg = document.querySelector(".song-details-cover-img");
  const songDetailsTitle = document.querySelector(".song-details-title");
  const songDetailsBand = document.querySelector(".song-details-band");

  containerSong.style.display = "flex";
  sourceSong.setAttribute(
    "src",
    `assets/music/${this.getAttribute("song-file-name")}`
  );
  currentSong.load();
  songDetailsCoverImg.setAttribute(
    "src",
    `assets/images/${this.getAttribute("song-cover-album")}`
  );
  songDetailsTitle.innerHTML = this.getAttribute("song-title");
  songDetailsBand.innerHTML = this.getAttribute("song-band");

  setSongActive(this);
}

function setSongActive(songSelected) {
  let allSong = document.querySelectorAll(".song");
  allSong.forEach((song) => {
    if (song.classList.contains("active")) {
      song.classList.remove("active");
    }
  });
  songSelected.classList.add("active");
}

function closeSongContainer() {
  const containerSong = document.querySelector(".container-song");
  containerSong.style.display = "none";
}

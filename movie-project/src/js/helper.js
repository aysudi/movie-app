const cards = document.querySelector("#cards");
const searchInp = document.querySelector("#search");
const movieDetails = document.querySelector(".movie__details");

export function renderMoviesList(arr) {
  cards.innerHTML = "";
  arr.forEach((movie) => {
    cards.innerHTML += `
    <div class="movie__card">
            <div class="img-box">
              <img
                src="${movie.poster}"
              />
            </div>
            <div class="info-box">
                <h2>${movie.title}</h2>
            <p class="genre">${movie.genre}</p>
            <p class="rate">IMDB: <i class="fa-solid fa-star"></i> ${movie.imdbRate}</p>
            <div class="buttons">
              <button class="btn favorite-btn">
                <i class="fa-solid fa-heart"></i>
              </button>
              <button class="btn delete-btn">
                <i class="fa-solid fa-trash"></i>
              </button>
              <a href="./edit.html" class="btn edit-btn">
                <i class="fa-solid fa-pen-to-square"></i>
              </a>
              <a class="btn detail-btn">
                <i class="fa-solid fa-circle-info"></i>
              </a>
            </div>
            </div>
          </div>
    `;
  });
}

export function renderFavoritesList(arr) {
  cards.innerHTML = "";
  arr.forEach((movie) => {
    cards.innerHTML += `
      <div class="movie__card">
              <div class="img-box">
                <img
                  src="${movie.poster}"
                />
              </div>
              <div class="info-box">
                  <h2>${movie.title}</h2>
              <p class="genre">${movie.genre}</p>
              <p class="rate">IMDB: <i class="fa-solid fa-star"></i> ${movie.imdbRate}</p>
              </div>
            </div>
      `;
  });
}

export function renderDetailsList(obj) {
  movieDetails.innerHTML = `
     <h1>${obj.title}</h1>
        <div class="movie__watch">
          <div class="movie-poster">
            <img
              src="${obj.poster}"
              alt=""
            />
          </div>
          <iframe
            src="${obj.trailerUrl}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <div class="details__buttons">
          <button class="btn">${obj.genre}</button>
          <button class="btn">IMDb: ⭐ ${obj.imdbRate}</button>
          <button class="btn">Year: ${obj.year}</button>
        </div>
        <p class="description">${obj.description}</p>
        <p class="create">Movie added ${moment(obj.createdAt).format(
          "DD/MM/YYYY"
        )}</p>
    `;
}

export function searchMovies(arr) {
  searchInp.addEventListener("keyup", (e) => {
    const searchQuery = e.target.value.trim().toLowerCase();
    const searchedItem = arr.filter((x) =>
      x.title.trim().toLowerCase().includes(searchQuery)
    );
    renderMoviesList(searchedItem);
  });
}

export function sortMovies(option, arr) {
  switch (option) {
    case "new":
      return [...arr].sort((movie1, movie2) => movie2.year - movie1.year);
      break;
    case "old":
      return [...arr].sort((movie1, movie2) => movie1.year - movie2.year);
      break;
    default:
      return arr;
  }
}

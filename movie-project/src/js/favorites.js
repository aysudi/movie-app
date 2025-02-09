import { renderFavoritesList, searchMovies, sortMovies } from "./helper.js";

let favoritesList = [];
const API_URL = "https://67a0cfbf5bcfff4fabe0b8dc.mockapi.io/api/movies";

document.addEventListener("DOMContentLoaded", () => {
  fetch(API_URL)
    .then((res) => res.json())
    .then((datas) => {
      for (let i = 0; i < datas.length; i++) {
        const storage = JSON.parse(localStorage.getItem("movie"));
        const storedMovie = storage.find((item) => item.id == datas[i].id);
        if (storedMovie) {
          favoritesList.push(datas[i]);
        }
      }
      renderFavoritesList(favoritesList);

      const sort = document.querySelector("#sort");
      sort.addEventListener("change", function (e) {
        const sortedMovies = sortMovies(e.target.value, favoritesList);
        renderFavoritesList(sortedMovies);
      });
    })
    .catch((error) => console.error("Fetch Error:", error));

  searchMovies(favoritesList);
});

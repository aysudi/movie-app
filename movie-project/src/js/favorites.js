import { renderFavoritesList, searchMovies } from "./helper.js";

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
    })
    .catch((error) => console.error("Fetch Error:", error));

  searchMovies(favoritesList);
});

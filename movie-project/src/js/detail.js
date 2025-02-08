import { renderDetailsList } from "./helper.js";

const API_URL = "https://67a0cfbf5bcfff4fabe0b8dc.mockapi.io/api/movies";
const urlParams = new URLSearchParams(window.location.search);
const movieID = urlParams.get("id");

document.addEventListener("DOMContentLoaded", () => {
  fetch(API_URL)
    .then((res) => res.json())
    .then((datas) => {
      const selectedMovie = datas.find((movie) => movie.id == movieID);
      renderDetailsList(selectedMovie);
    })
    .catch((error) => console.error("Fetch Error:", error));
});

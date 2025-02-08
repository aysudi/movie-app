const API_URL = "https://67a0cfbf5bcfff4fabe0b8dc.mockapi.io/api/movies";

const movieForm = document.querySelector("#movie-form");
const titleInp = document.querySelector(".title-inp");
const genreInp = document.querySelector(".genre-inp");
const posterInp = document.querySelector(".poster-inp");
const trailerInp = document.querySelector(".trailer-inp");
const yearInp = document.querySelector(".year-inp");
const descriptionInp = document.querySelector(".description-inp");
const rateInp = document.querySelector(".rate-inp");
const urlParams = new URLSearchParams(window.location.search);
const movieID = urlParams.get("id");

document.addEventListener("DOMContentLoaded", () => {
  fetch(API_URL + `/${movieID}`)
    .then((res) => res.json())
    .then((movie) => {
      titleInp.value = movie.title;
      genreInp.value = movie.genre;
      posterInp.value = movie.poster;
      trailerInp.value = movie.trailerUrl;
      yearInp.value = movie.year;
      descriptionInp.value = movie.description;
      rateInp.value = movie.imdbRate;
    })
    .catch((error) => console.error("Error fetching movie:", error));

  movieForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const updatedMovie = {
      id: movieID,
      createdAt: new Date().toISOString(),
      title: titleInp.value,
      genre: genreInp.value,
      poster: posterInp.value,
      year: yearInp.value,
      description: descriptionInp.value,
      imdbRate: rateInp.value,
      trailerUrl: trailerInp.value,
    };
    try {
      await fetch(`${API_URL}/${movieID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMovie),
      });

      window.location.href = "index.html";
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  });
});

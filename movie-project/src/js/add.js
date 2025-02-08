const API_URL = "https://67a0cfbf5bcfff4fabe0b8dc.mockapi.io/api/movies";

const movieForm = document.querySelector("#movie-form");
const titleInp = document.querySelector(".title-inp");
const genreInp = document.querySelector(".genre-inp");
const posterInp = document.querySelector(".poster-inp");
const trailerInp = document.querySelector(".trailer-inp");
const yearInp = document.querySelector(".year-inp");
const descriptionInp = document.querySelector(".description-inp");
const rateInp = document.querySelector(".rate-inp");

document.addEventListener("DOMContentLoaded", () => {
  movieForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!movieForm.checkValidity()) {
      movieForm.reportValidity();
      return;
    }

    const movieData = {
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
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieData),
      });

      window.location.href = "index.html";
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

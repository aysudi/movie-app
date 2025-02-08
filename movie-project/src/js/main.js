import { MovieManager } from "./class.js";
import { renderMoviesList, searchMovies, sortMovies } from "./helper.js";
import { movies } from "./movies.js";

const API_URL = "https://67a0cfbf5bcfff4fabe0b8dc.mockapi.io/api/movies";

document.addEventListener("DOMContentLoaded", () => {
  const movieItem = new MovieManager();

  fetch(API_URL)
    .then((res) => res.json())
    .then((datas) => {
      renderMoviesList(datas);
      for (let i = 0; i < datas.length; i++) {
        const data = datas[i];

        const savedMovies = JSON.parse(localStorage.getItem("movie"));

        const deleteBtn = document.querySelectorAll(".delete-btn")[i];
        const favBtn = document.querySelectorAll(".favorite-btn")[i];
        const detailBtn = document.querySelectorAll(".detail-btn")[i];
        const editBtn = document.querySelectorAll(".edit-btn")[i];

        detailBtn.setAttribute("href", `./detail.html?id=${data.id}`);

        if (savedMovies.some((x) => x.id === data.id)) {
          const icon = favBtn.querySelector("i");
          icon.style.color = "black";
        }

        deleteBtn.addEventListener("click", (e) => {
          Swal.fire({
            title: "Are you sure?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            denyButtonText: `Don't delete`,
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire("Deleted!", "", "success");
              movieItem.deleteElement(API_URL, data.id, e);
            } else if (result.isDenied) {
              Swal.fire("Movie are not deleted", "", "info");
            }
          });
        });

        favBtn.addEventListener("click", () => {
          const icon = favBtn.querySelector("i");
          const newItem = { id: data.id, createdAt: data.createdAt };
          Swal.fire({
            title: "Added to favorites!",
            icon: "success",
            draggable: true,
          });

          if (savedMovies.some((x) => x.id === newItem.id)) {
            icon.style.color = "";
          } else {
            movieItem.add(newItem);
            icon.style.color = "black";
          }
        });

        editBtn.setAttribute("href", `./edit.html?id=${data.id}`);
      }

      const sort = document.querySelector("#sort");
      sort.addEventListener("change", function (e) {
        const sortedMovies = sortMovies(e.target.value, datas);
        renderMoviesList(sortedMovies);
      });
    })
    .catch((error) => console.error("Fetch Error:", error));
});

searchMovies(movies);

//   fetch(API_URL + "/23", {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//   }).then((response) => response.json());

//   async function addMoviesToAPI(movies) {
//     for (const movie of movies) {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(movie),
//       });

//       const savedMovie = await response.json();
//       console.log(`✅ Added: ${savedMovie.title} (ID: ${savedMovie.id})`);
//     }
//   }

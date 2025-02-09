import { MovieManager } from "./class.js";
import { renderMoviesList, searchMovies, sortMovies } from "./helper.js";

const API_URL = "https://67a0cfbf5bcfff4fabe0b8dc.mockapi.io/api/movies";

document.addEventListener("DOMContentLoaded", () => {
  const movieItem = new MovieManager();

  fetch(API_URL)
    .then((res) => res.json())
    .then((datas) => {
      renderMoviesList(datas);
      searchMovies(datas);

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
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
          });
          swalWithBootstrapButtons
            .fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel!",
              reverseButtons: true,
            })
            .then((result) => {
              if (result.isConfirmed) {
                movieItem.deleteElement(API_URL, data.id, deleteBtn);
                movieItem.removeMovieItem(data.id);
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                  title: "Cancelled",
                  icon: "error",
                });
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

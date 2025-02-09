export class MovieManager {
  constructor() {
    if (!JSON.parse(localStorage.getItem("movie"))) {
      localStorage.setItem("movie", JSON.stringify([]));
      this.movieItems = [];
    } else {
      const localItems = JSON.parse(localStorage.getItem("movie"));
      this.movieItems = [...localItems];
    }
  }

  //methods
  add(newItem) {
    const exists = this.movieItems.some((x) => x.id === newItem.id);
    if (!exists) {
      this.movieItems.push(newItem);
      localStorage.setItem("movie", JSON.stringify(this.movieItems));
    }
  }

  removeMovieItem(id) {
    const found = this.movieItems.find((x) => x.id == id);
    if (found) {
      const updatedMovieItems = this.movieItems.filter((x) => x.id != id);
      this.movieItems = [...updatedMovieItems];
      localStorage.setItem("movie", JSON.stringify([...updatedMovieItems]));
      return updatedMovieItems;
    } else {
      return {
        status: 404,
        message: "not found!",
      };
    }
  }

  deleteElement(url, id, el) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete from server");
        }
        return response.json();
      })
      .then(() => {
        el.parentElement.parentElement.parentElement.remove();
      })
      .catch((error) => console.error("Delete Error:", error));
  }
}

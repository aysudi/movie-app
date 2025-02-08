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

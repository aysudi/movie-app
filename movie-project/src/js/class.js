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

  deleteElement(url, id, e) {
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
        e.target.parentElement.parentElement.parentElement.remove();
      })
      .catch((error) => console.error("Delete Error:", error));
  }
  //   const found = this.movieItems.find((x) => x.id == id);
  //   if (found) {
  //     const updatedItems = this.movieItems.filter((x) => x.id != id);
  //     localStorage.setItem("movie", JSON.stringify([...updatedItems]));
  //     return updatedItems;
  //   }

  //   clear() {
  //     localStorage.setItem("movie", JSON.stringify([]));
  //     this.movieItems = [];
  //   }
}

document.querySelector(".searchbar").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    let searchTerm1 = document.querySelector('input[name="search"]');
    let searchTerm2 = searchTerm1.value;

    e.preventDefault();
    searchInterestHandler(searchTerm2);
  }
});

document
  .querySelector('button[name="newEvent"]')
  .addEventListener("click", async (e) => {
    const response = await fetch("/api/event/create/new", {
      method: "GET",
    });
    if (response.ok) {
      document.location.replace("/api/event/new");
    } else {
      console.log(response);
    }
  });

const searchInterestHandler = async (searchTerm) => {
  if (searchTerm) {
    const response = await fetch(`/api/eventTag/${searchTerm}`, {
      method: "GET",
    });
    if (response.ok) {
      document.location.replace(`/api/users/search/${searchTerm}`);
    } else {
      console.log(response);
    }
  }
};

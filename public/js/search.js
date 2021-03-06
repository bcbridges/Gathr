document.querySelector(".searchButton").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const searchTerm1 = document.querySelector('div[class="dropdown-content"]');
    const searchTerm2 = searchTerm1.value;
    console.log(searchTerm2);

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

const deletebtnHandler = async (event) => {
  const event_id = document.getElementById("deleteid").value;
  console.log(event_id);
  const deleteEvent = await fetch(`/api/event/${event_id}`, {
    method: "DELETE",
  });
  if (deleteEvent.ok) {
    document.location.replace("/api/users/search/coffee");
  } else {
    alert("failed to delete event!!");
  }
};

document
  .querySelector('button[name="deletebtn"]')
  .addEventListener("click", async (e) => {
    e.preventDefault();

    deletebtnHandler();
  });

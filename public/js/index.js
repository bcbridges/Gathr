//   for login event handler
const loginFormHandler = async (event) => {
  // event.preventDefault();

  var email = document.querySelector(".email-login").value.trim();
  var password = document.querySelector(".password-login").value.trim();
  console.log(`${email} & ${password}`);
  if (email && password) {
    const body = { email, password };
    console.log(body);
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/api/users/search/Coffee");
    } else {
      alert("Login failed.");
    }
  }
};

// for signup event handler
const signupFormHandler = async (event) => {
  var email = document.querySelector(".email-login").value.trim();
  var password = document.querySelector(".password-login").value.trim();
  console.log(`${email} & ${password}`);
  if (email && password) {
    const body = { email, password };
    console.log(body);
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/api/users/search/Coffee");
      alert("User Created.");
    } else {
      alert("User create failed.");
    }
  }
};

if (window.location.pathname == "/") {
  document.getElementById("login").addEventListener("click", async (e) => {
    //do login api call
    //if success, redirect logic here
    e.preventDefault();
    e.stopPropagation();
    loginFormHandler();
  });

  document.querySelector(".signup-form").addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    signupFormHandler();
  });
}

if (window.location.pathname == "/api/event/new") {
  document
    .querySelector('button[name="submitbtn"]')
    .addEventListener("click", async (e) => {
      e.preventDefault();
      const event_title = document
        .querySelector('input[name="event_title"]')
        .value.trim();
      const event_desc = document
        .querySelector('textarea[name="description"]')
        .value.trim();
      const start_date = document
        .querySelector('input[name="start_date"]')
        .value.trim();
      const end_date = document
        .querySelector('input[name="end_date"]')
        .value.trim();
      const addr_1 = document
        .querySelector('input[name="address_1"]')
        .value.trim();
      const addr_2 = document
        .querySelector('input[name="address_2"]')
        .value.trim();

      if (event_title && start_date && end_date && addr_1 && event_desc) {
        var newEventInfo = {
          event_title,
          event_desc,
          start_date,
          end_date,
          addr_1,
          addr_2,
        };
      }

      const response = await fetch("/api/event/", {
        method: "POST",
        body: JSON.stringify(newEventInfo),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(window.alert("New event created!"))
        .then(document.location.replace("/api/users/search/Coffee"));
    });

  document
    .querySelector('button[name="cancelbtn"]')
    .addEventListener("click", () => {
      document.location.replace("/api/users/search/Coffee");
    });
}

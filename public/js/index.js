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

    if (response.ok) {
      document.location.replace("/SEARCH PAGE");
      alert("Login successful.");
    } else {
      alert("Login failed.");
    }
  }
};

// for signup event handler
const signupFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector(".email-login").value.trim();
  const password = document.querySelector(".password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",

      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      document.location.replace("/SEARCH PAGE");
      alert("Successful.");
    } else {
      alert("Please try again.");
    }
  }
};

// AFTER LOGIN
const searchInterestHandler = async (event) => {
  event.preventDefault();

  const searchTerm = document.querySelector(".searchbar").value.trim();

  if (searchTerm) {
    const response = await fetch("/api/users", {
      method: "GET",
      body: JSON.stringify({ searchTerm }),
    });
  }
};

// event handlers

document.getElementById("login").addEventListener("click", async (e) => {
  //do login api call
  //if success, redirect logic here
  e.preventDefault();
  e.stopPropagation();
  loginFormHandler();
});

document.querySelector(".signup-form").addEventListener("click", (e) => {
  e.stopPropagation();
  signupFormHandler();
});

// event listener for homepage events list. Need callback (imported?) for click event.
// document.querySelector(".upcoming-events").addEventListener("click", XXXX);

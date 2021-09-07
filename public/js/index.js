const startBtn = document.getElementById("TBD");

// function to GET upcoming events for homepage
const dispUpcomingEvents = async () =>
  await fetch("/api/users/login", {
    method: "GET",
  });

//   for login event handler
const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // where is response.ok set?
    if (response.ok) {
      // where does this go?
      document.location.replace("/");
    } else {
      alert("Login failed.");
    }
  }
};

// for signup event handler
const signupFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // where is response.ok set?
    if (response.ok) {
      // where does this go?
      document.location.replace("/");
    } else {
      alert("Please try again.");
    }
  }
};

// event handlers
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);

// event listener for homepage events list. Need callback (imported?) for click event.
document.querySelector(".upcoming-events").addEventListener("click", XXXX);

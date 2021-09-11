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
      // document.location.replace("/api/users/search");
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
    .addEventListener("click", () => {});

  document
    .querySelector('button[name="cancelbtn"]')
    .addEventListener("click", () => {
      document.location.replace("/api/users/search/Coffee");
    });
}

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
      document.location.replace("/api/users/search");
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

// AFTER LOGIN
const searchInterestHandler = async (searchTerm) => {
  if (searchTerm) {
    const response = await fetch(`/api/eventTag/${searchTerm}`, {
      method: "GET",
    });
    if (response.ok) {
      console.log("Get reponse was okay.");
    } else {
      console.log(response);
    }
  }
};

// event handlers

console.log(window.location.pathname);

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

// event listener for homepage events list. Need callback (imported?) for click event.
// document.querySelector(".upcoming-events").addEventListener("click", XXXX);

if (document.location.pathname == "/api/users/search") {
  document.querySelector(".searchbar").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const searchTerm1 = document.querySelector('input[name="search"]');
      const searchTerm2 = searchTerm1.value;
      console.log(searchTerm2);

      e.preventDefault();
      searchInterestHandler(searchTerm2);
      console.log("The enter button was clicked.");
    }
  });
}

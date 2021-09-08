//const router = require('express').Router();
//const express = require('express');
//const mysql = require('mysql2');

const startBtn = document.getElementById("TBD");

// function to GET upcoming events for homepage
// UPDATE ROUTES
const dispUpcomingEvents = async () =>
  await fetch("/api/users/login", {
    method: "GET",
  });

//   for login event handler
const loginFormHandler = async (event) => {
  event.preventDefault();
  // UPDATE IDS
  const email = "email@address.com"; //= document.querySelector("#email-login").value.trim();
  const password = "password"; //= document.querySelector("#password-login").value.trim();
  // UPDATE ROUTES
  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // where is response.ok set?
    if (response.ok) {
      // where does this go?
      //   document.location.replace("INSERT SEARCH PAGE");
      alert("Login successful.");
    } else {
      alert("Login failed.");
    }
  }
};

// for signup event handler
const signupFormHandler = async (event) => {
  event.preventDefault();
  // UPDATE IDS
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (email && password) {
    // UPDATE ROUTES
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // where is response.ok set?
    if (response.ok) {
      // where does this go?
      //   document.location.replace("INSERT LOGIN PAGE");
      alert("Successful.");
    } else {
      alert("Please try again.");
    }
  }
};

// AFTER LOGIN
const searchInterestHandler = async (event) => {
  event.preventDefault();
  // UPDATE IDS
  const searchTerm = document.querySelector("#search-interest").value.trim();

  if (searchTerm) {
    // UPDATE ROUTES
    const response = await fetch("/api/users", {
      method: "GET",
      body: JSON.stringify({ searchTerm }),
    });

    // // where is response.ok set?
    // if (response.ok) {
    //   // where does this go?
    //   document.location.replace("/");
    // } else {
    //   alert("Please try again.");
    // }
  }
};

// event handlers
// UPDATE IDS
// ARE WE USING THE FORM? OR THE BUTTON?
document.getElementById("login").addEventListener("click", async (e) => {
  //do login api call
  //if success, redirect logic here
  e.stopPropagation();
  loginFormHandler();
});

document.querySelector(".signup-form").addEventListener("click", (e) => {
  e.stopPropagation();
  signupFormHandler();
});

// event listener for homepage events list. Need callback (imported?) for click event.
// document.querySelector(".upcoming-events").addEventListener("click", XXXX);

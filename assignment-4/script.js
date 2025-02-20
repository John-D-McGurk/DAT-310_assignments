"use strict";

class contact {
    constructor()
}

function addContact(form) {
    
}

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("#contact-form");

  console.log(contactForm);

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addContact(new FormData(contactForm));
  });
});

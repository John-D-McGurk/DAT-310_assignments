"use strict";


function addContact(form) {
    console.log(form.get('name'))
}

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("#contact-form");

  console.log(contactForm);

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addContact(new FormData(contactForm));
  });
});

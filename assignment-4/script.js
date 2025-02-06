"use strict";

class Entry {
  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

let addressBook = []

function propagateAddressBook() {
  addressBook.push(new Entry('Harry', 'LightningScar123@hogwarts.com', '41424243'));
  addressBook.push(new Entry('Ron', 'BrokenWand@hogwarts.com', '98765432'));
  addressBook.push(new Entry('Hermione', 'LeviooosaNotLeviosaaah@hogwarts.com', '12345678'));
  addressBook.push(new Entry('Draco', 'ScaredPottah@hogwarts.com', '54827464'));

}

function addContact(form) {
  const nameInput = form.get('name');
  let email = form.get('email');
  let phone = form.get('phone');

  if (!(email || phone)) {
    window.alert("You must enter either an E-mail address or a phone number.");
  } else {
    addressBook.push(new Entry(nameInput, email, phone));
    refreshContacts();
  }
}

function refreshContacts() {
  const container = document.querySelector('.table-container');

  while (container.firstElementChild) {
    container.firstElementChild.remove();
  }

  const table = document.createElement('table');

  const nameEl = document.createTextNode('Name');
  const phoneEl = document.createTextNode('Phone');
  const emailEl = document.createTextNode('E-mail');

  addContactRow(table, [nameEl, phoneEl, emailEl], true)

  for (let i = 0; i < addressBook.length; i++) {
    const nameEl = document.createTextNode(addressBook[i].name);
    const phone = addressBook[i].phone;
    const email = addressBook[i].email;


    const phoneEl = document.createElement('a');
    phoneEl.href = 'tel:' + phone;
    phoneEl.appendChild(document.createTextNode(phone))

    const emailEl = document.createElement('a');
    emailEl.href = 'mail:' + email;
    emailEl.appendChild(document.createTextNode(email))

    addContactRow(table, [nameEl, phoneEl, emailEl])
  }
  container.appendChild(table);


}

function addContactRow(table, contact, th = false) {
  const row = document.createElement('tr')
  for (let i = 0; i < contact.length; i++) {
    let col = 'stuff';
    if (th) {
      col = document.createElement('th')
    } else {
      col = document.createElement('td')
    }
    col.appendChild(contact[i]);

    row.appendChild(col)


  }
  table.appendChild(row)
}

document.addEventListener("DOMContentLoaded", () => {
  propagateAddressBook();
  refreshContacts();

  const contactForm = document.querySelector("#contact-form");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addContact(new FormData(contactForm));
  });
});

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

function addContact(formRaw, position = -1) {
  const form = new FormData(formRaw);
  const nameInput = form.get('name');
  let email = form.get('email');
  let phone = form.get('phone');

  if (!(email || phone)) {
    window.alert("You must enter either an E-mail address or a phone number.");
  } else {
    if (position > -1) {
      addressBook.splice(position, 1, new Entry(nameInput, email, phone))
    }
    else {
      addressBook.push(new Entry(nameInput, email, phone));

    }
    refreshContacts();
  }
}

function editContact(button, contactIndex) {
  const row = button.parentElement.parentElement;
  const formEl = document.createElement('form');
  formEl.style.display = 'none';
  formEl.id = `rowForm-${contactIndex}`;
  row.appendChild(formEl);

  const cells = row.querySelectorAll('td');
  cells.forEach((cell) => {
    const currentText = cell.innerText;
    const cellContent = cell.firstElementChild
    const editable = cellContent.dataset.editable;
    const editBtn = cellContent.dataset.editBtn

    if (editable) {
      const inputField = document.createElement('input');
      inputField.value = currentText;
      inputField.name = cellContent.dataset.name;
      inputField.type = cellContent.dataset.type;
      inputField.setAttribute('form', formEl.id);
      cell.replaceChildren(inputField);
    } else if (editBtn) {
      const confirmBtn = document.createElement('input');
      confirmBtn.value = 'Confirm';
      confirmBtn.type = 'submit';
      confirmBtn.setAttribute('form', formEl.id);

      formEl.addEventListener('submit', (event) => {
        console.log('submit')
        event.preventDefault();
        addContact(formEl, contactIndex);
      })
      cell.replaceChildren(confirmBtn);
    }
  });
}

function removeContact(contactIndex) {
  const modalContent = document.createDocumentFragment();

  const confirmText = document.createElement('p');
  confirmText.appendChild(document.createTextNode(`Are you sure you want to remove ${addressBook[contactIndex].name} from contacts?`));
  modalContent.appendChild(confirmText);

  const btnContainer = document.createElement('div');
  btnContainer.id = 'modal-buttons'

  const confirmBtn = document.createElement('button');
  confirmBtn.appendChild(document.createTextNode('Remove'));
  confirmBtn.onclick = () => {
    addressBook.splice(contactIndex, 1);
    closeModal();
    refreshContacts();
  }
  btnContainer.appendChild(confirmBtn);


  const cancelBtn = document.createElement('button');
  cancelBtn.appendChild(document.createTextNode('Cancel'));
  cancelBtn.onclick = () => closeModal();
  btnContainer.appendChild(cancelBtn);

  modalContent.append(btnContainer);

  showModal(modalContent)
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
    const name = addressBook[i].name
    const phone = addressBook[i].phone;
    const email = addressBook[i].email;

    const nameEl = document.createElement('span');
    nameEl.appendChild(document.createTextNode(name));
    nameEl.dataset.type = 'text';
    nameEl.dataset.name = 'name';
    nameEl.dataset.editable = 'true';

    const phoneEl = document.createElement('a');
    phoneEl.href = 'tel:' + phone;
    phoneEl.dataset.type = "tel";
    phoneEl.dataset.name = "phone";
    phoneEl.dataset.editable = 'true';

    phoneEl.appendChild(document.createTextNode(phone))

    const emailEl = document.createElement('a');
    emailEl.href = 'mail:' + email;
    emailEl.dataset.type = "email"
    emailEl.dataset.name = "email"
    emailEl.dataset.editable = 'true';

    emailEl.appendChild(document.createTextNode(email))

    const editBtn = document.createElement('button');
    editBtn.innerText = "Edit";
    editBtn.dataset.editBtn = "true"
    editBtn.onclick = (event) => editContact(event.target, i);

    const removeBtn = document.createElement('button');
    removeBtn.innerText = "Remove";
    removeBtn.onclick = () => removeContact(i);

    addContactRow(table, [nameEl, phoneEl, emailEl, editBtn, removeBtn])
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

  return row
}

function search(searchTerm) {
  const tableRows = document.querySelectorAll('tr');

  for (let i = 1; i < tableRows.length; i++) {
    const tableCells = tableRows[i].querySelectorAll('td');
    tableRows[i].style.display = 'none';
    for (let j = 0; j < tableCells.length; j++) {
      let textContent = tableCells[j].textContent;

      if (textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
        tableRows[i].style.display = 'table-row';
      }

    }
  }
}

function showModal(content) {
  const modalContainer = document.querySelector("#modal");

  const modalContentBox = modalContainer.firstElementChild;
  modalContentBox.appendChild(content);


  const modalCloseBtn = document.createElement('span');
  modalCloseBtn.appendChild(document.createTextNode('x'));
  modalCloseBtn.id = 'close';
  modalCloseBtn.addEventListener('click', () => closeModal())
  modalContentBox.appendChild(modalCloseBtn)

  modalContainer.style.display = 'flex'
}

function closeModal() {
  const modalContainer = document.querySelector('#modal');
  const modalContentBox = modalContainer.firstElementChild;

  modalContainer.style.display = 'none';
  modalContentBox.replaceChildren();
}

document.addEventListener("DOMContentLoaded", () => {
  propagateAddressBook();
  refreshContacts();

  const contactForm = document.querySelector("#contact-form");

  contactForm.addEventListener("submit", (event) => {
    console.log(event)
    event.preventDefault();
    addContact(contactForm);
  });

  const searchBar = document.querySelector('#search');
  searchBar.addEventListener('input', () => {
    search(searchBar.value);
  })
});
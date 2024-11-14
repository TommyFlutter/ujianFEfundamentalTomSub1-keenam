import './component/image-figure.js';
import './component/footer.js';
import './component/header.js';
import '../styles/main.css';
import '../styles/reset.css';
import './note-api.js';

import { createNoteApi } from './note-api.js';
import { deleteNoteApi } from './note-api.js';
import Swal from 'sweetalert2';
import {
  unarchiveNote,
  getArchivedApi,
  archiveNote,
  getNotesApi,
} from './note-api.js';

let notesData = [];

const overlay = document.querySelector('#overlay');
const loading = document.querySelector('#loading');

const showLoading = () => {
  loading.style.display = 'block';
  overlay.style.display = 'block';
};

const hideLoading = () => {
  loading.style.display = 'none';
  overlay.style.display = 'none';
};

const STORAGE_KEY = 'note-app';

const noteStorage = {
  get() {
    return localStorage.getItem(STORAGE_KEY) !== null
      ? localStorage.getItem(STORAGE_KEY)
      : localStorage.setItem(STORAGE_KEY, JSON.stringify(notesData));
  },
  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notesData));
  },
};

const RENDER_EVENT = 'render-event';

document.addEventListener('DOMContentLoaded', () => {
  if (noteStorage.get() !== undefined) {
    notesData = JSON.parse(noteStorage.get());
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
});

const createNoteitem = (noteData) => {
  const { id, title, body, createdAt, archived } = noteData;

  const containerEl = document.createElement('li');
  containerEl.classList.add('notes__item');

  const titleEl = document.createElement('h3');
  titleEl.classList.add('notes__title');
  titleEl.textContent = title;

  const bodyEl = document.createElement('div');
  bodyEl.classList.add('notes__body');
  bodyEl.textContent = body;

  const createdAtEl = document.createElement('div');
  createdAtEl.classList.add('notes__createdAt');
  createdAtEl.textContent = createdAt;

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('notes__delete');
  deleteButton.textContent = 'Delete';

  deleteButton.addEventListener('click', () => {
    deleteNoteApiHandler(id);
  });

  const archivedButton = document.createElement('button');
  archivedButton.classList.add('notes__toggle');
  archivedButton.setAttribute('id', id);
  archivedButton.textContent = archived ? 'unarchive' : 'archive';

  archivedButton.addEventListener('click', (e) => {
    const note_id = e.target.getAttribute('id');
    const archive = e.target.textContent;
    archiveNoteApiHandler(note_id, archive);
  });

  containerEl.append(
    titleEl,
    bodyEl,
    createdAtEl,
    archivedButton,
    deleteButton,
  );

  return containerEl;
};

const formEl = document.querySelector('form');
formEl.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const title = formData.get('title');
  const body = formData.get('body');
  const archived = formData.get('archived') === 'on';

  await createNote({ title, body });

  document.querySelector('input[name="title"]').value = '';
  document.querySelector('input[name="body"]').value = '';
  document.querySelector('input[name="archived"]').checked = false;

  document.dispatchEvent(new Event(RENDER_EVENT));
});
const getNotes = async () => {
  try {
    notesData = await getNotesApi()
  } catch (error) {
    console.log(error);
  }
};

const createNote = async (note) => {
  showLoading();
  try {
    const response = await createNoteApi(note);
  } catch (error) {
    console.log(error);
  } finally {
    hideLoading();
  }
};

function deleteNoteApiHandler(note_id) {
  Swal.fire({
    title: 'Anda Yakin?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya',
    cancelButtonText: 'Batal',
    cancelButtonColor: 'red',
    confirmButtonColor: 'blue',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await deleteNoteApi(note_id);

      Swal.fire({
        title: response.message,
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
        position: 'top-end',
      });
      document.dispatchEvent(new Event(RENDER_EVENT));
    }
  });
}
function archiveNoteApiHandler(note_id, archive) {
  Swal.fire({
    title: 'Anda Yakin?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya',
    cancelButtonText: 'Batal',
    cancelButtonColor: 'red',
    confirmButtonColor: 'blue',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await archiveNote(note_id, archive);
      Swal.fire({
        title: response.message,
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
        position: 'top-end',
      });

      document.dispatchEvent(new Event(RENDER_EVENT));
    }
  });
}



function unarchiveNoteApiHandler(note_id, unarchive) {
  Swal.fire({
    title: 'Anda Yakin?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya',
    cancelButtonText: 'Batal',
    cancelButtonColor: 'red',
    confirmButtonColor: 'blue',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await archiveNote(note_id, archive);
      Swal.fire({
        title: response.message,
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
        position: 'top-end',
      });

      document.dispatchEvent(new Event(RENDER_EVENT));
    }
  });
}


document.addEventListener(RENDER_EVENT, async () => {
  showLoading();
  const archiveNotesEl = document.querySelector('.notes__list--archive');
  const notarchiveNotesEl = document.querySelector('.notes__list--notarchive');

  archiveNotesEl.innerHTML = '';
  notarchiveNotesEl.innerHTML = '';

  await getNotes();
 

 
  notesData.forEach((note) => {
    if (note.archived) {
      archiveNotesEl.appendChild(createNoteitem(note));
    } else {
      notarchiveNotesEl.appendChild(createNoteitem(note));
    }
  });
  hideLoading();
});

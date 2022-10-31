import { galleryItems } from './gallery-items.js';

// Change code below this line
const galleryRef = document.querySelector('div.gallery');
const modal = basicLightbox.create(`
    <img src="" alt="" width="1000">
`);

galleryRef.addEventListener('click', galleryClickHandler);

let galleryMarkup = galleryItems
  .map((item) => {
    return `
  <div class="gallery__item">
    <a class="gallery__link" href="${item.original}">
      <img
        class="gallery__image"
        src="${item.preview}"
        data-source="${item.original}"
        alt="${item.description}"
      />
    </a>
  </div>`;
  })
  .join('');

galleryRef.innerHTML = galleryMarkup;

// Gallery click and open select image
function galleryClickHandler(evt) {
  evt.preventDefault();

  const { target } = evt;
  if (target.nodeName !== 'IMG') return;

  modal.show((modal) => {
    const imgElem = modal.element().querySelector('img');

    imgElem.src = target.dataset.source;
    imgElem.alt = target.getAttribute('alt');

    addKeyEvent();
  });
}

// Add key event
function addKeyEvent() {
  window.addEventListener('keydown', keyDownHandler);
}

// Remove key event
function removeKeyEvent() {
  window.removeEventListener('keydown', keyDownHandler);
}

// If key === Escape when close modal
function keyDownHandler(evt) {
  if (evt.code !== 'Escape') return;

  modal.close(removeKeyEvent);
}

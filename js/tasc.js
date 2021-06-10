import images from '/gallery-items.js';

const refs = {
   gallery: document.querySelector('.js-gallery'),
   linkA: document.querySelector('.gallery__link'),
   lightbox: document.querySelector('.js-lightbox'),
   modalImages: document.querySelector('.lightbox__image'),
   modal: document.querySelector('.js-lightbox'),
   closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),

   overlay: document.querySelector('.lightbox__overlay'),
}
// console.log(refs.overlay);

// Создание и рендер разметки 
const galleryMarkup = createGalleryMarkup(images);

function createGalleryMarkup(images) {
   return images.map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
         <a class="gallery__link"
         href="${original}"  >
         <img class="gallery__image"
         src="${preview}"
         data-source="${original}"
         alt="${description}"/>
         </a>
      </li>`
   })
      .join("");
}

refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);


// Реализация делегирования на галерее 
refs.gallery.addEventListener('click', ongalleryClick);

function ongalleryClick(event) {
   event.preventDefault();

   if (event.target.nodeName !== 'IMG') {
      return;
   }

   const imagesRef = event.target;
   const largeImagesURL = imagesRef.dataset.source;
   const largeImagesALT = imagesRef.alt
   

   // Подмена значения атрибутjd
   setLargeImageSrc(largeImagesURL);
   setLargeImageAlt(largeImagesALT);

   
   // Открытие модального окна 
   refs.modal.classList.add('is-open')

}

// url в модалку
function setLargeImageSrc(url) {
   refs.modalImages.src = url;
}
// alt в модалку
function setLargeImageAlt(alt) {
   refs.modalImages.alt = alt;
}

// Закрытие модального. Очистка значения атрибута src
refs.closeModalBtn.addEventListener('click',() => {
   refs.modal.classList.remove('is-open');
   refs.modalImages.src = "";
   refs.modalImages.alt = "";
})

refs.overlay.addEventListener('click',() => {
   refs.modal.classList.remove('is-open');
   refs.modalImages.src = "";
   refs.modalImages.alt = "";
})

//Наивгация по кнопкам

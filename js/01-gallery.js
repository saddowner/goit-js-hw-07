import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');
let lightbox;

const markup = galleryItems.map(({ preview, original, description }) => { 
  return `<li class="gallery__item"> 
  <a class="gallery__link">                                     
      <img
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        class="gallery__image"
      />
    </a>     
  </li>`;
}).join('');

galleryList.insertAdjacentHTML("beforeend",markup);

//  делегування подій на img
galleryList.addEventListener('click', (event) => {             //додаємо слухач подій на весь список,щоб оптимізувати код
  event.preventDefault();                                      //прибираємо дефолтну поведінку браузера
    if (event.target.tagName !== 'IMG') return;                //перевірка на клік саме по IMG
    const largeImageUrl = event.target.dataset.source;         //отримуємо значення дата-атрибуту картинки,де вказане посилання на велику картинку
    lightbox = basicLightbox.create(`<img src ="${largeImageUrl}">`); //подія клік буде додавати до html модалку з вказаною розміткою 
    
    lightbox.show();                                           //метод show() для появи модалки
    document.addEventListener("keydown", closeWithEsc)         //коли модалка відкрита,вішається слухач на кнопку Esc 
}
    
);

function closeWithEsc(e) {                                     //функція для механізму роботи кнопки Esc
    
    if(e.code === "Escape") {                                  //перевірка на кнопку з кодом Escape
        lightbox.close();                                      //якшо перевірка проходить, натискання кнопки Esc закриє модалку 
        document.removeEventListener("keydown", closeWithEsc)  // і знімиться слухач з кнопки 
    }
   
}
import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");

const galleryMarkup = galleryItems.map(({ fullImage, thumbnail, caption }) => {
  return `<li class="image-item">
  <a class="image-link" href=${fullImage}>
    <img
      class="image-preview"
      src=${thumbnail}
      data-source=${fullImage}
      alt=${caption}
    />
  </a>
</li>`;
});

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup.join(""));

const onGalleryClick = (event) => {
  event.preventDefault();

  const clickedImage = event.target;
  if (clickedImage.tagName === "IMG") {
    const lightboxInstance = basicLightbox.create(
      `<div><img class="lightbox-image" src=${clickedImage.getAttribute(
        "data-source"
      )} alt=${clickedImage.alt}/></div>`,
      {
        onShow: (instance) => {
          instance.element().querySelector("div").onclick = (event) => {
            event.preventDefault();
            instance.close();
          };
        },
      }
    );
    lightboxInstance.show();
  }
};

galleryContainer.addEventListener("click", onGalleryClick);

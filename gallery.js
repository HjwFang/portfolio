// Gallery Lightbox Functionality
let currentImageIndex = 0;
let galleryImages = [];

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', function() {
    // Get all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Extract image sources and alt text
    galleryImages = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        return {
            src: img.src,
            alt: img.alt || ''
        };
    });
});

// Open lightbox with specific image
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');

    // Set image and caption
    lightboxImage.src = galleryImages[currentImageIndex].src;
    lightboxImage.alt = galleryImages[currentImageIndex].alt;
    lightboxCaption.textContent = galleryImages[currentImageIndex].alt;

    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Change image in lightbox
function changeImage(direction) {
    currentImageIndex += direction;

    // Loop around if at the beginning or end
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }

    // Update image and caption
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');

    lightboxImage.src = galleryImages[currentImageIndex].src;
    lightboxImage.alt = galleryImages[currentImageIndex].alt;
    lightboxCaption.textContent = galleryImages[currentImageIndex].alt;
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightbox');

    if (lightbox.classList.contains('active')) {
        if (event.key === 'Escape') {
            closeLightbox();
        } else if (event.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (event.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});

// Close lightbox when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');

    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
});

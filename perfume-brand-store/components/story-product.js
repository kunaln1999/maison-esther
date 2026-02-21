/**
 * Story Component Logic
 * Handles HTML generation for product tiles and the fullscreen overlay management.
 */

function createStoryProductTile(product) {
    if (!product) return '';

    return `
        <div class="product-card story-tile">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <span class="product-price">${product.price}</span>
            </div>
            <button class="btn-add-cart">Add to bag</button>
        </div>
    `;
}

function openStoryOverlay(story) {
    let overlay = document.querySelector('.story-fullscreen-overlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'story-fullscreen-overlay';
        document.body.appendChild(overlay);
    }

    const productTileHTML = createStoryProductTile(story.product);

    overlay.innerHTML = `
    <div class="story-fullscreen-container">
        <button class="story-overlay-close" aria-label="Close story">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
        <video class="story-fullscreen-video" autoplay playsinline loop>
            <source src="${story.videoUrl}" type="video/mp4">
        </video>
        ${productTileHTML}
    </div>
  `;

    const video = overlay.querySelector('.story-fullscreen-video');
    const closeBtn = overlay.querySelector('.story-overlay-close');

    const closeOverlay = () => {
        overlay.classList.remove('active');
        video.pause();
        document.body.style.overflow = '';
        setTimeout(() => {
            overlay.innerHTML = '';
        }, 400);
    };

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeOverlay();
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeOverlay();
    });

    document.body.style.overflow = 'hidden';
    overlay.classList.add('active');
    video.play().catch(err => console.log('Video autoplay blocked:', err));
}

// Make available globally
window.openStoryOverlay = openStoryOverlay;

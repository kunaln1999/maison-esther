// Main App Entry
document.addEventListener('DOMContentLoaded', () => {
  console.log('Aura Luxury Store Initialized');

  const header = document.querySelector('main-header');

  let lastScrollY = window.scrollY;

  const mainContent = document.getElementById('main-content');
  const footerElement = document.querySelector('main-footer');

  // Header and Footer scroll effects
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Base scrolled state (white background and compact)
    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Reveal navigation strip when scrolling up while in scrolled state
    if (currentScrollY < lastScrollY && currentScrollY > 50) {
      header.classList.add('reveal-nav');
    } else {
      header.classList.remove('reveal-nav');
    }

    // Footer visibility reveal effect
    // Only show footer when near the bottom of the page to prevent it from showing during overscroll at the top
    if (mainContent && footerElement) {
      if (window.innerWidth <= 640) {
        footerElement.style.visibility = 'visible';
      } else {
        const scrollBottom = currentScrollY + window.innerHeight;
        const contentBottom = mainContent.offsetTop + mainContent.offsetHeight;

        if (contentBottom <= window.innerHeight * 1.5 || scrollBottom >= contentBottom - window.innerHeight) {
          footerElement.style.visibility = 'visible';
        } else {
          footerElement.style.visibility = 'hidden';
        }
      }
    }

    lastScrollY = currentScrollY;
  }, { passive: true });

  // Initialize footer visibility state
  if (mainContent && footerElement && window.innerWidth > 640 && mainContent.offsetTop + mainContent.offsetHeight > window.innerHeight * 1.5) {
    footerElement.style.visibility = 'hidden';
  }

  // Add entry animations for other elements if needed
  fetchShopifyProducts();
  renderStories();
  renderNewArrivals();
  fetchGiftDiscount();
  initFooterReveal();

  // Handle Save Button Clicks (Delegation)
  const productGrid = document.getElementById('shopify-products');
  if (productGrid) {
    productGrid.addEventListener('click', (e) => {
      const saveBtn = e.target.closest('.btn-save');
      if (saveBtn) {
        e.stopPropagation(); // Prevent product click if we add one later
        saveBtn.classList.toggle('active');

        // Optional: Simple vibration or feedback
        if (window.navigator.vibrate) {
          window.navigator.vibrate(10);
        }
      }
    });
  }
});

function renderStories() {
  const container = document.getElementById('stories-grid');
  if (!container) return;

  const storiesData = [
    {
      videoUrl: 'assets/background.mp4',
      product: {
        title: 'Oud Nuit',
        price: '£240.00',
        image: 'assets/IMG_0738.jpg'
      }
    },
    {
      videoUrl: 'assets/background.mp4',
      product: {
        title: 'Fleur d\'Or',
        price: '£185.00',
        image: 'assets/IMG_0739.jpg'
      }
    },
    {
      videoUrl: 'assets/background.mp4',
      product: {
        title: 'Santal Royal',
        price: '£210.00',
        image: 'assets/IMG_0740.jpg'
      }
    },
    {
      videoUrl: 'assets/background.mp4',
      product: {
        title: 'Rose Noir',
        price: '£195.00',
        image: 'assets/IMG_0741.jpg'
      }
    },
    {
      videoUrl: 'assets/background.mp4',
      product: {
        title: 'Oud Nuit',
        price: '£240.00',
        image: 'assets/IMG_0738.jpg'
      }
    },
    {
      videoUrl: 'assets/background.mp4',
      product: {
        title: 'Santal Royal',
        price: '£210.00',
        image: 'assets/IMG_0740.jpg'
      }
    }
  ];

  container.innerHTML = storiesData.map((story, index) => `
    <div class="story-card" data-index="${index}">
        <video class="story-video" autoplay loop muted playsinline>
            <source src="${story.videoUrl}" type="video/mp4">
        </video>
        <div class="story-overlay"></div>
        <div class="story-product-tag">
            <img src="${story.product.image}" alt="${story.product.title}" class="story-product-img">
            <div class="story-product-info">
                <span class="story-product-name">${story.product.title}</span>
                <span class="story-product-price">${story.product.price}</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
        </div>
    </div>
  `).join('');

  // Add click listeners to stories
  container.querySelectorAll('.story-card').forEach(card => {
    card.addEventListener('click', () => {
      const index = card.dataset.index;
      if (window.openStoryOverlay) {
        window.openStoryOverlay(storiesData[index]);
      }
    });
  });

}


async function fetchShopifyProducts() {
  const grid = document.getElementById('shopify-products');
  if (!grid) return;

  // In a real production setup, this would be an environment variable or fetched from a secure endpoint
  const storeDomain = 'YOUR_STORE.myshopify.com';
  const storefrontAccessToken = 'YOUR_STOREFRONT_TOKEN';

  const graphqlQuery = `
    {
      products(first: 4) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  transformedSrc(maxWidth: 600)
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 1) {
              edges {
                node {
                  title
                  weight
                  weightUnit
                }
              }
            }
          }
        }
      }
    }`;

  try {
    const response = await fetch(`https://${storeDomain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: graphqlQuery })
    });

    if (!response.ok) throw new Error('Failed to fetch from Shopify');

    const { data } = await response.json();
    const products = data.products.edges;

    grid.innerHTML = products.map(({ node }) => createProductCardHTML(node)).join('');

  } catch (error) {
    console.warn('Shopify API connection failed or not configured. Falling back to mock data.', error);

    // Fallback Mock Data for Development/Demonstration
    const mockProducts = [
      {
        title: 'Oud Nuit',
        description: 'A dark, intense blend for the evening',
        size: '2 fl oz',
        priceRange: { minVariantPrice: { amount: '240.00', currencyCode: 'GBP' } },
        images: { edges: [{ node: { transformedSrc: 'assets/IMG_0738.jpg' } }] }
      },
      {
        title: 'Fleur d\'Or',
        description: 'For normal to dry; dehydrated, dull or patchy; and mature skin',
        size: '1.6 fl oz',
        priceRange: { minVariantPrice: { amount: '185.00', currencyCode: 'GBP' } },
        images: { edges: [{ node: { transformedSrc: 'assets/IMG_0739.jpg' } }] }
      },
      {
        title: 'Santal Royal',
        description: 'Magnolia Leaf, Roman Chamomile, Cedar Heart',
        size: 'Kit',
        priceRange: { minVariantPrice: { amount: '210.00', currencyCode: 'GBP' } },
        images: { edges: [{ node: { transformedSrc: 'assets/IMG_0740.jpg' } }] }
      },
      {
        title: 'Rose Noir',
        description: 'A citrus, woody, herbaceous duo to cleanse and hydrate',
        size: '2 fl oz',
        priceRange: { minVariantPrice: { amount: '195.00', currencyCode: 'GBP' } },
        images: { edges: [{ node: { transformedSrc: 'assets/IMG_0741.jpg' } }] }
      }
    ];

    grid.innerHTML = mockProducts.map(p => createProductCardHTML(p)).join('');
  }
}

function createProductCardHTML(product) {
  const price = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: product.priceRange.minVariantPrice.currencyCode
  }).format(product.priceRange.minVariantPrice.amount);

  const imageUrl = product.images.edges[0]?.node?.transformedSrc || '';

  const description = product.description || 'Enriched with botanical extracts & oils';

  let series = product.size || '1.6 fl oz';

  // Shopify API dynamic variant size/weight extraction
  if (product.variants?.edges?.[0]?.node) {
    const variant = product.variants.edges[0].node;
    if (variant.weight) {
      series = `${variant.weight} ${variant.weightUnit}`.toLowerCase();
    } else if (variant.title && variant.title !== 'Default Title') {
      series = variant.title;
    }
  }


  return `
        <div class="product-card">
            <button class="btn-save" aria-label="Save product">
                <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 21.5L13 18.5L7 21.5V5.5C7 4.39543 7.89543 3.5 9 3.5H17C18.1046 3.5 19 4.39543 19 5.5V21.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <div class="product-image-container">
                <img src="${imageUrl}" alt="${product.title}" loading="lazy">
            </div>
            <h3 class="product-title">${product.title} <span class="product-series">| ${series}</span></h3>
            <p class="product-description">${description}</p>
            <span class="product-price">${price}</span>
            <button class="btn-add-cart">Add to bag</button>
        </div>
    `;
}

function renderNewArrivals() {
  const container = document.getElementById('new-arrivals-grid');
  if (!container) return;

  const mockNewArrivals = [
    {
      title: 'Oud Nuit',
      description: 'A dark, intense blend for the evening',
      size: '2 fl oz',
      priceRange: { minVariantPrice: { amount: '240.00', currencyCode: 'GBP' } },
      images: { edges: [{ node: { transformedSrc: 'assets/IMG_0738.jpg' } }] }
    },
    {
      title: 'Fleur d\'Or',
      description: 'For normal to dry; dehydrated, dull or patchy; and mature skin',
      size: '1.6 fl oz',
      priceRange: { minVariantPrice: { amount: '185.00', currencyCode: 'GBP' } },
      images: { edges: [{ node: { transformedSrc: 'assets/IMG_0739.jpg' } }] }
    },
    {
      title: 'Santal Royal',
      description: 'Magnolia Leaf, Roman Chamomile, Cedar Heart',
      size: 'Kit',
      priceRange: { minVariantPrice: { amount: '210.00', currencyCode: 'GBP' } },
      images: { edges: [{ node: { transformedSrc: 'assets/IMG_0740.jpg' } }] }
    },
    {
      title: 'Rose Noir',
      description: 'A citrus, woody, herbaceous duo to cleanse and hydrate',
      size: '2 fl oz',
      priceRange: { minVariantPrice: { amount: '195.00', currencyCode: 'GBP' } },
      images: { edges: [{ node: { transformedSrc: 'assets/IMG_0741.jpg' } }] }
    }
  ];

  container.innerHTML = mockNewArrivals.map(p => createProductCardHTML(p)).join('');
}

function initFooterReveal() {
  const mainContent = document.getElementById('main-content');
  const footer = document.querySelector('main-footer');

  if (!mainContent || !footer) return;

  const updateMargin = () => {
    if (window.innerWidth <= 640) {
      mainContent.style.marginBottom = '0px';
    } else {
      const footerHeight = footer.offsetHeight;
      mainContent.style.marginBottom = `${footerHeight}px`;
    }
  };

  // Run on load after a small delay to ensure rendering is complete
  setTimeout(updateMargin, 100);

  // Update on resize
  window.addEventListener('resize', updateMargin);
}

async function fetchGiftDiscount() {
  const pill = document.getElementById('gift-discount-pill');
  if (!pill) return;

  try {
    const response = await fetch(`https://YOUR_STORE.myshopify.com/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: { 'X-Shopify-Storefront-Access-Token': 'YOUR_TOKEN', 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: `{ collections(first: 1, query: "title:Gifts") { edges { node { products(first: 1) { edges { node { variants(first: 1) { edges { node { price { amount } compareAtPrice { amount } } } } } } } } } } }` })
    });
    const { data } = await response.json();
    const v = data.collections.edges[0]?.node.products.edges[0]?.node.variants.edges[0]?.node;
    if (v?.compareAtPrice) {
      const discount = Math.round(((v.compareAtPrice.amount - v.price.amount) / v.compareAtPrice.amount) * 100);
      pill.textContent = `${discount}% OFF GIFT SETS`;
    }
  } catch (e) {
    console.warn('Check Shopify Config');
  }
}

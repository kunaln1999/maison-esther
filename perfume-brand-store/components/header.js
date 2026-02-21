class MainHeader extends HTMLElement {
    constructor() {
        super();
        this.isSearchOpen = false;
        this.isMenuOpen = false;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const searchTrigger = this.querySelector('.search-trigger');
        const searchClose = this.querySelector('.search-close');
        const menuTrigger = this.querySelector('.menu-trigger');
        const menuClose = this.querySelector('.menu-close');
        const menuOverlay = this.querySelector('.menu-overlay');

        if (searchTrigger) {
            searchTrigger.addEventListener('click', () => this.toggleSearch(true));
        }

        if (searchClose) {
            searchClose.addEventListener('click', () => this.toggleSearch(false));
        }

        if (menuTrigger) {
            menuTrigger.addEventListener('click', () => this.toggleMenu(true));
        }

        if (menuClose) {
            menuClose.addEventListener('click', () => this.toggleMenu(false));
        }

        if (menuOverlay) {
            menuOverlay.addEventListener('click', () => this.toggleMenu(false));
        }

        // Handle Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.isSearchOpen) this.toggleSearch(false);
                if (this.isMenuOpen) this.toggleMenu(false);
            }
        });
    }

    toggleMenu(open) {
        this.isMenuOpen = open;
        const menu = this.querySelector('.mobile-menu');
        const overlay = this.querySelector('.menu-overlay');
        const body = document.body;

        if (open) {
            menu.classList.add('active');
            overlay.classList.add('active');
            body.style.overflow = 'hidden';
        } else {
            menu.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        }
    }

    toggleSearch(open) {
        this.isSearchOpen = open;
        const headerBottom = this.querySelector('.header-bottom');
        if (open) {
            headerBottom.classList.add('search-mode');
            const input = this.querySelector('.search-input');
            if (input) setTimeout(() => input.focus(), 100);
        } else {
            headerBottom.classList.remove('search-mode');
        }
    }

    render() {
        this.innerHTML = `
            <header>
                <div class="header-top">
                    <button class="icon-btn menu-trigger mobile-only" aria-label="Open menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </button>
                    
                    <div class="logo">MAISON ESTHER</div>
                    
                    <div class="actions">
                        <button class="icon-btn search-trigger" aria-label="Open search">
                            <svg width="22" height="22" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.5 23.5L16.1348 16.1348M16.1348 16.1348C17.8863 14.6673 19 12.4637 19 10C19 5.58172 15.4183 2 11 2C6.58172 2 3 5.58172 3 10C3 14.4183 6.58172 18 11 18C12.9545 18 14.7454 17.2991 16.1348 16.1348Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <button class="icon-btn cart-trigger">
                            <svg width="22" height="22" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 13V8.5C7 5.18629 9.68629 2.5 13 2.5C16.3137 2.5 19 5.18629 19 8.5V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M2.65909 21.3523L3.4314 10.9261C3.47008 10.4039 3.90504 10 4.42867 10H21.5713C22.095 10 22.5299 10.4039 22.5686 10.9261L23.3409 21.3523C23.4268 22.5119 22.5091 23.5 21.3464 23.5H4.65363C3.49086 23.5 2.5732 22.5119 2.65909 21.3523Z" stroke="currentColor" stroke-width="1.5"/>
                            </svg>
                        </button>
                        <button class="icon-btn account-trigger desktop-only">
                            <svg width="22" height="22" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_110_1740)">
                                    <path d="M13 16.25C8.29485 16.25 5.01336 18.0003 2.89303 19.7797C1.17804 21.219 2.40159 23.49 4.64049 23.49H21.3595C23.5984 23.49 24.822 21.219 23.107 19.7797C20.9866 18.0003 17.7052 16.25 13 16.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <circle cx="13" cy="7.5" r="5" stroke="currentColor" stroke-width="1.5"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_110_1740">
                                        <rect width="26" height="26" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="header-bottom">
                    <nav class="nav-links">
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#fragrance">Fragrance</a></li>
                            <li><a href="#collection">Collection</a></li>
                            <li><a href="#new-notable">New & Notable</a></li>
                            <li><a href="#about">About</a></li>
                        </ul>
                    </nav>
                    <div class="search-container">
                        <div class="search-inner">
                            <div class="search-spacer" style="width: 20px;"></div>
                            <input type="text" placeholder="SEARCH OUR COLLECTIONS..." class="search-input">
                            <button class="icon-btn search-close" aria-label="Close search">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="menu-overlay"></div>
                <div class="mobile-menu">
                    <div class="menu-header">
                        <button class="icon-btn menu-close" aria-label="Close menu">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <nav class="mobile-nav">
                        <ul>
                            <li><a href="#home">Home <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.5;"><polyline points="9 18 15 12 9 6"></polyline></svg></a></li>
                            <li><a href="#fragrance">Fragrance <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.5;"><polyline points="9 18 15 12 9 6"></polyline></svg></a></li>
                            <li><a href="#collection">Collection <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.5;"><polyline points="9 18 15 12 9 6"></polyline></svg></a></li>
                            <li><a href="#new-notable">New & Notable <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.5;"><polyline points="9 18 15 12 9 6"></polyline></svg></a></li>
                            <li><a href="#about">About <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.5;"><polyline points="9 18 15 12 9 6"></polyline></svg></a></li>
                        </ul>
                    </nav>
                    <div class="menu-footer">
                        <button class="profile-btn account-trigger">
                            <div style="display:flex; align-items:center; gap:12px;">
                                <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 16.25C8.29485 16.25 5.01336 18.0003 2.89303 19.7797C1.17804 21.219 2.40159 23.49 4.64049 23.49H21.3595C23.5984 23.49 24.822 21.219 23.107 19.7797C20.9866 18.0003 17.7052 16.25 13 16.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <circle cx="13" cy="7.5" r="5" stroke="currentColor" stroke-width="1.5"/>
                                </svg>
                                <span>Profile</span>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left:auto; opacity:0.5;"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    </div>
                </div>
            </header>
        `;
    }
}

customElements.define('main-header', MainHeader);

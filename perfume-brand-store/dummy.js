// Minimal script for dummy interactions
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-add-cart');
    if (btn) {
        btn.classList.add('loading');
        btn.innerHTML = `<span class="spinner"></span> Adding...`;
        setTimeout(() => {
            btn.classList.remove('loading');
            btn.innerHTML = `Added to bag`;
            setTimeout(() => btn.innerHTML = `Add to bag`, 2000);
        }, 1500);
    }
});

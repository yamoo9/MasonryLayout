import { masonryLayout } from './layout.masonry.js';

function init() {
  document.documentElement.classList.add('js');
  handleMasonryLayout();
}

function handleMasonryLayout() {
  masonryLayout({
    container: '.masonry__container',
    item: '.masonry__item',
  });
}

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('resize', handleMasonryLayout);

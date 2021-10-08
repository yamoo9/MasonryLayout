import { masonryLayout, getStyle } from './layout.masonry.js';

let previousColumnRatio = null;

function handleMasonryLayout() {
  let currentColumnRatio = getStyle(document.documentElement, '--column-ratio');

  if (previousColumnRatio !== currentColumnRatio) {
    masonryLayout({
      container: '.masonry__container',
      item: '.masonry__item',
    });
    previousColumnRatio = currentColumnRatio;
  }
}

window.addEventListener('DOMContentLoaded', handleMasonryLayout);
window.addEventListener('resize', handleMasonryLayout);

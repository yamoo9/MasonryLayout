export function masonryLayout({ container, item }) {
  const containerNode = document.querySelector(container);
  const itemArray = Array.from(containerNode.querySelectorAll(item));

  let autoRows = convertFloat(getStyle(containerNode, 'grid-auto-rows'));
  let columnGap = convertFloat(getStyle(containerNode, 'column-gap'));
  let columnGapRatio = columnGap / autoRows;

  itemArray.forEach((itemNode) => {
    let itemHeightRatio = calcLayoutBox(itemNode).height / autoRows;
    let gridRowEndValue = Math.ceil(itemHeightRatio + columnGapRatio);
    itemNode.style.gridRowEnd = `span ${gridRowEndValue}`;
  });

  containerNode.style.opacity = 1;
}

export function calcLayoutBox(node) {
  return node.getBoundingClientRect();
}

export function getStyle(node, prop) {
  return window.getComputedStyle(node, null).getPropertyValue(prop);
}

export function convertFloat(value) {
  return window.parseFloat(value, 10);
}

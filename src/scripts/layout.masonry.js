export function masonryLayout({
  container: containerSelector,
  item: itemSelector,
}) {
  if (!containerSelector || !itemSelector) {
    throw new Error('container, item 클래스 이름 설정이 필요합니다.');
  }

  const containerNode = document.querySelector(containerSelector);
  const itemNodeList = containerNode.querySelectorAll(itemSelector);
  const firstItemNode = itemNodeList[0];

  let delayTime = 0;

  if (containerNode.style.height) {
    reset(containerNode, itemNodeList);
    delayTime = 450;
  }

  const clear = delay(() => {
    let parentWidth = calcLayoutBox(firstItemNode.parentNode).width;
    let itemWidth =
      calcLayoutBox(firstItemNode).width + calcMargin(firstItemNode, 'x');
    let columnCount = Math.round(1 / (itemWidth / parentWidth));

    const itemArray = Array.from(itemNodeList);
    const trackHeights = {};

    itemArray.forEach((item, index, array) => {
      let columnIndex = index % columnCount;

      if (!trackHeights[columnIndex]) {
        trackHeights[index] = 0;
      }

      trackHeights[columnIndex] +=
        calcLayoutBox(item).height +
        convertFloat(getStyle(item, 'margin-bottom'));

      // 첫 행의 컬럼을 제외한 나머지 컬럼에 적용
      if (index - columnCount >= 0) {
        // top 위치를 조정할 아이템의 위에 배치 된 아이템
        const aboveItem = document.querySelector(
          `${itemSelector}:nth-child(${index - columnCount + 1})`
        );
        // 위에 배치된 각 아이템의 박스 레이아웃 하단 위치 값
        let bottomPosY = calcLayoutBox(aboveItem).bottom;
        // top 위치를 조정할 아이템의 현재 레이아웃 top 위치 - 마진 하단 공간
        let topPosY =
          calcLayoutBox(item).top -
          convertFloat(getStyle(item, 'margin-bottom'));
        // top 위치를 조정할 아이템의 top 위치 값 설정
        item.style.top = `-${topPosY - bottomPosY}px`;
      }
    });

    // 아이템의 top 위치 후, container 요소 하단에 남은 공간이 없도록 설정
    let maxHeight = Math.max(...Object.values(trackHeights));
    containerNode.style.height = `${maxHeight}px`;

    clear();
  }, delayTime);
}

function reset(containerNode, itemNodeList) {
  containerNode.style.removeProperty('height');
  Array.from(itemNodeList).forEach((node) => node.style.removeProperty('top'));
}

function delay(callback, time = 1000) {
  const clearId = window.setTimeout(callback, time);
  return () => window.clearTimeout(clearId);
}

export function calcLayoutBox(node) {
  return node.getBoundingClientRect();
}

export function calcMargin(node, axis) {
  if (axis === 'x') {
    return (
      convertFloat(getStyle(node, 'margin-left')) +
      convertFloat(getStyle(node, 'margin-right'))
    );
  }
  if (axis === 'y') {
    return (
      convertFloat(getStyle(node, 'margin-top')) +
      convertFloat(getStyle(node, 'margin-bottom'))
    );
  }
  return convertFloat(getStyle(node, 'margin'));
}

export function getStyle(node, prop) {
  return window.getComputedStyle(node, null).getPropertyValue(prop);
}

export function convertFloat(value) {
  return window.parseFloat(value, 10);
}

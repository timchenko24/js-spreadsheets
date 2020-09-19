import {$} from '@core/DOM';

export function resizeHandler($root, event) {
  const $resizeNode = $(event.target);
  const $parent = $resizeNode.closest('[data-type="resizable"]');
  const coordinates = $parent.getCoordinates();
  const type = $resizeNode.dataset.resize;
  const sideProp = type === 'col' ? 'bottom' : 'right';
  $resizeNode.css({
    opacity: 1,
    [sideProp]: '-5000px',
  });
  let value;
  const cells = $root
      .findAll(`[data-column="${$parent.dataset.column}"]`);

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coordinates.right;
      value = coordinates.width + delta;
      $resizeNode.css({right: -delta + 'px'});
    } else {
      const delta = e.pageY - coordinates.bottom;
      value = coordinates.height + delta;
      $resizeNode.css({bottom: -delta + 'px'});
    }
  };

  document.onmouseup = (e) => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (type === 'col') {
      $parent.css({width: value + 'px'});
      cells.forEach((elem) => {
        elem.style.width = value + 'px';
      });
    } else {
      $parent.css({height: value + 'px'});
    }

    $resizeNode.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    });
  };
}

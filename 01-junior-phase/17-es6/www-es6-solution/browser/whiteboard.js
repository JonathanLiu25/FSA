// this is global now
window.whiteboard = new window.EventEmitter();

(() => {
  // Ultimately, the color of our stroke;
  let color;

  // The color selection elements on the DOM.
  const colorElements = [...document.querySelectorAll('.marker')];

  colorElements.forEach(el => {
      // Set the background color of this element
      // to its id (purple, red, blue, etc).
      el.style.backgroundColor = el.id;

      // Attach a click handler that will set our color variable to
      // the elements id, remove the selected class from all colors,
      // and then add the selected class to the clicked color.
      el.addEventListener('click', e => {
        color = e.target.id;
        document.querySelector('.selected').classList.remove('selected');
        e.target.classList.add('selected');
      });
  });

  const canvas = document.querySelector('#paint');
  const sketch = document.querySelector('#sketch');
  const sketchStyle = getComputedStyle(sketch);

  canvas.width = parseInt(sketchStyle.getPropertyValue('width'));
  canvas.height = parseInt(sketchStyle.getPropertyValue('height'));

  const ctx = canvas.getContext('2d');

  ctx.lineWidth = 5;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  const currentMousePosition = {
    x: 0,
    y: 0
  };

  const lastMousePosition = {
    x: 0,
    y: 0
  };

  let drawing = false;

  canvas.addEventListener('mousedown', e => {
    drawing = true;
    currentMousePosition.x = e.pageX - e.target.offsetLeft;
    currentMousePosition.y = e.pageY - e.target.offsetTop;
  });

  canvas.addEventListener('mouseup', () => drawing = false);

  canvas.addEventListener('mousemove', e => {
    if (!drawing) return;

    lastMousePosition.x = currentMousePosition.x;
    lastMousePosition.y = currentMousePosition.y;

    currentMousePosition.x = e.pageX - e.target.offsetLeft;
    currentMousePosition.y = e.pageY - e.target.offsetTop;

    whiteboard.draw(lastMousePosition, currentMousePosition, color, true);
  });

  whiteboard.draw = (start, end, strokeColor = 'black', shouldBroadcast) => {
    // Draw the line between the start and end positions
    // that is colored with the given color.
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.closePath();
    ctx.stroke();

    // If shouldBroadcast is truthy, we will emit a draw event to listeners
    // with the start, end and color data.
    if (shouldBroadcast) {
      // this event we emit is caught by the whiteboard object in app.js
      whiteboard.emit('draw', start, end, strokeColor);
    }  
  };
})();
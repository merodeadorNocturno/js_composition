const getTimeStep = () => 1000 / 60;

const hasColor = (state) => ({
  setColor: function setColor(color) {
    this.color = color;
  }.bind(state)
});

const hasPosition = (state) => ({
  setPosition: function setPosition(x, y) {
    this.x = x;
    this.y = y;
  }.bind(state)
});

const hasVelocity = (state) => ({
  setVelocity: function setVelocity(vx = state.vx, vy = state.vy) {
    this.vx = vx;
    this.vy = vy;
  }.bind(state)
});

const hasEqualSides = (state) => ({
  setSideSize: function setSideSize(side) {
    this.side = side;
  }.bind(state)
});

const hasLimit = (state) => ({
  setLimit: function setLimit(xLimit, yLimit) {
    this.xLimit = xLimit;
    this.yLimit = yLimit;
  }.bind(state)
});

const hasContainer = (state) => ({
  setContainer: function setContainer(container) {
    this.container = container;
  }.bind(state)
});

const hasDelta = (state) => ({
  setDelta: function setDelta(delta) {
    this.delta = delta;
  }.bind(state)
});

const isStringifyable = (state) => ({
  toString: function toString() {
    let txt = '\n';
    for (let i in this) {
      if (this.hasOwnProperty(i) && typeof this[i] !== 'function') {
        txt += `\t${i}: ${this[i]}\n`;
      }
    }
    return `${txt}\n`;
  }.bind(state)
});

const isUpdateable = (state) => ({
  update: function update() {
    const xPos = state.vx * state.delta + state.x;
    const yPos = state.vy * state.delta + state.y;
    state.setPosition(xPos, yPos);
    if (state.x >= state.xLimit || state.x <= 0) {
      state.setVelocity(-state.vx, state.vy);
    }
    if (state.y >= state.yLimit || state.y <= 0) {
      state.setVelocity(state.vx, -state.vy);
    }
  }.bind(state)
});

const isDrawableInCanvas = (state) => ({
  drawInCanvas: function drawInCanvas() {
    const canvas = document.getElementById(state.container);
    const context = canvas.getContext('2d');
    context.fillStyle = state.color;
    context.fillRect(state.x, state.y, state.side, state.side);
  }.bind(state)
});

const isHiddeable = (state) => ({
  hide: function hide(hidden) {
    this.hidden = hidden;
  }.bind(state)
});

const createShape = (x, y, container = 'box1', color = 'gray', h = false) => {
  const shape = {};
  Object.assign(
    shape,
    hasPosition(shape),
    hasContainer(shape),
    hasColor(shape),
    hasVelocity(shape),
    hasLimit(shape),
    hasDelta(shape),
    isStringifyable(shape),
    isHiddeable(shape)
  );
  shape.setPosition(x, y);
  shape.setColor(color);
  shape.setContainer(container);
  shape.hide(h);
  return shape;
};

const createBox = (shape, s, vx = 0.08, vy = 0.06, lx = 500, ly = 200, d = 0) => {
  const box = shape;
  Object.assign(
    box,
    hasEqualSides(box),
    isUpdateable(box),
    isDrawableInCanvas(box),
    isStringifyable(box)
  );
  box.setSideSize(s);
  box.setVelocity(vx, vy);
  box.setLimit(lx, ly);
  box.setDelta(d);
  return box;
};

const canvasShape = createShape(250, 70, 'myCanvas', 'green');
const canvasBox = createBox(canvasShape, 50, 0.098, 0.115, 450, 200);

const shape2 = createShape(125, 35, 'myCanvas', 'blue');
const box2 = createBox(shape2, 50, -0.09, 0.12, 450, 200);

let lastFrameTimeMs = 0;
let delta = 0;
const myCanvas = document.getElementById('myCanvas').getContext('2d');
const mainLoop = (timestamp) => {
  const maxFPS = 60;
  
  if (timestamp < lastFrameTimeMs + 1000 / maxFPS) {
    requestAnimationFrame(mainLoop);
    return;
  }
  delta += timestamp - lastFrameTimeMs;
  lastFrameTimeMs = timestamp;

  while (delta >= getTimeStep()) {
    canvasBox.setDelta(getTimeStep());
    canvasBox.update();
    box2.setDelta(getTimeStep());
    box2.update();
    delta -= getTimeStep();
  }
  myCanvas.clearRect(0, 0, 500, 250);
  box2.drawInCanvas();
  canvasBox.drawInCanvas();
  requestAnimationFrame(mainLoop);
};

requestAnimationFrame(mainLoop);
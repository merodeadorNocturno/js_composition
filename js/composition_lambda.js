import { returnsCanvasById, animateShape, createCircle, createSquare } from './composition_functions';

const square = createSquare();

const movingSquare = animateShape(square);
const movingSquare2 = animateShape(square, 0.05, 0.15);
movingSquare2.color = 'blue';

const movingSquare3 = animateShape(square, 0.08, 0.07);
movingSquare3.color = 'maroon';

const circle = createCircle(68, 90, 25, 'orange');
const movingCircle = animateShape(circle, 0.15, 0.069);


/* game constants */
const getMaxFPS = () => 60;
const getTimeStep = () => 1000 / getMaxFPS();
let delta = 0;
let lastFrameTimeMs = 0;

const gameLoop = (timestamp) => {
    if (timestamp < lastFrameTimeMs + getTimeStep()) {
        requestAnimationFrame(gameLoop);
        return;
    }

    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;

    while (delta >= getTimeStep()) {
        movingSquare.setDeltaTime(getTimeStep());
        movingSquare.updateState();
        movingSquare2.setDeltaTime(getTimeStep());
        movingSquare2.updateState();
        movingSquare3.setDeltaTime(getTimeStep());
        movingSquare3.updateState();
        movingCircle.setDeltaTime(getTimeStep());
        movingCircle.updateState();
        delta -= getTimeStep();
    }

    returnsCanvasById('myCanvas').clearRect(0, 0, 500, 250);
    movingSquare.draw();
    movingSquare2.draw();
    movingSquare3.draw();
    movingCircle.draw();
    requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
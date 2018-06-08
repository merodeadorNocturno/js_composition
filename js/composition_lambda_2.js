import { returnsCanvasById, animateShape, createCircle, createSquare } from './composition_functions';

const createAllColors = () => [
    "AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"
];

const getRandomPoint = (point = 1) => Math.random() * point;

const createBallsFromColors = (colors = []) => {
    const xPoint = getRandomPoint(500);
    const yPoint = getRandomPoint(250);
    const protoCircle = createCircle(xPoint, yPoint, 10, "black");
    return colors.map(color => {
        const myShape = animateShape(protoCircle, getRandomPoint(0.2), getRandomPoint(0.5));
        myShape.color = color;
        return myShape;
    });
};

const theseBalls = createBallsFromColors(createAllColors());

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

        theseBalls.map(ball => {
            ball.setDeltaTime(getTimeStep());
            ball.updateState();
            return null;
        });

        delta -= getTimeStep();
    }
    returnsCanvasById('myCanvas').clearRect(0, 0, 500, 250);
    theseBalls.map(ball => ball.draw());

    requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
const canSetColor = (state) => ({
    setColor: (color) => {
        state.color = color;
    }
});

const canMove = (state) => ({
    move: (x, y) => {
        state.x = x;
        state.y = y;
    }
});

const canSpeed = (state) => ({
    setVelocity: (vx, vy) => {
        state.vx = vx;
        state.vy = vy;
    }
});

const hasSquareShape = (state) => ({
    setSideSize: (side) => {
        state.side = side;
    }
});

const canStopAtBoundaries = (state) => ({
    setLimit: (xLimit, yLimit) => {
        state.xLimit = xLimit;
        state.yLimit = yLimit;
    }
});

const hasCanvasContainer = (state) => ({
    setCanvasContainer: (canvasContainer) => {
        state.canvasContainer = canvasContainer;
    }
});

const hasDeltaTime = (state) => ({
    setDeltaTime: (deltaTime) => {
        state.deltaTime = deltaTime;
    }
});

const canUpdatePosition = (state) => ({
    updateState: () => {
        const x = state.vx * state.deltaTime + state.x;
        const y = state.vy * state.deltaTime + state.y;
        state.move(x, y);

        if (state.x >= state.xLimit || state.x <= 0) {
            state.setVelocity(-state.vx, state.vy);
        }
        if (state.y >= state.yLimit || state.y <= 0) {
            state.setVelocity(state.vx, -state.vy);
        }
    }
});

const returnsCanvasById = (canvasContainer) => document.getElementById(canvasContainer).getContext('2d');

const definesShape = (state) => ({
    defineSquare: () => {
        const canvasContext = returnsCanvasById(state.canvasContainer);
        canvasContext.fillStyle = state.color;
        canvasContext.fillRect(state.x, state.y, state.side, state.side);
    },
    defineCircle: () => {
        const canvasContext = returnsCanvasById(state.canvasContainer);
        canvasContext.fillStyle = state.color;
        canvasContext.beginPath();
        canvasContext.arc(state.x, state.y, state.side / 2, 0, 2 * Math.PI);
        canvasContext.stroke();
        canvasContext.fill();
    }
});

const hasShape = (state) => ({
    setShape: (shape) => {
        state.shape = shape;
    }
});

const canBeDrawn = (state) => ({
    draw: () => {
        const typesOfShape = {
            square: state.defineSquare,
            circle: state.defineCircle,
        };
        typesOfShape[state.shape]();
    }
});

const canBeHidden = (state) => ({
    hide: (hidden) => {
        state.hidden = hidden;
    }
});

const isStringifyable = (state) => ({
    toString: () => {
        const map = new Map();
        const stateKeys = Object.keys(state)
            .filter(key => typeof state[key] !== 'function');
        stateKeys.forEach(key => {
            map.set(key, state[key]);
        });

        return map.entries();
    }
});

const createSquare = (x = 10, y = 20, side = 50, color = 'red') => {
    const state = {
        x,
        y,
        side,
        color,
        shape: 'square',
    };

    return Object.assign(
        state,
        isStringifyable(state),
        canSetColor(state)
    );
};

const createCircle = (x, y, radius, color) => {
    const state = {
        x,
        y,
        side: radius,
        color,
        shape: 'circle',
    };

    return Object.assign(
        state,
        isStringifyable(state),
        canSetColor(state)
    );
};

const animateShape = (shape, vx = 0.1, vy = 0.09, xLimit = 450, yLimit = 200, deltaTime = 0, canvasContainer = 'myCanvas') => {
    const state = {
        vx,
        vy,
        xLimit,
        yLimit,
        deltaTime,
        canvasContainer
    };

    return Object.assign(
        state,
        shape,
        definesShape(state),
        hasShape(state),
        canMove(state),
        canSpeed(state),
        canStopAtBoundaries(state),
        hasCanvasContainer(state),
        hasDeltaTime(state),
        canUpdatePosition(state),
        canBeDrawn(state)
    );
};

const createAllColors = () => [
    "AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"
];

const getRandomPoint = (point = 1) => Math.random() * point;

const createBallsFromColors = (colors = []) => {
    xPoint = getRandomPoint(500);
    yPoint = getRandomPoint(250);
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
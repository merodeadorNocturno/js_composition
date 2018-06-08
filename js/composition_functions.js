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

export const returnsCanvasById = (canvasContainer) => document.getElementById(canvasContainer).getContext('2d');

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

export const createSquare = (x = 10, y = 20, side = 50, color = 'red') => {
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

export const createCircle = (x, y, radius, color) => {
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

export const animateShape = (shape, vx = 0.1, vy = 0.09, xLimit = 450, yLimit = 200, deltaTime = 0, canvasContainer = 'myCanvas') => {
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

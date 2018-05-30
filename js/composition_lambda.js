const getTimeStep = () => 1000 / 60;

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
    setVelocity: (vx = state.vx, vy = state.vy) => {
        state.vx = vx;
        state.vy = vy;
    }
});


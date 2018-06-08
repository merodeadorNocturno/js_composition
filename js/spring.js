const hasMass = (state) => ({
  setMass: (mass) => {
    state.mass = mass;
  }
});

const hasElasticConstant = (state) => ({
  setK: (K) => {
    state.K = K;
  }
});

const canDamp = (state) => ({
  setDamp: (D) => {
    state.D = D;
  }
});

const hasRestPosition = (state) => ({
  setRestPosition: (restPosition) => {
    state.restPosition = restPosition;
  }
});

const canSpeed = (state) => ({
  setSpeed: (speed) => {
    state.speed = speed;
  }
});

const canAccelerate = (state) => ({
  accelerate: (acceleration) => {
    state.acceleration = acceleration;
  }
});

const hasForce = (state) => ({
  setForce: (force) => {
    state.force = force;
  }
});

const canStretch = (state) => ({
  stretch: () => {
    
  }
});
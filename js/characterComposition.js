const canCast = (state) => ({
  cast: (spell) => {
    console.log(`${state.name} casts ${spell}!`);
    state.mana--;
  }
});

const canFight = (state) => ({
  fight: () => {
    console.log(`${state.name} slashes at the foe!`);
    state.stamina--;
  }
});

const knight = (name) => {
  const state = {
    name,
    health: 100,
    stamina: 100
  };

  return Object.assign(state, canFight(state));
};

const mage = (name) => {
  const state = {
    name,
    health: 100,
    mana: 100
  };

  return Object.assign(state, canCast(state));
};

const scorcher = mage('Gandalf')
scorcher.cast('fireball'); // Scorcher casts fireball!
console.log(scorcher.mana) // 99

const slasher = knight('Lancelot')
slasher.fight(); // Slasher slashes at the foe!
console.log(slasher.stamina) // 99

const elf = (name) => {
  const state = {
    name,
    health: 75,
    mana: 110,
    stamina: 100
  };

  return Object.assign(state, canCast(state), canFight(state));
};

const legolas = elf('Legolas');
legolas.fight();
legolas.cast('ice rain');
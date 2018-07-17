class Character {
  constructor(name) {
    this.name = name;
    this.health = 100;
  }
}

class Knight extends Character {
  constructor(name) {
    super(name);
    this.stamina = 100;
  }

  fight() {
    console.log(`${this.name} takes a mighty swing!`);
    this.stamina--;
  }
}

class Mage extends Character {
  constructor(name) {
    super(name);
    this.mana = 100;
  }

  castSpell() {
    console.log(`${this.name} casts a fireball!`);
    this.mana--;
  }
}

const zapper = new Mage('Gandalf');
const thumper = new Knight('Lancelot');

zapper.castSpell();
thumper.fight();
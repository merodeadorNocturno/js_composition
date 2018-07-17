const chocolate = {
  hasChocolate: () => true
};

const caramelSwirl = {
  hasCaramelSwirl: () => true
};

const pecans = {
  hasPecans: () => true
};

const iceCream = {...chocolate, ...caramelSwirl, ...pecans};
console.log(`
    hasChocolate: ${ iceCream.hasChocolate() }
    hasCaramelSwirl: ${ iceCream.hasCaramelSwirl() }
    hasPecans: ${ iceCream.hasPecans() }
  `);
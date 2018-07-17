# js_composition
An animated demonstration of js composition.

## Useful links
[Lambda Calculus](https://plato.stanford.edu/entries/lambda-calculus/)

[Variadic Currying JS](http://extralogical.net/articles/currying-javascript.html)

[Functional Programming JS](https://www.youtube.com/watch?reload=9&v=qtsbZarFzm8)

[Pure Functions](http://www.nicoespeon.com/en/2015/01/pure-functions-javascript/)

[Factory Pattern](https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1)

[Factory 2](https://www.youtube.com/watch?v=wfMtDGfHWpA)

[Composition vs Inheritance](https://www.youtube.com/watch?v=dYUZiJEy0JE)

[Video game design patterns](http://gameprogrammingpatterns.com/contents.html)

[Game programers in JS](https://www.youtube.com/watch?v=avwDj3KRuLc)

[GameLoop with Javascript](https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing)

[Physics Simulations with Javascript](https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations)


## Composition solves

* The tight coupling problem: Because child classes are dependent on the implementation of the parent class, class inheritance is the tightest coupling available in object oriented design.
* The fragile base class problem: Due to tight coupling, changes to the base class can potentially break a large number of descendant classes — potentially in code managed by third parties. The author could break code they’re not aware of.
* The inflexible hierarchy problem: With single ancestor taxonomies, given enough time and evolution, all class taxonomies are eventually wrong for new use-cases.
* The duplication by necessity problem: Due to inflexible hierarchies, new use cases are often implemented by duplication, rather than extension, leading to similar classes which are unexpectedly divergent. Once duplication sets in, it’s not obvious which class new classes should descend from, or why.
* The gorilla/banana problem: “…the problem with object-oriented languages is they’ve got all this implicit environment that they carry around with them. You wanted a banana but what you got was a gorilla holding the banana and the entire jungle.” ~ Joe Armstrong, “Coders at Work”
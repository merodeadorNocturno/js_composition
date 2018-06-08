// Adapted from Dan Shiffman, natureofcode.com
const Spring = (x, y, restLength, K) => {
  const state = {
    anchor: [x, y],
    restLength,
    K,
  };

  return Object.assign({}, state);
};


var Springa = function(x, y, l) {
  this.anchor = new PVector(x, y);
  this.restLength = l;
  this.k = 0.2;
};

// Calculate and apply spring force
Spring.prototype.connect = function(b) {
  // Vector pointing from anchor to bob location
  let force = PVector.sub(b.position, this.anchor);
  // What is distance
  let d = force.mag();
  // Stretch is difference between current distance and rest length
  let stretch = d - this.restLength;

  // Calculate force according to Hooke's Law
  // F = k * stretch
  force.normalize();
  force.mult(-1 * this.k * stretch);
  b.applyForce(force);
};

// Constrain the distance between bob and anchor between min and max
Spring.prototype.constrainLength = function(b, minLength, maxLength) {
  let dir = PVector.sub(b.position, this.anchor);
  let d = dir.mag();
  // Is it too short?
  if (d < minLength) {
    dir.normalize();
    dir.mult(minLength);
    // Reset location and stop from moving (not realistic physics)
    b.position = PVector.add(this.anchor, dir);
    b.velocity.mult(0);
    // Is it too long?
  } else if (d > maxLength) {
    dir.normalize();
    dir.mult(maxLength);
    // Reset location and stop from moving (not realistic physics)
    b.position = PVector.add(this.anchor, dir);
    b.velocity.mult(0);
  }
};

Spring.prototype.display = function() {
  stroke(0);
  fill(175);
  strokeWeight(2);
  rectMode(CENTER);
  rect(this.anchor.x, this.anchor.y, 10, 10);
};

Spring.prototype.displayLine = function(b) {
  strokeWeight(2);
  stroke(0);
  line(b.position.x, b.position.y, this.anchor.x, this.anchor.y);
};

// Bob object, just like our regular Mover (location, velocity, acceleration, mass)

var Bob = function(x, y) {
  this.position = new PVector(x, y);
  this.velocity = new PVector();
  this.acceleration = new PVector();
  this.mass = 24;
  // Arbitrary damping to simulate friction / drag
  this.damping = 0.98;
  // For user interaction
  this.dragOffset = new PVector();
  this.dragging = false;
};

// Standard Euler integration
Bob.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.velocity.mult(this.damping);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
};

// Newton's law: F = M * A
Bob.prototype.applyForce = function(force) {
  let f = force.get();
  f.div(this.mass);
  this.acceleration.add(f);
};

// Draw the bob
Bob.prototype.display = function() {
  stroke(0);
  strokeWeight(2);
  fill(175);
  if (this.dragging) {
    fill(50);
  }
  ellipse(this.position.x, this.position.y, this.mass * 2, this.mass * 2);
};

Bob.prototype.handleClick = function(mx, my) {
  let d = dist(mx, my, this.position.x, this.position.y);
  if (d < this.mass) {
    this.dragging = true;
    this.dragOffset.x = this.position.x - mx;
    this.dragOffset.y = this.position.y - my;
  }
};

Bob.prototype.stopDragging = function() {
  this.dragging = false;
};

Bob.prototype.handleDrag = function(mx, my) {
  if (this.dragging) {
    this.position.x = mx + this.dragOffset.x;
    this.position.y = my + this.dragOffset.y;
  }
};

// Create objects at starting location
// Note third argument in Spring constructor is "rest length"
var bob = new Bob(width / 2, 100);
var spring = new Spring(width / 2, 10, 100);

var draw = function() {
  background(255);
  // Apply a gravity force to the bob
  let gravity = new PVector(0, 2);
  bob.applyForce(gravity);

  // Connect the bob to the spring (this calculates the force)
  spring.connect(bob);
  // Constrain spring distance between min and max
  spring.constrainLength(bob, 30, 200);

  // Update bob
  bob.update();

  // Draw everything
  spring.displayLine(bob); // Draw a line between spring and bob
  bob.display();
  spring.display();

  fill(0);
  text('click on bob to drag', 10, height - 5);
};

mousePressed = function() {
  bob.handleClick(mouseX, mouseY);
};

mouseDragged = function() {
  bob.handleDrag(mouseX, mouseY);
};

mouseReleased = function() {
  bob.stopDragging();
};
var cars = [];
var simSpeed = 1;
var numOfCars =  300;
var targetX;
var targetY;
var generations = 1;
var dnaLength = 25;
var avgDist = 0;
var ready = false;
var obstacle;
function setup() {
  createCanvas(1440, 810);
  for(var i = 0; i < numOfCars; i++)
    cars.push(new Car());
  
  targetX = -50;
  targetY = -50;
  obstacle = new Obstacle(width / 2 - 10, height / 2 - 200, 10, height / 2 + 20);
}
function mousePressed(){
  targetX = mouseX;
  targetY = mouseY;
  ready = true;
}
function draw() {
  background(51);
  noStroke();
  fill(250, 100, 50);
  circle(targetX, targetY, 15);
  textSize(24);
  fill(255,100);
  text("Generation: ", 20, 40);
  text(generations, 190, 40);
  obstacle.show();

  //waiting for user to place target
  if(ready){
      for(var i = 0; i < cars.length; i++){
      //updating cars
      cars[i].move();
      cars[i].evaluate();
      cars[i].show();
      cars[i].bounce();
      }

    if(cars[0].pos == dnaLength - 1){
      avgDist = avgDistance();
      var temp = nextGen();
      cars = temp;
      if(random(0, 1) <= 0.2) mutate();
      generations++;
    }
  }else{
    textSize(32);
    fill(255, 100);
    text("Please place target...",20 ,height - 40);
  }
  
  textSize(24);
  fill(255,100);
  text("Avg. Distance: ", 20, 80);
  text(round(avgDist), 190, 80);
  stroke(250, 100, 50, 100);
  noFill();
  circle(targetX, targetY, round(avgDist) * 2);
}
//returning average distance away from target for each car
function avgDistance(){
  var result = 0;
  for(var i = 0; i < numOfCars; i++)
    result += (dist(cars[i].position.x, cars[i].position.y, targetX, targetY));
  
  return result / numOfCars;
}
function mutate(){
  console.log("mutation!!");
  cars[random(0, cars.length - 1)] = p5.Vector.random2D();
}
function nextGen(){
  var maxFit = 0;
  var candidates = [];
  var result = [];
  for(var i = 0; i < cars.length; i++){
    if(cars[i].fitness > maxFit)
      maxFit = cars[i].fitness;
  }
  for(var i = 0; i < cars.length; i++){
    cars[i].fitness /= maxFit;
    for(var j = 1; j < (cars[i].fitness * 10); j++)
      candidates.push(cars[i]);
  }
  for(var i = 0; i < numOfCars; i++){
    var p1 = random(candidates);
    var p2 = random(candidates);
    while(p2 == p1) p2 = random(candidates);
    var child = new Car();
    
    var midpoint = random((p1.genes.length / 2) - 5, (p1.genes.length / 2) + 5);
    
    for(var j = 0; j < dnaLength; j++){
      if(j < midpoint)
        child.genes[j] = p1.genes[j];
      else
        child.genes[j] = p2.genes[j];
    }
    result.push(child);
  }
  return result;
}


class Car{
    constructor(){
      this.pos = 0;
      this.genes = [];
      this.position = createVector(100, height / 2);
      this.vel = createVector();
      this.acc = createVector();
      this.fitness = 0;
      this.speed = 0;
      this.goal = false;
      this.collided = false;
      this.angle = 0;
      this.fast = 0;
      for(var i = 0; i < dnaLength; i++){
        this.genes[i] = p5.Vector.random2D();
      }
    }
    bounce(){ //ensuring vehicles do not pass border of the canvas
      if(this.position.x < 0 || this.position.x > width) this.collided = true;
      if(this.position.y < 0 || this.position.y > height) this.collided = true;
    }
    evaluate(){
      var d = dist(this.position.x, this.position.y, targetX, targetY);
      d > 0 ? d = 1 / d : d = 1;
      
      this.fitness = d;
      if(this.x < 0) this.fitness = 0;
      else if(this.collided) this.fitness = 0;
      if(this.fitness != 0 && this.goal) this.fitness += (this.fast / dnaLength) * this.fitness;
        
      return this.fitness;
    }
    move(){
	//checking for collision between car and obstacle object
      if(!this.collided) this.collided = (this.position.x >= obstacle.x && this.position.x < obstacle.x + obstacle.obWidth && this.position.y < obstacle.y + obstacle.obHeight && this.position.y > obstacle.y);
	//if car has not yet reached target
      if(!(dist(this.position.x, this.position.y, targetX, targetY) < 15) && !this.collided){
  
        this.acc.add(this.genes[this.pos]);
        this.vel.add(this.acc);
        this.vel.limit(8);
        this.position.add(this.vel);
        this.acc.mult(0);
      }else if(!this.goal){
        this.goal = true;
        this.fast++; //will be used to reward cars that have reached target quickly
      }
	//allows cars to follow one vector within DNA string for some time before moving to next
      if(this.speed >= 10){
        this.pos++;
        this.speed = 0;
      }
      this.speed++;
    }
    show(){
      if(!this.goal || !this.collided) this.angle = this.vel.heading();
      push();
      translate(this.position.x, this.position.y);
      rectMode(CENTER);
      rotate(this.angle);
      noStroke();
      this.collided || this.goal ? fill(250, 100, 50) : fill(250, 100);
      rect(0, 0, 50, 10);
      pop();
    }
  }

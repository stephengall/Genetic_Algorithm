class Obstacle{
    constructor(x, y, obWidth, obHeight){
      this.x = x;
      this.y = y;
      this.obWidth = obWidth;
      this.obHeight = obHeight;
    }
    show(){
      noStroke();
      fill(250, 0, 250, 100);
      rect(this.x, this.y, this.obWidth, this.obHeight);
    }
  }
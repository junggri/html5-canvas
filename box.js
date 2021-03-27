class Box {
   constructor(index, x, y, speed) {
      this.index = index;
      this.x = x;
      this.y = y;
      this.width = 100;
      this.height = 100;
      this.speed = speed;
      this.draw();
   }

   draw() {

      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(this.x, this.y, 100, 100);
      ctx.fillStyle = "white";
      ctx.fillText(this.index, this.x + 30, this.y + 30);
   }
}

class Panel {
   constructor() {
      this.scale = 0;
      this.angle = 0;

   }

   draw() {
      ctx.fillStyle = "rgba(255,0,0,0.7)";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.translate(oX, oY);
      ctx.scale(this.scale, this.scale);
      ctx.rotate(this.angle);
      ctx.translate(-oX, -oY);
      ctx.fillRect(oX - 150, oY - 150, 300, 300);
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      ctx.fillStyle = "black";

   }
}
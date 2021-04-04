class Gradiant {
   constructor() {
      this.canvas = document.createElement("canvas");
      document.body.append(this.canvas);
      this.ctx = this.canvas.getContext("2d");
      this.canvas.width = document.body.clientWidth;
      this.canvas.height = document.body.clientHeight;
      this.gradient = this.ctx.createRadialGradient(this.canvas.width / 2, this.canvas.height / 2, 10, this.canvas.width / 2, 0, 50);
      this.draw();
   }

   draw() {
      const ctx = this.ctx;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(100, 200);
      ctx.lineTo(540, 200);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(150.5, 150.5);
      ctx.lineTo(540.5, 150.5);
      ctx.stroke();
   }

}

window.onload = () => {
   new Gradiant();
};
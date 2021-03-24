import {Polygon} from "./polygon.js";

class Practice {

   constructor() {
      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d");
      document.body.appendChild(this.canvas);

      window.addEventListener("resize", this.resize.bind(this));


      this.isDown = false;
      this.moveX = 0;
      this.offsetX = 0;
      this.mousePos = {x: 0, y: 0};
      this.side = 3;

      this.box = [];

      this.angle = Math.PI * 2 / this.side;
      this.rotate = 0;

      this.centerX = document.body.clientWidth / 2;
      this.centerY = document.body.clientHeight / 2;

      window.addEventListener("pointerdown", this.onDown.bind(this));
      window.addEventListener("pointermove", this.onMove.bind(this));
      window.addEventListener("pointerup", this.onUp.bind(this));


      window.addEventListener("click", this.click.bind(this));

      window.requestAnimationFrame(this.animate.bind(this));

      this.resize();

   }


   resize() {
      this.stageWidth = document.body.clientWidth;
      this.stageHeight = document.body.clientHeight;

      this.canvas.width = this.stageWidth;
      this.canvas.height = this.stageHeight;
      this.polygon = new Polygon(
         this.centerX,
         this.centerY,
         this.stageHeight / 3,
         this.side
      );
      this.init(this.angle);
   }


   init(angle) {
      for (let i = 0; i < this.side; i++) {
         let y;
         const x = this.stageHeight / 3 * Math.cos(angle * i) + this.centerX;
         let offsetY = this.stageHeight / 3 * Math.sin(angle * i);
         console.log(offsetY, i);
         if (offsetY > 0) {
            y = offsetY - this.centerY;
         } else {
            y = offsetY + this.centerY;
         }
         // console.log(y);

         console.log(i, x, y);
      }
   }


   animate() {
      window.requestAnimationFrame(this.animate.bind(this));
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
      this.moveX *= 0.92;
      this.rotate -= this.moveX * 0.008;
      this.polygon.animate(this.ctx, this.moveX, 100);
   }

   onDown(e) {
      this.isDown = true;
      this.moveX = 0;
      this.offsetX = e.clientX;
   }

   onMove(e) {
      if (this.isDown) {
         this.moveX = this.offsetX - e.clientX;
         this.offsetX = e.clientX;
         // this.init(this.rotate);
      }
   }

   onUp(e) {
      this.isDown = false;
   }

   click(e) {
      console.log(e.clientX, e.clientY);

   }
}

window.onload = () => {
   new Practice();
};

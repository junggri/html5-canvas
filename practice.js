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
      this.rotate = 0;
      this.side = 12;
      this.diagonal = 150;

      this.centerX = 0;
      this.centerY = 0;
      this.radius = 0;
      this.boxRotateRatio = Math.PI * 2 / 5;

      this.selected = null;


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

      this.centerX = document.body.clientWidth / 2;
      this.centerY = document.body.clientHeight / 0.9;
      this.centerY = document.body.clientHeight / 2;
      this.radius = document.body.clientHeight / 3;

      this.polygon = new Polygon(
         this.centerX,
         this.centerY,
         this.diagonal,
         this.radius,
         this.side,
         this.boxRotateRatio
      );
   }

   animate() {
      window.requestAnimationFrame(this.animate.bind(this));
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
      this.moveX *= 0.9;
      this.polygon.animate(this.ctx, this.moveX);
   }

   onDown(e) {
      this.isDown = true;
      this.moveX = 0;
      this.offsetX = Math.atan2(e.clientY - this.centerY, e.clientX - this.centerX);//처음 좌표
   }

   onMove(e) {
      if (this.isDown) {
         this.moveX = this.offsetX - Math.atan2(e.clientY - this.centerY, e.clientX - this.centerX);
         this.offsetX = Math.atan2(e.clientY - this.centerY, e.clientX - this.centerX);
      }
   }

   onUp(e) {
      this.isDown = false;
   }

   click(e) {
      this.selected = null;
      this.mousePos.x = e.layerX - this.centerX;
      this.mousePos.y = e.layerY - this.centerY;

      for (let i = 0; i < this.polygon.coordinate.length; i++) {
         let coordinate = this.polygon.coordinate[i];

         let maxX = Math.max(...coordinate.xArr);
         let minX = Math.min(...coordinate.xArr);
         let maxY = Math.max(...coordinate.yArr);
         let minY = Math.min(...coordinate.yArr);

         if (this.mousePos.x > minX && this.mousePos.x < maxX && this.mousePos.y > minY && this.mousePos.y < maxY) {
            const radius = Math.sqrt((this.mousePos.x - coordinate.centerX) ** 2 + (this.mousePos.y - coordinate.centerY) ** 2);
            const longRad = this.diagonal * Math.cos(this.boxRotateRatio / 2);
            const shortRad = this.diagonal * Math.sin(this.boxRotateRatio / 2);
            if (radius < this.diagonal && radius < shortRad || radius < this.diagonal && radius < longRad) {
               this.selected = coordinate;
            }
         }
      }

      console.log(this.selected);
   }

}

window.onload = () => {
   new Practice();
};

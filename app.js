import {Polygon} from "./polygon.js";

class App {
   constructor() {
      this.canvas = document.createElement("canvas");
      document.body.append(this.canvas);
      this.ctx = this.canvas.getContext("2d");

      this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
      window.addEventListener("resize", this.resize.bind(this), false);
      this.resize();

      this.isDown = false;
      this.moveX = 0;
      this.offsetX = 0;

      document.addEventListener("pointerdown", this.onDown.bind(this));
      document.addEventListener("pointermove", this.onMove.bind(this));
      document.addEventListener("pinterup", this.onUp.bind(this));

      window.requestAnimationFrame(this.animate.bind(this));
   }

   resize() {
      this.stageWidth = document.body.clientWidth;
      this.stageHeigth = document.body.clientHeight;

      this.canvas.width = this.stageWidth * this.pixelRatio;
      this.canvas.height = this.stageHeigth * this.pixelRatio;
      this.ctx.scale(this.pixelRatio, this.pixelRatio);

      this.polygon = new Polygon(this.stageWidth / 2, this.stageHeigth / 2, this.stageHeigth / 3, 3);
   }

   animate() {
      window.requestAnimationFrame(this.animate.bind(this));

      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeigth);

      this.polygon.animate(this.ctx);
   }

   onDown(e) {
      this.isDown = true;
      this.moveX = 0;
      this.offsetX = e.clientX;
   }

   onMove(e) {
      if (this.isDown) {

      }
   }

   onUp(e) {
   }
}

window.onload = () => {
   new App();
};

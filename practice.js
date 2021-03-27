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
      this.sizeX = 280;
      this.sizeY = 180;
      this.box = [];
      this.rotate = 0;


      this.side = 12;

      this.angle = (Math.PI * 2) / this.side;
      this.centerX = document.body.clientWidth / 2;
      this.centerY = document.body.clientHeight / 2;
      this.radius = document.body.clientHeight / 3;


      window.addEventListener("pointerdown", this.onDown.bind(this));
      window.addEventListener("pointermove", this.onMove.bind(this));
      window.addEventListener("pointerup", this.onUp.bind(this));

      window.addEventListener("click", this.click.bind(this));

      this.resize();
      window.requestAnimationFrame(this.animate.bind(this));

   }


   resize() {
      this.stageWidth = document.body.clientWidth;
      this.stageHeight = document.body.clientHeight;

      this.canvas.width = this.stageWidth;
      this.canvas.height = this.stageHeight;

      this.centerX = document.body.clientWidth / 2;
      this.centerY = document.body.clientHeight / 2;

      this.polygon = new Polygon(
         this.centerX,
         this.centerY,
         0,
         0,
         this.radius,
         this.side,
         0
      );


      this.init(this.moveX);

   }

   init(moveX) {
      for (let i = 0; i < this.side; i++) {
         // const x = this.radius * Math.cos(angle * i);
         // const y = this.radius * Math.sin(angle * i);
         const x = this.radius * Math.cos((this.angle * i) + moveX) + this.centerX;
         const y = this.radius * Math.sin((this.angle * i) + moveX) + this.centerY;

         const box = new Polygon(
            this.centerX,
            this.centerY,
            x,
            y,
            this.radius,
            this.side,
            i
         );
         box.draw(this.ctx);
         this.box.push(box);

      }

      // for (let i = 0; i < this.side; i++) {
      //    const angle = Math.PI * 2 / this.side;
      //    const x = this.radius * Math.cos(angle * i);
      //    const y = this.radius * Math.sin(angle * i);

      // const x = (this.radius) * Math.cos((this.angle * i) + moveX) + this.centerX;
      // const y = (this.radius) * Math.sin((this.angle * i) + moveX) + this.centerY;
      //

      // this.box.push({index: i, x, y});
      // }
      // console.log(this.box);
   }

   animate() {
      window.requestAnimationFrame(this.animate.bind(this));
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
      this.moveX *= 0.92;
      this.rotate -= this.moveX * 0.008;
      this.polygon.animate(this.ctx, this.moveX);
   }

   onDown(e) {
      this.isDown = true;
      this.moveX = 0;

      this.offsetX = e.clientX;
   }

   onMove(e) {
      this.box = [];
      if (this.isDown) {
         this.moveX = this.offsetX - e.clientX;
         console.log(this.moveX);
         this.offsetX = e.clientX;
         this.init(this.rotate);
      }
   }

   onUp(e) {
      this.isDown = false;
   }

   click(e) {
      this.mousePos.x = e.layerX;
      this.mousePos.y = e.layerY;


   }
}

window.onload = () => {
   new Practice();
};

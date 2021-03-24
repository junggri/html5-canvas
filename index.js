class Index {
   constructor() {
      this.canvas = document.querySelector("canvas");
      this.ctx = this.canvas.getContext("2d");
      document.body.appendChild(this.canvas);

      // window.addEventListener("resize", this.resize.bind(this), false);
      //
      // this.resize();

      this.img = new Image();
      this.img.src = "https://mdn.mozillademos.org/files/4553/Capitan_Meadows,_Yosemite_National_Park.jpg";
      this.CanvasXSize = 800;
      this.CanvasYSize = 200;
      this.speed = 30;
      this.scale = 1.05;
      this.y = 0;//수직 옵셋?

      this.dx = 0.75;
      this.imgW;
      this.imgH;
      this.x = 0;
      this.clearX;
      this.clearY;

      this.img.onload = () => {
         this.imgW = this.img.width * this.scale;
         this.imgH = this.img.height * this.scale;
         if (this.imgW > this.CanvasXSize) {
            this.x = this.CanvasXSize - this.imgW;
         }
         if (this.imgW > this.CanvasXSize) {
            this.clearX = this.imgW;
         } else {
            this.clearX = this.CanvasXSize;
         }
         if (this.imgH > this.CanvasYSize) {
            this.clearY = this.imgH;
         } else {
            this.clearY = this.CanvasYSize;
         }
         console.log("imgW", this.imgW, "imgH", this.imgH, "clearX", this.clearX, "clearY", this.clearY, "x", this.x, "y", this.y);

         // window.requestAnimationFrame(this.image.bind(this));
      };


   }

   resize() {
      console.log(this);
      this.canvas.width = document.body.clientWidth;
      this.canvas.height = document.body.clientHeight;

   }


   image() {
      this.ctx.clearRect(0, 0, this.clearX, this.clearY);
      if (this.imgW < this.CanvasXSize) {
         if (this.x > this.CanvasXSize) {
            this.x = 0;
         }
         if (this.x > this.CanvasXSize - this.imgW) {
            this.ctx.drawImage(this.img, this.x - this.CanvasXSize + 1, this.y, this.imgW, this.imgH);
         }
      } else {
         if (this.x > this.CanvasXSize) {
            this.x = this.CanvasXSize - this.imgW;
         }
         if (this.x > this.CanvasXSize - this.imgW) {
            this.ctx.drawImage(this.img, this.x - this.imgW + 1, this.y, this.imgW, this.imgH);
         }
      }
      this.ctx.drawImage(this.img, this.x, this.y, this.imgW, this.imgH);
      this.x += this.dx;
      requestAnimationFrame(this.image.bind(this));
   }
}

window.onload = () => {
   new Index();
};
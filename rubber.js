class Rubber {
   constructor() {
      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d");
      document.body.append(this.canvas);

      this.rubberbandDiv = document.getElementById("rubberbandDiv");
      this.resetButton = document.getElementById("resetButton");

      this.image = new Image();
      this.mouseDown = {};
      this.rubberbandRectangle = {};
      this.dragging = false;

      window.addEventListener("resize", this.resize.bind(this));
      this.resize();
      this.draw();

      this.canvas.onmousedown = (e) => {
         e.preventDefault();
         let x = e.clientX;
         let y = e.clientY;
         this.rubberbandStart(x, y);
      };
      window.onmousemove = (e) => {
         let x = e.clientX;
         let y = e.clientY;

         e.preventDefault();
         if (this.dragging) {
            this.rubberbandStretch(x, y);
         }
      };
      window.onmouseup = (e) => {
         e.preventDefault();
         this.rubberbandEnd();
      };

      this.image.onload = () => {
         this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
      };

      this.resetButton.onclick = () => {
         this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
         this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
      };

      this.image.src = "img.png";
   }

   resize() {
      this.stageWidth = document.body.clientWidth;
      this.stageHeigth = document.body.clientHeight;

      this.canvas.width = this.stageWidth;
      this.canvas.height = this.stageHeigth;
   }

   draw() {
   }

   rubberbandStart(x, y) {
      this.mouseDown.x = x;
      this.mouseDown.y = y;

      this.rubberbandRectangle.left = this.mouseDown.x;
      this.rubberbandRectangle.top = this.mouseDown.y;

      this.moveRubberbandDiv();
      this.showRubberbandDiv();

      this.dragging = true;
   }

   rubberbandStretch(x, y) {
      this.rubberbandRectangle.left = x < this.mouseDown.x ? x : this.mouseDown.x;
      this.rubberbandRectangle.top = y < this.mouseDown.y ? y : this.mouseDown.y;

      this.rubberbandRectangle.width = Math.abs(x - this.mouseDown.x);
      this.rubberbandRectangle.height = Math.abs(y - this.mouseDown.y);

      this.moveRubberbandDiv();
      this.resizeRubberbandDiv();

   }

   rubberbandEnd() {
      let bbox = this.canvas.getBoundingClientRect();

      try {
         console.log(123);
         this.ctx.drawImage(this.canvas,
            this.rubberbandRectangle.left - bbox.left,
            this.rubberbandRectangle.top - bbox.top,
            this.rubberbandRectangle.width,
            this.rubberbandRectangle.height,
            0, 0, this.canvas.width, this.canvas.height);
      } catch (e) {


      }
      this.resetRubberbandRectangle();
      this.rubberbandDiv.style.width = 0;
      this.rubberbandDiv.style.height = 0;

      this.hideRubberbandDiv();

      this.dragging = false;

   }

   moveRubberbandDiv() {
      this.rubberbandDiv.style.top = this.rubberbandRectangle.top + "px";
      this.rubberbandDiv.style.left = this.rubberbandRectangle.left + "px";
   }

   resizeRubberbandDiv() {
      this.rubberbandDiv.style.width = this.rubberbandRectangle.width + "px";
      this.rubberbandDiv.style.height = this.rubberbandRectangle.height + "px";
   }

   showRubberbandDiv() {
      this.rubberbandDiv.style.display = "block";
   }

   hideRubberbandDiv() {
      this.rubberbandDiv.style.display = "none";
   }

   resetRubberbandRectangle() {
      this.rubberbandRectangle = {top: 0, left: 0, width: 0, height: 0};
   }

}

window.onload = () => {
   new Rubber();
};
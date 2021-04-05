class P251 {
   constructor() {
      this.canvas = document.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.eraseButton = document.getElementById("eraseAllButton");
      this.strokeStyleSheet = document.getElementById("strokeStyleSelect");
      this.guideWireCheckBox = document.getElementById("guidewireCheckbox");

      this.drawingSrufaceImageData = null;
      this.mousedown = {};
      this.rubberbandRect = {};
      this.dragging = false;
      this.guideWires = this.guideWireCheckBox.checked;

      // this.drawGrid(this.ctx, "lightgray", 10, 10);

      this.draw();
      // this.canvas.addEventListener("mousedown", this.onmousedown.bind(this));
      // this.canvas.addEventListener("mousemove", this.onmousemove.bind(this));
      // this.canvas.addEventListener("mouseup", this.onmouseup.bind(this));
   }

   draw() {
      this.ctx.beginPath();
      this.ctx.rect(10, 10, 200, 100);
      this.ctx.fill();

      let imageData = this.ctx.getImageData(10, 10, 200, 100);
      this.ctx.putImageData(imageData, 300, 10);
   }

   drawGrid(ctx, color, stepx, stepy) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.5;

      for (let i = stepx + 0.5; i < this.canvas.width; i += stepx) {
         ctx.beginPath();
         ctx.moveTo(i, 0);
         ctx.lineTo(i, this.canvas.height);
         ctx.stroke();
      }
      for (let i = stepy + 0.5; i < this.canvas.height; i += stepy) {
         ctx.beginPath();
         ctx.moveTo(0, i);
         ctx.lineTo(this.canvas.width, i);
         ctx.stroke();
      }
   }

   windowToCanvas(x, y) {
      let bbox = this.canvas.getBoundingClientRect();
      return {
         x: x - bbox.left * (this.canvas.width / bbox.width),
         y: y - bbox.top * (this.canvas.height / bbox.height)
      };
   }

   saveDrawingSurface() {
      this.drawingSrufaceImageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
   }

   restoreDrawingSurface() {
      this.ctx.putImageData(this.drawingSrufaceImageData, 0, 0);
   }

   udpateRubberbandRectangle(loc) {
      this.rubberbandRect.width = Math.abs(loc.x - this.mousedown.x);
      this.rubberbandRect.height = Math.abs(loc.y - this.mousedown.y);

      if (loc.x > this.mousedown.x) this.rubberbandRect.left = this.mousedown.x;
      else this.rubberbandRect.left = loc.x;

      if (loc.y > this.mousedown.y) this.rubberbandRect.top = this.mousedown.y;
      else this.rubberbandRect.top = loc.y;
   }

   drawRubberbandShape(loc) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.mousedown.x, this.mousedown.y);
      this.ctx.lineTo(loc.x, loc.y);
      this.ctx.stroke();
   }

   udpateRubberband(loc) {
      this.udpateRubberbandRectangle(loc);
      this.drawRubberbandShape(loc);//안 비우나??
   }

   drawHorizontalLine(y) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y + 0.5);
      this.ctx.lineTo(this.canvas.width, y + 0.5);
      this.ctx.stroke();
   }

   drawVerticalLine(x) {
      this.ctx.beginPath();
      this.ctx.moveTo(x + 0.5, 0);
      this.ctx.lineTo(x + 0.5, this.canvas.height);
      this.ctx.stroke();
   }

   drawGuideWires(x, y) {
      this.ctx.save();
      this.ctx.strokeStyle = "rgba(0,0,230,0.4)";
      this.ctx.lineWidth = 0.5;
      this.drawVerticalLine(x);
      this.drawHorizontalLine(y);
      this.ctx.restore();
   }

   onmousedown(e) {
      let loc = this.windowToCanvas(e.clientX, e.clientY);
      e.preventDefault();
      this.saveDrawingSurface();
      this.mousedown.x = loc.x;
      this.mousedown.y = loc.y;
      this.dragging = true;
   }

   onmousemove(e) {
      // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      let loc;
      if (this.dragging) {
         e.preventDefault();
         loc = this.windowToCanvas(e.clientX, e.clientY);
         this.restoreDrawingSurface();
         this.udpateRubberband(loc);
         if (this.guideWires) {
            this.drawGuideWires(loc.x, loc.y);
         }
      }
   }

   onmouseup(e) {
      let loc = this.windowToCanvas(e.clientX, e.clientY);
      this.restoreDrawingSurface();
      this.udpateRubberband(loc);
      this.dragging = false;
   }


}

window.onload = () => {
   new P251();
};
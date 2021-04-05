class P213 {
   constructor() {
      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d");
      document.body.append(this.canvas);


      this.AXIS_MARGIN = 40;
      this.AXIS_ORIGIN = {x: this.AXIS_MARGIN, y: this.canvas.height - this.AXIS_MARGIN};
      this.AXIS_TOP = this.AXIS_MARGIN;
      this.AXIS_RIGHT = this.canvas.width - this.AXIS_MARGIN;

      this.HORIZONTAL_TOCK_SPACING = 10;
      this.VERTICAL_TICK_SPACING = 10;
      this.AXIS_WIDTH = this.AXIS_RIGHT - this.AXIS_ORIGIN.x;
      this.AXIS_HEIGHT = this.AXIS_ORIGIN.y - this.AXIS_TOP;

      this.NUM_VERTICAL_TICKS = this.AXIS_HEIGHT / this.VERTICAL_TICK_SPACING;
      this.NUM_HORIZINTAL_TICKS = this.AXIS_WIDTH / this.HORIZONTAL_TOCK_SPACING;

      this.TICK_WIDTH = 10;
      this.TICKS_LINEWIDTH = 0.5;
      this.TICKS_COLOR = "navy";

      this.AXIS_LINEWIDTH = 1.0;
      this.AXIS_COLOR = "blue";
      window.addEventListener("resize", this.resize.bind(this));
      this.resize();
      this.drawGrid(this.ctx, "lightgray", 10, 10);

      this.drawAxes();
      this.drawVertivalAxis();
   }

   resize() {
      this.stageWidth = document.body.clientWidth;
      this.stageHeight = document.body.clientHeight;
      this.canvas.width = this.stageWidth;
      this.canvas.height = this.stageHeight;
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

   drawAxes() {
      this.ctx.save();
      this.ctx.strokeStyle = this.AXIS_COLOR;
      this.ctx.lineWidth = this.AXIS_LINEWIDTH;

      this.drawHorizontalAxis();
      this.drawVertivalAxis();

      this.ctx.lineWidth = 0.5;
      this.ctx.strokeStyle = this.TICKS_COLOR;
      this.drawHorizontalAxisTicks();
      this.drawVertivalAxisTicks();
      this.ctx.restore();
   }

   drawHorizontalAxis() {
      this.ctx.beginPath();
      this.ctx.moveTo(this.AXIS_ORIGIN.x, this.AXIS_ORIGIN.y);
      this.ctx.lineTo(this.AXIS_RIGHT, this.AXIS_ORIGIN.y);
      this.ctx.stroke();
   }

   drawVertivalAxis() {
      this.ctx.beginPath();
      this.ctx.moveTo(this.AXIS_ORIGIN.x, this.AXIS_ORIGIN.y);
      this.ctx.lineTo(this.AXIS_ORIGIN.x, this.AXIS_TOP);
      this.ctx.stroke();
   }

   drawVertivalAxisTicks() {
      let deltaX;

      for (let i = 1; i < this.NUM_VERTICAL_TICKS; ++i) {
         this.ctx.beginPath();
         if (i % 5 === 0) deltaX = this.TICK_WIDTH;
         else deltaX = this.TICK_WIDTH / 2;

         this.ctx.moveTo(this.AXIS_ORIGIN.x - deltaX, this.AXIS_ORIGIN.y - i * this.VERTICAL_TICK_SPACING);
         this.ctx.lineTo(this.AXIS_ORIGIN.x + deltaX, this.AXIS_ORIGIN.y - i * this.VERTICAL_TICK_SPACING);
         this.ctx.stroke();

      }


   }

   drawHorizontalAxisTicks() {
      let deltaY;

      for (let i = 0; i < this.NUM_HORIZINTAL_TICKS; ++i) {
         this.ctx.beginPath();
         if (i % 5 === 0) deltaY = this.TICK_WIDTH;
         else deltaY = this.TICK_WIDTH / 2;
      }
      this.ctx.moveTo(this.AXIS_ORIGIN.x + i * this.HORIZONTAL_TOCK_SPACING, this.AXIS_ORIGIN.y - deltaY);
      this.ctx.lineTo(this.AXIS_ORIGIN.x + i * this.HORIZONTAL_TOCK_SPACING, this.AXIS_ORIGIN.y + deltaY);
      this.ctx.stroke();
   }

}

window.onload = () => {
   new P213();
};
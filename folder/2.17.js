class P217 {
   constructor(props) {
      this.canvas = document.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");

      this.CENTROID_RAUIS = 10;
      this.CENTROID_STROKE_STYLE = "rgba(0,0,0,0.5)";
      this.CENTROID_FILL_STYLE = "rgba(80,190,240,0.6)";

      this.RING_INNER_RADIUS = 35;
      this.RING_OUTER_RADIUS = 55;

      this.ANNOTATION_FILL_STYLE = "rgba(0,0,230,0.9)";
      this.ANNOTATION_TEXT_SIZE = 12;

      this.TICK_WIDTH = 10;
      this.TICK_LONG_STROKE_STYLE = "rgba(100,140,230,0.9)";
      this.TOCK_SHORT_STROKE_STYLE = "rgba(100,140,230,0.7)";

      this.TRACKIN_DIALSTROKING_STYLE = "rgba(100,140,230,0.5)";

      this.guidwire_stroke_style = "goldenrod";
      this.guidwire_fill_style = "rgba(250,250,0,0.6)";

      this.circle = {
         x: this.canvas.width / 2,
         y: this.canvas.height / 2,
         radius: 150
      };

      this.drawGrid("lightgray", 10, 10);
      this.drawDial();
   }

   drawGrid(color, stepx, stepy) {
      this.ctx.save();
      this.ctx.shadowColor = undefined;
      this.ctx.shadowOffsetX = 0;
      this.ctx.shadowOffsetY = 0;
      this.ctx.strokeStyle = color;
      this.ctx.fillStyle = "#ffffff";
      this.ctx.lineWidth = "0.5";
      // this.ctx.arc(100, 100, 100, 0, Math.PI * 2, false);
      // this.ctx.fill();
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = stepx + 0.5; i < this.canvas.width; i += stepx) {
         this.ctx.beginPath();
         this.ctx.moveTo(i, 0);
         this.ctx.lineTo(i, this.canvas.height);
         this.ctx.stroke();
      }

      for (let i = stepy + 0.5; i < this.canvas.height; i += stepy) {
         this.ctx.beginPath();
         this.ctx.moveTo(0, i);
         this.ctx.lineTo(this.canvas.width, i);
         this.ctx.stroke();
      }
      this.ctx.restore();
   }

   drawDial() {
      let loc = {x: this.circle.x, u: this.circle.y};

      this.drawCentroid();
      this.drawCentroidGuidWire(loc);
      this.drawRing();
      this.drawTickInnerCircle();
      this.drawTick();
      // this.drawAnnotations();
   }

   drawCentroid() {
      this.ctx.beginPath();
      this.ctx.save();
      this.ctx.strokeStyle = this.CENTROID_STROKE_STYLE;
      this.ctx.fillStyle = this.CENTROID_FILL_STYLE;
      this.ctx.arc(this.circle.x, this.circle.y, this.CENTROID_RAUIS, 0, Math.PI * 2, false);
      this.ctx.stroke();
      this.ctx.fill();
      this.ctx.restore();
   }

   drawCentroidGuidWire(loc) {
      let angle = -Math.PI / 4;
      let radius;
      let endpt;

      radius = this.circle.radius + this.RING_OUTER_RADIUS;

      if (loc.x >= this.circle.x) {
         endpt = {x: this.circle.x + radius * Math.cos(angle), y: this.circle.y + radius * Math.sin(angle)};
      } else {
         endpt = {x: this.circle.x - radius * Math.cos(angle), y: this.circle.y - radius * Math.sin(angle)};
      }
      this.ctx.save();

      this.ctx.strokeStyle = this.guidwire_stroke_style;
      this.ctx.fillStyle = this.guidwire_fill_style;

      this.ctx.beginPath();
      this.ctx.moveTo(this.circle.x, this.circle.y);
      this.ctx.lineTo(endpt.x, endpt.y);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.strokeStyle = this.TICK_LONG_STROKE_STYLE;
      this.ctx.arc(endpt.x, endpt.y, 5, 0, Math.PI * 2, false);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.restore();
   }

   drawRing() {
      this.drawOuterCircle();

      this.ctx.strokeStyle = "rgba(0,0,0,0.1)";
      this.ctx.arc(this.circle.x, this.circle.y, this.circle.radius + this.RING_INNER_RADIUS, 0, Math.PI * 2, false);
      this.ctx.fillStyle = "rgba(100,140,230,0.1)";
      this.ctx.fill();
      this.ctx.stroke();
   }

   drawOuterCircle() {
      this.ctx.shadowColor = "rgba(0,0,0,0.7)";
      this.ctx.shadowOffsetX = 3;
      this.ctx.shadowOffsetY = 3;
      this.ctx.shadowBlur = 6;
      this.ctx.strokeStyle = this.TRACKIN_DIALSTROKING_STYLE;
      this.ctx.beginPath();
      this.ctx.arc(this.circle.x, this.circle.y, this.circle.radius + this.RING_OUTER_RADIUS, 0, Math.PI * 2, true);
      this.ctx.stroke();
   }

   drawTickInnerCircle() {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.strokeStyle = "rgba(0,0,0,0.1)";
      this.ctx.arc(this.circle.x, this.circle.y, this.circle.radius + this.RING_INNER_RADIUS - this.TICK_WIDTH, 0, Math.PI * 2, false);
      this.ctx.stroke();
      this.ctx.restore();
   }

   drawTick(angle, radius, cnt) {
      let tickWidth = cnt % 4 === 0 ? this.TICK_WIDTH : this.TICK_WIDTH / 2;

      this.ctx.beginPath();
      this.ctx.moveTo(this.circle.x + Math.cos(angle) * (radius - tickWidth), this.circle.y + Math.sin(angle) * (radius - tickWidth));
      this.ctx.lineTo(this.circle.x + Math.cos(angle) * radius, this.circle.y + Math.sin(angle) * angle);
      this.ctx.strokeStyle = this.TOCK_SHORT_STROKE_STYLE;
      this.ctx.stroke();

   }

   drawTicks() {
      let radius = this.circle.radius + this.RING_INNER_RADIUS;
      let angle_max = 2 * Math.PI;
      let angle_delta = Math.PI / 64;
   }
}

window.onload = () => {
   new P217();
};
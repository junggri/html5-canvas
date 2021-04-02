class Spirte {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.readout = document.createElement("div");
    this.ctx = this.canvas.getContext("2d");
    document.body.append(this.canvas);
    document.body.append(this.readout);

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    // window.requestAnimationFrame(this.animate.bind(this))
    this.canvas.onmousemove = (e) => {
      e.preventDefault();
      let loc = this.windowToCanvas(this.canvas, e.clientX, e.clientY);

      this.drawBackground();
      this.drawScriptsheet();
      this.drawGuidelines(loc.x, loc.y);
      this.updateReadout(loc.x, loc.y);
    };

    this.scriptSheet = new Image();
    this.drawBackground();
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    // this.ctx.scale(this.pixelRatio, this.pixelRatio);
  }

  windowToCanvas(canvas, x, y) {
    const bbox = canvas.getBoundingClientRect();

    return {
      x: x - bbox.left * (canvas.width / bbox.width),
      y: y - bbox.top * (canvas.height / bbox.height),
    };
  }

  drawBackground() {
    let vertical_line_spacing = 12;
    let i = this.ctx.canvas.height;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = "lightgray";
    this.ctx.lineWidth = 0.5;

    while (i > vertical_line_spacing * 4) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(this.ctx.canvas.width, i);
      this.ctx.stroke();
      i -= vertical_line_spacing;
    }
  }

  drawScriptsheet() {
    this.ctx.drawImage(this.scriptSheet, 0, 0);
  }

  drawGuidelines(x, y) {
    this.ctx.strokeStyle = "rgba(0,0,230,0.8)";
    this.ctx.lineWidth = 0.5;
    this.drawHorizon(y);
  }

  updateReadout(x, y) {
    this.readout.textContent = `(${x.toFixed(0)},${y.toFixed(0)})`;
  }

  drawHorizon(x) {
    this.ctx.beginPath();
    this.ctx.moveTo(x + 0.5, 0);
    this.ctx.lineTo(x + 0.5, this.ctx.canvas.height);
    this.ctx.stroke();
  }

  drawVertical(y) {
    this.ctx.beginPath();
    this.ctx.moveTo(0, y + 0.5);
    console.log(this.ctx.canvas.width, y);
    this.ctx.lineTo(this.ctx.canvas.width, y + 0.5);
    this.ctx.stroke();
  }
}
window.onload = () => {
  new Spirte();
};

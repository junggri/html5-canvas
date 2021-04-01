class Example {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.append(this.canvas);

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    this.draw();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    // this.ctx.scale(this.pixelRatio, this.pixelRatio);
    this.draw();
  }

  draw() {
    this.ctx.font = "38pt Arial";
    this.ctx.fillStyle = "cornflowerblue";
    this.ctx.strokeStyle = "blue";

    this.ctx.fillText("hello canvas", 100, 100);
    this.ctx.strokeText("hello canvas", 100, 100);
    this.ctx.fillRect(this.canvas.width / 2, this.canvas.height / 2, 50, 50);
  }

  animate() {}
}

window.onload = () => {
  new Example();
};

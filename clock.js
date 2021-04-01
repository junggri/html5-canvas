class Clock {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.append(this.canvas);

    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    this.font_height = 15;
    this.margin = 35;
    this.hand_truncate = this.canvas.width / 25;
    this.hour_hand_truncate = this.canvas.width / 10;
    this.numeral_spacing = 20;
    this.radius = this.canvas.width / 2 - this.margin;
    this.hand_radius = this.radius + this.numeral_spacing;
    this.draw();
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeigth = document.body.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeigth;
    // this.draw();
  }

  draw() {
    const c = this.ctx;
    this.drawCircle();
    this.drawNumerals();
    this.drawCenter();
    this.drawHand();
  }

  drawCircle() {
    this.ctx.beginPath();
    this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, this.radius, 0, Math.PI * 2, true);
    this.ctx.stroke();
  }

  drawNumerals() {
    const numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let angle = 0;
    let numeralWidth = 0;
    numerals.forEach((e) => {
      angle = (Math.PI / 6) * (e - 3);
      numeralWidth = this.ctx.measureText(e).width;
      console.log(numeralWidth);
      this.ctx.fillText(e, this.canvas.width / 2 + Math.cos(angle) * this.hand_radius - e.width / 2, this.canvas.height / 2 + Math.sin(angle) * this.hand_radius + this.font_height / 3);
    });
  }

  drawCenter() {
    this.ctx.beginPath();
    this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 5, 0, Math.PI * 2, false);
    this.ctx.fill();
  }

  drawHand(loc, isHour) {
    let angle = Math.PI * 2 * (loc / 60) - Math.PI / 2;
    let handleRadius = isHour ? this.radius - this.hand_truncate - this.hour_hand_truncate : this.radius - this.hand_truncate;
    this.ctx.moveTo(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.lineTo(this.canvas.width / 2 + Math.cos(angle) * handleRadius, this.canvas.height / 2 + Math.sin(angle) * handleRadius);
    this.ctx.stroke();
  }
}

window.onload = () => {
  new Clock();
};

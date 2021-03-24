class Request {
   constructor() {
      this.canvas = document.querySelector("canvas");
      this.ctx = this.canvas.getContext("2d");

      this.x = 100;
      this.y = 100;
      this.vx = 5;
      this.vy = 2;
      this.radius = 25;
      this.color = "blue";

      this.running = false;

      this.raf;

      this.draw();

      this.canvas.addEventListener("mousemove", (e) => {
         if (!this.running) {
            this.x = e.clientX;
            this.y = e.clientY;
            this.draw();
         }
      });

      this.canvas.addEventListener("click", (e) => {
         if (!this.running) {
            this.raf = requestAnimationFrame(this.animate.bind(this));
         }
         this.running = true;
      });


      this.canvas.addEventListener("mouseout", (e) => {
         cancelAnimationFrame(this.raf);
      });
   }

   resize() {

   }

   draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
      if (this.y + this.radius > this.canvas.height || this.y < this.radius) {
         this.vy += -1;
      }
      if (this.x + this.radius > this.canvas.width || this.x < this.radius) {
         this.vx *= -1;
      }
   }

   animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.draw();
      this.x += this.vx;
      this.y += this.vy;
      this.raf = requestAnimationFrame(this.animate.bind(this));
   }
}

window.onload = () => {
   new Request();
};
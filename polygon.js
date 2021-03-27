export class Polygon {
   constructor(x, y, pointX, pointY, radius, side, index) {
      this.x = x;
      this.y = y;
      this.pointX = pointX;
      this.pointY = pointY;
      this.radius = radius;
      this.side = side;
      this.index = index;
      this.rotate = 0;
      this.moveX = [];
      this.moveY = [];
      this.color = [
         "#4b45ab",
         "#554fb8",
         "#605ac7",
         "#2a91a8",
         "#2e9ab2",
         "#32a5bf",
         "#81b144",
         "#85b944",
         "#8fc549",
         "#e0af27",
         "#eeba2a",
         "#fec72e",
         "#bf342d",
         "#ca3931",
         "#d7423a",
      ];
   }


   draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);

      const angel2 = Math.PI * 2 / 4;

      ctx.fillStyle = this.color[this.index];
      ctx.translate(this.pointX, this.pointY);
      ctx.rotate(((360 / this.side) * this.index + 45) * Math.PI / 180);

      ctx.beginPath();

      for (let j = 0; j < 4; j++) {
         const x2 = 100 * Math.cos(angel2 * j);
         const y2 = 100 * Math.sin(angel2 * j);

         this.moveX.push(x2);
         this.moveY.push(y2);

         j === 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
      }

      ctx.fill();
      ctx.closePath();
      ctx.restore();
   }

   animate(ctx, moveX) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(this.x, this.y);

      this.rotate -= moveX * 0.008;
      ctx.rotate(this.rotate);

      const angle = Math.PI * 2 / this.side;
      const angel2 = Math.PI * 2 / 4;

      for (let i = 0; i < this.side; i++) {
         const x = this.radius * Math.cos((angle * i));
         const y = this.radius * Math.sin((angle * i));
         ctx.fillStyle = "black";
         ctx.fillText(i, x, y);
         ctx.moveTo(0, 0);
         ctx.lineTo(x, y);
         ctx.stroke();
         ctx.closePath();
         ctx.save();
         ctx.fillStyle = this.color[i];
         ctx.translate(x, y);

         // ctx.rotate(((360 / this.side) * i + 45) * Math.PI / 180);
         ctx.beginPath();

         for (let j = 0; j < 4; j++) {
            const x2 = 100 * Math.cos(angel2 * j);
            const y2 = 100 * Math.sin(angel2 * j);

            this.moveX.push(x2);
            this.moveY.push(y2);
            j === 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
         }
         // ctx.fill();
         ctx.stroke();
         ctx.closePath();
         ctx.restore();
      }
      ctx.restore();
   }
}
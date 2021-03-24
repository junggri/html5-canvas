export class Polygon {
   constructor(x, y, radius, side) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.side = side;
      this.rotate = 0;
   }

   init() {

   }


   animate(ctx, moveX, size) {
      const COLORS = [
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
      ctx.save();
      ctx.beginPath();
      ctx.translate(this.x, this.y);

      const angle = Math.PI * 2 / this.side;
      this.rotate -= moveX * 0.008;

      ctx.rotate(this.rotate);


      for (let i = 0; i < this.side; i++) {
         const x = this.radius * Math.cos(angle * i);
         const y = this.radius * Math.sin(angle * i);
         ctx.save();
         ctx.fillStyle = COLORS[i];
         ctx.translate(x, y);
         ctx.rotate(Math.PI * 2 / this.side * i);
         ctx.fillText(i, -size / 2, -size / 2);
         ctx.fillRect(-size / 2, -size / 2, size, size);
         ctx.restore();
      }
      ctx.restore();
   }
}
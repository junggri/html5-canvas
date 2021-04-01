export class Polygon {
   constructor(x, y, diagonal, radius, side, boxRotateRatio) {
      this.x = x;
      this.y = y;
      this.diagonal = diagonal;
      this.radius = radius;
      this.side = side;
      this.boxRotateRatio = boxRotateRatio;
      this.rotate = 0;
      this.coordinate = [];
   }


   // draw(ctx, moveX) {
   //    ctx.save();
   //    ctx.translate(this.x, this.y);
   //    ctx.fillStyle = this.color[this.index];
   //    ctx.translate(this.pointX, this.pointY);
   //
   //    const rotateRatio = ((360 / this.side) * this.index + 45) * Math.PI / 180;
   //
   //    ctx.beginPath();
   //
   //    const angel2 = Math.PI * 2 / 4;
   //    const angle3 = Math.PI * 2 / 6;
   //    for (let j = 0; j < 4; j++) {
   //       const x2 = 100 * Math.cos(angel2 * j + rotateRatio);
   //       const y2 = 100 * Math.sin(angel2 * j + rotateRatio);
   //
   //       let rx, ry;
   //       const radius = Math.floor(Math.sqrt((this.pointX - this.x + x2) ** 2 + (this.pointY - this.y + y2) ** 2));
   //       // console.log(Math.atan2(this.y - this.pointY + y2, this.x - this.pointX + x2) * 180 / Math.PI);
   //       this.moveX.push(rx + this.x);
   //       this.moveY.push(ry + this.y);
   //
   //       j === 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
   //    }
   //
   //    ctx.fill();
   //    ctx.closePath();
   //    ctx.restore();
   // }

   animate(ctx, moveX) {
      let xArr = [];
      let yArr = [];
      let rx, ry, x2, y2;
      const color = ["#4b45ab", "#554fb8", "#605ac7", "#2a91a8", "#2e9ab2", "#32a5bf", "#81b144", "#85b944", "#8fc549", "#e0af27", "#eeba2a", "#fec72e", "#bf342d", "#ca3931", "#d7423a"];
      const angle = Math.PI * 2 / this.side;
      const angle2 = Math.PI * 2 / 4;
      const angle3 = Math.PI * 2 / 5;


      ctx.save();
      ctx.beginPath();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotate);

      this.coordinate = [];
      this.rotate -= moveX;

      for (let i = 0; i < this.side; i++) {
         // console.log(this.boxRotateRatio * 180 / Math.PI);
         const x = this.radius * Math.cos((angle * i));
         const y = this.radius * Math.sin((angle * i));

         const rotateRatio = ((360 / this.side) * i - (this.boxRotateRatio * 180 / Math.PI / 2)) * Math.PI / 180;
         ctx.save();
         ctx.fillStyle = color[i];
         // ctx.moveTo(0, 0);
         // ctx.lineTo(x, y);
         // ctx.stroke();
         // ctx.closePath();
         ctx.translate(x, y);
         ctx.beginPath();
         ;

         xArr = [];
         yArr = [];

         for (let j = 0; j < 4; j++) {
            let angle;
            if (j === 0 || j === 2) {
               angle = angle2 * j + rotateRatio;
               x2 = Math.floor(this.diagonal * Math.cos(angle));
               y2 = Math.floor(this.diagonal * Math.sin(angle));
            } else if (j === 1) {
               angle = angle3 + rotateRatio;
               x2 = Math.floor(this.diagonal * Math.cos(angle));
               y2 = Math.floor(this.diagonal * Math.sin(angle));
            } else if (j === 3) {
               angle = (Math.PI + angle3 + rotateRatio);
               x2 = Math.floor(this.diagonal * Math.cos(angle));
               y2 = Math.floor(this.diagonal * Math.sin(angle));
            }
            // ctx.fillText(String(j), x2, y2);
            const pointAngle = Math.atan2(y + y2, x + x2);
            const radius = Math.floor(Math.sqrt((x + x2) ** 2 + (y + y2) ** 2));

            rx = Math.floor(radius * Math.cos(this.rotate + pointAngle));
            ry = Math.floor(radius * Math.sin(this.rotate + pointAngle));
            ctx.fillText(rx, x2, y2);
            xArr.push(rx);
            yArr.push(ry);

            j === 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
         }


         ctx.fill();
         // ctx.stroke();
         ctx.restore();
         ctx.fillStyle = "black";
         ctx.font = "10px bold";
         ctx.fillText(String(i), x, y);
         // ctx.fillText(x, x, y + 10);

         this.coordinate.push({
            i,
            xArr,
            yArr,
            centerX: Math.floor(this.radius * Math.cos(this.rotate + angle * i)),
            centerY: Math.floor(this.radius * Math.sin(this.rotate + angle * i))
         });
      }
      ctx.restore();
   }
}
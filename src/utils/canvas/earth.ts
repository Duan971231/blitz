const sun = new Image();
const moon = new Image();
const earth = new Image();
sun.src = './image/sun.png';
moon.src = './image/moon.png';
earth.src = './image/earth.png';

/**
 * 300 * 300 的地图变换
 */
export const canvasEarth = (id: string) => {
  const canvas = document.querySelector('#' + id);
  (canvas as any).width = 300;
  (canvas as any).height = 300;
  const ctx = (canvas as any).getContext('2d');

  ctx.globalCompositeOperation = 'destination-over'; // 在现有的画布内容后面绘制新的图形。

  ctx.clearRect(0, 0, 300, 300); // clear canvas
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.strokeStyle = 'rgba(0,153,255,0.4)';
  ctx.save();
  ctx.translate(150, 150);

  // Earth
  const time = new Date();
  ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60_000) * time.getMilliseconds());
  ctx.translate(105, 0);
  ctx.fillRect(0, -12, 50, 24); // Shadow
  ctx.drawImage(earth, -12, -12);

  // Moon
  ctx.save();
  ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
  ctx.translate(0, 28.5);
  ctx.drawImage(moon, -3.5, -3.5);
  ctx.restore();

  ctx.restore();

  ctx.beginPath();
  ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
  ctx.stroke();

  ctx.drawImage(sun, 0, 0, 300, 300);

  // window.requestAnimationFrame(draw)
};

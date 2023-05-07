import dayjs from 'dayjs';
export class Clock {
  private id = '';

  private width = 200;

  private height = 200;

  private timer = 0;

  private canvas: HTMLCanvasElement;

  private ctx;

  constructor(id: string) {
    this.id = id;
    this.canvas = document.querySelector('#' + this.id) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  /**
   * 开始时钟绘制
   */
  start() {
    this.draw();
    this.timer = setInterval(() => {
      this.draw();
    }, 1000);
  }

  clear() {
    clearInterval(this.timer);
    if (this.ctx) {
      this.ctx.clearRect(0, 0, 200, 200);
    }
  }

  /**
   * 绘制时钟
   */
  draw() {
    if (!document.querySelector('#' + this.id)) {
      console.log('不存在 id 为 ' + this.id + ' 的 canvas DOM! ');
      return;
    }

    const hour = dayjs().hour();
    const min = dayjs().minute();
    const second = dayjs().second();
    // hourNum = hour >= 10 ? hour + '' : '0' + hour
    // minuteNum = min >= 10 ? min + '' : '0' + min
    // secondNum = second >= 10 ? second + '' : '0' + second
    // dataNum = dayjs().format('YYYY年MM月DD日')
    // let day = dayjs().day()
    // dayNum = dayList[day]
    // 检查支持性
    if (this.ctx) {
      this.ctx.clearRect(0, 0, 200, 200);

      // drawing code here
      this.ctx.lineWidth = 6;
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#FDFDFD';
      this.ctx.arc(100, 100, 97, 0, 2 * Math.PI);
      // 时间
      this.ctx.lineCap = 'round';
      this.ctx.moveTo(165, 100);
      this.ctx.lineTo(177, 100);
      this.ctx.moveTo(23, 100);
      this.ctx.lineTo(35, 100);
      this.ctx.moveTo(100, 23);
      this.ctx.lineTo(100, 35);
      this.ctx.moveTo(100, 165);
      this.ctx.lineTo(100, 177);
      // 指针
      this.ctx.translate(100, 100);
      this.ctx.moveTo(0, 0);
      this.ctx.save();
      this.ctx.rotate((Math.PI / 6) * ((hour % 12) + min / 60 + second / 3600)); // 角度没计算分钟和秒针
      this.ctx.lineTo(0, -40);
      this.ctx.restore();
      // 分针
      this.ctx.save();
      this.ctx.moveTo(0, 0);
      this.ctx.rotate((Math.PI / 30) * (min + second / 60));
      this.ctx.lineTo(0, -55);
      this.ctx.stroke();
      this.ctx.restore();
      this.ctx.closePath();

      this.ctx.beginPath();
      // 圆盘
      this.ctx.moveTo(0, 0);
      this.ctx.fillStyle = '#7488A1';
      this.ctx.arc(0, 0, 12, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.closePath();

      // 秒针
      this.ctx.beginPath();
      this.ctx.save();
      this.ctx.moveTo(0, 0);
      this.ctx.lineWidth = 4;
      this.ctx.strokeStyle = '#FF9000';
      this.ctx.rotate((second * Math.PI) / 30);
      this.ctx.lineTo(0, 15);
      this.ctx.lineTo(0, -70);
      this.ctx.stroke();
      this.ctx.restore();
      this.ctx.closePath();

      this.ctx.beginPath();
      this.ctx.fillStyle = '#FFF';
      this.ctx.moveTo(0, 0);
      this.ctx.arc(0, 0, 6, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.translate(-100, -100);
    }
  }
}

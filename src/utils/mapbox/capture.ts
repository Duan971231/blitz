/**
 * mapbox
 * 创建 new Map的时候，options 需要传入 preserveDrawingBuffer: true
 * 该参数允许canvas 转换为png
 * 目前，存在一个问题，svg格式的图片可能截取不到，暂时未处理
 */
import html2canvas from 'html2canvas';
import { Map } from 'maplibre-gl';

export class Capture {
  private canvas: HTMLCanvasElement | undefined = undefined;

  private maskDiv: HTMLCanvasElement | undefined = undefined;

  private context: CanvasRenderingContext2D | undefined = undefined;

  private mouseDownFlag = false; // 表示鼠标是否按下

  private startX = 0;

  private startY = 0;

  private map?: Map;

  constructor(map?: Map) {
    this.map = map;
    window.addEventListener('resize', () => {
      if (this.maskDiv) {
        this.canvas = document.querySelector('#maskDiv') as HTMLCanvasElement;
        this.canvas.width = this.maskDiv.clientWidth * window.devicePixelRatio;
        this.canvas.height = this.maskDiv.clientHeight * window.devicePixelRatio;
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.context.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }
    });
  }

  /**
   * 开始截图
   */
  start() {
    this.maskDiv = document.createElement('canvas');
    this.maskDiv.id = 'maskDiv';
    this.maskDiv.style.position = 'fixed';
    this.maskDiv.style.left = '0';
    this.maskDiv.style.top = '0';
    this.maskDiv.style.width = '100%';
    this.maskDiv.style.height = '100%';
    this.maskDiv.style.zIndex = '999999';
    document.querySelector('#app')?.appendChild(this.maskDiv);
    this.canvas = document.querySelector('#maskDiv') as HTMLCanvasElement;
    this.canvas.width = this.maskDiv.clientWidth * window.devicePixelRatio;
    this.canvas.height = this.maskDiv.clientHeight * window.devicePixelRatio;
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.context.fillStyle = 'rgba(0, 0, 0, 0.3)';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    window.addEventListener('mousedown', this.mouseDown, true);
  }

  /**
   * 取消截图, 没啥用，开始截图后，不能点击屏幕取消
   */
  cancel() {
    this.context?.clearRect(0, 0, (this.canvas as HTMLCanvasElement).width, (this.canvas as HTMLCanvasElement).height);
    this.map?.dragPan.enable();
    if (this.maskDiv) {
      document.querySelector('#app')?.removeChild(document.querySelector('#maskDiv') as Element);
      this.maskDiv = undefined;
    }

    window.removeEventListener('mousedown', this.mouseDown, true);
    window.removeEventListener('mousemove', this.mouseMove, true);
    window.removeEventListener('mouseup', this.mouseUp, true);
  }

  /**
   * 鼠标按下事件
   */
  private mouseDown = (e: MouseEvent) => {
    if (!this.mouseDownFlag) {
      this.startX = e.clientX * window.devicePixelRatio;
      this.startY = e.clientY * window.devicePixelRatio;
      this.mouseDownFlag = true;
      window.addEventListener('mousemove', this.mouseMove, true);
    }
  };

  /**
   * 鼠标移动
   */
  private mouseMove = (e: MouseEvent) => {
    if (this.mouseDownFlag) {
      this.map?.dragPan.disable();
      this.context?.clearRect(
        0,
        0,
        (this.canvas as HTMLCanvasElement).width,
        (this.canvas as HTMLCanvasElement).height,
      );
      this.context?.fillRect(0, 0, (this.canvas as HTMLCanvasElement).width, (this.canvas as HTMLCanvasElement).height);
      this.context?.clearRect(
        this.startX,
        this.startY,
        e.clientX * window.devicePixelRatio - this.startX,
        e.clientY * window.devicePixelRatio - this.startY,
      );
      window.addEventListener('mouseup', this.mouseUp, true);
    }
  };

  /**
   * 鼠标抬起事件
   */
  private mouseUp = (e: MouseEvent) => {
    window.removeEventListener('mousedown', this.mouseDown, true);
    window.removeEventListener('mousemove', this.mouseMove, true);
    window.removeEventListener('mouseup', this.mouseUp, true);
    this.mouseDownFlag = false;
    const htmlItem: HTMLHtmlElement = document.querySelectorAll('html')[0];
    html2canvas(htmlItem, {
      logging: true,
      useCORS: true,
      allowTaint: true, // 允许污染
      backgroundColor: null,
      width: htmlItem.clientWidth,
      height: htmlItem.clientHeight,
    })
      .then((bodyCanvas: HTMLCanvasElement) => {
        const clipCanvas = document.createElement('canvas');
        clipCanvas.width =
          e.clientX * window.devicePixelRatio - this.startX > 0
            ? e.clientX * window.devicePixelRatio - this.startX
            : this.startX - e.clientX * window.devicePixelRatio;
        clipCanvas.height =
          e.clientY * window.devicePixelRatio - this.startY > 0
            ? e.clientY * window.devicePixelRatio - this.startY
            : this.startY - e.clientY * window.devicePixelRatio;
        // 截取
        clipCanvas
          .getContext('2d')
          ?.drawImage(
            bodyCanvas,
            this.startX > e.clientX * window.devicePixelRatio ? e.clientX * window.devicePixelRatio : this.startX,
            this.startY > e.clientY * window.devicePixelRatio ? e.clientY * window.devicePixelRatio : this.startY,
            clipCanvas.width,
            clipCanvas.height,
            0,
            0,
            clipCanvas.width,
            clipCanvas.height,
          );
        const baseUrl = clipCanvas.toDataURL();
        const div = document.createElement('div');
        /**
         * 这里的大小是
         */
        const boxWidth = 90;
        const boxHeight = 38;
        // 下面的空间
        const bottomLen = (this.canvas as HTMLCanvasElement).height - Math.max(e.clientY, this.startY);
        // 左面的空间
        const leftLen = Math.min(e.clientX, this.startX);
        // 上面的空间
        const topLen = Math.min(this.startY, e.clientY);
        // 右边的空间
        const rightLen = (this.canvas as HTMLCanvasElement).width - Math.max(e.clientX, this.startX);
        let offsetTop, offsetLeft;
        if (bottomLen > 100) {
          offsetTop = 12;
          offsetLeft = 0;
        } else if (leftLen > 100) {
          offsetTop = -38;
          offsetLeft = -102;
        } else if (rightLen > 100) {
          offsetTop = -38;
          offsetLeft = clipCanvas.width / window.devicePixelRatio + 12;
        } else if (topLen > 100) {
          offsetTop = -(clipCanvas.height / window.devicePixelRatio + 50);
          offsetLeft = 0;
        } else {
          offsetTop = -50;
          offsetLeft = 12;
        }
        div.innerHTML = `
         <div style="background:#122652; color: #fff; display: flex; justify-content: space-around; align-items: center; font-size:14px; width: ${boxWidth}px; height: ${boxHeight}px;">
               <span style="font-size:16px; cursor: pointer;" class="capture_save">下载</span>
               <span style="font-size:16px; cursor: pointer;" class="capture_cancel">取消</span>
             </div>
         `;
        div.style.position = 'absolute';
        div.style.left =
          this.startX > e.clientX
            ? e.clientX / window.devicePixelRatio + offsetLeft + 'px'
            : this.startX / window.devicePixelRatio + offsetLeft + 'px';
        div.style.top =
          this.startY > e.clientY
            ? (e.clientY + clipCanvas.height) / window.devicePixelRatio + offsetTop + 'px'
            : (this.startY + clipCanvas.height) / window.devicePixelRatio + offsetTop + 'px';
        div.style.zIndex = '1000000';
        document.querySelector('#app')?.appendChild(div);
        document.querySelector('.capture_save')?.addEventListener('click', () => {
          downloadBase64(baseUrl);
          document.querySelector('#app')?.removeChild(div);
          this.context?.clearRect(
            0,
            0,
            (this.canvas as HTMLCanvasElement).width,
            (this.canvas as HTMLCanvasElement).height,
          );
          this.map?.dragPan.enable();
          document.querySelector('#app')?.removeChild(document.querySelector('#maskDiv') as Element);
          this.maskDiv = undefined;
        });
        document.querySelector('.capture_cancel')?.addEventListener('click', () => {
          document.querySelector('#app')?.removeChild(div);
          this.context?.clearRect(
            0,
            0,
            (this.canvas as HTMLCanvasElement).width,
            (this.canvas as HTMLCanvasElement).height,
          );
          this.map?.dragPan.enable();
          document.querySelector('#app')?.removeChild(document.querySelector('#maskDiv') as Element);
          this.maskDiv = undefined;
        });
        return;
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
}

/**
 * 下载图片
 */
function downloadBase64(url: string) {
  // 新版浏览器处理，
  const a = document.createElement('a');
  a.href = url;
  a.setAttribute('download', 'chart-downloadd');
  a.click();
}

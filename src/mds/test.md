[toc]

# Canvas 基本用法

`canvas` 标签只有两个属性---`width` 和 `height`。当没有设置宽度和高度的时候，canvas 会初始化宽度为 300 像素和高度为 150 像素。

<h3>渲染上下文(The rendering context)</h4>

canvas 元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文，其可以用来绘制和处理要展示的内容。

```js
let canvas = document.getElementById('id');
let ctx = canvas.getContext('2d');
```

<h3>检查支持性</h3>

替换内容是用于在不支持 `canvas` 标签的浏览器中展示的。

```js
let canvas = document.getElementById('id');
if (canvas.getContext) {
  let ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas unsupported code here
}
```

## 绘制形状

<h3>绘制矩形</h3>

```js
// 绘制一个填充矩形
ctx.fillRect(x, y, width, height);

// 绘制一个矩形的边框
ctx.strokeRect(x, y, width, height);

// 清除指定矩形区域，让清除部分完全透明
ctx.clearRect(x, y, width, height);
```

<h3>绘制路径</h3>

图形的基本元素是路径，路径是通过不同颜色和宽度的线段或弯曲线相连形成的不同形状的点的集合。

1. 首先，创建路径起始点
2. 然后使用画图命令去画出路径
3. 路径封闭
4. 路径生成，就可以通过描边或填充路径区域来渲染图形。

```js
// 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径
ctx.beginPath();

// 闭合路径之后，图形绘制命令重新指向到上下文中
ctx.closePath();

// 通过线条来绘制图形轮廓
ctx.stroke();

// 填充路径，生成实心图形
ctx.fill();
```

==当前路径为空，即调用 `beginPath()` 之后，或者 canvas 刚建的时候，第一条路径构造命令通常被视为是 `moveTo()` 无论实际是什么。==

==当调用 fill() 函数时，所有没有闭合的形状都会自动闭合，可以不用调用 closePath() 函数，但是调用 stroke() 时不会自动闭合==

<h3>绘制三角形</h3>

```js
ctx.beginPath();
ctx.moveTo(75, 50);
ctx.lineTo(100, 75);
ctx.lineTo(100, 25);
ctx.fill();
```

<h3>移动笔触moveTo</h3>

<h3>线lineTo()</h3>

<h3>圆弧arc()</h3>

`arc(x, y, radius, startAngle, endAngle, anticlockwise)`

画一个以(x, y) 为圆心的以 radius 为半径的圆弧（圆），从 startAngle 开始到 endAngle 结束，按照 anticlockwise 给定的方向（默认为顺时针）来生成

==arc()函数中表示角的单位是弧度，不是角度，角度与弧度的 js 表达式：==

==弧度 = ( Math.PI / 180 ) \* 角度==

<h3>二次贝塞尔曲线及三次贝塞尔曲线</h3>

```js
// 绘制二次贝塞尔曲线，cplx, cply为一个控制点，x, y结束点
quadraticCurveTo(cp1x, cp1y, x, y);

// 绘制三次贝塞尔曲线，cplx, cply 为控制点一，cp2x, cp2y为控制点二，x, y为结束点
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
```

```js
// 三次贝塞尔曲线画爱心
ctx.beginPath();
ctx.moveTo(75, 40);
ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
ctx.stroke();
```

## 使用样式和颜色

<h3>色彩 Colors</h3>

```js
// 设置图形的填充颜色
ctx.fillStyle = color;

// 设置图形轮廓的颜色
ctx.strokeStyle = color;

// 这些 fillStyle 的值均为 '橙色'
ctx.fillStyle = 'orange';
ctx.fillStyle = '#FFA500';
ctx.fillStyle = 'rgb(255,165,0)';
ctx.fillStyle = 'rgba(255,165,0,1)';
```

<h3>透明度 Transparency</h3>

```js
// 透明度，影响 canvas 里所有图形的透明度
ctx.globalAlpha = transparencyValue;
```

<h3>线型 Line Styles</h3>

```js
// 线条宽度
ctx.lineWidth = value;

// 设置线条末端样式, butt, round, square,默认 butt
ctx.lineCap = type;

// 设定线条与线条间接合处的样式
ctx.lineJoin = type;

// 限制当两条线相交时交接处最大宽度
ctx.miterLimit = value;

// 返回一个包含当前虚线样式，长度为非负偶数的数组
ctx.getLineDash();

// 设置当前虚线样式
ctx.setLineSash(segments);

// 设置虚线样式的起始偏移量
ctx.lineDashOffset = value;
```

<h3>渐变 Gradientss</h3>

```js
// 渐变的起点 (x1, y1), 终点 (x2, y2)
ctx.createLinearGradient(x1, y1, x2, y2);

// 渐变的原点 (x1, y1), 半径 r1, 另一个圆原点 (x2, y2) 半径 r2
ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);

// position 是0.0-1.0。表示渐变中颜色所在的相对位置。
// color 是一个有效的 CSS 颜色值
gradient.addColorStop(position, color);

var lineargradient = ctx.createLinearGradient(0, 0, 150, 150);
lineargradient.addColorStop(0, 'white');
lineargradient.addColorStop(1, 'black');
```

<h3>图案样式 Ptterns</h3>

```js
// image 可以是一个 Image 对象的引用，或者另一个 Canvas 对象，
// Type 必须是下面字符串值之一：repeat, repect-x, repeat-y 和 no-repeat
createPattern(image, type)

let img = new Image()
img.src = 'someImage.png'
leet ptrn = ctx.createPattern(img, 'repeat')
```

和 drawImaage 有点不同，你需要确认 image 对象已经装载完毕，否则图案可能效果不对的。

<h3>阴影 Shadows</h3>

```js
ctx.shadowOffsetX = float;
ctx.shadowOffsetY = float;

// 设定阴影的模糊程度
ctx.shadowBlur = float;

// 阴影颜色
ctx.shadowColor = color;
```

## 绘制文本

canvas 提供了两种方法绘制文本

```js
ctx.fillText(text, x, y, [, maxWidth]);

ctx.strokeText(text, x, y, [, maxWidth]);
```

<h3>有样式的文本</h3>

```js
ctx.font = '10px sans-serif'; // 文本样式 和 CSS font 语法相同

ctx.textAlign = 'start'; // 文本对齐选项 start, end, left, right, center

ctx.textBaseline = 'alphabetic'; // 基线对齐选项 top hanging middle alphabetic ideographic bottom

ctx.direction = 'inherit'; // 文本方向 ltr, rtl, inherit
```

<h3>预测量文本宽度</h3>

`ctx.measureText()`: 返回一个 `TextMetrics` 对象的宽度、所在像素

```js
let text = ctxx.measureText('foo');
text.width; // 16
```

## 使用图像 Using images

引入图像到 canvas 里需要以下两步基本操作：

1. 获得一个指向 `HTMLImageElement` 的对象或者另一个 canvas 元素的引用作为源，也可以通过提供一个 URL 的方式来使用图片
2. 使用 `drawImage()` 函数将函数绘制到画布上

<h3>获得需要绘制的图片</h3>

canvas 的 API 可以使用下面这些类型中的一种作为图片的源。

`HTMLImageElement` 这些图片是由 `Image()` 函数构造出来的，或者任何的 `<img>` 元素。

`HTMLVideoElement`: 用一个 HTML 的 `<video>` 元素作为你的图片源，可以从视频中抓取当前帧作为一个图像。

`HTMLCanvasElement`: 可以使用另一个 `<canvas>` 元素作为你的图片源。

`ImageBitmap`: 这是一个高性能的位图，可以低延迟的绘制，它可以从上述的所有源以及其他几种源中生成。

这些源统一由 `CanvasImageSource` 类型来引用。

有几种方式可以获取到我们需要在 canvas 上使用的图片

<h3>使用相同页面内的图片</h3>

我们可以通过下列方式的一种来获得与 canvas 相同页面内的图片的引用。

- `document.images`集合
- `document.getElementByTagName()` 方法
- `document.getElementById()`

<h3>使用其他域名下的图片</h3>

在 `HTMLImageElement` 上使用 `crossOrigin` 属性，你可以请求加载其他域名上的图片。如果图片的服务器允许跨域访问这个图片，那么你可以使用这个图片二不污染 canvas。

<h3>使用其他 canvas 元素</h3>

和引用页面内的图片类似的，用 `document.getElementsByTagNeme` 或 `document.getElementById` 方法来获取其他 canvas 元素，但你引入的应该是准备好的 canvas。

一个常用的应用就是将第二个 canvas 作为另一个大的 canvas 的缩略图。

<h3>由 0 开始创建图像</h3>

```js
let img = new Image();

img.onload = () => {
  // 执行 drawImage 语句
};
img.src = 'myImage.png';
```

<h2>绘制图片</h2>

一旦获得了源图对象，我们就可以使用过 `drawImage` 方法将它渲染到 canvas 里。`drawImage` 方法有三种形态，下面是最基础的一种。

`drawImage(image, x, y)`: 其中 `image` 是 image 或 canvas 对象，x, y 是其在目标 canvas 里的起始坐标。

<h3>缩放 scallimg</h3>

`drawImage` 方法的又哟变种是增加了两个用于控制图像在 canvas 中缩放的参数

`drawImage(image, x, y, width, height)`

<h3>切片 Slicing</h3>

`drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)`：前四个是定义图片源的切片位置和大小，后四个则是定义切片的目标显示位置和大小。

<h3>控制图像的缩放行为 Controlling image scalling behavior</h3>

过度缩放图像可能会导致图像模糊或像素化。您可以通过使用绘图环境的 `imageSmoothingEnabled` 属性来控制是否在缩放图像时使用平滑算法。默认值为 truee, 即启用平滑缩放。您也可以像这样禁用该功能。

```js
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
```

## 变形

<h3>状态的保存和恢复 save and restoring state</h3>

`save()` 保存画布(canvas)的所有状态

`restore()` save 和 restore 方法是用来保存和恢复 canvas 状态的，都没有参数。Canvas 的状态就是当前画面应用的所有样式和变形的一个快照。

一个绘画状态包括：

- 当前应用的变形（即移动，旋转和缩放）
- 以及下面这些属性：`strokeStyle`, `fillStyle`, `globalAlpha`, `lineWidth`, `lineCap`,`miterLimit`, `lineDashOffset`, `shadowOffsetX`, `shadowOffsetY`, `shadowBlur`, `shadowColor`, `globalCompositeOperation`, `font`, `textAlign`, `texttBaseline`, `direction`, `imageSmoothingEnabled`.
- 当前的`裁切路径(clipping path)

<h3>移动 Translating</h3>

`translate(x, y)`: 移动 canvas 和它的原点到一个不同的位置。

在做变形之前先保存状态是一个良好的习惯。

<h3>旋转 Rotating</h3>

`rotate(angle)`：旋转的角度(angle)它是顺时针方向的，以弧度为单位的值。

旋转的中心点始终是 canvas 的原点，如果要改变它，我们需要用到 ttranslate 方法。

<h3>缩放 Scaling</h3>

`scale(x, y)`: scale 方法可以缩放画布的水平和垂直的单位，两个参数都是实数，可以是负数，如果比 1 小，会缩小图形，如果比 1 大会放大图形。

如果参数是负实数，相当于以 x 或 y 轴作为对称轴镜像反转（例如，使用`scale(1, -1)`以 y 轴作为对称轴镜像翻转。

<h3>变形 Transforms</h3>

`transform(a, b, c, d, e, f)`: 这个方法是将当前的变形矩阵乘上一个基于自身参数的矩阵

- a: 水平方向的缩放
- b: 垂直方向的倾斜偏移
- c: 水平方向的倾斜偏移
- d: 垂直方向的缩放
- e: 水平方向的移动
- f: 垂直方向的移动

`setTransform(a, b, c, d, e, f)`: 这个方法会将当前的变形重置为单位矩阵，然后用相同的参数调用 `transform`方法

`resetTransform()`: 重置当前变形为单位矩阵，它和调用一下语句是一样的`ctx.setTransform(1, 0, 0, 1, 0, 0)`

## 组合 Compositing

`globalCompositeOperation`:

不仅可以在已有图形后面再画新图形，还可以用来遮盖指定区域，清除画布中的某些部分（清除区域不仅限于矩形）以及更多其他操作

`globalCompositeOperation = type`: 这个属性设定了再画新图形时采用的遮盖策略，其值是一个标识 12 种遮盖方式的字符串。

Compositing 实例:="https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Compositing/Example"

- source-over: 默认设置，在现有画布上下文之上绘制新图形
- source-in: 新图形只在新图形和目标画布重叠的地方绘制，其他都是透明的。

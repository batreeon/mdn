// 设置画布

const canvas = document.querySelector('canvas');
// 获得了一个开始画画的环境
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function randomColor() {
  return 'rgb(' + 
          random(0,255) + ',' +
          random(0,255) + ',' +
          random(0,255) + ')';
}

// 小球模型
// 小球初始坐标，水平和数值速度，颜色，半径
function Ball(x, y, velX, velY, color, r) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.r = r;
}

// 画小球
Ball.prototype.draw = function() {
  // 声明要开始画画了
  ctx.beginPath();
  ctx.fillStyle = this.color;
  // 画一个圆弧，圆心，半径，从0度到2 pi
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
  // 与beginPath对应
  ctx.fill();
}

// 移动小球位置，每一帧更新一下
Ball.prototype.update = function() {
  if ((this.x + this.r) >= width || (this.x - this.r) <= 0) {
    this.velX = -(this.velX);
  }
  if ((this.y + this.r) >= height || (this.y - this.r) <= 0) {
    this.velY = -(this.velY);
  }
  this.x += this.velX;
  this.y += this.velY;
}

// 碰撞检测，若有球与当前球碰撞，改变当前球颜色
Ball.prototype.collisionDetect = function() {
  for (let i = 0; i < balls.length; i++) {
    if (balls[i] !== this) {
      const dx = this.x - balls[i].x;
      const dy = this.y - balls[i].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.r + balls[i].r) {
        this.color = randomColor();
        balls[i].color = randomColor();
      }
    }
  }
}

// 创建ball，并存在数组里
let balls = [];
while (balls.length < 200) {
  // 半径，为了防止出错，球的初始位置距离边界大于球的半径
  let r = random(5,15);
  let ball = new Ball(
    random(0 + r, width - r),
    random(0 + r, height - r),
    random(-7, 7),
    random(-7, 7),
    randomColor(),
    r,
  );
  balls.push(ball);
}

function loop() {
  // 每次用半透明黑色遮挡住上一次，用半透明是为了能够稍微保留上一帧，可以看到轨迹
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].collisionDetect();
  }
  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
  }

  requestAnimationFrame(loop);
}

loop();


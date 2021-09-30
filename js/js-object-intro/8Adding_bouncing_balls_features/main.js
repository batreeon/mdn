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

// shape，多加了一个exists布尔值用于标记小球是否存活
function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

// 小球模型
// 小球初始坐标，水平和数值速度，颜色，半径，初始exists为true
function Ball(x, y, velX, velY, color, r) {
  Shape.call(this, x, y, velX, velY, true);
  this.color = color;
  this.r = r;
}

// 黑洞恶魔球
// 这里不继承Ball,因为恶魔球不像普通球一样每一帧都移动
function EvilCircle(x, y) {
  Shape.call(this, x, y, 20, 20, true);
  this.color = 'white';
  this.r = 10;
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
    if (balls[i] !== this && balls[i].exists) {
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

// 画evilCircle，画一个圈
EvilCircle.prototype.draw = function() {
    // 声明要开始画画了
    ctx.beginPath();
    // 圈圈壁厚度
    ctx.lineWidth = 3;
    // 画圈圈不画实心
    ctx.strokeStyle = this.color;
    // 画一个圆弧，圆心，半径，从0度到2 pi
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    // 与beginPath对应
    ctx.stroke();
}

// 检查恶魔圈是否碰到边界
EvilCircle.prototype.checkBounds = function() {
  if ((this.x + this.r) >= width) {
    this.x -= this.r;
  }
  if ((this.x - this.r) <= 0) {
    this.x += this.r;
  }
  if ((this.y + this.r) >= height) {
    this.y -= this.r;
  }
  if ((this.y - this.r) <= 0) {
    this.y += this.r;
  }
}

// 移动恶魔小球
EvilCircle.prototype.setControls = function() {
  window.onkeydown = e => {
    // switch每一分支不要忘记写break,写多了go要注意
    switch(e.key) {
      case 'a':
        this.x -= this.velX;
        break;
      case 'd':
        this.x += this.velX;
        break;
      case 'w':
        this.y -= this.velY;
        break;
      case 's':
        this.y += this.velY;
        break;
    }
  }
}

// 恶魔圈的碰撞检测
EvilCircle.prototype.collisionDetect = function() {
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      const dx = this.x - balls[i].x;
      const dy = this.y - balls[i].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= this.r + balls[i].r) {
        balls[i].exists = false;
        score--
        para.textContent = '得分: ' + score;
      }
    }
  }
}

// 创建ball，并存在数组里
let count = 200

let balls = [];
while (balls.length < count) {
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

// 实例化恶魔小球，并开始运行键盘操纵函数
let evilCircle = new EvilCircle(0.2 * width, 0.7 * height);
evilCircle.setControls();

// 初始分数等于小球个数
let score = count;
let para = document.createElement('p');
para.textContent = '得分: ' + score;
document.body.appendChild(para);

// 开始动态的执行每一帧恶魔小球的检测绘制碰撞，普通小球的碰撞检测绘制和更新下一帧的坐标
function loop() {
  // 每次用半透明黑色遮挡住上一次，用半透明是为了能够稍微保留上一帧，可以看到轨迹
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
  
  evilCircle.checkBounds();
  evilCircle.draw();
  evilCircle.collisionDetect();

  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      balls[i].collisionDetect();
    }
  }
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      balls[i].draw();
      balls[i].update();
    }
  }

  requestAnimationFrame(loop);
}

loop();
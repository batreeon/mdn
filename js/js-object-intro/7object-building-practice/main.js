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
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

// 画小球
Ball.prototype.draw = function() {
  // 声明要开始画画了
  ctx.beginPath();
  ctx.fillStyle = this.color();
  // 画一个圆弧，圆心，半径，从0度到2 pi
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  // 与beginPath对应
  ctx.fill();
}




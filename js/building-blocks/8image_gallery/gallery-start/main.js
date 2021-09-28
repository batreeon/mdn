const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* 添加图片循环 */
function show(e) {
    const imgSrc = e.target.getAttribute('src');
    displayedImage.setAttribute('src',imgSrc);
}
for (let i = 1; i <= 5; i++) {
    const newImage = document.createElement('img');
    const src = 'images/pic' + i + '.jpg';
    newImage.setAttribute('src', src);
    thumbBar.appendChild(newImage);
    // 为什么这里使用onclick属性不行呢
    newImage.addEventListener('click',show);
}


/* 编写 变暗/变量 按钮功能 */
function dark() {
    if (btn.getAttribute('class') == 'dark') {
        btn.setAttribute('class','light');
        btn.textContent = '变亮';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    }else{
        btn.setAttribute('class','dark');
        btn.textContent = '变暗';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
}

btn.addEventListener('click',dark);
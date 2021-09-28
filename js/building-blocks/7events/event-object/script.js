for (let i = 0; i < 16; i++) {
    let div = document.createElement('div');
    document.body.appendChild(div);
}

function random(n) {
    return Math.floor(Math.random()*n);
}

function bgColor(e) {
    color = 'rgb('+random(255)+','+random(255)+','+random(255)+')';
    e.target.style.backgroundColor = color;
}

let divs = document.querySelectorAll('div');
for (let i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click',bgColor);
}
let para = document.querySelector('p');
let div = document.querySelector('div');

function random(n) {
    return Math.floor(Math.random()*n);
}

div.onclick = function bgColor(e) {
    // e.stopPropagation();
    let color = 'rgb('+random(255)+','+random(255)+','+random(255)+')';
    div.style.backgroundColor = color;
}
const btn = document.querySelector('button');

function random(n) {
    return Math.floor(Math.random()*n);
}

btn.onclick = function() {
    let color = 'rgb('+random(255)+','+random(255)+','+random(255)+')';
    document.body.style.backgroundColor = color;
}
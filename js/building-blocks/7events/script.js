const btn = document.querySelector('button');

function random(n) {
    return Math.floor(Math.random()*n);
}

btn.onclick = function() {
    let color = 'rgb('+random(255)+','+random(255)+','+random(255)+')';
    document.body.style.backgroundColor = color;
}

function random1(e) {
    color = 'rgb('+random(255)+','+random(255)+','+random(255)+')';
    e.target.style.backgroundColor = color;
}

btn.addEventListener('click',random1);
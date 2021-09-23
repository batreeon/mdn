let myImg = document.querySelector('img');

myImg.onclick = function() {
    let mySrc = myImg.getAttribute('src');
    if (mySrc === 'images/firefox.jpg') {
        myImg.setAttribute('src', 'images/rose.jpg');
    }else{
        myImg.setAttribute('src', 'images/firefox.jpg');
    }
}

let myBtn = document.querySelector('button');
let myHeading = document.querySelector('h1');

function setUserName() {
    let myName = prompt('请输入你的姓名。');
    if (!myName || myName == null) {
        setUserName();
    }else{
        localStorage.setItem('name', myName);
        myHeading.textContent = 'Hello, ' + myName;
    }
}
if (localStorage.getItem('name')) {
    let storeName = localStorage.getItem('name')
    myHeading.textContent = 'Hello, ' + storeName;
}

myBtn.onclick = setUserName;
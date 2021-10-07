function timeoutPromise(interval) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve('done');
        }, interval);
    });
};

async function timeTest1() {
    await timeoutPromise(3000);
    await timeoutPromise(3000);
    await timeoutPromise(3000);
}

async function timeTest2() {
    const timeoutPromise1 = timeoutPromise(3000);
    const timeoutPromise2 = timeoutPromise(3000);
    const timeoutPromise3 = timeoutPromise(3000);

    await timeoutPromise1;
    await timeoutPromise2;
    await timeoutPromise3;
}

let startTime = Date.now();
timeTest1().then(() => {
    let finishTime = Date.now();
    let timeTaken = finishTime - startTime;
    // alert("Time taken in milliseconds: " + timeTaken);
    console.log(timeTaken);
})

startTime = Date.now();
timeTest2().then(() => {
    let finishTime = Date.now();
    let timeTaken = finishTime - startTime;
    // alert("Time taken in milliseconds: " + timeTaken);
    console.log(timeTaken);
})
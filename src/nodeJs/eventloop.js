console.log(1);
    setTimeout(function () {
        console.log(2);
        new Promise(function (resolve) {
            console.log(3);
        }).then(function () {
            console.log(4);
        })
    })
    
    new Promise(function (resolve) {
        console.log(5);
    }).then(function () {
        console.log(6);
    })
    
    setTimeout(function () {
        console.log(7);
        new Promise(function (resolve) {
            resolve(8)
        }).then(function () {
            console.log(9);
        })
    })
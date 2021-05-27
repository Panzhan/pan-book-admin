// 圣诞树

(n => {
    [...Array(n - 2)].map((_, i) => 3 + i).forEach(j => {
        [...Array(j)].map((_, k) => 1 + k).forEach(x => {
            let sc = 2 * x - 1, spc = (2 * n - 1 - sc) / 2;
            console.log(" ".repeat(spc) + "*".repeat(sc));
        });
    });
    console.log(" ".repeat(n - 1) + "*");
    // console.log("~".repeat(n - 1) + "*~#~~###~~~~##~");
})(5);
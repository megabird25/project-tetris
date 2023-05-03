const canvas1 = document.getElementById("mainScreen");
const canvas2 = document.getElementById("showNext");
const mainSreen = canvas1.getContext("2d");
const showNext = canvas2.getContext("2d");

const btnRotate = document.getElementById("rotate");
const btnLeft = document.getElementById("left");
const btnDown = document.getElementById("down");
const btnRight = document.getElementById("right");
const textScore = document.getElementById("score");
const textHighest = document.getElementById("highest");
const message = document.getElementById("message");

const apb = ["O", "I", "S", "Z", "T", "L", "J"];
let pre = [];
let objs = [];
let a, b, c, d, run;
let score = 0;
let highest = Number(localStorage.getItem("highest"));
if (highest == NaN) {
    highest = 0;
}
textHighest.innerHTML = highest;

class Boxs {
    // 儲存所有已存在方塊來做控制
    static allBoxs = [];

    constructor(x, y, type) {
        // 基本單位
        this.unit = 30;
        // 座標
        this.x = x;
        this.y = y;

        this.type = type;
        this.transform = 1;
        Boxs.allBoxs.push(this);
    }

    // 繪製主畫面方塊
    draw() {
        switch (this.type) {
            case "O":
                mainSreen.fillStyle = "green";
                break;
            case "I":
                mainSreen.fillStyle = "aqua";
                break;
            case "S":
                mainSreen.fillStyle = "orange";
                break;
            case "Z":
                mainSreen.fillStyle = "yellow";
                break;
            case "T":
                mainSreen.fillStyle = "purple";
                break;
            case "L":
                mainSreen.fillStyle = "royalBlue"
                break;
            case "J":
                mainSreen.fillStyle = "red";
                break;
        }
        mainSreen.strokeStyle = "black";
        mainSreen.fillRect(this.x * this.unit, this.y * this.unit, this.unit, this.unit);
        mainSreen.strokeRect(this.x * this.unit + 3, this.y * this.unit + 3, 24, 24);
    }

    // 繪製預覽方塊
    draw2() {
        switch (this.type) {
            case "O":
                showNext.fillStyle = "green";
                break;
            case "I":
                showNext.fillStyle = "aqua";
                break;
            case "S":
                showNext.fillStyle = "orange";
                break;
            case "Z":
                showNext.fillStyle = "yellow";
                break;
            case "T":
                showNext.fillStyle = "purple";
                break;
            case "L":
                showNext.fillStyle = "royalBlue"
                break;
            case "J":
                showNext.fillStyle = "red";
                break;
        }
        let inX, inY;
        if (this.type == "S" || this.type == "Z" || this.type == "T" || this.type == "L" || this.type == "J") {
            inX = this.x - 3.5;
            inY = this.y + 2.25;
        }else if (this.type == "O" || this.type == "I") {
            inX = this.x - 3;
            inY = this.y + 2.25;
        }
        showNext.strokeStyle = "black";
        showNext.fillRect(inX * this.unit, inY * this.unit, this.unit, this.unit);
        showNext.strokeRect(inX * this.unit + 3, inY * this.unit + 3, 24, 24);
    }
}

// 鍵盤控制事件
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            objs.forEach((obj) => {
                obj.x--;
            });
            if (check()) {
                objs.forEach((obj) => {
                    obj.x++;
                });
            }
            update();
            btnLeft.style.backgroundColor = "goldenrod";
            return;
        case "ArrowRight":
            objs.forEach((obj) => {
                obj.x++;
            });
            if (check()) {
                objs.forEach((obj) => {
                    obj.x--;
                });
            }
            update();
            btnRight.style.backgroundColor = "goldenrod";
            return;
        case "ArrowDown":
            objs.forEach((obj) => {
                obj.y++;
            });
            if (check()) {
                objs.forEach((obj) => {
                    obj.y--;
                });
            }
            update();
            btnDown.style.backgroundColor = "goldenrod";
            return;
        case "ArrowUp":
            btnRotate.style.backgroundColor = "goldenrod";
            rotate();
            if (check()) {
                if (objs[0].type == "I" || objs[0].type == "S" || objs[0].type == "Z") {
                    rotate();
                }else if (objs[0].type == "T" || objs[0].type == "L" || objs[0].type == "J") {
                    rotate();
                    rotate();
                    rotate();
                }
            }
            update();
            return;
        case "Enter":
            score = 0;
            textScore.innerHTML = score;
            message.innerHTML = "";
            clearInterval(run);
            Boxs.allBoxs.splice(0, Boxs.allBoxs.length);
            update();
            build();
            build();
            preview();
            update();
            run = setInterval(running, 300);
            return;
    }
});
window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            btnLeft.style.backgroundColor = "gold";
            return;
        case "ArrowRight":
            btnRight.style.backgroundColor = "gold";
            return;
        case "ArrowDown":
            btnDown.style.backgroundColor = "gold";
            return;
        case "ArrowUp":
            btnRotate.style.backgroundColor = "gold";
            return;
    }
});

btnLeft.addEventListener("mousedown", () => {
    objs.forEach((obj) => {
        obj.x--;
    });
    if (check()) {
        objs.forEach((obj) => {
            obj.x++;
        });
    }
    update();
    btnLeft.style.backgroundColor = "goldenrod";
});
btnRight.addEventListener("mousedown", () => {
    objs.forEach((obj) => {
        obj.x++;
    });
    if (check()) {
        objs.forEach((obj) => {
            obj.x--;
        });
    }
    update();
    btnRight.style.backgroundColor = "goldenrod";
});
btnDown.addEventListener("mousedown", () => {
    objs.forEach((obj) => {
        obj.y++;
    });
    if (check()) {
        objs.forEach((obj) => {
            obj.y--;
        });
    }
    update();
    btnDown.style.backgroundColor = "goldenrod";
});
btnRotate.addEventListener("mousedown", () => {
    btnRotate.style.backgroundColor = "goldenrod";
    rotate();
    if (check()) {
        if (objs[0].type == "I" || objs[0].type == "S" || objs[0].type == "Z") {
            rotate();
        }else if (objs[0].type == "T" || objs[0].type == "L" || objs[0].type == "J") {
            rotate();
            rotate();
            rotate();
        }
    }
    update();
});
btnLeft.addEventListener("mouseup", () => {
    btnLeft.style.backgroundColor = "gold";
});
btnRight.addEventListener("mouseup", () => {
    btnRight.style.backgroundColor = "gold";
});
btnDown.addEventListener("mouseup", () => {
    btnDown.style.backgroundColor = "gold";
});
btnRotate.addEventListener("mouseup", () => {
    btnRotate.style.backgroundColor = "gold";
});



// 流程控制
function running() {
    objs.forEach((obj) => {
        obj.y++;
    });
    if (check()) {
        objs.forEach((obj) => {
            obj.y--;
        });
        if (gameOver()) {
            clearInterval(run);
            message.innerHTML = "Game Over!!";
            return;
        }
        clearUp()
        build();
        preview();
        update();
    }
    update();
}

// 創造新的方塊
function build() {
    let type = apb[Math.floor(Math.random() * 7)];
    switch (type) {
        case "O":
            a = new Boxs(5, -1, type);
            b = new Boxs(4, -1, type);
            c = new Boxs(5, -2, type);
            d = new Boxs(4, -2, type);
            break;
        case "I":
            a = new Boxs(5, -1, type);
            b = new Boxs(6, -1, type);
            c = new Boxs(4, -1, type);
            d = new Boxs(3, -1, type);
            break;
        case "S":
            a = new Boxs(5, -1, type);
            b = new Boxs(4, -1, type);
            c = new Boxs(5, -2, type);
            d = new Boxs(6, -2, type);
            break;
        case "Z":
            a = new Boxs(5, -1, type);
            b = new Boxs(6, -1, type);
            c = new Boxs(5, -2, type);
            d = new Boxs(4, -2, type);
            break;
        case "T":
            a = new Boxs(5, -1, type);
            b = new Boxs(5, -2, type);
            c = new Boxs(6, -1, type);
            d = new Boxs(4, -1, type);
            break;
        case "L":
            a = new Boxs(5, -1, type);
            b = new Boxs(4, -1, type);
            c = new Boxs(6, -1, type);
            d = new Boxs(6, -2, type);
            break;
        case "J":
            a = new Boxs(5, -1, type);
            b = new Boxs(4, -1, type);
            c = new Boxs(6, -1, type);
            d = new Boxs(4, -2, type);
            break;
    }
    objs = pre;
    pre = [a, b, c, d];
    return;
}

// 更新整個畫面
function update() {
    mainSreen.fillStyle = "black";
    mainSreen.fillRect(0, 0, 300, 600);
    Boxs.allBoxs.forEach((box) => {
        box.draw();
    });
}

// 下一個方塊預覽設置
function preview() {
    showNext.fillStyle = "black";
    showNext.fillRect(0, 0, 120, 80);
    pre.forEach((obj) => {
        obj.draw2();
    })
}

// 旋轉方塊
function rotate() {
    switch (objs[0].type) {
        case "I":
            if (objs[0].transform == 1) {
                objs[0].x -= 1;
                objs[0].y += 1;
                objs[1].x -= 2;
                objs[1].y += 2;
                objs[3].x += 1;
                objs[3].y -= 1;
                objs.forEach((obj) => {
                    obj.transform = 2;
                });
            }else {
                objs[0].x += 1;
                objs[0].y -= 1;
                objs[1].x += 2;
                objs[1].y -= 2;
                objs[3].x -= 1;
                objs[3].y += 1;
                objs.forEach((obj) => {
                    obj.transform = 1;
                });
            }
            break;
        case "S":
            if (objs[0].transform == 1) {
                objs[0].x -= 1;
                objs[0].y -= 1;
                objs[1].y -= 2;
                objs[3].x -= 1;
                objs[3].y += 1;
                objs.forEach((obj) => {
                    obj.transform = 2;
                });
            }else {
                objs[0].x += 1;
                objs[0].y += 1;
                objs[1].y += 2;
                objs[3].x += 1;
                objs[3].y -= 1;
                objs.forEach((obj) => {
                    obj.transform = 1;
                });
            }
            break;
        case "Z":
            if (objs[0].transform == 1) {
                objs[0].x -= 1;
                objs[0].y -= 1;
                objs[1].x -= 2;
                objs[3].x += 1;
                objs[3].y -= 1;
                objs.forEach((obj) => {
                    obj.transform = 2;
                });
            }else {
                objs[0].x += 1;
                objs[0].y += 1;
                objs[1].x += 2;
                objs[3].x -= 1;
                objs[3].y += 1;
                objs.forEach((obj) => {
                    obj.transform = 1;
                });
            }
            break;
        case "T":
            if (objs[0].transform == 1) {
                objs[2].x -= 1;
                objs[2].y += 1;
                objs.forEach((obj) => {
                    obj.transform = 2;
                });
            }else if (objs[0].transform == 2) {
                objs[1].x += 1;
                objs[1].y += 1;
                objs.forEach((obj) => {
                    obj.transform = 3;
                });
            }else if (objs[0].transform == 3) {
                objs[3].x += 1;
                objs[3].y -= 1;
                objs.forEach((obj) => {
                    obj.transform = 4;
                });
            }else if (objs[0].transform == 4) {
                objs[1].x -= 1;
                objs[1].y -= 1;
                objs[2].x += 1;
                objs[2].y -= 1;
                objs[3].x -= 1;
                objs[3].y += 1;
                objs.forEach((obj) => {
                    obj.transform = 1;
                });
            }
            break;
        case "L":
            if (objs[0].transform == 1) {
                objs[0].y -= 1;
                objs[1].x += 1;
                objs[2].x -= 1;
                objs[2].y -= 2;
                objs[3].x -= 2;
                objs[3].y -= 1;
                objs.forEach((obj) => {
                    obj.transform = 2;
                });
            }else if (objs[0].transform == 2) {
                objs[1].x += 1;
                objs[1].y -= 1;
                objs[2].x -= 1;
                objs[2].y += 1;
                objs[3].y += 2;
                objs.forEach((obj) => {
                    obj.transform = 3;
                });
            }else if (objs[0].transform == 3) {
                objs[0].x -= 1;
                objs[1].x -= 2;
                objs[1].y -= 1;
                objs[2].y += 1;
                objs[3].x += 1;
                objs.forEach((obj) => {
                    obj.transform = 4;
                });
            }else if (objs[0].transform == 4) {
                objs[0].x += 1;
                objs[0].y += 1;
                objs[1].y += 2;
                objs[2].x += 2;
                objs[3].x += 1;
                objs[3].y -= 1;
                objs.forEach((obj) => {
                    obj.transform = 1;
                });
            }
            break;
        case "J":
            if (objs[0].transform == 1) {
                objs[0].y -= 1;
                objs[1].x += 1;
                objs[2].x -= 1;
                objs[2].y -= 2;
                objs[3].y += 1;
                objs.forEach((obj) => {
                    obj.transform = 2;
                });
            }else if (objs[0].transform == 2) {
                objs[1].x += 1;
                objs[1].y -= 1;
                objs[2].x -= 1;
                objs[2].y += 1;
                objs[3].x += 2;
                objs.forEach((obj) => {
                    obj.transform = 3;
                });
            }else if (objs[0].transform == 3) {
                objs[0].x -= 1;
                objs[1].x -= 2;
                objs[1].y -= 1;
                objs[2].y += 1;
                objs[3].x -= 1;
                objs[3].y -= 2;
                objs.forEach((obj) => {
                    obj.transform = 4;
                });
            }else if (objs[0].transform == 4) {
                objs[0].x += 1;
                objs[0].y += 1;
                objs[1].y += 2;
                objs[2].x += 2;
                objs[3].x -= 1;
                objs[3].y += 1;
                objs.forEach((obj) => {
                    obj.transform = 1;
                });
            }
            break;
    }
}

// 碰撞規則判定 (forEach 不會有回傳值所以不能用)
function check() {
    for (let i = 0; i < objs.length; i++) {
        if (objs[i].x < 0 || objs[i].x >= 10 || objs[i].y >= 20) {
            return true;
        }
    }
    for (i = 0; i < Boxs.allBoxs.length - 8; i++) { // -8是不包含預備的和控制的 boxs
        for (let j = 0; j < objs.length; j++) {
            if (objs[j].x == Boxs.allBoxs[i].x && objs[j].y == Boxs.allBoxs[i].y) {
                return true;
            }
        }
    }
    return false;
}

// 判定是否消除方塊並計分
function clearUp() {
    let board = [];
    for (let i = 0; i < 20; i++) {
        let arr = [];
        for (let j  = 0; j < 10; j++) {
            arr.push(null);
        }
        board.push(arr);
    }

    for (let i = 0; i < Boxs.allBoxs.length - 4; i++) { // -4是不包含預備的 Boxs
        board[Boxs.allBoxs[i].y][Boxs.allBoxs[i].x] = Boxs.allBoxs[i];
    }

    let counter = 0; // 計算單次消除 row 的數量
    for (let i = 0; i < 20; i++) {
        let b = 0;
        for (let j  = 0; j < 10; j++) {
            if (board[i][j] == null) {break;}
            b++;
        }
        // 如果 array 裡面沒有 null 則消除 Boxs
        if (b == 10) {
            board[i].forEach((box) => {
                Boxs.allBoxs.splice(Boxs.allBoxs.lastIndexOf(box), 1);
            });
            for (let k = i - 1; k >= 0; k--) {
                board[k].forEach((ele) => {
                    if (ele != null) {
                        ele.y++;
                    }
                });
            }
            counter++;
        }
    }
    if (counter > 0) {
        score += Math.pow(2, counter) * 10;
        textScore.innerHTML = score;
        if (score > highest) {
            localStorage.setItem("highest", score);
            textHighest.innerHTML = score;
        }
    }
}

// 遊戲結束判定
function gameOver() {
    for (let i = 0; i < objs.length; i++) {
        if (objs[i].y < 0) {
            return true;
        }
    }
    return false
}
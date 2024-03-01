let numCircles = 10;
let circles = [];


class Circle {
    constructor(x, y) {
        this.sex = (Math.random()>0.5) ? 'Male' :'Female'; 
        this.lifeSpan = Math.random() *200/circles.length; // 10〜30秒の間でランダムに寿命を設定
        this.creationTime = new Date();
        this.x = x;
        this.y = y;
        this.dx = random(-2, 2); // X軸方向の速度
        this.dy = random(-2, 2); // Y軸方向の速度
        this.diameter = 20; // 円の直径
        this.canBirth = true;
        this.updateElapsedTime();
    }

    updateElapsedTime() {
        const currentTime = Date.now(); // 現在のタイムスタンプを取得
        this.age = (currentTime - this.creationTime) / 1000; // 経過した時間を秒単位で計算
        this.normalAge = this.age / this.lifeSpan;
    }
}

function setup() {
    createCanvas(800, 800);
    transparency = 0;
    // サークルの初期化
    for (let i = 0; i < numCircles; i++) {
        x = random(width)
        y = random(height)
        createCircle(x, y);
    }
}

function draw() {
    background(220);
    
    // 各円を描画し、移動させる
    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        let parent1 = circles[i];
        circle.updateElapsedTime();
        if (!circle.canBirth){
            fillcolor = color(128, 128, 128, (1-circle.normalAge)*255); 
        }
        else{
            if (circle.sex === 'Male') {
                fillcolor = color(0, 0, 255, (1-circle.normalAge)*255);
            }
            else {
                fillcolor = color(255, 0, 0, (1-circle.normalAge)*255);
            }
        }
        fill(fillcolor); 
        // 円を描画
        noStroke();
        ellipse(circle.x, circle.y, circle.diameter);
        
        // 位置を更新
        circle.x += circle.dx;
        circle.y += circle.dy;
        
        // 画面端で跳ね返る処理
        if (circle.x < 0 || circle.x > width) {
        circle.dx *= -1;
        }
        if (circle.y < 0 || circle.y > height) {
        circle.dy *= -1;
        }
        for (var j = 0; j < circles.length; j++) {
            var parent2 = circles[j];
            if (i !== j 
                && isColliding(parent1, parent2) 
                && parent1.sex !== parent2.sex 
                && parent1.canBirth
                && parent2.canBirth) {
                    createCircle((parent1.x + parent2.x) / 2, (parent1.y + parent2.y) / 2);
                    parent1.canBirth = false;
                    parent2.canBirth = false;
                    break;
            }
        }
    }
    deleteCircle();
}

function isColliding(circle1, circle2) {
    var dx = circle1.x - circle2.x;
    var dy = circle1.y - circle2.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 20 ;
}
function createCircle(x, y) {
    let circle = new Circle(x, y); // Create a new circle object
    circles.push(circle); // Push the new circle object to the array
}
function deleteCircle() {
    for (var i = 0; i < circles.length; i++) {
        if (circles[i].age > circles[i].lifeSpan) {
            circles.splice(i, 1);
            console.log(circles.length)
        }
    }
}
function mouseClicked() {
    // マウスがクリックされたときに実行される関数
    createCircle(mouseX, mouseY);
}


setInterval(() => {
    for (var i = 0; i < circles.length; i++) {
        circles[i].canBirth = true;
    }
}, 1000);
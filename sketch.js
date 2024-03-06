
let numCircles = 10; // サークルの数
let circles = [];
let isAnimating = false;    
let environmentNum = 200;
let speed = 2;

class Circle {
    constructor(x, y) {
        this.sex = (Math.random()>0.5) ? 'Male' :'Female'; 
        this.lifeSpan = Math.random() * environmentNum / circles.length;
        this.lifeSpan = Math.min(this.lifeSpan, 20);
        this.creationTime = new Date();
        this.x = x;
        this.y = y;
        this.dx = random(-speed, speed); // X軸方向の速度
        this.dy = random(-speed, speed); // Y軸方向の速度
        this.diameter = 10; // 円の直径
        this.canBirth = true;
        this.updateElapsedTime();
        this.elapsedTime = 0;
        this.birthCooldown = 500; // 5秒
    }

    updateElapsedTime() {
        //正規化年齢の更新
        const currentTime = Date.now(); 
        this.age = (currentTime - this.creationTime) / 1000; 
        this.normalAge = this.age / this.lifeSpan;
        
        //指定時間経過後に再び出産可能にする
        if (!this.canBirth) {
            this.elapsedTime += deltaTime; 
            if (this.elapsedTime >= this.birthCooldown) {
                this.canBirth = true;
                this.elapsedTime = 0; 
            }
        }
    }
}

function setup() {
    const container = document.getElementById('sketch-container');
    canvas = createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent('sketch-container');
    document.getElementById('startAnimationButton').addEventListener('click', startAnimation);
    document.getElementById('stopAnimationButton').addEventListener('click', stopAnimation);
    background(40,46,61);
    transparency = 0;
    // サークルの初期化
    for (let i = 0; i < numCircles; i++) {
        x = random(width)
        y = random(height)
        createCircle(x, y);
    }
}

function draw() {
    if (isAnimating){
        play();
    }

}

function play(){
        background(40,46,61); //画面のリセット
        //console.log(circles.length);
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
            //console.log(circles.length)
        }
    }
}
/*function mouseClicked() {
    // マウスがクリックされたときに実行される関数
    createCircle(mouseX, mouseY);
}
function touchStarted() {
    // 画面タッチされたときに実行される関数
    createCircle(mouseX, mouseY);
}*/
function windowResized() {
    const container = document.getElementById('sketch-container');
    resizeCanvas(container.offsetWidth, container.offsetHeight);
}

function startAnimation() {
    // アニメーションフラグをtrueに設定して、アニメーションを開始する
    isAnimating = true;
    environmentNum = envNumSlider.value;
    speed = speedNumSlider.value;
    circles = [];
    numCircles = circleNumSlider.value;
    for (let i = 0; i < numCircles; i++) {
        x = random(width)
        y = random(height)
        createCircle(x, y);
    }
}
function stopAnimation() {
    // アニメーションフラグをfalseに設定して、アニメーションを停止する
    isAnimating = false;
}
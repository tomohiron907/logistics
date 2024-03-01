// script.js

// Get the canvas element and its context
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// Array to hold circle objects
var circles = [];



class Circle {
    constructor(x, y) {
        this.sex = this.generateRandomGender();
        this.creationTime = new Date(); // インスタンスが生成された時間を記録
        //this.age = 0;
        this.lifeSpan = Math.random() * 20 + 10; // 10〜30秒の間でランダムに寿命を設定
        
        this.canBirth = true;
        this.updateElapsedTime();
        this.radius = 10;
        this.x = x;
        this.y = y;
        this.dx = (Math.random() - 0.5) * 4; // Random speed in x-direction
        this.dy = (Math.random() - 0.5) * 4; // Random speed in y-direction
        //this.color = this.sex === 'Male' ? 'blue' : 'red'; // Blue for male, pink for female
    }
    generateRandomGender() {
        const genders = ['Male', 'Female'];
        return genders[Math.floor(Math.random() * genders.length)];
    }

    updateElapsedTime() {
        setInterval(() => {
            const currentTime = Date.now(); // 現在のタイムスタンプを取得
            this.age = (currentTime - this.creationTime) / 1000; // 経過した時間を秒単位で計算
            this.normalAge = this.age / this.lifeSpan;
        }, 1000); // 1秒ごとに経過時間を更新
    }
}


// Function to create a new circle object
function createCircle(x, y) {
    var circle = new Circle(x, y); // Create a new circle object
    circles.push(circle); // Push the new circle object to the array
}

function deleteCircle() {
    
    for (var i = 0; i < circles.length; i++) {
        if (circles[i].age > circles[i].lifeSpan) {
            circles.splice(i, 1);
            console.log(circles.length)
            //createCircle();
        }
    }
}

// Function to detect collision between circles
function isColliding(circle1, circle2) {
    var dx = circle1.x - circle2.x;
    var dy = circle1.y - circle2.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return distance < circle1.radius + circle2.radius;
}

// Function to draw all circles on the canvas
function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    for (var i = 0; i < circles.length; i++) {
        var circle = circles[i];
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius , 0, Math.PI * 2);
        var alpha = 1 - circle.normalAge;
        if (circle.sex === 'Male'){
            //ctx.fillStyle = `rgba(0, 0, 255, ${alpha})`;
            ctx.fillStyle = 'blue'
            ctx.fillStyle = `rgba(0, 0, 255, ${alpha})`;
        }
        else {
            //ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`;
            ctx.fillStyle = 'red'
            ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`;
        }
        if (circle.canBirth === false) {
            ctx.fillStyle = 'gray';
        }
        ctx.fill();
        ctx.closePath();
    }
}

// Function to update the position of all circles
function updateCircles() {
    for (var i = 0; i < circles.length; i++) {
        var circle = circles[i];
        var parent1 = circles[i];
        // Update position
        circle.x += circle.dx;
        circle.y += circle.dy;

        // Bounce off walls
        if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
            circle.dx = -circle.dx;
        }
        if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
            circle.dy = -circle.dy;
        }

        // Check for collision with other circles
        for (var j = 0; j < circles.length; j++) {
            var parent2 = circles[j];
            if (i !== j 
                && isColliding(parent1, parent2) 
                && parent1.sex !== parent2.sex 
                && parent1.canBirth 
                && parent2.canBirth) {
                
                createCircle(parent1.x + 10, parent1.y + 10);
                parent1.canBirth = false; 
                parent2.canBirth = false;

                break;
            }
        }
    }
}

// Function to animate the circles
function animate() {
    requestAnimationFrame(animate); // Request animation frame

    updateCircles(); // Update circle positions
    drawCircles(); // Draw circles
    deleteCircle();
}

// Create initial circles
for (var i = 0; i < 10; i++) {
    x = Math.random() * (canvas.width - 2 * 10) + 10; // Random x-coordinate
    y = Math.random() * (canvas.height - 2 * 10) + 10; // Random y-coordinate
    createCircle(x, y);
}

animate(); // Start animation
setInterval(() => {
    for (var i = 0; i < circles.length; i++) {
        circles[i].canBirth = true;
    }
}, 500);
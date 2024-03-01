// ウィンドウのリサイズイベントを監視
window.addEventListener('resize', function () {
    // ウィンドウの幅と高さを取得
    var width = window.innerWidth;
    var height = window.innerHeight;
    
    // カメラのアスペクト比を更新
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // レンダラーのサイズを更新
    renderer.setSize(width, height);
});


const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
// Set up camera position
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight/2);
//document.body.appendChild(renderer.domElement);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Create boundary box
const boundarySize = 5;
const boundaryGeometry = new THREE.PlaneGeometry(boundarySize, boundarySize);
const boundaryMaterial = new THREE.MeshBasicMaterial({ color: 0x2b2b2b, side: THREE.DoubleSide });
const boundary = new THREE.Mesh(boundaryGeometry, boundaryMaterial);
scene.add(boundary);

class Circle extends THREE.Mesh {
    constructor(x, y) {
        const sex = (Math.random()>0.5) ? 'Male' :'Female'; 
        let circleMaterial; // マテリアルを宣言
        if (sex === 'Male') {
            circleMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // 青色
        } else {
            circleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // 赤色
        }
        const circleGeometry = new THREE.CircleGeometry(radius, 32);
        super(circleGeometry, circleMaterial); // super を呼び出す前に circleMaterial をセット
        this.position.x = x;
        this.position.y = y;
        this.velocity = new THREE.Vector2(Math.random() * radius - radius/2, Math.random() * radius - radius/2);

        this.sex = sex;
        this.creationTime = new Date(); // インスタンスが生成された時間を記録
        this.lifeSpan = Math.random() * 200 /circles.length ; // 10〜30秒の間でランダムに寿命を設定
        this.canBirth = true;
        this.updateElapsedTime();
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
    
            // this.canBirthがfalseの場合、色を灰色に変更
            if (!this.canBirth) {
                this.material.color.setHex(0x808080); // 灰色
            } else {
                let alpha = 1 - this.normalAge; // 透明度を設定（1からnormalAgeを引くことで、1に近づくほど透明度が高くなる）
                if (this.sex === 'Male') {
                    this.material.color.setHex(0x0000ff); // 青色
                } else {
                    this.material.color.setHex(0xff0000); // 赤色
                }
                this.material.transparent = true; // 透明度を設定するために必要
                this.material.opacity = alpha; // 透明度を設定
            }
        }, 1000); // 1秒ごとに経過時間を更新
    }
}


// Create circles
const circles = [];
const circleCount = 20;
const radius = 0.05;
for (let i = 0; i < circleCount; i++) {
    x = Math.random() * boundarySize - boundarySize / 2;
    y = Math.random() * boundarySize - boundarySize / 2;
    createCircle(x, y);
}
function createCircle(x, y) {
    var circle = new Circle(x, y); // Create a new circle object
    circles.push(circle); // Push the new circle object to the array
    scene.add(circle);
}
function deleteCircle() {
    for (var i = 0; i < circles.length; i++) {
        if (circles[i].age > circles[i].lifeSpan) {
            scene.remove(circles[i]);
            circles.splice(i, 1);
            console.log(circles.length)
            
        }
    }
}
function isColliding(circle1, circle2) {
    var dx = circle1.position.x - circle2.position.x;
    var dy = circle1.position.y - circle2.position.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 2 * radius;
}


// Render loop
function animate() {
    requestAnimationFrame(animate);
    // Update circles' positions and handle boundary reflection
    for (var i = 0; i < circles.length; i++) {
        var circle = circles[i];
        var parent1 = circles[i];
        circle.position.x += circle.velocity.x;
        circle.position.y += circle.velocity.y;

        // Check boundary collision and perform reflection
        if (circle.position.x >= boundarySize / 2-0.1 || circle.position.x <= -boundarySize / 2+0.1) {
            circle.velocity.x *= -1;
        }
        if (circle.position.y >= boundarySize / 2-0.1 || circle.position.y <= -boundarySize / 2+0.1) {
            circle.velocity.y *= -1;
        }

        // Check for collision with other circles
        for (var j = 0; j < circles.length; j++) {
            var parent2 = circles[j];
            if (i !== j 
                && isColliding(parent1, parent2) 
                && parent1.sex !== parent2.sex 
                && parent1.canBirth 
                && parent2.canBirth) {
                
                createCircle(parent1.position.x + 0.1, parent1.position.y + 0.1);
                parent1.canBirth = false; 
                parent2.canBirth = false;
                
                break;
            }
        }
    }
    
    deleteCircle();

    renderer.render(scene, camera);
}
animate();
setInterval(() => {
    for (var i = 0; i < circles.length; i++) {
        circles[i].canBirth = true;
    }
}, 200);

const circleNumSlider = document.getElementById('circleNumSlider');
circleNumSlider.oninput = function() {
    const circleNum = document.getElementById('circleNumValue');
    circleNum.textContent = circleNumSlider.value;
}


const envNumSlider = document.getElementById('environmentConstSlider');
envNumSlider.oninput = function() {
    const envNum = document.getElementById('environmentConstValue');
    envNum.textContent = envNumSlider.value;
}

const speedNumSlider = document.getElementById('speedSlider');
speedNumSlider.oninput = function() {
    const speedNum = document.getElementById('speedValue');
    speedNum.textContent = speedNumSlider.value;
}
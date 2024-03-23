var ctx = document.getElementById('myChart').getContext('2d');
var chartContainer = document.getElementById('chart-container');

let labels = [];
let data = [];

chartContainer.appendChild(ctx.canvas);
document.getElementById('startAnimationButton').addEventListener('click', resetChart);
document.getElementById('stopAnimationButton').addEventListener('click', resetChart);

var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Number of Circles',
        data: data,
        backgroundColor: 'rgba(0, 125, 251, 1)',
        borderColor: 'rgba(0, 125, 251, 1)',
        borderWidth: 2,
        pointRadius: 0 // ポイントの半径を0に設定
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

setInterval(() => {
    if (isAnimating){
        const now = new Date();
        labels.push(Math.round((Date.now() - startTime) / 1000));
        data.push(circles.length);
        // グラフを更新
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
    }
    chart.update();
}, 1000);

function resetChart() {
    startTime = Date.now();
    labels = []; // ラベルをクリア
    data = []; // データをクリア
    
    chart.data.labels = []; // ラベルをクリア
    chart.data.datasets.forEach((dataset) => {
      dataset.data = []; // データをクリア
    });
    chart.update(); // グラフを再描画

}

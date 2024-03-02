// main.js

// グラフの初期化
// グラフの初期化
var ctx = document.createElement('canvas').getContext('2d');
var chartContainer = document.getElementById('chart-container');
chartContainer.appendChild(ctx.canvas);
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Real-time Data',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        },
        backgroundColor: 'black'
    }
});

// リアルタイムデータの更新
setInterval(function() {
    // データを生成する部分。ここではランダムな数値を使用します。
    var newDataPoint = circles.length;

    // データを追加し、古いデータが削除されるようにします。
    chart.data.labels.push('');
    chart.data.datasets[0].data.push(newDataPoint);
    

    // グラフを更新
    chart.update();
}, 500); // 1000ミリ秒ごとに更新

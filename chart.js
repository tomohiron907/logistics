// main.js

// グラフの初期化
// グラフの初期化
var ctx = document.createElement('canvas').getContext('2d');
var chartContainer = document.getElementById('chart-container');

chartContainer.appendChild(ctx.canvas);
document.getElementById('startAnimationButton').addEventListener('click', resetChart);
document.getElementById('stopAnimationButton').addEventListener('click', resetChart);

var chart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: [],
    datasets: [{
        label: 'Number of Circles',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // グラフの背景色
        borderColor: 'rgba(0, 125, 251, 1)', // グラフの枠線色
        borderWidth: 2,
        pointStyle: 'line', // ポイントを線で表示し、点を非表示にする
        pointRadius: 0 // ポイントの半径を0に設定
    }]
    },
    options: {
        scales: {
            x: {
                type: 'linear', 
                title: {
                    display: true,
                    text: 'Time[s]', // x軸のラベルテキスト
                    color: 'white' // x軸ラベルの色を赤に設定
                },
                beginAtZero: false,
                ticks: {
                    color: 'white' // y軸ラベルの色を青に設定
                },
                grid: {
                    color: 'rgba(100, 100, 100, 0.5)' // x軸のグリッド線の色
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of circles', // x軸のラベルテキスト
                    color: 'white' // x軸ラベルの色を赤に設定
                },
                beginAtZero: true,
                ticks: {
                    color: 'white' // y軸ラベルの色を青に設定
                },
                grid: {
                    color: 'rgba(100, 100, 100, 0.5)' // x軸のグリッド線の色
                }
            }

        },
        plugins: {
            streaming: { // リアルタイムプロット用のプラグイン
                frameRate: 30 // フレームレートの設定
            },
            legend: {
                display: false // legendを非表示にする
            }
        },
        layout: {
            padding: {
              left: 0, // 左のマージン
              right: 25, // 右のマージン
              top: 25, // 上のマージン
              bottom: 0 // 下のマージン
            }
          },
    }
});

// 1秒ごとに新しいデータを追加する関数
setInterval(function() {
    if (isAnimating){
        chart.data.labels.push(Math.round((Date.now() - startTime) / 1000)); 
        chart.data.datasets[0].data.push(circles.length); // ランダムなデータを追加

        // グラフが最大300ポイントに保つように調整
        if (chart.data.labels.length > 300) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
        }

        chart.update(); // グラフを更新
    }
}, 1000); // 1秒ごとに実行

function resetChart() {
    startTime = Date.now();
    chart.data.labels = []; // ラベルをクリア
    chart.data.datasets.forEach((dataset) => {
      dataset.data = []; // データをクリア
    });
    chart.update(); // グラフを再描画
}

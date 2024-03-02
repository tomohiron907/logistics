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
        label: 'Number of Circles',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // グラフの背景色
        borderColor: 'rgba(54, 162, 235, 1)', // グラフの枠線色
        borderWidth: 1,
        pointStyle: 'line', // ポイントを線で表示し、点を非表示にする
        pointRadius: 0 // ポイントの半径を0に設定
    }]
    },
    options: {
    scales: {
        xAxes: [{
        type: 'realtime', // x軸をリアルタイムに更新
        }],
        yAxes: [{
        scaleLabel: {
            display: true,
            labelString: 'Value'
        }
        }],
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        streaming: { // リアルタイムプロット用のプラグイン
        frameRate: 30 // フレームレートの設定
        }
    }
    }
});

// 1秒ごとに新しいデータを追加する関数
setInterval(function() {
    if (isAnimating){
        chart.data.labels.push(new Date().toLocaleTimeString()); // 現在の時刻をラベルとして追加
        chart.data.datasets[0].data.push(circles.length); // ランダムなデータを追加

        // グラフが最大300ポイントに保つように調整
        if (chart.data.labels.length > 300) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
        }

        chart.update(); // グラフを更新
    }
}, 1000); // 1秒ごとに実行
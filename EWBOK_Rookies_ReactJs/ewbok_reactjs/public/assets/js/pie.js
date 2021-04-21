//var ctx = document.getElementById("piechart").getContext('2d');
new Chart(document.getElementById("piechart").getContext('2d'),{
    type: 'pie',
    data: {
        labels: ["Green", "Blue", "Gray", "Purple", "Yellow", "Red", "Black"],
        datasets: [{
            backgroundColor: [
        "#2ecc71",
        "#3498db",
        "#95a5a6",
        "#9b59b6",
        "#f1c40f",
        "#e74c3c",
        "#34495e"
      ],
            data: [12, 19, 3, 17, 28, 24, 7]
    }]
    },
    options: {
        responsive: true,
        legend: {
            position: 'top',
        },
    }
});
//var myChart = new Chart(ctx, {
//    type: 'pie',
//    data: {
//        labels: ["Green", "Blue", "Gray", "Purple", "Yellow", "Red", "Black"],
//        datasets: [{
//            backgroundColor: [
//        "#2ecc71",
//        "#3498db",
//        "#95a5a6",
//        "#9b59b6",
//        "#f1c40f",
//        "#e74c3c",
//        "#34495e"
//      ],
//            data: [12, 19, 3, 17, 28, 24, 7]
//    }]
//    },
//    options: {
//        responsive: true,
//        legend: {
//            position: 'top',
//        },
//    }
//});

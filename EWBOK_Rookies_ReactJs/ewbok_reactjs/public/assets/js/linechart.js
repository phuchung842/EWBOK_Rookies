new Chart(document.getElementById("linechart"), {
	type: 'line',
	data: {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [{
			label: 'My First dataset',
			backgroundColor: '#000080',
			borderColor: '#000080',
			data: [30,10,70,15,60,20,70,80],
			fill: false,
		}, {
			label: 'My Second dataset',
			fill: false,
			backgroundColor: '#800080',
			borderColor: '#800080',
			data: [10,40,20,35,25,50,10,70],
		}]
	},
	options: {
		responsive: true,
		// title: {
		// 	display: true,
		// 	text: 'Chart.js Line Chart'
		// },
		tooltips: {
			mode: 'index',
			intersect: false,
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Month'
				}
			}],
			yAxes: [{
                ticks: {
                beginAtZero: true
                },
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Value'
                }
			}]
		}
    }
});

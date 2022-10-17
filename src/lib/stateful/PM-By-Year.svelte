<section>
    <div class="chartCard">
        <div class="chartBox">
            <canvas id="myChart" bind:this={chartCanvas}></canvas>
        </div>
    </div>
    <div class="flex w-full py-20 justify-center">
        <a class="bg-red-700 text-white py-4 px-20" href="./namp-dataset.csv">Download CSV</a>
        <div class="w-4"></div>
        <a class="bg-red-700 text-white py-4 px-20">Download Image</a>
    </div>
    
</section>

<script>
    import { Chart, registerables } from 'chart.js';
    Chart.register(...registerables);
    import { pmFilteredByDataTables } from '../../store.js';
    import { onMount } from 'svelte';

    let chartCanvas;
    let myChart;

    const unsubscribe = pmFilteredByDataTables.subscribe((val)=>{ 
        data.datasets[0].data = val;
        data.datasets[1].data = val;
        if(myChart) myChart.update('none');
    });

    // data block
    const data = {
    labels: [],
    datasets: [
        {
        label: 'PM-10',
        data: [],
        backgroundColor: ['rgba(255, 99, 132, 1)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        borderWidth: 1
      },
      {
        label: 'PM-25',
        data: [],
        backgroundColor: ['rgba(255, 159, 64, 1)'],
        borderColor: ['rgba(255, 159, 64, 1)'],
        borderWidth: 1,
        parsing: {
            yAxisKey: 'pm25'
        }
      },
    ]};

    onMount(async => {
        // init render block
        myChart = new Chart(
        chartCanvas, {
            // config block
            type: 'bar',
            data: 
                data,
                options: {
                    parsing: {
                        xAxisKey: 'city',
                        yAxisKey: 'pm10'
                    },
                    indexAxis: 'x',
                    scales: {
                        y: {
                            stacked: true, 
                            beginAtZero: true,
                            // ticks: {
                            //     callback: function(value, index, ticks) {
                            //         return '$' + value;
                            //     }
                            // }
                        },
                        x: {
                            stacked: true,
                        }
                    }, // scales end
                    transitions: {
                        show: {
                            animations: {
                            x: {from: 0},
                            y: {from: 0}
                            }
                        },
                        hide: {
                            animations: {
                            x: { to: 0 },
                            y: { to: 0 }
                            }
                        }
                    }, // end transitions
                    plugins : {
                        tooltip:{
                            // Disable the on-canvas tooltip
                            enabled: false,
                            external: function(context) {
                                // Tooltip Element
                                let tooltipEl = document.getElementById('chartjs-tooltip');
                                //// console.log('-------------------ELEMENT------------------')
                                //// console.log(tooltipEl)

                                // Create element on first render
                                if (!tooltipEl) {
                                    tooltipEl = document.createElement('div');
                                    tooltipEl.id = 'chartjs-tooltip';
                                    tooltipEl.innerHTML = '<table></table>';
                                    document.body.appendChild(tooltipEl);
                                }

                                // Hide if no tooltip
                                const tooltipModel = context.tooltip;
                                //// console.log('-------------------MODEL------------------')
                                //// console.log(tooltipModel)
                                if (tooltipModel.opacity === 0) {
                                    tooltipEl.style.opacity = "0";
                                    return;
                                }

                                // Set caret Position
                                tooltipEl.classList.remove('above', 'below', 'no-transform');
                                if (tooltipModel.yAlign) {
                                    tooltipEl.classList.add(tooltipModel.yAlign);
                                } else {
                                    tooltipEl.classList.add('no-transform');
                                }

                                function getBody(bodyItem) {
                                    return bodyItem.lines;
                                }

                                // Set Text
                                if (tooltipModel.body) {
                                    const titleLines = tooltipModel.title || [];
                                    const bodyLines = tooltipModel.body.map(getBody);

                                    let innerHtml = '<thead>';

                                    titleLines.forEach(function(title) {
                                        innerHtml += '<tr><th>' + title + '</th></tr>';
                                    });
                                    innerHtml += '</thead><tbody>';

                                    bodyLines.forEach(function(body, i) {
                                        const colors = tooltipModel.labelColors[i];
                                        let style = 'background:' + colors.backgroundColor;
                                        style += '; border-color:' + colors.borderColor;
                                        style += '; border-width: 2px';
                                        const span = '<span style="' + style + '"></span>';
                                        innerHtml += '<tr><td>' + span + body + '</td></tr>';
                                    });
                                    innerHtml += '</tbody>';

                                    let tableRoot = tooltipEl.querySelector('table');
                                    tableRoot.innerHTML = innerHtml;
                                }

                                const position = context.chart.canvas.getBoundingClientRect();
                                // const bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);

                                // Display, position, and set styles for font
                                tooltipEl.style.opacity = "1";
                                tooltipEl.style.position = 'absolute';
                                tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                                tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - 40 + 'px';
                                // tooltipEl.style.font = bodyFont.string;
                                // tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                                tooltipEl.style.pointerEvents = 'none';
                            }
                        }, // tooltip end
                    }, // plugins end
                } // options end
        }); // chart element end
    });
</script>
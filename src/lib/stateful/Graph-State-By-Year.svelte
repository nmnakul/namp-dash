<style>

    .chartCard {
        width: 100vw;
        height: calc(100vh - 40px);
        background: rgba(75, 192, 192, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .chartBox {
        width: 700px;
        padding: 20px;
        border-radius: 20px;
        border: solid 3px rgba(75, 192, 192, 1);
        background: white;
      }

</style>


<div class="chartCard">
    <div class="chartBox">
        <canvas id="myChart" bind:this={chartCanvas}></canvas>
    </div>
</div>

<script>
    import { Chart, registerables } from 'chart.js';
    Chart.register(...registerables);
    
    import { onMount } from "svelte";
    import {pmFilteredByDataTables, selectedPM, selectedYear} from "../../store.js";
    let dataForGraph= [];
    let chartCanvas;
    let ctx
    let localSelectedPM = ($selectedPM ? 'PM-2.5' : 'PM-10');

    onMount(async()=>{
        let unsubscribe = pmFilteredByDataTables.subscribe(obj => {
            if(obj.length > 0) {
                Object.keys(obj).forEach(function(key) {
                    // console.log('Key : ' + obj[key].State + ', Value : ' + obj[key].Values);
                    if(dataForGraph[obj[key].State]) {
                        dataForGraph[obj[key].State] = ( obj[key].Values + dataForGraph[obj[key].State] ) / 2 // avg. it out
                        // obj[0].Values = 56 ( current ) + dataForGraph[ obj[0].State <==> 'Andra Pradesh' ] = 32 (Saved Value)
                        // (56 + 32) / 2
                    } else {
                        dataForGraph[obj[key].State] = obj[key].Values;
                    }
                });
            }  
            console.log(dataForGraph);
            // sort dataForGraph before sending to charts   

        });

        // config block + render block
        ctx = chartCanvas.getContext('2d')
        let chart = new Chart(ctx, 
        {
            type: 'bar',
            data: data, 
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }); // end of chart  
        
    });

    // data block
    const data = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        // label: 'Statewise Ranking of ' + localSelectedPM + ' for the year ' + $selectedYear ,
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(255, 206, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };

  



</script>
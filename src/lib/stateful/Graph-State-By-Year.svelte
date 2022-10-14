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
  import { validate_component } from 'svelte/internal';
    import {pmFilteredByDataTables, selectedPM, selectedYear} from "../../store.js";
    let dataForGraph = {};
    // Chart Rendering
    let chartCanvas;
    let ctx
    // Legend
    let localSelectedPM = ($selectedPM ? 'PM-2.5' : 'PM-10');
    // Data formation


    /**
     * The below subscription on mount wants to convert and process PM Data from the Basic-PM-Datatable component 
     * and process it to form a graph.
     * "key" is name of state
     * "value" has 4 items. 
     * 0-> sum of pm 
     * 1-> total number of cities
     * 2-> total number of valid cities ( non-zero values )
     * 3-> average pm (sum of pm / total number of valid cities)
    */
    onMount(async()=>{
        let unsubscribe = pmFilteredByDataTables.subscribe(pmObj => {
            if(pmObj.length > 0) {
                Object.keys(pmObj).forEach(function(key) {
                    
                    let Obj = pmObj[key]; // this is the actual object that we want
                    if(dataForGraph[Obj.State]) {
                        dataForGraph[Obj.State] = [( Number(Obj.Values) + dataForGraph[Obj.State][0] ), Number(dataForGraph[Obj.State][1]) + 1, Number(dataForGraph[Obj.State][2]) + 1 ] // sum it up
                    } else {
                        dataForGraph[Obj.State] = [ Number(Obj.Values), 1, 1];
                    }
                    // cancel out unmonitored cities / no readings
                    if(Number(Obj.Values) == 0) {
                        dataForGraph[Obj.State][2] = Number(dataForGraph[Obj.State][2]) - 1;
                    }
                });
            }  
            // sort dataForGraph before sending to charts   
            Object.keys(dataForGraph).forEach(key => {
                // EXPLAIN : AVERAGE = TOTAL SUM / VALID CITY COUNT
                dataForGraph[key][3] = Math.round(dataForGraph[key][0] / dataForGraph[key][2]);
                // EXPLAIN : REMOVING CASES OF 0/0 (NaN)
                if(!dataForGraph[key][3]) dataForGraph[key][3] = 0;    
            });

            // console.log(dataForGraph);
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
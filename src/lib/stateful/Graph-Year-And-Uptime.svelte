<section class="pb-10">
    <ComboBox
    titleText="City"
    placeholder="Select a city to view city level analysis"
    bind:selectedId
    items={cities}
    />
</section>
<section>
    <div class="chartCard">
        <div class="chartBox">
            <canvas id="myChart" bind:this={chartCanvas}></canvas>
        </div>
    </div>
</section>

<script>
    import { Chart, LineController, registerables } from 'chart.js';
    Chart.register(...registerables);
    import { onMount } from 'svelte';
    import { ComboBox, Button } from "carbon-components-svelte";

    let selectedId;
    let cities;
    let chartCanvas;
    
    onMount(async () => {
      const response = await fetch('./assets/cities-dataset.json');
      let data = await response.json();
      cities = data;
      selectedId = 1;
      console.log(cities)
    });
    


</script>


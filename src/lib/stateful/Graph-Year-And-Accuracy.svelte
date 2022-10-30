<section class="pb-10">
    <ComboBox
    titleText="City"
    placeholder="Select a city to view city level analysis"
    bind:selectedId
    items={cities}
    />
</section>

<script>
    import { Chart, LineController, registerables } from 'chart.js';
    Chart.register(...registerables);
    import { onMount } from 'svelte';
    import { ComboBox, Button } from "carbon-components-svelte";

    let selectedId = "1";
    let cities = [];
    
    onMount(async () => {
      const response = await fetch('./assets/cities-dataset.json');
      let data = await response.json();
      cities = data;
    });

</script>


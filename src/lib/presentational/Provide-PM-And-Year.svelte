<script>
    // @ts-ignore
    import { Dropdown } from "carbon-components-svelte";
    import { selectedPM, selectedYear } from "../../store.js";
    $: console.log($selectedYear)

</script>

<section class="grid grid-cols-2 ">
    <div> 
        <Dropdown
        titleText="Filter by Particulate Matter"   
        bind:selectedId={$selectedPM}
        items={[
          { id: 0, text: "PM-10" }, 
          { id: 1, text: "PM-2.5" },
        ]}
      />
    </div>
    <div>
      <Dropdown
        titleText="Filter By Year"
          bind:selectedId={$selectedYear}
          items={[
            { id: 2016, text: "Year 2016" },
            { id: 2017, text: "Year 2017" },
            { id: 2018, text: "Year 2018" },
            { id: 2019, text: "Year 2019" },
            { id: 2020, text: "Year 2020" },
            { id: 2021, text: "Year 2021" },
          ]}
        />
    </div>
</section>
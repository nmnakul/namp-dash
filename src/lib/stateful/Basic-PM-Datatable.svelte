<script>
// @ts-nocheck

    // import { pm25CsvAsJson } from 'store.js';
    import { onMount } from 'svelte';
    import { DataTable, Pagination, Toolbar, ToolbarContent, ToolbarSearch } from "carbon-components-svelte";
    import { faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';
    import {selectedPM, selectedYear, pmFilteredByDataTables} from "../../store.js";


    // Datatable Default Binding Variables
    let dtData = []; // dynamic
    $: pmFilteredByDataTables.set(dtData)
    let dtStaticData = [] // static full Obj
    let dtSelectedRowIds = [];
    let filteredRowIds = []; // final datatable "row id"s after search filter
    let pageSize = 25;  
    let page = 1;

    onMount(async () => {
      const response = await fetch('./assets/full-pm-csv.json');
      dtData = await response.json();
      dtStaticData = dtData; // used later to filter data
      
      // console.log($selectedPM);
      dtData = dtStaticData.filter(obj=>filterByPollutant(obj));
      dtData = dtData.filter(obj=>filterByPMYear(obj));
    
    }); 

    function filterByPMYear(value) {
      if(value["Year"] == $selectedYear) return true;
      return false;
    };

    function filterByPollutant(value) {
      if(value["Pollutant"] == 'PM-10' && $selectedPM == 0) return true;
      if(value["Pollutant"] == 'PM-2.5' && $selectedPM == 1) return true;
      return false;
    };

    const unsubscribeYear = selectedYear.subscribe((val) => {
      dtData = dtStaticData.filter(obj=>filterByPollutant(obj));
      dtData = dtData.filter(obj=>filterByPMYear(obj));
    });

    const unsubscribePM = selectedPM.subscribe((val) => {
      dtData = dtStaticData.filter(obj=>filterByPollutant(obj));
      dtData = dtData.filter(obj=>filterByPMYear(obj));
    });

</script>

<style>

</style>

<div>
  <!-- 
    useStaticWidth
    stickyHeader 
  -->
  <DataTable
    title="National Air Quality Monitoring Programme Data"
    description="Contains entire NAMP data from 2016 omwards till the lastest data sheet shared on the CPCB website."
    sortable
    zebra
    data={dtData}
    headers={[
      { key: "Pollutant", value: "Pollutant"},  
      { key: "Year", value: "Year"},
      { key: "City", value: "City"},
      { key: "State", value: "State"},
      { key: "NoOfLocationsUsed", value: "#Monitors"},
      { key: "IdealReadings", value: "#Required"},
      { key: "Readings", value: "#Total"},
      { key: "Values", value: "Average PM"},
    ]}
      bind:selectedRowIds={dtSelectedRowIds}
      {pageSize}
      {page}
      bind:rows={dtData}>

      <Toolbar>
        <ToolbarContent>
          <ToolbarSearch
          persistent 
          value=""
          shouldFilterRows
          bind:filteredRowIds
        />
        </ToolbarContent>
      </Toolbar>

      <!-- CONTROL OPTION CUSTOMIZATION -->
      <div class="flex items-center" slot="cell" let:row let:cell>
        {#if cell.key == "Readings" && Number(cell.value) >= Number(row.IdealReadings)}
        <div class="w-8">{cell.value}</div><div style="font-size: 1rem; color: lightgreen; padding: 0 5px;"><Fa icon={faCircleArrowUp} /></div>
        {:else if cell.key == "Readings" && Number(cell.value) < Number(row.IdealReadings)}
          <div class="w-8">{cell.value}</div><div style="font-size: 1rem; color: tomato; padding: 0 5px;"><Fa icon={faCircleArrowDown}/></div>
        {:else}
          {cell.value}
        {/if}
      </div>

  </DataTable>
    <Pagination
      bind:pageSize
      bind:page
      totalItems={filteredRowIds.length}
      pageSizeInputDisabled
    />
</div>  
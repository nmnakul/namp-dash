<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import { Dropdown, DataTable, Pagination, Toolbar, ToolbarContent, ToolbarSearch, Row, TableCell } from "carbon-components-svelte";
    import { faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';
    import { selectedYear, pmFilteredByYear, pmNonFiltered, pmFilteredByDataTable } from "../../store.js";
    import SvelteTooltip from 'svelte-tooltip';   

    // Datatable Default Binding Variables
    let dtData = []; // dynamic
    let dtStaticData = [] // static full Obj
    $: pmFilteredByYear.set(dtData)
    let dtSelectedRowIds = [];
    let filteredRowIds = []; // final datatable "row id"s after search filter
    let pageSize = 20;  
    let page = 1;   

    onMount(async () => {
      const response = await fetch('./assets/namp-dataset.json');
      dtStaticData = await response.json();
      pmNonFiltered.set(dtStaticData)

      dtData = dtStaticData.filter(obj=>filterByPMYear(obj));
      dtData.sort(sortByPM10); 
    });
    
    function filterByPMYear(value) {
      if(value["year"] == $selectedYear) return true;
      return false;
    };
    
    function sortByPM10(a, b) { 
      return b.pm10 - a.pm10 || b.pm25 - a.pm25;
    };

    const unsubscribeYear = selectedYear.subscribe((val) => {
      dtData = dtStaticData.filter(obj=>filterByPMYear(obj));
      dtData.sort(sortByPM10);
      page = 1;
    });

    // $: console.log(dtData);
    $: pmFilteredByDataTable.set(dtData.filter((obj)=>filteredRowIds.includes(obj.id) ))

</script>

<style>

</style>

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
<div class="pb-20 overflow-x-auto">
  <!-- 
    useStaticWidth
    stickyHeader 
    data={dtData}   
  -->
  <DataTable
    title="National Air Quality Monitoring Programme Data"
    description="Contains entire NAMP data from 2016 omwards till the lastest data sheet shared on the CPCB website. Data sorted by PM-10."
    sortable
    zebra
    headers={[  
      { key: "year", value: "Year"},
      { key: "city", value: "City"},
      { key: "state", value: "State"},
      { key: "monitors-pm10", value: "#Monitors PM-10", sort: (a, b) => a - b},
      { key: "readings-pm10", value: "#Readings PM-10", sort: (a, b) => a - b},
      { key: "pm10", value: "Average PM-10", sort: (a, b) => a - b},
      { key: "monitors-pm25", value: "#Monitors PM-2.5", sort: (a, b) => a - b},
      { key: "readings-pm25", value: "#Readings PM-2.5", sort: (a, b) => a - b},
      { key: "pm25", value: "Average PM-2.5", sort: (a, b) => a - b},
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
          <!-- PM 10 UP -->
          {#if (row.year < 2020 && cell.key == "readings-pm10" && Number(cell.value) > Number(row[`monitors-pm10`])*104)}
            <div class="w-8">{cell.value}</div>
            <div class="text-black">
              <SvelteTooltip tip={"Accuracy > Ideal Avg. : " + Number(row[`monitors-pm10`])*104} right color="#C3BF6D">
                <div style="font-size: 1rem; color: forestgreen; padding: 0 5px;"><Fa icon={faCircleArrowUp} /></div>
              </SvelteTooltip>
            </div>
          <!-- PM 25 UP -->
          {:else if (row.year < 2020 && cell.key == "readings-pm25" && Number(cell.value) > Number(row[`monitors-pm25`])*104)}
            <div class="w-8">{cell.value}</div>
            <div class="text-black">
              <SvelteTooltip tip={"Accuracy > Ideal Avg. : " + Number(row[`monitors-pm25`])*104} left color="#C3BF6D">
                <div style="font-size: 1rem; color: forestgreen; padding: 0 5px;"><Fa icon={faCircleArrowUp} /></div>
              </SvelteTooltip>
            </div>
          <!-- PM 10 DOWN -->
          {:else if (row.year < 2020 && cell.key == "readings-pm10" && Number(cell.value) < Number(row[`monitors-pm10`])*104)}
            <div class="w-8">{cell.value}</div>
            <div class="text-white">
              <SvelteTooltip tip={"Accuracy < Ideal Avg. : " + Number(row[`monitors-pm10`])*104} right color="#DD7373">
                <div style="font-size: 1rem; color: tomato; padding: 0 5px;"><Fa icon={faCircleArrowDown}/></div>
              </SvelteTooltip>
            </div>
          <!-- PM 25 Down -->
          {:else if (row.year < 2020 && cell.key == "readings-pm25" && Number(cell.value) < Number(row[`monitors-pm25`])*104)}
            <div class="w-8">{cell.value}</div>
            <div class="text-white">
              <SvelteTooltip tip={"Accuracy < Ideal Avg. : " + Number(row[`monitors-pm25`])*104} right color="#DD7373">
                <div style="font-size: 1rem; color: tomato; padding: 0 5px;"><Fa icon={faCircleArrowDown}/></div>
              </SvelteTooltip>
            </div>
          {:else if (cell.key == "pm10" || cell.key == "pm25" )}
            {#if cell.value <= 60 && cell.value > 0}
              <div class="" style="border-bottom: solid; border-color: forestgreen">{cell.value}</div>
            {:else if cell.value <= 120 && cell.value > 60}
              <div class="" style="border-bottom: solid; border-color: gold">{cell.value}</div>
            {:else if cell.value > 120 }
              <div class="" style="border-bottom: solid; border-color: tomato">{cell.value}</div>
            {:else} 
              {cell.value}
            {/if}  
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
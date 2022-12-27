<script>
    import { onMount } from 'svelte';
    import { DataTable, Pagination, Toolbar, ToolbarContent, ToolbarSearch, Row, TableCell } from "carbon-components-svelte";
    import { faArrowDown, faArrowUp, faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';

    let dtStaticData = [] // static full Obj
    let dtSelectedRowIds = [];
    let filteredRowIds = []; // final datatable "row id"s after search filter
    let pageSize = 22;  
    let page = 1;

    export let fetchUrl = "./assets/namp-pm10-dataset.json";
    export let PMSelected = 'PM-10';

    onMount(async () => {
      const response = await fetch(fetchUrl);
      dtStaticData = await response.json();
    });

</script>

<div class="pb-20 overflow-x-auto">
    <!-- 
      useStaticWidth
      stickyHeader      
    -->
    <DataTable
      title="{PMSelected} Comparision"
      description="Year on Year {PMSelected} comparision of all 132 cities under NCAP, 2016 onwards."
      sortable
      zebra
      headers={[  
        { key: "city", value: "City"},
        { key: "state", value: "State"},
        { key: "2016", value: "2016"},
        { key: "2017", value: "2017"},
        { key: "2018", value: "2018"},
        { key: "2019", value: "2019"},
        { key: "2020", value: "2020"},
        { key: "2021", value: "2021"}
      ]}
        bind:selectedRowIds={dtSelectedRowIds}
        {pageSize}
        {page}
        bind:rows={dtStaticData}>
  
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
        {#if cell.value}
            {#if (cell.key == "2017" && Number(row['2017-gap']) > 0) || (cell.key == "2018" && Number(row['2018-gap']) > 0) || (cell.key == "2019" && Number(row['2019-gap']) > 0) || (cell.key == "2020" && Number(row['2020-gap']) > 0)  || (cell.key == "2021" && Number(row['2021-gap']) > 0)}
              <div class="w-8">{cell.value}</div><div style="font-size: 1rem; color: tomato; padding: 0 5px;"><Fa icon={faArrowUp}/></div>
            {:else if (cell.key == "2017" && Number(row['2017-gap']) < 0) || (cell.key == "2018" && Number(row['2018-gap']) < 0) || (cell.key == "2019" && Number(row['2019-gap']) < 0) || (cell.key == "2020" && Number(row['2020-gap']) < 0)  || (cell.key == "2021" && Number(row['2021-gap']) < 0)}
            <div class="w-8">{cell.value}</div><div style="font-size: 1rem; color: forestgreen; padding: 0 5px;"><Fa icon={faArrowDown}/></div>
            {:else}
              {cell.value}
            {/if}
        {:else} 
            <span>-</span>
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


<script>
    import { DataTable, Pagination, Toolbar, ToolbarContent, ToolbarSearch } from "carbon-components-svelte";
  import { onMount } from "svelte";
  import {pmFilteredByDataTables, selectedPM, selectedYear} from "../../store.js";
    
    let dtData // data for Datatable
    let yrList = [2016, 2017, 2018, 2019, 2020]

    onMount(async()=>{
        let unsubscribe = pmFilteredByDataTables.subscribe(pmObj => {
            if(pmObj.length > 0) {
                console.log(pmObj)
                let dataForWhileLoop = [...pmObj];
                while (dataForWhileLoop.length) {
                    let city = dataForWhileLoop[0].City;
                    let cityArr = dataForWhileLoop.filter((obj)=>{
                        obj.City == city
                    });
                    // do process
                    // asjbxhxajsljasljkahssssssssssssssssssl
                    dataForWhileLoop = dataForWhileLoop.filter((obj)=>{
                        obj.City !== city
                    });
                    console.log(1);
                    console.log(cityArr);
                    break;
                }
            }  
            // console.log(dtData);
        })
    });



</script>

<style>

</style>

<div>
    <!-- <DataTable
        title="PM Values across Years"  
        description="Shows PM-10 / PM-2.5 values from 2016 onwards to show rise and fall of recorded manual monitoring data." 
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
    
    
        <div class="flex items-center" slot="cell" let:row let:cell>
            {#if cell.key == "Readings" && Number(cell.value) >= Number(row.IdealReadings)}
            <div class="w-8">{cell.value}</div><div style="font-size: 1rem; color: lightgreen; padding: 0 5px;"><Fa icon={faCircleArrowUp} /></div>
            {:else if cell.key == "Readings" && Number(cell.value) < Number(row.IdealReadings)}
            <div class="w-8">{cell.value}</div><div style="font-size: 1rem; color: tomato; padding: 0 5px;"><Fa icon={faCircleArrowDown}/></div>
            {:else}
            {cell.value}
            {/if}
        </div>
    </DataTable> -->
</div>
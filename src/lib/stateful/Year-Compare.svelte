<script>
    import { onMount } from 'svelte';
    import { DataTable, Pagination, Toolbar, ToolbarContent, ToolbarSearch, Row, TableCell } from "carbon-components-svelte";
    import { faArrowDown, faArrowUp, faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';

    const cities = [
     'Anantapur', 'Chitoor', 'Eluru', 'Guntur', 'Kadapa', 'Kurnool', 'Nellore', 'Ongole', 'Rajahmundry', 'Srikakulam', 'Vijaywada', 'Vishakhapatnam', 'Vizianagaram', 'Guwahati', 'Nagaon', 'Nalbari', 'Sibsagar', 'Silchar', 'Gaya', 'Muzaffarpur', 'Patna', 'Chandigarh', 'Durg-Bhillainagar', 'Korba', 'Raipur', 'Delhi', 'Ahmedabad', 'Rajkot', 'Surat', 'Vadodara', 'Baddi', 'Damtal', 'Kala Amb', 'Nalagarh', 'Paonta Sahib', 'Parwanoo', 'Sunder Nagar', 'Jammu', 'Srinagar', 'Dhanbad', 'Jamshedpur', 'Ranchi', 'Bangalore', 'Devanagere', 'Gulbarga', 'Hubli-Dharwad', 'Bhopal', 'Dewas', 'Gwalior', 'Indore', 'Jabalpur', 'Sagar', 'Ujjain', 'Akola', 'Amravati', 'Aurangabad', 'Badlapur', 'Chandrapur', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai', 'Nagpur', 'Nashik', 'Navi Mumbai', 'Pune', 'Sangli', 'Solapur', 'Thane', 'Ulhasnagar', 'Vasai-Virar', 'Byrnihat', 'Dimapur', 'Kohima', 'Angul', 'Balasore', 'Bhubaneswar', 'Cuttack', 'Kalinga Nagar', 'Rourkela', 'Talcher', 'Amritsar', 'Dera Baba Nanak', 'Dera Bassi', 'Gobindgarh', 'Jalandhar', 'Khanna', 'Ludhiana', 'Naya Nangal', 'Patiala', 'Alwar', 'Jaipur', 'Jodhpur', 'Kota', 'Udaipur', 'Chennai', 'Madurai', 'Trichy', 'Tuticorin', 'Hyderabad', 'Nalgonda', 'Patancheru', 'Sangareddy', 'Agra', 'Allahabad', 'Anpara', 'Bareily', 'Firozabad', 'Gajraula', 'Ghaziabad', 'Gorakhpur', 'Jhansi', 'Kanpur', 'Khurja', 'Lucknow', 'Meerut', 'Moradabad', 'Noida', 'Raebareli', 'Varanasi', 'Dehradun', 'Kashipur', 'Rishikesh', 'Asansol', 'Barrackpore', 'Durgapur', 'Faridabad', 'Haldia', 'Howrah', 'Kolkata', 'Raniganj'
    ]

    let dtStaticData = [] // static full Obj
    let dtSelectedRowIds = [];
    let filteredRowIds = []; // final datatable "row id"s after search filter
    let pageSize = 20;  
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
      data=dtStaticData
      headers={[  
        { key: "city", value: "City"},
        { key: "state", value: "State"},
        { key: "2016", value: "2016"},
        { key: "2017", value: "2017"},
        { key: "2018", value: "2018"},
        { key: "2019", value: "2019"},
        { key: "2020", value: "2020"}
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
            {#if (cell.key == "2017" && Number(row['2017-gap']) > 0) || (cell.key == "2018" && Number(row['2018-gap']) > 0) || (cell.key == "2019" && Number(row['2019-gap']) > 0) || (cell.key == "2020" && Number(row['2020-gap']) > 0)}
              <div class="w-8">{cell.value}</div><div style="font-size: 1rem; color: tomato; padding: 0 5px;"><Fa icon={faArrowUp}/></div>
            {:else if (cell.key == "2017" && Number(row['2017-gap']) < 0) || (cell.key == "2018" && Number(row['2018-gap']) < 0) || (cell.key == "2019" && Number(row['2019-gap']) < 0) || (cell.key == "2020" && Number(row['2020-gap']) < 0)}
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


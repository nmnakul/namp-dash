<svelte:head>
    <script src="https://kit.fontawesome.com/47e90b2f9b.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>   
</svelte:head>

<script>
    import "carbon-components-svelte/css/white.css";
    import { AspectRatio,  Tabs, Tab, TabContent } from "carbon-components-svelte";
    import NampExplanation from "./lib/presentational/Namp-Explanation.svelte";
    import BasicPmDatatable from "./lib/stateful/Basic-PM-Datatable.svelte";
    import GraphPMDatatable from "./lib/stateful/Graph-PM-Datatable.svelte";
    import YearCompare from "./lib/stateful/Year-Compare.svelte";
</script>

  <style>
    main {
        /* background-color: #e8dede; */
        color: #7D6E83;
    }
</style>

<main class="px-[10%]">
  <AspectRatio ratio="16x9">
      <body class="w-full grey-100">
          <NampExplanation></NampExplanation>
          <BasicPmDatatable></BasicPmDatatable>
          <GraphPMDatatable></GraphPMDatatable>
          <Tabs autoWidth>
            <Tab label="Year on Year PM-10" />
            <Tab label="Year on Year PM-2.5" />
            <svelte:fragment slot="content">
                <TabContent>
                    <YearCompare></YearCompare>
                </TabContent>
                <TabContent>
                    <YearCompare PMSelected='PM-2.5' fetchUrl='./assets/namp-pm25-dataset.json'></YearCompare>
                </TabContent>
            </svelte:fragment>
          </Tabs>
      </body>
  </AspectRatio>
</main>
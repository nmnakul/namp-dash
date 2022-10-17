<svelte:head>
    <script src="https://kit.fontawesome.com/47e90b2f9b.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>   
</svelte:head>

<script>
    import "carbon-components-svelte/css/white.css";
    import { AspectRatio } from "carbon-components-svelte";
    import NampExplanation from "./lib/presentational/Namp-Explanation.svelte";
    import BasicPmDatatable from "./lib/stateful/Basic-PM-Datatable.svelte";
    import PmByYear from "./lib/stateful/PM-By-Year.svelte";
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
          <PmByYear></PmByYear>
      </body>
  </AspectRatio>
</main>
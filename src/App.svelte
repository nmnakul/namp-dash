<svelte:head>
    <script src="https://kit.fontawesome.com/47e90b2f9b.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>   
</svelte:head>

<script>
    import NampExplanation from "./lib/presentational/Namp-Explanation.svelte";
    import "carbon-components-svelte/css/white.css";
    // @ts-ignore
    import { AspectRatio } from "carbon-components-svelte";
    import BasicPmDatatable from "./lib/stateful/Basic-PM-Datatable.svelte";
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
      </body>
  </AspectRatio>
</main>
<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    export let lblOneIsSelected = true;
    export let lblOne = 'PM 10';
    export let lblTwo = 'PM 2.5';

    function clickHandler() {
        lblOneIsSelected = !lblOneIsSelected;
        dispatch('radioStatus', { value: lblOneIsSelected });
    }
</script>

<main class="flex m-5 items-center justify-center">
    <!-- tabs -->
    <div
      class="rounded-xl space-x-2 bg-gray-200 grid p-2 w-[20rem] grid-cols-2">

      <div>
        <input on:click="{clickHandler}" disabled={lblOneIsSelected} type="radio" name="option" id="1" class="peer hidden" checked />
        <label
          for="1"
          class="rounded-xl cursor-pointer text-center p-2 block select-none peer-checked:font-bold peer-checked:text-white peer-checked:bg-blue-500"
          >{lblOne}</label
        >
      </div>
  
      <div>
        <input on:click="{clickHandler}" disabled={!lblOneIsSelected} type="radio" name="option" id="2" class="peer hidden" />
        <label
          for="2"
          class="rounded-xl cursor-pointer text-center p-2 block select-none peer-checked:font-bold peer-checked:text-white peer-checked:bg-blue-500"
          >{lblTwo}</label
        >
      </div>
  
    </div>
  </main>
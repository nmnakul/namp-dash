import { writable, readable, derived } from "svelte/store"; 

export let selectedPM = writable(0); // can be PM-10 or PM-2.5. connected with dropdown.
export let selectedYear = writable(2019); // can be any year from 2016-2021. connected with dropdown.

export let pmFilteredByDataTables = writable();
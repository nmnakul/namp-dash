import { writable, readable, derived } from "svelte/store"; 

export let selectedYear = writable(2020); // can be any year from 2016-2021. connected with dropdown.
export let pmFilteredByDataTables = writable();
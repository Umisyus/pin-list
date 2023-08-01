import type { ExtractedPin } from '$lib/db/ExtractedPin';
import { writable } from 'svelte/store';
import PocketBase from 'pocketbase'
export const list = writable<ExtractedPin[]>([]);
export const pbStore = new PocketBase('http://127.0.0.1:8090');
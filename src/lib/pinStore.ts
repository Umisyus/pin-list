import type { ExtractedPin } from '$lib/db/ExtractedPin';
import { writable } from 'svelte/store';

export const list = writable<ExtractedPin[]>([]);
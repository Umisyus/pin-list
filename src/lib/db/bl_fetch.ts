import fetch from '@adobe/node-fetch-retry';
import { Response } from 'node-fetch';

export async function bl_fetch(bl_query: string): Promise<Response> {
    return await fetch(bl_query);
}

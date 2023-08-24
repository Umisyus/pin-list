import type { PinSearchResponse } from './PinSearchResponse';
import type { pindata } from './pin-data';
import fetch from '@adobe/node-fetch-retry';

export async function getProfilePins(userName: string, THRESHOLD = 100) {
    const addAll = function (set: Set<any>, ...args: any[]) {
        for (let index = 0; index < args.length; index++) {
            const element = args[index];
            set.add(element);
        }
    };

    const ds = new Set<pindata>();

    console.log(userName);
    
    let pins_url_bookmark = (userName: string, bookmark: string) => `https://www.pinterest.ca/resource/UserPinsResource/get/?source_url=%2F${userName}%2Fpins%2F&data=%7B%22options%22%3A%7B%22is_own_profile_pins%22%3Atrue%2C%22username%22%3A%22${userName}%22%2C%22field_set_key%22%3A%22grid_item%22%2C%22pin_filter%22%3Anull%2C%22bookmarks%22%3A%5B%22${bookmark}%22%5D%7D%2C%22context%22%3A%7B%7D%7D&_=1670393784068`;
    let query = pins_url_bookmark(userName, "");
    const list: any[] = [];
    let go = true;

    do {
        let response_json = await (await fetch(query)).json() as PinSearchResponse;
        let bookmark = (response_json?.resource?.options?.bookmarks ?? [""])[0];

        let [...pins] = (response_json.resource_response?.data ?? []) as pindata[];
        list.push(...pins);
        console.info(`Running total: ${list.length}`);

        if (list.length >= THRESHOLD || bookmark.includes('end')) {
            console.info(`Total # of pins: ${list.length}`);

            addAll(ds, ...list);
            go = false;
            console.log("Saving Complete.");
        }

        // Refresh the query with the new bookmark
        response_json = <any>await (await fetch(query)).json();
        bookmark = (response_json.resource?.options?.bookmarks ?? [""])[0];
        query = pins_url_bookmark(userName, bookmark);
    } while (go);

    const normalPinsLen = list.length;

    console.info(`Total # of pins: ${normalPinsLen}`);
    console.info(`GRAND TOTAL: ${normalPinsLen}`);
    console.info(`Saved pins to dataset successfully!`);
    return ds;
}

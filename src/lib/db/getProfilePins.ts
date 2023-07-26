import type { pindata } from './pin-data';
import fetch from '@adobe/node-fetch-retry';
import { bl_fetch } from './bl_fetch.js';
import { PinSearchResponse } from './PinSearchResponse';


export async function getProfilePins(userName = 'dracana96', THRESHOLD = 10) {
    const addAll = function (set: Set<any>, ...args: any[]) {
        for (let index = 0; index < args.length; index++) {
            const element = args[index];
            set.add(element);
        }
    };

    const ds = new Set<pindata>();

    console.log(userName);
    let pins_url_bookmark = (userName: string, bookmark: string) => `https://www.pinterest.ca/resource/UserPinsResource/get/?source_url=%2F${userName}%2Fpins%2F&data=%7B%22options%22%3A%7B%22is_own_profile_pins%22%3Atrue%2C%22username%22%3A%22${userName}%22%2C%22field_set_key%22%3A%22grid_item%22%2C%22pin_filter%22%3Anull%2C%22bookmarks%22%3A%5B%22${bookmark}%22%5D%7D%2C%22context%22%3A%7B%7D%7D&_=1670393784068`;
    // function boardless_pins_url_bookmark(userName: string, bookmark: string) {
    //     return `https://www.pinterest.ca/resource/BoardlessPinsResource/get/?source_url=%2F${userName}%2F&data=%7B%22options%22%3A%7B%22redux_normalize_feed%22%3Atrue,%22bookmarks%22%3A%5B%22${bookmark}%22%5D,%22userId%22%3A%22646477858918931565%22%7D,%22context%22%3A%7B%7D%7D&_=1671685984351`;
    // }

    let query = pins_url_bookmark(userName, "");
    // let bl_query = boardless_pins_url_bookmark(userName, "");
    const list: any[] = [];
    const bl_list = [];
    let bl_stop = false;
    let go = true;
    do {
        let response_json = <PinSearchResponse> await (await fetch(query)).json();
        let bookmark = (response_json?.resource?.options?.bookmarks ?? [""])[0];

        // Add the boardless pins to the list
        // if (bl_stop == false) {
        //     const bl_response_json = <any> await (await bl_fetch(bl_query)).json();
        //     const bl_bookmark = bl_response_json.resource.options.bookmarks[0];
        //     query = pins_url_bookmark(userName, bookmark);
        //     bl_query = boardless_pins_url_bookmark(userName, bl_bookmark);

        //     let [...bl_pins] = bl_response_json.resource_response.data;
        //     bl_list.push(...bl_pins);

        //     if (bl_list.length >= THRESHOLD || bl_bookmark.includes('end')) {
        //         console.log('end');
        //         console.info(`Total # of boardless pins: ${bl_list.length}`);

        //         addAll(ds, ...bl_list);
        //         bl_stop = true;
        //         console.info('Saved boardless pins to dataset');
        //     }

        // }

        // Add the pins to the list
        let [...pins] = (<pindata[]> response_json.resource_response?.data ?? []);
        list.push(...pins);
        console.info(`Running total: ${list.length}`);

        if (list.length >= THRESHOLD || bookmark.includes('end')) {
            console.info(`Total # of pins: ${list.length}`);

            addAll(ds, ...list);
            go = false;
            console.log("Saving Complete.");
        }

        // Refresh the query with the new bookmark
        response_json = <any> await (await fetch(query)).json();
        bookmark = (response_json.resource?.options?.bookmarks ?? [""])[0];
        query = pins_url_bookmark(userName, bookmark);
    } while (go);

    const normalPinsLen = list.length;
    const boardlessPinsLen = bl_list.length;

    console.info(`Total # of pins: ${normalPinsLen}`);
    console.info(`Total # of boardless pins: ${boardlessPinsLen}`);

    console.info(`GRAND TOTAL: ${normalPinsLen + boardlessPinsLen}`);
    console.info(`Saved pins to dataset successfully!`);
    return ds;
}

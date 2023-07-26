import type { pindata } from './pin-data';
import type { PinSearchResponse } from './PinSearchResponse';
import { FLAGS } from './constan.js';

// export async function getSearchPins(searchTerm: string, max_amount: number = 100): Promise<pindata[]> {
//     // searchTerm = encodeURIComponent(searchTerm)
//     let inital_query_data = { "options": { "field_set_key": "profile_grid_item", "query": searchTerm, "scope": "", bookmarks: [""] }, "context": {} };
//     let pins: pindata[] = [];
//     let inital_query_data_str = JSON.stringify(inital_query_data);
//     let inital_query_data_str_enc = encodeURIComponent(inital_query_data_str);

//     while (pins.length < max_amount) {
//         inital_query_data_str = JSON.stringify(inital_query_data);
//         inital_query_data_str_enc = encodeURIComponent(inital_query_data_str);
//         const searchURL = `https://www.pinterest.ca/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${searchTerm}%26rs%3Dtyped&data=${(inital_query_data_str_enc)}`;

//         if (FLAGS.VERBOSE)
//             console.log({ current_bookmark: inital_query_data.options.bookmarks[0], count: pins.length });

//         let html = await fetch(searchURL, {
//             // let html = await fetch(`https://www.pinterest.ca/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${searchTerm}%26rs%3Dtyped&data=%7B%22options%22%3A%7B%22article%22%3A%22%22%2C%22appliedProductFilters%22%3A%22---%22%2C%22price_max%22%3Anull%2C%22price_min%22%3Anull%2C%22query%22%3A%22${searchTerm}%22%2C%22scope%22%3A%22pins%22%2C%22auto_correction_disabled%22%3A%22%22%2C%22top_pin_id%22%3A%22%22%2C%22filters%22%3A%22%22%7D%2C%22context%22%3A%7B%7D%7D&_=1689580280733`, {
//             // "credentials": "include",
//             "headers": {
//                 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0",
//                 "Accept": "application/json, text/javascript, */*, q=0.01",
//                 "Accept-Language": "en",
//                 "X-Requested-With": "XMLHttpRequest",
//                 // "X-APP-VERSION": "3a5e7df",
//                 // "X-Pinterest-AppState": "active",
//                 // "X-Pinterest-ExperimentHash": "d1073955dd61ce5aba5fe02b59afb115f7db56fe73f6b65328225fc672e18757218923c3ae33348fc8a1ae3751873983e5ca6d7ac79e8c74d20acee357e8229d",
//                 "X-Pinterest-Source-Url": `/search/pins/?q=${searchTerm}&rs=typed`,
//                 "X-Pinterest-PWS-Handler": "www/search/[scope].js",
//                 "Sec-Fetch-Dest": "empty",
//                 "Sec-Fetch-Mode": "cors",
//                 "Sec-Fetch-Site": "same-origin",
//                 "Pragma": "no-cache",
//                 "Cache-Control": "no-cache"
//             },
//             "referrer": "https://www.pinterest.ca/",
//             "method": "GET",
//             // "mode": "cors"
//         });

//         let json = await html.json() as any;

//         let current_bookmark = json.resource_response?.bookmark ?? "";
//         inital_query_data.options.bookmarks[0] = current_bookmark;
//         let data = json.resource_response?.data?.results as any as pindata[] ?? [];
//         pins.push(...data);

//     }
//     let set = [...new Set(pins)];
//     return set;

// }

export async function getSearchPins(searchTerm: string, max_amount: number = 10): Promise<pindata[]> {
    // searchTerm = encodeURIComponent(searchTerm)
    // return new Promise((res, rej) => {
    //     console.log(searchTerm)
    //     res([{}]);
    // });

    let inital_query_data =
        { "options": { "field_set_key": "profile_grid_item", "query": searchTerm, "scope": "", bookmarks: [""] }, "context": {} }
    let pins: pindata[] = [];
    let inital_query_data_str = JSON.stringify(inital_query_data)
    let inital_query_data_str_enc = encodeURIComponent(inital_query_data_str)

    while (pins.length < max_amount) {
        const searchURL = `https://www.pinterest.ca/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${searchTerm}%26rs%3Dtyped&data=${(inital_query_data_str_enc)}`;
        // if (FLAGS.VERBOSE)
        console.log(searchURL);

        let html = await fetch(searchURL, {
            // let html = await fetch(`https://www.pinterest.ca/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${searchTerm}%26rs%3Dtyped&data=%7B%22options%22%3A%7B%22article%22%3A%22%22%2C%22appliedProductFilters%22%3A%22---%22%2C%22price_max%22%3Anull%2C%22price_min%22%3Anull%2C%22query%22%3A%22${searchTerm}%22%2C%22scope%22%3A%22pins%22%2C%22auto_correction_disabled%22%3A%22%22%2C%22top_pin_id%22%3A%22%22%2C%22filters%22%3A%22%22%7D%2C%22context%22%3A%7B%7D%7D&_=1689580280733`, {
            // "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0",
                "Accept": "application/json, text/javascript, */*, q=0.01",
                "Accept-Language": "en",
                "X-Requested-With": "XMLHttpRequest",
                // "X-APP-VERSION": "3a5e7df",
                // "X-Pinterest-AppState": "active",
                // "X-Pinterest-ExperimentHash": "d1073955dd61ce5aba5fe02b59afb115f7db56fe73f6b65328225fc672e18757218923c3ae33348fc8a1ae3751873983e5ca6d7ac79e8c74d20acee357e8229d",
                "X-Pinterest-Source-Url": `/search/pins/?q=${searchTerm}&rs=typed`,
                "X-Pinterest-PWS-Handler": "www/search/[scope].js",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            },
            // "referrer": "https://www.pinterest.ca/",
            "method": "GET",
            // "mode": "cors"
        });

        const json = await html.json() as PinSearchResponse;

        const current_bookmark = json.resource_response?.bookmark ?? "";
        inital_query_data.options.bookmarks[0] = current_bookmark
        const data = json.resource_response?.data?.results as any as pindata[] ?? []
        pins.push(...data)

    }
    return [...new Set(pins)].slice(0, max_amount);
}

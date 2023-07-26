import { pindata } from './pin-data';
import * as cheerio from 'cheerio';


export function GetPinFromHTML(html: string, pin_id: string): pindata {
    let $ = cheerio.load(html);
    let pins_text = $('script#__PWS_DATA__').text();
    let json = JSON.parse(pins_text)?.props.initialReduxState.pins;
    let pin = json[pin_id] as pindata;
    return pin;
}

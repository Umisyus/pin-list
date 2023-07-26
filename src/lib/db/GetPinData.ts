import type { ExtractedPin } from './ExtractedPin';
import type { Page, PageBlock } from "./pin-data";
export function GetPinData(pin: any): ExtractedPin | null {
    let res: ExtractedPin | null = null;
    try {
        if (pin == null) {
            return null;
        }
        let board = pin.board?.name ?? 'boardless_pin';
        let section = pin.section?.name ?? null;
        let username = pin.pinner.username ?? 'unknown';
        let id = pin.id;

        if (pin.story_pin_data?.pages) {
            let video_url = [(pin.story_pin_data.pages).map((page: Page) => {
                return page.blocks?.map((block: PageBlock) => {
                    if (block.video?.video_list?.V_EXP7?.url)
                        return block.video.video_list.V_EXP7.url!;
                });
            })].flat(2).filter(Boolean)[0];

            res = {
                username,
                id: pin.id,
                type: 'video',
                url: video_url!,
                name: pin.grid_title ?? pin.seo_title ?? pin.id,
                board,
                section,
                ext: video_url?.split('.').reverse()[0] ?? 'mp4',
            };
            if (res.ext)
                res.name = res.name + '.' + res.ext ?? 'mp4';
            return res;
        }

        if (pin.images?.orig?.url) {
            res = {
                username,
                id,
                type: 'image',
                url: pin.images?.orig?.url,
                ext: pin.images.orig.url.split('.').reverse()[0] ?? 'jpg',
                name: [pin.grid_title ?? pin.images.orig.url.split('/').reverse()[0] ?? pin.id].filter(Boolean)[0] ?? pin.id,
                board,
                section,
            };
            if (res.ext)
                res.name = res.name + '.' + res.ext;

            return res;
        }

        return res;

    } catch (e) {
        return null;
    }
}

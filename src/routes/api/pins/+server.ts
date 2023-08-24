import type { ExtractedPin } from "$lib/db/ExtractedPin";
import type { RequestEvent } from "@sveltejs/kit";
import * as archiver from "archiver";
import * as fs from "fs";

export async function POST(request: RequestEvent) {
    // console.log({ request });

    try {
        const data = await request.request.json();
        // console.log(JSON.stringify(data));

        const { pins } = data;
        // console.log({ data, pins });


        // Create archive with images
        const zip = archiver.create('zip', { zlib: { level: 0 } })

        for await (const pin of pins as ExtractedPin[]) {
            // console.log(pin.id);
            let { name, id, ext, board, url } = pin
            if (url === undefined) {
                console.log(`pin ${pin.name} (${pin.id}) has no url!!!!`);
                continue;
            }

            // const datablob = new Blob([buffer], { type: 'image/jpeg' });
            const nameExt = `${name}.${ext}`;
            console.log(`Adding ${nameExt}`);
            const image = await (await fetch(pin.url)).arrayBuffer().catch((console.error));
            if (image) {

                const buffer = Buffer.from(image);

                console.log(`downloaded ${buffer.length} bytes`);

                zip.append(buffer, { name: nameExt })
            } else {
                console.error(`no data for ${nameExt}!!!`);
            }
        }
        console.log(`finalizing zip...`);

        await zip.finalize()
        console.log(`zip finalized: ${zip.pointer()} total bytes`);

        // return new Response (zip, {
        //     status: 200,
        //     headers: {
        //         // @ts-ignore
        //         "Content-Type": "application/zip",
        //         "Content-Disposition": "attachement; filename=dummy.zip"
        //     },
        //     body: zip
        // })
        // } as unknown as Response

        // pipe zip tp file
        zip.pipe(fs.createWriteStream('dummy.zip'));
        let rs = fs.createReadStream('dummy.zip');

        console.log({ zip, rs });
        zip.end();
        // Works, but not as expected
        return new Response(
            zip as unknown as ReadableStream<Uint8Array>,
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'Content-Disposition':
                        // Use filename* instead of filename to support non-ASCII characters
                        `attachment; filename *= UTF - 8''dummy.zip`,
                },
            }
        );

    } catch (error) {
        console.error(error);
        return new Response()
    }


}
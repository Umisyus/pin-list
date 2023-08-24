import type { ExtractedPin } from "$lib/db/ExtractedPin";

export async function getSelectedPins(pins: ExtractedPin[]) {
    for await (const pin of pins) {
        const { ok, body, status, blob } = await fetch(pin.url)
        if (!ok) {
            console.log({ ok, body, status });
            continue
        }
        if (body != null) {
            return
        }
        if (blob != null) {
            const arrayBuffer = await (await blob()).arrayBuffer();
            return Buffer.from(arrayBuffer)
        }
    }

}
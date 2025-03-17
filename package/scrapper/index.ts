import {parseArgs} from 'node:util'
import {withProcessAuctions} from "./src/extractor.ts";
import {withProcessImages} from "./src/images.ts";

const {values} = parseArgs({
    args: Bun.argv,
    options: {
        withProcessAuction: {
            type: 'boolean',
        },
        withProcessImages: {
            type: 'boolean',
        }
    },
    strict: true,
    allowPositionals: true,
})

if (values.withProcessAuction) {
    console.log("Starting process auctions")
    await withProcessAuctions();
    console.log("Finished process auctions")

} else if (values.withProcessImages) {
    console.log("Starting process images")
    await withProcessImages();
    console.log("Finished process images")

} else {
    console.log("Nothing to do, see arguments of CLI")
}
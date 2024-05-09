//import { KeyValueStore } from './../../../../../node_modules/apify-client/dist/resource_clients/key_value_store.d';
/* --> old code : delete later

import { Cheerio } from "cheerio";

//define the interface for the api request
interface Request {
    method: string,
    body: {
        TWuser: string
    };
}

//define the interface for the api Response
interface Response {
    statusCode: number;
    json: (data: any) => void;
}

//define the aync function, which takes in two parameters, request (api request being made with the body being the query, aka payload and the resulting response the api call gives back, res, since we are creating the api endpoint, we are free to determine what occurs upon successful api call (status 200 range vs status fail such as status 400 or 500))
const amazonScraper =  async (req: Request, res: Response) => {
    if (req.method === 'POST') {
        const username : string = req.body.TWuser
    }
}

export default amazonScraper;
*/

import { CheerioCrawler, KeyValueStore } from "crawlee";
//since we want to export router as a component --> because we didn't specify export default, rather simply export followed by the name of the variable
import { router } from "./route";
//import the amazon base url from constants.ts
import { AMAZON_BASE_URL, labels } from "./constants";


const { keyword } = await KeyValueStore.getInput();
const crawler = new CheerioCrawler({
  requestHandler: router,
});

await crawler.run([
    {
        //turn the keyword into a link we can make a request with --> original link :https://www.amazon.com/s?k=baby+wipes&crid=16XWLUEUWX9V3&sprefix=baby+wipes%2Caps%2C96&ref=nb_sb_noss_1
        url: `${AMAZON_BASE_URL}/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=${keyword}`,
        label: labels.START,  //oringally START, now set to label.START
        userData: {
            keyword,
        }
    }
])

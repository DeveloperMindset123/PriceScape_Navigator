import {
  Dataset,
  createCheerioRouter,
  resolveBaseUrlForEnqueueLinksFiltering,
} from "crawlee";
import { AMAZON_BASE_URL, labels } from "./constants";

//set router
export const router = createCheerioRouter();
router.addDefaultHandler(({ log }) => {
  log.info("Route reached");
});

//this is for product list
router.addHandler(labels.START, async ({ $, request, crawler }) => {
  //define a property for the request named userData --> user data is an option for the request object
  const { keyword } = request.userData;
  // we can use the dollar sign to select all the products from the results page
  const products = $('div > div[data-asin]:not([data-asin=""])');

  //grab the title element of each of the product on the first page
  for (const product of products) {
    const element = $(product);
    const titleElement = $(element.find(".a-text-normal[href]"));

    const url = `${AMAZON_BASE_URL}${titleElement.attr("href")}`;

    await crawler.addRequests([
      {
        //access the url function we set previous by accessing the href element in the html site
        url,
        label: labels.PRODUCT,
        //userData is predefined in the request
        userData: {
          data: {
            //define a data object with the following properties

            //set the title by cleaning up the string and setting the product name
            title: titleElement.first().text().trim(),
            //retrieve the data-asin value --> refer to amazon to understand this implementation better
            asin: element.attr("data-asin"),
            //set the item url based on the value extracted from the href
            itemUrl: url,
            keyword,
          },
        },
      },
    ]);
  }
});

//within the product page handler, we will follow a similar pattern --> this is the route handler for each specific product within page 1 search for babyWipes
router.addHandler(labels.PRODUCT, async ({ $, request, crawler }) => {
  const { data } = request.userData;
  const element = $("div#productDescription");
  await crawler.addRequests([
    {
      //creatiing an array of objects --> except we are plugging in the asin of this specific product
      url: `${AMAZON_BASE_URL}/gp/aod/ajax/ref=auto_load_aod?asin=${data.asin}&pc=dp`,
      label: labels.OFFERS,
      userData: {
        //userData object will contain a nested data object
        data: {
          ...data,
          description: element.text().trim(),
        },
      },
    },
  ]);
});

//define the router handler for labels.OFFERS
router.addHandler(labels.OFFERS, async ({ request, $ }) => {
  const { data } = request.userData;
  for (const offer of $("#aod-offer")) {
    const element = $(offer);

    await Dataset.pushData({
      //spread out all the previous data using the spread operator
      ...data,
      sellerName: element.find('div[id*="soldby"] a[aria-label]').text().trim(),
      offer: element.find(".a-price, .a-offscreen").text().trim(),
    });
  }
});

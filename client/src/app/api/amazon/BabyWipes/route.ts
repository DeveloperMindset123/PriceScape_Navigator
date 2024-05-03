import {
  Dataset,
  createCheerioRouter,
  resolveBaseUrlForEnqueueLinksFiltering,
} from "crawlee";

//set router
export const router = createCheerioRouter();
router.addDefaultHandler(({ log }) => {
  log.info("Route reached");
});

router.addHandler("START", async ({ request }) => {
  const { keyword } = request.userData;
});

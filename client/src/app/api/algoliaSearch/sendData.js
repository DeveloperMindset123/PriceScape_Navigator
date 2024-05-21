//TODO : Sample code, attempting to setup and run the appropriate endpoint to ensure data is being sent to algolia
index.setSettings({
    attributeForDistinct: 'Product Name' || "title",
    distinct : true
}).then(({ hits }) => {
    // display the resulting search result
    console.log(hits);
})
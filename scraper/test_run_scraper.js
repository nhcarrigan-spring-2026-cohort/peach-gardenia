const { runScraper } = require("./run_scraper");

(async() => {
    try {
        console.log("Test before await")

        const url = "https://www.amazon.com/hz/wishlist/ls/1L6JJ9OB0IRP9"
        console.log("Starting scrape...")

        const items = await runScraper(url)

        console.log("after await - got items:", items.length)

        console.log("Huzzah it worked!")
        console.log("Type:", Array.isArray(items) ? "array" : typeof items)
        console.log("Item count:", items.length)

        console.log("First item:", items[0])
    } catch (err) {
        console.error("Womp womp scraper failed.")
        console.error(err.message)
        // process.exit(1)
    } finally {
        console.log("test done")
    }
})();
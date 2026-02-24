// lets Node run Py
const { spawn } = require("child_process");
const path = require("path")

function runScraper(url) {
    return new Promise((resolve, reject) => {
        
        const pythonPath = process.platform === "win32" 
            ? path.join(__dirname, "..", ".venv", "Scripts", "python.exe")
            : path.join(__dirname, "..", ".venv", "bin", "python")

        // scraper script in the same directory as this file
        const scraperDir = __dirname

        // run the Py script
        const proc = spawn(pythonPath, ["main.py", "--url", url], {
            cwd: scraperDir,
            windowsHide: true,
        })

        let stdout = ""
        let stderr = ""

        // add normal Py output to stdout
        proc.stdout.on("data", (data) => {
            stdout += data.toString()
        })
        
        // add any errors to stderr
        proc.stderr.on("data", (data) => {
            stderr += data.toString()
        })

        // check exit code when Py program ends
        proc.on("close", (code) => {
            if (code !== 0) {
                return reject(
                    new Error(
                        `Scraper failed. Python exited with code ${code}\n\nSTDERR:\n${stderr}`))
            }

            if (!stdout || stdout.trim().length === 0) {
                return reject(new Error(`Python produced no stdout produced.\n\nSTDERR:\n${stderr}`))
            }
            
            // parse output from Py
            try {
                const parsed_data = JSON.parse(stdout)
                if (!Array.isArray(parsed_data)) {
                    return reject(new Error('Output was not a JSON array.'))
                }
                return resolve(parsed_data)
            } catch (err) {               
                return reject(new Error(`Invalid JSON from scraper. See above preview`))
            }
        })
    })
}

module.exports = { runScraper }
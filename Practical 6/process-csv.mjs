import { createReadStream, createWriteStream, promises as fs } from 'fs';
import { createInterface } from 'readline';
import { pipeline, Transform } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

/**
 * A transform stream that parses CSV lines, extracts email domains,
 * and counts them.
 */
class DomainCounter extends Transform {
    constructor(options) {
        super({ ...options, objectMode: true });
        this.domainCounts = new Map();
    }

    _transform(line, encoding, callback) {
        // Assuming CSV format: id,name,email
        const columns = line.split(',');
        if (columns.length >= 3) {
            const email = columns[2].trim();
            const domain = email.substring(email.lastIndexOf('@') + 1);
            if (domain) {
                this.domainCounts.set(domain, (this.domainCounts.get(domain) || 0) + 1);
            }
        }
        callback();
    }
}

/**
 * Main function to process the CSV file.
 */
async function processCSV() {
    console.log('Starting CSV processing...');
    const sourcePath = 'data/users.csv';
    const outputPath = 'out/domains.json';

    // Ensure output directory exists
    await fs.mkdir('out', { recursive: true });

    const sourceStream = createReadStream(sourcePath);
    const lineReader = createInterface({
        input: sourceStream,
        crlfDelay: Infinity
    });

    const domainCounter = new DomainCounter();

    try {
        // Use pipeline to connect the streams. It handles backpressure and error cleanup.
        await pipelineAsync(
            lineReader,
            domainCounter
        );

        // Once the stream is finished, write the results to the JSON file
        const sortedDomains = [...domainCounter.domainCounts.entries()]
            .sort((a, b) => b[1] - a[1]);

        const jsonOutput = JSON.stringify(Object.fromEntries(sortedDomains), null, 2);

        await fs.writeFile(outputPath, jsonOutput);

        console.log(`✅ CSV processing complete. Results saved to ${outputPath}`);
        return {
            totalDomains: domainCounter.domainCounts.size,
            topDomain: sortedDomains[0]
        };
    } catch (err) {
        console.error('🚨 Pipeline failed:', err);
        throw err;
    }
}

export { processCSV };

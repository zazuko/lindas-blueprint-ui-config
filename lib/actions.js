import SparqlClient from 'sparql-http-client/SimpleClient.js';
import * as queries from './queries.js';
import fs from 'fs';

async function fetchClasses(options) {
    logENV();

    console.log(`output filename: ${options.output}`);

    const clientOptions = {
        endpointUrl: process.env.SPARQL_ENDPOINT,
        user: process.env.SPARQL_USER,
        password: process.env.SPARQL_PASS
    };

    const client = new SparqlClient(clientOptions);

    const queryOptions = { operation: 'postDirect', headers: { 'Accept': 'text/turtle' } };
    const res = await client.query.construct(queries.constructCandidateClasses, queryOptions);

    if (!res.ok) {
        return console.error(`error: ${res.status} ${res.statusText}`);
    }

    const data = await res.text();

    const file = options.output;
    try {
        fs.writeFileSync(file, data, 'utf8');
        console.log(`File ${file} has been written`);
    } catch (err) {
        return console.error(err);
    }
}


async function fetchLinks(options) {
    logENV();

    console.log(`classes filename: ${options.classes}`);
    console.log(`output filename: ${options.output}`);
}


async function fetchDetails(options) {
    logENV();

    console.log(`classes filename: ${options.classes}`);
    console.log(`output filename: ${options.output}`);
}


async function generateConfig(options) {
    console.log(`classes filename: ${options.classes}`);
    console.log(`links filename: ${options.links}`);
    console.log(`details filename: ${options.details}`);
    console.log(`output filename: ${options.output}`);
}


function logENV() {
    console.log(`SPARQL_ENDPOINT: ${process.env.SPARQL_ENDPOINT}`);
    console.log(`SPARQL_USER: ${process.env.SPARQL_USER}`);
    console.log(`SPARQL_PASS: ${process.env.SPARQL_PASS !== undefined ? '********' : undefined}`);
}


export {
    fetchClasses,
    fetchLinks,
    fetchDetails,
    generateConfig
}
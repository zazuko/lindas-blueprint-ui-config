import SparqlClient from 'sparql-http-client/SimpleClient.js';
import * as queries from './queries.js';
import fs from 'fs';

const clientOptions = {
    endpointUrl: process.env.SPARQL_ENDPOINT,
    user: process.env.SPARQL_USER,
    password: process.env.SPARQL_PASS
};

const client = new SparqlClient(clientOptions);

const queryOptions = { operation: 'postDirect', headers: { 'Accept': 'text/turtle' } };


async function fetchClasses(options) {
    logENV();
    console.log(`output filename: ${options.output}`);

    const data = await runGraphQuery(queries.constructCandidateClasses);
    writeDataToFile(options.output, data);
}


async function fetchLinks(options) {
    logENV();
    console.log(`classes filename: ${options.classes}`);
    console.log(`output filename: ${options.output}`);

    // TODO: read classes from file
    const classes = new Set([
        "http://schema.example.org/BexioProject",
        "https://schema.org/Organization",
        "https://schema.org/Person"
    ]);
    
    const query = parametrizeQuery(queries.constructCandidateLinks, ["%%values-cls%%", "%%values-linktype%%"], classes);
    // console.log(query);

    const data = await runGraphQuery(query);

    // TODO: pretty-print bNodes
    writeDataToFile(options.output, data);
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

function parametrizeQuery(queryTemplate, placeholders, classes) {
    const valuesString = Array.from(classes)
      .map(iri => `\n<${iri}>`)
      .sort()
      .join('');
  
    let query = queryTemplate;
    placeholders.forEach(x => {
      query = query.replaceAll(x, valuesString);
    });
  
    return query;
  }

async function runGraphQuery(query) {
    const res = await client.query.construct(query, queryOptions);

    if (!res.ok) {
        return console.error(`error: ${res.status} ${res.statusText}`);
    }

    return await res.text();
}

function writeDataToFile(file, data) {
    try {
        fs.writeFileSync(file, data, 'utf8');
        console.log(`File ${file} has been written`);
    } catch (err) {
        console.error(err);
        throw err;
    }
}


export {
    fetchClasses,
    fetchLinks,
    fetchDetails,
    generateConfig
}
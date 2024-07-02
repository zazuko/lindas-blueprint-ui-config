import SparqlClient from 'sparql-http-client/SimpleClient.js';
import * as queries from './queries.js';
import fs from 'fs';
import rdfEnv from './rdf-env.js'

const clientOptions = {
    endpointUrl: process.env.SPARQL_ENDPOINT,
    user: process.env.SPARQL_USER,
    password: process.env.SPARQL_PASS
};

logENV();
const client = new SparqlClient(clientOptions);

const queryOptions = { operation: 'postDirect', headers: { 'Accept': 'text/turtle' } };


async function fetchClasses(options) {
    console.log(`output filename: ${options.output}`);

    const data = await runGraphQuery(queries.constructCandidateClasses);
    writeDataToFile(options.output, data);
}


async function fetchLinks(options) {
    console.log(`classes filename: ${options.classes}`);
    console.log(`output filename: ${options.output}`);

    const classes = await readClassesFromFile(options.classes);
    // console.log(classes);
        
    const query = parametrizeQuery(queries.constructCandidateLinks, ["%%values-cls%%", "%%values-linktype%%"], classes);
    // console.log(query);
    
    const data = await runGraphQuery(query);
    
    // TODO: pretty-print bNodes
    writeDataToFile(options.output, data);
}

    
async function readClassesFromFile(file) {
    const dataset = await rdfEnv.dataset().import(rdfEnv.fromFile(file));
    
    const classes = new Set()
    dataset.filter(quad => quad.predicate.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' && quad.object.value === 'http://schema.example.org/blueprint-config-creator/Class')
        .forEach(quad => classes.add(quad.subject.value));
    
    return classes;
}


async function fetchDetails(options) {
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
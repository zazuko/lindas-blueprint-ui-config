# blueprint-ui-config-initializer

Initializer for [Zazuko Blueprint](https://github.com/zazuko/blueprint) UI configuration.


## Install

```
npm ci
```


## Run

```
node cli.js [command]
```


To have the SPARQL queries printed on the console, you can set `DEBUG=sparql`:

```
DEBUG=sparql node cli.js fetch-classes
```


## How to use this

Sample procedure:

0) Set environment variables:
   * `SPARQL_ENDPOINT`, `SPARQL_USER`, `SPARQL_PASS`
1) Run command `fetch-classes`
   * This will query the candidate classes from `SPARQL_ENDPOINT`
   * Writes the candidate classes to the file *_classes.ttl* by default
2) Select the classes you want from the candidate classes:
   * Copy the file *_classes.ttl* to *classes.ttl* (removing the leading underscore character)
   * Edit *classes.ttl* and comment out the classes you don't want
   * Optionally, you can also modify the label, icon, colorIndex and searchPrio
3) Run command `fetch-links`
   * This will query the candidate links from `SPARQL_ENDPOINT`
   * Candidate links are all links between any instance of any of the classes from the file *classes.ttl*
   * Writes the candidate links to the file *_links.ttl* by default
4) Select the links you want from the candidate links:
   * Copy the file *_links.ttl* to *links.ttl* (removing the leading underscore character)
   * Edit *links.ttl* and comment out the links you don't want
5) Run command `fetch-details`
   * This will query the candidate details from `SPARQL_ENDPOINT`
   * Candidate details are all attributes of any instance of any of the classes from the file *classes.ttl*
   * Writes the candidate details to the file *_details.ttl* by default
6) Select the details you want from the candidate details:
   * Copy the file *_details.ttl* to *details.ttl* (removing the leading underscore character)
   * Edit *details.ttl* and comment out the details you don't want
   * Optionally, you can also modify the label and order
7) Run command `generate-config`
   * This will combine your selections from *classes.ttl*, *links.ttl* and *details.ttl*
   * Writes the generated Blueprint UI configuration to the file *_blueprint-ui-config.ttl* by default

Commenting out (instead of deleting) the classes, links and details that you don't want to see in Blueprint is recommended. This has the advantage that candidate TTL files can be re-generated at a later point and compared with a previous version kept under version control.


### Commands overview

| Command | Input | Output | Description |
| -------- | -------- | -------- | -------- |
| `fetch-classes`  | Data from endpoint  | *_classes.ttl*  | Fetch candidate classes from SPARQL_ENDPOINT |
| `fetch-links`  | Data from endpoint, *classes.ttl*  | *_links.ttl*  | Fetch candidate links between given classes from SPARQL_ENDPOINT |
| `fetch-details`  | Data from endpoint, *classes.ttl*  | *_details.ttl*  | Fetch candidate details for given classes from SPARQL_ENDPOINT |
| `generate-config`  | *classes.ttl*, *links.ttl*, *details.ttl* | *_blueprint-ui-config.ttl*  | Generate Blueprint UI configuration from given classes, links and details |


To see the options for a specific command, type `node cli.js help <command>`

For example `node cli.js help fetch-classes` will show information concerning the `fetch-classes` command


## Customization of the initializer

This initialization is based on running SPARQL queries on your data. You can find these queries in the `lib/queries` folder, in case you want to modify them.
# blueprint-ui-config-initializer

Initializer for Zazuko Blueprint UI configuration


## Install

```
npm ci
```


## Run

```
node cli.js
```


## How to use this

Sample procedure:

0) Set environment variables: `SPARQL_ENDPOINT`, `SPARQL_USER`, `SPARQL_PASS`
1) Run `fetch-classes`. By default, this will write the candidate classes to the file *_classes.ttl*
2) Copy the file *_classes.ttl* to *classes.ttl* (removing the leading underscore character). Edit *classes.ttl*, comment out the classes you don't want. You can also modify the label, icon, ...
3) Run `fetch-links`. By default, this will write the candidate links to the file *_links.ttl*
4) ...


### Commands overview

| Command | Input | Output | Description |
| -------- | -------- | -------- | -------- |
| `fetch-classes`  | Data from endpoint  | *_classes.ttl*  | Fetch candidate classes from SPARQL_ENDPOINT |
| `fetch-links`  | Data from endpoint, *classes.ttl*  | *_links.ttl*  | Fetch candidate links between given classes from SPARQL_ENDPOINT |
| `fetch-details`  | Data from endpoint, *classes.ttl*  | *_details.ttl*  | Fetch candidate details for given classes from SPARQL_ENDPOINT |
| `generate-config`  | *classes.ttl*, *links.ttl*, *details.ttl* | *_blueprint-ui-config.ttl*  | Generate Blueprint UI configuration from given classes, links and details |


To see the options for a specific command, type `node cli.js help <command>`

e.g. `node cli.js help fetch-classes` will show information concerning the `fetch-classes` command
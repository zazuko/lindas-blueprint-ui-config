# Using Stardog Reasoning Schemas

Stardog Documentation: https://docs.stardog.com/inference-engine/#reasoning-schemas

Schema(-Name): `blueprintSchema`

Named-Graph: `http://example.org/graph/lindas/blueprint-reasoning-schema`


## Populating the Named-Graph with schema.org snippet

```
curl -i -X PUT -T schemaorg.nt -u $SPARQL_USERPASS -H "Content-Type: application/n-triples" $SPARQL_GSP_ENDPOINT?graph=http%3A%2F%2Fexample.org%2Fgraph%2Flindas%2Fblueprint-reasoning-schema
```


## Registering the schema with Stardog

```
stardog reasoning schema --add blueprintSchema --graphs "http://example.org/graph/lindas/blueprint-reasoning-schema" -u $USER -- https://stardog-test.cluster.ldbar.ch:443/lindas
```

Verify by listing the reasoning schemas:
```
stardog reasoning schema --list https://stardog-test.cluster.ldbar.ch:443/lindas -u $USER
```


## Run a query using the reasoning schema

Stardog Documentation: https://stardog-union.github.io/http-docs/#tag/Reasoning/operation/queryPostWithReasoning

Query Parameter: `schema=blueprintSchema`


```
curl -i -H "Accept: text/csv" \
     -H "Content-Type: application/sparql-query" \
     --data-binary "@select-label.rq" \
     -u $SPARQL_USERPASS \
     -X POST \
     https://stardog-test.cluster.ldbar.ch/lindas/query?schema=blueprintSchema
```

```
curl -i -H "Accept: text/csv" \
     -d "schema=blueprintSchema" \
     --data-urlencode  query@select-label.rq \
     -u $SPARQL_USERPASS \
     -X GET \
     https://stardog-test.cluster.ldbar.ch/lindas/query
```

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


## Blueprint queries

`blueprint-search.rq` - without reasoning (runs fine, returns in 0.7 seconds):

```
time curl -i -H "Accept: application/n-triples" \
     -H "Content-Type: application/sparql-query" \
     --data-binary "@blueprint-search.rq" \
     -u $SPARQL_USERPASS \
     -X POST \
     https://stardog-test.cluster.ldbar.ch/lindas/query
```


`blueprint-search.rq` - with reasoning (Query execution cancelled: Execution time exceeded query timeout 120000):

```
time curl -i -H "Accept: application/n-triples" \
     -H "Content-Type: application/sparql-query" \
     --data-binary "@blueprint-search.rq" \
     -u $SPARQL_USERPASS \
     -X POST \
     https://stardog-test.cluster.ldbar.ch/lindas/query?schema=blueprintSchema
```


Using pragmas with [reasoning-hints](https://docs.stardog.com/operating-stardog/database-administration/managing-query-performance#reasoning-hints) can help to make the query work - but runs slower (returns in 1.4 seconds):

```
time curl -i -H "Accept: application/n-triples" \
     -H "Content-Type: application/sparql-query" \
     --data-binary "@blueprint-search-with-reasoning-pragmas.rq" \
     -u $SPARQL_USERPASS \
     -X POST \
     https://stardog-test.cluster.ldbar.ch/lindas/query?schema=blueprintSchema
```

Same goes for search with filtering on a class, see `blueprint-search-govorg-with-reasoning-pragmas.rq`
#!/bin/bash

# Usage:
#   docker run --rm -it -v $(pwd):/app zazukoians/node-java-jena:v5 ./build.sh
#   The output of the build is the consolidated config file `config.nt`.

# Define the output file
output_file="config.nt"

# Clear the output file initially
> "$output_file"

# Concat ntriples from the relevant config parts
riot --out=ntriples _blueprint-ui-config.ttl >> "$output_file"
# riot --out=ntriples hierarchies.ttl >> "$output_file"


# Run validation
echo "Validating data..."
riot --validate $output_file

# Check the return code
if [ $? -eq 0 ]; then
    # No errors found
    echo "No errors found"
    echo "Consolidated config file: $output_file"
else
    # Errors found, exit with non-zero status
    echo "Validation failed with errors"
    exit 1
fi
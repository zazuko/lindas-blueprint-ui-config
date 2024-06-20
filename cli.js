const { Command } = require('commander');
const program = new Command();

program
  .name('blueprint-ui-config-initializer')
  .description('Initializer for Zazuko Blueprint UI configuration');

program.command('fetch-classes')
  .description('Fetch candidate classes from SPARQL_ENDPOINT')
  .option('--output <filename>', 'output filename', './_classes.ttl')
  .action((options) => {    
      
    logENV();
    
    console.log(`output filename: ${options.output}`);
  });


program.command('fetch-links')
  .description('Fetch candidate links between given classes from SPARQL_ENDPOINT')
  .option('--classes <filename>', 'classes filename', './classes.ttl')
  .option('--output <filename>', 'output filename', './_links.ttl')
  .action((options) => {

    logENV();

    console.log(`classes filename: ${options.classes}`);
    console.log(`output filename: ${options.output}`);
  });


program.command('fetch-details')
  .description('Fetch candidate details for given classes from SPARQL_ENDPOINT')
  .option('--classes <filename>', 'classes filename', './classes.ttl')
  .option('--output <filename>', 'output filename', './_details.ttl')
  .action((options) => {

    logENV();

    console.log(`classes filename: ${options.classes}`);
    console.log(`output filename: ${options.output}`);
  });


program.command('generate-config')
  .description('Generate Blueprint UI configuration from given classes, links and details')
  .option('--classes <filename>', 'classes filename', './classes.ttl')
  .option('--links <filename>', 'links filename', './links.ttl')
  .option('--details <filename>', 'details filename', './details.ttl')
  .option('--output <filename>', 'output filename', './_blueprint-ui-config.ttl')
  .action((options) => {
    
    console.log(`classes filename: ${options.classes}`);
    console.log(`links filename: ${options.links}`);
    console.log(`details filename: ${options.details}`);
    console.log(`output filename: ${options.output}`);
  });


program.parse();


function logENV() {
  console.log(`SPARQL_ENDPOINT: ${process.env.SPARQL_ENDPOINT}`);
  console.log(`SPARQL_USER: ${process.env.SPARQL_USER}`);
  console.log(`SPARQL_PASS: ${process.env.SPARQL_PASS}`);
}

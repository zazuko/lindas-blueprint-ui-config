import fs from 'fs';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const constructCandidateClasses = fs.readFileSync(resolve(__dirname, 'queries/construct-candidate-classes.rq'), 'utf8')
const constructCandidateLinks = fs.readFileSync(resolve(__dirname, 'queries/construct-candidate-links.rq'), 'utf8')

export {
    constructCandidateClasses,
    constructCandidateLinks
}
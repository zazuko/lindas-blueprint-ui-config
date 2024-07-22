import rdfEnv from './rdf-env.js'
import formats from '@rdfjs-elements/formats-pretty'
import { TurtleSerializer } from '@rdfjs-elements/formats-pretty'
import { Readable } from 'readable-stream'
import getStream from 'get-stream'

const sink = new TurtleSerializer({
    prefixes: {
        '': 'http://schema.example.org/blueprint-config-creator/'
    }
})

async function prettify(uglyTurtle) {
    if (uglyTurtle === undefined) {
        return undefined;
    }

    const inQuadStream = formats.parsers.import('text/turtle', Readable.from(uglyTurtle))

    const dataset = await rdfEnv.dataset().import(inQuadStream)

    const outStream = sink.import(dataset.toStream())
    const result = await getStream(outStream)

    return result
}

export {
    prettify
}
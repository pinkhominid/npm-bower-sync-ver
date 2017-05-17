#!/usr/bin/env node

const fs = require('fs')
const program = require('commander')
const meta = require('./package.json')

try {
  let version

  program
    .version(meta.version)
    .arguments('<version>')
    .action(v => { version = v })
    .parse(process.argv)

  if (typeof version === 'undefined') {
    throw new Error('Error: missing required <version> argument, see bower-setv --help')
  }

  if (version) {
    let fileStr = fs.readFileSync('./bower.json', 'utf-8')
    fileStr = fileStr.replace(/(.*"version"\s*:\s*")[^"]*(".*)/, '$1' + version + '$2')
    fs.writeFileSync('./bower.json', fileStr, 'utf-8')
  }

  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}

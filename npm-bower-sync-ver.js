#!/usr/bin/env node

const fs = require('fs')
const program = require('commander')
const meta = require(`${process.cwd()}/package.json`)

try {
  let ver = meta.version

  program
    .version(meta.version)
    .arguments('<version>')
    .action(v => { ver = v })
    .parse(process.argv)

  if (ver) {
    let fileStr = fs.readFileSync('./bower.json', 'utf-8')
    const verPtn = /(.*"version"\s*:\s*")[^"]*(".*)/

    if (verPtn.test(fileStr)) {
      fileStr = fileStr.replace(verPtn, '$1' + ver + '$2')
      fs.writeFileSync('./bower.json', fileStr, 'utf-8')
    }
  }

  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}

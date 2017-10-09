#!/usr/bin/env node

const fs = require('fs')
const program = require('commander')
const meta = require('./package.json')
const path = require('path')

const DEFAULT_FILE_PATHS = [ './bower.json' ]

function collect (val, memo) {
  memo.push(val)
  return memo
}

function updateVersion (file, ver) {
  const resolved = path.resolve(file)

  let fileStr = fs.readFileSync(resolved, 'utf-8')
  const verPtn = /(.*"version"\s*:\s*")[^"]*(".*)/

  if (verPtn.test(fileStr)) {
    fileStr = fileStr.replace(verPtn, '$1' + ver + '$2')
    fs.writeFileSync(resolved, fileStr, 'utf-8')
  }
}

try {
  let ver = meta.version

  program
    .version(meta.version)
    .option('-f, --file [file]', 'The target file to sync. Defaults to bower.json', collect, DEFAULT_FILE_PATHS)
    .arguments('<version>')
    .action(v => { ver = v })
    .parse(process.argv)

  if (ver) {
    program.file.forEach(
      file => updateVersion(file, ver)
    )
  }

  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}

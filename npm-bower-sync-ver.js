#!/usr/bin/env node

const fs = require('fs')
const program = require('commander')
const libPkg = require('./package.json')
const pkg = require(`${process.cwd()}/package.json`)
const path = require('path')

const defaultFiles = [ './bower.json' ]
const verPtn = /(.*"version"\s*:\s*")[^"]*(".*)/

function collect (val, memo) {
  memo.push(val)
  return memo
}

function updateVersion (file, ver) {
  const resolved = path.resolve(file)

  let fileStr = fs.readFileSync(resolved, 'utf-8')

  if (verPtn.test(fileStr)) {
    fileStr = fileStr.replace(verPtn, '$1' + ver + '$2')
    fs.writeFileSync(resolved, fileStr, 'utf-8')
  }
}

try {
  // default ver
  let ver = pkg.version

  program
    .version(libPkg.version)
    .option('-f, --file [file]', 'target file to sync (default bower.json)', collect, [])
    .arguments('<version>')
    .action(v => { ver = v })
    .parse(process.argv)

  if (ver) {
    if (!program.file.length) program.file = defaultFiles

    program.file.forEach(
      file => updateVersion(file, ver)
    )
  }

  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}

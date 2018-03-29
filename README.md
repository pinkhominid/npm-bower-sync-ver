# Npm Bower Sync Ver

Simple Node.js CLI to synchronize the version property in package.json and bower.json using package.json as the source of truth. Bower deprecated the use of the version property but it is still required by some artifact repositories like JFrog's Artifactory.

## Setup

Install

```shell
npm i -D npm-bower-sync-ver
```

Then add the version line to your package.json scripts property object

```js
  "scripts": {

    "version": "npm-bower-sync-ver && git add bower.json"

  }
```

## Usage

Now you can use npm to bump version and it will automatically update bower.json before the commit and tag.

```shell
npm version minor
```

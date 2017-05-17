# Npm Bower Sync Version

Node.js CLI to synchronize the versions in package.json and bower.json using package.json as the source of truth. Bower deprecated the use of the version property but it is still required by some artifact repositories like JFrog's Artifactory.

## Setup

Install

```shell
npm i --save-dev npm-bower-sync-version
```

Then add the following line to package.json scripts property

```json
"version": "npm-bower-sync-version"
```

## Usage

From that point you can use npm to update version and it will automatically update bower.json before the commit and tag.

```shell
npm version minor
```

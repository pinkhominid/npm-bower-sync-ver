# Npm Bower Sync Version
---

Synchronize the versions found in package.json and bower.json using package.json as the source of truth. Though Bower deprecated the use of the version property it is still required by some artifact repositories like JFrog's Artifactory.

## Usage
---
npm i --save-dev npm-bower-sync-version

Add the following line to package.json scripts property,

"version": "npm-bower-sync-version"

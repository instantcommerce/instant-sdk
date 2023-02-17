# @instantcommerce/cli

## Install

```bash
$ npm install --global @instantcommerce/cli
```

## CLI

```
$ instant --help

  Usage
    $ instant <command>

  Commands:
    instant login                        Login to your account
    instant whoami                       Check current login status
    instant logout                       Logout of current account
    instant refresh                      Refresh your access token
    instant select                       Select organization and store
    instant init <name> <template>       Initialize a new Instant project
    instant generate <schematic> <name>  Generate new Instant element
      Options:
        -t, --type
    instant dev                          Start the local development environment
    instant add [blocknames..]           Add block(s) to the platform, space-separated list of blocknames to limit
    instant publish [blocknames..]       Publish new version of block(s), space-separated list of blocknames to limit

  Options:
    --version  Show version number
    --help     Show help
```

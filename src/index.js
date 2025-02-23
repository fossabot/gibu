#!/usr/bin/env node
import {join} from 'path';
import React from 'react';
import {cyan, dim} from 'chalk';
import meow from 'meow';
import getStdin from 'get-stdin';
// import reopenTTY from 'reopen-tty';
import read from 'read-pkg';
import {render} from 'ink';
import Main from './ui';

const showVersion = () => {
    const cwd = join(__dirname, '..');
    const {version} = read.sync({cwd});
    console.log(version); // eslint-disable-line no-console
    process.exit();
};
const help = `
    ${dim.bold('Usage')}

        ${cyan('>')} gibu [path/to/folder] [options]

    ${dim.bold('Options')}

        --absolute          -a  Copy absolute path for file [Default: false]
        --content           -c  Copy file content instead of file name [Default: false]
        --debug             -d  Show debug data [Default: false]
        --filename-only     -f  Copy only filename, not the entire path [Default: false]
        --help              -h  Shoq this help message
        --ignore-warnings,  -i  Ignore warning messages [Default: false]
        --limit             -l  Set maximum number of items to be shown at once [Default: 30]
        --output            -o  Choose output file to save clipboard content to [Default: '']
        --remove-extension  -r  Remove file extension from returned string [Default: false]
        --version,          -v  Print version

    ${dim.bold('Options')}

        ${dim('Copy the NSE script name for use with "nmap $IP --script <paste here>"')}
        ${cyan('>')} gibu /usr/share/nmap/scripts --remove-extension

        ${dim('Copy path to wordlist for use with hydra, medusa, gobuster, etc...')}
        ${cyan('>')} gibu /usr/share/wordlist --absolute

        ${dim('Copy exploit content to clipboard')}
        ${cyan('>')} gibu /usr/share/exploitdb/exploits --content


`;
const options = {
    help,
    flags: {
        absolute: {
            type: 'boolean',
            default: false,
            alias: 'a'
        },
        content: {
            type: 'boolean',
            default: false,
            alias: 'c'
        },
        debug: {
            type: 'boolean',
            default: false,
            alias: 'd'
        },
        filenameOnly: {
            type: 'boolean',
            default: false,
            alias: 'f'
        },
        help: {
            type: 'boolean',
            default: false,
            alias: 'h'
        },
        ignoreWarnings: {
            type: 'boolean',
            default: false,
            alias: 'i'
        },
        limit: {
            type: 'number',
            default: 40,
            alias: 'l'
        },
        output: {
            type: 'string',
            default: '',
            alias: 'o'
        },
        removeExtension: {
            type: 'boolean',
            default: false,
            alias: 'r'
        },
        version: {
            type: 'boolean',
            default: false,
            alias: 'v'
        }
    }
};
(async () => {
    const stdin = await getStdin();
    const {input, flags} = meow(options);
    (input[0] === 'version' || flags.version) && showVersion();
    // const foo = await getFileContent('.editorconfig', 'utf8');
    // console.log(foo);
    render(<Main flags={flags} input={input} stdin={stdin}/>, {exitOnCtrlC: true});
})();
export default {};
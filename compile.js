const JavaScriptObfuscator = require('javascript-obfuscator');
const copydir = require('copy-dir');
const fs = require('fs')

// copy whole src dir to srcc
copydir.sync('./app', './app', {
    utimes: true,
    mode: true,
    cover: true
});

// obfuscate
function walkDirRecursive(pathInput) {
    let dir = fs.opendirSync(pathInput)
    let val = dir.readSync()
    while (val) {
        if ((pathInput + '/' + val.name).includes('vendor')) {
            console.log("SKIPPED: " + pathInput + '/' + val.name);
        } else {
            if (val.name.includes('.js')) {
                console.log(pathInput + '/' + val.name);
                let scriptContent = fs.readFileSync(pathInput + '/' + val.name, 'utf8');
                let obfuscationResult = JavaScriptObfuscator.obfuscate(scriptContent, {
                    compact: false,
                    controlFlowFlattening: true
                });
                let protectedScriptContent = obfuscationResult.getObfuscatedCode();
                fs.writeFileSync(pathInput + '/' + val.name, protectedScriptContent);
            }
        }

        if (val.isDirectory()) {
            walkDirRecursive(pathInput + '/' + val.name);
        }

        val = dir.readSync();
    }
}

//run
walkDirRecursive('./apps');


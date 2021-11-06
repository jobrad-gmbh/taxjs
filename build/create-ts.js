import SaxonJS from 'saxon-js';
import AdmZip from 'adm-zip';
import fetch from 'node-fetch';
import * as path from 'path';

// create json XSLT from xml XSLT:
// xslt3 -xsl:build/transform.xsl -export:build/transform.sef.json -t -ns:##html5

const testVersion = '2021.0.0';
const download = 'https://repo1.maven.org/maven2/info/kuechler/bmf/taxapi/taxxmls/' + testVersion + '/taxxmls-' + testVersion + '.jar';
const unpackFolder = "build/unpacked";
const tsFolder = "build/ts";

fetch(download).then(res => res.buffer())
    .then(buffer => {
        return new Promise(function (resolve, reject) {
            var zip = new AdmZip(buffer);
            var zipEntries = zip.getEntries();
            var found = [];
            zipEntries.forEach(function (zipEntry) {
                if (zipEntry.entryName.endsWith("Big.xml")) {
                    zip.extractEntryTo(zipEntry.entryName, unpackFolder, false, true);
                    found.push(zipEntry.entryName);
                }
            });
            resolve(found);
        })
    }).then(xmlFileNames => {
        const dirPath = path.join(path.resolve(path.dirname('.')), tsFolder);
        console.log("outdir: " + dirPath);
        xmlFileNames.forEach(function (xmlFileName) {
            console.log("create" + xmlFileName);
            SaxonJS.transform({
                stylesheetFileName: "build/transform.sef.json",
                sourceFileName: unpackFolder + '/' + xmlFileName,
                destination: "file",
                baseOutputURI: "file://" + dirPath + '/' + String(xmlFileName).replace('.xml', '.ts')
            }, "sync");
        });
    });

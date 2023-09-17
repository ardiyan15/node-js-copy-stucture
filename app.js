const fs = require('fs')
require('dotenv').config()

const listPath = process.env.LIST_PATH
const sourcePath = process.env.SOURCE_PATH
const destinationPath = process.env.DESTINATION_PATH

const pathObjects = fs.readFileSync(listPath).toString().split("\n")
let nameFolder = '';

for(i in pathObjects) {
    let subFolder = pathObjects[i].split("\\")
    for(let j = 0; j < subFolder.length; j++) {
        let isFile = subFolder[j].includes('.')
        if(!isFile) {
            nameFolder += subFolder[j].toString() + '/';
            if(!fs.existsSync(nameFolder)) {
                fs.mkdirSync(nameFolder, {recursive: true})
            }
        } else {
            let removeEnter = subFolder[j].replace("\r", " ")
            let fullPath = `${sourcePath}${nameFolder}${removeEnter}`.replace(/\/\//g, "/")
            let destPath = `${destinationPath}${nameFolder}${removeEnter}`
            fs.copyFile(fullPath.trim(), destPath.trim(), (err) => {
                console.log('Copying File From ' + '\x1b[32m%s\x1b[32m', `${fullPath}To ${destPath}`); 
                console.log("\n")
                if(err) throw err
            })
        }
        if(subFolder[j].includes('.')) {
            nameFolder = ''
        }
    }
}

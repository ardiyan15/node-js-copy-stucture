let fs = require('fs')
let pathObjects = fs.readFileSync('path_object.txt').toString().split("\n")

let nameFolder = '';
for(i in pathObjects) {
    let subFolder = pathObjects[i].split("\\")
    for(let j = 0; j < subFolder.length; j++) {
        let isFile = subFolder[j].includes('.')
        if(!isFile) {
            nameFolder += subFolder[j].toString()
            if(!fs.existsSync(nameFolder)) {
                fs.mkdirSync(nameFolder, {recursive: true})
            }
        } else {
            let removeEnter = subFolder[j].replace("\r", " ")
            let fullPath = `C:/laragon/www/bsi-fo/cms/${nameFolder}/${removeEnter}`.replace(/\/\//g, "/").trim()
            let destPath = `C:/Users/SGO-Kelvin/Desktop/ARDIYAN/Projects/node-txt/${nameFolder}${removeEnter}`.trim()

            fs.copyFile(fullPath, destPath, (err) => {
                if(err) throw err
                console.log(`Copying file from ${fullPath} => ${destPath}`)
                console.log('success copying')
            })

        }
        if(subFolder[j].includes('.')) {
            nameFolder = ''
        }
    }
}
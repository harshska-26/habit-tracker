const fs = require("fs")

const readJSON = (path) => {
    try{
        const readfile = fs.readFileSync(path)
        const ParsedData = JSON.parse(readfile)
        return ParsedData;
    }catch(e){
        console.log(`error is in ReadJSON ${e}`)
    }
}

const writeJSON = (data, path) => {
    try{
        const writeFile = fs.writeFileSync(path, JSON.stringify(data))
        return true;
    }catch(e){
        console.log(`Error is in WriteJSON ${e}`)
    }
}

module.exports = {readJSON, writeJSON}
const fs = require("fs");

readNObject = (dir, n) => {
    let res = null
    let data = ""
    try{
        data = fs.readFileSync(dir, "utf8")
    }catch{
        console.log("Could not find the specified file")
    }
    try{
        let objectStrings = data.split("\n")
        let properties = objectStrings[n].split(",")
        res = {"Name": properties[0], "Year": properties[1], "Director": properties[2]}
    }catch{
        console.log("The data in the text file is not in the right format")
    }
   return res
}

getNLines = (dir)=>{
    let res = null
    let data = ""
    try{
        data = fs.readFileSync(dir, "utf8")
    }catch{
        console.log("Could not find the specified file")
    }
    let objectStrings = data.split("\n")
    return objectStrings.length
}



module.exports = {readNObject, getNLines}
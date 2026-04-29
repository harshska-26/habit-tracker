const missingFieldFunc = (reqfields, reqbody) => {
    const missingFields = []

    reqfields.map((eachfield) => {
        if(!reqbody[eachfield]){
            missingFields.push(eachfield);
        }
    })

    if(missingFields.length>0){
        return missingFields;
    }
}

module.exports={missingFieldFunc}
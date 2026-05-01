const missingFieldFunc = (reqfields, reqbody) => {
    const missingFields = [];

    reqfields.map((eachfield) => {
        if (reqbody[eachfield] === undefined || reqbody[eachfield] === null) {
            missingFields.push(eachfield);
        }
    });

    if (missingFields.length > 0) {
        return missingFields;
    }
    return null;
};

module.exports = {missingFieldFunc}
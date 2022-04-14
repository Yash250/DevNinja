
exports.allInOne = async(model, queryName, criteria, updateObject, projections, options) => {
    return new Promise(async (resolve, reject) => {
        try{
            if(!updateObject) updateObject = {}
            if(!projections) projections = {}
            if(!options) options = {}
            const data = await model[queryName](criteria)
            resolve(data)
        } catch(err){
            reject(err)
        }
    })
}
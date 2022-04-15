
exports.allInOne = async(model, queryName, criteria, updateObject, projections, options) => {
    return new Promise(async (resolve, reject) => {
        try{
            const data = await model[queryName](criteria)
            resolve(data)
        } catch(err){
            reject(err)
        }
    })
}
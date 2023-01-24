const MongoQuery = module.exports

MongoQuery.seachQuery = function (query) {
    let result = {}

    Object.keys(query).map(key => {
        //Start
        if(key === "_start");
        //Limit
        else if(key === "_limit");
        //Sort
        else if(key.endsWith("_sort"));
        //Not equal
        else if (key.endsWith("_ne")) 
            result[key.replace(/_ne$/g, '')] = {
                $not: query[key]
            }
        // Lesser than
        else if (key.endsWith("_lt")) 
            result[key.replace(/_lt$/g, '')] = {
                $lt: query[key]
            }
        // Greater than
        else if (key.endsWith("_gt")) 
            result[key.replace(/_gt$/g, '')] = {
                $gt: query[key] 
            }
        // Lesser or Equal
        else if (key.endsWith("_lte")) 
            result[key.replace(/_lte$/g, '')] = {
                $lte: query[key]
            }
        // Greater or Equal
        else if (key.endsWith("_gte")) 
            result[key.replace(/_gte$/g, '')] = {
                $gte: query[key]
            }
        // Contains (case insensitive)
        else if (key.endsWith("_contains")) 
            result[key.replace(/_contains$/g, '')] = {
                $regex: query[key],
                $options: 'i'
        }
        // Contains (case sensitive)
        else if (key.endsWith("_containss")) 
            result[key.replace(/_containss$/g, '')] = {
                $regex: query[key]
            }
        // Exact match
        else 
            result[key] = query[key]
    })
    
    return result
}

MongoQuery.parametersQuery = function (query) {
    let result = {
        skip: 0,
        limit: 100,
        sort: {
            _id: 1
        }
    }

    Object.keys(query).map(key => {
        //Start
        if(key === "_start") {
            result.skip = parseInt(query[key])
        }
        //Limit
        else if(key === "_limit") {
            result.limit = parseInt(query[key])
        }
        //Sort
        else if(key.endsWith("_sort")) {
            result.sort = {
                [key.replace(/_sort$/g, '')]: query[key].toLowerCase() == 'desc' ? -1 : 1
            }
        }
    })
    
    return result
}
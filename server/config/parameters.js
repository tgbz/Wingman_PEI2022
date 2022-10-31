var fs = require('fs')
const Parameters = module.exports

var parametersFile = './config/paremeters.json'
var parameters = JSON.parse(fs.readFileSync(parametersFile))

Parameters.setParameter = function (key, value) {
    parameters[key].valor = value
    fs.unlinkSync(parametersFile)
    const dados = JSON.stringify(parameters, null, 4)
    fs.writeFileSync(parametersFile, dados)
}

Parameters.getParameter = function (key) {
    return parameters[key]
}

Parameters.getParameters = function () {
    return parameters
}

// add middlewares here related to actions
const Actions = require('./actions-model')

function actionsLogger (req, res, next) {
    const timestamp = new Date().toLocaleTimeString()
    const method = req.method
    const url = req.originalUrl
    console.log(`Actions Logger: [${timestamp}] ${method} to ${url}`)
    next()
}



module.exports = {
    actionsLogger,
}
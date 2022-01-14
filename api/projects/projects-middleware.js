// add middlewares here related to projects
const Projects = require('./projects-model')

function projectsLogger (req, res, next) {
    const timestamp = new Date().toLocaleTimeString()
    const method = req.method
    const url = req.originalUrl
    console.log(`Projects Logger: [${timestamp}] ${method} to ${url}`)
    next()
}

module.exports = {
    projectsLogger,
}
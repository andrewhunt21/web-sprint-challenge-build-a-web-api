// add middlewares here related to projects
const Projects = require('./projects-model')

function projectsLogger (req, res, next) {
    const timestamp = new Date().toLocaleTimeString()
    const method = req.method
    const url = req.originalUrl
    if (url === '/api/projects') {
        console.log(`Projects Logger: [${timestamp}] ${method} to ${url}`)
        next()
    } else {
        next()
    }
}

module.exports = {
    projectsLogger,
}
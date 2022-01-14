// add middlewares here related to projects
const Projects = require('./projects-model')

function logger (req, res, next) {
    const timestamp = new Date().toLocaleTimeString()
    const method = req.method
    const url = req.originalUrl
    console.log(`Logger: [${timestamp}] ${method} to ${url}`)
    next()
}

async function validateProjectID(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if (!project) {
            next({ status: 404, message: "project not found" })
        } else {
            req.projects = project
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: "something went wrong"
        })
    }
}

module.exports = {
    logger,
    validateProjectID,
}
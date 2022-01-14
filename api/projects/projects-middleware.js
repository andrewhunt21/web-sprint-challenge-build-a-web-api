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

function validateProject(req, res, next) {
    const { name, description, completed } = req.body
    if (!name || !description || !name.trim() || !description.trim()) {
        res.status(400).json({
            message: "name and description are required"
        })
    } else {
        req.name = name.trim()
        req.description = description.trim()
        req.completed = completed
        next()
    }
}

module.exports = {
    logger,
    validateProjectID,
    validateProject,
}
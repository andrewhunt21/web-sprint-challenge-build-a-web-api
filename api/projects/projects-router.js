// Write your "projects" router here!
const express = require('express')
const {
    validateProjectID,
    validateProject,
} = require('./projects-middleware')

const Projects = require('./projects-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.get('/:id', validateProjectID, (req, res) => {
    res.json(req.projects)
})

router.post('/', validateProject, (req, res, next) => {
    Projects.insert({ name: req.name, description: req.description, completed: req.completed })
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

router.put('/:id', validateProjectID, validateProject, (req, res, next) => {
    const { completed } = req.body
    if (typeof completed === 'undefined' || completed === null) {
        res.status(400).json({ message: "completed status is required" })
    } else {
        Projects.update(req.params.id, { name: req.name, description: req.description, completed: req.completed })
            .then(() => {
                return Projects.get(req.params.id)
            })
            .then(project => {
                res.json(project)
            })
            .catch(next)
    }
})

router.delete('/:id', validateProjectID, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id)
        res.json(req.project)
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = router
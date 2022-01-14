// Write your "actions" router here!
const express = require('express')
const { validateActionId, validateAction } = require('./actions-middlware')

const Actions = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)
})

router.post('/', validateAction, (req, res, next) => {
    Actions.insert({ project_id: req.project_id, description: req.description, notes: req.notes })
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
})

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    const { completed } = req.body
    if (typeof completed === 'undefined' || completed === null) {
        res.status(400).json({ message: "completed status is required" })
    } else {
        Actions.update(req.params.id, { project_id: req.project_id, description: req.description, notes: req.notes, completed: req.completed })
            .then(() => {
                return Actions.get(req.params.id)
            })
            .then(action => {
                res.json(action)
            })
            .catch(next)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = router
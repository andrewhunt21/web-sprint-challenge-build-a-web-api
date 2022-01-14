// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if (!action) {
            next({status: 404, message: "actions not found"})
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: "something went wrong"
        })
    }
}

function validateAction(req, res, next) {
    const { project_id, description, notes, completed } = req.body
    if (!project_id || !description || !description.trim() || !notes || !notes.trim()) {
        res.status(400).json({
            message: "missing required fields"
        })
    } else {
        req.project_id = project_id
        req.description = description.trim()
        req.notes = notes.trim()
        req.completed = completed
        next()
    }
}

module.exports = {
    validateActionId,
    validateAction,
}
import Router from "express-promise-router"
import { authenticateToken } from '../../middlewares/auth.js'
import { addNewVote, getTotalOfVotes } from '../../sequelize/db/user/votes.js'

const router = Router()

// validate vote and type, it must be 1, 0 or -1.
const validateVote = async (req, res, next) => {
    const { vote, positionGeo, toUser, commentId } = req.body
    const voteNumber = Number(vote)

    if (voteNumber !== 1 && voteNumber !== 0 && voteNumber !== -1) {
        return res.status(400).json({
            error: 'Vote is invalid',
            message: 'vote must be 1, 0 or -1'
        })
    }

    if (!positionGeo && !toUser && !commentId) {
        return res.status(400).json({
            error: 'Vote is invalid',
            message: 'positionGeo, toUser or commentId is required'
        })
    }

    // Only one of three may be defined
    if (positionGeo && toUser) {
        return res.status(400).json({
            error: 'Vote is invalid',
            message: 'positionGeo and toUser cannot be defined at the same time'
        })
    }

    if (commentId && positionGeo) {
        return res.status(400).json({
            error: 'Vote is invalid',
            message: 'commentId and positionGeo cannot be defined at the same time'
        })
    }

    if (toUser && commentId) {
        return res.status(400).json({
            error: 'Vote is invalid',
            message: 'toUser and commentId cannot be defined at the same time'
        })
    }

    next()
}

router.post('/p/vote', [authenticateToken, validateVote], async (req, res) => {
    const { positionGeo, touser, commentId, vote } = req.body
    const { userId } = res.locals

    addNewVote(userId, positionGeo ?? null, touser ?? null, commentId ?? null, vote).then((data) => {
        res.status(200).json({
            message: 'Vote added'
        })
    }).catch(() => {
        res.sendStatus(500)
    })
})

const validateTypeVotes = async (req, res, next) => {
    const { type } = req.params
    if (type !== 'positionGeo' && type !== 'touser' && type !== 'comment') {
        return res.status(400).json({
            error: 'Type is invalid',
            message: 'type must be positionGeo, touser or comment'
        })
    }

    next()
}

router.get('/p/votes/:type/:id', validateTypeVotes, async (req, res) => {
    const { type, id } = req.params

    const positionGeo = type === 'positionGeo' ? id : null
    const toUser = type === 'touser' ? id : null
    const commentId = type === 'comment' ? id : null

    getTotalOfVotes(positionGeo, toUser, commentId).then(votes => {
        res.status(200).json(votes)
    }).catch(() => {
        res.sendStatus(500)
    })
})

export default router

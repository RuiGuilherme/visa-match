import Router from "express-promise-router"
import { authenticateToken } from '../../middlewares/auth.js'
import { acceptMatch, getMatches, newMatch, unmatch } from '../../mock/all.js'


const router = Router()

router.post('/p/match', [authenticateToken], async (req, res) => {
	const { userId } = res.locals

	newMatch(userId).then((data) => {
		res.status(200).json({
			data
		})
	}).catch(() => {
		res.sendStatus(500)
	})
})

router.post('/p/match/accept', [authenticateToken], async (req, res) => {
	const { userId } = res.locals
	const { matchId, isaccept } = req.body

	acceptMatch(userId, matchId, isaccept).then((data) => {
		res.status(200).json({
			data
		})
	}).catch(() => {
		res.sendStatus(500)
	})
})

router.post('/p/unmatch', [authenticateToken], async (req, res) => {
	const { userId } = res.locals
	const { matchId } = req.body

	unmatch(userId, matchId).then((data) => {
		res.status(200).json({
			data
		})
	}).catch(() => {
		res.sendStatus(500)
	})
})

router.get('/p/matches', [authenticateToken], async (req, res) => {
	const { userId } = res.locals

	getMatches(userId).then((data) => {
		res.status(200).json({
			data
		})
	}).catch(() => {
		res.sendStatus(500)
	})
})


export default router

import Router from "express-promise-router"
import { authenticateToken } from '../../middlewares/auth.js'
import {
	getPerfil, updateMail, updatePassword, editInterests, getInterests, editLifestyle, getLifestyle
 } from '../../mock/all.js'


const router = Router()

router.get('/p/perfil', authenticateToken, async (req, res) => {
	const { userId } = res.locals

	getPerfil(userId).then((data) => {
		res.status(200).json({
			data
		})
	}).catch(() => {
		res.sendStatus(500)
	})
})

router.put('/p/update-mail', authenticateToken, async (req, res) => {
	const { userId } = res.locals
	const { email } = req.body

	updateMail(userId, email).then((data) => {
		res.status(200).json({
			data
		})
	}).catch(() => {
		res.sendStatus(500)
	})
})

router.put('/p/update-password', authenticateToken, async (req, res) => {
	const { userId } = res.locals
	const { password } = req.body

	updatePassword(userId, password).then((data) => {
		res.status(200).json({
			data
		})
	}).catch(() => {
		res.sendStatus(500)
	})
})

router.put('/p/edit-interests', authenticateToken, async (req, res) => {
	const { userId } = res.locals
	const { interests } = req.body

	editInterests(userId, interests).then((data) => {
		res.status(200).json({
			data
		})
	}).catch(() => {
		res.sendStatus(500)
	})
})

router.get('/p/get-interests', authenticateToken, async (req, res) => {
	const { userId } = res.locals

	getInterests(userId).then((data) => {
		res.status(200).json({
			data
		})
	}).catch(() => {
		res.sendStatus(500)
	})
})

router.put('/p/edit-lifestyle', authenticateToken, async (req, res) => {
	const { userId } = res.locals
	const { lifestyle } = req.body

	editLifestyle(userId, lifestyle).then((data) => {
		res.status(200).json({
			data
		})
	}).catch(() => {
		res.sendStatus(500)
	})
})

router.get('/p/get-lifestyle', authenticateToken, async (req, res) => {
	const { userId } = res.locals

	getLifestyle(userId).then((data) => {
		res.status(200).json({
			data
		})
	}).catch(() => {
		res.sendStatus(500)
	})
})



export default router

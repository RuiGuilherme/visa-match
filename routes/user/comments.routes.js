import Router from "express-promise-router"
import { authenticateToken } from '../../middlewares/auth.js'
import { addNewComment, getFathersComments, getChildrensComments, editComment, checkUserIDandCommentID, disableComment } from '../../mock/all.js'

const router = Router()

const validadeNewComment = async (req, res, next) => {
	const { comment, positionGeo, toUser } = req.body

	if (comment.length > 9999 || comment.length < 1) {
		return res.status(400).json({
			error: 'Comment is invalid',
			message: 'Comment length must be between 1 and 9999'
		})
	}

	// check if positionGeo or toUser is defined
	if (!positionGeo && !toUser) {
		return res.status(400).json({
			error: 'positionGeo or toUser id is required',
			message: 'You must provide a positionGeo or toUser'
		})
	}

	if (positionGeo && toUser) {
		return res.status(400).json({
			error: 'Comment is invalid',
			message: 'You must provide a toUser or positionGeo id, not both'
		})
	}

	next()
}

router.post('/p/new-comment', [authenticateToken, validadeNewComment], async (req, res) => {
	const { comment, positionGeo, toUser, spoiler, repliesId } = req.body
	const { userId } = res.locals

	addNewComment(userId, comment, positionGeo ?? null, toUser ?? null, spoiler, repliesId ?? null).then(() => {
		res.status(200).json({
			message: 'Comment added'
		})
	}).catch((err) => {
		res.sendStatus(500)
	})
})

router.get('/p/children-comments/:id', async (req, res) => {
	const { id } = req.params

	getChildrensComments(id).then(comments => {
		res.status(200).json({
			comments
		})
	}).catch(() => {
		res.sendStatus(500)
	})
})

const validadeTypeAndId = async (req, res, next) => {
	const { type, id } = req.params

	if (type !== 'positionGeo' && type !== 'toUser') {
		return res.status(400).json({
			error: 'Type is invalid',
			message: 'Type must be positionGeo or toUser'
		})
	}

	if (!id) {
		return res.status(400).json({
			error: 'Id is invalid',
			message: 'Id must be defined'
		})
	}

	next()
}

router.get('/p/comments/:type/:id', validadeTypeAndId, async (req, res) => {
	const { type, id } = req.params

    const positionGeo = type === 'positionGeo' ? id : null
    const toUser = type === 'toUser' ? id : null

	getFathersComments(positionGeo, toUser).then(comments => {
		res.status(200).json({
			comments
		})
	}).catch((err) => {
		res.sendStatus(500)
	})
})

const validadeEditComment = async (req, res, next) => {
	const { id, comment } = req.body

	const idNumber = Number(id)

	if (comment.length > 255 || comment.length < 1) {
		return res.status(400).json({
			error: 'Comment is invalid',
			message: 'Comment length must be between 1 and 255'
		})
	}

	if (!id || Number.isNaN(idNumber)) {
		return res.status(400).json({
			error: 'Comment is invalid',
			message: 'You must provide a comment id'
		})
	}

	next()
}

router.put('/p/edit-comment', [authenticateToken, validadeEditComment], async (req, res) => {
	const { comment, id } = req.body
	const { userId } = res.locals

	await checkUserIDandCommentID(userId, id).then(async (data) => {
		if (data) {
			await editComment(id, comment).then(() => {
				res.status(200).json({
					message: 'Comment edited'
				})
			}).catch(() => {
				res.sendStatus(500)
			})
		} else {
			res.status(401).json({
				message: 'You do not have permission to edit this comment'
			})
		}
	}).catch(() => {
		res.sendStatus(500)
	})
})

router.put('/p/remove-comment', authenticateToken, async (req, res) => {
	const { id } = req.body
	const { userId } = res.locals

	await checkUserIDandCommentID(userId, id).then(async (data) => {
		if (data) {
			await disableComment(id).then((a) => {
				res.status(200).json({
					message: 'Comment removed'
				})
			}).catch(() => {
				res.sendStatus(500)
			})
		} else {
			res.status(401).json({
				message: 'You do not have permission to remove this comment'
			})
		}
	}).catch(() => {
		res.sendStatus(500)
	})
})

export default router

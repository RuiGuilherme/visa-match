import Router from "express-promise-router"
import { authenticateToken } from '../../middlewares/auth.js'
import { getManyUsers } from '../../sequelize/db/user/user.js'

const router = Router()

// create a function and recive limit to get all users
router.get('/get-user/:limit', authenticateToken, async (req, res) => {
    const { limit } = req.params
    const limitNumber = Number(limit)

    if (Number.isNaN(limitNumber)) {
        return res.status(400).json({
            message: 'limit must be a number',
        })
    }
    const users = await getManyUsers(limit)
    res.json(users)
})

export default router

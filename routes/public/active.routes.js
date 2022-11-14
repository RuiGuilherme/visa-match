import Router from "express-promise-router"
import jwt from 'jsonwebtoken'
import { updateStatusFromUser, getUserStatus } from '../../sequelize/db/user/user.js'
import { getAllPermissionByType, addManyPermissionsToUser } from '../../sequelize/db/permissions.js'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

const addDefaultPermissionToUser = async (iduser, typePermission = 'user') => {
    const permissions = await getAllPermissionByType(typePermission)
    const permissionsList = permissions.map(permission => permission.dataValues.idpermission)
    return await addManyPermissionsToUser(iduser, permissionsList)
}

router.put('/auth/email/:token', async (req, res) => {
    const { token } = req.params
    
    jwt.verify(token, process.env.TOKEN_SECRET_MAIL, async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                error: 'Invalid token'
            })
        }

        const { sub, email } = decoded

        const user = await getUserStatus(email)
        const { dataValues } = user

        // just check if user try change jwt token
        if (dataValues.iduser !== sub) {
            return res.status(401).send({
                error: 'Invalid token'
            })
        }

        if (dataValues.user_status === 1 || dataValues.user_status === 3) {
            return res.status(401).send({
                error: dataValues.user_status === 1 ? 'User already active' : 'User banned'
            })
        }

        await updateStatusFromUser(sub, email, 1).then(async () => {
            await addDefaultPermissionToUser(sub, 'user')

            return res.status(200).send({
                message: 'Your account has been confirmed'
            })
        }).catch(() => {
            return res.sendStatus(500)
        })
    })
})

export default router

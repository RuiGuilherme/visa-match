/** @module login/user-token */
import Router from "express-promise-router"
import bcrypt from 'bcrypt'
import { createJWTToken } from '../../middlewares/auth.js'
import { getAllPermissionsFromUser, getUserPassword } from '../../sequelize/db/user/user.js'

const router = Router()

router.post('/login', async (req, res, next) => {
	const { email, password } = req.body

	getUserPassword(email).then(async (data) => {
			if (data) {
				const { user_status } = data
				const isPasswordCorrect = await bcrypt.compare(password, data.password)
				if (isPasswordCorrect) {
					// check if user is active, inactive or banned (1 === active, 2 === inactive and 3 === banned)
					if (user_status === 1) {
						getAllPermissionsFromUser(email).then(async (user) => {
							if (user) {
								const { iduser, email, username, permissions_idpermissions_permissions } = user.dataValues
								const permissions = permissions_idpermissions_permissions.map((data) => { 
									const { router, idpermission } = data.dataValues
									return {
										router: router,
										id: idpermission 
									}
								})

								res.status(200).json({
									username,
									token: await createJWTToken({ // don't remove await
										iduser,
										email,
										permissions,
									})
								})
							}
							else {
								res.status(401).json({
									error: 'Internal problem',
									message: 'This user has a problem, please contact staff for more details.'
								})
							}
						})
						.catch(err => {
							next(err)
						})
					}
					else {
						res.status(400).json({
							error: `User is ${user_status === 2 ? 'not active' : 'banned'}`,
							message: user_status === 2 ? 'User is inactive, please verify your email!' : 'Banned'
						})
					}

				}
				else {
					res.status(400).json({
						error: 'Invalid password',
						message: 'Please check your password and try again.'
					})
				}
			}
			else {
				res.status(401).json({
					error: 'Invalid email',
					message: 'User not found'
				})
			}

		})
		.catch(err => {
			next(err)
		})
})

export default router

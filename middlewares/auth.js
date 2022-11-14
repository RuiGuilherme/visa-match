import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { userHasPermission } from '../sequelize/db/user/user.js'
dotenv.config()

const doubleAuthPermissionUser = async (user_id, role_id) => {
	// check if user_id and role_id are valid
	if (!user_id || !role_id) {
		return false
	}

	// check if user has permission to access the route
	return await userHasPermission(user_id, role_id)
}

// that funtion recive a full URL, for example:
// http://localhost:3000/api/v1/users/p/edit-comment/1/2/3
// return "edit-comment"
const getPermissionFromURL = (url) => {
	const patchSplit = url.split("/")

	return patchSplit[patchSplit.indexOf('p') + 1]
}

export const authenticateToken = (req, res, next) => {
	const token = req.headers['authorization']
	const PermissionURL = getPermissionFromURL(req.originalUrl)

	if (!token) return res.sendStatus(401)

	jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
		if (err) return res.sendStatus(401) // If exist any erro with jwt just return 401

		const { roles, sub } = user
		const checkRoles = roles.findIndex(data => data.router === PermissionURL)
		if (checkRoles !== -1) {
			if (process.env.DOUBLE_ROLE_CHECK === 'true') {
				const hasPermission = await doubleAuthPermissionUser(sub, roles[checkRoles].id)
				if (!hasPermission) {
					return res.status(403).send({
						error: 'You do not have more permission to access this route'
					})
				}
			}
			res.locals.userId = sub
			return next()
		}

		// user don't have permission
		return res.sendStatus(403)
	})
}

export const createJWTTokenEmail = async (id, email ) => {
	return jwt.sign({ sub: id, email }, process.env.TOKEN_SECRET_MAIL, {
		expiresIn: '1d'
	})
}

export const createJWTToken = async ({ email, permissions, iduser }) => {
	return jwt.sign(
		{
			sub: iduser,
			email,
			roles: permissions
		},
		process.env.TOKEN_SECRET,
		// plz...
		{ expiresIn: '1h' }
	)
}

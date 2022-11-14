import Router from "express-promise-router"
import bcrypt from 'bcrypt'
import { createNewUser, checkEmailIsUsed } from '../../sequelize/db/user/user.js'
import { sendConfirmationEmail } from '../../mail/send.mail.js'
import { validateUsername, validateEmail, validatePassword } from '../../helpers/validate.js'
import { createJWTTokenEmail } from '../../middlewares/auth.js'

const router = Router()

const validateUserData = async (req, res, next) => {
    const { username, email, password, passwordConfirmation } = req.body

    if (password !== passwordConfirmation) {
        return res.status(400).json({
            error: 'Password and password confirmation do not match'
        })
    }

    if (!validateUsername(username)) {
        return res.status(400).json({
            error: 'Username is not valid',
            message: 'Username must be between 3 and 20 characters, and can only contain letters, numbers, and underscores.'
        })
    }

    if (!validateEmail(email)) {
        return res.status(400).json({
            error: 'Email is not valid',
            message: 'Please use a valid email'
        })
    }

    if (!validatePassword(password)) {
        return res.status(400).json({
            error: 'Password is not valid',
            message: 'Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character'
        })
    }

    const isEmailUsed = await checkEmailIsUsed(email)

    if (isEmailUsed) {
        return res.status(400).json({
            error: 'Email is already used',
            message: 'Please use another email or try recovery your account'
        })
    }

    next()
}

// create a new user with username, email, password and password confirmation. Need hash password bcrypt with salt 10
router.post('/signup', validateUserData, async (req, res) => {
	const { username, email, password } = req.body
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt)
    // 2 is default user_status disabled (need e-mail confirmation)
    createNewUser(username, email, passwordHash).then(async (newUserData) => {
        const { iduser, email } = newUserData.dataValues
        const token = await createJWTTokenEmail(iduser, email)
        sendConfirmationEmail(email, token)

        res.status(200).json({ message: 'User created successfully' })
    }).catch(() => {
        res.sendStatus(500)
    }) 
})

export default router

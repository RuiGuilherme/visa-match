import Router from "express-promise-router"

// public routes
import login from './public/login.routes.js'
import signup from './public/signup.routes.js'
import active from './public/active.routes.js'

// admin routes
import administrative_contents from './admin/contents.routes.js'
import administrative_users from './admin/users.routes.js'

// user routes
import user_profile from './user/profile.routes.js'
import user_votes from './user/votes.routes.js'
import user_comments from './user/comments.routes.js'

const routes = Router()

routes.use('/public', login, signup, active)
routes.use('/admin', administrative_contents, administrative_users)
routes.use('/user', user_profile, user_votes, user_comments)

export default routes

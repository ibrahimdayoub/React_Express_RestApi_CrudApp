const exprees = require("express")
const router = exprees.Router()
const {
    signUp,
    signIn,
    getMe
} = require("../controllers/userController")
const {
    protect
} = require("../middlewares/authMiddleware")

router.post('/sign_up', signUp)
router.post('/sign_in', signIn)
router.get('/me', protect, getMe)

module.exports = router
const express = require('express')
const {registerUser, authUser,adminSearchUser ,getUser,updateUser, adminUsers, editUser, adminUpdateUser, deleteUser } = require('../controllers/userController')
const router = express.Router()


router.route('/').post(registerUser)
router.route("/login").post(authUser);
router.route('/userDetails/:id').get(getUser)
router.route('/updateUserDetils').post(updateUser)
router.route('/adminHome').get(adminUsers)
router.route('/editUser/:id').get(editUser)
router.route('/userUpadte').post(adminUpdateUser)
router.route('/deleteUser/:id').get(deleteUser)
router.route('/searchUser/:userkey').get(adminSearchUser)


module.exports = router;
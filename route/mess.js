const express = require('express')
const router = express.Router()
const auth = require('../middleware/authentication')

const { getAllMessages, createMessage, updateMessage, deleteMessage } = require('../controllers/message')

router.route('/messages').get(auth, getAllMessages)
router.route('/messages').post(auth, createMessage)

router.route('/messages/:id').patch(auth, updateMessage).delete(auth, deleteMessage)
module.exports = router
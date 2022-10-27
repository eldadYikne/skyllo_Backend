const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
// const { log } = require('../../middlewares/logger.middleware')
const router = express.Router()
const { getBoards, getBoardById, addBoard, updateBoard, removeBoard } = require('./board.controller')

// router.use(requireAuth)


// router.get('/', getBoards)
// router.get('/:id', getBoardById)
// router.post('/', requireAuth, addBoard)
// router.put('/:id', requireAuth, updateBoard)
// router.delete('/:id', requireAuth, requireAdmin, removeBoard)

router.get('/', getBoards)
router.get('/:id', getBoardById)
router.post('/',addBoard)
router.put('/:id', updateBoard)
router.delete('/:id', removeBoard)

module.exports = router
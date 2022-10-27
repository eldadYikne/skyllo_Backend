const boardService = require('./board.service.js');
const authService = require('../auth/auth.service')
const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')

// GET LIST
async function getBoards(req, res) {
  try {
    // logger.debug('Getting boards')
    var queryParams = req.query
    const boards = await boardService.query(queryParams)
    res.json(boards)
  } catch (err) {
    // logger.error('Failed to get boards', err)
    res.status(500).send({ err: 'Failed to get boards' })
  }
}

// GET BY ID 
async function getBoardById(req, res) {
  try {
    const boardId = req.params.id
    const board = await boardService.getById(boardId)
    res.json(board)
  } catch (err) {
    // logger.error('Failed to get board', err)
    res.status(500).send({ err: 'Failed to get board' })
  }
}

// POST (add board)
async function addBoard(req, res) {
  const loggedinUser = authService.validateToken(req.cookies.loginToken)
  try {
    const board = req.body
    board.createdBy = loggedinUser
    const addedBoard = await boardService.add(board)
    
    socketService.broadcast({type: 'board-added', data: board, userId: loggedinUser._id})
    res.json(addedBoard)
  } catch (err) {
    // logger.error('Failed to add board', err)
    res.status(500).send({ err: 'Failed to add board' })
  }
}

// PUT (Update board)
async function updateBoard(req, res) {
  const loggedinUser = authService.validateToken(req.cookies.loginToken)
  try {
    const board = req.body;
    const updatedBoard = await boardService.update(board)
    if(loggedinUser && !board.isPopoverShown) {
      console.log('loggedinUser',loggedinUser)
      socketService.broadcast({type: 'board-updated', data: board, userId: loggedinUser._id})
    }
    res.json(updatedBoard)
  } catch (err) {
    // logger.error('Failed to update board', err)
    res.status(500).send({ err: 'Failed to update board' })

  }
}

// DELETE (Remove board)
async function removeBoard(req, res) {
  try {
    const boardId = req.params.id;
    const removedId = await boardService.remove(boardId)
    res.send(removedId)
  } catch (err) {
    // logger.error('Failed to remove board', err)
    res.status(500).send({ err: 'Failed to remove board' })
  }
}

module.exports = {
  getBoards,
  getBoardById,
  addBoard,
  updateBoard,
  removeBoard
}
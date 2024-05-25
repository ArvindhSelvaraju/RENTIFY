const express = require('express')
const {getHouses,createHouse,deleteHouse,updateHouse} = require('../controllers/housesController')

const router = express.Router()

router.get('/', getHouses)

router.post('/',createHouse)

router.patch('/:id',updateHouse)

router.delete('/:id',deleteHouse)

module.exports = router
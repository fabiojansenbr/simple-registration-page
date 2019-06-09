const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/userController');

router.get('/', userController.list);
router.get('/:id', userController.getById);
router.post('/info', userController.getByToken);
router.post('/', userController.add);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;

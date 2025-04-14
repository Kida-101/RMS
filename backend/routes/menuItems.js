const express = require('express');
const router = express.Router();
const menuItemsController = require('../controllers/menuItemsController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all routes with manager check
router.use(authMiddleware.isManager);

// Menu Items CRUD
router.post('/menu-items', menuItemsController.createMenuItem);
router.put('/menu-items/:id', menuItemsController.updateMenuItem);
router.delete('/menu-items/:id', menuItemsController.deleteMenuItem);

// Categories list (for dropdown)
router.get('/categories', menuItemsController.getCategories);

module.exports = router;
const express = require('express');
const router = express.Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import user controller
const userController = require('../controller/userController');
// User routes
router.route('/users')
    .get(userController.index);
router.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);
router.route('/register')
    .post(userController.new);
router.route('/login')
    //.get(userController.getLogin)
    .post(userController.postLogin);
router.route('/logout')
    .get(userController.logout);

// Export API routes
module.exports = router;
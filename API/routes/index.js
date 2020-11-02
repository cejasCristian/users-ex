const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');

module.exports = function() {

    //add user data 'Post'
    router.post('/users',
        usersController.newUser
    );

    //get user data 'Get'
    router.get('/users',
        usersController.getUser
    );

    //get user data 'Get' by Id
    router.get('/users/:id',
        usersController.getUserId
    );

    //update users data
    router.put('/users/:id',
        usersController.updateUser
    );

    //delete users
    router.delete('/users/:id',
        usersController.deleteUser
    );

    return router;
}
const router = require('express').Router();
const { signUp } = require('../controller/signupController');

router.post('/', signUp);


module.exports = router;
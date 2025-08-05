const router = require('express').Router();
const { login } = require('../controller/loginCtr');


router.post('/', login)

module.exports = router;
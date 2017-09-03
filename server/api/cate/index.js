/**
 * Created by wupeng5 on 2017/7/19.
 */

'use strict';

var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.get("/getAll",controller.getList);

module.exports = router;
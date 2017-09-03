/**
 * Created by wupeng5 on 2017/7/19.
 */

'use strict';

var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.get("/getList",controller.getList);
router.post("/editUser/:id",controller.editUser);
router.get("/removeByIds/:ids",controller.removeByIds);

module.exports = router;
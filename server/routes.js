/**
 * Created by wupeng5 on 2017/7/19.
 */

//输出路由模块
module.exports = function(app) {
    app.use('/user',require('./api/user'));
    app.use('/book',require('./api/book'));
    app.use('/cate',require('./api/cate'));
}
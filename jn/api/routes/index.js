var express = require('express');
var router = express.Router();

var mymongo = require('mymongo1610');
/* 获取数据 */
router.get('/api/getlist', function(req, res, next) {
    var title = req.query.title,
        xl = req.query.xl,
        limit = req.query.limit,
        page = req.query.pageSt;
    if (title) {
        mymongo.find('list', { title: title }, function(err, result) {
            if (err) {
                res.json({ code: 0, msg: '数据库链接错误' });
            } else {
                res.json({ code: 1, data: result });
            }
        })
    } else if (xl) {
        mymongo.find('list', { cont: xl }, function(err, result) {
            if (err) {
                res.json({ code: 0, msg: '数据库链接错误' });
            } else {
                res.json({ code: 1, data: result });
            }
        })
    } else {
        mymongo.find('list', function(err, result) {
            if (err) {
                res.json({ code: 0, msg: '数据库链接错误' });
            } else {
                res.json({ code: 1, data: result });
            }
        })
    }
});

module.exports = router;
'use strict';

module.exports = function (app) {
    app.get('/api/test', function (req, res){
        var test = {
            test: "test"
        }
        res.json(test);
    });
}
var express = require('express');
var router = express.Router();
var department = require('../models/department');
var program = require('../models/risk_group');
var program_group = require('../models/risk_group');
/* GET users listing. */

router.get('/risk_group' ,function(req,res) {
    if (req.session.level_user_id != 2 && req.session.level_user_id != 3){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var data = {};
        program_group.getList_program_group(db)
            .then(function (rows) {
                data.programs = rows;
                res.render('page/risk_group', {data: data});
                console.log(data);
            }, function (err) {
                console.log(err);
                res.render('page/risk_group', {data: {programs: []}});
            })
    }
});

router.get('/risk_program' ,function(req,res) {
    if (req.session.level_user_id != 2 && req.session.level_user_id != 3){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var data = {};
        program.getList(db)
            .then(function (rows) {
                data.programs = rows;
                res.render('page/risk_program', {data: data});
            }, function (err) {
                console.log(err);
                res.render('page/risk_program', {data: {programs: []}});
            })
    }
});

router.post('/get_risk_program',function(req,res){
    var db = req.db;
    var startpage = parseInt(req.body.startRecord);
    program.getList(db,startpage)
        .then(function (rows){
        res.send({ok:true,rows:rows})
    },function(err) {
        res.send({ok:false,msg:err})
    }
    )
});

router.post('/get_risk_program_total',function(req,res){
    var db = req.db;
    program.getList_total(db)
        .then(function (total){
            console.log(total)
        res.send({ok:true,total:total})
    },function(err) {
        res.send({ok:false,msg:err})
    }
    )
});

router.post('/get_risk_group' ,function(req,res) {
    var db = req.db;
    var startpage = parseInt(req.body.startRecord);
    program.getSubAll(db,startpage)
        .then(function(rows) {
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )

});


router.post('/get_risk_group_total' ,function(req,res) {
    var db = req.db;
    program.getSubAll_total(db)
        .then(function(total) {
            res.send({ok:true,total:total})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )

});

router.post('/remove_group',function(req,res){
    var db = req.db;
    var id = req.body.id;
    if(id){
        program.remove_group(db,id)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/remove_program',function(req,res){
    var db = req.db;
    var id = req.body.id;
    if(id){
        program.remove_program(db,id)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/update_group',function(req,res){
    var db = req.db;
    var program_id = req.body.program_id;
    var name = req.body.name;
    var id = req.body.id;
    if(name && program_id && id){
        program_group.update_group(db,id,name,program_id)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/update_program',function(req,res){
    var db = req.db;
    var name = req.body.name;
    var id = req.body.id;
    if(name && id){
        program.update_program(db,id,name)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});


router.post('/save_group',function(req,res){
    var db = req.db;
    var name = req.body.name;
    var program_id = req.body.program_id;
    if(name && program_id){
        program_group.save_group(db,name,program_id)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/save_program',function(req,res){
    var db = req.db;
    var name = req.body.name;
    if(name){
        program.save_program(db,name)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/search_topic',function(req,res){
    var db = req.db;
    var data = {};
    data.topic = req.body.topic;
    console.log(data);
    program.search_topic(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});

router.post('/search_program',function(req,res){
    var db = req.db;
    var data = {};
    data.search_pro = req.body.search_pro;
    console.log(data);
    program.search_program(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});

router.post('/search_group',function(req,res){
    var db = req.db;
    var data = {};
    data.group = req.body.group;
    console.log(data);
    program_group.search_group(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});

module.exports = router;

var express = require('express');
var router = express.Router();
var department = require('../models/department');
var program = require('../models/risk_group');
var group = require('../models/risk_detail');

/* GET users listing. */

router.get('/risk_group_detail' ,function(req,res) {
    if (req.session.level_user_id != 2 && req.session.level_user_id != 3 ){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var data = {};
        program.getList_program_group(db)
            .then(function (rows) {
                data.programs = rows;
                return group.getListDetail(db)
            })
            .then(function (rows) {
                console.log(rows);
                data.groups = rows;
                res.render('page/risk_group_detail', {data: data});
            }, function (err) {
                console.log(err);
                res.render('page/risk_group_detail', {data: {programs: [], groups: []}});
            })
    }
});

router.post('/get_risk_detail' ,function(req,res) {
    var db = req.db;
    var startpage = parseInt(req.body.startRecord);
    group.getSubAllDetail(db,startpage)
        .then(function(rows) {
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/get_risk_detail_total' ,function(req,res) {
    var db = req.db;
    group.getSubAllDetail_total(db)
        .then(function(total) {
            console.log(total)
            res.send({ok:true,total:total})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/save_group',function(req,res){
    var db = req.db;
    var name = req.body.name;
    var risk_group = req.body.risk_group;
    var  risk_program = req.body.risk_program;
    if(name && risk_program){
        group.save_group(db,name,risk_group,risk_program)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msq:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/update_group',function(req,res){
    var db = req.db;
    var id = req.body.id;
    var name = req.body.name;
    var risk_group = req.body.risk_group;
    var risk_program = req.body.risk_program;
    if( id && name && risk_program){
        group.update_group(db,id,name,risk_group,risk_program)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msq:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/remove_group',function(req,res){
    var db = req.db;
    var id = req.body.id;
    if(id){
        group.remove_group(db,id)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msq:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/search_detail_group',function(req,res){
    var db = req.db;
    var data = {};
    data.search_detail_group = req.body.search_detail_group;
    console.log(data);
    group.search_detail_group(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});

router.post('/search_detail',function(req,res){
    var db = req.db;
    var data = {};
    data.search_detail = req.body.search_detail;
    console.log(data);
    group.search_detail(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })
});

router.get('/search_risk_show' ,function(req,res) {
    if (req.session.level_user_id != 2 && req.session.level_user_id != 3 ){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var data = {};
        program.getList_program_group(db)
            .then(function (rows) {
                data.programs = rows;
                return group.getListDetail(db)
            })
            .then(function (rows) {
                console.log(rows);
                data.groups = rows;
                res.render('page/search_risk_show', {data: data});
            }, function (err) {
                console.log(err);
                res.render('page/search_risk_show', {data: {programs: [], groups: []}});
            })
    }
});

router.post('/search_risk_show',function(req,res){
    var db = req.db;
    var data = {};
    data.search_program = req.body.search_program;
    data.search_sub_program = req.body.search_sub_program;
    console.log(data);
    group.search_risk_show(db,data)
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

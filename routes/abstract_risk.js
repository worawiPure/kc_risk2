var express = require('express');
var _ = require('lodash');
var moment = require('moment');
var router = express.Router();
var abstract = require('../models/abstract');
var department = require('../models/department');
var depcode = require('../models/department');
var program = require('../models/risk_group');
var sub_progarm = require('../models/risk_group');
var sub_group = require('../models/risk_group');
var detail = require('../models/risk_detail');
var risk_type = require('../models/risk_type');
var risk_report = require('../models/risk_type');
var type_complaint = require('../models/risk_type');
var clinic = require('../models/risk_type');
var request = require('../models/request');
var show_risk2 = require('../models/risk_report');
var level_user = require('../models/users');

router.get('/', function(req, res, next) {
    if (req.session.level_user_id != 2 && req.session.level_user_id != 3){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var data = {};
        abstract.getListDepartment(db)
            .then(function (rows) {
                console.log(rows);
                data.abstracts = rows;
                res.render('./page/abstract_risk', {data: data});
            }, function (err) {
                res.render('./page/abstract_risk', {data: {abstracts: []}});
            }
        )
    }
    });

router.post('/',function(req, res){
    var db = req.db;
    var startpage = parseInt(req.body.startRecord);
    abstract.getSubAllDetail(db,startpage)
        .then(function(rows){
            console.log(rows);
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/abstract_risk_total',function(req, res){
    var db = req.db;
    abstract.getSubAllDetail_total(db)
        .then(function(total){
            console.log(total);
            res.send({ok:true,total:total})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.get('/detail/:id',function(req, res){
    var db = req.db;
    var id = req.params.id;
    abstract.getDetail(db,id)
        .then(function(rows){
            console.log(rows);
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.get('/show_risk/:id',function(req,res){
    if (req.session.level_user_id != 2 && req.session.level_user_id != 3){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var id = req.params.id;
        abstract.getSubShowDetail(db, id)
            .then(function (rows) {
                var data = rows[0];
                data.date_risk = moment(data.date_risk).format('DD/MM/YYYY');
                data.date_report_risk = moment(data.date_report_risk).format('DD/MM/YYYY');
                data.date_repeat = moment(data.date_repeat).format('DD/MM/YYYY');
                data.date_finished = moment(data.date_finished).format('DD/MM/YYYY');
                res.render('page/admin_show_detail', {rows: data});
            }, function (err) {
                res.send({ok: false, msg: err})
            }
        )
    }
});

router.post('/save_abstract',function(req,res){
    var db = req.db;
    var id_detail = req.body.data.id_detail;
    var detail = req.body.data.detail;
    var id = req.body.data.id;
    console.log(req.body.data.detail);
    if(detail){
        if(id_detail){
            abstract.update_abstract(db,detail,id)
                .then(function(){
                    res.send({ok:true})
                },function(err){
                    res.send({ok:false,msg:err})
                })
        }else{
            console.log(detail);
            abstract.save_abstract(db,detail,id)
                .then(function(){
                    console.log(id);
                    return abstract.Update_part1(db,id)
                })
                .then(function(){
                    res.send({ok:true})
                },function(err){
                    res.send({ok:false,msg:err})
                })
        }

    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/search_date_risk',function(req,res){
    var db = req.db;
    var data = {};
    data.date1 = req.body.date1;
    data.date2 = req.body.date2;
    data.date1=moment(data.date1, 'DD/MM/YYYY').format('YYYY-MM-DD');
    data.date2=moment(data.date2, 'DD/MM/YYYY').format('YYYY-MM-DD');
    console.log(data);
    abstract.search_date(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })
});

router.post('/search_topic',function(req,res){
    var db = req.db;
    var data = {};
    data.topic = req.body.topic;
    console.log(data);
    abstract.search_topic(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});

router.post('/search_department',function(req,res){
    var db = req.db;
    var data = {};
    data.department = req.body.department;
    console.log(data);
    abstract.search_department(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});

router.post('/remove_risk', function(req,res){
    var db = req.db;
    var id = req.body.id;
    if(id){
        abstract.remove_first(db,id)
            .then(function(){
                return abstract.remove_second(db,id)
            })
            .then(function(){
                return abstract.remove_third(db,id)
            })
            .then(function(){
                return abstract.remove_fourth(db,id)
            })
            .then(function(){
                return abstract.remove_fifth(db,id)
            })
            .then(function () {
                res.send({ok: true});
            },
            function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.get('/edit_risk/:id', function(req,res){
    if (req.session.level_user_id != 2 && req.session.level_user_id != 3){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var id = req.params.id;
        var data = {};
            show_risk2.getSubShowDetail(db, id)
                .then(function (rows) {
                    console.log(rows);
                    data.detail = rows[0];
                    data.detail.date_risk = moment(data.detail.date_risk).format('DD/MM/YYYY');
                    data.detail.date_repeat = moment(data.detail.date_repeat).format('DD/MM/YYYY');
                    data.detail.date_finished = moment(data.detail.date_finished).format('DD/MM/YYYY');
                    data.detail.date_report_risk = moment(data.detail.date_report_risk).format('YYYY-MM-DD');
                    return department.getList(db)
                })
                .then(function (rows) {
                    data.departments = rows;
                    return depcode.getList_Department(db,req.session.depcode)
                })
                .then(function (rows) {
                    data.depcodes = rows;
                    return program.getList(db);
                })
                .then(function (rows) {
                    data.programs = rows;
                    return sub_progarm.getSubList2(db, data.detail.risk_program);
                })
                .then(function (rows) {
                    console.log(rows);
                    data.sub_programs = rows;
                    return sub_group.getSubList3(db, data.detail.risk_group);
                })
                .then(function (rows) {
                    console.log(rows);
                    data.sub_groups = rows;
                    return risk_type.getRisk_type(db);
                })
                .then(function (rows) {
                    console.log(rows);
                    data.risk_types = rows;
                    return risk_report.getType_report(db)
                })
                .then(function (rows) {
                    console.log(rows);
                    data.risk_reports = rows;
                    return type_complaint.getType_complaint(db);
                })
                .then(function (rows) {
                    console.log(rows);
                    data.type_complaints = rows;
                    return clinic.getClinicLevel(db, data.detail.type_risk);
                })
                .then(function (rows) {
                    console.log(data);
                    data.clinics = rows;
                    res.render('page/admin_edit_risk', {data: data});
                }, function (err) {
                    console.log(err);
                    res.render('page/admin_edit_risk', {
                        data: {
                            programs: [],
                            sub_programs: [],
                            sub_groups: [],
                            depratments: [],
                            depcodes: [],
                            risk_types: [],
                            risk_reports: [],
                            type_complaints: [],
                            clinics: [],
                            show_risk2: []
                        }
                    });
                });
    }
});

router.post('/admin_edit_request', function(req,res){
    var db = req.db;
    var data = req.body.data;
    //data.username = req.session.username;
    data.date_risk=moment(data.date_risk, 'DD/MM/YYYY').format('YYYY-MM-DD');
    data.date_repeat=moment(data.date_repeat, 'DD/MM/YYYY').format('YYYY-MM-DD');
    data.date_finished=moment(data.date_finished, 'DD/MM/YYYY').format('YYYY-MM-DD');
    console.log(data.date_risk);
    if(data){
        request.update_part1(db,data)
            .then(function(){
                console.log(data);
                console.log(data.program);
                console.log(data.subprogram);
                console.log(data.subgroup);
                console.log(data.sentinel);
                return request.update_part2(db,data)
            })
            .then(function(){
                return request.update_part3(db,data)
            })
            .then(function(){
                return request.update_part4(db,data)
            })
            .then(function(){
                return request.update_part5(db,data)
            })
            .then(function () {
                res.send({ok: true});
            },
            function(err){
                console.log(err);
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/search_month_chart_senior',function(req,res){
    var db = req.db;
    var data = {};
    data.date1 = req.body.date1;
    data.date2 = req.body.date2;
    data.sub_depcode = req.session.sub_depcode;
    data.depcode = req.session.depcode;
    data.date_chart1=moment(data.date1, 'DD/MM/YYYY').format('YYYY-MM-DD');
    data.date_chart2=moment(data.date2, 'DD/MM/YYYY').format('YYYY-MM-DD');
    console.log(data);
    abstract.search_month_chart_senior(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })
});

router.post('/search_month_chart',function(req,res){
    var db = req.db;
    var data = {};
    data.date1 = req.body.date1;
    data.date2 = req.body.date2;
    data.date_chart1=moment(data.date1, 'DD/MM/YYYY').format('YYYY-MM-DD');
    data.date_chart2=moment(data.date2, 'DD/MM/YYYY').format('YYYY-MM-DD');
    console.log(data);
    abstract.search_month_chart(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })
});

router.post('/search_department_chart',function(req,res){
    var db = req.db;
    var data = {};
    data.date1 = req.body.date1;
    data.date2 = req.body.date2;
    data.date_chart1=moment(data.date1, 'DD/MM/YYYY').format('YYYY-MM-DD');
    data.date_chart2=moment(data.date2, 'DD/MM/YYYY').format('YYYY-MM-DD');
    console.log(data);
    abstract.search_department_chart(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })
});

router.post('/search_level_clinic_chart',function(req,res){
    var db = req.db;
    var data = {};
    data.date1 = req.body.date1;
    data.date2 = req.body.date2;
    data.date_chart1=moment(data.date1, 'DD/MM/YYYY').format('YYYY-MM-DD');
    data.date_chart2=moment(data.date2, 'DD/MM/YYYY').format('YYYY-MM-DD');
    console.log(data);
    abstract.search_level_clinic_chart(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })
});

router.post('/search_level_nonclinic_chart',function(req,res){
    var db = req.db;
    var data = {};
    data.date1 = req.body.date1;
    data.date2 = req.body.date2;
    data.date_chart1=moment(data.date1, 'DD/MM/YYYY').format('YYYY-MM-DD');
    data.date_chart2=moment(data.date2, 'DD/MM/YYYY').format('YYYY-MM-DD');
    console.log(data);
    abstract.search_level_nonclinic_chart(db,data)
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
var express = require('express');
var _ = require('lodash');
var moment = require('moment');
var router = express.Router();
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
var show_risk = require('../models/risk_report');
var show_risk2 = require('../models/risk_report');
var risk_repeat = require('../models/risk_report');
var update_part1 = require('../models/risk_report');
var update_part2 = require('../models/risk_report');
var level_user = require('../models/users');
var news = require('../models/abstract');

/* GET home page. */

router.get('/', function(req, res, next) {
    if (req.session.level_user_id != 1) {
        res.render('./page/access_denied')
    }else{
  res.render('index');}
});

router.get('/user_senior', function(req, res, next) {
    if (req.session.level_user_id != 4){
        res.render('./page/access_denied')
    }else{
        res.render('user_senior');}
});

router.get('/admin', function(req, res, next) {
        if (req.session.level_user_id != 2 && req.session.level_user_id != 3){
                res.render('./page/access_denied')
            }else{
    res.render('admin');}
});

router.get('/superadmin', function(req, res, next) {
    if (req.session.level_user_id != 3){
        res.render('./page/access_denied')
    }else{
    res.render('superadmin');}
});

router.get('/request_detail_save', function(req, res, next) {
    res.render('page/request_detail_save');
});

router.get('/risk_report', function(req, res, next) {
    if (req.session.level_user_id != 1){
        res.render('./page/access_denied')
    }else{
    res.render('page/risk_report');}
});

router.get('/risk_news', function(req, res, next) {
    if (req.session.level_user_id != 1){
        res.render('./page/access_denied')
    }else{
        res.render('page/risk_news');}
});

router.get('/risk_news_senior', function(req, res, next) {
    if (req.session.level_user_id != 4){
        res.render('./page/access_denied')
    }else{
        res.render('page/risk_news_senior');
    }
});

router.get('/risk_news_admin', function(req, res, next) {
    if (req.session.level_user_id != 2 && req.session.level_user_id != 3 ){
        res.render('./page/access_denied')
    }else{
        res.render('page/risk_news_admin');}
});

router.post('/risk_today_senior', function(req, res, next) {
    if (req.session.level_user_id != 4){
        res.render('./page/access_denied')
    }else{
        var db = req.db;
        var depcode = req.session.depcode;
        var date_today = moment().format('YYYY-MM-DD');
        db('risk_request_first as f')
            .count('* as total')
            .innerJoin('risk_request_fourth as u','f.id','u.risk_request_id')
            .where('f.date_report_risk', date_today)
            .where('u.depcode', depcode)
            .then(function(rows){
                console.log(rows[0].total);
                var data = rows[0].total;
                res.send({ok:true,total:data})
            },function(err){
                res.send({ok:false,msg:err})
            }
        )
    }
});

router.post('/risk_today_admin', function(req, res, next) {
    if (req.session.level_user_id != 2 && req.session.level_user_id != 3 ){
        res.render('./page/access_denied')
    }else{
        var db = req.db;
        var date_today = moment().format('YYYY-MM-DD');
        db('risk_request_first as f')
            .count('* as total')
            .where('f.date_report_risk', date_today)
            .then(function(rows){
                console.log(rows[0].total);
                var data = rows[0].total;
                res.send({ok:true,total:data})
            },function(err){
                res.send({ok:false,msg:err})
            }
        )
    }
});

router.get('/admin_risk_today', function(req, res, next) {
    if (req.session.level_user_id != 2 && req.session.level_user_id !=3){
        res.render('./page/access_denied')
    }else{
        res.render('page/admin_risk_report_today');}
});

router.get('/user_senior_risk_today', function(req, res, next) {
    if (req.session.level_user_id != 4){
        res.render('./page/access_denied')
    }else{
        res.render('page/user_senior_risk_report_today');}
});

router.get('/user_senior_risk_report', function(req, res, next) {
    if (req.session.level_user_id != 4){
        res.render('./page/access_denied')
    }else{
    res.render('page/user_senior_risk_report');}
});

router.get('/user_senior_risk_report_feedback', function(req, res, next) {
    if (req.session.level_user_id != 4){
        res.render('./page/access_denied')
    }else {
        res.render('page/user_senior_risk_report_feedback');}
});

router.get('/chart_risk_month_senior', function(req, res, next) {
    if (req.session.level_user_id != 4){
        res.render('./page/access_denied')
    } else {
        res.render('page/risk_chart_month_senior')
        }
});

router.get('/chart_risk_month', function(req, res, next) {
    if (req.session.level_user_id != 2 && req.session.level_user_id !=3){
        res.render('./page/access_denied')
    }else{
        res.render('page/risk_chart_month');}
});

router.get('/chart_risk_department', function(req, res, next) {
    if (req.session.level_user_id != 2 && req.session.level_user_id !=3){
        res.render('./page/access_denied')
    }else{
        res.render('page/risk_chart_department');}
});

router.get('/chart_risk_level_clinic', function(req, res, next) {
    if (req.session.level_user_id != 2 && req.session.level_user_id !=3){
        res.render('./page/access_denied')
    }else{
        res.render('page/chart_risk_level_clinic');}
});

router.get('/chart_risk_level_nonclinic', function(req, res, next) {
    if (req.session.level_user_id != 2 && req.session.level_user_id !=3){
        res.render('./page/access_denied')
    }else{
        res.render('page/chart_risk_level_nonclinic');}
});


router.post('/get_risk_report' ,function(req,res) {
    var db = req.db;
    var username = req.session.username;
    var startpage  = parseInt(req.body.startRecord);
    show_risk.getSubAllDetail(db,username,startpage)
        .then(function(rows) {
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/get_risk_report_total' ,function(req,res) {
    var db = req.db;
    var username = req.session.username;
    show_risk.getSubAllDetail_total(db,username)
        .then(function(total) {
            res.send({ok:true,total:total})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/get_risk_news' ,function(req,res) {
    var db = req.db;
    var startpage  = parseInt(req.body.startRecord);
    show_risk.getNews(db,startpage)
        .then(function(rows) {
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/get_risk_news_total' ,function(req,res) {
    var db = req.db;
    show_risk.getNews_total(db)
        .then(function(total) {
            res.send({ok:true,total:total})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/user_senior_get_risk_report' ,function(req,res) {
    var db = req.db;
    var depcode = req.session.depcode;
    var startpage = parseInt(req.body.startRecord);
    console.log(depcode)
    show_risk.getSubAllDetail_user_senior(db,req.session.depcode,startpage)
        .then(function(rows) {
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/user_senior_get_risk_report_total' ,function(req,res) {
    var db = req.db;
    var depcode = req.session.depcode;
    console.log(depcode);
    show_risk.getSubAllDetail_user_senior_total(db,req.session.depcode)
        .then(function(total) {
            res.send({ok:true,total:total})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/user_senior_get_risk_report_today' ,function(req,res) {
    var db = req.db;
    var depcode = req.session.depcode;
    var startpage = parseInt(req.body.startRecord);
    var date_today = moment().format('YYYY-MM-DD');
    console.log(depcode,date_today)
    show_risk.getSubAllDetail_user_senior_today(db,req.session.depcode,date_today,startpage)
        .then(function(rows) {
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/user_senior_get_risk_report_total_today' ,function(req,res) {
    var db = req.db;
    var depcode = req.session.depcode;
    var date_today = moment().format('YYYY-MM-DD');
    console.log(depcode,date_today)
    show_risk.getSubAllDetail_user_senior_total_today(db,req.session.depcode,date_today)
        .then(function(total) {
            res.send({ok:true,total:total})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/admin_get_risk_report_today' ,function(req,res) {
    var db = req.db;
    var startpage = parseInt(req.body.startRecord);
    var date_today = moment().format('YYYY-MM-DD');
    console.log(date_today);
    show_risk.getSubAllDetail_admin_today(db,date_today,startpage)
        .then(function(rows) {
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/admin_get_risk_report_total_today' ,function(req,res) {
    var db = req.db;
    var date_today = moment().format('YYYY-MM-DD');
    console.log(date_today);
    show_risk.getSubAllDetail_admin_total_today(db,date_today)
        .then(function(total) {
            res.send({ok:true,total:total})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/user_senior_get_risk_feedback_report' ,function(req,res) {
    var db = req.db;
    var depcode = req.session.depcode;
    var sub_depcode = req.session.sub_depcode;
    var startpage = parseInt(req.body.startRecord);
    console.log(depcode,sub_depcode)
    show_risk.getSubAllDetail_user_senior_feedback(db,req.session.depcode,req.session.sub_depcode,startpage)
        .then(function(rows) {
            res.send({ok:true,rows:rows})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.post('/user_senior_get_risk_report_feedback_total' ,function(req,res) {
    var db = req.db;
    var depcode = req.session.depcode;
    var sub_depcode = req.session.sub_depcode;
    console.log(depcode,sub_depcode)
    show_risk.getSubAllDetail_user_senior_feedback_total(db,req.session.depcode,req.session.sub_depcode)
        .then(function(total) {
            res.send({ok:true,total:total})
        },function(err){
            res.send({ok:false,msg:err})
        }
    )
});

router.get('/show_risk/:id',function(req,res){
    if (req.session.level_user_id != 1){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var id = req.params.id;
        show_risk2.Chack_sesion(db, id, req.session.username)
            .then(function (total) {
                if (total > 0) {
                    show_risk2.getSubShowDetail(db, id)
                        .then(function (rows) {
                            var data = rows[0];
                            data.date_risk = moment(data.date_risk).format('DD/MM/YYYY');
                            data.date_report_risk = moment(data.date_report_risk).format('DD/MM/YYYY');
                            data.date_repeat = moment(data.date_repeat).format('DD/MM/YYYY');
                            data.date_finished = moment(data.date_finished).format('DD/MM/YYYY');
                            res.render('page/show_detail', {rows: data});
                        }, function (err) {
                            res.send({ok: false, msg: err})
                        }
                    )
                }
                else {
                    res.render('./page/access_denied')
                }
            })
    }
});

router.get('/user_senior_show_risk/:id/:cc',function(req,res){
    if (req.session.level_user_id != 4){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var id = req.params.id;
        var cc = req.params.depcode;
                    show_risk2.getSubShowDetail(db,id)
                        .then(function (rows) {
                            var data = rows[0];
                            data.date_risk = moment(data.date_risk).format('DD/MM/YYYY');
                            data.date_report_risk = moment(data.date_report_risk).format('DD/MM/YYYY');
                            data.date_repeat = moment(data.date_repeat).format('DD/MM/YYYY');
                            data.date_finished = moment(data.date_finished).format('DD/MM/YYYY');
                            res.render('page/user_senior_show_detail', {rows: data});
                        }, function (err) {
                            res.send({ok: false, msg: err})
                        })
                }
});

router.get('/user_senior_show_risk_feedback/:id',function(req,res){
    if (req.session.level_user_id != 4){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var id = req.params.id;
        show_risk2.getSubShowDetail(db,id)
            .then(function (rows) {
                var data = rows[0];
                data.date_risk = moment(data.date_risk).format('DD/MM/YYYY');
                            data.date_report_risk = moment(data.date_report_risk).format('DD/MM/YYYY');
                            data.date_repeat = moment(data.date_repeat).format('DD/MM/YYYY');
                            data.date_finished = moment(data.date_finished).format('DD/MM/YYYY');
                            res.render('page/user_senior_show_detail_feedback', {rows: data});
                        }, function (err) {
                            res.send({ok: false, msg: err})
                        })
    }
});

router.get('/risk_repeat/:id/:depcode',function(req,res){
    if (req.session.level_user_id != 4){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var id = req.params.id;
        risk_repeat.getSubShowPast5(db, id)
            .then(function (rows) {
                var data = rows[0];
                data.date_repeat = moment(data.date_repeat).format('DD/MM/YYYY');
                data.date_finished = moment(data.date_finished).format('DD/MM/YYYY');
                res.render('page/risk_repeat', {rows: data, risk_id: id});
            }, function (err) {
                res.send({ok: false, msg: err})
            })
    }
});


router.post('/update_part5', function(req,res) {
    if (req.session.level_user_id != 1 && req.session.level_user_id != 4){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var data = req.body.data;
        data.date_repeat=moment(data.date_repeat, 'DD/MM/YYYY').format('YYYY-MM-DD');
        data.date_finished=moment(data.date_finished, 'DD/MM/YYYY').format('YYYY-MM-DD');
        console.log(data.id);
        update_part1.Update_part1(db, data.id)
            .then(function () {
                return update_part2.Update_part5(db, data)
            })
            .then(function () {
                res.send({ok: true});
            },
            function (err) {
                res.send({ok: false, msg: err})
            })
    }
});

router.get('/request', function(req,res){
    var db = req.db;
    var data = {};
    if (req.session.level_user_id != 1){
        res.render('./page/access_denied')
    } else {
        depcode.getList_Department(db,req.session.depcode)
            .then(function(rows){
                data.depcodes = rows;
                return  department.getList(db);
            })
            .then(function (rows) {
                data.departments = rows;
                return program.getList(db);
            })
            .then(function (rows) {
                console.log(rows);
                data.programs = rows;
                return risk_type.getRisk_type(db);
            })
            .then(function (rows) {
                console.log(rows);
                data.risk_types = rows;
                return risk_report.getType_report(db);
            })
            .then(function (rows) {
                console.log(rows);
                data.risk_reports = rows;
                return type_complaint.getType_complaint(db);
            })
            .then(function (rows) {
                console.log(rows);
                data.type_complaints = rows;
                return risk_type.getRisk_type(db);
            })
            .then(function (rows) {
                console.log(rows);
                data.clinics = rows;
                res.render('page/request', {data: data});
            }, function (err) {
                console.log(err);
                res.render('page/request', {
                    data: {
                        programs: [], depratments: [], risk_types: [], risk_reports: []
                        , type_complaints: [], clinics: [],depcodes: []
                    }
                });
            });
    }
});

router.get('/user_senior_request', function(req,res){
    var db = req.db;
    var data = {};
    if (req.session.level_user_id != 4){
        res.render('./page/access_denied')
    } else {
        depcode.getList_Department(db,req.session.depcode)
            .then(function(rows){
                data.depcodes = rows;
                return  department.getList(db);
            })
            .then(function (rows) {
                data.departments = rows;
                return program.getList(db);
            })
            .then(function (rows) {
                console.log(rows);
                data.programs = rows;
                return risk_type.getRisk_type(db);
            })
            .then(function (rows) {
                console.log(rows);
                data.risk_types = rows;
                return risk_report.getType_report(db);
            })
            .then(function (rows) {
                console.log(rows);
                data.risk_reports = rows;
                return type_complaint.getType_complaint(db);
            })
            .then(function (rows) {
                console.log(rows);
                data.type_complaints = rows;
                return risk_type.getRisk_type(db);
            })
            .then(function (rows) {
                console.log(rows);
                data.clinics = rows;
                res.render('page/user_senior_request', {data: data});
            }, function (err) {
                console.log(err);
                res.render('page/user_senior_request', {
                    data: {
                        programs: [], depratments: [], risk_types: [], risk_reports: []
                        , type_complaints: [], clinics: [],depcodes: []
                    }
                });
            });
    }
});

router.get('/edit_risk/:id', function(req,res){
    if (req.session.level_user_id != 1){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var id = req.params.id;
        var data = {};
        show_risk2.Chack_sesion(db,id,req.session.username)
            .then(function(total){
                if(total > 0){
                    show_risk2.getSubShowDetail(db, id)
                        .then(function (rows) {
                            console.log(rows);
                            data.detail = rows[0];
                            data.detail.date_risk = moment(data.detail.date_risk).format('DD/MM/YYYY');
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
                            res.render('page/edit_risk', {data: data});
                        }, function (err) {
                            console.log(err);
                            res.render('page/edit_risk', {
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
                }else{
                    res.render('./page/access_denied')
                }
            })

    }
});

router.get('/user_senior_edit_risk/:id/:cc', function(req,res){
    if (req.session.level_user_id != 4){
        res.render('./page/access_denied')
    }else {
        var db = req.db;
        var id = req.params.id;
        var data = {};
                    show_risk2.getSubShowDetail(db,id)
                        .then(function (rows) {
                            console.log(rows);
                            data.detail = rows[0];
                            data.detail.date_risk = moment(data.detail.date_risk).format('DD/MM/YYYY');
                            //data.detail.date_risk = moment(data.detail.date_risk).format('YYYY-MM-DD');
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
                            res.render('page/user_senior_edit_risk', {data: data});
                        }, function (err) {
                            console.log(err);
                            res.render('page/user_senior_edit_risk', {
                                data: {
                                    programs: [],
                                    sub_programs: [],
                                    sub_groups: [],
                                    depratments: [], depcodes: [],
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

router.post('/sub_program',function(req,res){
  var id = req.body.id;
  var db = req.db;
  program.getSubList(db,id)
   .then(function(rows){
    res.send({ok:true,rows:rows});
  },
   function(err){
     res.send({ok:false,msg:err})
  })
});

router.post('/sub_group',function(req,res){
    var id = req.body.id;
    var db = req.db;
    detail.getSubDetail(db,id)
        .then(function(rows){
            res.send({ok:true,rows:rows});
        },
        function(err){
            res.send({ok:false,msg:err})
        })
});

router.post('/sub_group2',function(req,res){
    var id = req.body.id;
    var db = req.db;
    detail.getSubDetail2(db,id)
        .then(function(rows){
            res.send({ok:true,rows:rows});
        },
        function(err){
            res.send({ok:false,msg:err})
        })
});

router.post('/clinic',function(req,res){
    var id = req.body.id;
    var db = req.db;
    clinic.getClinicLevel(db,id)
        .then(function(rows){
            res.send({ok:true,rows:rows});
        },
        function(err){
            res.send({ok:false,msg:err})
        })
});

router.post('/save_request', function(req,res){
    var db = req.db;
    var data = req.body.data;
    data.username = req.session.username;
    data.date_risk=moment(data.date_risk, 'DD/MM/YYYY').format('YYYY-MM-DD');
    if(data){
        request.Save_part1(db,data)
            .then(function(id){
                data.id = id;
                return request.Save_part2(db,data)
            })
            .then(function(){
                return request.Save_part3(db,data)
            })
            .then(function(){
                return request.Save_part4(db,data)
            })
            .then(function(){
                return request.Save_part5(db,data)
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

router.post('/edit_request', function(req,res){
    var db = req.db;
    var data = req.body.data;
    //data.username = req.session.username;
    data.date_risk=moment(data.date_risk, 'DD/MM/YYYY').format('YYYY-MM-DD');
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


router.get('/risk_group_sub',function(req,res){
    var db = req.db;
    var data = {};
    program.getList(db)
        .then(function(rows){
            data.programs = rows;
            return group.getList(db);
        })
        .then(function(rows){
            console.log(rows);
            data.programs = rows;
            res.render('page/risk_group_sub',{data:data});
        },function(err){
            console.log(err);
            res.render('page/risk_group_sub',{data:{programs:[],group:[]}});
        });
});

router.post('/search_date_risk',function(req,res){
    var db = req.db;
    var data = {};
    data.date1 = req.body.date_searchrisk1;
    data.date2 = req.body.date_searchrisk2;
    data.date1=moment(data.date1, 'DD/MM/YYYY').format('YYYY-MM-DD');
    data.date2=moment(data.date2, 'DD/MM/YYYY').format('YYYY-MM-DD');
    data.username = req.session.username;

    console.log(data);
    request.search_date(db,data)
        .then(function(rows){
            console.log(rows);
                    res.send({ok: true,rows:rows});
                },
                function(err){
                    console.log(err);
                    res.send({ok:false,msg:err})
                })

});

router.post('/user_senior_search_date_risk',function(req,res){
    var db = req.db;
    var data = {};
    data.date1 = req.body.date_searchrisk1;
    data.date2 = req.body.date_searchrisk2;
    data.date1=moment(data.date1, 'DD/MM/YYYY').format('YYYY-MM-DD');
    data.date2=moment(data.date2, 'DD/MM/YYYY').format('YYYY-MM-DD');
    data.depcode = req.session.depcode;

    console.log(data);
    request.user_senior_search_date(db,data)
        .then(function(rows){
            console.log(rows);
                    res.send({ok: true,rows:rows});
                },
                function(err){
                    console.log(err);
                    res.send({ok:false,msg:err})
                })
});

router.post('/user_senior_search_date_risk_feedback',function(req,res){
    var db = req.db;
    var data = {};
    data.date1 = req.body.date_searchrisk1;
    data.date2 = req.body.date_searchrisk2;
    data.date1=moment(data.date1, 'DD/MM/YYYY').format('YYYY-MM-DD');
    data.date2=moment(data.date2, 'DD/MM/YYYY').format('YYYY-MM-DD');
    data.depcode = req.session.depcode;
    data.sub_depcode = req.session.sub_depcode;
    console.log(data);
    request.user_senior_search_date_feedback(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })
});

router.post('/search_topic_risk',function(req,res){
    var db = req.db;
    var data = {};
    data.topic = req.body.topic;
    data.username = req.session.username;

    console.log(data);
    request.search_topic(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});

router.post('/user_senior_search_topic_risk',function(req,res){
    var db = req.db;
    var data = {};
    data.topic = req.body.topic;
    data.depcode = req.session.depcode;

    console.log(data);
    request.user_senior_search_topic(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});

router.post('/user_senior_search_topic_risk_feedback',function(req,res){
    var db = req.db;
    var data = {};
    data.topic = req.body.topic;
    data.depcode = req.session.depcode;
    data.sub_depcode = req.session.sub_depcode;
    console.log(data);
    request.user_senior_search_topic_feedback(db,data)
        .then(function(rows){
            console.log(rows);
            res.send({ok: true,rows:rows});
        },
        function(err){
            console.log(err);
            res.send({ok:false,msg:err})
        })

});

router.post('/save_news',function(req,res){
    var db = req.db;
    var date = req.body.date_news;
    var topic_news = req.body.topic_news;
    var detail_news = req.body.detail_news;
    var date_news=moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    console.log(req.body.id,date_news,req.body.topic_news,req.body.detail_news);
    if(topic_news && detail_news){
        news.save_news(db,date_news,topic_news,detail_news)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

router.post('/update_news',function(req,res){
    var db = req.db;
    var date = req.body.date_news;
    var topic_news = req.body.topic_news;
    var detail_news = req.body.detail_news;
    var id = req.body.id;
    var date_news=moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    console.log(req.body.id,date_news,req.body.topic_news,req.body.detail_news);
    if(topic_news && id){
        news.update_news(db,id,date_news,topic_news,detail_news)
            .then(function(){
                res.send({ok:true})
            },function(err){
                res.send({ok:false,msg:err})
            })
    } else {
        res.send({ok:false,msg:'ข้อมูลไม่สมบูรณ์'})
    }
});

module.exports = router;

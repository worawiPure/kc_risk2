var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Q = require('q');
var fs = require('fs');
var numeral = require('numeral');
var pdf = require('html-pdf');
var moment = require('moment');
var fse = require('fs-extra');
var gulp = require('gulp');
var data = require('gulp-data');
var jade = require('gulp-jade');
var rimraf = require('rimraf');

var report_detail = require('../models/report_detail');
var report_abstract = require('../models/report_detail');
var report_terminal = require('../models/report_summary');
var department = require('../models/department');


router.get('/:id', function (req, res, next) {
  var db = req.db;
  var json = {};
  var id = req.params.id;

 report_detail.getReport_detail(db,id)
     .then(function(rows){
         json.detail = rows[0];
         console.log(json.detail);
         json.detail.date_risk=moment(json.detail.date_risk).format("DD-MM-YYYY");
         json.detail.date_repeat=moment(json.detail.date_repeat).format("DD-MM-YYYY");
         json.detail.date_finished=moment(json.detail.date_finished).format("DD-MM-YYYY");
         fse.ensureDirSync('./templates/html');
         fse.ensureDirSync('./templates/pdf');

         var destPath = './templates/html/' + moment().format('x');
         fse.ensureDirSync(destPath);

         json.img = './img/sign.png';
         // Create pdf
         gulp.task('html', function (cb) {
             return gulp.src('./templates/report_detail.jade')
                 .pipe(data(function () {
                     return json;
                 }))
                 .pipe(jade())
                 .pipe(gulp.dest(destPath));
             cb();
         });

         gulp.task('pdf', ['html'], function () {
             var html = fs.readFileSync(destPath + '/report_detail.html', 'utf8')
             var options = {
                 format: 'A4',
                 header:{
                     height: "18mm",
                     contents: '<div style="text-align: center"><h4>รายละเอียด อุบัติการณ์ความเสี่ยง</h2></div>'
                 },
                 footer: {
                     height: "15mm",
                     contents: '<span style="color: #444;"><small>Printed: '+ new Date() +'</small></span>'
                 }
             };

             var pdfName = './templates/pdf/risk-' + moment().format('x') + '.pdf';

             pdf.create(html, options).toFile(pdfName, function(err, resp) {
                 if (err) {
                     res.send({ok: false, msg: err});
                 } else {
                     res.download(pdfName, function () {
                         rimraf.sync(destPath);
                         fse.removeSync(pdfName);
                     });
                 }
             });
         });
         // Convert html to pdf
         gulp.start('pdf');

     },function(err){
         res.send({ok: false, msg: err});
     })
    // ensure directory
  })


router.get('/abstract_report/:id', function (req, res, next) {
    var db = req.db;
    var json = {};
    var id = req.params.id;

    report_abstract.getReport_abstract(db,id)
        .then(function(rows) {
            console.log(id);
                json.detail = rows[0];
                console.log(json.detail);
                json.detail.date_risk = moment(json.detail.date_risk).format("DD-MM-YYYY");
                fse.ensureDirSync('./templates/html');
                fse.ensureDirSync('./templates/pdf');

                var destPath = './templates/html/' + moment().format('x');
                fse.ensureDirSync(destPath);

                json.img = './img/sign.png';
                // Create pdf
                gulp.task('html', function (cb) {
                    return gulp.src('./templates/report_abstract.jade')
                        .pipe(data(function () {
                            return json;
                        }))
                        .pipe(jade())
                        .pipe(gulp.dest(destPath));
                    cb();
                });

                gulp.task('pdf', ['html'], function () {
                    var html = fs.readFileSync(destPath + '/report_abstract.html', 'utf8')
                    var options = {
                        format: 'A4',
                        header: {
                            height: "30mm",
                            contents: '<div style="text-align: center"><h2>รายงาน สรุปอุบัติการณ์</h2></div>'
                        },
                        footer: {
                            height: "15mm",
                            contents: '<span style="color: #444;"><small>Printed: ' + new Date() + '</small></span>'
                        }
                    };

                    var pdfName = './templates/pdf/risk-' + moment().format('x') + '.pdf';

                    pdf.create(html, options).toFile(pdfName, function (err, resp) {
                        if (err) {
                            res.send({ok: false, msg: err});
                        } else {
                            res.download(pdfName, function () {
                                rimraf.sync(destPath);
                                fse.removeSync(pdfName);
                            });
                        }
                    });
                });
                // Convert html to pdf
                gulp.start('pdf');
        },function(err){
            res.send({ok: false, msg: err});
        })
    // ensure directory

})

router.post('/report_risk', function (req, res, next) {
    var db = req.db;
    var json = {};
    var id = req.body.id;

    report_detail.getReport_detail(db,id)
        .then(function(rows){
            json.detail = rows[0];
            console.log(json.detail);
            json.detail.date_risk=moment(json.detail.date_risk).format("DD-MM-YYYY");
            json.detail.date_repeat=moment(json.detail.date_repeat).format("DD-MM-YYYY");
            json.detail.date_finished=moment(json.detail.date_finished).format("DD-MM-YYYY");
            fse.ensureDirSync('./templates/html');
            fse.ensureDirSync('./templates/pdf');

            var destPath = './templates/html/' + moment().format('x');
            fse.ensureDirSync(destPath);

            json.img = './img/sign.png';
            // Create pdf
            gulp.task('html', function (cb) {
                return gulp.src('./templates/report_detail.jade')
                    .pipe(data(function () {
                        return json;
                    }))
                    .pipe(jade())
                    .pipe(gulp.dest(destPath));
                cb();
            });

            gulp.task('pdf', ['html'], function () {
                var html = fs.readFileSync(destPath + '/report_detail.html', 'utf8')
                var options = {
                    format: 'A4',
                    header:{
                        height: "18mm",
                        contents: '<div style="text-align: center"><h2>รายละเอียด อุบัติการณ์ความเสี่ยง</h2></div>'
                    },
                    footer: {
                        height: "15mm",
                        contents: '<span style="color: #444;"><small>Printed: '+ new Date() +'</small></span>'
                    }
                };

                var pdfName = './templates/pdf/risk-' + moment().format('x') + '.pdf';

                pdf.create(html, options).toFile(pdfName, function(err, resp) {
                    if (err) {
                        res.send({ok: false, msg: err});
                    } else {
                        res.download(pdfName, function () {
                            rimraf.sync(destPath);
                            fse.removeSync(pdfName);
                        });
                    }
                });
            });
            // Convert html to pdf
            gulp.start('pdf');

        },function(err){
            res.send({ok: false, msg: err});
        })
    // ensure directory
})

router.get('/report_terminal/:date1/:date2', function (req, res, next) {
    var db = req.db;
    var json = {};
    var date1 = req.params.date1;
    var date2 = req.params.date2;
    console.log(date1);
    console.log(date2);
    report_terminal.getReport_terminal2(db,date1,date2)
        .then(function(rows){
            json.detail = rows;
            console.log(json.detail);
            json.detail.Date_Time=moment(json.detail.Date_Time).format("DD/MM/YYYY HH:mm");
            fse.ensureDirSync('./templates/html');
            fse.ensureDirSync('./templates/pdf');

            var destPath = './templates/html/' + moment().format('x');
            fse.ensureDirSync(destPath);

            json.img = './img/sign.png';
            // Create pdf
            gulp.task('html', function (cb) {
                return gulp.src('./templates/report_terminal.jade')
                    .pipe(data(function () {
                        return json;
                    }))
                    .pipe(jade())
                    .pipe(gulp.dest(destPath));
                cb();
            });

            gulp.task('pdf', ['html'], function () {
                var html = fs.readFileSync(destPath + '/report_terminal.html', 'utf8')
                var options = {
                    format: 'A4',
                    orientation: "landscape",
                    header:{
                        height: "18mm",
                        contents: '<div style="text-align: center"><h2>รายงาน สรุปอุบัติการณ์ความเสี่ยง ตั้งแต่ '+ moment(date1).format('DD/MM/YYYY') +' - '+ moment(date2).format('DD/MM/YYYY') +'</h2></div>'
                    },
                    footer: {
                        height: "15mm",
                        contents: '<span style="color: #444;"><small>Printed: '+ new Date() +'</small></span>'
                    }
                };

                var pdfName = './templates/pdf/risk-' + moment().format('x') + '.pdf';

                pdf.create(html, options).toFile(pdfName, function(err, resp) {
                    if (err) {
                        res.send({ok: false, msg: err});
                    } else {
                        res.download(pdfName, function () {
                            rimraf.sync(destPath);
                            fse.removeSync(pdfName);
                        });
                    }
                });
            });
            // Convert html to pdf
            gulp.start('pdf');

        },function(err){
            res.send({ok: false, msg: err});
        })
    // ensure directory
}),

router.get('/report_summary_date/:date1/:date2', function (req, res, next) {
    var db = req.db;
    var json = {};
    var date1 = req.params.date1;
    var date2 = req.params.date2;
    console.log(date1);
    console.log(date2);
    report_terminal.getReport_summary_date2(db,date1,date2)
        .then(function(rows){
            json.detail = rows;
            console.log(json.detail);
            fse.ensureDirSync('./templates/html');
            fse.ensureDirSync('./templates/pdf');

            var destPath = './templates/html/' + moment().format('x');
            fse.ensureDirSync(destPath);

            json.img = './img/sign.png';
            // Create pdf
            gulp.task('html', function (cb) {
                return gulp.src('./templates/report_summary_date.jade')
                    .pipe(data(function () {
                        return json;
                    }))
                    .pipe(jade())
                    .pipe(gulp.dest(destPath));
                cb();
            });
            gulp.task('pdf', ['html'], function () {
                var html = fs.readFileSync(destPath + '/report_summary_date.html', 'utf8')
                var options = {
                    format: 'A4',
                    orientation: "landscape",
                    header:{
                        height: "18mm",
                        contents: '<div style="text-align: center"><h2>รายงานความเสี่ยงสรุปยอดตามวันที่    ตั้งแต่ '+ moment(date1).format('DD/MM/YYYY') +' - '+ moment(date2).format('DD/MM/YYYY') +' </h2></div>'
                    },
                    footer: {
                        height: "15mm",
                        contents: '<span style="color: #444;"><small>Printed: '+ new Date() +'</small></span>'
                    }
                };
                var pdfName = './templates/pdf/risk-' + moment().format('x') + '.pdf';
                pdf.create(html, options).toFile(pdfName, function(err, resp) {
                    if (err) {
                        res.send({ok: false, msg: err});
                    } else {
                        res.download(pdfName, function () {
                            rimraf.sync(destPath);
                            fse.removeSync(pdfName);
                        });
                    }
                });
            });
            // Convert html to pdf
            gulp.start('pdf');
        },function(err){
            res.send({ok: false, msg: err});
        })
    // ensure directory
}),

    router.get('/report_summary_department/:date1/:date2/:depcode', function (req, res, next) {
        var db = req.db;
        var dep = {};
        var json = {};
        var date1 = req.params.date1;
        var date2 = req.params.date2;
        var depcode = req.params.depcode;
        console.log(date1);
        console.log(date2);
        console.log(depcode);

        department.getList_Department(db,depcode)
                .then(function (rows) {
                    console.log(rows);
                    dep.detail = rows[0];
                return report_terminal.getReport_summary_department2(db,date1,date2,depcode)
                })
            .then(function(rows){
                json.detail = rows;
                console.log(json.detail);
                fse.ensureDirSync('./templates/html');
                fse.ensureDirSync('./templates/pdf');
                var destPath = './templates/html/' + moment().format('x');
                fse.ensureDirSync(destPath);

                json.img = './img/sign.png';
                // Create pdf
                gulp.task('html', function (cb) {
                    return gulp.src('./templates/report_summary_department.jade')
                        .pipe(data(function () {
                            return json;
                        }))
                        .pipe(jade())
                        .pipe(gulp.dest(destPath));
                    cb();
                });
                gulp.task('pdf', ['html'], function () {
                    var html = fs.readFileSync(destPath + '/report_summary_department.html', 'utf8')
                    var options = {
                        format: 'A4',
                        orientation: "landscape",
                        header:{
                            height: "18mm",
                            contents: '<div style="text-align: center"><h2>รายงานสรุปยอดตามแผนกที่เกิดความเสี่ยง ตั้งแต่ '+ moment(date1).format('DD/MM/YYYY') +' - '+ moment(date2).format('DD/MM/YYYY') +' แผนก '+ dep.detail.depname +' </h2></div>'
                        },
                        footer: {
                            height: "15mm",
                            contents: '<span style="color: #444;"><small>Printed: '+ new Date() +'</small></span>'
                        }
                    };
                    var pdfName = './templates/pdf/risk-' + moment().format('x') + '.pdf';
                    pdf.create(html, options).toFile(pdfName, function(err, resp) {
                        if (err) {
                            res.send({ok: false, msg: err});
                        } else {
                            res.download(pdfName, function () {
                                rimraf.sync(destPath);
                                fse.removeSync(pdfName);
                            });
                        }
                    });
                });
                // Convert html to pdf
                gulp.start('pdf');
            },function(err){
                res.send({ok: false, msg: err});
            })
        // ensure directory
    }),

router.get('/report_senior/:date1/:date2', function (req, res, next) {
    var db = req.db;
    var json = {};
    var date1 = req.params.date1;
    var date2 = req.params.date2;
    var depcode = req.session.depcode;
    var depname = req.session.depname;
    console.log(date1);
    console.log(date2);
    console.log(depcode);
    report_terminal.getReport_senior(db,date1,date2,depcode)
        .then(function(rows){
            json.detail = rows;
            console.log(json.detail);
            json.detail.Date_Time=moment(json.detail.Date_Time).format("DD/MM/YYYY HH:mm");
            fse.ensureDirSync('./templates/html');
            fse.ensureDirSync('./templates/pdf');
            var destPath = './templates/html/' + moment().format('x');
            fse.ensureDirSync(destPath);
            json.img = './img/sign.png';
            // Create pdf
            gulp.task('html', function (cb) {
                return gulp.src('./templates/report_terminal.jade')
                    .pipe(data(function () {
                        return json;
                    }))
                    .pipe(jade())
                    .pipe(gulp.dest(destPath));
                cb();
            });
            gulp.task('pdf', ['html'], function () {
                var html = fs.readFileSync(destPath + '/report_terminal.html', 'utf8')
                var options = {
                    format: 'A4',
                    orientation: "landscape",
                    header:{
                        height: "18mm",
                        contents: '<div style="text-align: center"><h2>รายงาน สรุปอุบัติการณ์ความเสี่ยง แผนก '+ depname +' ตั้งแต่ '+ moment(date1).format('DD/MM/YYYY') +' - '+ moment(date2).format('DD/MM/YYYY') +'</h2></div>'
                    },
                    footer: {
                        height: "15mm",
                        contents: '<span style="color: #444;"><small>Printed: '+ new Date() +'</small></span>'
                    }
                };

                var pdfName = './templates/pdf/risk-' + moment().format('x') + '.pdf';

                pdf.create(html, options).toFile(pdfName, function(err, resp) {
                    if (err) {
                        res.send({ok: false, msg: err});
                    } else {
                        res.download(pdfName, function () {
                            rimraf.sync(destPath);
                            fse.removeSync(pdfName);
                        });
                    }
                });
            });
            // Convert html to pdf
            gulp.start('pdf');

        },function(err){
            res.send({ok: false, msg: err});
        })
    // ensure directory
});

router.get('/report_user/:date1/:date2', function (req, res, next) {
    var db = req.db;
    var json = {};
    var date1 = req.params.date1;
    var date2 = req.params.date2;
    var username = req.session.username;
    var depname = req.session.depname;
    console.log(date1);
    console.log(date2);
    console.log(username);
    report_terminal.getReport_user2(db,date1,date2,username)
        .then(function(rows){
            json.detail = rows;
            console.log(json.detail);
            json.detail.Date_Time=moment(json.detail.Date_Time).format("DD/MM/YYYY HH:mm");
            fse.ensureDirSync('./templates/html');
            fse.ensureDirSync('./templates/pdf');

            var destPath = './templates/html/' + moment().format('x');
            fse.ensureDirSync(destPath);

            json.img = './img/sign.png';
            // Create pdf
            gulp.task('html', function (cb) {
                return gulp.src('./templates/report_terminal.jade')
                    .pipe(data(function () {
                        return json;
                    }))
                    .pipe(jade())
                    .pipe(gulp.dest(destPath));
                cb();
            });

            gulp.task('pdf', ['html'], function () {
                var html = fs.readFileSync(destPath + '/report_terminal.html', 'utf8')
                var options = {
                    format: 'A4',
                    orientation: "landscape",
                    header:{
                        height: "18mm",
                        contents: '<div style="text-align: center"><h2>รายงาน สรุปอุบัติการณ์ความเสี่ยง แผนก '+ depname +' ตั้งแต่ '+ moment(date1).format('DD/MM/YYYY') +' - '+ moment(date2).format('DD/MM/YYYY') +'</h2></div>'
                    },
                    footer: {
                        height: "15mm",
                        contents: '<span style="color: #444;"><small>Printed: '+ new Date() +'</small></span>'
                    }
                };

                var pdfName = './templates/pdf/risk-' + moment().format('x') + '.pdf';

                pdf.create(html, options).toFile(pdfName, function(err, resp) {
                    if (err) {
                        res.send({ok: false, msg: err});
                    } else {
                        res.download(pdfName, function () {
                            rimraf.sync(destPath);
                            fse.removeSync(pdfName);
                        });
                    }
                });
            });
            // Convert html to pdf
            gulp.start('pdf');

        },function(err){
            res.send({ok: false, msg: err});
        })
    // ensure directory
});

router.get('/report_level/:date1/:date2/:risk_type/:risk_level', function (req, res, next) {
    var db = req.db;
    var json = {};
    var date1 = req.params.date1;
    var date2 = req.params.date2;
    var risk_type = req.params.risk_type;
    var risk_level = req.params.risk_level;
    console.log(date1,date2,risk_level,risk_type);
    report_terminal.getReport_level2(db,date1,date2,risk_type,risk_level)
        .then(function(rows){
            json.detail = rows;
            console.log(json.detail);
            json.detail.Date_Time=moment(json.detail.Date_Time).format("DD/MM/YYYY HH:mm");
            fse.ensureDirSync('./templates/html');
            fse.ensureDirSync('./templates/pdf');
            var destPath = './templates/html/' + moment().format('x');
            fse.ensureDirSync(destPath);
            json.img = './img/sign.png';
            // Create pdf
            gulp.task('html', function (cb) {
                return gulp.src('./templates/report_level.jade')
                    .pipe(data(function () {
                        return json;
                    }))
                    .pipe(jade())
                    .pipe(gulp.dest(destPath));
                cb();
            });
            gulp.task('pdf', ['html'], function () {
                var html = fs.readFileSync(destPath + '/report_level.html', 'utf8')
                var options = {
                    format: 'A4',
                    orientation: "landscape",
                    header:{
                        height: "18mm",
                        contents: '<div style="text-align: center"><h2>รายงาน สรุปอุบัติการณ์ความเสี่ยงแยกระดับความรุนแรง  ตั้งแต่ '+ moment(date1).format('DD/MM/YYYY') +' - '+ moment(date2).format('DD/MM/YYYY') +'</h2></div>'
                    },
                    footer: {
                        height: "15mm",
                        contents: '<span style="color: #444;"><small>Printed: '+ new Date() +'</small></span>'
                    }
                };

                var pdfName = './templates/pdf/risk-' + moment().format('x') + '.pdf';

                pdf.create(html, options).toFile(pdfName, function(err, resp) {
                    if (err) {
                        res.send({ok: false, msg: err});
                    } else {
                        res.download(pdfName, function () {
                            rimraf.sync(destPath);
                            fse.removeSync(pdfName);
                        });
                    }
                });
            });
            // Convert html to pdf
            gulp.start('pdf');

        },function(err){
            res.send({ok: false, msg: err});
        })
    // ensure directory
});

router.get('/pdf', function(req, res, next) {
  var fs = require('fs');
  var pdf = require('html-pdf');

  var json = {
    fullname: 'นายสถิตย์  เรียนพิศ',
    items: [
      {id: 1, name: 'Apple'},
      {id: 2, name: 'Banana'},
      {id: 3, name: 'Orange'},
    ]
  };

  gulp.task('html', function (cb) {
    return gulp.src('./templates/report_summary.jade')
      .pipe(data(function () {
        return json;
      }))
      .pipe(jade())
      .pipe(gulp.dest('./templates'));
      cb();
  });

  gulp.task('pdf', ['html'], function () {
    var html = fs.readFileSync('./templates/slip.html', 'utf8')
    var options = {
      format: 'A4'
    };

    pdf.create(html, options).toFile('./public/pdf/slip.pdf', function(err, resp) {
      if (err) return console.log(err);
      res.send({ok: true, file: resp}) // { filename: '/app/businesscard.pdf' }
    });
  });

  gulp.start('pdf');

});
module.exports = router;

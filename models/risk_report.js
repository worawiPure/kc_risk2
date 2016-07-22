var Q = require('q');

module.exports = {

    getRisk_today_senior: function(db,date_today,depcode){
        var q = Q.defer();
        var sql =   'SELECT count(*) as total FROM risk_request_first f '+
        'INNER JOIN risk_request_fourth u ON u.risk_request_id=f.id      '+
        'where f.date_report_risk = ?     '+
        'and u.depcode = ? ';
        db.raw(sql,[date_today,depcode])
            .then(function(rows){
                q.resolve(rows[0][0].total)
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getNews: function(db,startpage){
        var q = Q.defer();
        var sql =   ' SELECT * FROM news ORDER BY date_news DESC limit 10 offset ?';
        db.raw(sql,[startpage])
            .then(function(rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getNews_total: function(db){
        var q = Q.defer();
        var sql =   'SELECT count(*) as total FROM news ';
        db.raw(sql)
            .then(function(rows){
                q.resolve(rows[0][0].total)
            })
            .catch(function(err){
                console.log(errc)
                q.reject(err)
            });
        return q.promise;
    },

    getSubAllDetail: function(db,username,startpage){
        var q = Q.defer();
        var sql =   'SELECT f.confirm,f.id,a.name as aa,f.topic_risk,c.name as com,f.date_risk,f.time_risk,d.depname,f.area_risk,p.program_risk,b.name_sub_program,e.risk_detail as subgroup,s.note_other as yy,s.risk_correct,s.risk_detail,s.risk_level,t.hn,t.an,t.name_kin,t.name_officer,t.name_other,t.name_patient,t.note_kin,t.note_officer,t.note_other,t.note_patient,r.name as report,u.name_report,u.position,u.depcode,d2.depname as mm FROM risk_request_first f '+
        'INNER JOIN risk_request_second s ON s.risk_request_id=f.id '+
        'INNER JOIN risk_request_third t ON t.risk_request_id=f.id '+
        'INNER JOIN risk_request_fourth u ON u.risk_request_id=f.id '+
        'LEFT JOIN risk_type a ON a.id=f.type_risk    '+
        'LEFT JOIN type_complaint c ON c.id=f.complaint_type '+
        'LEFT JOIN department d ON d.id=f.depcode   '+
        'LEFT JOIN department d2 ON d2.id=u.depcode   '+
        'LEFT JOIN risk_program p ON p.id=s.risk_program  '+
        'LEFT JOIN risk_sub_program b ON b.id=s.risk_group   '+
        'LEFT JOIN risk_detail e ON e.id=s.risk_sub_group   '+
        'LEFT JOIN type_report r ON r.id=u.type_report '+
        'WHERE f.username = ? '+
        'ORDER BY f.date_risk DESC '+
        'limit 10 offset ?';
        db.raw(sql,[username,startpage])
            .then(function(rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getSubAllDetail_total: function(db,username){
        var q = Q.defer();
        var sql =   'SELECT count(*) as total FROM risk_request_first f '+
        'INNER JOIN risk_request_second s ON s.risk_request_id=f.id '+
        'INNER JOIN risk_request_third t ON t.risk_request_id=f.id '+
        'INNER JOIN risk_request_fourth u ON u.risk_request_id=f.id '+
        'WHERE f.username = ? ';
        db.raw(sql,[username])
            .then(function(rows){
                q.resolve(rows[0][0].total)
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getSubAllDetail_user_senior: function(db,depcode,startpage){
        var q = Q.defer();
        var sql =   'SELECT f.confirm,f.id,a.name as aa,f.topic_risk,c.name as com,f.date_risk,f.time_risk,d.depname,f.area_risk,p.program_risk,b.name_sub_program,e.risk_detail as subgroup,s.note_other as yy,s.risk_correct,s.risk_detail,s.risk_level,t.hn,t.an,t.name_kin,t.name_officer,t.name_other,t.name_patient,t.note_kin,t.note_officer,t.note_other,t.note_patient,r.name as report,u.name_report,u.position,f.depcode,d2.depname as mm,u.depcode as cc FROM risk_request_first f '+
        'INNER JOIN risk_request_second s ON s.risk_request_id=f.id '+
        'INNER JOIN risk_request_third t ON t.risk_request_id=f.id '+
        'INNER JOIN risk_request_fourth u ON u.risk_request_id=f.id '+
        'LEFT JOIN risk_type a ON a.id=f.type_risk    '+
        'LEFT JOIN type_complaint c ON c.id=f.complaint_type '+
        'LEFT JOIN department d ON d.id=f.depcode   '+
        'LEFT JOIN department d2 ON d2.id=u.depcode   '+
        'LEFT JOIN risk_program p ON p.id=s.risk_program  '+
        'LEFT JOIN risk_sub_program b ON b.id=s.risk_group   '+
        'LEFT JOIN risk_detail e ON e.id=s.risk_sub_group   '+
        'LEFT JOIN type_report r ON r.id=u.type_report '+
        'WHERE u.depcode = ? ' +
        'ORDER BY f.date_risk DESC '+
        'limit 10 offset ? ';
        db.raw(sql,[depcode,startpage])
            .then(function(rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getSubAllDetail_user_senior_today: function(db,depcode,date_today,startpage){
        var q = Q.defer();
        var sql =   'SELECT f.confirm,f.id,a.name as aa,f.topic_risk,c.name as com,f.date_risk,f.time_risk,d.depname,f.area_risk,p.program_risk,b.name_sub_program,e.risk_detail as subgroup,s.note_other as yy,s.risk_correct,s.risk_detail,s.risk_level,t.hn,t.an,t.name_kin,t.name_officer,t.name_other,t.name_patient,t.note_kin,t.note_officer,t.note_other,t.note_patient,r.name as report,u.name_report,u.position,f.depcode,d2.depname as mm,u.depcode as cc FROM risk_request_first f '+
            'INNER JOIN risk_request_second s ON s.risk_request_id=f.id '+
            'INNER JOIN risk_request_third t ON t.risk_request_id=f.id '+
            'INNER JOIN risk_request_fourth u ON u.risk_request_id=f.id '+
            'LEFT JOIN risk_type a ON a.id=f.type_risk    '+
            'LEFT JOIN type_complaint c ON c.id=f.complaint_type '+
            'LEFT JOIN department d ON d.id=f.depcode   '+
            'LEFT JOIN department d2 ON d2.id=u.depcode   '+
            'LEFT JOIN risk_program p ON p.id=s.risk_program  '+
            'LEFT JOIN risk_sub_program b ON b.id=s.risk_group   '+
            'LEFT JOIN risk_detail e ON e.id=s.risk_sub_group   '+
            'LEFT JOIN type_report r ON r.id=u.type_report '+
            'WHERE u.depcode = ? ' +
            'AND f.date_report_risk = ? '+
            'ORDER BY f.date_risk DESC '+
            'limit 10 offset ? ';
        db.raw(sql,[depcode,date_today,startpage])
            .then(function(rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getSubAllDetail_user_senior_total: function(db,depcode){
        var q = Q.defer();
        var sql =   'SELECT count(*) as total FROM risk_request_first f '+
        'INNER JOIN risk_request_second s ON s.risk_request_id=f.id '+
        'INNER JOIN risk_request_third t ON t.risk_request_id=f.id '+
        'INNER JOIN risk_request_fourth u ON u.risk_request_id=f.id '+
        'WHERE u.depcode = ? ';
        db.raw(sql,[depcode])
            .then(function(rows){
                q.resolve(rows[0][0].total)
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getSubAllDetail_user_senior_total_today: function(db,depcode,date_today){
        var q = Q.defer();
        var sql =   'SELECT count(*) as total FROM risk_request_first f '+
            'INNER JOIN risk_request_second s ON s.risk_request_id=f.id '+
            'INNER JOIN risk_request_third t ON t.risk_request_id=f.id '+
            'INNER JOIN risk_request_fourth u ON u.risk_request_id=f.id '+
            'WHERE u.depcode = ? ' +
            'AND f.date_report_risk = ? ';
        db.raw(sql,[depcode,date_today])
            .then(function(rows){
                q.resolve(rows[0][0].total)
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getSubAllDetail_admin_today: function(db,date_today,startpage){
        var q = Q.defer();
        var sql =   'SELECT f.date_risk,f.id,f.topic_risk,d.depname as department_report,' +
            'd2.depname as department_risk,r.detail,f.confirm,f.abstract FROM risk_request_first f '+
            'INNER JOIN risk_request_fourth u ON u.risk_request_id=f.id                     '+
            'LEFT JOIN risk_abstract r ON r.request_id = f.id                                 '+
            'LEFT JOIN department d ON u.depcode=d.depcode                             '+
            'LEFT JOIN department d2 ON f.depcode=d2.depcode        '+
            'where f.date_report_risk = ? '+
            'ORDER BY f.date_risk ASC  limit 15 offset ? ';
        db.raw(sql,[date_today,startpage])
            .then(function(rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getSubAllDetail_admin_total_today: function(db,date_today){
        var q = Q.defer();
        var sql = 'SELECT count(*) as total FROM risk_request_first WHERE date_report_risk = ? ';
        db.raw(sql,[date_today])
            .then(function (rows) {
                q.resolve(rows[0][0].total)
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;;
    },

    getSubAllDetail_user_senior_feedback: function(db,depcode,sub_depcode,startpage){
        var q = Q.defer();
        //var sql =   'SELECT f.confirm,f.id,a.name as aa,f.topic_risk,c.name as com,f.date_risk,f.time_risk,' +
          //  'd.depname,f.area_risk,p.program_risk,b.name_sub_program,e.risk_detail as subgroup,s.note_other as yy,' +
           // 's.risk_correct,s.risk_detail,s.risk_level,t.hn,t.an,t.name_kin,t.name_officer,t.name_other,t.name_patient,' +
            //'t.note_kin,t.note_officer,t.note_other,t.note_patient,r.name as report,u.name_report,' +
           // 'u.position,f.depcode,d2.depname as mm,u.depcode as cc FROM risk_request_first f '+
            //'INNER JOIN risk_request_second s ON s.risk_request_id=f.id '+
            //'INNER JOIN risk_request_third t ON t.risk_request_id=f.id '+
            //'INNER JOIN risk_request_fourth u ON u.risk_request_id=f.id '+
            //'LEFT JOIN risk_type a ON a.id=f.type_risk    '+
            //'LEFT JOIN type_complaint c ON c.id=f.complaint_type '+
            //'LEFT JOIN department d ON d.id=f.depcode   '+
            //'LEFT JOIN department d2 ON d2.id=u.depcode   '+
            //'LEFT JOIN risk_program p ON p.id=s.risk_program  '+
            //'LEFT JOIN risk_sub_program b ON b.id=s.risk_group   '+
            //'LEFT JOIN risk_detail e ON e.id=s.risk_sub_group   '+
            //'LEFT JOIN type_report r ON r.id=u.type_report '+
            //'WHERE f.depcode IN (?,?)        '+
            //'AND u.depcode Not IN (?,?)         '+
            //'ORDER BY f.date_risk DESC '+
            //'limit 10 offset ? ';

        db('risk_request_first as f')
            .select('f.confirm', 'f.id', 'a.name as aa', 'f.topic_risk', 'c.name as com', 'f.date_risk', 'f.time_risk',
            'd.depname', 'f.area_risk', 'p.program_risk', 'b.name_sub_program', 'e.risk_detail as subgroup', 's.note_other as yy',
            's.risk_correct', 's.risk_detail', 's.risk_level', 't.hn', 't.an', 't.name_kin', 't.name_officer', 't.name_other', 't.name_patient',
            't.note_kin', 't.note_officer', 't.note_other', 't.note_patient', 'r.name as report', 'u.name_report',
            'u.position', 'f.depcode', 'd2.depname as mm', 'u.depcode as cc'
        )
            .innerJoin('risk_request_second as s', 's.risk_request_id', 'f.id')
            .innerJoin('risk_request_third as t', 't.risk_request_id', 'f.id')
            .innerJoin('risk_request_fourth as u', 'u.risk_request_id', 'f.id')
            .leftJoin('risk_type as a', 'a.id', 'f.type_risk')
            .leftJoin('type_complaint as c', 'c.id', 'f.complaint_type')
            .leftJoin('department as d', 'd.id', 'f.depcode')
            .leftJoin('department as d2', 'd2.id', 'u.depcode')
            .leftJoin('risk_program as p', 'p.id', 's.risk_program')
            .leftJoin('risk_sub_program as b', 'b.id', 's.risk_group')
            .leftJoin('risk_detail as e', 'e.id', 's.risk_sub_group')
            .leftJoin('type_report as r', 'r.id', 'u.type_report')
            .whereIn('f.depcode', [depcode,sub_depcode])
            .whereNotIn('u.depcode',[depcode])
            .orderBy('f.date_risk','DESC')
            .limit(10)
            .offset(startpage)
        //db.raw(sql,[depcode,sub_depcode,depcode,sub_depcode,startpage])
            .then(function(rows){
                q.resolve(rows)
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getSubAllDetail_user_senior_feedback_total: function(db,depcode,sub_depcode){
        var q = Q.defer();
        //var sql =   'SELECT count(*) as total FROM risk_request_first f '+
          //  'INNER JOIN risk_request_second s ON s.risk_request_id=f.id '+
           // 'INNER JOIN risk_request_third t ON t.risk_request_id=f.id '+
           // 'INNER JOIN risk_request_fourth u ON u.risk_request_id=f.id '+
           // 'WHERE f.depcode IN (?,?)                   '+
           // 'AND u.depcode NOT IN (?,?)                 ';
        db('risk_request_first as f')
            .count('* as total')
            .innerJoin('risk_request_second as s', 's.risk_request_id', 'f.id')
            .innerJoin('risk_request_third as t', 't.risk_request_id', 'f.id')
            .innerJoin('risk_request_fourth as u', 'u.risk_request_id', 'f.id')
            .whereIn('f.depcode',[depcode,sub_depcode])
            .whereNotIn('u.depcode',[depcode,sub_depcode])
       // db.raw(sql,[depcode,sub_depcode,depcode,sub_depcode])
            .then(function(rows){
                q.resolve(rows[0].total)
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getSubShowDetail: function(db,id){
        var q = Q.defer();
        var sql =   'SELECT s.sentinel,v.risk_level as pp,s.risk_level,s.risk_program,s.risk_group,' +
        's.risk_sub_group,r.name as zz,a.name as qq,c.name as ww,d.depname,f.*,p.program_risk,b.name_sub_program,' +
        'e.risk_detail as vv,s.note_other as dd,s.risk_correct,s.risk_detail,t.sone,t.hn,t.an,t.name_kin,t.name_officer,' +
        't.name_other,t.name_patient,t.note_kin,t.note_officer,t.note_other,t.note_patient,r.name as report,u.name_report,u.position,' +
        'u.depcode as cc,u.type_report as mm,d2.depname as ii,l.date_repeat,l.name_repeat,l.result_repeat,l.depcode_connected,l.edit_system,' +
        'l.date_finished,l.note as zx FROM  risk_request_first f   '+
        'INNER JOIN risk_request_second s ON s.risk_request_id=f.id '+
        'INNER JOIN risk_request_third t ON t.risk_request_id=f.id '+
        'INNER JOIN risk_request_fourth u ON u.risk_request_id=f.id '+
        'INNER JOIN risk_request_fifth l ON l.risk_request_id=f.id '+
        'LEFT JOIN risk_type a ON a.id=f.type_risk   '+
        'LEFT JOIN type_complaint c ON c.id=f.complaint_type '+
        'LEFT JOIN department d ON d.id=f.depcode '+
        'LEFT JOIN department d2 ON d2.id=u.depcode '+
        'LEFT JOIN risk_program p ON p.id=s.risk_program '+
        'LEFT JOIN risk_sub_program b ON b.id=s.risk_group '+
        'LEFT JOIN risk_detail e ON e.id=s.risk_sub_group '+
        'LEFT JOIN type_report r ON r.id=u.type_report '+
        'LEFT JOIN  clinic_level v ON v.id=s.risk_level '+
        'WHERE f.id = ? ';
        db.raw(sql, [parseInt(id)])
            .then(function(rows){
                //console.log(rows);
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getSubShowPast5: function(db,id){
        var q = Q.defer();
        var sql =   'SELECT f.*,i.topic_risk FROM risk_request_fifth f  '+
        'INNER JOIN risk_request_first i ON f.risk_request_id=i.id '+
        'WHERE f.risk_request_id = ? ';
        console.log('id: ' + id);
        db.raw(sql, [id])
            .then(function(rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    Update_part1: function(db,id){
        var q = Q.defer();
        db('risk_request_first')
            .update({confirm:1})
            .where('id',id)
            .then(function(){
                q.resolve();
            })
            .catch(function (err){
                q.reject(err);
            });
        return q.promise;
    },

    Update_part5: function(db,data){
        var q = Q.defer();
        db('risk_request_fifth')
            .update({
                risk_request_id:data.id,
                date_repeat:data.date_repeat,
                name_repeat:data.name_repeat,
                result_repeat:data.result_repeat,
                depcode_connected:data.depcode_connected,
                edit_system:data.edit_system,
                date_finished:data.date_finished,
                note:data.note})
                .where('risk_request_id',data.id)
            .then(function(rows){
                q.resolve(rows);
            })
            .catch(function (err){
                q.reject(err);
            });
        return q.promise;
    },
    Chack_sesion: function(db,id,user){
        var q = Q.defer();
        db('risk_request_first')
            .where({
                id:id,
                username:user
            })
            .count('* as total')
            .then(function(rows){
            q.resolve(rows[0].total);
        })
            .catch(function (err){
                q.reject(err);
            });
        return q.promise;
    },
    Chack_sesion_depcode: function(db,id,depcode){
        var q = Q.defer();
        db('risk_request_fourth')
            .where({
                id:id,
                depcode:depcode
            })
            .count('* as total')
            .then(function(rows){
            q.resolve(rows[0].total);
        })
            .catch(function (err){
                q.reject(err);
            });
        return q.promise;
    }
};


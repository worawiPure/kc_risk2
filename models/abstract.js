var Q = require('q');

module.exports = {
    getSubAllDetail: function (db,startpage) {
        var q = Q.defer();
        var sql = 'SELECT f.date_risk,f.id,f.topic_risk,d.depname as department_report,d2.depname as department_risk,r.detail,f.confirm,f.abstract FROM risk_request_first f '+
        'INNER JOIN risk_request_fourth u ON u.risk_request_id=f.id                     '+
        'LEFT JOIN risk_abstract r ON r.request_id = f.id                                 '+
        'LEFT JOIN department d ON u.depcode=d.depcode                             '+
        'LEFT JOIN department d2 ON f.depcode=d2.depcode        '+
        'ORDER BY f.date_risk ASC  limit 15 offset ?';
        db.raw(sql,[startpage])
            .then(function (rows) {
                q.resolve(rows[0])
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getSubAllDetail_total: function (db) {
        var q = Q.defer();
        var sql = 'SELECT count(*) as total FROM risk_request_first ';
        db.raw(sql)
            .then(function (rows) {
                q.resolve(rows[0][0].total)
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getDetail: function (db,id) {
        var q = Q.defer();

        db('risk_abstract')
            .where('request_id',id)
            .then(function (rows) {
                q.resolve(rows)
            })
            .catch(function (err) {
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getSubShowDetail: function(db,id){
        var q = Q.defer();
        var sql =   'SELECT s.sentinel,v.risk_level as pp,s.risk_level,s.risk_program,s.risk_group,' +
            's.risk_sub_group,r.name as zz,a.name as qq,c.name as ww,d.depname,f.*,p.program_risk,' +
            'b.name_sub_program,e.risk_detail as vv,s.note_other as dd,s.risk_correct,s.risk_detail,' +
            //'t.hn,t.an,t.name_kin,t.name_officer,t.name_other,t.name_patient,t.note_kin,t.note_officer,t.note_other,t.note_patient,
            'r.name as report,u.name_report,u.position,u.depcode as cc,u.type_report as mm, ' +
            'd2.depname as ii,l.date_repeat,l.name_repeat,l.result_repeat,l.depcode_connected,l.edit_system,l.date_finished,' +
            'l.note as zx FROM  risk_request_first f   '+
            'INNER JOIN risk_request_second s ON s.risk_request_id=f.id '+
            //'INNER JOIN risk_request_third t ON t.risk_request_id=f.id '+
            'INNER JOIN risk_request_fourth u ON u.risk_request_id=f.id '+
            'INNER JOIN risk_request_fifth l ON l.risk_request_id=f.id '+
            'LEFT JOIN risk_type a ON a.id=f.type_risk   '+
            'LEFT JOIN type_complaint c ON c.id=f.complaint_type '+
            'LEFT JOIN department d ON d.depcode=f.depcode '+
            'LEFT JOIN department d2 ON d2.depcode=u.depcode '+
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

    save_abstract: function(db,detail,id){
        var q = Q.defer();
        db('risk_abstract')
            .insert({detail:detail,
                    request_id:id})
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    Update_part1: function(db,id){
        var q = Q.defer();
        db('risk_request_first')
            .update({abstract:1})
            .where('id',id)
            .then(function(){
                q.resolve();
            })
            .catch(function (err){
                q.reject(err);
            });
        return q.promise;
    },

    update_abstract: function(db,detail,id){
        var q = Q.defer();
        db('risk_abstract')
            .update({
                detail:detail})
            .where('request_id',id)
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    getListDepartment: function(db){
        var q = Q.defer();
        db('department')
            .select('id','depname','depcode')
            .orderBy('depcode','ASC')
            .then(function (rows){
                q.resolve(rows);
            })
            .catch(function(err){
                q.reject(err);
            }) ;
        return q.promise;
    },

    search_date: function(db,data){
        var q = Q.defer();
        var sql =   'SELECT f.date_risk,f.id,f.topic_risk,d.depname as department_report,d2.depname as department_risk,r.detail,f.confirm,f.abstract FROM risk_request_first f '+
        'INNER JOIN risk_request_fourth u ON u.risk_request_id=f.id                     '+
        'LEFT JOIN risk_abstract r ON r.request_id = f.id                                 '+
        'LEFT JOIN department d ON u.depcode=d.depcode                             '+
        'LEFT JOIN department d2 ON f.depcode=d2.depcode        '+
            ' WHERE f.date_risk between ? and ?    '+
            ' ORDER BY f.date_risk ASC';
        db.raw(sql,[data.date1,data.date2])
            //var sql = db.raw(sql,[data.date,data.username]).toSQL() คำสั่งเช็ค ค่า และคำสั่ง SQL
            .then(function(rows){
                console.log(rows[0]);
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err);
                q.reject(err)
            });
        return q.promise;
    },

    search_department: function(db,data){
        var q = Q.defer();
        var sql =   'SELECT f.date_risk,f.id,f.topic_risk,d.depname as department_report,d2.depname as department_risk,r.detail,f.confirm,f.abstract FROM risk_request_first f '+
        'INNER JOIN risk_request_fourth u ON u.risk_request_id=f.id                     '+
        'LEFT JOIN risk_abstract r ON r.request_id = f.id                                 '+
        'LEFT JOIN department d ON u.depcode=d.depcode                             '+
        'LEFT JOIN department d2 ON f.depcode=d2.depcode        '+
       ' WHERE f.depcode = ?    '+
       ' ORDER BY f.date_risk DESC';
        db.raw(sql,[data.department])
            //var sql = db.raw(sql,[data.date,data.username]).toSQL() คำสั่งเช็ค ค่า และคำสั่ง SQL
            .then(function(rows){
                console.log(rows[0]);
                q.resolve(rows[0])
            })

            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    search_topic: function(db,data){
        var q = Q.defer();
        var sql =   'SELECT f.date_risk,f.id,f.topic_risk,d.depname as department_report,d2.depname as department_risk,r.detail,f.confirm,f.abstract FROM risk_request_first f '+
            'INNER JOIN risk_request_fourth u ON u.risk_request_id=f.id                     '+
            'LEFT JOIN risk_abstract r ON r.request_id = f.id                                 '+
            'LEFT JOIN department d ON u.depcode=d.depcode                             '+
            'LEFT JOIN department d2 ON f.depcode=d2.depcode        '+
            ' WHERE f.topic_risk Like ? '+
            ' ORDER BY f.date_risk DESC';
        var query = '%'+data.topic+'%';
        db.raw(sql,[query])
            //var sql = db.raw(sql,[data.date,data.username]).toSQL() คำสั่งเช็ค ค่า และคำสั่ง SQL
            .then(function(rows){
                console.log(rows[0]);
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    remove_first: function(db,id){
        var q = Q.defer();
        db('risk_request_first')
            .delete()
            .where('id',id)
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    remove_second: function(db,id){
        var q = Q.defer();
        db('risk_request_second')
            .delete()
            .where('id',id)
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    remove_third: function(db,id){
        var q = Q.defer();
        db('risk_request_third')
            .delete()
            .where('risk_request_id',id)
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    remove_fourth: function(db,id){
        var q = Q.defer();
        db('risk_request_fourth')
            .delete()
            .where('risk_request_id',id)
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    remove_fifth: function(db,id){
        var q = Q.defer();
        db('risk_request_fifth')
            .delete()
            .where('risk_request_id',id)
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    save_news: function(db,date_news,topic_news,detail_news){
        var q = Q.defer();
        db('news')
            .insert({date_news:date_news,topic_news:topic_news,detail_news:detail_news})
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    update_news: function(db,id,date_news,topic_news,detail_news){
        var q = Q.defer();
        db('news')
            .update({date_news:date_news,topic_news:topic_news,detail_news:detail_news})
            .where('id',id)
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    search_month_chart_senior: function(db,data){
        var q = Q.defer();
        var sql =   'select concat(m.month," ",YEAR(f.date_risk)) as aa,count(f.id) as cc from risk_request_first f '+
        'LEFT JOIN risk_month m ON m.id=month(f.date_risk)                           '+
        'WHERE f.date_risk between  ?  and  ?                '+
        'AND (f.depcode = ?                                        '+
        'OR f.depcode = ?   )                                 '+
        'group by aa                '+
        'order by m.id ';
        db.raw(sql,[data.date_chart1,data.date_chart2,data.sub_depcode,data.depcode])
            //var sql = db.raw(sql,[data.date,data.username]).toSQL() คำสั่งเช็ค ค่า และคำสั่ง SQL
            .then(function(rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err);
                q.reject(err)
            });
        return q.promise;
    },

    search_month_chart: function(db,data){
        var q = Q.defer();
        var sql =   'select concat(m.month," ",YEAR(f.date_risk)) as aa,count(f.id) as cc from risk_request_first f '+
        'LEFT JOIN risk_month m ON m.id=month(f.date_risk)               '+
        'where  f.date_risk between  ?  and  ?                           '+
        'group by aa   '+
        'order by m.id ';
        db.raw(sql,[data.date_chart1,data.date_chart2])
            //var sql = db.raw(sql,[data.date,data.username]).toSQL() คำสั่งเช็ค ค่า และคำสั่ง SQL
            .then(function(rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err);
                q.reject(err)
            });
        return q.promise;
    },

    search_department_chart: function(db,data){
        var q = Q.defer();
        var sql =   'select d.depname as aa,count(f.id) as cc from risk_request_first f '+
        'LEFT JOIN department d ON d.depcode=f.depcode                   '+
        'where  f.date_risk between  ?  and  ?   '+
        'group by aa                    '+
        'order by d.depcode ';
        db.raw(sql,[data.date_chart1,data.date_chart2])
            //var sql = db.raw(sql,[data.date,data.username]).toSQL() คำสั่งเช็ค ค่า และคำสั่ง SQL
            .then(function(rows){
                console.log(rows[0]);
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err);
                q.reject(err)
            });
        return q.promise;
    },

    search_level_clinic_chart: function(db,data){
        var q = Q.defer();
        var sql =   'select  SUBSTR(l.risk_level,1,2) as aa,count(f.id) as cc from risk_request_first f '+
        'INNER JOIN risk_request_second s ON s.risk_request_id=f.id    '+
        'LEFT JOIN clinic_level l ON l.id=s.risk_level              '+
        'WHERE f.date_risk between  ?  and  ?                   '+
        'AND f.type_risk = 1                            '+
        'group by aa                    '+
        'order by aa ';
        db.raw(sql,[data.date_chart1,data.date_chart2])
            //var sql = db.raw(sql,[data.date,data.username]).toSQL() คำสั่งเช็ค ค่า และคำสั่ง SQL
            .then(function(rows){
                console.log(rows[0]);
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err);
                q.reject(err)
            });
        return q.promise;
    },

    search_level_nonclinic_chart: function(db,data){
        var q = Q.defer();
        var sql =   'select  SUBSTR(l.risk_level,11) as aa,count(f.id) as cc from risk_request_first f '+
            'INNER JOIN risk_request_second s ON s.risk_request_id=f.id    '+
            'LEFT JOIN clinic_level l ON l.id=s.risk_level              '+
            'WHERE f.date_risk between  ?  and  ?                   '+
            'AND f.type_risk = 2                            '+
            'group by aa                    '+
            'order by aa ';
        db.raw(sql,[data.date_chart1,data.date_chart2])
            //var sql = db.raw(sql,[data.date,data.username]).toSQL() คำสั่งเช็ค ค่า และคำสั่ง SQL
            .then(function(rows){
                console.log(rows[0]);
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err);
                q.reject(err)
            });
        return q.promise;
    },

    search_program_chart: function(db,data){
        var q = Q.defer();
        var sql =   'SELECT p.program_risk,                        '+
        '(select count(*) FROM risk_request_first f  '+
        'INNER JOIN risk_request_second s ON f.id=s.risk_request_id  '+
        'WHERE f.date_risk BETWEEN ? and ?   '+
        'and month(f.date_risk) = 1 and s.risk_program = p.id ) as M1, '+
        '(select count(*) FROM risk_request_first f  '+
        'INNER JOIN risk_request_second s ON f.id=s.risk_request_id  '+
        'WHERE f.date_risk BETWEEN ? and ?   '+
        'and month(f.date_risk) = 2 and s.risk_program = p.id) as M2, '+
        '(select count(*) FROM risk_request_first f   '+
        'INNER JOIN risk_request_second s ON f.id=s.risk_request_id '+
        'WHERE f.date_risk BETWEEN ? and ? '+
        'and month(f.date_risk) = 3 and s.risk_program = p.id) as M3, '+
        '(select count(*) FROM risk_request_first f  '+
        'INNER JOIN risk_request_second s ON f.id=s.risk_request_id '+
        'WHERE f.date_risk BETWEEN ? and ?  '+
        'and month(f.date_risk) = 4 and s.risk_program = p.id) as M4, '+
        '(select count(*) FROM risk_request_first f  '+
        'INNER JOIN risk_request_second s ON f.id=s.risk_request_id '+
        'WHERE f.date_risk BETWEEN ? and ?   '+
        'and month(f.date_risk) = 5 and s.risk_program = p.id) as M5, '+
        '(select count(*) FROM risk_request_first f  '+
        'INNER JOIN risk_request_second s ON f.id=s.risk_request_id '+
        'WHERE f.date_risk BETWEEN ? and ? '+
        'and month(f.date_risk) = 6 and s.risk_program = p.id) as M6, '+
        '(select count(*) FROM risk_request_first f  '+
        'INNER JOIN risk_request_second s ON f.id=s.risk_request_id  '+
        'WHERE f.date_risk BETWEEN ? and ? '+
        'and month(f.date_risk) = 7 and s.risk_program = p.id) as M7, '+
        '(select count(*) FROM risk_request_first f  '+
        'INNER JOIN risk_request_second s ON f.id=s.risk_request_id '+
        'WHERE f.date_risk BETWEEN ? and ?   '+
        'and month(f.date_risk) = 8 and s.risk_program = p.id) as M8, '+
        '(select count(*) FROM risk_request_first f   '+
        'INNER JOIN risk_request_second s ON f.id=s.risk_request_id '+
        'WHERE f.date_risk BETWEEN ? and ? '+
        'and month(f.date_risk) = 9 and s.risk_program = p.id) as M9, '+
        '(select count(*) FROM risk_request_first f  '+
        'INNER JOIN risk_request_second s ON f.id=s.risk_request_id '+
        'WHERE f.date_risk BETWEEN ? and ?   '+
        'and month(f.date_risk) = 10 and s.risk_program = p.id) as M10, '+
        '(select count(*) FROM risk_request_first f   '+
        'INNER JOIN risk_request_second s ON f.id=s.risk_request_id '+
        'WHERE f.date_risk BETWEEN ? and ? '+
        'and month(f.date_risk) = 11 and s.risk_program = p.id) as M11, '+
        '(select count(*) FROM risk_request_first f '+
        'INNER JOIN risk_request_second s ON f.id=s.risk_request_id '+
        'WHERE f.date_risk BETWEEN ? and ? '+
        'and month(f.date_risk) = 12 and s.risk_program = p.id) as M12 '+
        'from risk_program  p '+
        'ORDER BY p.id ASC               ';
        db.raw(sql,[data.date1,data.date2,data.date1,data.date2,data.date1,data.date2,data.date1,data.date2,
            data.date1,data.date2,data.date1,data.date2,data.date1,data.date2,data.date1,data.date2,
            data.date1,data.date2,data.date1,data.date2,data.date1,data.date2,data.date1,data.date2])
            //var sql = db.raw(sql,[data.date,data.username]).toSQL() คำสั่งเช็ค ค่า และคำสั่ง SQL
            .then(function(rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err);
                q.reject(err)
            });
        return q.promise;
    },

    getSubAllDetail_admin_level_month: function(db,_month,_year,startpage){
        var q = Q.defer();
        var sql =   'SELECT f.date_risk,f.id,f.topic_risk,d.depname as department_report,' +
            'd2.depname as department_risk,r.detail,f.confirm,f.abstract FROM risk_request_first f '+
            'INNER JOIN risk_request_second s ON s.risk_request_id=f.id '+
            'INNER JOIN risk_request_fourth u ON u.risk_request_id=f.id                     '+
            'LEFT JOIN risk_abstract r ON r.request_id = f.id                                 '+
            'LEFT JOIN department d ON u.depcode=d.depcode                             '+
            'LEFT JOIN department d2 ON f.depcode=d2.depcode        '+
            'WHERE (MONTH(f.date_risk) = ?  '+
            'AND YEAR(f.date_risk) = ? ) '+
            'AND s.risk_level IN ("5","6","7","8","9","12","13") '+
            'ORDER BY f.date_risk ASC  limit 15 offset ? ';
        db.raw(sql,[_month,_year,startpage])
            .then(function(rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    risk_report_level_month: function(db,_month,_year){
        var q = Q.defer();
        var sql =   'SELECT count(*) as total FROM  risk_request_first f '+
        'INNER JOIN risk_request_second s ON s.risk_request_id=f.id '+
        'WHERE ( MONTH(f.date_risk) = ?  '+
        'AND YEAR(f.date_risk) = ? )  '+
        'AND s.risk_level IN ("5","6","7","8","9","12","13") ';
        db.raw(sql,[_month,_year])
            .then(function(rows){
                q.resolve(rows[0][0].total)
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    search_program_select_chart: function(db,data){
        var q = Q.defer();
        var sql =   'select concat(m.month," ",YEAR(f.date_risk)) as aa,count(f.id) as cc from risk_request_first f '+
        'INNER JOIN risk_request_second s ON s.risk_request_id=f.id '+
        'LEFT JOIN risk_month m ON m.id=month(f.date_risk)      '+
        'WHERE   f.date_risk between  ?  and  ? '+
        'AND s.risk_program = ?  '+
        'group by aa    '+
        'order by m.id';
        db.raw(sql,[data.date_chart1,data.date_chart2,data.sl_program])
            //var sql = db.raw(sql,[data.date,data.username]).toSQL() คำสั่งเช็ค ค่า และคำสั่ง SQL
            .then(function(rows){
                console.log(rows[0]);
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err);
                q.reject(err)
            });
        return q.promise;
    }

};
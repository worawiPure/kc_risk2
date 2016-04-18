var Q = require('q');

module.exports = {
    getSubAllDetail: function (db,startpage) {
        var q = Q.defer();
        var sql = 'SELECT f.date_risk,f.id,f.topic_risk,d.depname,r.detail,f.confirm,f.abstract FROM risk_request_first f '+
        'LEFT JOIN risk_abstract r ON r.request_id = f.id                                 '+
        'LEFT JOIN department d ON f.depcode=d.depcode                             '+
        'ORDER BY f.id DESC  limit 15 offset ?';
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
        var sql =   'SELECT s.sentinel,v.risk_level as pp,s.risk_level,s.risk_program,s.risk_group,s.risk_sub_group,r.name as zz,a.name as qq,c.name as ww,d.depname,f.*,p.program_risk,b.name_sub_program,e.risk_detail as vv,s.note_other as dd,s.risk_correct,s.risk_detail,t.hn,t.an,t.name_kin,t.name_officer,t.name_other,t.name_patient,t.note_kin,t.note_officer,t.note_other,t.note_patient,r.name as report,u.name_report,u.position,u.depcode as cc,u.type_report as mm,d2.depname as ii,l.date_repeat,l.name_repeat,l.result_repeat,l.depcode_connected,l.edit_system,l.date_finished,l.note as zx FROM  risk_request_first f   '+
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
        var sql =   'SELECT f.date_risk,f.id,f.topic_risk,d.depname,r.detail FROM risk_request_first f '+
            ' LEFT OUTER JOIN risk_abstract r ON r.id = f.id   '+
            ' LEFT OUTER JOIN department d ON f.depcode=d.depcode  '+
            ' WHERE f.date_risk = ?    '+
            ' ORDER BY f.id DESC';
        db.raw(sql,[data.date])
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
        var sql =   'SELECT f.date_risk,f.id,f.topic_risk,d.depname,r.detail FROM risk_request_first f '+
       ' LEFT OUTER JOIN risk_abstract r ON r.id = f.id   '+
       ' LEFT OUTER JOIN department d ON f.depcode=d.depcode  '+
       ' WHERE f.depcode = ?    '+
       ' ORDER BY f.id DESC';
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
        var sql =   'SELECT f.date_risk,f.id,f.topic_risk,d.depname,r.detail FROM risk_request_first f '+
            ' LEFT OUTER JOIN risk_abstract r ON r.id = f.id   '+
            ' LEFT OUTER JOIN department d ON f.depcode=d.depcode '+
            ' WHERE f.topic_risk Like ? ';
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
    }




}
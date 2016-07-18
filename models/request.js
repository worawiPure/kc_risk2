var Q = require('q');
var moment = require('moment');

module.exports = {

    Save_part1: function (db,data) {
        var q = Q.defer();
        db('risk_request_first')
            .returning('id')
            .insert({
                type_risk: data.risktype,
                complaint_type: data.complaint,
                topic_risk: data.topic,
                date_risk: data.date_risk,
                time_risk: data.time_risk,
                date_report_risk: moment().format('YYYY-MM-DD'),
                time_report_risk: moment().format('HH:mm:ss'),
                depcode: data.department,
                area_risk: data.area_risk,
                username: data.username
            })
            .then(function (rows) {
                q.resolve(rows);
            })
            .catch(function (err) {
                q.reject(err);
            });
        return q.promise;
    },

    Save_part2: function (db,data){
        var q = Q.defer();
        db('risk_request_second')
        .insert({
                risk_request_id:data.id,
                risk_program:data.program,
                risk_group:data.subprogram,
                risk_sub_group:data.subgroup,
                note_other:data.note_other,
                risk_detail:data.risk_detail,
                sentinel:data.sentinel,
                risk_level:data.risk_level,
                risk_correct:data.risk_correct
        })
            .then(function (rows) {
                q.resolve(rows);
            })
            .catch(function (err){
                q.reject(err);
            });
        return q.promise;
    },

    Save_part3: function(db,data){
        var q = Q.defer();
        db('risk_request_third')
        .insert({
                risk_request_id:data.id,
                sone:data.sone,
                hn:data.hn,
                an:data.an,
                name_patient:data.name_patient,
                name_kin:data.name_kin,
                name_officer:data.name_officer,
                name_other:data.name_other,
                note_patient:data.note_patient,
                note_kin:data.note_kin,
                note_officer:data.note_officer,
                note_other:data.note_other2
            })
            .then(function(rows){
                q.resolve(rows);
            })
            .catch(function (err){
                q.reject(err);
            });
        return q.promise;
    },

    Save_part4: function(db,data){
        var q = Q.defer();
        db('risk_request_fourth')
            .insert({
                risk_request_id:data.id,
               type_report:data.type_report,
                name_report:data.name_report,
                position:data.position,
                depcode:data.department2
            })
            .then(function(rows){
                q.resolve(rows);
            })
            .catch(function (err){
                q.reject(err);
            });
        return q.promise;
    },

    Save_part5: function(db,data){
        var q = Q.defer();
        db('risk_request_fifth')
            .insert({
                risk_request_id:data.id,
                date_repeat:data.date_repeat,
                name_repeat:data.name_repeat,
                result_repeat:data.result_repeat,
                depcode_connected:data.depcode_connected,
                edit_system:data.edit_system,
                date_finished:data.date_finished,
                note:data.note
            })
            .then(function(rows){
                q.resolve(rows);
            })
            .catch(function (err){
                q.reject(err);
            });
        return q.promise;
    },

    update_part1: function (db,data) {
        var q = Q.defer();
        db('risk_request_first')
            .update({
                type_risk: data.risktype,
                complaint_type: data.complaint,
                topic_risk: data.topic,
                date_risk: data.date_risk,
                time_risk: data.time_risk,
                depcode: data.department,
                area_risk: data.area_risk,
                //username: data.username,
                date_update: moment().format('YYYY-MM-DD HH:mm:ss')
            })
            .where('id',data.id)
            .then(function (rows) {
                q.resolve(rows);
            })
            .catch(function (err) {
                q.reject(err);
            });
        return q.promise;
    },

    update_part2: function (db,data){
        var q = Q.defer();
        db('risk_request_second')
            .update({
                risk_program:data.program,
                risk_group:data.subprogram,
                risk_sub_group:data.subgroup,
                note_other:data.note_other,
                risk_detail:data.risk_detail,
                sentinel:data.sentinel,
                risk_level:data.risk_level,
                risk_correct:data.risk_correct
            })
            .where('risk_request_id',data.id)
            .then(function (rows) {
                q.resolve(rows);
            })
            .catch(function (err){
                q.reject(err);
            });
        return q.promise;
    },

    update_part3: function(db,data){
        var q = Q.defer();
        db('risk_request_third')
            .update({
                sone:data.sone,
                hn:data.hn,
                an:data.an,
                name_patient:data.name_patient,
                name_kin:data.name_kin,
                name_officer:data.name_officer,
                name_other:data.name_other,
                note_patient:data.note_patient,
                note_kin:data.note_kin,
                note_officer:data.note_officer,
                note_other:data.note_other2
            })
            .where('risk_request_id',data.id)
            .then(function(rows){
                q.resolve(rows);
            })
            .catch(function (err){
                q.reject(err);
            });
        return q.promise;
    },

    update_part4: function(db,data){
        var q = Q.defer();
        db('risk_request_fourth')
            .update({
                type_report:data.type_report,
                name_report:data.name_report,
                position:data.position,
                depcode:data.department2
            })
            .where('risk_request_id',data.id)
            .then(function(rows){
                q.resolve(rows);
            })
            .catch(function (err){
                q.reject(err);
            });
        return q.promise;
    },

    update_part5: function(db,data){
        var q = Q.defer();
        db('risk_request_fifth')
            .update({
                date_repeat:data.date_repeat,
                name_repeat:data.name_repeat,
                result_repeat:data.result_repeat,
                depcode_connected:data.depcode_connected,
                edit_system:data.edit_system,
                date_finished:data.date_finished,
                note:data.note
            })
            .where('risk_request_id',data.id)
            .then(function(rows){
                q.resolve(rows);
            })
            .catch(function (err){
                q.reject(err);
            });
        return q.promise;
    },
    search_date: function(db,data){
        var q = Q.defer();
        var sql =   'SELECT f.id,f.date_risk,f.topic_risk,t.`name` as aa FROM  risk_request_first f  '+
        'LEFT JOIN risk_type t ON f.type_risk=t.id '+
        'WHERE f.date_risk between ? and ?  '+
        'and f.username = ? ';
         db.raw(sql,[data.date1,data.date2,data.username])
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

    user_senior_search_date: function(db,data){
        var q = Q.defer();
        var sql =   'SELECT f.id,f.date_risk,f.topic_risk,t.name as aa FROM  risk_request_first f  '+
        'INNER JOIN risk_request_fourth u ON u.risk_request_id=f.id '+
        'LEFT JOIN risk_type t ON f.type_risk=t.id '+
        'WHERE f.date_risk between ? and ? '+
        'and u.depcode = ? ';

         db.raw(sql,[data.date1,data.date2,data.depcode])
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

    user_senior_search_date_feedback: function(db,data){
        var q = Q.defer();
        db('risk_request_first as f')
            .select( 'f.id','f.date_risk','f.topic_risk','t.name as aa','d.depname as mm')
            .innerJoin('risk_request_fourth as u', 'u.risk_request_id', 'f.id')
            .leftJoin('risk_type as t','t.id','f.type_risk')
            .leftJoin('department as d', 'd.depcode', 'u.depcode')
            .whereBetween('f.date_risk',[data.date1,data.date2])
            .whereIn('f.depcode',[data.depcode,data.sub_depcode])
            .whereNotIn('u.depcode',[data.depcode,data.sub_depcode])
            .then(function(rows){
                console.log(rows);
                q.resolve(rows)
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    search_topic: function(db,data){
        var q = Q.defer();
        var sql =   'SELECT f.id,f.date_risk,f.topic_risk,t.`name` as aa FROM  risk_request_first f  '+
            'LEFT JOIN risk_type t ON f.type_risk=t.id '+
            'WHERE f.topic_risk Like ? '+
            'and f.username = ? ';
        var query = '%'+data.topic+'%';
        db.raw(sql,[query,data.username])
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

    user_senior_search_topic: function(db,data){
        var q = Q.defer();
        var sql =   'SELECT f.id,f.date_risk,f.topic_risk,t.`name` as aa FROM  risk_request_first f  '+
            'INNER JOIN risk_request_fourth u ON u.risk_request_id=f.id '+
            'LEFT JOIN risk_type t ON f.type_risk=t.id '+
            'WHERE f.topic_risk Like ? '+
            'and u.depcode = ? ';
        var query = '%'+data.topic+'%';
        db.raw(sql,[query,data.depcode])
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

    user_senior_search_topic_feedback: function(db,data){
        var q = Q.defer();
        var query = '%'+data.topic+'%';
        db('risk_request_first as f')
            .select( 'f.id','f.date_risk','f.topic_risk','t.name as aa','d.depname as mm')
            .innerJoin('risk_request_fourth as u', 'u.risk_request_id', 'f.id')
            .leftJoin('risk_type as t','t.id','f.type_risk')
            .leftJoin('department as d', 'd.depcode', 'u.depcode')
            .where('f.topic_risk','like', query)
            .whereIn('f.depcode',[data.depcode,data.sub_depcode])
            .whereNotIn('u.depcode',[data.depcode,data.sub_depcode])
        //db.raw(sql,[query,data.depcode])
            //var sql = db.raw(sql,[data.date,data.username]).toSQL() คำสั่งเช็ค ค่า และคำสั่ง SQL
            .then(function(rows){
                console.log(rows);
                q.resolve(rows)
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    }

}
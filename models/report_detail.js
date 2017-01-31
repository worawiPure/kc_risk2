var Q = require('q');

module.exports = {
    getReport_detail: function(db,id){
        var q = Q.defer();
        var sql =   'SELECT f.id,a.name as risk_type,b.name as complaint_type,f.topic_risk,f.date_risk,f.time_risk,e.depname,f.area_risk,   '+
        'g.program_risk,p.name_sub_program,d.risk_detail,c.sentinel,c.note_other,c.risk_detail as detail,l.risk_level,c.risk_correct,                  '+
        'h.name as type_report,o.name_report,o.position,e2.depname as oe,                                                                   '+
        'i.date_repeat,i.date_finished,i.name_repeat,i.result_repeat,i.depcode_connected,i.edit_system,i.note FROM  risk_request_first f    '+
        'INNER JOIN risk_request_second c ON f.id = c.risk_request_id                                                                       '+
        'INNER JOIN risk_request_fourth o ON o.risk_request_id = f.id       '+
        'INNER JOIN risk_request_fifth i ON i.risk_request_id = f.id        '+
        'LEFT JOIN risk_type a ON a.id=f.type_risk                          '+
        'LEFT JOIN type_complaint b ON b.id=f.complaint_type                '+
        'LEFT JOIN risk_program g ON g.id=c.risk_program                    '+
        'LEFT JOIN risk_sub_program p ON p.id = c.risk_group            '+
        'LEFT JOIN risk_detail d ON d.id = c.risk_sub_group                 '+
        'LEFT JOIN clinic_level l ON l.id = c.risk_level                    '+
        'LEFT JOIN department e ON e.depcode = f.depcode                    '+
        'LEFT JOIN department e2 ON e2.depcode = o.depcode                  '+
        'LEFT JOIN type_report h ON h.id=o.type_report                      '+
        'WHERE f.id = ? ';

        db.raw(sql,[id])
            .then(function(rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getReport_abstract: function(db,id){
        var q = Q.defer();
        var sql =   'SELECT a.*,f.*,d.depname FROM risk_abstract a '+
        'INNER JOIN risk_request_first f ON f.id=a.request_id    '+
        'INNER JOIN risk_request_fourth u ON u.risk_request_id=f.id                     '+
        'LEFT JOIN department d ON d.depcode=u.depcode   '+
        'WHERE request_id = ?';

        db.raw(sql,[id])
            .then(function(rows){
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    }
};


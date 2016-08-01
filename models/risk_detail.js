var Q = require('q');

module.exports = {

    getListDetail: function(db){
        var q = Q.defer();
        db('risk_sub_program')
            .select()
            .orderBy('program_id')
            .then(function(rows){
                q.resolve(rows);
            })
            .catch(function(err){
                q.reject(err);
            }) ;
        return q.promise;
    },

    getSubList: function(db,id){
        var q = Q.defer();
        db('risk_sub_program')
            .select()
            .where('program_id',id)
            .then(function(rows){
                q.resolve(rows);
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    getSubDetail: function(db,id){
        var q = Q.defer();
        db('risk_detail')
            .select()
            .where('risk_program',id)
            .then(function(rows){
                q.resolve(rows);
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    getSubDetail2: function(db,id){
        var q = Q.defer();
        db('risk_detail')
            .select()
            .where('risk_group',id)
            .then(function(rows){
                q.resolve(rows);
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    getSubAllDetail: function(db,startpage){
        var q = Q.defer();
        var sql =   'SELECT rd.id,rs.id as subId,rp.id as proId,rd.risk_detail,rs.name_sub_program,rp.program_risk FROM risk_detail as rd   '+
        'INNER JOIN risk_program as rp on rp.id=rd.risk_program '+
        'LEFT OUTER JOIN risk_sub_program as rs ON rd.risk_group=rs.id  '+
        'Limit 20 offset ? ';
        db.raw(sql,[startpage])
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

    getSubAllDetail_total: function(db){
        var q = Q.defer();
        var sql =   'SELECT count(*) as total FROM risk_detail as rd          '+
        'INNER JOIN risk_sub_program as rs ON rd.risk_group=rs.id  '+
        'INNER JOIN risk_program as rp on rp.id=rd.risk_program ';
        db.raw(sql)
            .then(function(rows){
                q.resolve(rows[0][0].total)
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    remove_group: function(db,id){
        var q = Q.defer();
        db('risk_detail')
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

    update_group: function(db,id,name,risk_group,risk_program){
        var q = Q.defer();
        db('risk_detail')
            .update({risk_detail:name,risk_group:risk_group,risk_program:risk_program})
            .where('id',id)
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    save_group: function(db,name,risk_group,risk_program){
        var q = Q.defer();
        db('risk_detail')
            .insert({risk_detail:name,risk_group:risk_group,risk_program:risk_program})
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    search_detail_group: function(db,data){
        var q = Q.defer();
        var sql = 'SELECT rd.id,rs.id as subId,rp.id as proId,rd.risk_detail,rs.name_sub_program,rp.program_risk FROM risk_detail as rd       '+
        'LEFT JOIN  risk_sub_program as rs ON rd.risk_group=rs.id '+
        'LEFT JOIN risk_program as rp on rp.id=rd.risk_program     '+
        'WHERE rd.risk_group = ?  ';
        db.raw(sql,[data.search_detail_group])
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

    search_detail: function(db,data){
        var q = Q.defer();
        var sql = 'SELECT rd.id,rs.id as subId,rp.id as proId,rd.risk_detail,rs.name_sub_program,rp.program_risk FROM risk_detail as rd       '+
            'LEFT JOIN  risk_sub_program as rs ON rd.risk_group=rs.id '+
            'LEFT JOIN risk_program as rp on rp.id=rd.risk_program     '+
            'WHERE rd.risk_detail like ?  ';
        var query = '%'+data.search_detail+'%';
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

    search_risk_show: function(db,data){
        var q = Q.defer();
        var sql = 'SELECT d.risk_detail,s.name_sub_program,p.program_risk FROM risk_detail d '+
        'INNER JOIN risk_sub_program s ON s.id=d.risk_group '+
        'INNER JOIN risk_program p ON p.id=d.risk_program   '+
        'WHERE d.risk_program = ?   '+
        'AND d.risk_group = ? ';
        db.raw(sql,[data.search_program,data.search_sub_program])
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


};
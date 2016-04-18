var Q = require('q');

module.exports = {

    getList: function(db,startpage){
        var q = Q.defer();
        db('risk_program')
            .limit(30)
            .offset(startpage)
            .then(function (rows){
                q.resolve(rows);
            })
            .catch(function(err){
                q.reject(err);
            }) ;
        return q.promise;
    },


    getList_program_group: function(db){
        var q = Q.defer();
        db('risk_program')
            .select()
            .then(function (rows){
                q.resolve(rows);
            })
            .catch(function(err){
                q.reject(err);
            }) ;
        return q.promise;
    },


    //getSubAllDetail_total: function (db) {
    //    var q = Q.defer();
    //    var sql = 'SELECT count(*) as total FROM risk_request_first ';
    //    db.raw(sql)
    //        .then(function (rows) {
    //            q.resolve(rows[0][0].total)
    //        })
    //        .catch(function (err) {
    //            console.log(err)
    //            q.reject(err)
    //        });
    //    return q.promise;
    //},

    getList_total: function(db){
        var q = Q.defer();
        var sql = 'SELECT count(*) as total FROM risk_program ';
        db.raw(sql)
            .then(function (rows){
                q.resolve(rows[0][0].total)
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

    getSubList2: function(db,id){
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

    getSubList3: function(db,id_group){
        var q = Q.defer();
        db('risk_detail')
            .select()
            .where({
                risk_group: id_group
            })
            .then(function(rows){
                q.resolve(rows);
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    getSubAll: function(db,startpage){
        var q = Q.defer();
        var sql =   'SELECT rs.id,rs.name_sub_program,rs.program_id,rp.program_risk ' +
                    'FROM risk_sub_program as rs '+
                    'INNER JOIN risk_program as rp ON rp.id=rs.program_id '+
                    'Limit 10  offset ? ';
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

    getSubAll_total: function(db){
        var q = Q.defer();
        var sql =   'SELECT count(*) as total FROM risk_sub_program as rs '+
                    'INNER JOIN risk_program as rp ON rp.id=rs.program_id';
        db.raw(sql)
            .then(function(rows){
                console.log(rows[0][0].total);
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
        db('risk_sub_program')
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

    remove_program: function(db,id){
        var q = Q.defer();
        db('risk_program')
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

    update_group: function(db,id,name,program_id){
        var q = Q.defer();
        db('risk_sub_program')
            .update({name_sub_program:name,program_id:program_id})
            .where('id',id)
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    update_program: function(db,id,name){
        var q = Q.defer();
        db('risk_program')
            .update({program_risk:name})
            .where('id',id)
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    save_group: function(db,name,program_id){
        var q = Q.defer();
        db('risk_sub_program')
            .insert({name_sub_program:name,program_id:program_id})
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    save_program: function(db,name){
        var q = Q.defer();
        db('risk_program')
            .insert({program_risk:name})
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    search_topic: function(db,data){
        var q = Q.defer();
        var sql =   'SELECT * FROM risk_program '+
            ' WHERE program_risk Like ? ';
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

    search_program: function(db,data){
        var q = Q.defer();
        var sql =  'SELECT rs.id,rs.name_sub_program,rs.program_id,rp.program_risk '+
        'FROM risk_sub_program as rs                                                 '+
        'INNER JOIN risk_program as rp ON rp.id=rs.program_id                    '+
        ' WHERE program_id = ? ';
        db.raw(sql,[data.search_pro])
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

    search_group: function(db,data){
        var q = Q.defer();
        var sql =   'SELECT rs.id,rs.name_sub_program,rs.program_id,rp.program_risk '+
        'FROM risk_sub_program as rs                            '+
        'INNER JOIN risk_program as rp ON rp.id=rs.program_id   '+
        'WHERE name_sub_program LIKE ? ';
        var query = '%'+data.group+'%';
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
};
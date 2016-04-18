var Q = require('q');

module.exports = {

    getRisk_type: function (db) {
        var q = Q.defer();
        db('risk_type')
            .select()
            .then(function (rows) {
                q.resolve(rows);
            })
            .catch(function (err) {
                q.reject(err);
            });
        return q.promise;
    },

    getType_complaint: function (db) {
        var q = Q.defer();
        db('type_complaint')
            .select()
            .then(function (rows) {
                q.resolve(rows);
            })
            .catch(function (err) {
                q.reject(err);
            });
        return q.promise;
    },

    getType_report: function (db) {
        var q = Q.defer();
        db('type_report')
            .select()
            .then(function (rows) {
                q.resolve(rows);
            })
            .catch(function (err) {
                q.reject(err);
            });
        return q.promise;
    },

    //getClinic_level: function (db) {
    //    var q = Q.defer();
    //    db('clinical_risk_level')
    //        .select()
    //        .then(function (rows) {
    //            q.resolve(rows);
    //        })
    //        .catch(function (err) {
    //            q.reject(err);
    //        });
    //    return q.promise;
    //},
    //
    //getNonclinic_level: function (db) {
    //    var q = Q.defer();
    //    db('non_clinical_risk_level')
    //        .select()
    //        .then(function (rows) {
    //            q.resolve(rows);
    //        })
    //        .catch(function (err) {
    //            q.reject(err);
    //        });
    //    return q.promise;
    //},

    getClinicLevel: function (db,id) {
        var q = Q.defer();
        db('clinic_level')
            .select()
            .where('clinic',id)
            .then(function (rows) {
                q.resolve(rows);
            })
            .catch(function (err) {
                q.reject(err);
            });
        return q.promise;
    }

};
$(function() {
    var setTable = function(data){
        var $tblRisk = $('#tblReport_check_abstract > tbody');
        $tblRisk.empty();
        var i=0;
        _.forEach(data.rows, function(v){
            i++;
            var html = '<tr> ' +
                '<td> ' + i + ' </td>'+
                '<td>' + moment(v.risk_datetime).format('DD/MM/YYYY HH:mm')  + ' </td>'+
                '<td>' + v.topic_risk  + ' </td>'+
                '<td>' + v.depart_risk  + ' </td>'+
                '<td>' + v.depart_report  + ' </td>'+
                '<td style="width: 150px;"> '+
                '<div class="btn-group btn-group-sm" role="group"> '+
                '<a class="btn btn-success" type="button" href="/prints/'+ v.id +'" data-toggle="tooltip" data-placement="top" title="ปริ้นเอกสาร"> <i class="fa fa-print"></i></a>';

            html += '</div></td> ';
            $tblRisk.append(html);
        });
        $('[data-toggle="tooltip"]').tooltip();
        };

        $('#btnSearch').on('click', function(e){
            e.preventDefault();
            var data = {};
            var searchrisk1 = $('#Date_Searchrisk1').val();
            var searchrisk2 = $('#Date_Searchrisk2').val();
            data.date1 =  searchrisk1;
            data.date2 = searchrisk2;
            console.log(data.date1,data.date2);
            if(!data.date1 || !data.date2 ) {
                $('#divAlert').fadeIn('slow');
            } else{
                console.log(data);
                $('#divAlert').fadeOut('slow');
                    $.ajax({
                        type: "POST",
                        url: "/report_risk/report_check_abstract",
                        contentType: 'application/json',
                        data: JSON.stringify(data)
                    })
                    .success(function(data) {
                        setTable(data);
                    })
                    .error(function (xhr, status, err) {
                        alert(err);
                    })
            }
        });

        $('#btnPrint').on('click', function(e){
            e.preventDefault();
            var data = {};
            var searchrisk1 = $('#Date_Searchrisk1').val();
            var searchrisk2 = $('#Date_Searchrisk2').val();
            var risk_type = $('#slRisk_type').val();
            data.date1=moment(searchrisk1, 'DD/MM/YYYY').format('YYYY-MM-DD');
            data.date2=moment(searchrisk2, 'DD/MM/YYYY').format('YYYY-MM-DD');
            window.open('/prints/report_check_abstract/' + data.date1 + '/' + data.date2 )
        });
});
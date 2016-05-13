$(function() {
    var setTable = function(data){
        var $tblRisk = $('#tblReport_summary > tbody');
        $tblRisk.empty();
        var i=0;
        _.forEach(data.rows, function(v){
            i++;
            var html = '<tr> ' +
                '<td> ' + i + ' </td>'+
                '<td>' + v.risk_detail  + ' </td>'+
                '<td>' + v.name_sub_program  + ' </td>'+
                '<td>' + v.program_risk  + ' </td>'+
                '<td>' + v.risk_level  + ' </td>'+
                '<td>' + v.depname  + ' </td>'+
                '<td> ' + moment(v.Date_Time).format('DD/MM/YYYY HH:mm') + ' </td>'+
                '<td style="width: 150px;"> '+
                '<div class="btn-group btn-group-sm" role="group"> '+
                '<a class="btn btn-success" type="button" href="/prints/'+ v.id +'" data-toggle="tooltip" data-placement="top" title="ปริ้นเอกสาร"> <i class="fa fa-print"></i></a>';

            html += '</div></td> ';

            $tblRisk.append(html);
        });
        $('[data-toggle="tooltip"]').tooltip();
        }


        $('#btnSearch').on('click', function(e){
            e.preventDefault();
            var data = {};
            var searchrisk1 = $('#Date_Searchrisk1').val();
            var searchrisk2 = $('#Date_Searchrisk2').val();
            var risk_type = $('#slRisk_type').val();

            data.date1 =  searchrisk1;
            data.date2 = searchrisk2;
            data.risk_type = risk_type;

            if(!data.date1 || !data.date2 || !data.risk_type ) {
                $('#divAlert').fadeIn('slow');
            } else{
                console.log(data)
                $('#divAlert').fadeOut('slow');
                    $.ajax({
                        type: "POST",
                        url: "/report_risk/report_summary",
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


})
$(function() {
    var setTable = function(data){
        var $tblRisk = $('#tblReport_summary_date > tbody');
        $tblRisk.empty();
        var i=0;
        _.forEach(data.rows, function(v){
            i++;
            var html = '<tr> ' +
                '<td> ' + i + ' </td>'+
                '<td> ' + v.program_risk + ' </td>'+
                '<td>' + v.M1  + ' </td>'+
                '<td>' + v.M2  + ' </td>'+
                '<td>' + v.M3  + ' </td>'+
                '<td>' + v.M4  + ' </td>'+
                '<td>' + v.M5  + ' </td>'+
                '<td>' + v.M6  + ' </td>'+
                '<td>' + v.M7  + ' </td>'+
                '<td>' + v.M8  + ' </td>'+
                '<td>' + v.M9  + ' </td>'+
                '<td>' + v.M10  + ' </td>'+
                '<td>' + v.M11  + ' </td>'+
                '<td>' + v.M12  + ' </td>';

            html += '</div></td> ';
            $tblRisk.append(html);
        });
        $('[data-toggle="tooltip"]').tooltip();
        }

        $('#btnPrint').fadeOut('slow');
        $('#btnSearch').on('click', function(e){
            e.preventDefault();
            var data = {};
            var searchrisk1 = $('#Date_Searchrisk1').val();
            var searchrisk2 = $('#Date_Searchrisk2').val();
            data.date1 =  searchrisk1;
            data.date2 = searchrisk2;
            if(!data.date1 || !data.date2 ) {
                $('#divAlert').fadeIn('slow');
            } else{
                $('#divAlert').fadeOut('slow');
                $('#btnPrint').fadeIn('slow');
                NProgress.start();
                console.log(data);
                    $.ajax({
                        type: "POST",
                        url: "/report_risk/report_summary_date",
                        contentType: 'application/json',
                        data: JSON.stringify(data)
                    })
                    .success(function(data) {
                        setTable(data);
                            NProgress.done();
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
        data.date1=moment(searchrisk1, 'DD/MM/YYYY').format('YYYY-MM-DD');
        data.date2=moment(searchrisk2, 'DD/MM/YYYY').format('YYYY-MM-DD');
        window.open('/prints/report_summary_date/' + data.date1 + '/' +data.date2)
    });
})
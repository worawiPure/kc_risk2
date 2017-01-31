$(function() {
    var setTable = function(data){
        var $tblRisk = $('#tblReport_terminal > tbody');
        $tblRisk.empty();
        var i=0;
        _.forEach(data.rows, function(v){
            i++;
            var html = '<tr> ' +
                '<td> ' + i + ' </td>'+
                '<td> ' + moment(v.Date_Time).format('DD/MM/YYYY HH:mm') + ' </td>'+
                '<td>' + v.topic_risk  + ' </td>'+
                '<td>' + v.Type  + ' </td>'+
                '<td>' + v.Leve  + ' </td>'+
                '<td>' + v.depname  + ' </td>'+
                '<td>' + v.confirm  + ' </td>';

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
                console.log(data)
                    $.ajax({
                        type: "POST",
                        url: "/report_risk/report_senior_department",
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
        data.date1=moment(searchrisk1, 'DD/MM/YYYY').format('YYYY-MM-DD');
        data.date2=moment(searchrisk2, 'DD/MM/YYYY').format('YYYY-MM-DD');

        window.open('/prints/report_senior_department/' + data.date1 + '/' + data.date2)

        });


})
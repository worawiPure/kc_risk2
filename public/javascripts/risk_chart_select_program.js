$(function() {
    var chartOptions = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'กราฟแสดงการเกิดความเสี่ยงแยกรายเดือนแบบเลือกโปรแกรมความเสี่ยง'
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            title: {
                text: 'จำนวนครั้ง'
            }
        },
        series: [{
            name: 'เดือน',
            data: []
        }]
    };
    $('#show_detail').fadeOut('slow');
   $('#Searchrisk').on('click', function(e) {
           e.preventDefault();
       $('#show_detail').fadeIn('slow');
            chartOptions.xAxis.categories=[];
            chartOptions.series[0].data=[];
            var data = {};
            var date_searchrisk1 = $('#Date_Searchrisk1').val();
            var date_searchrisk2 = $('#Date_Searchrisk2').val();
            var sl_program = $('#slProgram').val();
           data.date1 = date_searchrisk1;
           data.date2 = date_searchrisk2;
           data.sl_program = sl_program;
                 $.ajax({
                        type: "POST",
                        url: "/abstract_risk/search_program_select_chart",
                        contentType:'application/json',
                        dataType:'json',
                        data: JSON.stringify(data)
                        })
                       .success(function(data){
                        console.log(data);
                         _.forEach(data.rows, function (v) {
                             chartOptions.xAxis.categories.push(v.aa);
                             chartOptions.series[0].data.push(v.cc);
                         });
                                $('#container').highcharts(chartOptions);
                     })
   });
});

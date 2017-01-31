$(function() {
    var chartOptions = {
        chart: {
            type: 'line'
        },
        title: {
            text: 'กราฟแสดงการเกิดความเสี่ยงในแผนกแยกรายเดือน'
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
   $('#btnSearchrisk').on('click', function(e) {
            e.preventDefault();
            $('#show_detail').fadeIn('slow');
            chartOptions.xAxis.categories=[];
            chartOptions.series[0].data=[];
           var data = {};
           //var sub_depcode  =   $('#txtSub_depcode').val();
           var date_searchrisk1 = $('#Date_Searchrisk1').val();
           var date_searchrisk2 = $('#Date_Searchrisk2').val();
           data.date1 = date_searchrisk1;
           data.date2 = date_searchrisk2;
                 $.ajax({
                        type: "POST",
                        url: "/abstract_risk/search_month_chart_senior",
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
                         //$('#tblList >  tbody').empty();
                     })
   });
});

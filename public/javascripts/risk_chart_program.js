$(function() {
    function renderChart(data){
        $('#container').highcharts({
            title: {
                text: 'กราฟแสดงการเกิดความเสี่ยงแยกตามโปรแกรมความเสี่ยง',
                x: -20 //center
            },
           // subtitle: {
            //    text: 'Source: WorldClimate.com',
           //     x: -20
          //  },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'จำนวนครั้ง'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: 'ครั้ง'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: data
        });

    }
    $('#show_detail').fadeOut('slow');
   $('#btnSearchrisk').on('click', function(e) {
           e.preventDefault();
       $('#show_detail').fadeIn('slow');
                //chartOptions.xAxis.categories=[];
                //chartOptions.series[0].data=[];
           var data = {};
           var date_searchrisk1 = $('#Date_Searchrisk1').val();
           var date_searchrisk2 = $('#Date_Searchrisk2').val();
           data.date1 = date_searchrisk1;
           data.date2 = date_searchrisk2;
                 $.ajax({
                        type: "POST",
                        url: "/abstract_risk/search_program_chart",
                        contentType:'application/json',
                        dataType:'json',
                        data: JSON.stringify(data)
                        })
                       .success(function(data){
                        console.log(data);
                         var obj = data.rows;
/*
                         var obj = [{
                             "program_risk": "01.ความเสี่ยงทางคลินิก การตรวจรักษาและบริการทางการพยาบาล",
                             "M1": 0,
                             "M2": 0,
                             "M3": 0,
                             "M4": 0,
                             "M5": 0,
                             "M6": 26,
                             "M7": 3,
                             "M8": 0,
                             "M9": 0,
                             "M10": 0,
                             "M11": 0,
                             "M12": 0
                         }, {
                             "program_risk": "02.ด้ านการบริหารยา ความคลาดเคลื่ อนทางยา / ME ",
                             "M1": 0,
                             "M2": 7,
                             "M3": 3,
                             "M4": 0,
                             "M5": 5,
                             "M6": 26,
                             "M7": 3,
                             "M8": 0,
                             "M9": 0,
                             "M10": 0,
                             "M11": 0,
                             "M12": 0
                         }];
                         */
                         var options=[];
                         var series;
                         $.each(obj, function (name, value) {
                             series = {
                                 data: []
                             };
                             series.name = obj[name].program_risk;
                             series.data.push(parseFloat(obj[name].M1));
                             series.data.push(parseFloat(obj[name].M2));
                             series.data.push(parseFloat(obj[name].M3));
                             series.data.push(parseFloat(obj[name].M4));
                             series.data.push(parseFloat(obj[name].M5));
                             series.data.push(parseFloat(obj[name].M6));
                             series.data.push(parseFloat(obj[name].M7));
                             series.data.push(parseFloat(obj[name].M8));
                             series.data.push(parseFloat(obj[name].M9));
                             series.data.push(parseFloat(obj[name].M10));
                             series.data.push(parseFloat(obj[name].M11));
                             series.data.push(parseFloat(obj[name].M12));
                             options.push(series);


                         });
                         renderChart(options);
                     })
   });
});

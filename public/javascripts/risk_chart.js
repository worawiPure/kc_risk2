//$(function(){
  //  var setChart = function(data){
    //    var $tblRisk = $('#tblChartRisk > tbody');
      //  $tblRisk.empty();
       // var i=0;
       // _.forEach(data.rows, function(v){
         //   i++;
           // var html = '<tr> ' +
             //   '<td> ' + v.Date + ' </td>'+
              //  '<td> ' + v.cc +' </td>';
            //$tblRisk.append(html);
        //})

    //};
    $('table.highchart').highchartTable();

   // $('#show_detail').fadeOut();
   // $('#Searchrisk').on('click',function(e){
   // $('#show_detail').fadeIn();
  //  });

  //  $('#Searchrisk').on('click', function(e) {
    //    e.preventDefault();
      //  var data = {};
      //  var date_searchrisk1 = $('#Date_Searchrisk1').val();
      //  var date_searchrisk2 = $('#Date_Searchrisk2').val();
      //  data.date1 = date_searchrisk1;
      //  data.date2 = date_searchrisk2;

     //   $.ajax({
      //      type: "POST",
        //    url: "/abstract_risk/search_date_chart",
          //  contentType:'application/json',
       //     dataType:'json',
      //      data: JSON.stringify(data)
      //  })
      //      .success(function(data){
      //          setChart(data);
      //      })
    //});
   //setChart();
//});
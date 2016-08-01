$(function(){
    var setTable = function(data){
        var $tblRisk = $('#tblShowRisk > tbody');
        $tblRisk.empty();
        var i=0;
        _.forEach(data.rows, function(v){
            i++;
            var html = '<tr> ' +
                '<td> ' + i + ' </td>'+
                '<td> ' + v.risk_detail + ' </td>'+
                '<td> ' + v.name_sub_program + ' </td>'+
                '<td> ' + v.program_risk + ' </td>';
            $tblRisk.append(html);
        })
    };

    $('#show_detail').fadeOut();
    $('#btnSearch_risk').on('click',function(e){
        $('#show_detail').fadeIn();
    });

    $('#slProgram').on('change', function (e) {
        //   console.log($(this).val());
        var id = $(this).val();
        if (id) {
            $.ajax({
                url: '/sub_program',
                method: 'POST',
                data: {id: id}
            })
                .success(function (data) {
                    var $sl = $('#slSubProgram');
                    $sl.empty();
                    //$sl.append('<option value="">ไม่มี</option> ');
                    _.forEach(data.rows, function (v) {
                        $sl.append('<option value="' + v.id + '">' + v.name_sub_program + '</option> ');
                    });
                    $('#divSubProgram').fadeIn();
                })
                .error(function (xhr, status, err) {
                })
        } else {
            alert('กรุณาเลือกโปรแกรมความเสี่ยง');
        }
    });

    $('#btnSearch_risk').on('click', function(e){
        e.preventDefault();
        var data = {};
        var program = $('#slProgram').val();
        var sub_program = $('#slSubProgram').val();
        data.search_program = program;
        data.search_sub_program = sub_program;
        $.ajax({
            type: "POST",
            url: "/detail/search_risk_show",
            contentType:'application/json',
            dataType:'json',
            data: JSON.stringify(data)
        })
            .success(function(data){
               setTable(data);
            })
    });
    //getAbstractRisk();
});
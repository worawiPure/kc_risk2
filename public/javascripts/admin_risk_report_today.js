$(function(){
    var setTable = function(data){
        var $tblRisk = $('#tblAbstractRisk > tbody');
        $tblRisk.empty();
        var i=0;
        _.forEach(data.rows, function(v){
            i++;
            var html = '<tr> ' +
                '<td> ' + i + ' </td>'+
                '<td> ' + moment(v.date_risk).format('DD/MM/YYYY') + ' </td>'+
                '<td> ' + v.topic_risk + ' </td>'+
                '<td> ' + v.department_report + ' </td>'+
                '<td> ' + v.department_risk + ' </td>'+
                '<td> '+
                '   <div class="btn-group btn-group-sm" role="group"> '+
                '<a class="btn btn-success" type="button" href="/abstract_risk/show_risk/'+ v.id +'" data-toggle="tooltip" data-placement="top" title="ดูรายละเอียด">' +
                ' <i class="fa fa-search"></i></a> '+
                '<a class="btn btn-warning" type="button" href="/abstract_risk/edit_risk/'+ v.id +'" data-toggle="tooltip" data-placement="top" title="แก้ไขรายละเอียด"> ' +
                '<i class="glyphicon glyphicon-pencil"></i></a> '+
                '<a class="btn btn-primary" href="#" data-action="Addabstract" data-id="'+ v.id +'" data-toggle="tooltip" data-placement="top" title="สรุปรายละเอียด" > '+
                '<i class="fa fa-check"> </i></a> '+
                '<a class="btn btn-danger" href="#" data-action="Removeabstract" data-id="'+ v.id +'" data-toggle="tooltip" data-placement="top" title="ลบอุบัติการณ์" > '+
                '<i class="glyphicon glyphicon-trash"> </i></a> '+
                '</div> '+
                '<td> '+
                '   <div class="btn-group btn-group-sm" role="group"> '+
                '<a class="btn btn-info" type="button" href="/prints/'+ v.id +'" data-toggle="tooltip" data-placement="top" title="ปริ้นรายละเอียด"> <i class="fa fa-print"></i></a>';
            if (v.abstract == 1){
                html += '<a href="/prints/abstract_report/'+ v.id +'" data-toggle="tooltip" data-placement="top" title="ปริ้นสรุปอุบัติการณ์" class="btn btn-warning"><i class="fa fa-print"></i></a>  ';
            }
            else {
                html += '<a href="#" data-toggle="tooltip" data-placement="top" title="ปริ้นสรุปอุบัติการณ์" class="btn btn-warning" disabled="disabled"><i class="fa fa-print"></i></a>  ';
            }
            html += '</div></td> '+
            '</div> ';
            $tblRisk.append(html);
        })
    }

    var getAdmin_Risk_today = function(){
        $.ajax({
            method:'POST',
            url:'/admin_get_risk_report_total_today',
            dataType:'json'
        })
            .success(function(data){
                //setTable(data);

                $("#paging").paging(data.total, {
                    format: "< . (qq -) nnncnnn (- pp) . >",
                    perpage: 15,
                    lapping: 0,
                    page: 1,
                    onSelect: function (page) {
                        var startRecord = this.slice[0];
                        console.log(this.slice);
                        $.ajax({
                            method:'POST',
                            url:'/admin_get_risk_report_today',
                            dataType:'json',
                            contentType:'application/json',
                            data: JSON.stringify({startRecord:startRecord})
                        })
                            .success(function(data){
                                setTable(data);
                            })
                        // Index.getService(start, end, startRecord, function (err, rows) {
                        //     if (err) console.log(err);
                        //     else Index.setServiceList(rows);
                        // });
                    },
                    onFormat: function (type) {
                        switch (type) {
                            case 'block':

                                if (!this.active)
                                    return '<li class="disabled"><a href="">' + this.value + '</a></li>';
                                else if (this.value != this.page)
                                    return '<li><a href="#' + this.value + '">' + this.value + '</a></li>';
                                return '<li class="active"><a href="#">' + this.value + '</a></li>';

                            case 'right':
                            case 'left':

                                if (!this.active) {
                                    return "";
                                }
                                return '<li><a href="#' + this.value + '">' + this.value + '</a></li>';

                            case 'next':

                                if (this.active) {
                                    return '<li><a href="#' + this.value + '">&raquo;</a></li>';
                                }
                                return '<li class="disabled"><a href="">&raquo;</a></li>';

                            case 'prev':

                                if (this.active) {
                                    return '<li><a href="#' + this.value + '">&laquo;</a></li>';
                                }
                                return '<li class="disabled"><a href="">&laquo;</a></li>';

                            case 'first':

                                if (this.active) {
                                    return '<li><a href="#' + this.value + '">&lt;</a></li>';
                                }
                                return '<li class="disabled"><a href="">&lt;</a></li>';

                            case 'last':

                                if (this.active) {
                                    return '<li><a href="#' + this.value + '">&gt;</a></li>';
                                }
                                return '<li class="disabled"><a href="">&gt;</a></li>';

                            case 'fill':
                                if (this.active) {
                                    return '<li class="disabled"><a href="#">...</a></li>';
                                }
                        }
                        return ""; // return nothing for missing branches
                    }
                });

            })
    };

    $('#show_search').fadeOut();
    $('#close_search').on('click',function(e){
        $('#show_detail').fadeIn();
        $('#show_search').fadeOut();
        $('#Date_Searchrisk1').val('');
        $('#Date_Searchrisk2').val('');
        $('#slDepartment').val('');
        $('#txtSearch').val('');
    });

    $('#btnShowSearch').on('click',function(e){
        $('#show_search').fadeIn();
        $('#show_detail').fadeOut();
    });

    $('#btnSearch_date').on('click',function(e){
        $('#show_detail').fadeIn();
    });

    $('#btnSearch_department').on('click',function(e){
        $('#show_detail').fadeIn();
    });

    $('#btnSearch_topic').on('click',function(e){
        $('#show_detail').fadeIn();
    });

    $(document).on('click', 'a[data-action="Addabstract"]', function (e) {
        e.preventDefault();
        var detail = $(this).data('detail');
        var id = $(this).data('id');
        $('#txtId').val(id);
        $.ajax('/abstract_risk/detail/'+ id)
            .success(function(data){
                if(data.rows.length){
                    $('#txtdetail').val(data.rows[0].detail);
                    $('#txtId_detail').val(data.rows[0].id);
                }
                $("#mdlNew").modal({
                    backdrop:'static',
                    keyboard:false
                })
            })

    });

    $(document).on('click','a[data-action="Removeabstract"]', function(e){
        e.preventDefault();
        var id = $(this).data('id');
        if(confirm('คุณต้องการลบรายการนี้ ใช่หรือไม่')){
            $.ajax({
                method:'POST',
                url:'/abstract_risk/remove_risk',
                dataType:'json',
                data:{
                    id:id
                }
            })
                .success(function(data){
                    if(data.ok) {
                        alert('ลบเสร็จเรีนบร้อยแล้ว');
                        getAdmin_Risk_today();
                    } else {
                        console.log(data.msg);
                        alert('ไม่สามารถบันทึได้')
                    }
                })
                .error(function(xhr, status, err){
                    console.log(err);
                    alert('กรุณาตรวจสอบการเชื่อมต่อกับแม่ข่าย')
                })
        }
    });

    $('#mdlNew').on('hidden.bs.modal', function (e) {
        $('#txtdetail').val('');
        $('#txtId_detail').val('');
        $('#txtId').val('');// do something...
    });

    $('#btnAdd').on('click',function(e) {
        e.preventDefault();
        var data = {};
        data.id_detail = $('#txtId_detail').val();
        data.detail = $('#txtdetail').val();
        data.id = $('#txtId').val();
        console.log(data);
        if (data.detail) {
            $.ajax({
                method: 'POST',
                url: '/abstract_risk/save_abstract',
                contentType: 'application/json',
                data:JSON.stringify({data: data})
            })
                .success(function (data) {
                    if (data.ok) {
                        alert('แก้ไขเสร็จเรีนบร้อยแล้ว');
                        $('#mdlNew').modal('hide');
                        getAdmin_Risk_today();
                    } else {
                        console.log(data.msg);
                        alert('ไม่สามารถบันทึได้')
                    }
                })
                .error(function (xhr, status, err) {
                    console.log(err);
                    alert('กรุณาตรวจสอบการเชื่อมต่อกับแม่ข่าย')
                })    //save
        } else {
            alert('กรุณากรอกรายละเอียดสรุปความเสี่ยง')
        }
    });

    $('#paging').fadeIn();
    $('#btnSearch_department').on('click', function(e){
        e.preventDefault();
        var data = {};
        var department = $('#slDepartment').val();
        data.department = department;
        $.ajax({
            type: "POST",
            url: "/abstract_risk/search_department",
            contentType:'application/json',
            dataType:'json',
            data: JSON.stringify(data)
        })
            .success(function(data){
                setTable(data);
                $('#paging').fadeOut();
            })
    });
    $('#paging').fadeIn();
    $('#btnSearch_topic').on('click', function(e){
        e.preventDefault();
        var data = {};
        var search_topic = $('#txtSearch').val();
        data.topic = search_topic;

        $.ajax({
            type: "POST",
            url: "/abstract_risk/search_topic",
            contentType:'application/json',
            dataType:'json',
            data: JSON.stringify(data)
        })
            .success(function(data){
                setTable(data);
                $('#paging').fadeOut();
            })
    });
    $('#paging').fadeIn();
    $('#btnSearch_date').on('click', function(e) {
        e.preventDefault();
        var data = {};
        var date_searchrisk1 = $('#Date_Searchrisk1').val();
        var date_searchrisk2 = $('#Date_Searchrisk2').val();
        data.date1 = date_searchrisk1;
        data.date2 = date_searchrisk2;

        $.ajax({
            type: "POST",
            url: "/abstract_risk/search_date_risk",
            contentType:'application/json',
            dataType:'json',
            data: JSON.stringify(data)
        })
            .success(function(data){
                setTable(data);
                $('#paging').fadeOut();
            })
    });
    getAdmin_Risk_today();
});
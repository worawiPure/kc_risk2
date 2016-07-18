$(function(){
    var setTable = function(data){
        var $tblRisk = $('#tblRiskDetail > tbody');
        $tblRisk.empty();
        var i=0;
        _.forEach(data.rows, function(v){
            i++;
            var html = '<tr> ' +
                '<td> ' + i + ' </td>'+
                '<td> ' + v.risk_detail + ' </td>'+
                '<td> ' + v.name_sub_program + '</td>'+
                '<td> '+
                '   <div class="btn-group btn-group-sm" role="group"> '+
                '<button  class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> '+
                '<i class="fa fa-cogs"> </i> </button> '+
                '<ul class="dropdown-menu"> '+
                '<li> '+
                '<a href="#" data-action="edit" data-id="'+ v.id +'" data-name="'+ v.risk_detail +'" data-risk_group="'+ v.subId +'" data-risk_program="'+ v.proId +'") > '+
                '<i class="glyphicon glyphicon-pencil"> </i> แก้ไข </a></li> '+
                '<li> '+
                '<a href="#" data-action="remove" data-id="'+ v.id +'">'+
                '<i class="fa fa-trash"> </i>ลบ </a></li></ul></div> ';
            $tblRisk.append(html);
        })
    }

    var getDetail = function(){
        $.ajax({
            method:'POST',
            url:'/detail/get_risk_detail_total',
            dataType:'json'
        })
            .success(function(data){
                $("#paging").paging(data.total, {
                    format: "< . (qq -) nnncnnn (- pp) . >",
                    perpage: 20,
                    lapping: 0,
                    page: 1,
                    onSelect: function (page) {
                        var startRecord = this.slice[0];
                        console.log(this.slice);
                        $.ajax({
                            method:'POST',
                            url:'/detail/get_risk_detail',
                            dataType:'json',
                            contentType:'application/json',
                            data: JSON.stringify({startRecord:startRecord})
                        })
                            .success(function(data){
                                setTable(data);
                                console.log(data)
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
        $('#txtSearch_detail').val('');
        $('#slDetail_risk').val('');
    });

    $('#btnShowSearch').on('click',function(e){
        $('#show_search').fadeIn();
        $('#show_detail').fadeOut();
    });

    $('#btnSearch_detail_risk').on('click',function(e){
        $('#show_detail').fadeIn();
    });

    $('#btnSearch_detail').on('click',function(e){
        $('#show_detail').fadeIn();
    });

    $('#divSubProgram').fadeOut();
    $('#slProgram').on('change', function (e) {
        var id = $(this).val();
        if (id) {
            $.ajax({
                url: '/sub_program',
                method: 'POST',
                data: {id: id}
            })
                .success(function (data) {
                    var $sl = $('#slGroup');
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

    $(document).on('click','a[data-action="remove"]', function(e){
        e.preventDefault();
        var id = $(this).data('id');
        if(confirm('คุณต้องการลบรายการนี้ ใช่หรือไม่')){
            $.ajax({
                method:'POST',
                url:'/detail/remove_group',
                dataType:'json',
                data:{
                    id:id
                }
            })
                .success(function(data){
                    if(data.ok) {
                        alert('ลบเสร็จเรีนบร้อยแล้ว');
                        getDetail();
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

    $(document).on('click','a[data-action="edit"]',function(e){
        e.preventDefault();
        var risk_program = $(this).data('risk_program');
        var risk_group = $(this).data('risk_group');
        var name = $(this).data('name');
        var id = $(this).data('id');

        $('#slProgram').val(risk_program);
        $('#slGroup').val(risk_group);
        $('#txtName').val(name);
        $('#txtId').val(id);
        $("#mdlNew").modal({
            backdrop:'static',
            keyboard:false
        })
    });

    $('#btnShowModal').on('click',function(e){
        e.preventDefault();
        $("#mdlNew").modal({
        backdrop:'static',
        keyboard:false
        })
    });
    $('#mdlNew').on('hidden.bs.modal', function (e) {
        $('#txtName').val('');
        $('#txtId').val('');// do something...
    });

    $('#btnAdd').on('click',function(e){
        e.preventDefault();
        var risk_program = $('#slProgram').val();
        var risk_group = $('#slGroup').val();
        var name = $('#txtName').val();
        var id = $('#txtId').val();
        console.log(risk_program,risk_group,name,id);
        if( name && risk_program){
            if(id){
                $.ajax({
                    method:'POST',
                    url:'/detail/update_group',
                    dataType:'json',
                    data:{
                        risk_program:risk_program,
                        risk_group:risk_group,
                        name:name,
                        id:id
                    }
                })
                    .success(function(data){
                        if(data.ok) {
                            alert('แก้ไขเสร็จเรียบร้อยแล้ว');
                            $('#mdlNew').modal('hide');
                            getDetail();
                        } else {
                            console.log(data.msg);
                            alert('ไม่สามารถบันทึกได้')
                        }
                    })
                    .error(function(xhr, status, err){
                        console.log(err);
                        alert('กรุณาตรวจสอบการเชื่อมต่อกับแม่ข่าย')
                    })
            }else{
                $.ajax({
                    method:'POST',
                    url:'/detail/save_group',
                    dataType:'json',
                    data:{
                        name:name,
                        risk_group:risk_group,
                        risk_program:risk_program
                    }
                })
                    .success(function(data){
                        if(data.ok) {
                            alert('บันทึกเสร็จเรีนบร้อยแล้ว');
                            $('#mdlNew').modal('hide');
                            getDetail();
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

            //save

        } else{
            alert('กรุณาระบุชื่ออุบัติการณ์');
        }
    });

    $('#paging').fadeIn();
    $('#btnSearch_detail_risk').on('click', function(e){
        e.preventDefault();
        var data = {};
        var search_detail_group = $('#slDetail_risk').val();
        data.search_detail_group = search_detail_group;

        $.ajax({
            type: "POST",
            url: "/detail/search_detail_group",
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
    $('#btnSearch_detail').on('click', function(e){
        e.preventDefault();
        var data = {};
        var search_detail = $('#txtSearch_detail').val();
        data.search_detail = search_detail;

        $.ajax({
            type: "POST",
            url: "/detail/search_detail",
            contentType:'application/json',
            dataType:'json',
            data: JSON.stringify(data)
        })
            .success(function(data){
               setTable(data);
                $('#paging').fadeOut();
            })
    });
    getDetail();
})
$(function() {
    var setTable = function(data){
        var $tblRisk = $('#tblRisk_news > tbody');
        $tblRisk.empty();
        var i=0;
        _.forEach(data.rows, function(v){
            i++;
            var html = '<tr> ' +
                '<td> ' + i + ' </td>'+
                '<td> ' + moment(v.date_news).format('DD/MM/YYYY') + ' </td>'+
                '<td> ' + v.topic_news + '</td>'+
                '<td style="width: 150px;"> '+
                '<div class="btn-group btn-group-sm" role="group"> '+
                '<a class="btn btn-primary" type="button" href="#" data-toggle="tooltip" data-placement="top" title="ดูรายละเอียด"' +
                ' data-action="edit" data-id="'+ v.id+'" data-topic_news="'+ v.topic_news+'"' +
                'data-detail_news="'+ v.detail_news+'" data-date_news="'+ moment(v.date_news).format('DD/MM/YYYY')+'">' +
                ' <i class="fa fa-search"></i></a>';
            $tblRisk.append(html);
        });
        $('[data-toggle="tooltip"]').tooltip();
    }

    var risk_news  = function(){
        $.ajax({
            method:'POST',
            url:'/get_risk_news_total',
            dataType:'json'
        })
            .success(function(data){
                // setTable(data);

                $("#paging").paging(data.total, {
                    format: "< . (qq -) nnncnnn (- pp) . >",
                    perpage: 10,
                    lapping: 0,
                    page: 1,
                    onSelect: function (page) {

                        var startRecord = this.slice[0];
                        console.log(this.slice);
                        $.ajax({
                            method:'POST',
                            url:'/get_risk_news',
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
            });

        $(document).on('click','a[data-action="edit"]',function(e){
            e.preventDefault();
            var date_news = $(this).data('date_news');
            var topic_news = $(this).data('topic_news');
            var detail_news = $(this).data('detail_news');
            var id = $(this).data('id');

            $('#txtDate').val(date_news);
            $('#txtTopic').val(topic_news);
            $('#txtDetail').val(detail_news);
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
            $('#txtDate').val('');
            $('#txtTopic').val('');
            $('#txtDetail').val('');
            $('#txtId').val('');// do something...
        });

        $('#btnAdd').on('click',function(e){
            e.preventDefault();
            var date_news = $('#txtDate').val();
            var topic_news = $('#txtTopic').val();
            var detail_news = $('#txtDetail').val();
            var id = $('#txtId').val();
            console.log(date_news,topic_news,detail_news,id);
            if( topic_news && detail_news){
                if(id){
                    $.ajax({
                        method:'POST',
                        url:'/update_news',
                        dataType:'json',
                        data:{
                            date_news:date_news,
                            topic_news:topic_news,
                            detail_news:detail_news,
                            id:id
                        }
                    })
                        .success(function(data){
                            if(data.ok) {
                                alert('แก้ไขเสร็จเรียบร้อยแล้ว');
                                $('#mdlNew').modal('hide');
                                risk_news();
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
                        url:'/save_news',
                        dataType:'json',
                        data:{
                            date_news:date_news,
                            topic_news:topic_news,
                            detail_news:detail_news
                        }
                    })
                        .success(function(data){
                            if(data.ok) {
                                alert('บันทึกเสร็จเรีนบร้อยแล้ว');
                                $('#mdlNew').modal('hide');
                                risk_news();
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
            } else{
                alert('กรุณาระบุรายละเอียด');
            }
        });
    };
    risk_news();
});


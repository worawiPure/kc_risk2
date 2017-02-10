$(function() {
    var setTable = function(data){
        var $tblRisk = $('#tblRisk_report > tbody');
        $tblRisk.empty();
        var i=0;
        _.forEach(data.rows, function(v){
            i++;
            var html = '<tr> ' +
                '<td> ' + i + ' </td>'+
                '<td> ' + moment(v.date_risk).format('DD/MM/YYYY') + ' </td>'+
                '<td> ' + v.aa + '</td>'+
                '<td> ' + v.topic_risk + '</td>'+
                '<td style="width: 190px;"> '+
                '<div class="btn-group btn-group-sm" role="group"> '+
                '<a class="btn btn-success" type="button" href="/user_senior_show_risk/'+ v.id +'/'+ v.cc +'" data-toggle="tooltip" data-placement="top" title="ดูรายละเอียด"> <i class="fa fa-search"></i></a>';
            //if (v.confirm == 1){
            //    html += '<a href="#" data-toggle="tooltip" data-placement="top" title="แก้ไข" class="btn btn-warning" disabled="disabled"> <i class="glyphicon glyphicon-pencil"></i></a>  '+
            //    '<a class="btn btn-primary" type="button", href="#" disabled="disabled" data-toggle="tooltip" data-placement="top" title="ทบทวน"> <i class="glyphicon glyphicon-book"></i></a>';
            //}
            //else {

            html += '<a href="/user_senior_edit_risk/'+ v.id+'/'+ v.cc +'" data-toggle="tooltip" data-placement="top" title="แก้ไข" class="btn btn-warning"> <i class="glyphicon glyphicon-pencil"></i></a>  '+
                '<a class="btn btn-primary" type="button", href="/risk_repeat/'+ v.id +'/'+ v.cc +'" data-toggle="tooltip" data-placement="top" title="ทบทวน"> <i class="glyphicon glyphicon-book"></i></a>';
            //}
            //html += '</div></td> '+
            //    '<td style="width: 110px;"> '+
            //    '<div class="btn-group btn-group-sm" role="group"> '+
            html += '<a class="btn btn-info" type="button" href="/prints/'+ v.id +'" data-toggle="tooltip" data-placement="top" title="ปริ้นรายละเอียด" class="btn btn-warning"> <i class="fa fa-print"></i></a>'+
                '</div></td> ';

            $tblRisk.append(html);
        });
        $('[data-toggle="tooltip"]').tooltip();
    }


    var risk_report  = function(){
        $.ajax({
            method:'POST',
            url:'/user_senior_get_risk_report_total',
            dataType:'json'
        })
            .success(function(data){
                //setTable(data);
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
                            url:'/user_senior_get_risk_report',
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

        $('#show_search').fadeOut();
        $('#close_search').on('click',function(e){
            $('#show_detail').fadeIn();
            $('#show_search').fadeOut();
            $('#Date_Searchrisk1').val('');
            $('#Date_Searchrisk2').val('');
            $('#txtSearch').val('');
        });

        $('#btnShowSearch').on('click',function(e){
            $('#show_search').fadeIn();
            $('#show_detail').fadeOut();
        });

        $('#btnSearch').on('click',function(e){
            $('#show_detail').fadeIn();
        });

        $('#Searchrisk').on('click',function(e){
            $('#show_detail').fadeIn();
        });

        $('#btnRepeat').on('click', function(e){
            var data = {};
            data.id = $('#riskid').val();
            data.date_repeat = $('#txtDate_repeat').val();
            data.name_repeat = $('#txtName_repeat').val();
            data.result_repeat = $('#txtResult_repeat').val();
            data.depcode_connected = $('#txtDepcode_connected').val();
            data.edit_system = $('#txtEdit_system').val();
            data.date_finished = $('#txtDate_finished').val();
            data.note = $('#txtNote').val();

            if(!data.date_repeat || !data.name_repeat || !data.result_repeat ) {
                $('#divAlert').fadeIn('slow');
            } else{
                $.ajax({
                    type: "POST",
                    url: "/update_part5",
                    contentType: 'application/json',
                    data:JSON.stringify({data: data})
                })
                    .success(function(data) {
                        alert('บันทึกข้อมูลเรียบร้อยแล้ว');
                        window.location.href="/user_senior_risk_report_feedback";
                    })
                    .error(function (xhr, status, err) {
                        alert(err);
                    })
            }
        });

        $('#paging').fadeIn();
        $('#Searchrisk').on('click', function(e){
            e.preventDefault();
            var data = {};
            var date_searchrisk1 = $('#Date_Searchrisk1').val();
            var date_searchrisk2 = $('#Date_Searchrisk2').val();
            data.date_searchrisk1 = date_searchrisk1;
            data.date_searchrisk2 = date_searchrisk2;

            $.ajax({
                type: "POST",
                url: "/user_senior_search_date_risk",
                contentType:'application/json',
                dataType:'json',
                data: JSON.stringify(data)
            })
                .success(function(data){
                    setTable(data);
                    $('#paging').fadeOut();
                });
        });

        $('#paging').fadeIn();
        $('#btnSearch').on('click', function(e){
            e.preventDefault();
            var data = {};
            var search_topic = $('#txtSearch').val();
            data.topic = search_topic;

            $.ajax({
                type: "POST",
                url: "/user_senior_search_topic_risk",
                contentType:'application/json',
                dataType:'json',
                data: JSON.stringify(data)
            })
                .success(function(data){
                    setTable(data);
                    $('#paging').fadeOut();
                });
        });
    };
    risk_report();
})
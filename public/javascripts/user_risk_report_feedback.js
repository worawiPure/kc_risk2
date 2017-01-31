$(function() {
    var setTable = function(data){
        var $tblRisk = $('#tblRisk_report_feedback > tbody');
        $tblRisk.empty();
        var i=0;
        _.forEach(data.rows, function(v){
            console.log(v);
            i++;
            var html = '<tr> ' +
                '<td> ' + i + ' </td>'+
                '<td> ' + moment(v.date_risk).format('DD/MM/YYYY') + ' </td>'+
                '<td> ' + v.aa + '</td>'+
                '<td> ' + v.topic_risk + '</td>'+
                '<td> ' + v.mm + '</td>'+
                '<td style="width: 190px;"> '+
                '<div class="btn-group btn-group-sm" role="group"> '+
                '<a class="btn btn-primary" type="button" href="/show_risk/'+ v.id +'" data-toggle="tooltip" data-placement="top" title="ดูรายละเอียด"> <i class="fa fa-search"></i></a> '+
                '<a class="btn btn-danger" type="button", href="/risk_repeat_user/'+ v.id +'/'+ v.cc +'" data-toggle="tooltip" data-placement="top" title="ทบทวน"> <i class="glyphicon glyphicon-book"></i></a>'+
                '<a class="btn btn-info" type="button" href="/prints/'+ v.id +'" data-toggle="tooltip" data-placement="top" title="ปริ้นรายละเอียด" class="btn btn-warning"> <i class="fa fa-print"></i></a> ';
            html += '</div></td> ';

            $tblRisk.append(html);
        });
        $('[data-toggle="tooltip"]').tooltip();
    }


    var risk_report  = function(){
        $.ajax({
            method:'POST',
            url:'/user_senior_get_risk_report_feedback_total',
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
                            url:'/user_senior_get_risk_feedback_report',
                            dataType:'json',
                            contentType:'application/json',
                            data: JSON.stringify({startRecord:startRecord})
                        })
                            .success(function(data){
                                console.log(data);
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
                url: "/user_senior_search_date_risk_feedback",
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
                url: "/user_senior_search_topic_risk_feedback",
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
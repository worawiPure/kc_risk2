$(function() {
    //$('#divSubProgram').fadeIn();
    //$('#slProgram').on('change', function (e) {
        //   console.log($(this).val());
     //   var id = $(this).val();
     //   if (id) {
      //      $.ajax({
      //          url: '/sub_program',
      //          method: 'POST',
       //         data: {id: id}
        //    })
         //       .success(function (data) {
          //          var $sl = $('#slSubProgram');
          //          $sl.empty();
                    //$sl.append('<option value="">ไม่มี</option> ');
          //          _.forEach(data.rows, function (v) {
            //            $sl.append('<option value="' + v.id + '">' + v.name_sub_program + '</option> ');
             //       });
             //       $('#divSubProgram').fadeIn();
                    //$('#divSubGroup').fadeOut();
                    //$('#divSubGroup').val('');
              //  })
              //  .error(function (xhr, status, err) {

              //  })
      //  } else {
       //     alert('กรุณาเลือกโปรแกรมความเสี่ยง');
       // }
   // });

    //$(document).on('change', '#slProgram', function (e) {
    //    var id = $(this).val();
     //   if(id){
      //      $.ajax({
       //         url:'/sub_group',
       //         method:'POST',
        //        data:{id:id}
        //    })
        //        .success(function(data){
         //           var $sl = $('#slSubGroup');
          //          $sl.empty();
          //          _.forEach(data.rows, function(t){
           //             $sl.append('<option value="'+ t.id+'">'+ t.risk_detail +'</option> ');
            //        });
           //         $('#divSubGroup').fadeIn();
           //     })
            //    .error(function(xhr,status,err){
           //     })
       // } else{
        //    alert('กรุณาเลือกกลุ่มความเสี่ยง');
       // }
    //});

   // $(document).on('change', '#slSubProgram', function (e) {
   //     var id = $(this).val();
     //   if(id){
      //      $.ajax({
         //       url:'/sub_group2',
          //      method:'POST',
          //      data:{id:id}
          //  })
            //    .success(function(data){
            //        var $sl = $('#slSubGroup');
             //       $sl.empty();
             //       _.forEach(data.rows, function(t){
              //          $sl.append('<option value="'+ t.id+'">'+ t.risk_detail +'</option> ');
              //      });
              //      $('#divSubGroup').fadeIn();
              //  })
               // .error(function(xhr,status,err){

               // })
       // } else{
          //  alert('กรุณาเลือกกลุ่มความเสี่ยง');
        //}
    //});

    $('#slComplaint').on('change', function (e) {
        var id = $(this).val();
        if(!id){
            alert('กรุณาเลือกประเภท');
        }
    });


    $('#slRisktype').on('change', function (e) {
        //   console.log($(this).val());e
        var id = $(this).val();
        if(id) {
            $.ajax({
                url: '/clinic',
                method: 'POST',
                data: {id: id}
            })
                .success(function (data) {
                    var $sl = $('#slRisk_level');
                    $sl.empty();
                    $sl.append('<option value="">****กรุณาเลือกความรุนแรง******</option> ');
                    _.forEach(data.rows, function (v) {
                        $sl.append('<option value="' + v.id + '">' + v.risk_level + '</option> ');
                    });
                    $('#divRiskLevel').fadeIn();
                })
                .error(function (xhr, status, err) {

                })
        }else{
            alert('กรุณาเลือกประเภทอุบัติการณ์');
        }
    });

    $('#slRisktype').val() == 1 ? $('#divPatient').fadeIn() : $('#divPatient').fadeOut();
    $('#slRisktype').on('change', function (e){
        var id = $(this).val();
        if(id==1){
            $('#divPatient').fadeIn();
        } else{
            $('#divPatient').fadeOut();
        }
    });

    $('#btnEdit').on('click', function(e){
        var data = {};
        data.id = $('#txtId').val();
        data.risktype = $('#slRisktype').val();
        data.complaint = $('#slComplaint').val();
        data.topic = $('#txtTopic').val();
        data.date_risk = $('#txtDate_risk').val();
        data.time_risk = $('#txtTime_risk').val();
        data.department = $('#slDepartment').val();
        data.program = $('#slProgram').val();
        data.sentinel = $("#radioYes").prop("checked") ? 'Y' : 'N';
        data.risk_level = $('#slRisk_level').val();
        data.type_report = $('#txtType_report').val();
        data.name_report = $('#txtName_report').val();
        data.department2 = $('#slDepartment2').val();
        //data.date_report_risk = $('#txtDate_report_risk').val();
        //data.time_report_risk = $('#txtTime_report_risk').val();
        //data.area_risk = $('#txtArea_risk').val();
        //data.subprogram = $('#slSubProgram').val();
        //data.subgroup = $('#slSubGroup').val();
        //data.note_other = $('#txtNote_other').val();
        //data.risk_detail = $('#txtRisk_detail').val();
        //data.risk_correct = $('#txtRisk_correct').val();
       // data.sone = $("#radioOPD").prop("checked") ? 'OPD' : 'IPD';
        //data.hn = $('#txtHn').val();
        //data.an = $('#txtAn').val();
        //data.name_patient = $('#txtName_patient').val();
        //data.note_patient = $('#txtNote_patient').val();
        //data.name_kin = $('#txtName_kin').val();
       // data.note_kin = $('#txtNote_kin').val();
        //data.name_officer = $('#txtName_officer').val();
        //data.note_officer = $('#txtNote_officer').val();
        //data.name_other = $('#txtName_other').val();
        //data.note_other2 = $('#txtNote_other2').val();
        //data.position = $('#txtPosition').val();
        //data.date_repeat = $('#txtDate_repeat').val();
        //data.name_repeat = $('#txtName_repeat').val();
        //data.result_repeat = $('#txtResult_repeat').val();
        //data.depcode_connected = $('#txtDepcode_connected').val();
        //data.edit_system = $('#txtEdit_system').val();
        //data.date_finished = $('#txtDate_finished').val();
        //data.note = $('#txtNote').val();
       // data.sentinel = $('#checkboxSentinel').val()?'Y':'N';
        //if(!data.risktype || !data.complaint || !data.topic || !data.date_risk || !data.time_risk
            //|| !data.department || !data.program || !data.risk_level || !data.type_report || !data.name_report ) {
            //$('#divAlert').fadeIn('slow');
            if (!data.risktype) {
                alert('คุณยังไม่ได้ลงประเภทความเสี่ยง !!')
            } else if (!data.complaint){
                alert('คุณยังไม่ได้ลงการจำแนกประเภท !! ');
            } else if (!data.topic){
                alert('คุณยังไม่ได้ลงเรื่องหัวข้อความเสี่ยง !!');
            } else if (!data.date_risk){
                alert('คุณยังไม่ได้ลงวันที่เกิดความเสี่ยง !!');
            } else if (!data.time_risk){
                alert('คุณยังไม่ได้ลงเวลาที่เกิดความเสี่ยง !!');
            } else if (!data.department){
                alert('คุณยังไม่ได้ลงแผนกที่เกิดความเสี่ยง !!');
            } else if (!data.program){
                alert('คุณยังไม่ได้ลง Program ความเสี่ยง !!');
            } else if (!data.risk_level){
                alert('คุณยังไม่ได้ลงระดับความรุนแรง !!');
            } else if (!data.type_report){
                alert('คุณยังไม่ได้ลงประเภทการรายงาน !!');
            } else if (!data.name_report){
                alert('คุณยังไม่ได้ลงชื่อผู้รายงาน !!');
            } else {
            $.ajax({
                type: "POST",
                url: "/edit_request",
                contentType: 'application/json',
                data:JSON.stringify({data: data})
            })
                .success(function (data) {
                    alert('แก้ไขข้อมูลเรียบร้อยแล้ว');
                    window.location.href="/user_senior_risk_report";
                })
                .error(function (xhr, status, err) {
                    alert(err);
                })
        }
    })
})
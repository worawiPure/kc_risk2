var getLevelRisk = function() {
    $.ajax({
        method: 'POST',
        url: '/risk_level_month',
        dataType: 'json'
    })
        .success(function (data) {
            console.log(data);
            if (data.ok) {
                $('#dataTotal_Level').text(data.total);
            } else {
                console.log(data.msg);
                alert('ไม่สามารถบันทึได้')
            }
        })
        .error(function (xhr, status, err) {
            console.log(err);
            alert('กรุณาตรวจสอบการเชื่อมต่อกับแม่ข่าย')
        })
};
getLevelRisk();


var getAbstractRisk = function() {
    $.ajax({
        method: 'POST',
        url: '/risk_today_senior',
        dataType: 'json'
    })
        .success(function (data) {
            if (data.ok) {
                $('#dataTotal').text(data.total);
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
getAbstractRisk();


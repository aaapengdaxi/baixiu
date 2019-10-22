//实现退出功能
$('#logout').on('click',function(){
    $.ajax({
        type:'post',
        url:'/logout',
        success:function(){
            location.href = 'login.html'
        }
    })
})
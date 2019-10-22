//实现登录功能
$('#loginBtn').on('click',function(){
    let email = $('#email').val();
    let password = $('#password').val();
    $.ajax({
        type:'post',
        url:'/login',
        data:{
            email:email,
            password:password
        },
        success:function(response){
            if(response.role == 'admin'){
                 location.href = 'index.html'
            }else {
                location.href = 'index.html'
            }
           
        }
    })
})
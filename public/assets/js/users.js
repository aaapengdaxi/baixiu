//获取用户列表
$.ajax({
    type:'get',
    url:'/users',
    success:function(response){
        // 返回的为数组
        console.log(response);
        let html = template('userTpl',{data:response});
        $('#userBox').html(html);
    }
});

//实现添加用户功能
$('#userForm').on('submit',function(){
    let formData = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/users',
        data:formData,
        success:function(response){
            console.log(response)
            location.reload();
        }
    });
    return false;
});
//实现添加图片
$('#editBox').on('change','#avatar',function(){
    let formData = new FormData();
    formData.append('avatar',this.files[0])
    $.ajax({
       type:"post",
       url:"/upload",
       data:formData,
       processData:false,
       contentType:false,
       success:function(response){
           //实现预览效果
           $('#preview').attr('src',response[0].avatar);
           $('#hiddenImg').val(response[0].avatar);
       }
   })
});
//实现编辑功能
$("#userBox").on('click','.edit',function(){
    let id = $(this).attr('data-id');
    //根据id获取用户
    $.ajax({
        type:'get',
        url:`/users/${id}`,
        success:function(response){
            console.log(response);
            let html = template('editTpl',response);
            $('#editBox').html(html);
        }
    })
});
//实现修改功能
$('#editBox').on('submit','#editForm',function(){
    let dataForm  = $(this).serialize();
    let id = $(this).attr('data-id');
    $.ajax({
        type:'put',
        url:`/users/${id}`,
        data:dataForm,
        success:function(response){
            location.reload();
        }
    })
    //阻止默认行为
    return false;
});
//实现删除功能
$('#userBox').on('click','.delete',function(){
    let id = $(this).attr('data-id');
    if(confirm('你确定要删除该用户吗？')){
        $.ajax({
            type:'delete',
            url:`/users/${id}`,
            success:function(){
                location.reload();
            }
        });
    }
});
//给全选 按钮添加事件
$('#checkAll').on('change',function(){
    // 下面的按钮与全选按钮状态相同
    $('#userBox .checkOne').prop('checked',$(this).prop('checked'));
    if($(this).prop('checked')){
        $('#deleteMany').show()
    }else {
        $('#deleteMany').hide()
    }
});
//给每个复选框添加change事件
$('#userBox').on('change','.checkOne',function(){
    if($('#userBox .checkOne:checked').length == $('#userBox .checkOne').length){
        $('#checkAll').prop('checked',true);
    }else{
        $('#checkAll').prop('checked',false);
    }
    if($('#userBox .checkOne:checked').length >=2){
        $('#deleteMany').show()
    }else {
        $('#deleteMany').hide()
    }
});
//实现批量删除
$('#deleteMany').on('click',function(){
    let arr = [];
    let checkedBox = $('#userBox .checkOne').filter(':checked');
    checkedBox.each(function(index,elemnt){
        arr.push($(elemnt).attr('data-id'));
    });
    if(confirm('你确定要批量删除吗?')){
         $.ajax({
        type:'delete',
        url:'/users/'+arr.join('-'),
        success:function(){
            location.reload();
        }
    })
    }
   
});
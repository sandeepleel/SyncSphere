// ajax on settings process
$(document).ready(function(){

    let active=localStorage.getItem("activeuser");
    alert(active);
    $("#dashwlcm").html("welcome:"+active);
    $(document).ajaxStart(function(){
        $("#bg").css("display","block");
        $("#wait").css("display","block");
    })
    $(document).ajaxStop(function(){
        $("#wait").css("display","none");
        $("#bg").css("display","none");
    })

    // $("#chemail").blur(function(){
    //     if($(this).val()=="")
    //     {
    //         $("#errEmails").html("");
    //         return;
    //     }
    //     let obj={
    //         type: "get",
    //         url: "/check-setting-process",
    //         data: {
    //             chemail: $("#chemail").val()
    //         }
    //     };
    //     $.ajax(obj).done(function(resp){
    //         $("#errEmails").html(resp);
    //     }).fail(function(err){
    //         alert(err.statusText);
    //     });
    // });


    //====================================
    $("#cbtnUpdate").click(function () {
        // alert();
        let ConfiObj = {
            type: "get",
            url: "/cpass-change-process",
            data: {
                clemail: $("#clemail").val(),
                copwd: $("#copwd").val(),
                cnpwd: $("#cnpwd").val(),
                ctxtnPwd: $("#ctxtnPwd").val()

            }
        }
        $.ajax(ConfiObj).done(function (response) {
            alert(response);
            $("#cerrEmails").html(response);


        }).fail(function (err) {
            alert(err.statusText);
            $("#cerrEmails").html(err.statusText);
        })

    })


   })


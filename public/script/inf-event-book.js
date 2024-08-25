// ajax on event book process 
$(document).ready(function(){
    let active=localStorage.getItem("activeuser");
  //  alert(active);
    $("#dashwlcm").html("welcome:"+active);

    $(document).ajaxStart(function(){
        $("#bg").css("display","block");
        $("#wait").css("display","block");
    })
    $(document).ajaxStop(function(){
        $("#wait").css("display","none");
        $("#bg").css("display","none");
    })

    $("#emailb").blur(function(){
        if($(this).val()=="")
        {
            $("#errEmail").html("");
            return;
        }
        let obj={
            type: "get",
            url: "/check-event-process",
            data: {
                emailb: $("#emailb").val()
            }
        };
        $.ajax(obj).done(function(resp){
            $("#errEmail").html(resp);
        }).fail(function(err){
          //  alert(err.statusText);
            $("#errEmail").html(err.statusText);

        });
    });
    $("#btnEvent").click(function(){
        let obj={
            type : "post",
            url: "save-event-data",
            data: {
                emailb: $("#emailb").val(),
                eventb: $("#eventb").val(),
                dateb: $("#dateb").val(),
                timeb : $("#timeb").val(),
                cityb: $("#cityb").val(),
                venueb: $("#venueb").val()
            }
        };
        $.ajax(obj).done(function(resp){
            
              //  alert(resp);
                $("#errEmail").html(resp);
                return;
            
        
        }).fail(function(err){
           // alert(err.statusText);
            $("#errEmail").html(err.statusText);
        });
    });
});
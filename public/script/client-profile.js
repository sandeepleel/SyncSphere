$(document).ready(function(){
    //let active=localStorage.getItem("activeuser");
   //// alert(active);
   // $("#cemail").val(active).prop("readonly",true);
    
   let active=localStorage.getItem("activeuser");
   alert(active);
   $("#dashwlcm").html("welcome:"+active);
   $("#cemail").val(active).prop("readonly",true);
    $("#cemail").blur(function(){
        if($(this).val()==""){
            $("#errcEmail").html("Fill Data");
            return;
        }
        let cobj={
            type: "get",
            url: "/check-client-existance",
            data: {
                cemail : $("#cemail").val()
            }
        }
        $.ajax(cobj).done(function(resp){
            $("#errcEmail").html(resp);
            if(jsonAry.length==0)
            {
                $("#cmodify").prop("type","disabled");
            }

        }).fail(function(err){
            alert(err.statusText);
        })
        
    })

//=================
$("#btncSearch").click(function(){
    let cobj={
        type: "get",
        url: "/find-client-details",
        data: {
            cemail: $("#cemail").val()
        }
    }
    $.ajax(cobj).done(function(jsonAry){
        if(jsonAry.length==0){
            alert("Invalid Id");
            
            return;
            
        }
        alert(JSON.stringify(jsonAry));
        $("#cemail").val(jsonAry[0].email);
        $("#cname").val(jsonAry[0].name);
        $("#ccity").val(jsonAry[0].city);
        $("#cstate").val(jsonAry[0].state);
        $("#org").val(jsonAry[0].org);
        $("#ccontact").val(jsonAry[0].mobile);
       
    }).fail(function(err){
        alert(err.statusText);
    })
})
})
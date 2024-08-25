// Ajax on search button
$(document).ready(function(){
    let active=localStorage.getItem("activeuser");
   // alert(active);
    $("#dashwlcm").html("welcome:"+active);
    $("#txtEmail").val(active).prop("readonly",true);
    $(document).ajaxStart(function(){
        $("#bg").css("display","block");
        $("#wait").css("display","block");
    })
    $(document).ajaxStop(function(){
        $("#wait").css("display","none");
        $("#bg").css("display","none");
    })

    $("#txtEmail").blur(function(){
        if($(this).val()=="")
        {
            $("#errEmail").html("");
            return;
        }
        let obj={
            type: "get",
            url: "/check-user-existance",
            data: {
                txtEmail: $("#txtEmail").val()
            }
        }
        $.ajax(obj).done(function(resp){
            $("#errEmail").html(resp);
        }).fail(function(err){
            alert(err.statusText);
        })
    })
    $("#btnSearch").click(function(){
        let obj={
            type: "get",
            url: "/find-user-details",
            data: {
                txtEmail : $("#txtEmail").val()
            }
        }
        $.ajax(obj).done(function(jsonAry){
            if(jsonAry.length==0){
              //  alert("Invalid Id");
             // $("#btnSearch").prop("type","hidden");
                $("#errEmail").html("Invalid Id");
                return;
            }
            else {
                $("#errEmail").html("valid Id");
            }
         //   alert(JSON.stringify(jsonAry));
            
            $("#txtEmail").val(jsonAry[0].emailid);
            $("#iname").val(jsonAry[0].iname);
            $("#gender").val(jsonAry[0].gender);
            $("#dob").val(jsonAry[0].dob);
            $("#address").val(jsonAry[0].address);
            $("#city").val(jsonAry[0].city);
            $("#contact").val(jsonAry[0].contact);

            // Assuming jsonAry[0].fields is a comma-separated string
const selectedValues = jsonAry[0].fields.split(",");

// Set the selected values in the multi-select box
$("#fields").val(selectedValues).trigger('change'); // .trigger('change') is used to ensure the select box updates properly in some cases

           // var jsonAry = [{ fields: "Fashion,Fitness,Sports,Coding,Education,Singing,Meditation,Rapper" }];
      //  $("#fields").val(jsonAry[0].fields.split(","));
         //  $("#fields").val(jsonAry[0].fields.split(","));
            $("#insta").val(jsonAry[0].insta);
            $("#fb").val(jsonAry[0].fb);
            $("#youtube").val(jsonAry[0].youtube);
            $("#others").val(jsonAry[0].others);
            $("#imgPrev").prop("src","uploads/"+jsonAry[0].picpath);
            
            $("#hdn").val(jsonAry[0].picpath);




           // $("#hdn").val(jsonAry[0].picpath);
alert($("#hdn").val()); 

            
           // alert($("#hdn").val())

        }).fail(function(err){
            alert(err.statusText);
            $("#errEmail").html(err.statusText);

        })
    });
});
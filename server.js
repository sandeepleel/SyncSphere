var express=require("express");
let app= express();
let mysql2=require("mysql2");
var fileuploader=require("express-fileupload");



const http = require("http");
const nodemailer = require("nodemailer");

// let config={
//     host:"127.0.0.1",
//     user:"root",
//     password:"101833leels",
//     database:"project",
//    dateStrings:true
// }


let config={
    host:"b2cvazfuamebbjalwvy5-mysql.services.clever-cloud.com",
    user:"updervrszus3k4rx",
    password:"DQfRTVFsxtjY11y41502",
    database:"b2cvazfuamebbjalwvy5",
   dateStrings:true,
   keepAliveInitialDelay:10000,
   enableKeepAlive:true
}
app.use(express.static("public")); //because all files are in public folder
app.use(fileuploader());

app.use(express.urlencoded("true"));  //for conversion binary data which get by get method to JSON object


var mysql=mysql2.createConnection(config);
mysql.connect(function(err){
    if(err==null)
    {
        console.log("connected to database successfully");
    }
    else
     console.log(err.message);
})

app.listen(2002,function(req,resp){
    console.log("Your server started congratulations 😊");
})

app.get("/",function(req,resp){
    let path=__dirname+"/public/index.html";
    resp.sendFile(path);
})
app.get("/infu-profile",function(req,resp){
    let path=__dirname+"/public/inf-profile.html";
    resp.sendFile(path);
})
app.get("/infu-dash",function(req,resp){
    let path=__dirname+"/public/infl-dash.html";
    resp.sendFile(path);
    console.log("Page");
})

app.get("/users-dash",function(req,resp){
    let path=__dirname+"/public/admin-dash.html";
    resp.sendFile(path);
})
app.get("/all-infu",function(req,resp){
    let path=__dirname+"/public/admin-all-influ.html";
    resp.sendFile(path);
})
app.get("/all-users",function(req,resp){
    let path=__dirname+"/public/admin-users.html";
    resp.sendFile(path);
})
app.get("/influ-finder",function(req,resp){
    let path=__dirname+"/public/influ-finder.html";
    resp.sendFile(path);
})
app.get("/events-manager",function(req,resp){
    let path=__dirname+"/public/events-manager.html";
    resp.sendFile(path);
})
app.get("/client-dash",function(req,resp){
    let path=__dirname+"/public/Client-dash.html";
    resp.sendFile(path);
})
app.get("/client-profile",function(req,resp){
    let path=__dirname+"/public/Client-profile.html";
    resp.sendFile(path);
})
app.get("/nav",function(req,resp){
    let path=__dirname+"/public/navbar.html";
    resp.sendFile(path);
})


//for navbar



app.get("/signup-process",function(req,resp)
{
    console.log(req.query);

    let email=req.query.txtEmail;
    let pwd=req.query.pwd;
    let utype=req.query.combo;
    
    mysql.query("insert into users values(?,?,?,?)",[email,pwd,utype,1],function(err)
    {
        if(err==null)
        {
            resp.send("SignedUp Successfullyy")
        }
        else
            resp.send(err.message);
    })
})

app.get("/login-process",function(req,resp)
{
    //console.log("login-process");
    let emaill=req.query.txtEmaill;
    let txtPwd=req.query.txtPwd;

    mysql.query("select * from users where email=? and pwd=?",[emaill,txtPwd],function(err,result)
    {
        if(err!=null)
        {
            resp.send(err.message); return;
        }
        if(result.length==0)
        {
            resp.send("Invalid Id or Password");return;''
        }
        if(result[0].status==1)
        {
            resp.send(result[0].utype); return;
        }
        else{
            resp.send("U R Blocked!!!"); return;
        }

    })

})
//  profile page data save and update
app.post("/save-process",function(req,resp)
{

    console.log(req.body);
    let fields = Array.isArray(req.body.fields) ? req.body.fields.join(",") : req.body.fields;
    let fileName="";
    if(req.files!=null){
        fileName=req.files.ppic.name;
        let path=__dirname+"/public/uploads/"+fileName;
        req.files.ppic.mv(path);
    }
    else 
    fileName="nopic.jpg";

    mysql.query("insert into iprofile values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[
        req.body.txtEmail,
        req.body.iname,
        req.body.gender,
        req.body.dob,
        req.body.address,
        req.body.city,
        req.body.contact,
        //req.body.fields, 
        fields,
        req.body.insta,
        req.body.fb,
        req.body.youtube,
        req.body.others,
        fileName
    ],function(err)
    {
    
console.log(err);

        if(err==null) //no error
        resp.send("Data Saved In Profile");

        else
       resp.send(err.message);
    })
})

app.post("/update-process",function(req,resp){
    console.log(req.body);
    let fields = Array.isArray(req.body.fields) ? req.body.fields.join(",") : req.body.fields;
    let fileName="";
    if(req.files!=null)
        {
        fileName=req.files.ppic.name;
        let path=__dirname+"/public/uploads/"+fileName;
        req.files.ppic.mv(path);
    }
    else {
        fileName=req.body.hdn;
    }
mysql.query("update iprofile set iname=?,gender=?,dob=?,address=?,city=?,contact=?,fields=?,insta=?,fb=?,youtube=?,others=?,picpath=? where emailid=?",[
    req.body.iname,
    req.body.gender,
    req.body.dob,
    req.body.address,
    req.body.city,
    req.body.contact,
    fields,
    req.body.insta,
    req.body.fb,
    req.body.youtube,
    req.body.others,
    fileName,
    req.body.txtEmail
],function(err,result){

    if(err==null)
        {
            if(result.affectedRows>=1)
               // resp.send("updated successfully");
            resp.redirect("result.html");
            else
            resp.send("Invalid Email");
        }
        else 
        resp.send(err.message);
 } )


})

// ajax on search button of profile
app.get("/check-user-existance",function(req,resp){
    let emailid=req.query.txtEmail;
    mysql.query("select * from iprofile where emailid=?",[emailid],function(err,resultJsonAry){
        if(err!=null){
            resp.send(err.message);
            return;
        }
        if(resultJsonAry.length==0)
            resp.send("Yes!! Available");
        else 
    resp.send("Sorry Already Taken");


    })
})

app.get("/find-user-details",function(req,resp){
    let emailid=req.query.txtEmail;
    mysql.query("select * from iprofile where emailid=?",[emailid],function(err,resultJsonAry){
        if(err!=null)
            {
            resp.send(err.message);
        return;
        }
        console.log(resultJsonAry);
        resp.send(resultJsonAry); //sending array of json object 0-1
    })

})



// ajax on booking data modal
app.post("/save-event-data",function(req,resp){
    let emailid=req.body.emailb;
    mysql.query("insert into events values(?,?,?,?,?,?,?)",[null,emailid,req.body.eventb,req.body.dateb,req.body.timeb,req.body.cityb,req.body.venueb],function(err,resultJsonAry){
        if(err==null) //no error
        resp.send("Data Saved");

        else
        resp.send(err.message);
    });
});

app.get("/check-event-process",function(req,resp){
    let emailid=req.query.emailb;
    mysql.query("select * from events where emailid-?",[emailid],function(err,resultJsonAry){
        if(err)
        {
            resp.send(err.message);
            return;
        }if (resultJsonAry.length > 0) {
            resp.send("Email already used for an event");
        } else {
            resp.send(""); }
    });
});

// admin pannel code
app.get("/fetch-profile-data",function(req,resp){
    let emailid=req.query.txtEmail;
    mysql.query("select * from iprofile",function(err,resultJsonAry){
        if(err!=null)
            {
            resp.send(err.message);
        return;
        }
        console.log(resultJsonAry);
        resp.send(resultJsonAry); //sending array of json object 0-1
    })    

})
app.get("/fetch-all-data",function(req,resp){
    let email = req.query.txtEmail;
    mysql.query("select * from users",function(err,resultJsonAry)
    {
        if(err!=null)
            {
            resp.send(err.message);
        return;
        }
        resp.send(resultJsonAry); 
    })

})
app.get("/del-one",function(req,resp)
{
    mysql.query("delete from users where email=?",[req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            resp.send("Deleted");
       
    })

})
app.get("/resume-user",function(req,resp){

    let status=1;
   mysql.query("update users set status=? where email=?",[status,req.query.email],function(err,resultJsonAry)
    {
        
        if(err!=null)
        {
            resp.send(err.message); return;
        }
        else{
            resp.send("U R Resumed!!!"); return;
        }
    })
})

app.get("/block-user",function(req,resp){

    let status=0;
   mysql.query("update users set status=? where email=?",[status,req.query.email],function(err,resultJsonAry)
    {
        
        if(err!=null)
        {
            resp.send(err.message); return;
        }
        else{
            resp.send("U R Blocked!!!"); return;
        }
    })
})

// //===================influ-finder 

app.get("/find-influe", function(req, resp) {
    console.log(req.query.fields);
    mysql.query("SELECT DISTINCT city FROM iprofile WHERE fields LIKE ?", ["%" + req.query.fields + "%"], function(err, resultJsonAry) {
        if (err) {
            console.log(err.message);
            resp.send(err.message);
            return;
        }
        resp.send(resultJsonAry);
    });
});
app.get("/do-find", function(req, resp) {
    console.log(req.query.fields, req.query.city);
    mysql.query("SELECT * FROM iprofile WHERE fields LIKE ? AND city=?", ["%" + req.query.fields + "%", req.query.city], function(err, resultJsonAry) {
        if (err) {
            console.log(err.message);
            resp.send(err.message);
            return;
        }
        resp.send(resultJsonAry);
    });
});



app.get("/do-findbyname",function(req,resp){
 console.log(req.query.fields);

  
    mysql.query("select * from iprofile where iname like ?",["%"+req.query.iname+"%"],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
    })
    })

// Client Profile 
app.post("/csave-process",function(req,resp)
{
    console.log(req.body);
    mysql.query("insert into cprofile values(?,?,?,?,?,?)",[
        req.body.cemail,
        req.body.cname,
        req.body.ccity,
        req.body.cstate,
        req.body.org,
        req.body.ccontact,
    ],function(err)
    {
    
console.log(err);

        if(err==null) //no error
        resp.send("Data Saved In CProfile");

        else
       resp.send(err.message);
    })
})

app.post("/cmodify-process",function(req,resp){
    console.log(req.body);
mysql.query("update cprofile set name=?,city=?,state=?,org=?,mobile=? where email=?",[
        req.body.cname,
        req.body.ccity,
        req.body.cstate,
        req.body.org,
        req.body.ccontact,
        req.body.cemail,
],function(err,result){

    if(err==null)
        {
            if(result.affectedRows>=1)
               // resp.send("updated successfully");
            resp.redirect("result.html");
            else
            resp.send("Invalid Email");
        }
        else 
        resp.send(err.message);
 } )
})
//=============
// ajax on search button of client profile
app.get("/check-client-existance",function(req,resp){
    let cemail=req.query.cemail;
    mysql.query("select * from cprofile where email=?",[cemail],function(err,resultJsonAry){
        if(err!=null){
            resp.send(err.message);
            return;
        }
        if(resultJsonAry.length==0)
            resp.send("Yes!! Available");
        else 
    resp.send("Sorry Already Taken");


    })
})

app.get("/find-client-details",function(req,resp){
    let cemail=req.query.cemail;
    mysql.query("select * from cprofile where email=?",[cemail],function(err,resultJsonAry){
        if(err!=null)
            {
            resp.send(err.message);
        return;
        }
        console.log(resultJsonAry);
        resp.send(resultJsonAry); //sending array of json object 0-1
    })

})



    








// //settings ajax =================





app.get("/pass-change-process", function(req, resp) {
    let chemail = req.query.chemail;
    let opwd = req.query.opwd;
    let npwd = req.query.npwd;
    let txtnPwd = req.query.txtnPwd;

    if (npwd != txtnPwd) {
        resp.send("Passwords do not match");
        return;
    }

    mysql.query("select * from users where email=? and pwd=?", [chemail, opwd], function(err, resultJsonAry) {
        if (err) {
            resp.send(err.message);
            return;
        }

        if (resultJsonAry.length == 0) {
            resp.send("Incorrect details");
            return;
        }

        mysql.query("update users set pwd=? where email=?", [npwd, chemail], function(err) {
            if (err) {
                resp.send(err.message);
                return;
            }

            const auth = nodemailer.createTransport({
                service: "gmail",
                secure: true,
                port: 465,
                auth: {
                    user: "sk1252844@gmail.com",
                    pass: "wrhkwiyzjmtcbfhl" // Replace with actual password
                }
            });

            const receiver = {
                from: "sk1252844@gmail.com",
                to: chemail,
                subject: "Password Changed Successfully!",
                text: "Hello, this is a password change email!"
            };

            auth.sendMail(receiver, (error, emailResponse) => {
                if (error) {
                    resp.send(error.message);
                    return;
                }
                resp.send("Password changed successfully and email sent!");
            });
        });
    });
});

const server2 = http.createServer(app);
server2.listen(3002, () => {
    console.log("Server is running on port 3000");
});

// app.get("/check-setting-process",function(req,resp){
//     console.log(req.body);
//     let chemail=req.query.chemail;
//     mysql.query("select * from users where email=?",[chemail],function(err,resultJsonAry){
//         if(err)
//         {
//             resp.send(err.message);
//             return;
//         }if (resultJsonAry.length > 0) {
//             resp.send("Email already used");
//         } else {
//             resp.send(""); }
//     });
// });


//client dash setting
app.get("/cpass-change-process", function(req, resp) {
    let clemail = req.query.clemail;
    let copwd = req.query.copwd;
    let cnpwd = req.query.cnpwd;
    let ctxtnPwd = req.query.ctxtnPwd;

    if (cnpwd != ctxtnPwd) {
        resp.send("Passwords do not match");
        return;
    }

    mysql.query("select * from users where email=? and pwd=?", [clemail, copwd], function(err, resultJsonAry) {
        if (err) {
            resp.send(err.message);
            return;
        }

        if (resultJsonAry.length == 0) {
            resp.send("Incorrect details");
            return;
        }

        mysql.query("update users set pwd=? where email=?", [cnpwd, clemail], function(err) {
            if (err) {
                resp.send(err.message);
                return;
            }

            const auth = nodemailer.createTransport({
                service: "gmail",
                secure: true,
                port: 465,
                auth: {
                    user: "sk1252844@gmail.com",
                    pass: "wrhkwiyzjmtcbfhl" // Replace with actual password
                }
            });

            const receiver = {
                from: "sk1252844@gmail.com",
                to: clemail,
                subject: "Password Changed Successfully!",
                text: "Hello, this is a password change email!"
            };

            auth.sendMail(receiver, (error, emailResponse) => {
                if (error) {
                    resp.send(error.message);
                    return;
                }
                resp.send("Password changed successfully and email sent!");
            });
        });
    });
});

const server3 = http.createServer(app);
server3.listen(3000, () => {
    console.log("Server is running on port 3000");
});


//events manager code

app.get("/fetch-events-data", function(req, resp) {
    let emailid = req.query.emailid;

    mysql.query(
        "SELECT * FROM events WHERE doe >= CURRENT_DATE() AND emailid = ?",
        [emailid],
        function(err, resultJsonAry) {
            if (err != null) {
                resp.send(err.message);
                return;
            }
            resp.send(resultJsonAry);
        }
    );
});






    app.get("/delete-events-data",function(req,resp)
    {
        mysql.query("delete from events where emailid=?",[req.query.emailid],function(err,resultJsonAry){
            if(err!=null)
                {
                    resp.send(err.message);
                    return;
    
                }
                resp.send("Deleted");
           
        })
    
    })





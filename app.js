const express = require("express");
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https')

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

var APIKEY = "87fa7afa15c34dc8f9e783f6bf05d422-us9";
var listid = "9747831528";

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var emailadd = req.body.emailadd;

    var data = {
        members: [
            {
                email_address: emailadd,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };

    var url = "https://us9.api.mailchimp.com/3.0/lists/9747831528";

    const postData = JSON.stringify(data);

    const options = {
        method: "POST",
        auth: "saniya:87fa7afa15c34dc8f9e783f6bf05d422-us9"
    }

    var statuscode;

    const reque = https.request(url, options, function (response) {
        console.log(response.statusCode);
        statuscode = response.statusCode;

        if(statuscode == 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
    });
    

    reque.write(postData);
    reque.end();
    
});

app.post("/failure", (req, res)=> {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, () => {
    console.log("The server is up and running");
});
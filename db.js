window.$ = window.jquery = require('jquery');
require('popper.js');
require('bootstrap');
const bcrypt = require('bcryptjs');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://yatharth:<password>@cluster0-p0dyy.mongodb.net/test?retryWrites=true&w=majority";
const dbName = 'bookmarker';
const client = new MongoClient(url);

// function readyFunction(){
//     if(localStorage.username)
//         window.location.replace("index.html");
// };
// readyFunction();

$(document).ready(function(){
    var data = {};
    data['username'] = localStorage.username;
    client.connect(function(err, client){
        if(err)
            throw err;
        const db = client.db(dbName);
        const userCollection = db.collection('bookmark');
        userCollection.findOne({'username':data['username']},function(err,result){
            if(err) throw err;
            console.log(result.bookmark_contents);
            $("#add_bookmark").html(result.bookmark_contents);
        });

    });

    $("#Save_bookmark").on( "submit", function( event ) {
        event.preventDefault();
        
        var a = $("#Save_bookmark").children();
        data['htmlContent'] = a.html();
        console.log(data['htmlContent']);


        client.connect(function(err, client){
            if(err)
                throw err;
            const db = client.db(dbName);
            const userCollection = db.collection('bookmark');
            // userCollection.save({'username':data['username'],'bookmark_contents':data['htmlContent']});
            userCollection.update({'username':data['username']},{$set:{'bookmark_contents':data['htmlContent']}},{ upsert: true});
            console.log("Update complete");
        });
    });
});

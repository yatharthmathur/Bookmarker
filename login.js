window.$ = window.jquery = require('jquery');
require('popper.js');
require('bootstrap');
const bcrypt = require('bcryptjs');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://yatharth:<password>@cluster0-p0dyy.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'bookmarker';
const client = new MongoClient(url);

function readyFunction(){
    if(localStorage.username)
        window.location.replace("index.html");
};
readyFunction();
$(document).ready(function(){
    $( "#loginForm" ).on( "submit", function( event ) {
        event.preventDefault();
        var formData = $( this ).serializeArray();
        var data = {};
        for(var i = 0; i<formData.length; i++)
            data[formData[i]['name']] = formData[i]['value'];

        client.connect(function(err, client){
            if(err)
                throw err;
            console.log("Connected successfully.");
            const db = client.db(dbName);
            const userCollection = db.collection('user');
            userCollection.find({'username':data['username']}).limit(1).toArray(function(err, result){
                if(result == null || result.length == 0)
                    alert('User not found.');
                else{
                    var hash = result[0]['passwordHash'];
                    if(bcrypt.compareSync(data['password'], hash)){
                        console.log('Successful login.');
                        localStorage.setItem('username', data['username']);
                        window.location.replace('index.html');
                    }
                    else
                        alert('Incorrect password');
                }
            });
        });
    });
});

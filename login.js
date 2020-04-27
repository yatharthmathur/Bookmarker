window.$ = window.jquery = require('jquery');
require('popper.js');
require('bootstrap');
const bcrypt = require('bcryptjs');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
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
            console.log("Connected successfully.");
            const hash = bcrypt.hashSync(data['password'], 10);
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
                        window.location.reload();
                    }
                    else
                        alert('Incorrect password');
                }     
            });
        }); 
    });
});
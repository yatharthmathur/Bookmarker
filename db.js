window.$ = window.jquery = require('jquery');
require('popper.js');
require('bootstrap');
const bcrypt = require('bcryptjs');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://yatharth:yatharth@123@cluster0-p0dyy.mongodb.net/test?retryWrites=true&w=majority";
const dbName = 'bookmarker';
const client = new MongoClient(url);

function readyFunction(){
    if(localStorage.length == 0)
        window.location.replace("login.html");
};
readyFunction();

// Clears the DB for fresh creation
function cleardb(){
    var data = {};
    data['username'] = localStorage.username;
    client.connect(function(err, client){
        if(err)
            throw err;
        const db = client.db(dbName);
        const userCollection = db.collection('bookmark');
        // userCollection.save({'username':data['username'],'bookmark_contents':data['htmlContent']});
        userCollection.remove({'username':data['username']});
        console.log("Deletion complete");
    });
}

function resultset(){
    var data = [];
    data['username'] = localStorage.username;
    // var child = $("#add_bookmark  > div:eq(1) ").attr("id");
    // console.log(child);
    $('#add_bookmark').children('div').each(function(){
        var nameoflist = $(this).attr('id');
        var bk = [];
        var a = $(this).children('.card-header');
        var b = a.children('h4').text();
        var v = $(this).children(`#dynamic`);
        var w = v.children(`#${nameoflist}_list`);
        w.children('li').each(function(){
            bk.push({
                'values':$(this).text()
            });
        })
        data.push({
                'actualHeader' : b,
                'header' : nameoflist,
                'header_list' : bk
                    });
      });
      console.log(data);
      client.connect(function(err, client){
        if(err)
            throw err;
        const db = client.db(dbName);
        const userCollection = db.collection('bookmark');
        userCollection.update({'username':data['username']},{$set:{data}},{ upsert: true});
        console.log("Update complete");
    });
}

function resultget(){
    var data = [];
    data['username'] = localStorage.username;
    client.connect(function(err, client){
        if(err)
            throw err;
        const db = client.db(dbName);
        const userCollection = db.collection('bookmark');
        userCollection.findOne({'username':data['username']},function(err,result){
            if(err) throw err;
            var data = result['data']
            console.log(data);
            data.forEach(function(item,index){
                console.log(item['actualHeader']);
                console.log(item['header']);
                var headerName = item['header'];
                $("#add_bookmark").append(`<div class="card border-primary opacity_property mb-3 col-xs-6" id="${headerName}">
											<div class="card-header">
												<h4><span><i class="fa fa-trash" aria-hidden="true"></i></span>${item.actualHeader}</h4>
											</div>
											<div class="card-body text-dark" id="dynamic">
												<ul id="${headerName}_list"></ul>
											</div>
											<div class="card-footer bg-transparent border-dark">
												<input type="text" placeholder="Add New Todo">
											</div>
                                        </div>`);
                item['header_list'].forEach(function(item,index){
                    console.log(item['values']);
                    new_todo = check_links(item.values);
                    var list_name = headerName+"_list";
			        $(`section #${list_name}`).append(`<li><span><i class="fa fa-trash" aria-hidden="true"></i></span>${new_todo}</li>`);
                });
            })
            // $("#add_bookmark").html(result.bookmark_contents);
        });

    });
}

function signOut(){
    event.preventDefault();
    var data = {};
    data['username'] = localStorage.username;
    // data['htmlContent'] = $("#add_bookmark").html();
    // console.log(data['htmlContent']);

    // client.connect(function(err, client){
    //     if(err)
    //         throw err;
    //     const db = client.db(dbName);
    //     const userCollection = db.collection('bookmark');
    //     // userCollection.save({'username':data['username'],'bookmark_contents':data['htmlContent']});
    //     userCollection.update({'username':data['username']},{$set:{'bookmark_contents':data['htmlContent']}},{ upsert: true});
    //     console.log("Update complete");
    // });
    resultset();
    localStorage.clear();
    window.location.replace('login.html')
}

$(document).ready(function(){
    var data = {};
    data['username'] = localStorage.username;
    // client.connect(function(err, client){
    //     if(err)
    //         throw err;
    //     const db = client.db(dbName);
    //     const userCollection = db.collection('bookmark');
    //     userCollection.findOne({'username':data['username']},function(err,result){
    //         if(err) throw err;
    //         // console.log(result.bookmark_contents);
    //         $("#add_bookmark").html(result.bookmark_contents);
    //     });

    // });
    resultget();

    $("#Save_bookmark").on( "submit", function( event ) {
        event.preventDefault();
       
        resultset();

        // client.connect(function(err, client){
        //     if(err)
        //         throw err;
        //     const db = client.db(dbName);
        //     const userCollection = db.collection('bookmark');
        //     // userCollection.save({'username':data['username'],'bookmark_contents':data['htmlContent']});
        //     userCollection.update({'username':data['username']},{$set:{'bookmark_contents':data['htmlContent']}},{ upsert: true});
        //     console.log("Update complete");
        // });
    });
});

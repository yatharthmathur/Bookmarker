
	// Adding Hyperlinks for Bookmarks with links
	function check_links(str) {
		var regex = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/ig;
		// Replace plain text links by hyperlinks
		var replaced_text = str.replace(regex, "<a href='$1' id='link' target='_blank'>$1</a>");
		return(replaced_text);
	}
	// Adds new list to the HTML page under the id add_bookmark
	function addNewList(){
		if($("#new_list_name").val()==""){
			console.log($("#new_list_name").val());
		}
		else{
			var new_bookmark_name = $("#new_list_name").val();
			var v = new_bookmark_name.replace(/\s/g, '');
			console.log($("#new_list_name").val());
			$("#add_bookmark").append(`<div class="card border-primary opacity_property mb-3 col-xs-6" id="${v}">
											<div class="card-header">
												<h4><span><img src="assets/images/trash.png" alt=""></span>${new_bookmark_name}</h4>
											</div>
											<div class="card-body text-dark" id="dynamic">
												<ul id="${v}_list"></ul>
											</div>
											<div class="card-footer bg-transparent border-dark">
												<input type="text" placeholder="Add New Todo">
											</div>
										</div>`);
		}
		$("#new_list_name").val("");
	}


	//function to run the add new list funtion when button is clicked
	$("#new_bookmark").click(function(){
		addNewList();
	});


	//function to run the add new list funtion when enter is pressed
	$("#new_list_name").keypress(function(e){
		if(e.which == 13){
			addNewList();
		}
	});


	//to add the done style to the todo
	$("section").on("click", "li", function(){
		$(this).toggleClass("completed");
	});
	

	//To delete a Todo
	$("section").on("click", "span", function(event){
		$(this).parent().fadeOut(500,function(){
			$(this).remove();
		});
		event.stopPropagation();
	});


	//To delete entire Todo list
	$("section").on("click", "h4 span", function(event){
		$(this).parent().parent().parent().fadeOut(500,function(){
			$(this).remove();
		});
		event.stopPropagation();
	});


	//adds a new todo tothe list
	$("section").on("keypress","input",function(e){
		if (e.which ==13){
			var new_todo = ($(this).val());
			new_todo = check_links(new_todo);
			$(this).val("");
			var list_name = $(this).parent().parent().attr("id")+"_list";
			$(`section #${list_name}`).append(`<li><span><img src="assets/images/trash.png" alt=""></span>${new_todo}</li>`);
		}
		//to check for links and make them hyperlinks
	});
	
	


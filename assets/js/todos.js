	function addNewList(){
		// var new_bookmark_name = prompt("Enter The new bookmark name:");
		if($("#new_list_name").val()==""){
			console.log($("#new_list_name").val());
		}
		else{
			var new_bookmark_name = $("#new_list_name").val();
			var v = new_bookmark_name.replace(/\s/g, '');
			console.log($("#new_list_name").val());
			$("#add_bookmark").append(`<div class="card border-primary opacity_property mb-3" id="${v}" style="max-width: 18rem;"><div class="card-header"><h4><span><img src="assets/images/trash.png" alt=""></span>${new_bookmark_name}</h4></button>
			</div><div class="card-body text-dark" id="dynamic"><ul id="${v}_list"></ul></div><div class="card-footer bg-transparent border-dark"><input type="text" placeholder="Add New Todo"></div></div>`);
		}
		$("#new_list_name").val("");
	}

	$("#new_bookmark").click(function(){
		addNewList();
	});

	$("#new_list_name").keypress(function(e){
		if(e.which == 13){
			addNewList();
		}
	});
	
	$("section").on("click", "li", function(){
		$(this).toggleClass("completed");
	});
	
	//Click on X to delete Todo
	$("section").on("click", "span", function(event){
		$(this).parent().fadeOut(500,function(){
			$(this).remove();
		});
		event.stopPropagation();
	});

	//Click on X to delete Todo Big list
	$("section").on("click", "h4 span", function(event){
		$(this).parent().parent().parent().fadeOut(500,function(){
			$(this).remove();
		});
		event.stopPropagation();
	});

	$("section").on("keypress","input",function(e){
		if (e.which ==13){
			var new_todo = ($(this).val());
			$(this).val("");
			var list_name = $(this).parent().parent().attr("id")+"_list";
			$(`section #${list_name}`).append(`<li><span><img src="assets/images/trash.png" alt=""></span>${new_todo}</li>`);
		}
	});
	
	


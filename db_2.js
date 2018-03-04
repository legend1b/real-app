var db = openDatabase('mytasks', '1.0', 'My Tasks', 5*1024*1024);
	
	function init() {
		db.transaction(function (tx){
			tx.executeSql('create table if not exists works(id integer primary key autoincrement, name text, description text)');
		});
	}
	function displayAll() {
		db.transaction(function (tx){
			tx.executeSql('select * from works', [],function(tx, results){
				var n = results.rows.length;
				var s = '<div class="row">';
				for(var i = 0; i <  n; i++){
					var work = results.rows.item(i);
					s +='<center>';
						s +='<div class="col-xs-6"><b><p style="word-wrap: break-word;border-left:3px solid #BC2F27;color:#BC2F27; font-size:17px;z-index:1;text-align:center;">' + work.name + '</p></b></div>';
						s +='<div class="col-xs-6"><b><p style="word-wrap: break-word;color:#BC2F27; font-size:17px;z-index:1;text-align:center;">' + work.description + '</p></b></div><br />';
                    
						s +='<a style="color:#BC2F27; text-decoration:none; font-size:15px;" href="#" onclick="del(' + work.id + ')">Delete</a> || <a style="color:#BC2F27; text-decoration:none; font-size:15px;" href="#" onclick="edit(' + work.id + ')">Edit</a><br />';
					s +='</center>';
				}
				s += '</div>';
				document.getElementById('result').innerHTML = s;
			});
		});
	}
	displayAll();
function add() {
	db.transaction(function (tx){
	var name = document.getElementById('workName').value;
	var description = document.getElementById('description').value;
        if(name=="" || description == ""){alert("fields are empty");}
        else{
		tx.executeSql('insert into works(name, description) values(?, ?)', [name, description], displayAll());
        }
	});
}
 
function del(id) {
	db.transaction(function (tx){
		//var result = confirm("Are you sure");
		//if (result == true){
		tx.executeSql('delete from works where id = ?', [id], displayAll());
		//}
	});
}
function edit(id) {
	db.transaction(function (tx){   
		tx.executeSql('select * from works where id = ?', [id], function (tx, results){
			var work = results.rows.item(0);
			document.getElementById('workName').value = work.name;
			document.getElementById('description').value = work.description;
			$(document).ready(function(){
                $("#cent").fadeIn("slow");
            });
		});
	});
}
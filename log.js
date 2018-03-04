document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    StatusBar.backgroundColorByHexString("#162230");
	}
 var db = openDatabase('mytasks', '1.0', 'My Tasks', 5*1024*1024);
	
	function init() {
		db.transaction(function (tx){
			tx.executeSql('create table if not exists papado(id integer primary key autoincrement, name text)');
		});
	}
	
	function displayAll() {
		db.transaction(function (tx){
			tx.executeSql('select * from papado', [],function(tx, results){
				var n = results.rows.length;
					if( n > 0){
            
	var p = "<input placeholder='Enter Password' style='margin-top:45%;border:0px;width:280px;height: 60px;background:rgba(225,225,225,0.2);padding-left:10px;color:#FFFFFF;font-size: 20px;' type='password' id = 'inp1'><br /><input id=save value='ENTER' type='button' onclick='log()'/>";
	 
					}
					else{
                       
	var p = "<input placeholder='Enter New Password' style='border:0px;margin-top: 45%;width:280px;height: 60px;background:rgba(225,225,225,0.2);padding-left:10px;color:#FFFFFF;font-size: 20px;' type='password' id = 'inp2'><br /><input placeholder='Confirm Password' style='border:0px;margin-top:25px;width:280px;height: 60px;background:rgba(225,225,225,0.2);padding-left:10px;color:#FFFFFF;font-size: 20px;' type='text' id = 'inp3'><br /><br /><input id='save' value='Set New Password' type='button' onclick='add()'>";
					}
				document.getElementById('result').innerHTML = p;
			});
		});
	}
	displayAll();
function add() {
	db.transaction(function (tx){
	var name2 = document.getElementById('inp2').value;
	var name3 = document.getElementById('inp3').value;
		if((name2 == name3) && (name2 != "") && (name3 != "")){
			tx.executeSql('insert into papado(name) values(?)', [name2], displayAll());
		}
		else{alert("error");}
		
	});
	setTimeout(function(){
if(!window.location.hash) {
       window.location = window.location + '#loaded2';
       window.location.reload();
     }
}, 500);
}
function log() {
	db.transaction(function (tx){
	var name4 = document.getElementById('inp1').value;
		if( name4 != ""){
			tx.executeSql('select * from papado', [],function(tx, results){
				var n = results.rows.length;
				for(var i = 0; i <  n; i++){
					var work = results.rows.item(i);
						s = work.name;
						if(name4 == s){
                    window.location.replace("store.html");
							
						}
						else{
							$(".alerts").text('Incorrect Password');
        		$(".pchange").show();
				   setTimeout(function(){
				$(".pchange").hide();
			}, 4000); 
				  $("#inp1").val('');

						}
				}
			});}
			else{
			$(".alerts").text('Empty Field');
        		$(".pchange").show();
				   setTimeout(function(){
				$(".pchange").hide();
			}, 4000);  
			}
	});
}
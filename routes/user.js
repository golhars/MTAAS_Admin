var mysql = require('./mysql');
var customer_search;
var tester_name1;
var get_tester;
var get_customer;
var customer_name;
var get_tester1;
var get_cust;
var tester_app_name;
/*
 * GET users listing.
 */
//var uname;
//LOGOUT FUNCTION
exports.logoutsession = function(req,res){
	console.log("checking logout");
	req.session.destroy();
	res.send({"status":200});
};

//MAINTAINING SESSION LOGIN
exports.checksession = function(req, res){
	console.log("checking session");
	console.log(req.session.uname);
	if(req.session.uname)
	{
		console.log("session is"+req.session.uname);
		res.send({"status":200});
	}
	else
	{
		res.send({"status":300});
	}
};
//login info
exports.username = function(req, res){
	console.log(req.session.uname);
	var myquery = "select * from smsm_login_tester where username = '"+req.session.uname+"' and status = 'pending'";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log(results);
			var jsonstr=JSON.stringify(results);
			console.log(jsonstr);
			console.log("Entry successfully fethced and displayed on GUI");
			//res.send(JSON.stringify(results));
			res.send({"result":jsonstr});
		}
	}, myquery);
};
//device info by monisha
exports.deviceinfo = function(req, res) {
	//console.log(req.param("experience","testingtype","testingtool","language"));
	var OS = req.param("os");
	var handset = req.param("handset");
	var myquery = "update smsm_tester_info set testing_technology= '"+OS+"', testing_handset= '" + handset+"' where username='"+req.session.uname+"'";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		}
		else {
			console.log("I am here in testerdetail function");
			res.render('index');
		}
	},myquery);
};
//tester details
exports.tester = function(req, res) {
	console.log("I m in tester detail");
	var testerExperience = req.param("experience");
	var testingType = req.param("testingtype");
	var testingTool = req.param("testingtool");
	var code_language = req.param("code_lang");
	var language = req.param("language");
	console.log("username in tester function:" + req.session.uname);
	var myquery = "insert into smsm_tester_info(username,experience,testing_type,testing_tool,language,coding_language) values ("+req.session.uname+",'"+testerExperience+"','" + testingType + "','" + testingTool + "','" + language + "','" + code_language+ "')";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		}
		else {
			console.log("I am here in tester function");
			res.render('index');
		}
	},myquery);
};
exports.bankdetail_tester = function(req, res) {
	var bank_name = req.param("bank_name");
	var account_name = req.param("account_name");
	var account_number = req.param("account_number");
	var myquery = "update smsm_tester_info set bank_name='"+bank_name+"',account_name='" + account_name + "',account_no='" + account_number+"' where username = '"+req.session.uname+"'";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		}
		else {
			console.log("I am here in bank tester function");
			res.render('testerdashboard');
		}
	},myquery);
};
exports.testerdetail = function(req, res) {
	console.log(req.param("experience","testingtype","testingtool","language"));
	var testerExperience = req.param("experience");
	var testingType = req.param("testingtype");
	var testingTool = req.param("testingtool");
	var language = req.param("language");
	var myquery= "update smsm_login_tester set tester_experience ="+testerExperience+",	 testing_type= '"+testingType+"', testing_tool= '"+ testingTool +"', testing_language= '"+ language +"' where username in ('"+req.session.uname+"')";
	mysql.fetchData(function(err, results) {
		var jsonstr=JSON.stringify(results);
		console.log("testing update:" + jsonstr);
		if (err) {
			throw err;
		} else {
			console.log("Update successfully made in smsm_login_tester table");
		}
	}, myquery);
};
exports.list = function(req, res){
	res.send("respond with a resource");
};
// CALLING HOME PAGE FROM LOGIN PAGE
exports.showlogin = function(req, res){
	res.render('home');

};
//CALLING LOGIN 

exports.login = function(req, res){
	res.render('login');
};



//Get Customer details in search page
exports.customerdetails = function(req, res){
	var getUser="select * from app_info";
	console.log("Query is:"+getUser);
	mysql.fetchData(function(err,results){
			if(!err){
				console.log(results);
				customer_search=results[0].customer_username;
				console.log("customer_search" + customer_search);
				var jsonstr=JSON.stringify(results);
				console.log("Successfully Fetched");
				res.send({"result":JSON.stringify(results)});
			}
			else {
				console.log(err);
			}
		}
		,getUser);
};
//fetch for test
exports.save_customer = function(req, res) {
	console.log(req.param("company_name", "company_email", "company_emp", "job_title", "in_phone"));
	var company_name = req.param("company_name");
	var company_email = req.param("company_email");
	var company_emp = req.param("company_emp");
	var job_title = req.param("job_title");
	var in_phone = req.param("in_phone");
	console.log("company_emp: " + company_emp);
	//var myquery = "insert into developersignup (firstname1,lastname1,email1,username1,password1, cpassword1, sex1,projecttype1,type1)values ('" + fname + "','" + lname + "','" + email + "','" + name + "','" + password + "','" + cpassword + "','" + sex + "','" + projecttype + "','" + projectname + "')";
	var myquery = "insert into smsm_customer_info(username,comp_name,no_employees,job_title,comp_pno,comp_email)values ('"+req.session.uname+"','" + company_name + "','" + company_emp + "','" + job_title + "','" + in_phone + "','" + company_email + "')";
};
exports.appinfo = function(req, res){
	var getUser="select * from app_info where status='submitted'";
	console.log("Query is: i am here inside appinfo");
	console.log("Query is:"+getUser);
	mysql.fetchData(function(err,results){
			if(!err){
				console.log("appinforesult" + results);
				var jsonstr=JSON.stringify(results);
				console.log("Successfully Fetched appinfo");
				res.send({"result":JSON.stringify(results)});
			}
			else {
				console.log(err);
			}
		}
		,getUser);
};
exports.currentapp = function(req, res){
	var getUser="select * from app_info where tester_username='"+req.session.uname+"' and status='pending'";
	console.log("Query is: i am here inside currentapp");
	console.log("Query is:"+getUser);
	mysql.fetchData(function(err,results){
			if(!err){
				console.log(results);
				var jsonstr=JSON.stringify(results);
				console.log("Successfully Fetched");
				res.send({"result":JSON.stringify(results)});
			}
			else {
				console.log(err);
			}
		}
		,getUser);
};
exports.testedapp = function(req, res){
	console.log("uname is:"+ req.session.uname);
	var getUser="select * from app_info where tester_username='"+req.session.uname+"'and status= 'completed'";
	console.log("Query is: i am here inside testedapp");
	console.log("Query is:"+getUser);
	mysql.fetchData(function(err,results){
			if(!err){
				console.log(results);
				var jsonstr=JSON.stringify(results);
				console.log("Successfully Fetched");
				res.send({"result":JSON.stringify(results)});
			}
			else {
				console.log(err);
			}
		}
		,getUser);
};
exports.tester_request = function(req, res){
	console.log("uname is:"+ req.session.uname);

	var getUser="select tester_username,app_name,customer_username from smsm_cloud.app_info";
	console.log("Query is: i am here inside tester_request");
	console.log("Query is:"+getUser);
	mysql.fetchData(function(err,results){
			if(!err){
				console.log(results);
				var jsonstr=JSON.stringify(results);
				console.log("Successfully Fetched");
				res.send({"result":JSON.stringify(results)});
			}
			else {
				console.log(err);
			}
		},getUser);
};

exports.app_mgr_info = function(req, res){
	console.log("uname is:"+ req.session.uname);
	console.log("guddu");
	var getUser="SELECT customer_username,app_name,tester_username,estimated_cost,total_cost,status FROM smsm_cloud.app_info";
	console.log("Query is: i am here inside testedapp");
	console.log("Query is:"+getUser);
	mysql.fetchData(function(err,results){
		if(!err){
			console.log(results);
			var jsonstr=JSON.stringify(results);
			console.log("Successfully Fetched");
			res.send({"result":JSON.stringify(results)});
		}
		else {
			console.log(err);
		}
	},getUser);
};
exports.acceptrequest = function(req, res){
	var in_accept =  req.param("acceptstatus");

	var getUser="update smsm_cloud.app_info set tester_username = '"+tester_name1+"',status='pending', tester_request= 'accepted',customer_manager='appmanager',tester_manager='testermanager',performance_manager='processmanager' where app_name='"+tester_app_name+"'";
	//var accept="update smsm_cloud.smsm_customer_info set customer_username ='"+customer_name+"' where tester_username = '"+tester_name+"'";
	console.log("Query is: i am here inside guddu");
	console.log("Query is:"+getUser);
	mysql.fetchData(function(err,results){
		if(!err){
			console.log(results);
			var jsonstr=JSON.stringify(results);
			console.log("Successfully Fetched");
			res.send({"result":JSON.stringify(results)});
		}
		else {
			console.log(err);
		}
	},getUser);
};
exports.rejectrequest= function(req, res){
	var in_reject = req.param("rejectstatus");
	var getUser="update smsm_cloud.smsm_customer_info set accept_reject = '"+in_reject+"' where username = '"+tester_name+"'";
	console.log("Query is: i am here inside testedapp");
	console.log("Query is:"+getUser);
	mysql.fetchData(function(err,results){
		if(!err){
			console.log(results);
			var jsonstr=JSON.stringify(results);
			console.log("Successfully Fetched");
			res.send({"result":JSON.stringify(results)});
		}
		else {
			console.log(err);
		}
	},getUser);
};
exports.customeragreement = function(req, res){
	console.log("uname is:"+ req.session.uname);
	var getUser="select * from smsm_tester_info where username='"+req.session.uname+"'";
	console.log("Query is: i am here inside testerinfo");
	console.log("Query is:"+getUser);
	mysql.fetchData(function(err,results){
			if(!err){
				console.log(results);
				var jsonstr=JSON.stringify(results);
				console.log("Successfully Fetched");
				res.send({"result":JSON.stringify(results)});
			}
			else {
				console.log(err);
			}
		}
		,getUser);
};

exports.fetch = function(req, res){
	//console.log("uname is:"+ req.session.uname);
	 get_tester= req.param("tester");
console.log(get_tester);

		};

exports.storecustomer = function(req, res){
	//console.log("uname is:"+ req.session.uname);
	get_customer= req.param("custname");
	console.log("get customer" +get_customer);

};

exports.testerinfo2 = function(req, res){
	//console.log("uname is:"+ req.session.uname);
	var getUser="select username,testing_type,testing_tool,coding_language,customer_rating from smsm_cloud.smsm_tester_info";
	console.log("Query is: i am here inside testerinfo");
	console.log("Query is:"+getUser);
	mysql.fetchData(function(err,results){
			if(!err){
				console.log(results);
				var jsonstr=JSON.stringify(results);
				console.log("Successfully Fetched");
				res.send({"result":JSON.stringify(results)});
			}
			else {
				console.log(err);
			}
		}
		,getUser);
};

exports.customerinfo = function(req, res){
	var getUser="select * from app_info where customer_username='"+customer_search+"'";
	//var getUser="select * from app_info where customer_username='megha'";
	console.log("Query is: i am here inside customerinfo");
	console.log("Query is:"+getUser);
	mysql.fetchData(function(err,results){
			if(!err){
				console.log(results);
				var jsonstr=JSON.stringify(results);
				console.log("Successfully Fetched");
				res.send({"result":JSON.stringify(results)});
			}
			else {
				console.log(err);
			}
		}
		,getUser);
};


//processfetch''
exports.processfetch = function(req, res){
	console.log("console username" + req.param("tester"));
	//var usnname = req.param("tester")
	var getTesterInfo="select * from smsm_tester_info where username='"+tester_name+"'";
	tester_name=req.param("tester");
	console.log("Query is:"+getTesterInfo);
	mysql.fetchData(function(err,results){
			if(!err){
				console.log(results);
				var jsonstr=JSON.stringify(results);
				console.log("Successfully Fetched");
				res.send({"result":JSON.stringify(results)});
			}
			else {
				console.log(err);
			}
		}
		,getTesterInfo);
	//console.log("testing process id: " +process_id);

};



//CALL TESTER MY PROJECT
exports.testerproject = function(req, res){
	res.render('testerproject');
};//CALL TESTER DASHBOARD
exports.testerdashboard = function(req, res){
	res.render('testerdashboard');
};//CALL TESTER PROFILE PAGE
exports.home3 = function(req, res){
	res.render('testerhome');
};
//CALL DEVELOPER DASHBOARD
exports.developerdashboard = function(req, res){
	res.render('developerdashboard');
};
/* TESTER DETAIL
 exports.testerdetail = function(req, res){
 res.render('testerdetail');
 };
 */
//Testerinfo1
exports.testerinfo1 = function(req, res){
	res.render('testerinfo1');
};

exports.index2 = function(req, res){
	res.render('index2');
};
exports.tester_admin = function(req, res){
	res.render('tester_admin');
};
exports.main_admin = function(req, res){
	res.render('main_admin');
};

//CALL DEVELOPER MY PROJECT
exports.developermyproject = function(req, res){
	res.render('developermyproject');
};
//CALL DEVELOPER PROFILE
exports.home2 = function(req, res){
	res.render('home');
};
// CALLING TESTER SIGNUP PAGE FROM  LOGIN PAGE
exports.showsignup = function(req, res){
	res.render('testersignup');
};
// CALLING DEVELOPER SIGNUP PAGE FROM  LOGIN PAGE
exports.showsignupd = function(req, res){
	res.render('developersignup');
};
//TERMS AND CONDITION PAGE			
exports.terms = function(req, res){
	res.render('terms');
};
//customerdashboard
exports.customerdetail = function(req, res) {
	res.render('customerdetail');
};
exports.customerview = function(req, res) {
	res.render('customerview');
};
//signin edited
exports.signin = function(req, res){
	console.log(req.param("name","password"));
	var name = req.param("name");
	var password = req.param("password");
	var myquery = "Select * from  smsm_login_admin where username = '"+name+"'and password='"+password+"' ";
	mysql.fetchData(function(err,results) {
		if (err) {
			throw err;
		}
		else if (results.length > 0) {
				req.session.uname = results[0].username;
				var role = results[0].mgr_role;
				if (role == 'appmanager') {

					res.send({"status": 199}); //testerdashboard
				}

				else if (role == 'performancemanager') {

					res.send({"status": 198}); //customerdashboard
				}
				else if (role == 'testmanager') {
					res.send({"status": 197}); //customersignup
				}
			    }


				else {
					console.log("Invalid User Name & Password");
					res.send({"status": 100});
				}
			},myquery);
};

//CUSTOMER SIGNUP
exports.signup_customer = function(req, res) {
	console.log(req.param("fname","mname", "lname", "email", "name", "phone", "password",
		"address1", "address2", "country", "state", "linkedin","zip"));
	var fname = req.param("fname");
	var mname = req.param("mname");
	var lname = req.param("lname");
	var email = req.param("email");
	var name = req.param("name");
	var phone = req.param("phone");
	var password = req.param("password");
	var address1 = req.param("address1");
	var address2 = req.param("address2");
	var country = req.param("country");
	var state = req.param("state");
	var zip = req.param("zip");
	var linkedin = req.param("linkedin");
	var myquery = "insert into smsm_login(username,password,email,First_Name,Middle_Name,Last_Name,Country,Phone,State, Address1, Address2, zip, linkedin_profile, active,role) values ('" + name + "','" + password + "','" + email + "','" + fname + "','" + mname + "','" + lname + "','" + country + "','" + phone + "','" + state + "','" + address1 + "','" + address2 + "','" + zip + "','" + linkedin + "','y','customer')";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("Entry successfully made in login table");
			res.render('login');
		}
	}, myquery);
};
//TESTER SIGNUP
exports.signup_tester = function(req, res) {
	console.log(req.param("fname","mname", "lname", "email", "name", "phone", "password",
		"address1", "address2", "country", "state", "linkedin","zip"));
	var fname = req.param("fname");
	var mname = req.param("mname");
	var lname = req.param("lname");
	var email = req.param("email");
	var name = req.param("name");
	var phone = req.param("phone");
	var password = req.param("password");
	var address1 = req.param("address1");
	var address2 = req.param("address2");
	var country = req.param("country");
	var state = req.param("state");
	var zip = req.param("zip");
	var linkedin = req.param("linkedin");
	var myquery = "insert into smsm_login(username,password,email,First_Name,Middle_Name,Last_Name,Country,Phone,State, Address1, Address2, zip, linkedin_profile, active,role) values ('" + name + "','" + password + "','" + email + "','" + fname + "','" + mname + "','" + lname + "','" + country + "','" + phone + "','" + state + "','" + address1 + "','" + address2 + "','" + zip + "','" + linkedin + "','y','tester')";

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("Entry successfully made in login table");
			res.render('login');
		}
	}, myquery);


};
//DEVELOPER SIGN UP PAGE

exports.developersignup = function(req, res) {
	console.log(req.param("fname", "lname", "email", "name", "password",
		"cpassword", "sex", "projecttype","projectname"));
	var fname = req.param("fname");
	var lname = req.param("lname");
	var email = req.param("email");
	var name = req.param("name");
	var password = req.param("password");
	var cpassword = req.param("cpassword");
	var sex = req.param("sex");
	var projecttype = req.param("projecttype");
	var projectname = req.param("projectname");
	var myquery = "insert into developersignup (firstname1,lastname1,email1,username1,password1, cpassword1, sex1,projecttype1,type1)values ('" + fname + "','" + lname + "','" + email + "','" + name + "','" + password + "','" + cpassword + "','" + sex + "','" + projecttype + "','" + projectname + "')";

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			var myquery2 = "insert into authenticate (username,passwordd)values ('" + name + "', '" + password + "')";

			mysql.fetchData(function(err, results) {
				if (err) {
					throw err;
				} else {
					console.log("Entry successfully made in authenticate table");
					res.render('login');
				}
			}, myquery2);
			console.log("Entry successfully made in developersignup table");
		}
	}, myquery);


};
//FETCH DATA FROM DATABASE
//<script> 
//Functions to open database and to create, insert data into tables

exports.home = function(req, res){
	console.log(req.session.uname);
	var myquery = "select * from testersignup where username = '"+req.session.uname+"'";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log(results);
			var jsonstr=JSON.stringify(results);
			console.log(jsonstr);
			console.log("Entry successfully fethced and displayed on GUI");
			//res.send(JSON.stringify(results));
			res.send({"result":jsonstr});
		}
	}, myquery);


};
exports.sendrating = function(req, res){

	console.log("Entry successfullymade in sendrequest");
	console.log(get_tester1);
	var rating_tester = req.param("manager_rating");
	//var myquery = "update app_info set tester_request = concat(tester_request, ' "+req.session.uname+"') where customer_username = '"+customer_search+"'";
	var myquery = "update smsm_tester_info set manager_rating = "+rating_tester+" where username='"+get_tester1+"'";

	//var myquery = "update smsm_tester_info set manager_rating = 7 where tester_username='"+'megha'+"'";

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("Entry successfully made manager rating table");
			//res.render('login');
		}
	}, myquery);

};
//******************************* MANAGER ADMIN ***************************************************
//login
exports.loginAdmin = function(req, res){
		var name = req.param("name");
		var password = req.param("password");
		console.log(req.param("name","password"));

		var myquery = "Select * from  smsm_login_admin where username = '"+name+"'and password='"+password+"' ";

		mysql.fetchData(function(err,results) {
		if (err) {
			throw err;
		}
		else if (results.length > 0) {
			//req.session.uname = results[0].username;
		var role = results[0].mgr_role;
			console.log(role);
			if (role == 'appmanager') {
				res.send({"status": 178});

			}

			else if (role == 'performancemanager') {
				res.send({"status": 179});


			}
			else if (role == 'testermanager') {
				res.send({"status": 180});

			}
		}


		else {
			console.log("Invalid User Name & Password");
			res.send({"status": 100});
		}
	},myquery);
};

//customerappinfo to appmanager


exports.apppayment = function(req, res){
	//console.log("uname is:"+ req.session.uname);
	var getappdetail="select app_name,customer_username,estimated_cost,total_cost,payment from smsm_cloud.app_info ";

	console.log("Query is:"+getappdetail);
	mysql.fetchData(function(err,results){
			if(!err){
				console.log(results);
				var jsonstr=JSON.stringify(results);
				console.log("Successfully Fetched");
				res.send({"result":JSON.stringify(results)});
			}
			else {
				console.log(err);
			}
		}
		,getappdetail);
};

exports.custinfo = function(req, res){

	var getappdetail="select customer_username,app_name, status from  app_info where app_name='"+get_customer+"'";

	mysql.fetchData(function(err,results){
			if(!err){
				console.log(results);
				var jsonstr=JSON.stringify(results);
				console.log("Successfully Fetched");
				res.send({"result":JSON.stringify(results)});
			}
			else {
				console.log(err);
			}
		}
		,getappdetail);
};

exports.ratecustomer = function(req, res){


	var getappdetail="select customer_username,app_name,rating smsm_cloud.smsm_customer_info";

	mysql.fetchData(function(err,results){
			if(!err){
				console.log(results);
				var jsonstr=JSON.stringify(results);
				console.log("Successfully Fetched");
				res.send({"result":JSON.stringify(results)});
			}
			else {
				console.log(err);
			}
		}
		,getappdetail);
};



exports.testerdetails = function(req, res) {
	res.render('testerdetails');
};

exports.testerdetail1 = function(req, res) {
	//console.log(req.param("experience","testingtype","testingtool","language"));
	console.log(tester_name);
	var myquery= "select username,testing_type,testing_tool,coding_language,experience,manager_rating from smsm_tester_info where username='"+tester_name+"'";
	mysql.fetchData(function(err, results) {
		var jsonstr=JSON.stringify(results);
		console.log("testing sekdfsf:" + jsonstr);
		if (err) {
			throw err;
		} else {
			console.log(" successfully made in smsm_login_tester table");
			res.send({"result":JSON.stringify(results)});
		}
	}, myquery);
};

exports.customerfetch = function(req, res){
	console.log("console username" + req.param("customer"));
	customer_name = req.param("customer");
	//var getTesterInfo="select * from smsm_tester_info where username='"+req.param("tester")+"'";
	var getappInfo="update app_info set customer_name='"+customer_name+"' where tester_name='"+tester_name+"'";
	//tester_name=req.param("tester");
	console.log("Query is:"+getappInfo);
	mysql.fetchData(function(err,results){
			if(!err){
				console.log(results);
				var jsonstr=JSON.stringify(results);
				console.log("Successfully Fetched");
				res.send({"result":JSON.stringify(results)});
			}
			else {
				console.log(err);
			}
		}
		,getappInfo);
	//console.log("testing process id: " +process_id);

};
exports.tester_log = function(req, res){
	console.log("inside tester log");

	var getloginfo="select tester_username,intime,outtime,workingdate from smsm_cloud.tester_log";
	console.log(getloginfo);
	mysql.fetchData(function(err,results){
			if(!err){
				console.log(results);
				//var jsonstr=JSON.stringify(results);
				console.log("Successfully Fetched");
				res.send({"result":JSON.stringify(results)});
			}
			else {
				console.log(err);
			}
		}
		,getloginfo);

};
exports.testerfetch1 = function(req, res) {
	//console.log("uname is:"+ req.session.uname);
	get_tester1 = req.param("tester");
	console.log(get_tester1);
	var myquery = "update smsm_tester_info set manager_rating = 7 where username='" + get_tester1 + "'";

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("Entry successfully made manager rating table");
			//res.render('login');
		}
	}, myquery);

};

exports.cusfetch1 = function(req, res){

	get_cust= req.param("customer");
	var rating = req.param("rating");
	console.log(get_cust);
	var myquery = "update smsm_customer_info set rating = "+rating+" where username='"+get_cust+"'";


	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("Entry successfully made customer rating table");
			//res.render('login');
		}
	}, myquery);

};
exports.testerfetch = function(req, res){
	console.log("console username" + req.param("tester"));
	tester_name1 = req.param("tester");

	var getTesterInfo= "update app_info set rating = 5 where username='"+get_cust+"'";
	//tester_name=req.param("tester");
	console.log("Query is:"+getTesterInfo);
	mysql.fetchData(function(err,results){
			if(!err){
				console.log(results);
				var jsonstr=JSON.stringify(results);
				console.log("Successfully Fetched");
				res.send({"result":JSON.stringify(results)});
			}
			else {
				console.log(err);
			}
		}
		,getTesterInfo);
	//console.log("testing process id: " +process_id);

};
exports.customerfetch = function(req, res){
	console.log("console username" + req.param("customer"));
	customer_name = req.param("customer");

	var getTesterInfo= "update smsm_customer_info set accept_reject='accepted' where username='"+customer_name+"'";
	//tester_name=req.param("tester");
	console.log("Query is:"+getTesterInfo);
	mysql.fetchData(function(err,results){
			if(!err){
				console.log(results);
				var jsonstr=JSON.stringify(results);
				console.log("Successfully Fetched");
				res.send({"result":JSON.stringify(results)});
			}
			else {
				console.log(err);
			}
		}
		,getTesterInfo);
	//console.log("testing process id: " +process_id);

};


exports.testerappinfo1 = function(req, res) {
tester_app_name = req.param("apps");
	console.log(tester_app_name);
};

exports.testerappinfo_display = function(req, res){

	//var getappdetail="select app_name,customer_username,status,total_cost,payment from smsm_cloud.app_info ";
//	var getappdetail= "SELECT t1."+tester_app_name+", t2.username FROM app_info t1 join smsm_tester_info t2 on t1.tester_request like concat('%',t2.username,'%')";

	var getappdetail= "SELECT t1.app_name, t2.username FROM app_info t1 join smsm_tester_info t2 on t1.tester_request like concat('%',t2.username,'%') where t1.app_name='"+tester_app_name+"'";

	console.log("Query is:"+getappdetail);
	mysql.fetchData(function(err,results){
			if(!err){
				console.log(results);
				var jsonstr=JSON.stringify(results);
				console.log("Successfully Fetched");
				res.send({"result":JSON.stringify(results)});
			}
			else {
				console.log(err);
			}
		}
		,getappdetail);
	//console.log("testing process id: " +process_id);

};

exports.appdisplay = function(req, res){

	var getappdetail="select app_name,customer_username,status,total_cost,payment from smsm_cloud.app_info where status = 'submitted'";
	//var getappdetail= "SELECT t1."+tester_app_name+", t2.username FROM app_info t1 join smsm_tester_info t2 on t1.tester_request like concat('%',t2.username,'%')";

	console.log("Query is:"+getappdetail);
	mysql.fetchData(function(err,results){
			if(!err){
				console.log(results);
				var jsonstr=JSON.stringify(results);
				console.log("Successfully Fetched");
				res.send({"result":JSON.stringify(results)});
			}
			else {
				console.log(err);
			}
		}
		,getappdetail);
	//console.log("testing process id: " +process_id);

};
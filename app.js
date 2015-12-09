var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path');

var app = express();

app.use(express.cookieParser());
app.use(express.session({secret:'Mtaas',duration:30*60*1000}));
// all environments
app.set('port', process.env.PORT || 3047);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
// development only
if ('development'  === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/loginAdmin',user.loginAdmin);
//app.get('/index2', user.index2);

app.get('/index2', function(req, res) {
    res.render('index2', { title: 'The index page!' })
});
app.get('/customerappinfo', function(req, res) {
    res.render('customerappinfo', { title: 'The application info page!' })
});
//app.get('/index2', routes.index);


app.post('/signup_tester',user.signup_tester);
app.get('/testerdashboard',user.testerdashboard);
app.get('/testerinfo2',user.testerinfo2);
app.get('/testerinfo1',user.testerinfo1);

app.get('/app_mgr_info',user.app_mgr_info);
app.get('/tester_request',user.tester_request);
app.get('/customeragreement',user.customeragreement);
app.post('/sendrating',user.sendrating);

app.post('/acceptrequest',user.acceptrequest);
app.post('/fetch',user.fetch);
app.post('/processfetch',user.processfetch);
app.post('/testerfetch',user.testerfetch);
app.post('/rejectrequest',user.rejectrequest);

app.post('/tester',user.tester);
app.post('/bankdetail_tester',user.bankdetail_tester);
app.post('/deviceinfo',user.deviceinfo);
app.get('/testedapp',user.testedapp);
app.get('/customerdetail',user.customerdetail);
app.post('/signup_customer',user.signup_customer);
app.post('/storecustomer',user.storecustomer);
app.post('/developersignup',user.developersignup);
app.post('/signin',user.signin);
app.post('/testerdetail',user.testerdetail);
app.get('/home', user.showlogin);
app.get('/login', user.login);
app.get('/shwsignup', user.showsignup);
app.get('/shwsignupd', user.showsignupd);
app.get('/terms', user.terms);
app.get('/username',user.username );
//app.get('/testerdetail', user.testerdetail);
app.get('/customerdetails', user.customerdetails);
app.get('/customerinfo', user.customerinfo);
app.get('/appinfo', user.appinfo);
app.post('/save_customer',user.save_customer);
app.get('/currentapp', user.currentapp);
//app.post('/sendrequest', user.sendrequest);
app.get('/customerview', user.customerview);
//app.get('/logout', user.logout);
app.get('/home1', user.home);
app.get('/checksession', user.checksession);
//app.get('/emails', user.emails);
app.get('/developerdashboard',user.developerdashboard);
app.get('/logoutsession',user.logoutsession);
//app.get('/checklogout', user.checklogout);
app.get('/developermyproject',user.developermyproject);
app.get('/home2',user.home2);
var MtaasRouteConfig = require('./routes/MtaasRouteConfig.js');
new MtaasRouteConfig(app);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//manager admin
app.get('/apppayment',user.apppayment);
app.get('/custinfo',user.custinfo);
app.get('/ratecustomer',user.ratecustomer);

app.get('/testerdetail1',user.testerdetail1);

app.post('/customerfetch',user.customerfetch);
app.get('/tester_log',user.tester_log);
app.post('/testerfetch1',user.testerfetch1);
app.post('/cusfetch1',user.cusfetch1);
app.post('/testerappinfo1',user.testerappinfo1);
app.get('/testerappinfo_display',user.testerappinfo_display);
app.get('/appdisplay',user.appdisplay);
function MtaasRouteConfig(app) {

    this.app = app;
    this.routeTable = [];
    this.init(); //methos to initialize
}


MtaasRouteConfig.prototype.init = function () {

    var self = this;

    this.addRoutes();
    this.processRoutes();


}


MtaasRouteConfig.prototype.processRoutes = function () {

    var self = this;

    self.routeTable.forEach(function (route) {

        if (route.requestType == 'get') {

            console.log(route);
            self.app.get(route.requestUrl, route.callbackFunction);
        }
        else if (route.requestType == 'post') {

            console.log(route);
            self.app.post(route.requestUrl, route.callbackFunction);
        }
        else if (route.requestType == 'delete') {

            console.log(route);
            self.app.delete(route.requestUrl, route.callbackFunction);
        }

    });
}


MtaasRouteConfig.prototype.addRoutes = function () {

    var self = this;

    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/signup',
        callbackFunction : function (request, response) {

            response.render('signup', { title : "Create Product Category" });
        }
    });

    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/customerdetail',
        callbackFunction : function (request, response) {

            response.render('customerdetail', { title : "Create Product Category" });
        }
    });

    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/index',
        callbackFunction : function (request, response) {

            response.render('index', { title : "Create Product Category" });
        }
    });
    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/serverdetails',
        callbackFunction : function (request, response) {

            response.render('serverdetails', { title : "Create Product Category" });
        }
    });
    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/serverdetails',
        callbackFunction : function (request, response) {

            response.render('serverdetails', { title : "Create Product Category" });
        }
    });
    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/index2',
        callbackFunction : function (request, response) {

            response.render('index2', { title : "Create Product Category" });
        }
    });


    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/testerinfo',
        callbackFunction : function (request, response) {

            response.render('testerinfo', { title : "Create Product Category" });
        }
    });

    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/login',
        callbackFunction : function (request, response) {

            response.render('login', { title : "Create Product Category" });
        }
    });
    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/application',
        callbackFunction : function (request, response) {

            response.render('application', { title : "Create Product Category" });
        }
    });
    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/tasks',
        callbackFunction : function (request, response) {

            response.render('tasks', { title : "Create Product Category" });
        }
    });
    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/calendar',
        callbackFunction : function (request, response) {

            response.render('calendar', { title : "Create Product Category" });
        }
    });
    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/customer',
        callbackFunction : function (request, response) {

            response.render('customer', { title : "Create Product Category" });
        }
    });
    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/testerdashboard',
        callbackFunction : function (request, response) {

            response.render('testerdashboard', { title : "Create Product Category" });
        }
    });

    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/testerprofile',
        callbackFunction : function (request, response) {

            response.render('testerprofile', { title : "Create Product Category" });
        }
    });
    //self.routeTable.push({
    //
    //    requestType : 'get',
    //    requestUrl : '/testerprofile',
    //    callbackFunction : function (request, response) {
    //
    //        response.render('testerprofile', { title : "Create Product Category" });
    //    }
    //});

    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/tester1',
        callbackFunction : function (request, response) {

            response.render('tester1', { title : "Create Product Category" });
        }
    });

    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/table',
        callbackFunction : function (request, response) {

            response.render('table', { title : "Create Product Category" });
        }
    });

    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/messages',
        callbackFunction : function (request, response) {

            response.render('messages', { title : "Create Product Category" });
        }
    });


    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/customerinfo',
        callbackFunction : function (request, response) {

            response.render('customerinfo', { title : "Create Product Category" });
        }
    });

    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/customerview',
        callbackFunction : function (request, response) {

            response.render('customerview', { title : "Create Product Category" });
        }
    });


    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/currentapplist',
        callbackFunction : function (request, response) {

            response.render('currentapplist', { title : "Create Product Category" });
        }
    });

    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/workingenvironment',
        callbackFunction : function (request, response) {

            response.render('workingenvironment', { title : "Create Product Category" });
        }
    });
    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/manager_app',
        callbackFunction : function (request, response) {

            response.render('manager_app', { title : "Create Product Category" });
        }
    });

    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/manager_performance',
        callbackFunction : function (request, response) {

            response.render('manager_performance', { title : "Create Product Category" });
        }
    });

    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/manager_tester',
        callbackFunction : function (request, response) {

            response.render('manager_tester', { title : "Admin Manager" });
        }
    });
    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/tester_admin',
        callbackFunction : function (request, response) {

            response.render('tester_admin', { title : "Tester Manager" });
        }
    });
    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/main_admin',
        callbackFunction : function (request, response) {

            response.render('main_admin', { title : "Performance Manager" });
        }
    });
    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/testerlog',
        callbackFunction : function (request, response) {

            response.render('testerlog', { title : "testerlog" });
        }
    });

    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/customer_perf',
        callbackFunction : function (request, response) {

            response.render('customer_perf', { title : "customer view for process manager" });
        }
    });
    self.routeTable.push({

        requestType : 'get',
        requestUrl : '/testerappinfo',
        callbackFunction : function (request, response) {

            response.render('testerappinfo', { title : "tester application info" });
        }
    });

}

module.exports = MtaasRouteConfig;
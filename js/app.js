/*global angular*/
/*global translations*/

(function ()
{
	var app = angular.module("ferienhaus", ["ngRoute"]);
	var languages = ["de", "fr", "en"];
	var links = ["haus", "dieulefit", "freizeit", "umgebung", "bilder", "kontakt", "impressum"];

	app.config([
    	"$routeProvider", function ($routeProvider)
    	{
    		$routeProvider
                .when("/home/:lang", { templateUrl: "views/home.html", controller: "HomeController" })
                .when("/haus/:lang", { templateUrl: "views/haus.html", controller: "HausController" })
                .when("/dieulefit/:lang", { templateUrl: "views/dieulefit.html", controller: "DieulefitController" })
                .when("/freizeit/:lang", { templateUrl: "views/freizeit.html", controller: "FreizeitController" })
                .when("/umgebung/:lang", { templateUrl: "views/umgebung.html", controller: "UmgebungsController" })
                .when("/bilder/:lang", { templateUrl: "views/galerie.html", controller: "BilderController" })
				.when("/kontakt/:lang", { templateUrl: "views/kontakt.html", controller: "KontaktController" })
				.when("/impressum/:lang", { templateUrl: "views/impressum.html", controller: "ImpressumController" })
                .otherwise({ redirectTo: "/home/de" });
    	}
	]);

	app.factory("translationService", function ()
	{
		var service = this;
		service.translations = translations;
		return {
			translate: function (namespace, id, language)
			{
                if(language === "")language = "de";
				return service.translations[namespace][id][language];
			}
		};
	});

	app.controller("NavigationController", [
    	"$http", "$scope", "$routeParams", "$location", "translationService", function ($http, $scope, $routeParams, $location, translationService)
    	{

    		$scope.getLanguage = function ()
    		{
    			var lang = $location.path().split("/");
    			return lang[lang.length - 1] === "" ? "de" : lang[lang.length - 1];
    		};

    		$scope.setSelectedTab = function (tab)
    		{
    		    $scope.selectedTab = tab;
    		    var navbar = document.getElementById("navigation");
    		    if (typeof navbar.attributes['aria-expanded'] !== "undefined") {
    		        $("#navigation").collapse('hide');
    		    }

    		};

    		$scope.tabClass = function (tab)
    		{
    			if ($scope.selectedTab === tab) {
    				return "active";
    			} else {
    				return "";
    			}
    		};

    		$scope.setLanguage = function (index)
    		{
    			$location.path("/" + links[$scope.selectedTab] + "/" + languages[index]);
    			$scope.language = $scope.getLanguage();
    		};

    		$scope.translate = function (id)
    		{
    			return translationService.translate("tabs", id, $scope.language);
    		}

    		$scope.language = $scope.getLanguage();
    		//$scope.selectedTab = 0;
    	}
	]);

	app.controller("HausController", [
    	"$http", "$scope", "$routeParams", "translationService", function ($http, $scope, $routeParams, translationService)
    	{
    		$scope.$parent.setSelectedTab(0);
    		$scope.translate = function (id)
    		{
    			return translationService.translate("ferienhaus", id, $routeParams.lang);
    		}
    	}
	]);

	app.controller("DieulefitController", [
    	"$http", "$scope", "$routeParams", "translationService", function ($http, $scope, $routeParams, translationService)
    	{
    		$scope.$parent.setSelectedTab(1);
    		$scope.language = $routeParams.lang;
    		$scope.translationService = translationService;

    		$scope.translate = function (id)
    		{
    			return translationService.translate("dieulefit", id, $scope.language);
    		}
    	}
	]);
	app.controller("FreizeitController", [
    	"$http", "$scope", "$routeParams", "translationService", function ($http, $scope, $routeParams, translationService)
    	{
    		$scope.$parent.setSelectedTab(2);
    		$scope.language = $routeParams.lang;
    		$scope.translationService = translationService;

    		$scope.translate = function (id)
    		{
    			return translationService.translate("freizeit", id, $scope.language);
    		}
    		$scope.sportTabelle = ["t1Item1", "t1Item2", "t1Item3","t1Item11", "t1Item4", "t1Item5", "t1Item6", "t1Item7", "t1Item8", "t1Item9","t1Item10"];
    		$scope.naturTabelle = ["t2Item1", "t2Item2", "t2Item3", "t2Item4", "t2Item5", "t2Item6", "t2Item7"];
    		$scope.kulturTabelle = ["t3Item1", "t3Item2", "t3Item3", "t3Item4", "t3Item5", "t3Item6"]

    	}
	]);
	app.controller("UmgebungsController", [
    	"$http", "$scope", "$routeParams", "translationService", function ($http, $scope, $routeParams, translationService)
    	{
    		$scope.$parent.setSelectedTab(3);
    		$scope.language = $routeParams.lang;
    		$scope.translationService = translationService;
    		$scope.translate = function (id)
    		{
    			return translationService.translate("umgebung", id, $scope.language);
    		}
    	}
	]);
	app.controller("BilderController", [
    	"$http", "$scope", "$routeParams", "translationService", function ($http, $scope, $routeParams, translationService)
    	{
    		$scope.$parent.setSelectedTab(4);
    		$scope.language = $routeParams.lang;
    		$scope.translationService = translationService;
    		$scope.translate = function (id) {
    		    if (id === "") return "";
    		    return translationService.translate("bilder", id, $scope.language);
    		}
    	}
	]);
	app.controller("KontaktController", [
    	"$http", "$scope", "$routeParams", "translationService", function ($http, $scope, $routeParams, translationService)
    	{
    		$scope.$parent.setSelectedTab(5);
    		$scope.language = $routeParams.lang;
    		$scope.translationService = translationService;
    		$scope.translate = function (id)
    		{
    			return translationService.translate("kontakt", id, $scope.language);
    		}
    		$scope.anreiseTabelle = ["t1Item1", "t1Item2", "t1Item3", "t1Item4"];
    		$scope.tarifTabelle = ["t2Item1", "t2Item2", "t2Item3", "t2Item4", "t2Item5"];
    	}
	]);
	app.controller("HomeController", [
    	"$http", "$scope", "$routeParams", "translationService", function ($http, $scope, $routeParams, translationService)
    	{
    		$scope.language = $routeParams.lang;
    		$scope.translationService = translationService;
    		$scope.translate = function (id)
    		{
    			return translationService.translate("haus", id, $scope.language);
    		}
    		$scope.$parent.setSelectedTab(-1);
    	}
	]);
	app.controller("ImpressumController", [
    	"$http", "$scope", "$routeParams", "translationService", function ($http, $scope)
    	{
    		$scope.$parent.setSelectedTab(6);
    	}
	]);
})();
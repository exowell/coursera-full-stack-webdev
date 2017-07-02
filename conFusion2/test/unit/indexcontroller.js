xdescribe('Controller: IndexController, menuFactory:dishes', function () {

  // load the controller's module
  beforeEach(module('confusionApp'));

  var IndexController, scope, $httpBackend;

  //resolve karma - ui.router conflict
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$httpBackend_, $rootScope, menuFactory, corporateFactory) {

    // place here mocked dependencies
    $httpBackend = _$httpBackend_;

    $httpBackend.expectGET("http://localhost:3000/dishes").respond([
      {
        "id": 0,
        "name": "Uthapizza",
        "image": "images/uthapizza.png",
        "category": "mains",
        "label": "Hot",
        "price": "4.99",
        "description": "A",
        "comments": [{}]
      }
      ]);

    scope = $rootScope.$new();
    IndexController = $controller('IndexController', {
      $scope: scope,
      menuFactory: menuFactory,
      corporateFactory: corporateFactory
    });
    $httpBackend.flush();

  }));


  it('should fetch and show dish 0', function(){

      expect(scope.show.featuredDish).toBeTruthy();
      expect(scope.featuredDish).toBeDefined();
      expect(scope.featuredDish.name).toBe("Utahpizza");

  });


});

xdescribe('Controller: IndexController, menuFactory:promotions', function () {

  // load the controller's module
  beforeEach(module('confusionApp'));

  var IndexController, scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$httpBackend_, $rootScope, menuFactory, corporateFactory) {

    // place here mocked dependencies
    $httpBackend = _$httpBackend_;

    $httpBackend.expectGET("http://localhost:3000/promotions").respond([
      {
        "id": 0,
        "name": "Weekend Grand Buffet",
        "image": "images/buffet.png",
        "label": "New",
        "price": "19.99",
        "description": "Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person "
      }
      ]);

    scope = $rootScope.$new();
    IndexController = $controller('IndexController', {
      $scope: scope,
      menuFactory: menuFactory,
      corporateFactory: corporateFactory
    });
    $httpBackend.flush();

  }));

  it('should fetch and show promotion 0', function() {

      expect(scope.show.featuredPromotion).toBeTruthy();
      expect(scope.featuredPromotion).toBeDefined();
      expect(scope.featuredPromotion.name).toBe("Weekend Grand Buffet");

  });


});

xdescribe('Controller: IndexController, corporateFactory:leadership', function () {

  // load the controller's module
  beforeEach(module('confusionApp'));

  var IndexController, scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$httpBackend_, $rootScope, menuFactory, corporateFactory) {

    // place here mocked dependencies
    $httpBackend = _$httpBackend_;

    $httpBackend.expectGET("http://localhost:3000/leadership").respond([
      {
        "id": 0,
        "name": "Peter Pan",
        "image": "images/alberto.png",
        "designation": "Chief Epicurious Officer",
        "abbr": "CEO",
        "description": "Our CEO, Peter, credits his hardworking East Asian immigrant parents who undertook the arduous journey to the shores of America with the intention of giving their children the best future. His mother's wizardy in the kitchen whipping up the tastiest dishes with whatever is available inexpensively at the supermarket, was his first inspiration to create the fusion cuisines for which The Frying Pan became well known. He brings his zeal for fusion cuisines to this restaurant, pioneering cross-cultural culinary connections."
      },
      {
        "id": 1,
        "name": "Dhanasekaran Witherspoon",
        "image": "images/alberto.png",
        "designation": "Chief Food Officer",
        "abbr": "CFO",
        "description": "Our CFO, Danny, as he is affectionately referred to by his colleagues, comes from a long established family tradition in farming and produce. His experiences growing up on a farm in the Australian outback gave him great appreciation for varieties of food sources. As he puts it in his own words, Everything that runs, wins, and everything that stays, pays!"
      },
      {
        "id": 2,
        "name": "Agumbe Tang",
        "image": "images/alberto.png",
        "designation": "Chief Taste Officer",
        "abbr": "CTO",
        "description": "Blessed with the most discerning gustatory sense, Agumbe, our CFO, personally ensures that every dish that we serve meets his exacting tastes. Our chefs dread the tongue lashing that ensues if their dish does not meet his exacting standards. He lives by his motto, You click only if you survive my lick."
      },
      {
        "id": 3,
        "name": "Alberto Somayya",
        "image": "images/alberto.png",
        "designation": "Executive Chef",
        "abbr": "EC",
        "description": "Award winning three-star Michelin chef with wide International experience having worked closely with whos-who in the culinary world, he specializes in creating mouthwatering Indo-Italian fusion experiences. He says, Put together the cuisines from the two craziest cultures, and you get a winning hit! Amma Mia!"
      }
    ]);

    scope = $rootScope.$new();
    IndexController = $controller('IndexController', {
      $scope: scope,
      menuFactory: menuFactory,
      corporateFactory: corporateFactory
    });
    $httpBackend.flush();

  }));

  it('should fetch and show executive chef', function(){

      expect(scope.show.executiveChef).toBeTruthy();
      expect(scope.executiveChef).toBeDefined();
      expect(scope.executiveChef.name).toBe("Alberto Somayya");

  });


});

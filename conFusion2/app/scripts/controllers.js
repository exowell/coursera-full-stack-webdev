'use strict';

angular.module('confusionApp')

  .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showMenu = false;
    $scope.message = "Loading ...";
    menuFactory.getDishes().query(
        function(response) {
            $scope.dishes = response;
            $scope.showMenu = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        });


    $scope.select = function (setTab) {
      $scope.tab = setTab;

      if (setTab === 2) {
        $scope.filtText = "appetizer";
      } else if (setTab === 3) {
        $scope.filtText = "mains";
      } else if (setTab === 4) {
        $scope.filtText = "dessert";
      } else {
        $scope.filtText = "";
      }
    };

    $scope.isSelected = function (checkTab) {
      return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
      $scope.showDetails = !$scope.showDetails;
    };
        }])

  .controller('ContactController', ['$scope', function ($scope) {

    $scope.feedback = {
      mychannel: "",
      firstName: "",
      lastName: "",
      agree: false,
      email: ""
    };

    var channels = [{
      value: "tel",
      label: "Tel."
    }, {
      value: "Email",
      label: "Email"
    }];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

        }])

  .controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {
    $scope.feedbackSubmitted = false;
    $scope.submitSuccessful = false;

    $scope.sendFeedback = function () {
      $scope.feedbackSubmitted = false;
      if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
        $scope.invalidChannelSelection = true;
      } else {
        feedbackFactory.getFeedback().save($scope.feedback).$promise.then(
          function (){
            $scope.feedbackSubmitted = true;
            $scope.submitSuccessful = true;
            //reset form if the submit was successful
            $scope.invalidChannelSelection = false;
            $scope.feedback = {
              mychannel: "",
              firstName: "",
              lastName: "",
              agree: false,
              email: ""
            };
            $scope.feedback.mychannel = "";
            $scope.feedbackForm.$setPristine();
          },
          function (){
            $scope.feedbackSubmitted = true;
            $scope.submitSuccessful = false;
          }
        );
      }
    };
        }])

  .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {

    $scope.showDish = false;
    $scope.message="Loading ...";
    $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
    .$promise.then(
                    function(response){
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
    );

  }])

  .controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

    var defaultComment = function () {
      return {
        rating: "5",
        comment: "",
        author: "",
        date: ""
      };
    };

    $scope.comment = defaultComment();

    $scope.submitComment = function () {

      $scope.comment.date = new Date().toISOString();
      $scope.dish.comments.push($scope.comment);
      menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
      $scope.commentForm.$setPristine();
      $scope.comment = defaultComment();
    };
        }])

  // implement the IndexController and About Controller here
  .controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory',
  function ($scope, corporateFactory, menuFactory) {
    $scope.show = {};
    $scope.message = {};
    var pageItems = ['featuredPromotion', 'featuredDish', 'executiveChef'];
    pageItems.forEach(function (item){
      $scope.show[item] = false;
      $scope.message[item] = 'Loading...';
    });
    $scope.featuredPromotion = menuFactory.getPromotions().get({id:0})
      .$promise.then(
        function (response){
          $scope.featuredPromotion = response;
          $scope.show.featuredPromotion = true;
        },
        function(response) {
            $scope.message.featuredPromotion = "Error: "+response.status + " " + response.statusText;
        }
      );
    $scope.executiveChef = corporateFactory.getLeaders().get({id: 3})
      .$promise.then(
        function(response){
          $scope.executiveChef = response;
          $scope.show.executiveChef = true;
        },
        function(response){
          $scope.message.executiveChef = "Error: "+response.status + " " + response.statusText;
        }
      );
    $scope.featuredDish = menuFactory.getDishes().get({id:0})
    .$promise.then(
        function(response){
            $scope.featuredDish = response;
            $scope.show.featuredDish = true;
        },
        function(response) {
            $scope.message.featuredDish = "Error: "+response.status + " " + response.statusText;
        }
    );
  }])

  .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
    $scope.showLeaders = false;
    $scope.message = 'Loading...';
    $scope.leaders = corporateFactory.getLeaders().query(
      function (response){
        $scope.leaders = response;
        $scope.showLeaders = true;
      },
      function (response){
        $scope.message = "Error: "+response.status + " " + response.statusText;
      }
    );
  }])


;

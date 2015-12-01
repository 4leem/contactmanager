var app = angular.module('contactsMgr',['ngRoute']);

// Route Configurations
app.config(function($routeProvider) {
	$routeProvider.
	when('/',{
		templateUrl:'views/contacts.html'
	}).
	when('/contacts/new',{
		templateUrl: 'views/contact-form.html',
		controller: 'addContactCtrl'
	}).
	when('/contacts/delete/:id',{
		templateUrl: 'views/contacts.html',
		controller: 'rmContactCtrl'
	}).
	when('/contacts/edit/:id',{
		templateUrl: 'views/contact-form.html',
		controller: 'editContactCtrl'
	}).
	otherwise({redirectTo:'/'})
});

//Initialize and show all available contacts
app.controller('renderContacts',['$scope',function($scope) {
	$scope.contacts = {
		contacts: [
		{
			id: 1,
			name : 'Terrence S. Hatfield',
			tel: '651-603-1723',
			email: 'TerrenceSHatfield@rhyta.com'
		},
		{
			id: 2,
			name : 'Chris M. Manning',
			tel: '513-307-5859',
			email: 'ChrisMManning@dayrep.com'
		},
		{
			id: 3,
			name : 'Ricky M. Digiacomo',
			tel: '918-774-0199',
			email: 'RickyMDigiacomo@teleworm.us'
		},
		{
			id: 4,
			name : 'Michael K. Bayne',
			tel: '702-989-5145',
			email: 'MichaelKBayne@rhyta.com'
		},
		{
			id: 5,
			name : 'John I. Wilson',
			tel: '318-292-6700',
			email: 'JohnIWilson@dayrep.com'
		}
		]
	};
}]);

// Add a new contact info
app.controller('addContactCtrl',['$scope','$location',function($scope,$location) {
	$scope.contacts;
	$scope.isNew = true;
	$scope.isEdit = false;
	$scope.addContact = function () {
		var newContDetail = $scope.contact,
			maxID = Math.max.apply(Math,$scope.contacts.contacts.map(function(o){return o.id;}));
		newContDetail.id = maxID+1;
		$scope.contacts.contacts = $scope.contacts.contacts.concat(newContDetail);
		$location.path('/'); 
	};
}]);

// Delete a contact
app.controller('rmContactCtrl',['$scope','$routeParams', '$location',function($scope,$routeParams,$location) {
	var contact = $scope.contacts.contacts.filter(function(item){ return(item.id==$routeParams.id)})[0],
		index = $scope.contacts.contacts.indexOf(contact);
	$scope.contacts.contacts.splice(index, 1);
	$location.path('/'); 
}]);

// Edit a contact - not working as expected
app.controller('editContactCtrl',['$scope','$routeParams', '$location',function($scope,$routeParams,$location) {
	var contact = $scope.contacts.contacts.filter(function(item){ return(item.id==$routeParams.id)})[0];
	$scope.isNew = false;
	$scope.isEdit = true;
	$('input[name="name"]').val(contact.name);
	// $scope.myName = contact.name;
	// console.log($scope.myName);
	$('input[name="email"]').val(contact.email);
	$('input[name="telephone"]').val(contact.tel);
}]);

//New filter for showing profile images randomly
app.filter('randomize', function() {
	return function(input, scope) {
		if (input!=null && input!=undefined && input > 1) {
			return Math.floor((Math.random()*input)+1);
		}  
	}
});

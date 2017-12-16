(function() {

    angular
        .module('airplaneApp')
        .controller('weatherCtrl', weatherCtrl);

    weatherCtrl.$inject = ['$scope', 'SelectedData', 'DarkskyWeather'];

    function weatherCtrl($scope, SelectedData, DarkskyWeather) {

        var vm = this;
        console.log(window.location);

        vm.content = "Weather";

        vm.selectedDepartureICAO = "";
        vm.selectedArrivalICAO = "";
        vm.selectedWeight = "";

        //check selected Departure
        if (SelectedData.selectedDepartureICAO !== null) {
            vm.selectedDepartureICAO = SelectedData.selectedDepartureICAO;
        }
        
        //check selected Arrival
        if (SelectedData.selectedArrivalICAO !== null) {
            vm.selectedArrivalICAO = SelectedData.selectedArrivalICAO;
        }

        //check selected weight
        if (SelectedData.selectedWeight !== null) {
            vm.selectedWeight = SelectedData.selectedWeight;
        }

        //refactored for Angular 1.6 - removed success/error, used Promises...
        vm.getDepartureWeather = function() {
            
             if(navigator.geolocation){
			        navigator.geolocation.getCurrentPosition(showLocation);
		     }else{
			console.log('Geolocation is not supported by this browser.');
		     }
		
    		function showLocation(position){
        		var latitude = position.coords.latitude;
        		console.log("latitude: " + latitude);
        		
        		//document.getElementById('latitude')
        		//	.setAttribute('value', latitude);
        		var longitude = position.coords.longitude;
        		console.log("longitude: " + longitude);
        	
        		//document.getElementById('<?php echo $this->get_field_id( 'darksky_api_lon' ); ?>')
        		//	.setAttribute('value', longitude);
    	    	
			
		 
           /* 
            var lat = "22.396428";
            console.log(lat);
            var lon = "114.109497";
            console.log(lon);            
*/
            DarkskyWeather.getWeather(latitude, longitude)
                .then(function(response) {
                    vm.departureWeather = response.data;
                    console.log(vm.departureWeather);
                })
                .catch(function(e) {
                    console.log(e);
                });
        }
    };

        //refactored for Angular 1.6 - removed success/error, used Promises...        
        /*vm.getArrivalWeather = function() {
            
            var lat = vm.selectedArrivalICAO.airportLat;
            var lon = vm.selectedArrivalICAO.airportLon;

            //refactored for Angular 1.6 - removed success/error, used Promises...
            DarkskyWeather.getWeather(lat, lon)
                .then(function(response) {
                    vm.arrivalWeather = response.data;
                    console.log(vm.arrivalWeather);
                })
                .catch(function(e) {
                    console.log(e);
                });
        }*/
        
        //call services
        vm.getDepartureWeather();
        //vm.getArrivalWeather();

    }

})();

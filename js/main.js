var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();

var date = d.getFullYear() + '-' +
    ((''+month).length<2 ? '0' : '') + month + '-' +
    ((''+day).length<2 ? '0' : '') + day; 

 

 $(document).ready(() => {
 	$('#searchForm').on('submit', (e) => {
 		let searchText = $('#searchText').val();
 		getWeather(searchText);
 		getForecast(searchText);
 		e.preventDefault();
 	});

 	$('#button').click(function() {
 		let searchText = $('#searchText').val();
 		getWeather(searchText);
 		getForecast(searchText);

});

 });


	function getForecast(searchText) {
 	axios.get('http://api.openweathermap.org/data/2.5/forecast?q='+searchText+'&appid=716e35cf4af76185fe5f0565fa0a1583&type=accurate&units=metric&cnt=40')
 	.then((response) => {
 		console.log(response);

 			forecastInfo = response.data;
		
		})

 	.catch((err) => {
 		console.log(err);
 	})

 } 


 function getWeather(searchText) {
 	axios.get('http://api.openweathermap.org/data/2.5/weather?q='+searchText+'&appid=716e35cf4af76185fe5f0565fa0a1583&type=accurate&units=metric')
 	.then((response) => {
 		

 		let weatherInfo = response.data;
 		let output = `
		
			<p> Weather forecast : ${weatherInfo.name} </p>
			
			<div style="margin-top: 30px" class="row">
				<div class="col-md-4">
					<h2>Today</h2>
					<h6 id="date">${date}</h6>
					<img src="http://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png">
					<h6>${weatherInfo.weather[0].main} , ${weatherInfo.weather[0].description}</h6>
					<h5>${weatherInfo.main.temp} °C</h5>
					
					<div class="container">
					<div class="row py-3">
						<div class="col-md-6 list-group-item">
							Humidity: ${weatherInfo.main.humidity} %
						</div>

						<div class="col-md-6 list-group-item">
							Wind: ${weatherInfo.wind.speed} km/h
						</div>

						<div class="col-md-6 list-group-item">
							Pressure: ${weatherInfo.main.pressure} hPa
						</div>
						<div class="col-md-6 list-group-item">
							Clouds: ${weatherInfo.clouds.all} %
						</div>

						<div class="col-md-6 list-group-item">
							Temp(Max): ${weatherInfo.main.temp_max} °C
						</div>

						<div class="col-md-6 list-group-item">
							Temp(Min): ${weatherInfo.main.temp_min} °C
						</div>
						</div>
					</div>
				</div>
				<div class="col-md-8 py-4 my-5">
					<h5 class="text-primary" style="margin-left: 40px;"> ${weatherInfo.name} : 5 Day Forecast</h5>
					<ul>
						<li class="list-group-item"><strong>${forecastInfo.list[6].dt_txt}</strong> &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;      ${forecastInfo.list[6].main.temp} °C</li>
						<li class="list-group-item"><strong>${forecastInfo.list[14].dt_txt}</strong> &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;      ${forecastInfo.list[14].main.temp} °C</li>
						<li class="list-group-item"><strong>${forecastInfo.list[22].dt_txt}</strong> &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;       ${forecastInfo.list[22].main.temp} °C</li>
						<li class="list-group-item"><strong>${forecastInfo.list[30].dt_txt}</strong> &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;      ${forecastInfo.list[30].main.temp} °C</li>
						<li class="list-group-item"><strong>${forecastInfo.list[37].dt_txt}</strong> &nbsp;   &nbsp; &nbsp; &nbsp; &nbsp;      ${forecastInfo.list[37].main.temp} °C</li>
						


					</ul>
				</div>
			</div> 

		  </div>
		  
		</div>
  	</div>

 		`;
 		
 	
 		$("#output").html(output);
 		})

 	.catch((err) => {
 		console.log(err);
 	})

 } 

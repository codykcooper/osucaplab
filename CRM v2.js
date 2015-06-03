/**
 * jspsych-single-stim
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/

(function($) {
	jsPsych["CRM"] = (function() {

		var plugin = {};

		plugin.create = function(params) {

			params = jsPsych.pluginAPI.enforceArray(params, ['stimuli', 'choices']);

			var trials = new Array(1);
			for (var i = 0; i < trials.length; i++) {
				trials[i] = {};
				trials[i].a_path = params.stimuli[i];
				trials[i].choices = params.choices || [];
				// optional parameters
				trials[i].is_html = (typeof params.is_html === 'undefined') ? false : params.is_html;
				trials[i].high = (typeof params.high === 'undefined') ? 100 : params.high;
				trials[i].low = (typeof params.low === 'undefined') ? 0: params.low;
				trials[i].prompt = (typeof params.prompt === 'undefined') ? "" : params.prompt;
			}
			return trials;
		};
		
		plugin.trial = function(display_element, trial) {
			// if any trial variables are functions
			// this evaluates the function and replaces
			// it with the output of the function
			trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
			// store response
			var response = {y: 0, time: -1};
			var rating = [];
			var rating_time = [];
			var v;
			// this array holds handlers from setTimeout calls
			// that need to be cleared if the trial ends early
			var setTimeoutHandlers = [];

			// display stimulus
				display_element.append($('<div>', {
					html: trial.a_path,
					id: 'video'
					}));
					$('#video').css({//sets the display elements of the first prompt should be approximately in the middle of screen
						top : '10%',
						'margin-left': 'auto',
						'margin-right': 'auto',
						left: 0,
						right: 0,
						width:750,
						height:640,
						position:'absolute'
					});

			//show prompt if there is one
			if (trial.prompt !== "") {
			$("#video").append($('<div>', {
			html: trial.prompt,
			"id": 'question'
			}));
			$('#question').css({//sets the display elements of the first prompt should be approximately in the middle of screen
				top : 250,
				'margin-left': 'auto',
				'margin-right': 'auto',
				left: 0,
				right: 0,
				width: '400px',
				height: '65px',
				'text-align':'center',
				'font-size':'25px',
				position:'absolute'
			});
			}
		
			// add the line for the scale
			$("#video").append($('<canvas>', {
			"id": 'line'
			}));
			$('#line').css({//sets the display elements of the first prompt should be approximately in the middle of screen
				top : '55%',
				left: '0%',
				width:700,
				height:10,
				"background-color":"gray",
				position:'absolute'
			});
			// The bar for the rating (moving thingy)
			$("#video").append($('<canvas>', {
			"id": 'bar'
			}));
			$('#bar').css({//sets the display elements of the first prompt should be approximately in the middle of screen
				top : '52.5%',
				left: '0%',
				width:100,
				height:100,
				position:'absolute'
			});
			//add bar to be moved around line by sub
			var c = document.getElementById("bar");
			var ctx = c.getContext("2d");
			function drawbar(){
			ctx.beginPath();
			ctx.lineWidth = "4";
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, 25, 60);
			ctx.font = "50px Verdana";
			ctx.fillText(response.y,0,100);
			ctx.stroke();
			}
			drawbar();
			
			//************************ slider functions*****************************
			// taken from http://plnkr.co/edit/kjEMr49wI0YFMQsf0iuC?p=preview
			function leftArrowPressed() {
            var element = document.getElementById("bar");//Draw a small square?
            if(response.y-1!=trial.low-1){
			// the number subtracted needs to be line width / 100
			element.style.left = parseInt(element.style.left) - 7 + 'px';
			response.y = response.y-1;
			ctx.clearRect(0, 0, 100, 100);// remove bar
			drawbar();
			}
			}
            function rightArrowPressed() {
            var element = document.getElementById("bar");
			if(response.y+1!=trial.high+1){
			// the number subtracted needs to be line width / 100
            element.style.left = parseInt(element.style.left) + 7 + 'px';
			response.y=response.y+1;
			ctx.clearRect(0, 0, 100, 100);// remove bar
			drawbar();
			}
            }
			// move funtion
			function moveSelection(evt) {
                switch (evt.keyCode) {
                    case 37:
                    leftArrowPressed();
                    break;
                    case 39:
                    rightArrowPressed();
                    break;
                    }
                }
				
				$(document).keydown(moveSelection);
				sample_timer=setInterval(function() {//acts as timer for sampling rate
								rating.push(response.y);
								rating_time.push(document.getElementById("video").childNodes[0].currentTime);//
								v = document.getElementById("video").childNodes[0].ended;
								//alert(v);
								end_all();
							}, 1000);//sample the cursor position every second
			// function to end trial when it is time
		function end_all(){
			if(v){
				// kill any remaining setTimeout handlers
				for (var i = 0; i < setTimeoutHandlers.length; i++) {
					clearTimeout(setTimeoutHandlers[i]);
				}

				// kill keyboard listeners
				$(document).unbind('keydown', moveSelection);
					
				// gather the data to store for the trial
				var trial_data = {
					"rating_time": rating_time.join('-'),
					"stimulus": trial.a_path,
					"rating": rating.join('-')
				};

				jsPsych.data.write(trial_data);

				// clear the display
				display_element.html('');

				// move on to the next trial
				jsPsych.finishTrial();
			}
			}

		};

		return plugin;
	})();
})(jQuery);

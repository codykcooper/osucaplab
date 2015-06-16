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
				position:'absolute',
				'-moz-user-select':'-moz-none',
				'-o-user-select':'none',
				'-khtml-user-select':'none', /* you could also put this in a class */
				'-webkit-user-select':'none',/* and add the CSS class here instead */
				'-ms-user-select':'none',
				'user-select':'none'
			});
			}
		
		$("#video").append($('<div>', {
			"class": "test-result",
			"id":"test-result",
			html:'0'
			}));
			$('.test-result').css({//sets the display elements of the first prompt should be approximately in the middle of screen
				position:'absolute',
				top:'10px',
				left:'50%',
				'line-height':5,
							});
			// add the line for the scale
			$("#video").append($('<div>', {
			"id":"range-slider"
			}));
			$("#range-slider").append( "<span></span>");
			$('#range-slider').css({//sets the display elements of the first prompt should be approximately in the middle of screen
				width:'100%',
				left:'0%',
				top:'70px',
				height:'20px',
				position:'relative',
				margin:'0 auto 1em',
				cursor:'e-resize',
				content:"",
				'-moz-user-select':'-moz-none',
				'-o-user-select':'none',
				'-khtml-user-select':'none', /* you could also put this in a class */
				'-webkit-user-select':'none',/* and add the CSS class here instead */
				'-ms-user-select':'none',
				'user-select':'none'
			});
			
			$('#range-slider').prev().css({	
				content:"",
				display:'block',
				width:'100%',
				top:'85px',
				position:'relative',
				left:0,
				height:'10px',
				'background-color':'blue'
			});
			
			$('#range-slider span').css({	
				display:'block',
				height:'20px',
				width:'100%',
				position:'absolute',
				'z-index':2,
				'background-color':'red',
				cursor:'inherit'
			});
			
			//************************ slider functions*****************************
			function rangeSlider(id, onDrag) {

				var range = document.getElementById(id);
				var	dragger = range.children[0];
				var	draggerWidth = 15; // width of your dragger
				var	down = false;
				var	rangeWidth, rangeLeft;

					dragger.style.width = draggerWidth + 'px';
					dragger.style.left = -draggerWidth + 'px';
					dragger.style.marginLeft = (draggerWidth / 2) + 'px';

					range.addEventListener("mousedown", function(e) {
						rangeWidth = $('#'+String(id)).width();
						rangeLeft = $('#'+String(id)).offset().left;
						down = true;
						updateDragger(e);
						return false;
					});

					document.addEventListener("mousemove", function(e) {
						updateDragger(e);
					});

					document.addEventListener("mouseup", function() {
						down = false;
					});

					function updateDragger(e) {
						if (down && e.pageX >= rangeLeft && e.pageX <= (rangeLeft + rangeWidth)) {
							dragger.style.left = (e.pageX - rangeLeft - draggerWidth) + 'px';
							if (typeof onDrag == "function") onDrag(Math.round((((e.pageX - rangeLeft)) / rangeWidth) * 100));
						}
					}

			}	
				
				rangeSlider('range-slider', function(value) {
				document.getElementById('test-result').innerHTML =  value+'%' ;
			});

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

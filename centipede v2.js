/**
 * Centipede for the OSU Caplab
 * Code by Cody Cooper
 *
 * Based on work by:
 * Josh de Leeuw
 * November 2013
 * 
 * This is a basic template for a jsPsych plugin. Use it to start creating your
 * own plugin. There is more information about how to create a plugin on the
 * jsPsych wiki (https://github.com/jodeleeuw/jsPsych/wiki/Create-a-Plugin).
 * 
 * 
 */
(function( $ ) {
	jsPsych['cent.game'] = (function(){
		var plugin = {};
		plugin.create = function(params) {
			var trials = new Array(5/*params.attributes.length*/);
			for(var i = 0; i < 5/*params.attributes.length*/; i++)
			{
				trials[i] = {};
				trials[i].type = "cent.game";
				trials[i].p1pay = params.p1pay[i];
				trials[i].p2pay = params.p2pay[i];
				trials[i].left_key = params.left_key || 65; // defaults to the 'A' key
                trials[i].right_key = params.right_key || 76; // defaults to the 'L' key
				trials[i].fixation= (typeof params.fixation === 'undefined') ? "+" : params.fixation;
                // supporting the generic data object with the following line
                // is always a good idea. it allows people to pass in the data
                // parameter, but if they don't it gracefully adds an empty object
                // in it's place.
                trials[i].data = (typeof params.data === 'undefined') ? {} : params.data[i];
			}	
			return trials;
		
		};
		var x = 1;
		var y = 2;
		plugin.trial = function(display_element, block, trial, part) {
		
		var n = 0;
		//start the experiment
			switch (part){	
				case 1://start trial with a fixation screen
						if (trial.prompt1 !== "") {
						
						
						display_element.append($('<div>', {
							"id": 'stage1'
						}));
							$('#stage1').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top:'20%',
													left:'30%',
													width: '605px',
													height: '10px',
													position:'fixed'
												});
												
							$("#stage1").append($('<canvas>', {
							"id": 'PA1'
						}));
							$('#PA1').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '20px',
													left: '5px',
													position:'absolute'
												});
							$("#stage1").append($('<canvas>', {
							"id": 'PA1down'
						}));
						$("#stage1").append($('<canvas>', {
							"id": 'PB1'
						}));
							$('#PB1').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '20px',
													left: '205px',
													position:'absolute'
												});
						$("#stage1").append($('<canvas>', {
							"id": 'PA2'
						}));
							$('#PA2').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '20px',
													left: '405px',
													position:'absolute'
												});
						$("#stage1").append($('<canvas>', {
							"id": 'PB2'
						}));
							$('#PB2').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '20px',
													left: '605px',
													position:'absolute'
												});
												
						$("#stage1").append($('<hr>', {
							"id": 'vlinesA1'
						}));					
						$('#vlinesA1').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													'border-left':'5px solid #336600',
													left:'50px',
													top:'120px',
													height: '200px',
													position:'absolute'
												});	
			
						$("#stage1").append($('<hr>', {
							"id": 'vlinesA2'
						}));
						$('#vlinesA2').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													'border-left':'5px solid #336600',
													left:'450px',
													top:'120px',
													height: '200px',
													position:'absolute'
												});	
												
												
												
						$("#stage1").append($('<hr>', {
							"id": 'vlinesB1'
						}));					
						$('#vlinesB1').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													'border-left':'5px solid #8D1919',
													left:'250px',
													top:'120px',
													height: '200px',
													position:'absolute'
												});	
			
						$("#stage1").append($('<hr>', {
							"id": 'vlinesB2'
						}));
						$('#vlinesB2').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													'border-left':'5px solid #8D1919',
													left:'650px',
													top:'120px',
													height: '200px',
													position:'absolute'
												});	
												
						$('#vlinesA1').append('<p style = "top:90%;left:5px;font-size:30px;font-weight:bold;color:#8D1919;position:absolute">0</p>');//player b
						$('#vlinesA1').append('<p style = "top:90%;right:10px;font-size:30px;font-weight:bold;color:#336600;position:absolute">2</p>');//player a
						
						$('#vlinesA2').append('<p style = "top:90%;left:5px;font-size:30px;font-weight:bold;color:#8D1919;position:absolute">3</p>');
						$('#vlinesA2').append('<p style = "top:90%;right:10px;font-size:30px;font-weight:bold;color:#336600;position:absolute">1</p>');
						
						$('#vlinesB2').append('<p style = "top:90%;left:5px;font-size:30px;font-weight:bold;color:#8D1919;position:absolute">2</p>');
						$('#vlinesB2').append('<p style = "top:90%;right:10px;font-size:30px;font-weight:bold;color:#336600;position:absolute">4</p>');
						
						$('#vlinesB1').append('<p style = "top:90%;left:5px;font-size:30px;font-weight:bold;color:#8D1919;position:absolute">5</p>');
						$('#vlinesB1').append('<p style = "top:90%;right:10px;font-size:30px;font-weight:bold;color:#336600;position:absolute">3</p>');
						
						
						}
						var pA = document.getElementById("PA1");
						var pActx = pA.getContext("2d");
						pActx.beginPath();
						pActx.arc(50, 50, 40, 0, 2 * Math.PI);
						pActx.stroke();
						pActx.fillStyle="#336600";
						pActx.fill();
						pActx.fillStyle="white";
						pActx.font = '30px Arial"';
						pActx.fillText('A',40,60);
						// draw the line
						pActx.beginPath();
						pActx.moveTo(100, 50);//start (x,y)
						pActx.lineTo(200, 50);// end (x,y) coordinates
						pActx.lineWidth = 5;
						pActx.strokeStyle = '#336600';
						pActx.stroke();

						
						pA = document.getElementById("PA2");
						pActx = pA.getContext("2d");
						pActx.beginPath();
						pActx.arc(50, 50, 40, 0, 2 * Math.PI);
						pActx.stroke();
						pActx.fillStyle="#336600";
						pActx.fill();
						pActx.fillStyle="white";
						pActx.font = '30px Arial"';
						pActx.fillText('A',40,60);
						// draw the line
						pActx.beginPath();
						pActx.moveTo(100, 50);//start (x,y)
						pActx.lineTo(200, 50);// end (x,y) coordinates
						pActx.lineWidth = 5;
						pActx.strokeStyle = '#336600';
						pActx.stroke();
						
						
						var pB = document.getElementById("PB1");
						var pBctx = pB.getContext("2d");
						pBctx.beginPath();
						pBctx.arc(50, 50, 40, 0, 2 * Math.PI);
						pBctx.stroke();
						pBctx.fillStyle="#8D1919";
						pBctx.fill();
						pBctx.fillStyle="white";
						pBctx.font = '30px Arial"';
						pBctx.fillText('B',40,60);
						// draw the line
						pBctx.moveTo(100, 50);//start (x,y)
						pBctx.lineTo(200, 50);// end (x,y) coordinates
						pBctx.lineWidth = 5;
						// set line color
						pBctx.strokeStyle = '#8D1919';
						pBctx.stroke();
						
						
						pB = document.getElementById("PB2");
						pBctx = pB.getContext("2d");
						pBctx.beginPath();
						pBctx.arc(50, 50, 40, 0, 2 * Math.PI);
						pBctx.stroke();
						pBctx.fillStyle="#8D1919";
						pBctx.fill();
						pBctx.fillStyle="white";
						pBctx.font = '30px Arial"';
						pBctx.fillText('B',40,60);
						
						//display 1 and b so they don't move with window change
						//var s1 = document.getElementByID("stage1"); 
						//s1.appendChild(p1ctx);
						//s1.appendChild(p2ctx);
						
						
						// start measuring response time
						var startTime = (new Date()).getTime();
						
						// create the function that triggers when a key is pressed.
						var flag1 = false; // true when a valid key is chosen
						var resp_func1 = function(e1) {
							if (e1.which == trial.left_key) 
							{
								flag1 = true;//
								resp_c=e1.which;
							}
							else if (e1.which == trial.right_key) //
							{
								flag1 = true;
								resp_c=e1.which;
							}
							
							if (flag1) {
								var endTime = (new Date()).getTime();
								rtcent = (endTime - startTime);
								clearTimeout(cat_timer);//cancel the timeout event at the end of this case
								$(document).unbind('keydown', resp_func1); // remove response function from keys
								if(resp_c == 65){
								plugin.trial(display_element, block, trial, part + 1);	
								}				
								else if (resp_c == 76){
								plugin.trial(display_element, block, trial, part + 1);
								}
							}
						};
						$(document).keydown(resp_func1);
							cat_timer = setTimeout(function() {//acts as trial timer
								$(document).unbind('keydown', resp_func1);
								plugin.trial(display_element, block, trial, part + 1);
							}, 50000);
							break;
//*******************************************************************************************************************************
				case 4://remove prompt1 
					$('.cent-study-stimP1').remove();
					$('.cent-study-stimP2').remove();
					$('.cent-study-q').remove();
					// start timer
					setTimeout(function() {
						plugin.trial(display_element, block, trial, part + 1);
					}, 250);
				break;
//****************************************Remove Feedback and write trial data*****************************************************************************************
				case 5:

					var trial_data = {
								"trial_type": "face-exp",
								trial_index: block.trial_idx,
								"rt_cat": rtcent,
								"cat.resp":resp_c
							};
							block.writeData($.extend({}, trial_data, trial.data));
							if(resp_c == 65){
							setTimeout(function() {block.next();}, 1000);
							}
							else if (resp_c == 76){
							plugin.trial(display_element, block, trial, part + 1);
							}	
				break;
//*************************************************************************************************************************************
				case 6:
					block.trial_idx = 5;
					block.next();
				break;
            }// End switch function
        };
        return plugin;
    })();
})(jQuery);

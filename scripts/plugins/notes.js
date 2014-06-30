//Variables 
//resp_c = 65 or 76
//resp_d = 65 or 76
//trial.natCD = 65(Adok) or 76(Lork)
//trial.dispCD = 65(Fr) or 76(Ag)

case XXXX ://show feedback; for cd there are 16 possibilities!!
	if(resp_c==trial.natCD && resp_d==trial.dispCD){	//four correct screens
		if(resp_c==65 && resp_d==65){
			display_element.append($('<img>', {
				src: "img/AcFc.BMP",
				"class": 'face-study-stimulus'
			}));
		} 
		else if(resp_c==65 && resp_d==76){
			display_element.append($('<img>', {
					src: "img/AcDc.BMP",
					"class": 'face-study-stimulus'
			}));
		} 
		else if(resp_c==76 && resp_d==65){
			display_element.append($('<img>', {
					src: "img/LcFc.BMP",
					"class": 'face-study-stimulus'
			}));
		} 
		else if(resp_c==76 && resp_d==76){
			display_element.append($('<img>', {
					src: "img/LcDc.BMP",
					"class": 'face-study-stimulus'
			}));
		}
	}
	else if(resp_c!=trial.natCD && resp_d==trial.dispCD){//incorrect categorization***********************************
		if(resp_c==65 && resp_d==65){
			display_element.append($('<img>', {
				src: "img/AwFc.BMP",
				"class": 'face-study-stimulus'
			}));
		} 
		else if(resp_c==65 && resp_d==76){
			display_element.append($('<img>', {
					src: "img/AwDc.BMP",
					"class": 'face-study-stimulus'
			}));
		} 
		else if(resp_c==76 && resp_d==65){
			display_element.append($('<img>', {
					src: "img/LwFc.BMP",
					"class": 'face-study-stimulus'
			}));
		} 
		else if(resp_c==76 && resp_d==76){
			display_element.append($('<img>', {
					src: "img/LwDc.BMP",
					"class": 'face-study-stimulus'
			}));
		}
	}
	else if(resp_c==trial.natCD && resp_d!=trial.dispCD){//incorrect decision***********************
		if(resp_c==65 && resp_d==65){
			display_element.append($('<img>', {
				src: "img/AcFw.BMP",
				"class": 'face-study-stimulus'
			}));
		} 
		else if(resp_c==65 && resp_d==76){
			display_element.append($('<img>', {
					src: "img/AcDw.BMP",
					"class": 'face-study-stimulus'
			}));
		} 
		else if(resp_c==76 && resp_d==65){
			display_element.append($('<img>', {
					src: "img/LcFw.BMP",
					"class": 'face-study-stimulus'
			}));
		} 
		else if(resp_c==76 && resp_d==76){
			display_element.append($('<img>', {
					src: "img/LcDw.BMP",
					"class": 'face-study-stimulus'
			}));
		}
	}
	else if(resp_c!=trial.natCD && resp_d!=trial.dispCD){//incorrect decision and categorization***********************
		if(resp_c==65 && resp_d==65){
			display_element.append($('<img>', {
				src: "img/AwFw.BMP",
				"class": 'face-study-stimulus'
			}));
		} 
		else if(resp_c==65 && resp_d==76){
			display_element.append($('<img>', {
					src: "img/AwDw.BMP",
					"class": 'face-study-stimulus'
			}));
		} 
		else if(resp_c==76 && resp_d==65){
			display_element.append($('<img>', {
					src: "img/LwFw.BMP",
					"class": 'face-study-stimulus'
			}));
		} 
		else if(resp_c==76 && resp_d==76){
			display_element.append($('<img>', {
					src: "img/LwDw.BMP",
					"class": 'face-study-stimulus'
			}));
		}
	}	
	setTimeout(function() {
		plugin.trial(display_element, block, trial, part+1);
		}, 4000);
break;

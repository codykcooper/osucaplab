function setAttribtues(array,stimuli){//set stimuli attributes
		/* Key for the returned matrix 
		CD
			[any][0] === Face Shape
			[any][1] === Nat Assign
			[any][2] === Disp Assign
		XD
			[any][3] === Face Shape
			[any][4] === Nat Assign
			[any][5] === Disp Assign
		D
			[any][6] === Face Shape
			[any][7] === Nat Assign
			[any][8] === Disp Assign
		*/
			var matrix = [];
			var prob = 0;
			var col = 0;
			var prob_nat = 6;//change probability of nat assignment, currently 60% chance of R being Adok, and 60% chance of Narrow being lork
			var prob_disp = 7;// change disp assignment. Currently 70% chance of Adok being Fr and 70% chance of lork being Aggressive
			for(var i=0; i<array.length; i++) {// create matrix to store the stimuli for each condition
				matrix[i] = new Array(9);
				for(j=0;j<3;j++){ 
					if(stimuli[i][j].charAt(4)=="r"){//If stimuli is a round face
						matrix[i][0+col]="round";
						prob = Math.floor((Math.random() * 10) + 1);//random number between 1 and 10
						if(prob<=prob_nat){
							matrix[i][1+col]="Adok";
							prob = Math.floor((Math.random() * 10) + 1);
							if(prob<=prob_disp){//assign disposition
								matrix[i][2+col]="Fr";
							}else if (prob>prob_disp){//basically 1-prob_adok_friendly
								matrix[i][2+col]="Ag";
							}
						}else if(prob>prob_nat){
							matrix[i][1+col]="Lork";
							prob = Math.floor((Math.random() * 10) + 1);
							if(prob<=prob_disp){//assign disposition
								matrix[i][2+col]="Ag";
							}else if (prob>prob_disp){
								matrix[i][2+col]="Fr";
							}	
						}
					}
					if(stimuli[i][j].charAt(4)=="n"){//if stimuli is a narrow face
						matrix[i][0+col]="narrow";
						prob = Math.floor((Math.random()*10)+1);
						if (prob<=prob_nat){
							matrix[i][1+col]="Lork";
							prob = Math.floor((Math.random() * 10) + 1);
							if(prob<=prob_disp){
								matrix[i][2+col]="Ag";
							}else if(prob>prob_disp){
								matrix[i][2+col]= "Fr";
							}
						} else if (prob>prob_nat){
							matrix[i][1+col]="Adok";
							prob = Math.floor((Math.random() * 10) + 1);
							if(prob<=prob_disp){
								matrix[i][2+col]="Fr";
							}else if(prob>prob_disp){
								matrix[i][2+col]= "Ag";
							}
						}
					}
					col+=3;
				}
			}
		return matrix;
		}//close the function
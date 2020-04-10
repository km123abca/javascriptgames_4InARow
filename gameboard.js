function gameboard(startpos)
	{
		this.startpos=startpos;
		this.childDim=childDim;
		this.childrenx=[];
		this.b_i_row=num_columns;
		this.b_i_col=num_rows;

		this.boardMatrix=[];

		//lets populate our board matrix
		for(var i=0;i<this.b_i_col;i++)
			{
				var lis=[];
				for(var j=0;j<this.b_i_row;j++)
					lis.push('n');
				this.boardMatrix.push(lis);
			}

		

		for(var i=0;i<this.b_i_col;i++)
			{	
			 for(var j=0;j<this.b_i_row;j++)
			 	this.childrenx.push(new box(this.startpos.x+this.childDim/2+j*this.childDim,
			 								this.startpos.y+this.childDim/2+i*this.childDim,
			 								this.childDim
			 		                       )
			                       );
			}



		this.check_for_winner=function()
								{
									for(var i=0;i<num_rows;i++)
									for(var j=0;j<num_columns;j++)
										{
											if(this.boardMatrix[i][j]=='n') 
												continue;
											for(var t_i=-1;t_i<2;t_i++)
												for(var t_j=-1;t_j<2;t_j++)
												{
													if( (t_i==0)&&(t_j==0) )
														continue;
													var winner_found=true;
													for(var k=1;k<4;k++)
														{
															if(!( ((i+t_i*k)>=0) && ( (i+t_i*k) <num_rows) && ( (j+t_j*k) >=0) && ( (j+t_j*k) <num_columns) ))
																{
																winner_found=false;
																break;
																}
															if(this.boardMatrix[i+t_i*k][j+t_j*k]!=this.boardMatrix[i][j])
																{
																winner_found=false;
																break;
																}
														}
													if(winner_found)
														{
															console.log(this.childrenx[num_columns*i+j].circle_color);
															str2print3=colors_rev[this.childrenx[num_columns*i+j].circle_color]+' player wins';
															boardLock=true;

															for(var k=0;k<4;k++)
															{
																this.boardMatrix[i+t_i*k][j+t_j*k]='g';
																this.childrenx[num_columns*(i+t_i*k)+(j+t_j*k)].putOnWinnerColors();
															}
															return true;
														}

												}
										}									
								};
		this.draw_children=function()
							{	
								
								for(var elem of this.childrenx)
								{   
									
									elem.dr_w_box();
									elem.dr_w_circle();
								}
							};
		this.show_board=function()
						{
							var mapper={'black':'b','white':'w','n':'n','g':'g'};
							for(var i=0;i<this.b_i_col;i++)
								{
								var empty_str='';
								for(var j=0;j<this.b_i_row;j++)
									{
									empty_str+=mapper[this.boardMatrix[i][j]]+',';
									}
								w2screen(empty_str,5+20*j,130+50*i);
								}
							
						};
	}
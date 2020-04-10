function machinex(mycol)
	{
		this.playInProgress=false; //says im playing my move right now.. dont disturb
		this.mycol=mycol;
		this.mydot=false;
		this.target_column=0;


		this.checkIfTimeToPlay=function()
								{
									if(!(whoseTurn==this.mycol))
										{
										this.mydot=false;
										this.playInProgress=false;
										return false;
										}
									if(this.playInProgress)
										return true;
									if(boardLock)
										return false;
									if(whoseTurn==this.mycol)
										{
											this.spawnMyDot();
											this.playInProgress=true;
										}
									
								};
		this.spawnMyDot=function()
							{
								if(!this.mydot)
								{
								this.mydot=new freedot(0.8*canvas.width,0.68*canvas.height,com_box_width,this.mycol,true,true);
								this.mydot.velx=0;
								this.mydot.vely=-5;
								indidots.push(this.mydot);
								}
							};
		this.adjust_velocity=function()
							{
								if((this.mydot.posy+com_box_width)<boardy)
									{
										this.mydot.velx=-5;
										this.mydot.vely=0;
									}
							};

		this.reached_column=function (col_n)
							{

								if ((this.mydot.posy+com_box_width)>=boardy)
									{
									// var emp='';
									// if(!this.mydot)
									// 	emp=' mydot is false now';  //disposable
									// str2print5="no checking: says line 50"+run_counter()+emp;
									return false;
									}
								str2print5=Math.floor((this.mydot.posx-boardx)/com_box_width);
								if(Math.floor((this.mydot.posx-boardx)/com_box_width)==col_n)
									return true;
								return false;
							};
		this.move_dot=function()
							{
								if ((!this.mydot)||(this.mydot.movable))
									return false;
								if(this.reached_column(this.target_column))
									{
										// str2print5="reached and movable set to true";
										this.mydot.movable=true;
										this.mydot.j=this.target_column;
										this.mydot.posx=boardx+com_box_width/2+this.target_column*com_box_width;
									}
								this.adjust_velocity();
							};

	}
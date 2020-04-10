		function check_intrusion(obj1,obj2)
			{
				var col1=col2='no_collision';
				var col1=check_corner_intrusion(obj1,obj2,obj1.rotangle);
				// var col2=check_corner_intrusion(obj2,obj1,obj2.rotangle);
				if(pauseSc)
				{
					console.log('first expression:'+col1['precedence']);
					console.log('second expression:'+col2['precedence']);
				}
				if ((col1['precedence']=='left')||(col2['precedence']=='right'))
					return 'left';
				if ((col1['precedence']=='right')||(col2['precedence']=='left'))
					return 'right';
				if ((col1['precedence']=='top')||(col2['precedence']=='bottom'))
					return 'top';
				if ((col1['precedence']=='bottom')||(col2['precedence']=='top'))
					return 'bottom';
				return 'no_collision';

			}

		function check_corner_intrusion(obj1,obj2,ang=0)
			{
				//obj1 is inclined at an angle ang with respect to obj2, 
				//we have to check the intrusion of obj2 into obj1

				var ang=ang/180*Math.PI;

				if(pauseSc)
				{
					console.log('position of object1:'+obj1.posx+','+obj1.posy);
					console.log('dims:=>'+obj1.width+','+obj1.height);
					console.log('position of object2:'+obj2.posx+','+obj2.posy);
					console.log('dims:=>'+obj2.width+','+obj2.height);
				}
				//lets make everything centered around obj1 and let rotate the coordinate system by ang	
				var leftxpos1  =obj1.posx-obj1.width/2;
					if(pauseSc) console.log('leftxpt:'+leftxpos1);
				var rightxpos1 =obj1.posx+obj1.width/2;
					if(pauseSc) console.log('rightxpt:'+rightxpos1);
				var topypos1   =obj1.posy-obj1.height/2;
					if(pauseSc) console.log('top y pt:'+topypos1);
				var bottomypos1 =obj1.posy+obj1.height/2;
					if(pauseSc) console.log('botttom y pt:'+bottomypos1);	

				var obj1_pts=[
							  [leftxpos1,topypos1],
							  [rightxpos1,topypos1],
							  [rightxpos1,bottomypos1],
							  [leftxpos1,bottomypos1]
							 ];
				var obj2_pts=[
							  [obj2.posx-obj2.width/2,obj2.posy-obj2.height/2],
							  [obj2.posx+obj2.width/2,obj2.posy-obj2.height/2],
							  [obj2.posx-obj2.width/2,obj2.posy+obj2.height/2],
							  [obj2.posx+obj2.width/2,obj2.posy+obj2.height/2]
							 ];
				if(pauseSc)
					{
						console.log('Entered check_corner_intrusion just before centering around obj1');
						console.log('here are obj1 positions');
						console.log(obj1_pts);
						console.log('here are obj2 positions');
						console.log(obj2_pts);
					}
				for(var i=0;i<3;i++)
					{
						obj1_pts[i][0]=obj1_pts[i][0]-obj1.posx;
						obj1_pts[i][1]=obj1_pts[i][1]-obj1.posy;
						obj2_pts[i][0]=obj2_pts[i][0]-obj1.posx;
						obj2_pts[i][1]=obj2_pts[i][1]-obj1.posy;
					}
				if(pauseSc)
					{
						console.log('Entered check_corner_intrusion just after centering around obj1');
						console.log('here are obj1 positions');
						console.log(obj1_pts);
						console.log('here are obj2 positions');
						console.log(obj2_pts);
					}
				if(ang!=0)
					{		
						if(pauseSc)
							{
								console.log('Passed through here since angle was not 0');
							}				
						for(var i in obj2_pts)
						{
							obj2_pts[i][0] = Math.cos(ang) * obj2_pts[i][0]  + Math.sin(ang) * obj2_pts[i][1];
							obj2_pts[i][1] = -Math.sin(ang) * obj2_pts[i][0] + Math.cos(ang) * obj2_pts[i][1];
						}
					}	


				/*
				//Now lets label each pt in obj1 and obj2 as leftmostx,leftmosty,topmostx etc
				max_elemx=-99;
				least_elemx=999999999;
				max_elemy=-99;
				least_elemy=999999999;
				for(var elem of obj2_pts)
					{
					if (elem[0] < least_elemx)  least_elemx =elem[0];
					if (elem[1] < least_elemy)  least_elemy =elem[1];
					if (elem[0] > max_elemx)    max_elemx   =elem[0];
					if (elem[1] > max_elemy)    max_elemy   =elem[1];
					}
				for(var i in obj2_pts)
					{
						if(obj2_pts[i][0]==least_elemx)						
							obj2_pts[i].push('left_most');						
						else if(obj2_pts[i][0]==max_elemx)
							obj2_pts[i].push('right_most');
						else
							obj2_pts[i].push('neutral');

						if(obj2_pts[i][1]==least_elemy)						
							obj2_pts[i].push('left_most');						
						else if(obj2_pts[i][1]==max_elemy)
							obj2_pts[i].push('right_most');
						else
							obj2_pts[i].push('neutral');
					}				
				*/
				//Commented code above seems to be unnecessary
				//Now lets test whether each pt of pt2 is intruding into obj1 or not
				if(pauseSc){
							console.log('here are those points after modifying/not modifying angle');
							console.log('obj1.pts');
							console.log(obj1_pts);
							console.log('obj2.pts');
							console.log(obj2_pts);
						   }

				var collision_info={'horizontal':'no_collision','vertical':'no_collision','precedence':'no_collision'};
				for(var pt2 of obj2_pts)
					{					

					var sep_left_corner_pt=pt2[0]-obj1_pts[0][0];
					var sep_right_corner_pt=pt2[0]-obj1_pts[1][1];
					var sep_top_corner_pt=pt2[1]-obj1_pts[1][1];
					var sep_bottom_corner_pt=pt2[1]-obj1_pts[2][1];

					if ((sep_left_corner_pt<0)&&(sep_right_corner_pt>0)&&(sep_top_corner_pt>0)&&(sep_bottom_corner_pt<0))
						{
							collision_info={'horizontal':'left','vertical':'top','precedence':''};
							var hori_sep=Math.abs(sep_left_corner_pt);
							var vert_sep=Math.abs(sep_top_corner_pt);
							if (  Math.abs(sep_left_corner_pt) > Math.abs(sep_right_corner_pt) )
								{
								collision_info['horizontal']='right';
								hori_sep=Math.abs(sep_right_corner_pt);								
								}
							if (  Math.abs(sep_top_corner_pt) > Math.abs(sep_bottom_corner_pt) )
								{
								collision_info['vertical']='bottom';	
								vert_sep=Math.abs(sep_bottom_corner_pt);					
								}
							if(hori_sep<vert_sep)
								collision_info['precedence']=collision_info['horizontal'];
							else
								collision_info['precedence']=collision_info['vertical'];
							break;
						}
					}
				return collision_info;

			}


		function selcol(rb)
			{
				var rnum=Math.random()*rb.length;
				rnum=Math.floor(rnum);
				rnum=parseInt(rnum);
				return rb[rnum];
			}
		function cordtrans(x1,y1,ang)
			{
				var x1new=x1*Math.cos(d2r(ang))+y1*Math.sin(d2r(ang));
				var y1new=-x1*Math.sin(d2r(ang))+y1*Math.cos(d2r(ang));
				return [x1new,y1new];
			};
		function cordretrans(x1,y1,ang)
			{
				var x1new=x1*Math.cos(d2r(ang))-y1*Math.sin(d2r(ang));
				var y1new=x1*Math.sin(d2r(ang))+y1*Math.cos(d2r(ang));
				return [x1new,y1new];
			};
		function cppos(px,py,ang,depth)
			{
			return true;
			};

		function d2r(ang)
			{
				return (ang/180*Math.PI);
			};
		function r2d(ang)
			{
				return (ang/Math.PI*180);
			};
		function fixinc(angle1,angle2)
				{
				var a1=angle1;
				var a2=angle2;
				if(a1>=270) a1=a1-360;
				if(a2>=270) a2=a2-360;
				var outputt=(a2-a1)/Math.abs(a2-a1)*angle_increment;
				return outputt;
				};


		function getRandomAngle(ang=90)
			{
			//console.log('random angle generator called');
			var c_ang=Math.random()*ang;
			
			if(Math.random()<0.5)
				c_ang=360-c_ang;
			//console.log('angle:'+c_ang);
			return c_ang;
			}		

		function anglecalc(x1,y1,x2,y2)
			{
			//console.log('received :'+x1+','+y1+'  and '+x2+','+y2);
			var ygap=(y2-y1);
			var xgap=(x2-x1);
			console.log('ygap:'+ygap);
			console.log('xgap:'+xgap);
			var angindeg=Math.atan(Math.abs(ygap)/Math.abs(xgap))*180/Math.PI;
			//console.log('angle before processing:'+angindeg);
				if ((xgap<0)&&(ygap>0)) angindeg=180-angindeg;
				if ((xgap<0)&&(ygap<0)) angindeg=180+angindeg;
				if ((xgap>0)&&(ygap<0)) angindeg=360-angindeg;
				console.log('angle after processing:'+angindeg);
				return angindeg;
			}
		function spawnbarrels()
			{
			var count=0;
			for(var i in barrellist)
				if(barrellist[i].onScreen) count+=1;
			//console.log('THere are '+count+' barrels');
			if(count<1)
				barrellist.push(new barrel(25,25));
			}

		function keeptimer()
			{
				t_master+=1;
				if(t_master>200){
					alert('Game Over, Score:'+score);
					window.location.href='f_main.html';
						}
				tt+=1;
				if((tt%30)==0) score+=1;
				if(tt>3000) tt=0;
			
			}
		function markarea(sx,sy)
				{
				ctx.save();
				ctx.translate(sx,sy);
				//ctx.rotate(this.rotangle*Math.PI/180);
				ctx.fillStyle="#FF0000";
				ctx.strokeStyle="#000000";
				ctx.beginPath();
				ctx.arc(0,0,10,0,2*Math.PI);
				ctx.stroke();
				ctx.fill();				
				ctx.restore();
				};




function getcolorrr(hexval)
	{
	var colis=[["red","#FF0000"],["green","#00FF00"],["blue","#0000FF"],["dark","#F2F2F2"]];
	var selval="#FF0000";
	for(var i in colis)
		{
		if(colis[i][0]==hexval) 
			{
			selval=colis[i][1];
			return selval;
			}
		}
	return selval;
	}

function dispscore(idd,strr)
		{
			document.getElementById(idd).value=strr;
		}
	function calcDist(x1,y1,x2,y2)
			{
				var xsep=Math.abs(x1-x2);
				var ysep=Math.abs(y1-y2);
				var dist=Math.sqrt(xsep*xsep+ysep*ysep);
				return dist;
			}

	function collisioncheckz(elem1,elem2)
		{
			return (inter_ects(elem1.posx-elem1.width/2,elem1.posy-elem1.height/2,elem1.width,elem1.height,
					   elem2.posx-elem2.width/2,elem2.posy-elem2.height/2,elem2.width,elem2.height
					  )
				);
		}

	function cza(elem1,elem2,ang)
		{ 
			var x1dupe=elem1.posx-elem1.width/2;
			var y1dupe=elem1.posy-elem1.height/2
			var x2dupe=elem2.posx-elem2.width/2;
			var y2dupe=elem2.posy-elem2.height/2;

			var x1=x1dupe*Math.cos(Math.PI/180*ang)+y1dupe*Math.sin(Math.PI/180*ang);
			var y1=y1dupe*Math.cos(Math.PI/180*ang)-x1dupe*Math.sin(Math.PI/180*ang);
			var x2=x2dupe*Math.cos(Math.PI/180*ang)+y2dupe*Math.sin(Math.PI/180*ang);
			var y2=y2dupe*Math.cos(Math.PI/180*ang)-x2dupe*Math.sin(Math.PI/180*ang);
			return (inter_ects(x1,y1,elem1.width,elem1.height,
					   x2,y2,elem2.width,elem2.height
					  )
				);
		}

	function inter_ects(q1,q2,ql1,ql2,w1,w2,wl1,wl2)
		{
		if(w1>=q1)
			{
			if((w1-q1)<ql1)
				{
				if(w2>=q2)
					{
					if((w2-q2)<ql2) return true;
					return false;
					}
				else
					{
					if((q2-w2)<wl2) return true;
					return false;
					}
				}
			}
		else
			{
			if((q1-w1)<wl1)
				{
				if(w2>=q2)
					{
					if((w2-q2)<ql2) return true;
					return false;
					}
				else
					{
					if((q2-w2)<wl2) return true;
					return false;
					}
				}
			}
		}

function outAbounds(px,py)
		{
		if ( !( (px>=0) && (px<=canvas.width) && (py>=0) && (py<=canvas.height) ))
			return true;
		return false;
		}

function addAngle(x,y)
		{
			var z=x+y;
			if(z>360)
				z-=360;
			if(z<0)
				z+=360;
			return z;
		}
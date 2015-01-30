using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Checkpoint{

	public int centreX; // x co-ord of centre of check point
	public int centreY; // y co-ord of centre of check point
	bool capturePoint=false;
	bool greenPoint=false;
	bool redPoint=false;
	bool hospitalPoint=false;
	public string animalName; // if capture point, store animal name
	List <Checkpoint> forward; //all checkpoints proceeding
	
	public Checkpoint(int centreX, int centreY,
	             bool capturePoint, bool greenPoint,
	                  bool redPoint, bool hospitalPoint,
	                  List <Checkpoint> forward)
	{
		this.centreX = centreX;
		this.centreY = centreY;
		this.capturePoint = capturePoint;
		this.greenPoint = greenPoint;
		this.redPoint = redPoint;
		this.hospitalPoint = hospitalPoint;
		this.forward = forward;
	}
	
	public List <Checkpoint> GetNext()
	{
		return forward;
	}

	public string GetCheckpointType ()
	{
		if (capturePoint)
		{
			return "capturePoint";
		}
		else if (greenPoint)
		{
			return "greenPoint";
		}
		else if (redPoint)
		{
			return "redPoint";
		}
		else if (hospitalPoint)
		{
			return "hospitalPoint";
		}
		else
		{
			return "genericPoint";
		}
	}

}

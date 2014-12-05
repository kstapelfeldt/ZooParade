using UnityEngine;
using System.Collections;

public class Checkpoint{

	public int centreX;
	public int centreY;
	bool capturePoint=false;
	bool greenPoint=false;
	bool redPoint=false;
	public string animalName;
	Checkpoint[] forward;
	
	public Checkpoint(int centreX, int centreY,
	             bool capturePoint, bool greenPoint,
	             bool redPoint, Checkpoint[] forward)
	{
		this.centreX = centreX;
		this.centreY = centreY;
		this.capturePoint = capturePoint;
		this.greenPoint = greenPoint;
		this.redPoint = redPoint;
		this.forward = forward;
	}
	
	public Checkpoint[] getNext()
	{
		return forward;
	}

}

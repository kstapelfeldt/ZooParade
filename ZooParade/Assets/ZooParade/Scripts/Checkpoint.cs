using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Checkpoint{

	public float centreX; // x co-ord of centre of check point.
	public float centreY; // y co-ord of centre of check point
	bool capturePoint=false;
	bool greenPoint=false;
	bool redPoint=false;
	bool hospitalPoint=false;
	public string animalName; // if capture point, store animal name
	List <Checkpoint> forward; //all checkpoints proceeding
	
	public Checkpoint(float centreX, float centreY,
	             bool capturePoint, bool greenPoint,
	                  bool redPoint, bool hospitalPoint)
	{
		this.centreX = centreX;
		this.centreY = centreY;
		this.capturePoint = capturePoint;
		this.greenPoint = greenPoint;
		this.redPoint = redPoint;
		this.hospitalPoint = hospitalPoint;
	}

	public void SetNext(List <Checkpoint> forward)
	{
		this.forward = forward;
	}
	public List <Checkpoint> GetNext()
	/* 
	 * Returns a list of checkpoints that follow this checkpoint.
	 */
	{
		return forward;
	}

	public string GetCheckpointType ()
	/*
	 * Returns the type of checkpoint.
	 * The valid types of checkpoint are capturepoint, greenpoint,
	 * redpoint, hospitalpoint and generic point.
	 */
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

	public float GetCentreX(){
		return centreX;
		}

	public float GetCentreY(){
		return centreY;
	}

	public List <Checkpoint> GetPossibleMoves(int steps, Player player)
	/* 
	 * Given n number of steps and the player that is currently being moved,
	 * this function returns a list of checkpoints that are valid moves.
	 */
	{
		List <Checkpoint> queue = new List<Checkpoint>();
		if (steps > 0) {
			queue = this.GetNext();
		}
		else{
			queue.Add(this);
		}
		List <Checkpoint> visited = player.visitedCheckpoints;
		List <Checkpoint> temp = new List <Checkpoint>();
		// queue set to next
		// which means we already went 1 step forward
		for (int i = 1; i < steps; i++) {
			while (queue.Count > 0)
			{
				// take first checkpoint in queue
				Checkpoint chk = queue[0];
				// get next
				List <Checkpoint> newCheckPoints = chk.GetNext ();
				// add all points in next if not contained
				// and not visited
				foreach (Checkpoint newChk in newCheckPoints)
				{
					if (!(queue.Contains(newChk)))
					{
						temp.Add (newChk);
					}
				}
				queue.Remove (chk);
			}

			foreach (Checkpoint toAdd in temp){
				queue.Add (toAdd);
			}

			temp.Clear();
		}
		return queue;
	}

	public string toString()
	{
		return "Checkpoint with centre: (" + centreX + "," + centreY + ")";
	}

}

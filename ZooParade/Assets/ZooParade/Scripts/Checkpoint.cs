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


	// Edit:
	// This is bad. Better to use a function OnClick for the Spheres

	public Checkpoint GetPointClick(List <Checkpoint> checkpoints)
	{
		float capturePointScale = 0.4f;
		float hospitalPointScale = 0.4f;
		float greenPointScale = 0.35f;
		float redPointScale = 0.35f;
		float genericPointScale = 0.25f;
		// using scale, establish radius
		
		foreach (Checkpoint chk in checkpoints)
		{
			float mousex = Input.mousePosition.x;
			float mousey = Input.mousePosition.y;
			float checkpointx = chk.centreX;
			float checkpointy = chk.centreY;
			
			if (chk.GetCheckpointType() == "capturePoint")
			{
				if (Mathf.Sqrt ((mousex-checkpointx) * (mousex-checkpointx) + (mousey-checkpointy) * (mousey-checkpointy)) < capturePointScale)
				{
					return chk;
				}
			}
			
			else if (chk.GetCheckpointType() == "greenPoint")
			{
				if (Mathf.Sqrt ((mousex-checkpointx) * (mousex-checkpointx) + (mousey-checkpointy) * (mousey-checkpointy)) < greenPointScale)
				{
					return chk;
				}
			}
			
			else if (chk.GetCheckpointType() == "redPoint")
			{
				if (Mathf.Sqrt ((mousex-checkpointx) * (mousex-checkpointx) + (mousey-checkpointy) * (mousey-checkpointy)) < redPointScale)
				{
					return chk;
				}
			}
			
			else if (chk.GetCheckpointType() == "hospitalPoint")
			{
				if (Mathf.Sqrt ((mousex-checkpointx) * (mousex-checkpointx) + (mousey-checkpointy) * (mousey-checkpointy)) < hospitalPointScale)
				{
					return chk;
				}
			}
			
			else
			{
				if (Mathf.Sqrt ((mousex-checkpointx) * (mousex-checkpointx) + (mousey-checkpointy) * (mousey-checkpointy)) < genericPointScale)
				{
					return chk;
				}
			}
			
		}
		
		return new Checkpoint (-1, -1, false, false, false, false);
	}

	public float GetCentreX(){
		return centreX;
		}

	public float GetCentreY(){
		return centreY;
	}

	public List <Checkpoint> GetPossibleMoves(int steps, Player player)
	{
		List <Checkpoint> queue = GetNext ();
		List <Checkpoint> visited = player.visitedCheckpoints;
		List <Checkpoint> temp = new List <Checkpoint>();
		for (int i = 1; i < steps; i++) {
			while (queue.Count > 0)
			{
				Checkpoint chk = queue[0];
				List <Checkpoint> newCheckPoints = chk.GetNext ();
				foreach (Checkpoint newChk in newCheckPoints)
				{
					if (!(queue.Contains(newChk)))
					{
						temp.Add (newChk);
					}
				}
				visited.Add (chk);
				queue.Remove (chk);
			}
			foreach (Checkpoint add in temp){
				queue.Add (add);
			}
			temp.Clear ();
		}
		return queue;
	}

}

using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Game : MonoBehaviour {

	// Use this for initialization
	void Start () 
	{

	}
	
	// Update is called once per frame
	void Update () 
	{
		
	}

	public void movePlayerIcon ()
	{
		// Too lazy.
	}

	public Checkpoint getPointClick(List <Checkpoint> checkpoints)
	{
		float capturePointScale = 0.4f;
		float hospitalPointScale = 0.4f;
		float greenPointScale = 0.35f;
		float redPointScale = 0.35f;
		float genericPointScale = 0.35f; // test. I guessed.
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

		return new Checkpoint(-1, -1, false, false, false, false, new List<Checkpoint>())
	}
	
	public List <Checkpoint> getPossibleMoves(Checkpoint checkpoint, int steps, Player player)
	{
		List <Checkpoint> queue = checkpoint.GetNext ();
		List <Checkpoint> visited = player.visitedCheckpoints;
		List <Checkpoint> temp = new List <Checkpoint>();
		for (int i = 1; i < steps; i++) {
			foreach (Checkpoint chk in queue)
			{
				List <Checkpoint> newCheckPoints = chk.GetNext ();
				foreach (Checkpoint newChk in newCheckPoints)
				{
					if (!visited.Contains(newChk) && !queue.Contains(newChk))
					{
						temp.Add (newChk);
					}
				}
				visited.Add (chk);
				queue.Remove (chk);
			}
			queue = temp;
		}
		return queue;
	}

}

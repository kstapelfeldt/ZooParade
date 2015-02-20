using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Player
{
	public string name;
	public Map map;
	public List<Checkpoint> visitedCheckpoints = new List<Checkpoint>();
	public List<Animal> animalsCaptured = new List<Animal> ();
	public GameObject icon;
	public Checkpoint currentCheckpoint;

	public Player(string name, Map map, GameObject icon)
	{
		this.name = name;
		this.map = map;
		this.icon = icon;
	}

	public void MovePlayer(Checkpoint checkpoint)
	{
		currentCheckpoint = checkpoint;
		// icon.transform.position.Set(checkpoint.centreX, checkpoint.centreY, 0);

		// ez way

		float distx = checkpoint.centreX - icon.transform.position.x;
		float disty = checkpoint.centreY - icon.transform.position.y;
		Vector3 v = new Vector3 (distx, disty, 0);
		icon.transform.Translate (v* Time.deltaTime*2);

	}
}

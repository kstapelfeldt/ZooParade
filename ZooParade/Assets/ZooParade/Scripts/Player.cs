using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Player
{
	public string name;
	public Map map;
	public List<Checkpoint> visitedCheckpoints = new List<Checkpoint> ();
	public List<Animal> animalsCaptured = new List<Animal> ();

	public Checkpoint currentCheckpoint;

	public Player(string name, Map map)
	{
		this.name = name;
		this.map = map;
	}

	public void MovePlayer(Checkpoint checkpoint)
	{
		currentCheckpoint = checkpoint;
	}
}

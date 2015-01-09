using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Map
{
	public string name;
	public List<Animal> animals = new List<Animal> ();
	public List <Checkpoint> checkpoints;
	public Player player;

	public Map(string name, List<Animal> animals, List<Checkpoint> checkpoints)
	{
		this.name = name;
		this.animals = animals;
		this.checkpoints = checkpoints;
	}

	public void AssignPlayer(Player player)
	{
		this.player = player;
	}

	public Checkpoint GetNextCheckPoint()
	{
		// Player has the current checkpoint
		return new Checkpoint (0, 0, true, false, false, new Checkpoint[]{});
	}

	public void MovePlayer()
	{
		// Use GetNextCheckPoint to get the next checkpoint
		// Move the Player to the next Checkpoint using MovePlayer()
	}
}

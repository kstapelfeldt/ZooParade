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

	public List <Checkpoint> GetNextCheckpoint ()
	{
		return player.currentCheckpoint.GetNext ();
	}

	public void MovePlayer(Checkpoint checkpoint)
	{
		// Use GetNextCheckPoint to get the next checkpoint
		// Move the Player to the next Checkpoint using MovePlayer()
		player.MovePlayer (checkpoint);
	}


}

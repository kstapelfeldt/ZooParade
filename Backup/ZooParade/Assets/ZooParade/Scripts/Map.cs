using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Map
{
	public string name;
	public Animal[] animals;
	public Checkpoint[] checkpoints;
	public Player player;

	public Map(string name, Animal[] animals, Checkpoint[] checkpoints)
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
	/*
	 * Moves the player assigned to this map to the specified checkpoint.
	 */
	{
		// Move the Player to the next Checkpoint using MovePlayer()
		player.MovePlayer (checkpoint);
	}


}

using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Circle
{
	public GameObject obj;
	public string name;
	public Vector3 origin;
	public float radius;
	public Color color;

	public Circle(string name, Vector3 origin, float radius, Color color)
	{
		this.name = name;
		this.origin = origin;
		this.radius = radius;
		this.color = color;
		this.Create ();
	}

	public void Create()
	{
		obj = GameObject.Instantiate (Resources.Load("Meshes/CircleMesh")) as GameObject;
		obj.name = name;

		Material pathMaterial = Resources.Load ("Materials/Mat") as Material;
		obj.renderer.material = pathMaterial;
		obj.renderer.material.color = color;
		
		Vector3 scale = obj.transform.localScale;
		scale.x = 4 * radius;
		scale.y = 4 * radius;
		obj.transform.localScale = scale;
		obj.transform.Rotate(new Vector3(90, 0, 0));
		obj.transform.position = origin;
	}
}

using UnityEngine;
using System.Collections;

public class Dial : MonoBehaviour {
	
	Circle dialCircle;

	// Use this for initialization
	void Start () 
	{

	}
	
	// Update is called once per frame
	void Update () 
	{
		if (dialCircle == null) 
		{
			dialCircle = new Circle ("DialCircle", new Vector3 (0, 0, 0), Screen.height / 2, Color.white);
		}
	}
}

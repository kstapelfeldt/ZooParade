using UnityEngine;
using System.Collections;

public class CameraSetup : MonoBehaviour {

	public static int cameraZ = -10;

	void Awake()
	{
		Screen.fullScreen = true;
		transform.Translate(new Vector3(0, 0, cameraZ));
	}

	// Use this for initialization
	void Start () 
	{
	
	}
	
	// Update is called once per frame
	void Update () 
	{
	
	}
}

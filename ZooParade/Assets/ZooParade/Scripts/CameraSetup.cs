using UnityEngine;
using System.Collections;

public class CameraSetup : MonoBehaviour {

	public static int cameraZ = -10;

	void Awake()
	{
		//camera.orthographicSize = Screen.height * 1 / 2;
		Screen.fullScreen = true;
	}

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}

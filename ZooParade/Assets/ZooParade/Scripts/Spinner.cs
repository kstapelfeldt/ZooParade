using UnityEngine;
using System.Collections;

public class Spinner : MonoBehaviour {
	public float rot; // for debug. should be private. hide later.
	public float rotSpeed; // sets speed of rotation. should also be private tbh.
	public float rotDelay; // sets delay between rotations.
	// at the time:
	// main purpose of delay was to slow down to simulate friction
	// we can use sine function or something of that sort on rot delay
	// although it's probably easier to just do that to rotSpeed..

	// Use this for initialization
	void Start () {

	}
	
	// Update is called once per frame
	void Update () {
		// how to run without infinite loop
		/*
		bool s = true;
		if (s) 
		{
			StartCoroutine (RotateByDegree(30));
			s=false;
		}
		*/

		// test
		RotateToDegree (200, 5);
	}

	void Awake() {

	}
	
	public IEnumerator RotateByDegree(float angle)
	{
		float step = Time.deltaTime * rotSpeed;
		while(rot < angle)
		{
			if ((angle - rot)> step) // step
			{
				transform.Rotate(new Vector3(0,0, step));
				rot += step;
				yield return new WaitForSeconds(rotDelay);
			}
			else //incase less than step, we add remaining so it meets angle
			// for some reason its still off by 0.00X, idk why. not a big deal though
			{
				transform.Rotate(new Vector3(0,0, angle - rot));
				rot += angle - rot;
			}
		}
	}

	public void RotateToDegree(float endAngle)
	{
		StartCoroutine (RotateByDegree (endAngle - transform.eulerAngles.z));
	}

	public void RotateToDegree(float endAngle, float speed)
	{
		rotSpeed = speed;
		StartCoroutine (RotateByDegree (endAngle - transform.eulerAngles.z));
	}
}

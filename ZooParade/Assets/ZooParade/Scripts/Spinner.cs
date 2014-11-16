using UnityEngine;
using System.Collections;

public class Spinner : MonoBehaviour {
	public float rot; // amount rotated
	public float rotSpeed; // sets speed of rotation
	public float startx; // variables to hold strting mouse position
	public float starty;
	public float degree; // degree to rotate for completion
	public bool rotating = false; // rotating or not
	public float minRotation; //minimum degree to rotate

	// Use this for initialization
	void Start () {

	}
	
	// Update is called once per frame
	void Update () {
		if (!rotating)
		{
			// taking line from mouse click to mouse release is
			// too simplistic and fails for anything other than
			// line inputs

			// can fix by repeat calling mousebuttondown and rotating so
			// so that needle follows mouse
			// and then using mousebuttonup on last occurence of
			// startx/starty

			// or just force user to input lines

			if (Input.GetMouseButtonDown (0)) 
			{
				// starting position when mouse button down
				startx = Input.mousePosition.x;
				starty = Input.mousePosition.y;
				rot = 0; //make sure rot is 0
			}
			if (Input.GetMouseButtonUp (0))
			{
				// ending position
				float endx = Input.mousePosition.x;
				float endy = Input.mousePosition.y;
				// calculate degree to rotate and set
				degree = GetDegree (endx - startx, endy - starty);
				// threshhold must be passed
				// for spin to be valid
				if (Mathf.Abs(degree) > minRotation)
				{
					rotating = true; //start rotating
				}
			}
		}

		if (rotating)
		{
			RotateByDegree (degree);
			if (rot == degree)
			{
				rotating = false;
			}
		}
	}

	public float GetCurrentRot ()
	{
		return transform.eulerAngles.z;
	}

	void Awake() {

	}

	public float GetDegree (float xlength, float ylength)
	{
		float coEfficient = 0.942f;
		int rotDirection = 1;
		//break into 4 quadrants to simplify problem
		//hard code
		if (GetCurrentRot () < 90) 
		{
			if (ylength < 0) 
			{
				rotDirection = -1*rotDirection;
			}
		} else if (GetCurrentRot () < 180)
		{

			if (xlength > 0)
				rotDirection = -1*rotDirection;
			{
			}
		} else if (GetCurrentRot () < 270) //180 to 270 to do
		{
		} else //270 to 360 (or 0) to do
		{
		}
		// coefficient can be anything wanted
		return Mathf.Sqrt (xlength * xlength + ylength * ylength) * rotDirection * coEfficient;
	}
	
	public IEnumerator Rotate(float angle)
	{
		float step = rotSpeed;
		while(rot != angle)
		{
			if (Mathf.Abs(angle - rot)> step) // step
			{
				if (angle>rot)
				{
					transform.Rotate(new Vector3(0,0, step));
					rot += step;
					yield return new WaitForSeconds(0f);
				}else
				{
					transform.Rotate(new Vector3(0,0, -1*step));
					rot -= step;
					yield return new WaitForSeconds(0f);
				}
			}else //incase less than step, we add remaining so it meets angle
			{
				if (angle>rot)
				{
					transform.Rotate(new Vector3(0,0, angle - rot));
					rot = angle;
					yield return new WaitForSeconds(0f);
				}else
				{
					transform.Rotate(new Vector3(0,0, -1* Mathf.Abs(angle - rot)));
					rot = angle;
					yield return new WaitForSeconds(0f);
				}

			}
		}
	}

	public void RotateByDegree(float angle)
	{
		StartCoroutine (Rotate(angle));
	}

	public void RotateByDegree(float angle, float speed)
	{
		setSpeed (speed);
		StartCoroutine (Rotate(angle));

	}
	
	public void setSpeed(float speed)
	{
		rotSpeed = speed;
	}
}

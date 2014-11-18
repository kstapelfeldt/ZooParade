using UnityEngine;
using System.Collections;

public class Spinner : MonoBehaviour {
	Circle dialCircle;
	public float rot; // amount rotated
	public float rotSpeed; // sets speed of rotation
	public float startx; // variables to hold strting mouse position
	public float starty;
	public float degree; // degree to rotate for completion
	public bool rotating = false; // rotating or not
	public float minRotation; //minimum degree to rotate
	public bool hidden = false;

	// Use this for initialization
	void Start () {

	}
	
	// Update is called once per frame
	void Update () {

		if (dialCircle == null) 
		{
			dialCircle = new Circle ("DialCircle", new Vector3 (0, 0, 0), Screen.height / 2, Color.white);
		}

		Hide ();

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
		float coEfficient = 0.9142f;
		int rotDirection = 1;
		// break into 4 quadrants to simplify problem
		// brute force
		// only need to deal with 1 dimension (x or y) because of 4 quadrant divide
		if (GetCurrentRot () < 90) 
		{
			if (ylength < 0) 
			{
				rotDirection = -1*rotDirection;
			}
		} else if (GetCurrentRot () < 180)
		{
			if (xlength > 0)
			{
				rotDirection = -1*rotDirection;
			}
		} else if (GetCurrentRot () < 270)
		{
			if (ylength > 0) 
			{
				rotDirection = -1*rotDirection;
			}
		} else
		{
			if (ylength < 0)
			{
				rotDirection = -1*rotDirection;
			}

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


	public int AngleToValue(float degree, bool outer)
	{
		// 25-335 degree is 5 (special) or 2
		// 25-75 is 6 or 1
		// 75 to 105 is 3 or 4
		// 105 to 155 is 4 or 3
		// 155 to 205 is 5 or 2
		// 205 to 255 is 4 or 3
		// 255 to 285 is 3 or 4
		// 285 to 335 is 6 or 1
		if (degree >= 0 && degree < 25) 
		{
			if (!outer)
			{
				return 5;
			}
			else
			{
				return 2;
			}
		}
		if (degree >= 25 && degree < 75) 
		{
			if (!outer)
			{
				return 6;
			}
			else
			{
				return 1;
			}
		}
		//////
		if (degree >= 75 && degree < 105) 
		{
			if (!outer)
			{
				return 3;
			}
			else
			{
				return 4;
			}
		}
		if (degree >= 105 && degree < 155) 
		{
			if (!outer)
			{
				return 4;
			}
			else
			{
				return 3;
			}
		}
		if (degree >= 155 && degree < 205) 
		{
			if (!outer)
			{
				return 5;
			}
			else
			{
				return 2;
			}
		}
		if (degree >= 205 && degree < 255) 
		{
			if (!outer)
			{
				return 4;
			}
			else
			{
				return 3;
			}
		}
		if (degree >= 255 && degree < 285) 
		{
			if (!outer)
			{
				return 3;
			}
			else
			{
				return 4;
			}
		}
		if (degree >= 285 && degree < 335) 
		{
			if (!outer)
			{
				return 6;
			}
			else
			{
				return 1;
			}
		}
		//////
		if (degree < 360 && degree > 355) 
		{
			if (!outer)
			{
				return 5;
			}
			else
			{
				return 2;
			}
		}
	}

	public void Hide()
	{
		transform.Translate (new Vector3 (0, 0, 5));
		dialCircle.obj.transform.Translate (new Vector3 (0, 0, 5));
		hidden = true;
	}

	public void Show()
	{
		transform.Translate (new Vector3 (0, 0, 0));
		dialCircle.obj.transform.Translate (new Vector3 (0, 0, 0));
		hidden = false;
	}
}

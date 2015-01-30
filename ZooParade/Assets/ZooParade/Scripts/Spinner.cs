using UnityEngine;
using System.Collections;

//

public class Spinner : MonoBehaviour {

	float arrowx; //holds position to draw arrow to
	float arrowy;
	public float rot; // amount rotated
	public float rotSpeed; // sets speed of rotation
	float startx; // variables to hold strting mouse position
	float starty;
	public float degree; // degree to rotate for completion
	bool rotating = false; // rotating or not
	public float minRotation; //minimum degree to rotate
	public bool hidden = false;
	float hideTranslation = 1000;
	public float spinnerValue;
	public bool innerCircle;

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
			spinnerValue = RotateByDegree (degree, innerCircle);
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

	public int RotateByDegree(float angle, bool inner)
	/*
	 * This function takes an angle and a boolean variable
	 * that is used to differentiate between whether we are
	 * rotating around the inner or outer spinner.
	 * 
	 * It then rotates by 'angle' degrees and returns the value
	 * of the spinner it lands on.
	 */
	{
		StartCoroutine (Rotate(angle));

		if (rot == degree)
		{
			rotating = false;
			// Returns angle
			return AngleToValue (GetCurrentRot (), inner);
		}
		else
		{
			return -1;
		}
	}

	public IEnumerator RotateByDegree(float angle, float speed)
	{
		SetSpeed (speed);
		yield return StartCoroutine (Rotate(angle));
		if (rot == degree)
		{
			rotating = false;
		}
	}
	
	public void SetSpeed(float speed)
	{
		rotSpeed = speed;
	}


	public int AngleToValue(float degree, bool inner)
	{
		// inner or outer
		// 0-12/349.5-360 degree is 3 or 4
		// 12-63 is 6 or 1
		// 63 to 114.5 is 5 or 2
		// 114.5 to 167.5 is 6 or 1
		// 167.5 to 190.5 is 3 or 4
		// 190.5 to 245 is 4 or 3
		// 245 to 297.5 is 5 or 2
		// 297.5 to 349.5 is 4 or 3
		if (degree >= 0 && degree < 12)
		{
			if (inner)
			{
				return 3;
			}
			else
			{
				return 4;
			}
		}
		else if (degree >= 12 && degree < 63) 
		{
			if (inner)
			{
				return 6;
			}
			else
			{
				return 1;
			}
		}
		else if (degree >= 63 && degree < 114.5) 
		{
			if (inner)
			{
				return 5;
			}
			else
			{
				return 2;
			}
		}
		else if (degree >= 114.5 && degree < 167.5) 
		{
			if (inner)
			{
				return 6;
			}
			else
			{
				return 1;
			}
		}
		else if (degree >= 167.5 && degree < 190.5) 
		{
			if (inner)
			{
				return 3;
			}
			else
			{
				return 4;
			}
		}
		else if (degree >= 190.5 && degree < 245) 
		{
			if (inner)
			{
				return 4;
			}
			else
			{
				return 3;
			}
		}
		else if (degree >= 245 && degree < 297.5) 
		{
			if (inner)
			{
				return 5;
			}
			else
			{
				return 2;
			}
		}
		else if (degree >= 297.5 && degree < 349.5) 
		{
			if (inner)
			{
				return 4;
			}
			else
			{
				return 3;
			}
		}
		// 335 -> 360
		else
		{
			if (inner)
			{
				return 3;
			}
			else
			{
				return 4;
			}
		}
		
	}

	public void Hide()
	{
		if (!hidden) {
			transform.Translate (new Vector3 (0, 0, hideTranslation));
			hidden = true;
		}
	}

	public void Show()
	{
		if (hidden)
		{
			transform.Translate (new Vector3 (0, 0, -1*hideTranslation));
			hidden = false;
		}
	}
}

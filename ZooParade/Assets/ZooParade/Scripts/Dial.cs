using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Dial : MonoBehaviour {

	Dictionary<int,string> AnswerDial = new Dictionary<int, string>();
	Circle dialCircle;

	// Use this for initialization
	void Awake () 
	{
		//Add dictionary for the Answer Dial
		AnswerDial.Add (1, "RIGHT - Advance 1");
		AnswerDial.Add (2, "WRONG - Back 1");
		AnswerDial.Add (3, "Captured - Peg-In Animal on Picture Panel");
		AnswerDial.Add (4, "RIGHT - Advance 1");
		AnswerDial.Add (5, "WRONG - Animal escaped. Back 2 towards fresh trail.");
		AnswerDial.Add (6, "WRONG - Back 1");
		AnswerDial.Add (7, "WRONG - No move. Answer correctly next turn.");
		AnswerDial.Add (8, "WRONG - Back 1");
		AnswerDial.Add (9, "WRONG - No move. Answer correctly next turn.");
		AnswerDial.Add (10, "RIGHT - Advance 1");
		AnswerDial.Add (11, "RIGHT - Move Peg to Animal in Zoo");
		AnswerDial.Add (12, "NO MOVE - Too costly. Answer again next turn.");
		AnswerDial.Add (13, "WRONG - Animal escaped. Back 2 towards fresh trail.");
		AnswerDial.Add (14, "RIGHT - Advance 1");
		AnswerDial.Add (15, "WRONG - No move. Answer correctly next turn.");
		AnswerDial.Add (16, "RIGHT - Advance 1");
		AnswerDial.Add (17, "Captured - Peg-In Animal on Picture Panel");
		AnswerDial.Add (18, "NO MOVE - Too costly. Answer again next turn.");
		AnswerDial.Add (19, "NO MOVE - Too costly. Answer again next turn.");
		AnswerDial.Add (20, "RIGHT - Advance 1");
		AnswerDial.Add (21, "WRONG - Back 1");
		AnswerDial.Add (22, "WRONG - Animal escaped. Back 2 towards fresh trail.");
		AnswerDial.Add (23, "RIGHT - Move Peg to Animal in Zoo");
		AnswerDial.Add (24, "RIGHT - Advance 1");
		AnswerDial.Add (25, "WRONG - Back 1");
		AnswerDial.Add (26, "RIGHT - Advance 1");
		AnswerDial.Add (27, "WRONG - No move. Answer correctly next turn.");
		AnswerDial.Add (28, "WRONG - Back 1");
		AnswerDial.Add (29, "STORM - Trail Blocked - Go Back 2 Towards Fresh Trail.");
		AnswerDial.Add (30, "Captured - Peg-In Animal on Picture Panel");
		AnswerDial.Add (31, "RIGHT - Advance 1");
		AnswerDial.Add (32, "WRONG - No move. Answer correctly next turn.");
		AnswerDial.Add (33, "ANIMAL ALARMED - Back 2 Towards Fresh Trail.");
		AnswerDial.Add (34, "WRONG - Back 1");
		AnswerDial.Add (35, "WRONG - No move. Answer correctly next turn.");
		AnswerDial.Add (36, "RIGHT - Move Peg to Animal in Zoo");


	}

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
		//
	}
}

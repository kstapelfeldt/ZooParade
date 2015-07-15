using UnityEngine;
using System.Collections;
using System.Collections.Generic;

// Questions
// dial if we use it
// finish map/checkpoint adding
// get four players working

public class Game : MonoBehaviour {

	public Spinner needle;
	public Spinner circle;
	public GameObject board;
	public GameObject playerOneIcon;
	public bool requireSpin = false; // boolean to hold if requires a player to spin
	int playerTurn = 1;
	public bool hidden = false;
	public bool requireQ = false; // boolean to hold if requires a question to be shown
	public Checkpoint selectedChk; // holds the checkpoint that the user has selected
	public List<Checkpoint> selectFrom; // holds checkpoints the user can select from
	Map southAmericaMap;
	Player playerOne;
	public bool searching = false; // boolean to hold if requires searching for user selection of checkpoint
	public int spun=0;

	// Use this for initialization
	void Start ()
	{
		// spawn
		Checkpoint chk1 = new Checkpoint (-7.026673f, -4.465548f, false, false, false, false);
		Checkpoint chk2 = new Checkpoint (-6.464424f, -4.448907f, false, true, false, false);
		Checkpoint chk3 = new Checkpoint (-6.055532f, -4.442852f, false, true, false, false);
		Checkpoint chk4 = new Checkpoint (-5.6817688f, -4.113135f, false, false, true, false);
		Checkpoint chk5 = new Checkpoint (-5.132925f, -4.12382f, false, true, false, false);
		Checkpoint chk6 = new Checkpoint (-4.606953f, -4.141065f, false, true, false, false);
		Checkpoint chk7 = new Checkpoint (-4.079438f, -4.130863f, true, false, false, false);
		chk7.animalName = "Monkey";
		Checkpoint chk8 = new Checkpoint (-3.503273f, -4.141065f, false, true, false, false);
		Checkpoint chk9 = new Checkpoint (-2.985923f, -4.028972f, false, true, false, false);
		Checkpoint chk10 = new Checkpoint (-5.66752f, -3.615093f, false, true, false, false);

		chk1.SetNext (new List<Checkpoint> (new Checkpoint[] {chk2}));
		chk2.SetNext (new List<Checkpoint> (new Checkpoint[] {chk3}));
		chk3.SetNext (new List<Checkpoint> (new Checkpoint[] {chk4}));
		chk4.SetNext (new List<Checkpoint> (new Checkpoint[] {chk5, chk10}));
		chk5.SetNext (new List<Checkpoint> (new Checkpoint[] {chk6}));
		chk6.SetNext (new List<Checkpoint> (new Checkpoint[] {chk7}));
		chk7.SetNext (new List<Checkpoint> (new Checkpoint[] {chk8}));
		chk8.SetNext (new List<Checkpoint> (new Checkpoint[] {chk9}));
		chk9.SetNext (new List<Checkpoint> (new Checkpoint[] {})); //
		chk10.SetNext (new List<Checkpoint> (new Checkpoint[] {})); //

		Checkpoint[] checkpoints = new Checkpoint[]{chk1, chk2, chk3, chk4, chk5, chk6, chk7, chk8, chk9, chk10};

		Animal jaguar = new Animal ("Jaguar");
		Animal monkey = new Animal ("Monkey");
		Animal tapir = new Animal ("Tapir");
	
		Animal[] southAmericaAnimals = new Animal[] {jaguar, monkey, tapir};
		
		southAmericaMap = new Map ("South America", southAmericaAnimals, checkpoints);
		playerOne = new Player ("Player One", southAmericaMap, playerOneIcon);
		playerOne.currentCheckpoint = chk1;

	}

	// waits s seconds
	// sets requirespin to true
	// waits s seconds
	public IEnumerator WaitNSpin(float s)
	{
		yield return new WaitForSeconds(s);
		requireSpin = true;
		yield return new WaitForSeconds(s);
	}

	// waits s seconds
	// hides
	// waits s seconds
	public IEnumerator WaitNHide(float s)
	{
		yield return new WaitForSeconds(s);
		needle.Hide ();
		needle.spinnerValue = 0;
		requireSpin = false;
		yield return new WaitForSeconds(s);
		}
	// Update is called once per frame
	void Update () 
	{
		// How to debug a checkpoint
		// Debug.Log (playerOne.map.checkpoints [0].toString ());

		// move player if we have changed
		// the current checkpoint he is on
		if (playerOne.icon.transform.position.x != playerOne.currentCheckpoint.centreX || 
		    playerOne.icon.transform.position.y != playerOne.currentCheckpoint.centreY){
			playerOne.MovePlayer (playerOne.currentCheckpoint);
		}

		// essentially 3 parts to any player's turn
		// they either are shown question
		// shown spinner
		// get input to where they want to go

		if (requireQ) {
			// add later
		}

		else if (requireSpin) {
			needle.Show ();
			Hide();
			if (playerOne.currentCheckpoint.GetCheckpointType () == "redPoint"){
				needle.innerCircle = true;
			}
			else {
				needle.innerCircle = false;
			}

			if (needle.spinnerValue > 0){
				searching = true;
				spun = needle.spinnerValue;
				selectFrom = playerOne.currentCheckpoint.GetPossibleMoves(spun, playerOne);
				// Debug.Log (selectFrom[0].centreX);
				needle.spinnerValue = 0;
				// selectFrom = playerOne.map.checkpoints;
				StartCoroutine (WaitNHide (3f));
			}
		} 

		else {
			Show ();
			// currently hard code
			// in actuality should do check for green point
			// however, we dont' have any questions so...

			if (playerOne.currentCheckpoint == southAmericaMap.checkpoints[0]){
				showQuestion ();
				playerOne.MovePlayer (playerOne.currentCheckpoint.GetNext ()[0]);
			}
			else if (playerOne.currentCheckpoint == southAmericaMap.checkpoints[1]){
				showQuestion ();
				playerOne.MovePlayer (playerOne.currentCheckpoint.GetNext ()[0]);
			}
			else if (playerOne.currentCheckpoint == southAmericaMap.checkpoints[2]){
				showQuestion ();
				playerOne.MovePlayer (playerOne.currentCheckpoint.GetNext ()[0]);
				requireSpin = true;
			}

			// Searching for player point selection
			if (searching){
				if (Input.GetMouseButtonDown(0)){
					Ray ray = Camera.main.ScreenPointToRay (Input.mousePosition);
					RaycastHit hit;
					if (Physics.Raycast (ray, out hit)) {
						if (hit.collider.gameObject.tag == "Point"){ // mouse down on a point
							// get co-ordinates of the point that was clicked on
							float sphereX = hit.collider.gameObject.transform.position.x;
							float sphereY = hit.collider.gameObject.transform.position.y;

							// search through checkpoints to find the right one with x/y
							foreach (Checkpoint chkpt in playerOne.map.checkpoints){
							
								if (Mathf.Abs (chkpt.centreX - sphereX) < 0.001 & Mathf.Abs(chkpt.centreY - sphereY) < 0.001){
									selectedChk = chkpt;
									// Debug Statement.
									// Debug.Log ("selected x: " + selectedChk.centreX);
									// Debug.Log ("selected y: " + selectedChk.centreY);
									foreach (Checkpoint select in selectFrom){
										// Debug Statement.
										// Debug.Log ("sel x: " + select.centreX);
										// Debug.Log ("sel y: " + select.centreY);
										if (select == selectedChk){
											searching = false;
											StartCoroutine(WaitNSpin (3f));
											playerOne.MovePlayer (selectedChk);
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

	public void showQuestion()
	{

	}

	public void Hide()
	/*
	 * Hides the board and icons.
	 * Sets hidden to true.
	 */
	{
		if (!hidden) {
			board.transform.Translate (new Vector3 (0, 0, 1000));
			playerOneIcon.transform.Translate (new Vector3 (0, 0, 1000));
			hidden = true;
		}
	}
	
	public void Show()
	/*
	 * Shows the board and icons.
	 * Sets hidden to false.
	 */
	{
		if (hidden) {
			board.transform.Translate (new Vector3 (0, 0, -1000));
			playerOneIcon.transform.Translate (new Vector3 (0, 0, -1000));
			hidden = false;
		}
	}
}

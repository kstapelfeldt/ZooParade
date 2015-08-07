var continent;
function CreateSubmit(){

}

function test(){
	alert("hello");
}
function SelectContinent(cont){
	continent = cont.id;
	//cont.style.background = "green";
	if(continent == "NorthAmerica") continent = "North America";
	if(continent == "SouthAmerica") continent = "South America";
	alert(continent);
}

function Flip(id){
	id.style.transform = "rotateY(180deg)"
}
alert("welcome to my profile");
const cars = ["./pics/bd.png", "./pics/bg.png", "./pics/bgg.png"];
i = 0 ;
function change(ii) {
	i += ii ; 
	if (i === -1)
	{
		i = cars.length-1;
	}
	if (i >= cars.length)
	{
		i = 0;
	}
	x = "url("+cars[i]+")";
	const img = document.querySelector(".galaryimg");
	img.style.backgroundImage=x;
	// img.style.backgroundImage="url(images/img.jpg)";
}
clear();

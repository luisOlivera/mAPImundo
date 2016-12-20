function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

var myIndex = 0;
//carousel();

function carousel() {
	//console.log("dentro");
    var i;
    var div_img = document.getElementById('imagenes');
    var x = imagenes.getElementsByClassName("mySlides");
    //console.log(x.length);
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";  

    setTimeout(carousel, 2000); // Change image every 2 seconds
}
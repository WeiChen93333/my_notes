var a = {n:1};  
var b = a; // 持有a，以回查  
a.x = a = {n:2};  
alert(a.x);// --> undefined  
alert(b.x);// --> {n:2}
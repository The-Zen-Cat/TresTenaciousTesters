// JavaScript to illustrate eval() function
function func() {
 
	// Original string
	var a = 4;
	var b = 4;
 
	// Finding the multiplication
	var value = eval(new String(a * b));
	console.log(value);
}
// Driver code
func();
`//Primitives vs Objects

var a = 23;  // assign 23 to a
var b = a;  //copy the value stored in a
a = 46; //assign 46 to a
console.log(a);
console.log(b);



//Promitives

//create an object
var obj1 ={
	name : 'John',
	age: 26
};

var obj2 =obj1;
obj1.age = 30;
console.log(obj1.age);
console.log(obj2.age);


//closure

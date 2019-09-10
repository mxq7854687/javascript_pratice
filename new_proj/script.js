//function structor
/*
var john = {
	name: 'john',
	yearOfBirth: 1990,
	job:'teacher'
};

var Person = function(name,yearOfBirth,job){
	this.name = name;
	this.yearOfBirth = yearOfBirth;
	this.job = job;
}


var john = new Person('John',1990,'teacher');


//Primitives vs Objects

//Promitives
var a = 23;  // assign 23 to a
var b = a;  //copy the value stored in a
a = 46; //assign 46 to a
console.log(a)
console.log(b)


//object
var obj1 ={
	name : 'John',
	age: 26
};
console.log(typeof(obj1))
var obj2 =obj1;
console.log(obj2.age);
obj1.age = 30;
console.log(obj1.age);
console.log(obj2.age);

//function
var age = 27;
var obj={
	name:'jonas',
	city:'hk'
};

function change(a,b){
	a = 30,
	b.city = 'taiwan'
};

change(age,obj);

console.log(age);
console.log(obj.city);




var years = [1998,1965,1937,2005,1998];

function arrayCalc(arr,fn){
	var arrRes = [];
	for(var i =0;i<arr.length; i++){
		arrRes.push(fn(arr[i]));
	}
	return arrRes;
}


function calculateAge(el){
	return 2019-el;
}

function isFullAge(el){
	return el >= 18;
}

function maxHeatRate(el){
	if (el>= 18 && el<=81){
		return Math.round(206.9-(0.67 * el));
	}else{
		return -1;
	}
	
}
var ages = 
arrayCalc(years,calculateAge);//calculateAge as callback function without ()
var fullAges= arrayCalc(ages,isFullAge);

var rates = arrayCalc(ages,maxHeatRate);

console.log(ages);
console.log(fullAges);
console.log(rates);


//closure
function retirement(retirementAge){
	var a =' years left until retirment';
	return function(yearOfBirth){
		var age = 2016-yearOfBirth;
		console.log(retirementAge - age +a);
	}
}

retirement(65)(1990)

function interviewQuestion(job){
	return function(name){
		if(job==='teacher'){
			console.log(name+' what do you do');
		}
	}
}

interviewQuestion('teacher')('Sam')


//call 
var john={
	name: 'John',
	age:26,
	job:'teacher',
	presentation:function(style,timeOfDay){
		if (style==='formal'){
			console.log('Good '+timeOfDay+' formal', 'i\'m '+this.name)
		}else{
			console.log('Good '+timeOfDay+' friendly'+", i\'m "+this.name)
		}
	}
}

john.presentation('formal','morning');

var emily={
	name:'emily',
	age:30,
	job:'designer'
}
//call method
john.presentation.call(emily,'formal','morning')


var johnFriendly = john.presentation.bind(john,'friendly');
johnFriendly('afternoon');

var emilyFriendly = john.presentation.bind(emily,'formal');
emilyFriendly('hi')

*/



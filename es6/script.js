/// let and const

//ES5
var name5 = "Jane Smite";
var age5 = 23;
name5 = "Jane Miller";

console.log(name5);

//ES6
const name6 = 'Jane Smith';
const age6 =23;

//const is readyonly but let is variable;


//ES5
function driversLicence5(passedTest){
	if(passedTest){
		var firstName = "John";
		var dob = 1996;
		
	}
	console.log(firstName +" ,born in "+dob+" allow to drive a car.");
}

driversLicence5(true);

//ES6
function driversLicence6(passedTest){
	if(passedTest){
		let firstName = "John";
		const dob = 1996;
	}
	//error firstName not found
	//let cannot call outside the if block
	/////////console.log(firstName +" ,born in "+dob+" allow to drive a car.");
}

driversLicence6(true);
//but we can do on this way
function driversLicence6_1(passedTest){
	let firstName;
	//this may fail since const need a initializor like java "final"
	//const dob;
	if(passedTest){
		firstName = "John";
		dob = 1996;
	}
	//console.log(firstName +" ,born in "+dob+" allow to drive a car.");
}
//however this can work
function driversLicence6_1(passedTest){
	let firstName;
	const dob = 1996;
	if(passedTest){
		firstName = "John";
	}

	console.log(firstName +" ,born in "+dob+" allow to drive a car.");
}



let i =23;

for (let i=0;i<5;i++){
	console.log(i);
	//1,2,3,4
}
console.log(i);//23


//Blocks and IIFEs
{
	const a=1;
	let b =2;
	var c =3;
}
//a and b is not accessable outside the block;
//but c can get 
//c only block in function scope;


//Strings


let firstName = 'John';
let lastName = 'Smith';
const dob = 1990;
function calcAge(year){
	return 2019 - dob;
}

//ES5
console.log("this is "+firstName+' '+lastName+'. He was born in '+dob+'. Today he is '+ calcAge(dob)+ ' years old.');

//ES6
//`${variable}, ${functioncall}`
console.log(`This is ${firstName} ${lastName}.`)

const n = `${firstName} ${lastName}`;//John Smith
console.log(n.startsWith('J'));//true(exactly matach)
console.log(n.endsWith('th'));//true(exactly matach)
console.log(n.includes(' '));//true(exactly matach)
console.log(`${firstName} `.repeat(5));//true(exactly matach)


//arrow function
const years=[1990,1991,1992,1993];

//ES5 
var ages5 = years.map(function(el){
	return 2016-el;
	});
console.log(ages5);

//ES6
let ages6 = years.map(el =>2016-el);
console.log(ages6);

ages6 = years.map((el,index)=>`Age element ${index+1} : ${2016-el}`);

console.log(ages6);


ages6 = years.map(el =>2016-el);
console.log(ages6);

//if there are more than one line code use {}
ages6 = years.map((el,index)=>{
	const now = new Date().getFullYear();
	const age =now -el;
	return `Age element ${index+1} : ${age}`;


	});

console.log(ages6);


//more arrow function

//ES5
var box5 ={
	color:'green',
	position:1,
	//this only callable in this scope
	clickMe:function(){
		//the function may point this to window object
		document.querySelector('.green').addEventListener('click',function(){
			var str = "this is box number " + this.position + ' and it is '+ this.color;
			alert(str);
			})
	}
}

//however if we specific this is pointing to the box5_1 object then works
var box5_1 ={
	color:'green',
	position:1,
	clickMe:function(){
		var others = this;
		document.querySelector('.green').addEventListener('click',function(){
			var str = "this is box number " + others.position + ' and it is '+ others.color;
			alert(str);
			})
	}
}



//ES6
var box6 ={
	color:'green',
	position:1,
	clickMe:function(){
		document.querySelector('.green').addEventListener('click',()=>{
			var str = "this is box number " + this.position + ' and it is '+ this.color;
			alert(str);
			})
	}
}
box6.clickMe();


//this not work
/*
var box6 ={
	color:'green',
	position:1,
	clickMe:()=>{
		document.querySelector('.green').addEventListener('click',()=>{
			var str = "this is box number " + this.position + ' and it is '+ this.color;
			alert(str);
			})
	}
}
box6.clickMe();
*/



function Person(name){
	this.name = name;

}
//ES5
Person.prototype.myFriends5 = function(friends){
	
	var arr = friends.map(function(el){
		//use bind to trick it.
			return this.name + " is friend with "+ el;}.bind(this));
}

var friends = ["Bob", "Jane","Mark"];

new Person("John").myFriends5(friends);

//ES6
Person.prototype.myFriends6 = function(friends){
	
	var arr = friends.map(el=>`${this.name} is friend with ${el}`);

	console.log(arr);
}

var friends = ["Bob", "Jane","Mark"];

new Person("John").myFriends6(friends);

//destructuring

//ES5

var john = ['John',26];
var name = john[0];
var age = john[1];

//ES6

const [name1,age1] = ['John',26];
console.log(name1,age1);


const obj = {
	firstName1 : 'John',
	lastName1 : 'Smith'
};

const {firstName1,lastName1} = obj;

console.log(firstName1 ,lastName1);


const{firstName1:a,lastName1:b}=obj;
console.log(a,b);

function calcAgeRetirement(year){
	//assign a dummy to age2 variable
	const age2 = new
	Date().getFullYear()-year;
	return [age2,65-age2];
}

const [age2,retirement] = calcAgeRetirement(1996);
console.log(age1,retirement);

//Arrays

const boxes = document.querySelectorAll('.box');
//ES5

var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur){
	cur.style.backgroundColor = 'dodgerblue';
	});


//ES6

const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(cur=>cur.style.backgroundColor='dodgerblue');


//ES5
/*
for(var j =0; j<boxesArr5.length;j++){
	if(boxesArr5[j].className === 'box blue'){
		continue;
	}
	boxesArr5[j].textContent = 'I changed to blue';

}
*/
//ES6
for(const cur of boxesArr6){
	if(cur.className.includes('blue')){
		continue;
	}
	cur.textContent = 'I changd to blue';
}

//ES5
var ages = [12,17,8,21,14,11];

var full = ages.map(function(cur){
		return cur>=18;
	});
console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);


//ES6
console.log(ages.findIndex(cur=> cur>=18));
console.log(ages.find(cur=> cur>=18));


//Spared operator

function addFourAges(a,b,c,d){
	return a+b+c+d;
}
var sum1 = addFourAges(18,30,12,21);
console.log(sum1);

//ES5
var ages = [18,30,12,21];
var sum2 = addFourAges.apply(null,ages);
console.log(sum2);

//ES6
const sum3 = addFourAges(...ages);
console.log(sum3);

const familySmith = ['john','jane','mark'];
const familyMiller = ['mary','bob','ann'];
const bigFamily = [...familySmith,...familyMiller];
console.log(bigFamily);

const h = document.querySelector('h1');
const boxes6 = document.querySelectorAll('.box');
//use spared operator to trick h as an array with the boxes array
const all = [h,...boxes6];

Array.from(all).forEach(cur => cur.style.color = 'purple');



//function parameters(Rest)

//ES5
/*
function isFullAges5(){
	//console.log(arguments);
	var argsArr = Array.prototype.slice.call(arguments);
	argsArr.forEach(function(cur){
		console.log((2016-cur)>=18);
		});
}

isFullAges5(1996,2010,1994);


//ES6


function isFullAges6(...years){
	years.forEach(cur=>console.log((2016-cur)>=18));
}
isFullAges6(1996,2010,1994);
*/


//ES5

function isFullAges5(limit){
	var argsArr = Array.prototype.slice.call(arguments,1);
	argsArr.forEach(function(cur){
		console.log((2016-cur)>=limit);
		});
}

isFullAges5(21,1996,2010,1980);

function isFullAges6(limit,...years){
	years.forEach(cur=>console.log((2016-cur)>=limit));
}
isFullAges6(21,1996,2010,1980);

//Parameter(Default)

//ES5
/*
function SmithPerson(firstName,dob,lastName,nationality){
	lastName === undefined? lastName ='Smith':lastName = lastName;
	nationality === undefined? nationality='american':nationality=nationality;

	this.firstName=firstName;
	this.dob=dob;
	this.lastName=lastName;
	this.nationality=nationality;
}

var john = new SmithPerson('John',1990);
console.log(john);

var emily = new SmithPerson('Emily',1983,'Diaz','spanish');
console.log(emily);
*/


//ES6
function SmithPerson(firstName,dob,lastName='Smith',nationality='american'){
	this.firstName=firstName;
	this.dob=dob;
	this.lastName=lastName;
	this.nationality=nationality;
}
var john = new SmithPerson('John',1990);
console.log(john);

var emily = new SmithPerson('Emily',1983,'Diaz','spanish');
console.log(emily);


//Maps
const question = new Map();

question.set('question','what is the officail name of lasteste major JavaScript verson?');
question.set(1,'ES5');
question.set(2,'ES6');
question.set(3,'ES2015');
question.set(4,'ES7');
question.set('correct',3);

question.set(true,'Correct');
question.set(false,'Wrong');
console.log(question.get('question'));
console.log(question.size);

if(question.has(4)){
	//question.delete(4);	
}
//question.clear();

question.forEach((value,key)=>
	console.log(`this is ${key}, and its set to ${value}`));

//entries return all key:value pairs;
for(let [key,values] of question.entries()){
	if(typeof(key)==='number'){
		console.log(`Answer ${key}: ${values}`);
	}
}

//const ans = parseInt(prompt('Write the correct answer'));
//user true false trick as implement previous few lines without using if else statement

//console.log(question.get(ans===question.get('correct')));

//Classes


//ES5 
var Person5 = function(name,dob,job){
	this.name=name;
	this.dob=dob;
	this.job = job;
}

Person5.prototype.calculateAge = function(){
	var age = new Date().getFullYear - this.dob;
	console.log(age);
}

var john5 = new Person5('john',1994,'teach');


//ES6

class Person6 {
	constructor(name,dob,job){
		this.name=name;
		this.dob=dob;
		this.job=job;
	}
	calculateAge(){
	var age = new Date().getFullYear() - this.dob;
	console.log(age);
	}
	static greeting(){
		console.log("hi");
	}
}
const john6 = new Person6('John',1990,'teacher');

Person6.greeting();


//Class and Subclass



var Person5 = function(name,dob,job){
	this.name=name;
	this.dob=dob;
	this.job = job;
}

Person5.prototype.calculateAge = function(){
	//getFUllYeat()is a method
	var age = new Date().getFullYear() - this.dob;
	console.log(age);
}

var Athlete5 = function(name,dob,job,olymicGames,medals){
	//call super class and assign the properties;
	Person5.call(this,name,dob,job);
	this.olymicGames=olymicGames;
	this.medals=medals;
}

Athlete5.prototype = Object.create(Person5.prototype);
Athlete5.prototype.wonMedal=function(){
	this.medals++;
	console.log(this.medals);
};
var johnAthelte5 = new Athlete5('john',1994,'swimmer',3,10);

johnAthelte5.calculateAge();
johnAthelte5.wonMedal();

//ES6


class Athlete6 extends Person6{
	constructor(name,dob,job,olymicGames,medals){
		super(name,dob,job);
		this.olymicGames=olymicGames;
		this.medals=medals;
	}
	wonMedal(){
		this.medals++;
		console.log(this.medals);
	}
}
var johnAthelte6 = new Athlete6('john',1994,'swimmer',3,10);

johnAthelte6.calculateAge();
johnAthelte6.wonMedal();
















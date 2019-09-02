//budget controller
var budgetController = (function(){

	//use objecct to store data
	var Expense = function(id,description,value){
		this.id = id;
		this.description=description;
		this.value=value;
	}
	var Income = function(id,description,value){
		this.id = id;
		this.description=description;
		this.value=value;
	}
	//better way to represent the data structure
	var data = {
		allItems:{
			exp:[],
			inc:[]
		},
		total:{
			exp:0,
			inc:0
		}

	}
	return {
		addItem: function(type,des,val){
			var newItem,ID;

			//ID = last ID +1
			//create new ID
			if(data.allItems[type].length >0){
			ID=data.allItems[type][data.allItems[type].length-1].id + 1;}
			else {
				ID = 0;
			}

			//create new item based on 'inc' and 'exp'
			if(type==='exp'){
				newItem = new Expense(ID,des,val);
			}else if (type==='inc'){
				newItem = new Income(ID,des,val);
			}

			//push it into our data structure
			data.allItems[type].push(newItem);

			//return the new element
			return newItem;
		},
		testing: function(){
			console.log(data);
		}
	};

	})();

//UI controller
var UIController = (function(){
	//gathering all html input
	//only need to change in DOMstring when changing the html file
	var DOMstring ={
		inputType : '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputButton : '.add__btn'
	};

	return {
		getinput: function(){
			return {
				// return object to return all of 3 in the same time
			type : document.querySelector(DOMstring.inputType).value,	//will be either inc or exp
			description :document.querySelector(DOMstring.inputDescription).value,
			value : document.querySelector(DOMstring.inputValue).value

			};

		},
		//make DOMstring public
		getDOMstring : function(){
			return DOMstring;
		}
	};
	})();


//gloabal app controller
var Controller = (function(budgetCtrl,UICtrl){
	
	var setupEventListener = function(){	
			//---- click and enter both can trigger ctrlAddItem.
		document.querySelector(DOM.inputButton).addEventListener('click',ctrlAddItem);

		//'event' can be other words
		//keyCode can get the user input footprint
		document.addEventListener('keypress',function(event)
		{
			if(event.keyCode ===13 || event.which ===13)
			{
				ctrlAddItem();
			}
		});
	};

	var DOM = UICtrl.getDOMstring();

	var ctrlAddItem = function(){
		var input,newItem;

		//1. Get the filed input data
		input  = UICtrl.getinput();
		console.log(input);

		//2. Add the item to the budget controller
		newItem = budgetCtrl.addItem(input.type,input.description,input.value);

		//3. Add the item to the UI interface

		//4. Calculate the budget

		//5. display the budget		

	};

	return {
		init: function(){
			console.log('Application has started.');
			setupEventListener();
		}
	};
	})(budgetController,UIController);


Controller.init();
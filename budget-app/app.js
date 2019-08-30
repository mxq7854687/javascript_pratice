//budget controller
var budgetController = (function(){

	var x = 23;

	var add = function(a){
		return a+x;
	}

	return{
		publicTest:function(b){
			return add(b);
		}
	}
	})();

//UI controller
var UIController = (function(){
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
	//
	var DOM = UICtrl.getDOMstring();

	var ctrlAddItem = function(){
		//1. Get the filed input data
		var input  = UICtrl.getinput();
		console.log(input);

		//2. Add the item to the budget controller

		//3. Add the item to the UI interface

		//4. Calculate the budget

		//5. display the budget		
	}

	//---- click and enter both can trigger ctrlAddItem.


	document.querySelector(DOM.inputButton).addEventListener('click',ctrlAddItem);

	//'event' can be other words
	//keyCode can get the user input footprint
	document.addEventListener('keypress',function(event){
		if(event.keyCode ===13 || event.which ===13){
			ctrlAddItem();
		}
	});
	})(budgetController,UIController);
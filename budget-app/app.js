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

	var calculateTotal  = function(type){
		var sum = 0;
		//forEach(currentvalue ,index,array)
		data.allItems[type].forEach(function(cur){
			sum = sum + cur.value;
		});
		data.total[type] = sum;

	};


	//better way to represent the data structure
	//global data storage
	var data = {
		allItems:{
			exp:[],
			inc:[]
		},
		total:{
			exp:0,
			inc:0
		},
		buget:0,
		percentage:-1

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

		calculateBudget: function(){

			//calculate total input and expenses
			calculateTotal('exp');
			calculateTotal('inc');
			//calculate the budget: income - expenses
			data.buget = data.total.inc - data.total.exp;
			//calculate the percentage of income that we spent
			if(data.total.inc>0){
			data.percentage = Math.round((data.total.exp / data.total.inc) * 100);}
			else{
				data.percentage = -1;
			}

		},

		getBudget: function(){
			return {
				budget:data.budget,
				totalInc: data.total.inc,
				totalExp: data.toal.exp,
				percentage: data.percentage
			};
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
		inputButton : '.add__btn',
		incomeContainer: '.income__list',
		expenseContainer: '.expenses__list'
	};


	return {
		getinput: function(){
			return {
				// return object to return all of 3 in the same time
			type : document.querySelector(DOMstring.inputType).value,	//will be either inc or exp
			description :document.querySelector(DOMstring.inputDescription).value,
			value : parseFloat(document.querySelector(DOMstring.inputValue).value)

			};

		},

		addListItem:function(obj,type){
			var html,newhtml,element;
			//create html string with placceholder text
			if(type==='inc'){
				element = DOMstring.incomeContainer;
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}
			else if(type==='exp'){
				element = DOMstring.expenseContainer;
				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}
			//replace the placeholder text with some actual data
			newhtml = html.replace('%id%',obj.id);
			newhtml = newhtml.replace('%description%',obj.description);
			newhtml = newhtml.replace('%value%',obj.value);

			//insert html into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend',newhtml);

		},

		clearFields :function(){
			var fields, fieldsArr;
			//select all 
			fields = document.querySelectorAll(DOMstring.inputDescription+','+DOMstring.inputValue);

			//trick fiels to array*****
			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function(current,index,array){
				current.value = "";
			});
			fieldsArr[0].focus();
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

	var updateBudget = function(){

		//1. Calculate the budget
		budgetCtrl.calculateBudget();
		//2. Return the budget
		var budget = budgetCtrl.getBudget;
		//3. Display th e budget on the UI

	};
	var ctrlAddItem = function(){
		var input,newItem;

		//1. Get the filed input data
		input  = UICtrl.getinput();
		console.log(input);

		if(input.description!=="" && !isNaN(input.value) && input.value>0){
			//2. Add the item to the budget controller
			newItem = budgetCtrl.addItem(input.type,input.description,input.value);

			//3. Add the item to the UI interface
			UICtrl.addListItem(newItem,input.type);

			//4, Clear the fields
			UICtrl.clearFields();

			//5. Calculate and update the budget
			updateBudget();
			//6. display the budget		
		}

	};

	return {
		init: function(){
			console.log('Application has started.');
			setupEventListener();
		}
	};
	})(budgetController,UIController);


Controller.init();
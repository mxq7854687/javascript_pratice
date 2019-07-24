/*eslint-disable*/
var marks_w =  65;
var marks_h = 175;
var john_w = 69;
var john_h = 166;

var marks_bmi = marks_w / (marks_h * marks_h);
var john_bmi = john_w / (john_h * john_h);

var information = (marks_bmi > john_bmi);

console.log(information);


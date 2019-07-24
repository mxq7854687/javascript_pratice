var mark = {
  name: 'Mark',
  weight: 60,
  height:180,
  BMI:function(){
    return this.weight/(this.height/100)^2;
  }
};

var john = {
  name:'John',
  weight:80,
  height:165,
  BMI:function(){
    return this.weight/(this.height/100)^2;
  }
};

console.log(john.BMI());

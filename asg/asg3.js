var bill = [124,48,268];

var tip_calculator = function(money){
  if (money<50){
      return money*0.2;}else if(money<=200) {
        return money*0.15;
      }else {
        return money*0.1;
      }
}

var tip  = [tip_calculator(bill[0]),tip_calculator(bill[1]),tip_calculator(bill[2])];

console.log(tip);
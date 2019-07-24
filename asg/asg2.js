/* calculate john and mike average score*/

var john_avg = (89+120+103)/3;

var mike_avg = (89+120+103)/3;

var mary_avg = (89+120+103)/3;

if (john_avg > mike_avg && john_avg>mary_age){
  console.log('The winner is John and his score is '+john_avg);
}else if (mike_avg>john_avg&&mike_avg>mary_avg){
  console.log('The winner is Mike and his score is '+mike_avg) ; 
}else if (mike_avg===john_avg && john_avg===mary_avg){
  console.log('Draw, they have same score with '+john_avg);
}else{
  console.log('The winner is Mary and his score is '+mary_avg);
}

  
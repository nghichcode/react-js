# Yield
## Description
	+ function* là một trong những chức năng mới của Javascript trong ECMAScript 2015 (6th Edition, hay tắt là ES6).
	+ Có thể hiểu Generator function là một function, có khả năng tạm ngưng thực thi trước khi hàm kết thúc, và có thể tiếp tục chạy ở 1 thời điểm khác.
## Code
function* generator(i) {yield i;yield i + 10;}
var gen = generator(10);
console.log(gen.next().value);//10
console.log(gen.next().value);//20

## Passing arguments
function* logGenerator() {
  console.log(0);
  console.log(1, yield);
  console.log(2, yield);
  console.log(3, yield);
}
var gen = logGenerator();
gen.next();             // 0
gen.next('pretzel');    // 1 pretzel
gen.next('california'); // 2 california
gen.next('mayonnaise'); // 3 mayonnaise

## Generator defined (not constructable)
const foo = function* () {yield 10;yield 20;};
const bar = foo();
console.log(bar.next()); // {value: 10, done: false}

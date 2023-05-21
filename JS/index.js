//Напишіть функцію add(), яка приймає будь-яку кількість параметрів у такому вигляді:
//console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37

//замикання
const add = a => b => {
    if(b){
       return add((a+b))
    }
else{
    return a;
    }}
console.log(add(2)(5)(4)()); // 11

// Напишіть функцію, яка бере два рядки і повертає true, якщо вони є анаграмами одне одного.
function anagrama(str1,str2){
    //зрівнюєм 2 відсортовані та видозмінені рядки
    if(sort(str1)===sort(str2)){
        return  true;
    }
    else return false;
}
//функція для перетворення та сортування
const sort =(str)=>{
    //зводимо рядки у нижній регістр та сортуєм в алфавітному порядку масив з літер та утворюєм рядок
    return str.toLowerCase().split(' ').join('').split('').sort().join('');
}
console.log(anagrama('rano','Nora'))


// Напишіть функцію-обгортку, яка кешуватиме результат будь-якої іншої функції з довільною кількістю числових параметрів.
function wrapper(fn) {
  let cache = {};
  return (...args) => {
      //присвоєння значення ключу,що є аргументами функції
    const cacheKey = JSON.stringify(args);
    //якщо ключ,що складається з аргументів функції нема у кеші вираховуєм значення,що належить цьому ключу
    if (!(cacheKey in cache)) {
      cache[cacheKey] = fn(...args);
    }
      //інкаше повертаєм значення,яке вже раніше було обчислене та знаходиться у кеші
    return cache[cacheKey];
  }
}
const calc = (a, b, c) => (a+b)*c;
const cachedCalc = wrapper(calc);
console.log(cachedCalc(2,2,3));//12 calculated
console.log(cachedCalc(2,7,1));//9 calculated
console.log(cachedCalc(2,2,3));//12 from cache


// Напишіть функцію, яка глибоко клонує об'єкт, переданий їй параметром.

const user = {
  name: "Alexander",
  age: 26,
  adress:{
    street:'bruklin',
    number:4
},
  hi(){
    console.log('say hi')
  }
};
function deepClone(obj) {
    // Ініціалзуємо об'єкт клона
    const clone = {};
    // Проходимося по об'єкту циклом
    for (let prop in obj) {
        // Якщо поле об'єкта є об'єктом,рекурсивно викликаємо функцію
        if (typeof (obj[prop]) === "object") {
            clone[prop] = deepClone(obj[prop]);
        }
        // Клонуємо поле
        else clone[prop] = obj[prop];
    }
    return clone;
}
console.log(user);
const cloneUser=deepClone(user);//клонуєм об'єкт
cloneUser.adress.number=1001;//змінюємо поле квартири
console.log(cloneUser);//бачимо шо об'єкт глибоко склонований


//Те саме клонування,але іншим способом(мабуть він поганий,але вирішила його залишити)

//функція для клонування методів об'єкту
function getProp(obj) {
    const clone={};
    for (let prop in obj) {
        if (typeof (obj[prop]) === 'function') {
            clone[prop] = obj[prop];
        }
    }
    return clone;
}
 const cloneU=(obj)=>{
     //клонуєм об'єкт,але недолік цього способу,що неклонуються методи
  const cloneWoF=JSON.parse(JSON.stringify(obj))
     //окремо клонуєм методи
   const functions=getProp(obj);
     //повертаєм об'єкт складений з окремо склонованих методів та полів
   return {...cloneWoF,...functions};
 }
 console.log(user);
const cloneUser2=cloneU(user)//клонуєм об'єкт
cloneUser2.adress.number=101;//змінюємо поле квартири
 console.log(cloneUser2);//бачимо шо об'єкт глибоко склонований
 const os=require("os");
 console.log(os.arch())
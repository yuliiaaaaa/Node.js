//Напишіть функцію add(), яка приймає будь-яку кількість параметрів у такому вигляді:
//console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37

///замикання
const add = (a: number):Function => (b?:number) => {
  if(b){
     return add((a+b))
  }
else{
  return a;
  }}
console.log(add(2)(7)(50)()); // 59

// Напишіть функцію, яка бере два рядки і повертає true, якщо вони є анаграмами одне одного.
function anagrama(str1:string,str2:string):boolean{
    //зрівнюєм 2 відсортовані та видозмінені рядки
    if(sort(str1)===sort(str2)){
        return  true;
    }
    else return false;
}
//функція для перетворення та сортування
const sort =(str:string):string=>{
    //зводимо рядки у нижній регістр та сортуєм в алфавітному порядку масив з літер та утворюєм рядок
    return str.toLowerCase().split(' ').join('').split('').sort().join('');
}
console.log(anagrama('rano','Nora'))


// Напишіть функцію-обгортку, яка кешуватиме результат будь-якої іншої функції з довільною кількістю числових параметрів.
interface Cache {
  [key: string]: number;
}
function wrapper(fn:(...args:number[])=>number) {
    let cache:Cache= {};
    return (...args:number[]):number => {
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
  const calc = (a:number, b:number, c:number):number=> (a+b)*c;
  const cachedCalc = wrapper(calc);
  console.log(cachedCalc(2,2,3));//12 calculated
  console.log(cachedCalc(2,7,1));//9 calculated
  console.log(cachedCalc(2,2,3));//12 from cache
  
  // Напишіть функцію, яка глибоко клонує об'єкт, переданий їй параметром.
type Person={name:string,age:number,adress:Adress,hi:()=>void};
type Adress={street:string,number:number}
let user:Person={
    name: "Alexander",
    age: 26,
    adress:{
      street:'bruklin',
      number:4
  },
    hi():void{
      console.log('say hi')
    },
  };
  function deepClone<T>(obj:T):T {
      // Ініціалзуємо об'єкт клона
      const clone:T={} as T;
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
  cloneUser.adress.number=12;//змінюємо поле квартири
  console.log(cloneUser);//бачимо шо об'єкт глибоко склонований

export{sort}
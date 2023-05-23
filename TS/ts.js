"use strict";
//Напишіть функцію add(), яка приймає будь-яку кількість параметрів у такому вигляді:
//console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = void 0;
///замикання
var add = function (a) { return function (b) {
    if (b) {
        return add((a + b));
    }
    else {
        return a;
    }
}; };
console.log(add(2)(7)(50)()); // 59
// Напишіть функцію, яка бере два рядки і повертає true, якщо вони є анаграмами одне одного.
function anagrama(str1, str2) {
    //зрівнюєм 2 відсортовані та видозмінені рядки
    if (sort(str1) === sort(str2)) {
        return true;
    }
    else
        return false;
}
//функція для перетворення та сортування
var sort = function (str) {
    //зводимо рядки у нижній регістр та сортуєм в алфавітному порядку масив з літер та утворюєм рядок
    return str.toLowerCase().split(' ').join('').split('').sort().join('');
};
exports.sort = sort;
console.log(anagrama('rano', 'Nora'));
// Напишіть функцію-обгортку, яка кешуватиме результат будь-якої іншої функції з довільною кількістю числових параметрів.
function wrapper(fn) {
    var cache = {};
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //присвоєння значення ключу,що є аргументами функції
        var cacheKey = JSON.stringify(args);
        //якщо ключ,що складається з аргументів функції нема у кеші вираховуєм значення,що належить цьому ключу
        if (!(cacheKey in cache)) {
            cache[cacheKey] = fn.apply(void 0, args);
        }
        //інкаше повертаєм значення,яке вже раніше було обчислене та знаходиться у кеші
        return cache[cacheKey];
    };
}
var calc = function (a, b, c) { return (a + b) * c; };
var cachedCalc = wrapper(calc);
console.log(cachedCalc(2, 2, 3)); //12 calculated
console.log(cachedCalc(2, 7, 1)); //9 calculated
console.log(cachedCalc(2, 2, 3)); //12 from cache
var user = {
    name: "Alexander",
    age: 26,
    adress: {
        street: 'bruklin',
        number: 4
    },
    hi: function () {
        console.log('say hi');
    },
};
function deepClone(obj) {
    // Ініціалзуємо об'єкт клона
    var clone = {};
    // Проходимося по об'єкту циклом
    for (var prop in obj) {
        // Якщо поле об'єкта є об'єктом,рекурсивно викликаємо функцію
        if (typeof (obj[prop]) === "object") {
            clone[prop] = deepClone(obj[prop]);
        }
        // Клонуємо поле
        else
            clone[prop] = obj[prop];
    }
    return clone;
}
console.log(user);
var cloneUser = deepClone(user); //клонуєм об'єкт
cloneUser.adress.number = 12; //змінюємо поле квартири
console.log(cloneUser); //бачимо шо об'єкт глибоко склонований

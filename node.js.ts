// Напишіть функцію, яка приймає будь-який тип масиву та асинхронний колбек, який викликається для кожного елемента масиву послідовно.
// Результатом виклику має бути масив результатів колбеку. Усі типи мають застосовуватися автоматично (функція шаблону). 
//Приклад виклику:


async function runSequent<T, R>(
  array: T[],
  callback: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < array.length; i++) {
    const result = await callback(array[i], i);
    results.push(result);
  }
  return results;
}

(async () => {
  const myArray: string[] = ["one", "two", "three"];

  const results = await runSequent(myArray, (item, index) =>
    Promise.resolve({
      item,
      index,
    })
  );

  console.log(results);
})();


// IDE має розглядати змінні з прикладу так:
// item type = string
// index type = number
// results type = Array<{item: string, index: number}>

//Напишіть функцію, яка приймає будь-який тип масиву та правило для видалення елементів масиву. 
//Функція змінює переданий масив, а усі видалені елементи функція повертає окремим масивом такого ж типу. 
//Усі типи мають застосовуватися автоматично (функція шаблону). Приклад виклику:
const array = [1, 2, 3, 6, 7, 9];

const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);
function arrayChangeDelete<T>(array:T[],callback:(item:T)=>boolean):T[]{
 const deletedElements:T[]=[];
for(let i=0;i<array.length;i++){
  if(callback(array[i])){
 deletedElements.push(array[i]);
 array.splice(i,1);
  }
}
return deletedElements;
}
console.log(deletedElements)

//Напишіть скрипт, який отримує з командного рядка числовий параметр – частоту в секундах. 
//Скрипт має виводити на кожному тику (визначеному частотою) наступну системну інформацію:

// - operating system;
// - architecture;
// - current user name;
// - cpu cores models;
// - cpu temperature;
// - graphic controllers vendors and models;
// - total memory, used memory, free memory в GB;
// - дані про батарею (charging, percent, remaining time). 

// Знайдіть і використайте функціональність підходящих модулів.
const os = require("os");
const _process=require('process');
const si = require('systeminformation');

async function operatingSystem():Promise<void>{
console.log("operating system:",os.type())
console.log("architecture:",os.arch())
console.log("current user name:",os.userInfo().username)
console.log("cpu cores models:",os.cpus()[0].model)
const cpu = await si.cpu();
console.log("CPU temperature:", `${cpu.temperature} °C`);
const graphics = await si.graphics();
graphics.controllers.map(
  (controller: { vendor: any; model: any }) =>
    `${controller.vendor} ${controller.model}`
);
const batteryInfo = await si.battery();
console.log(`Battery charging: ${batteryInfo.isCharging ? "Yes" : "No"}`);
console.log(`Battery percent: ${batteryInfo.percent}`);
console.log(`Battery remaining time: ${batteryInfo.timeRemaining}`);}
operatingSystem();
process.stdin.on('data',(data:number)=>{
if (isNaN(data)){
throw new Error('not a number');
}
setInterval((operatingSystem),data*1000)});

// Напишіть скрипт, який отримує з командного рядка рядковий параметр - шлях до JSON-файла із масивом рядків - посилань, читає та аналізує його вміст. 
// Скрипт має створити папку «<JSON_filename>_pages» і для кожного посилання із <JSON-файла отримати його HTML-вміст і зберегти цей вміст у окремому файлі в новоствореній папці.
//  Приклад JSON-файла (list.json) прикріплений до цього практичного завдання нижче.
const fs = require('fs');
const path=require('path');
import fetch from 'node-fetch';
const jsonPath:string=path.join(__dirname,'links.json')
const jsonData:object = fs.readFileSync(jsonPath);
const links:string[] = JSON.parse(jsonData.toString());
const dirPath:string=path.join(__dirname,'JSON_Links_pages');

fs.mkdir(path.join(__dirname,'JSON_Links_pages'),{},(err: Error)=>{
  if(err)throw  err;
  console.log('folder created');
  })

let settings = { method: "Get" };
for(let i:number=0;i<links.length;i++){
fetch(links[i],settings )
    .then((res) => res.text())
    .then((text) => {
 fs.writeFile(path.join(dirPath,'textfile'+`${i}`+'.txt'),
text,
(err: Error)=>{
if(err) throw err;
console.log('file write'+`${i}`)
})})}

// завдання 5
type EventHandler = (...args: any[]) => void;

class MyEventEmitter {
  private events: Map<string, EventHandler[]>;

  constructor() {
    this.events = new Map<string, EventHandler[]>();
  }

  public registerHandler(eventType: string, handler: EventHandler): void {
    if (this.events.has(eventType)) {
      this.events.get(eventType)?.push(handler);
    } else {
      this.events.set(eventType, [handler]);
    }
  }

  public unregisterHandler(eventType: string, handler: EventHandler): void {
    if (!this.events.has(eventType)) {
      return;
    }

    const handlers = this.events.get(eventType);
    const index = handlers?.indexOf(handler) ?? -1;

    if (index >= 0) {
      handlers?.splice(index, 1);
    }
  }

  public emitEvent(eventType: string, ...args: any[]): void {
    const handlers = this.events.get(eventType);

    if (handlers) {
      for (const handler of handlers) {
        handler(...args);
      }
    }
  }
}

const emitter = new MyEventEmitter();
emitter.registerHandler("userUpdated", () =>
  console.log("Обліковий запис користувача оновлено")
);
emitter.emitEvent("userUpdated"); // Обліковий запис користувача оновлено
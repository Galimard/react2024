// MAP

const data = new Map([
  [1, 'Один как число'],
  ['1', 'Один как строка'],
]);

//либо динамически
data.set(1, 'Один как число')
data.set('1', 'Один как строка')

//ключ может быть любым типом

//получить данные
console.log(data.get(1)); //'Один как число'

//есть ли такой ключ
console.log(data.has('name')); //false

console.log(data.delete('name')); // удаление по ключу
console.log(data.clear()); // очищение всей коллекции

//методы
console.log('keys', data.keys());
console.log('values', data.values());
console.log('entries', data.entries());



// SET - хранит только значения, только в единственном экземпляре

const set = new Set([1, 2, 2, 2, 3]); // {1, 2, 3}

set.add('sdfdf');
set.delete('sdfdf');
set.has('sdfdf'); //значение
set.clear();

//методы
console.log('keys', set.keys());
console.log('values', set.values());
console.log('entries', set.entries());
/**
 * Конструктор класса обмена сообщениями
 * @constructor
 */
function PubSub(){}
 
/**
 * Объект событий
 */
PubSub.prototype.events = {};
 
/**
 * Функция подписки на событие
 * @param  {string} eventName имя события
 * @param  {function} handler функция которая будет вызвана при возникновении события
 * @return {function}         ссылка на handler
 */
PubSub.prototype.subscribe = function(eventName, handler) {
    if(!this.events[eventName]) {
        this.events[eventName] = [];
    }
 
    if(typeof this === 'function') {
        this.events[eventName].push(this);
 
        return this;
    }
 
    this.events[eventName].push(handler);
 
    return handler;
};
 
/**
 * Функция отписки от события
 * @param  {string} eventName имя события
 * @param  {function} handler функция которая будет отписана
 * @return {function}         ссылка на handler
 */
PubSub.prototype.unsubscribe = function(eventName, handler) {
    var thisEvents = this.events[eventName],
        i = thisEvents.length - 1;
 
        for(i; i >= 0; i--) {
            if(thisEvents[i] === handler) {
                thisEvents.splice(i,1);
                console.log('Unsubscribe function - ' + handler.name + ' on ' + eventName + ' events');
            }
        }
 
    return handler;
};
 
/**
 * Функция генерирующая событие
 * @param  {string} eventName имя события
 * @param  {object} data      данные для обработки соответствующими функциями
 * @return {bool}             удачен ли результат операции
 */
PubSub.prototype.publish = function(eventName, data) {
    if(!this.events[eventName]) {
        console.log('Error: Not a single one event with this name is not found');
        return false;
    }
 
    var thisEvents = this.events[eventName],
        i = thisEvents.length - 1;
 
    for(i; i >= 0; i--) {
        thisEvents[i].apply(this, arguments);
    }
 
    return true;
};
 
/**
 * Функция отписывающая все функции от определённого события
 * @param  {string} eventName имя события
 * @return {bool}             удачен ли результат операции
 */
PubSub.prototype.off = function(eventName) {
    if(!this.events[eventName]) {
        return false;
    }
 
    delete this.events[eventName];
    console.log('Unsubscribe all functions on ' + eventName + ' events');
    return true;
};
 
/**
 * @example
 *
 * PubSub.subscribe('click', function(event, data) { console.log(data) });
 * var second = PubSub.subscribe('click', function(event, data) { console.log(data) });
 *
 * //Отписать одну функцию от события 'click':
 * PubSub.unsubscribe('click', second);
 *
 * //Отписать группу функций от события 'click'
 * PubSub.off('click');
 */
 
/*
    Дополнительный вариант — без явного использования глобального объекта
    нужно заставить работать методы верно у любой функции
 */
 
 Function.prototype.events = PubSub.prototype.events;
 Function.prototype.subscribe = PubSub.prototype.subscribe;
 Function.prototype.unsubscribe = PubSub.prototype.unsubscribe;
 Function.prototype.publish = PubSub.prototype.publish;
 
// function foo() {
//     console.log('this.name');
// }
 
// foo.subscribe('click');
// foo.publish('click');
 
// foo.unsubscribe('click');
 
/* ===== TestArea ====== */
function t(event, data) {
    if(!data.text) {
        console.log('function F init without arguments');
        return;
    }
    console.log(data.text);
}
 
function n(event, data) {
    if(!data.name) {
        console.log('function G init without arguments');
        return;
    }
    console.log(data.name);
}
 
function b(){
    console.log('function B init');
}
 
var pubsub = new PubSub();
 
pubsub.subscribe('click', function(event, data) { console.log(data); });
pubsub.subscribe('click', t);
pubsub.subscribe('click', n);
pubsub.unsubscribe('click', t);
pubsub.unsubscribe('click', b);
pubsub.off('click');
pubsub.publish('click', { text: 'Text data of function T', name: 'Name data of function N' });
 
/* ===== END TestArea ====== */
#Домашняя работа

##PubSub шаблон

###Необходимо реализовать шаблон проектирования Publish/Subscribe.

Объект должен уметь:
  * подписывать функции на соответствующее событие
  * отписывать нужную функцию от события
  * отписывать группу функций от конкретного события
  * отписывать все функции от соответствующего события

###Второй вариант
Дополнительно у каждой функции должны появиться методы `subscribe` и `unsubscribe`

В файле `pubsub/pubsub.js` описан базовый интерфейс, который нужно реализовать.

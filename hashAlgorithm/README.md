# SHA-1

SHA-1 (Secure Hash Algorithm 1) є криптографічним алгоритмом хешування, який використовується для створення унікального хеш-коду (короткого числового представлення) вхідних даних. Він приймає на вхід повідомлення будь-якої довжини і генерує фіксований хеш-код довжиною 160 біт (20 байт).

## Завдання
Напишіть власну реалізацію алгоритму гешування SHA-1 або SHA-3 (Keccak) на вибір. Зверніть увагу, що ці алгоритми гешування є блочними і вхідні дані слід правильно розділити на порції, кожна довжиною рівно один блок. Якщо останній блок є неповним його треба доповнити згідно зі специфікацією алгоритма.
Ваша функція повинна мати змогу загешувати будь-які дані довільної довжини. В більш розширеному варіанті можете реалізувати подачу вхідних даних порціями, тобто щоб можна було декілька разів викликати функцію гешування передаючи кожну наступну порцію даних для гешування. Ця функціональність буде доречна для гешування дуже великих обсягів даних, коли неприпустимо зберігати одразу весь аргумент функції в памʼяті.

## Встановлення
**Щоб запустити проєкт, потрібно встановити Node.js на свій комп'ютер. Ви можете завантажити інсталятор Node.js з офіційного веб-сайту Node.js (https://nodejs.org) і встановити його згідно інструкцій для вашої операційної системи.**

1. Клонування проєкту:
```bash
git clone https://github.com/yarslvd/cryptography.git
```
2. Перейдіть до папки symmetricEncryption `cd hashAlgorithm`
3. Виконайте `npm install`

## Запуск
 
```bash
node index.js 
```

## Тест на співпадіння гешу з бібліотечною реалізацією
Нажаль, щось пішло не так і результат мого алгоритму не співпадав з результатом бібліотечного(object-hash). Використовував https://www.metamorphosite.com/one-way-hash-encryption-sha1-data-software джерело для вивчення алгоритму та по ньому і реалізовував алгоритм.

## Порівняння швидкодії власної реалізації з бібліотечною реалізацією
![Test result example](https://i.imgur.com/eAhHeVO.png) \n
Моя реалізація алгоритму є не такою швидкою як у бібліотеки, це через те що масив байтів потім у функції конвертується у строку з бітами. Це було зроблено випадково, бо спочатку я прочитав завдання трохи не так і реалізував алгоритм який побудований на використанні строк бітів ;)
![Test result example](https://i.imgur.com/mz8wPGQ.png) \n
Памʼяті використовується трошки більше чим в бібліотечній реалізації, але я вважую що це нормальний результат.
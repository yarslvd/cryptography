# ECDH
ECDH (Elliptic Curve Diffie-Hellman) є протоколом обміну ключами, який використовує еліптичні криві для безпечного встановлення спільного секретного ключа між двома або більше сторонами. Основна ідея протоколу ECDH полягає в тому, що кожна сторона генерує приватний ключ (випадкове число) і обчислює відповідний публічний ключ на основі цього приватного ключа. Публічні ключі потім обмінюються між сторонами. Після обміну публічними ключами кожна сторона використовує власний приватний ключ та отриманий публічний ключ і обчислює спільний секретний ключ. Цей спільний ключ може бути використаний для шифрування та розшифрування повідомлень між сторонами або для встановлення безпечного з'єднання.

## Завдання
З використанням ваших функцій-обгорток реалізуйте генерацію спільного секрету для двох учасників за протоколом ECDH. Порядок обчислень для кожного з учасників наведено нижче:
* Кожен учасник вибирає своє випадкове число (особистий ключ) з діапазону (0, n-1), де n – порядок базової точки. Нехай ці особисті ключі будуть позначені як «privKey1» та «privKey2».
* Кожен учасник обчислює відповідну точку еліптичної кривої (відкритий ключ), використовуючи свій особистий ключ та загально системні параметри (крива, базова точка та її порядок). Нехай ці відкриті ключі будуть позначені як «pubKey1» та «pubKey2».
* Учасники протоколу виконують обмін своїми відкритими ключами. В результаті учасник 1 отримує «pubKey2», а учасник 2 отримує «pubKey1».
* Учасник 1 використовує свій особистий ключ «privKey1» та відкритий ключ «pubKey2» і обчислює спільну точку, використовуючи операцію множення точки на скаляр на еліптичній кривій. Ця точка є спільним секретом. Учасник 1 використовує X координату цієї точки в якості результуючого спільного секрету.
* Учасник 2 використовує свій особистий ключ «privKey2» та відкритий ключ «pubKey1» і обчислює спільну точку, використовуючи операцію множення точки на скаляр на еліптичній кривій. Ця точка є спільним секретом. Учасник 2 використовує X координату цієї точки в якості результуючого спільного секрету.


## Встановлення
**Щоб запустити проєкт, потрібно встановити Go на свій комп'ютер. Завантажте та встановіть Go з офіційного веб-сайту Go (https://golang.org). Виберіть версію Go, яка підходить для вашої операційної системи та архітектури.**

1. Клонування проєкту:
```bash
git clone https://github.com/yarslvd/cryptography.git
```
2. Перейдіть до папки ecdh `cd ecdh`

## Запуск

```bash
go run main.go 
```

## Перевірка коректності роботи перетворень
![Test result example](https://i.imgur.com/c8wQf5P.png) <br>
Кожен учасник генерує свій приватний ключ, потім ці ключі передаються в функцію `ecdh()`, де створюється спільний секрет<br><br>
![Test result example](https://i.imgur.com/ZtsUuuC.png) <br>
Якщо процесс створення пройшов успішно то повертається повідомлення про це та спільний ключ

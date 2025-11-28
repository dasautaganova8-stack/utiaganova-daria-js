// Импорт библиотек
const fs = require('fs').promises;
const readline = require('readline');

const fileName = 'usersList.json';

// Регулярные выражения для валидации
const emailRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z]+\.[a-zA-Z]{2,6}$/;
const cityRegex = /^[a-zA-Zа-яА-Я\s-]{2,}$/;

try {
  getAllUsers()
    .then(users => createUser(users))
} catch (e) {
  console.log(e);
}

async function getAllUsers() {
  try {
    const data = await fs.readFile(fileName, 'utf8');
    const users = await JSON.parse(data.toString());
    return users;
  } catch (error) {
    // Если файл не существует, возвращаем пустой массив
    return [];
  }
}

async function printAllUsers() {
  const data = await getAllUsers();
  console.log(data);
}

// Функция для ввода email с валидацией
function inputEmail(rl) {
  return new Promise((resolve) => {
    const askEmail = () => {
      rl.question('Введите ваш email: ', (email) => {
        if (emailRegex.test(email)) {
          resolve(email);
        } else {
          console.log('Ошибка: email должен содержать только буквы, цифры, точки и тире до @, после @ - только буквы и точки, домен 2-6 букв');
          askEmail(); // Запрашиваем снова
        }
      });
    };
    askEmail();
  });
}

// Функция для ввода города с валидацией
function inputCity(rl) {
  return new Promise((resolve) => {
    const askCity = () => {
      rl.question('Введите ваш город: ', (city) => {
        if (cityRegex.test(city) && city.length >= 2) {
          resolve(city);
        } else {
          console.log('Ошибка: город должен содержать минимум 2 символа, только буквы, пробелы и дефисы, без цифр');
          askCity(); // Запрашиваем снова
        }
      });
    };
    askCity();
  });
}

async function createUser(promisedUsers) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const users = await promisedUsers;
  const newUser = {};

  try {
    // Запрашиваем имя
    const name = await new Promise((resolve) => {
      rl.question('Напишите ваше имя: ', resolve);
    });
    newUser.name = name;

    // Запрашиваем возраст
    const age = await new Promise((resolve) => {
      rl.question('Напишите ваш возраст: ', resolve);
    });
    newUser.age = parseInt(age);

    // Запрашиваем email с валидацией
    newUser.email = await inputEmail(rl);

    // Запрашиваем город с валидацией
    newUser.city = await inputCity(rl);

    // Добавляем нового пользователя в массив
    users.push(newUser);
    
    // Записываем в файл
    await fs.writeFile(fileName, JSON.stringify(users, null, 2));
    console.log('Пользователь успешно добавлен!');

  } catch (error) {
    console.error('Ошибка при создании пользователя:', error);
  } finally {
    rl.close();
  }
}

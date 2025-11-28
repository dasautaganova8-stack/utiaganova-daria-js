
const fs = require('fs');
const readline = require('readline');

// Создание интерфейса для чтения из консоли
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Сохранение введенного текста в файл
rl.question('Введите текст для сохранения в файл: ', (text) => {
  // Перезаписываею файл 
  fs.writeFile('output.txt', text, 'utf8', (err) => {
    if (err) {
      console.error('Ошибка записи:', err);
      return;
    }
    console.log('Текст успешно сохранен в output.txt');
    processTask2(); // Перехожу к задаче 2 после завершения
  });
});

//  Анализ файла data.txt
function processTask2() {
  fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения data.txt:', err);
      processTask3(); 
      return;
    }

    // Подсчет строк 
    const lines = data.split('\n');
    const lineCount = lines.length;
    
    // Подсчет символов 
    const charCount = data.replace(/\n/g, '').length;

    console.log(`Количество строк: ${lineCount}`);
    console.log(`Количество символов: ${charCount}`);
    processTask3();
  });
}

//  Построчный ввод с сохранением в log.txt
function processTask3() {
  console.log('\nВведите текст. Для выхода введите "stop":');

  // Открываю файловый поток в режиме добавления
  const logStream = fs.createWriteStream('log.txt', { flags: 'a' });

  rl.on('line', (input) => {
    if (input.toLowerCase() === 'stop') {
      logStream.end(); // Закрываю поток
      rl.close(); // Закрываю интерфейс
      return;
    }
    
    // Добавляю строку в файл с переносом
    logStream.write(input + '\n');
    console.log('Строка добавлена в лог. Продолжайте ввод:');
  });

  // Обработка закрытия потока
  logStream.on('close', () => {
    console.log('Программа завершена. Лог сохранен в log.txt');
  });
}
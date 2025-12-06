const fs = require('fs');
const readline = require('readline');

// Проверяем аргументы командной строки
if (process.argv.length < 3) {
  console.log('Использование: node rewriter.js <имя_файла>');
  process.exit(1);
}

const fileName = process.argv[2];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Показываем текущее содержимое файла (если он существует)
try {
  if (fs.existsSync(fileName)) {
    const content = fs.readFileSync(fileName, 'utf8');
    console.log('Текущее содержимое файла:');
    console.log('---');
    console.log(content);
    console.log('---');
  } else {
    console.log('Файл не существует. Будет создан новый.');
  }
} catch (err) {
  console.error('Ошибка при чтении файла:', err.message);
  process.exit(1);
}

// Запрашиваем новый текст
rl.question('Введите новый текст для файла: ', (newText) => {
  try {
    fs.writeFileSync(fileName, newText);
    console.log(`Файл "${fileName}" успешно перезаписан.`);
  } catch (err) {
    console.error('Ошибка при записи файла:', err.message);
  }
  rl.close();
});

// Обработка закрытия
rl.on('close', () => {
  process.exit(0);
});
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  console.log("ВХОД В СИСТЕМУ");
  
  // Проверка email
  let email;
  while (true) {
    email = await ask("\nВведите email: ");
    const isValid = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email);
    
    if (isValid) {
      console.log(" Email принят");
      break;
    }
    console.log(" Неверный формат email");
  }
  
  // Проверка пароля
  while (true) {
    const password = await ask("\nВведите пароль: ");
    
    if (password === "Pass123") {
      console.log("\n Вы успешно вошли!");
      break;
    }
    console.log(" Пароль неверный");
  }
  
  rl.close();
}

main();
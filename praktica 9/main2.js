// @ts-check

/**
 * Функция для создания нового пользователя
 * @param {{title: string, body: string, userId: string}} userData - данные пользователя
 */
async function createPost(userData) {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    console.log('Пользователь создан');
    console.log(data);
    
    // @ts-ignore
    document.querySelector('#outputContainer').innerHTML = "Пользователь создан: " + JSON.stringify(data, null, 2);
    
    return data;
  } catch (e) {
    console.log("Ошибка при создании пользователя: " + e);
    // @ts-ignore
    document.querySelector('#outputContainer').innerHTML = "Ошибка при создании пользователя: " + e;
  }
}
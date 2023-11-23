/* ЗАДАНИЕ ! Создайте функции:

- получает на вход объект поста и возвращает строку HTML-разметки;
- добавляет полученную разметку в полученный контейнер;
- делает GET запрос по адресу `https://jsonplaceholder.typicode.com/posts` и 
добавит их на страницу (для этого примените метод `forEach` и функции созданные ранее).
*/
const postsDiv = document.querySelector('#posts')

function getPostContent(post) {
    return `<div class="post">
        <h2>${post.title}</h2>
        <p>${post.body}</p>
    </div>`
}

function addPost(postHTML, container) {
    container.insertAdjacentHTML('afterbegin', postHTML)
}

fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((posts) => {
        posts.forEach((post) => {
            const postHTML = getPostContent(post)
            addPost(postHTML, postsDiv)
        })
    })

/* Задание 2 
Вам нужно написать функцию для создания постов, в ней должен быть вызов `fetch`, с двумя обработчиками then, который:

- делает POST-запрос по адресу https://jsonplaceholder.typicode.com/posts ;
- с телом — JSON с двумя свойствами `title` и `body` ;
- со свойством `headers` с единственным заголовком: `'Content-Type': 'application/json; charset=UTF-8'` ;
- добавляет созданный пост в DOM.
*/

function sendPost(postTitle, postBody) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ title: postTitle, body: postBody }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            const postHTML = getPostContent(data)
            addPost(postHTML, postsDiv)
        })
        .catch((error) => {
            console.error(error)
        })
}

const form = document.getElementById('post-form')
form.addEventListener('submit', (event) => {
    event.preventDefault()
    const postTitle = form.elements[0].value
    const postBbody = form.elements[1].value
    sendPost(postTitle, postBbody)
    form.reset()
})

document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoTime = document.getElementById('todo-time');
    const todoList = document.getElementById('todo-list');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.sort((a, b) => a.time.localeCompare(b.time));
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = `list-group-item d-flex justify-content-between align-items-center todo-item bg-dark border-secondary`;

            li.innerHTML = `
                <div>
                    <span class="todo-text text-light ${todo.completed ? 'completed' : ''}">${todo.text}</span>
                    <br>
                    <small class="time-text text-secondary"><i class="fas fa-clock"></i> ${todo.time}</small>
                </div>
                <div>
                    <button class="btn btn-link check-btn" onclick="toggleTodo(${index})">
                        <i class="fas text-success ${todo.completed ? 'fa-times' : 'fa-check'}"></i>
                    </button>
                    <button class="btn btn-link delete-btn" onclick="deleteTodo(${index})">
                        <i class="fas fa-trash text-danger"></i>
                    </button>
                </div>
            `;
            todoList.appendChild(li);
        });
    }

    todoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const todoText = todoInput.value.trim();
        const time = todoTime.value;
        if (todoText && time) {
            todos.push({
                text: todoText,
                time: time,
                completed: false
            });
            saveTodos();
            renderTodos();
            todoInput.value = '';
        }
    });

    window.toggleTodo = function (index) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    }

    window.deleteTodo = function (index) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }

    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    todoTime.value = currentTime;

    const socialLinks = [
        {
            name: "Instagram",
            url: "https://instagram.com/m9nokuro",
            icon: "fab fa-instagram"
        },
        {
            name: "GitHub",
            url: "https://github.com/RevanSP",
            icon: "fab fa-github"
        },
        {
            name: "Facebook",
            url: "https://www.facebook.com/profile.php?id=100082958149027",
            icon: "fab fa-facebook"
        }
    ];

    const socialContainer = document.getElementById('social-links');
    socialLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = "_blank";
        a.className = "text-decoration-none text-light mx-2";
        a.title = link.name;
        a.innerHTML = `<i class="${link.icon}"></i>`;
        socialContainer.appendChild(a);
    });

    renderTodos();
});
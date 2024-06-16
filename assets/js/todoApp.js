let liste = document.querySelector(".todoList");
let todoForm = document.querySelector(".todoForm");
let activeTodoCount = document.querySelector(".activeTodoCount");
let list = document.querySelector(".list");
let clearBtn = document.querySelector(".clearBtn");

let activeTodoCounter = 0;

let todoList = [];

if (typeof localStorage.todoList !== "undefined") {
  todoList = JSON.parse(localStorage.todoList);
  addData.disabled = true;
} else {
  addData.disabled = false;
}
render();

addData.addEventListener("click", function () {
  todoList = [
    ...todoList,
    {
      id: 1,
      title: "Kitap oku",
    },
    {
      id: 2,
      title: "Egzersiz yap",
    },
    {
      id: 3,
      title: "Ders çalış",
    },
    {
      id: 4,
      title: "Proje geliştir",
    },
    {
      id: 5,
      title: "Sağlıklı beslen",
    },
    {
      id: 6,
      title: "Meditasyon yap",
    },
    {
      id: 7,
      title: "Blog yazısı yaz",
    },
    {
      id: 8,
      title: "Yeni dil öğren",
    },
    {
      id: 9,
      title: "Evi temizle",
    },
    {
      id: 10,
      title: "Film izle",
    },
  ];

  let parsedList = [];

  if (typeof localStorage.todoList !== "undefined") {
    parsedList = JSON.parse(localStorage.todoList);
  }
  console.log(parsedList);

  let sonSayi = parsedList[parsedList.length - 1]?.id
    ? parsedList[parsedList.length - 1].id + 1
    : 1;

  for (let i = 0; i < todoList.length; i++) {
    if (
      parsedList[i]?.id !== todoList[i]?.id &&
      parsedList[i]?.title !== todoList[i]?.title
    )
      todoList[i].id = sonSayi++;
  }

  save();
  render();
  addData.disabled = true;
});

function handleForm(e) {
  e.preventDefault();
  let FormDat = new FormData(todoForm);
  let formObj = Object.fromEntries(FormDat);
  if (formObj.title !== "") {
    todoList.push({
      id: todoList[todoList.length - 1]?.id
        ? todoList[todoList.length - 1].id + 1
        : 1,
      title: formObj.todo,
    });
  }
  save();
  render();
  todoForm.reset();
}

function render() {
  liste.innerHTML = "";
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].title !== "") {
      liste.innerHTML += `<li class='listItem' data-index=${todoList[i].id}><span>${todoList[i].title}</span>
      <p><button class="check">✔</button><button class="clear">🗑</button></p>
      </li>`;
      let clear = document.querySelectorAll(".clear");
      for (let i = 0; i < clear.length; i++) {
        clear[i].addEventListener("click", handleClear);
      }
      activeTodoCounter = todoList.length;
      activeTodoCount.innerText = activeTodoCounter;
    }
  }
}

function save() {
  localStorage.todoList = JSON.stringify(todoList);
}

function clear() {
  localStorage.clear();
  liste.innerHTML = "";
  activeTodoCounter = 0;
  activeTodoCount.innerText = 0;
  todoList = [];
  render();
  todoForm.reset();
  addData.disabled = false;
}

clearBtn.addEventListener("click", clear);

todoForm.addEventListener("submit", handleForm);

function handleClear(e) {
  let button = e.target;
  for (let i = 0; i < todoList.length; i++) {
    if (
      Number(button.parentElement.parentElement.dataset.index) ===
      todoList[i].id
    ) {
      todoList.splice(i, 1);
      save();
      render();
    }
  }
  button.parentElement.parentElement.remove();
  activeTodoCounter--;
  activeTodoCount.innerText = activeTodoCounter;
}

document.addEventListener("DOMContentLoaded", () => {
  const btnOpenModal = document.querySelector("#btnOpenModal");
  const modalBlock = document.querySelector("#modalBlock");
  const closeModal = document.querySelector("#closeModal");
  const questionTitle = document.querySelector("#question");
  const formAnswers = document.querySelector("#formAnswers");
  const nextButton = document.querySelector("#next");
  const prevButton = document.querySelector("#prev");
  const sendButton = document.querySelector("#send");
  let timerId;
  const questions = [
    {
      question: "Какого цвета бургер?",
      answers: [
        {
          title: "Стандарт",
          url: "./image/burger.png",
        },
        {
          title: "Черный",
          url: "./image/burgerBlack.png",
        },
      ],
      type: "radio",
    },
    {
      question: "Из какого мяса котлета?",
      answers: [
        {
          title: "Курица",
          url: "./image/chickenMeat.png",
        },
        {
          title: "Говядина",
          url: "./image/beefMeat.png",
        },
        {
          title: "Свинина",
          url: "./image/porkMeat.png",
        },
      ],
      type: "radio",
    },
    {
      question: "Дополнительные ингредиенты?",
      answers: [
        {
          title: "Помидор",
          url: "./image/tomato.png",
        },
        {
          title: "Огурец",
          url: "./image/cucumber.png",
        },
        {
          title: "Салат",
          url: "./image/salad.png",
        },
        {
          title: "Лук",
          url: "./image/onion.png",
        },
      ],
      type: "checkbox",
    },
    {
      question: "Добавить соус?",
      answers: [
        {
          title: "Чесночный",
          url: "./image/sauce1.png",
        },
        {
          title: "Томатный",
          url: "./image/sauce2.png",
        },
        {
          title: "Горчичный",
          url: "./image/sauce3.png",
        },
      ],
      type: "radio",
    },
  ];
// Обработчики открытия и закрытия модального окна
  btnOpenModal.addEventListener("click", () => {
    modalBlock.classList.add("d-block");
    playTest();
  });

  closeModal.addEventListener("click", () => {
    modalBlock.classList.remove("d-block");
    clearTimeout(timerId)
  });

  // Функция запуска тестирования
  const playTest = () => {
    const finalAnswers = []

    // Переменная с номером вопроса
    let numberQuestion = 0;

    // Функция рендеринга ответов
    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement("div");
        answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
          <label for="${answer.title}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="burger">
            <span>${answer.title}</span>
          </label>
        
        `;
        formAnswers.appendChild(answerItem);
      });
    };

    // Функция рендеринга вопросов и ответов
    const renderQuestions = (indexQuestion) => {
      formAnswers.innerHTML = "";
      
      switch (true) {
        case(numberQuestion >= 0 && numberQuestion <= questions.length - 1):
          questionTitle.textContent = `${questions[indexQuestion].question}`;
          renderAnswers(indexQuestion);
          nextButton.classList.remove('d-none')
          prevButton.classList.remove('d-none')
          sendButton.classList.add('d-none')
        break

        case(numberQuestion === 0):
          prevButton.classList.add('d-none')
        break

        case(numberQuestion === questions.length):
         formAnswers.innerHTML = `
          <div class="form-group">
            <label for="numberPhone">Enter your number</label>
            <input type="phone" class="form-control" id="numberPhone" >
          </div>
          `
          prevButton.classList.add('d-none')
          nextButton.classList.add('d-none')
          sendButton.classList.remove('d-none')
        break

        case(numberQuestion  > questions.length + 1):
          formAnswers.textContent = 'Спасибо за пройденный тест!'
          timerId = setTimeout(() => {
          modalBlock.classList.remove("d-block");
          }, 5000)
        break
      }
      // if(numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
      //   questionTitle.textContent = `${questions[indexQuestion].question}`;
      //   renderAnswers(indexQuestion);
      //   nextButton.classList.remove('d-none')
      //   prevButton.classList.remove('d-none')
      //   sendButton.classList.add('d-none')
      // }
      
      // if(numberQuestion === 0) {
      //   prevButton.classList.add('d-none')
      // }
      
      // if(numberQuestion === questions.length) {
      //   formAnswers.innerHTML = `
      //   <div class="form-group">
      //     <label for="numberPhone">Enter your number</label>
      //     <input type="phone" class="form-control" id="numberPhone" >
      //   </div>
      //   `
      //   prevButton.classList.add('d-none')
      //   nextButton.classList.add('d-none')
      //   sendButton.classList.remove('d-none')
      // }
      // if(numberQuestion === questions.length + 1) {
      //   formAnswers.textContent = 'Спасибо за пройденный тест!'
      //   timerId = setTimeout(() => {
      //     modalBlock.classList.remove("d-block");
      //   }, 5000)
      // }
    };

    // Запуск функции рендеринга
    renderQuestions(numberQuestion);

    const checkAnswer = () => {
      console.log('check');
      const obj = {}
      const inputs = [...formAnswers.elements].filter(input => input.checked || input.id === 'numberPhone')
      console.log(inputs);
      
      inputs.forEach((input, index) => {
        if(numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value
        }
        if(numberQuestion === questions.length) {
          obj['Номер телефона'] = input.value
        }
      })

      finalAnswers.push(obj)
      console.log(finalAnswers);
      
    }

    // Обработчики событий кнопок next и prev
    nextButton.onclick = () => {
      checkAnswer()
      numberQuestion++;
      renderQuestions(numberQuestion);
    };

    prevButton.onclick = () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
    };

    sendButton.onclick = () => {
      checkAnswer()
      numberQuestion++
      renderQuestions(numberQuestion)
      console.log(finalAnswers);
    };
  };
});

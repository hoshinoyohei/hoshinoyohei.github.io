'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLavel = document.querySelector('#result > p');

  const quizSet = [
    {q: 'さとみのアレルギーは何?', c: ['桃', '林檎', '梨']},
    {q: 'さとみの誕生日は?', c: ['4月7日', '1月21日', '8月11日']},
    {q: 'さとみの苗字は?', c: ['小林', '木下', '与田']},
  ];

  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for(let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * arr.length);
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }

    return arr;
  }

  function checkAnswer(li) {
    if(isAnswered === true) {
      return;
    }
    isAnswered = true;
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');

    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;

    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if(currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if(currentNum === quizSet.length - 1) {
      scoreLavel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}
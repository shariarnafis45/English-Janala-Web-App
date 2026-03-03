// Function => lessons button load

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLevels(json.data));
};

// words by api
const loadWords = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayWords(json.data));
};

const displayWords = (words) => {
  const wordsContainer = document.getElementById("word-container");
  wordsContainer.innerHTML = "";
  words.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
            <div class="word-card bg-white text-center py-10 px-5 rounded-md shadow-sm space-y-4">
                <h2 class="text-3xl font-bold">${word.word}</h2>
                <p class="font-medium  text-[0.9rem]">Meaning /Pronounciation</p>
                <div class="font-bangla  text-3xl font-semibold text-gray-600">"${word.meaning} / ${word.pronunciation}"</div>
                <div class="icon-container flex justify-between mt-7">
                    <button class="btn btn-soft btn-primary"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn btn-soft btn-primary"><i class="fa-solid fa-volume-high"></i></button>
                
                </div>

            </div>
        `;
    wordsContainer.append(wordCard);
  });
};

const displayLevels = (lessons) => {
  // get the parent lessons div
  const lessonsContainer = document.getElementById("lessons-container");
  lessonsContainer.innerHTML = "";
  // get all levels one by one
  for (let lesson of lessons) {
    // create btn for all lesson
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <button onclick="loadWords(${lesson.level_no})" class="btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
            </button>
        `;
    // Append to parent
    lessonsContainer.append(btnDiv);
  }
};

loadLessons();

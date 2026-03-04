// Spinner Controll
const controllSpinner = (value) => {
  if (value) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};
// Speak Words
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
// create element from array

const createElement = (arr) => {
  const element = arr.map((el) => `<span class="btn">${el}</span>`);
  return element.join(" ");
};

// Function => lessons button load

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLevels(json.data));
};

// Remove active class fromlesson btn
const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  lessonBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
};

// words by api
const loadWords = (id) => {
  controllSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      removeActive();
      const lessonBtn = document.getElementById(`lesson-btn-${id}`);
      lessonBtn.classList.add("active");
      displayWords(json.data);
    });
};

// Word deatils
const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayWordDetails(data.data);
};

// Display Word Deatails
const displayWordDetails = (deatils) => {
  const detaiilsContainer = document.getElementById("word-details-container");
  detaiilsContainer.innerHTML = `
      <h2 class="font-bold text-2xl font-bangla">${deatils.word} (<i class="fa-solid fa-microphone-lines"></i>:${deatils.pronunciation})</h2>
            <div>
              <h3 class="font-medium text-xl">Meaning</h3>
              <p class="font-bangla">${deatils.meaning}</p>
            </div>
            <div>
              <h3 class="font-medium text-xl">Example</h3>
              <p>${deatils.sentence}</p>
            </div>
            <div class="space-y-2">
              <h3 class="font-medium text-xl font-bangla">সমার্থক শব্দ গুলো</h3>
              <div class="flex gap-3">
                ${createElement(deatils.synonyms)}
              </div>
            </div>
  `;
  document.getElementById("wordDetailsModal").showModal();
};

const displayWords = (words) => {
  const wordsContainer = document.getElementById("word-container");
  wordsContainer.innerHTML = "";
  if (words.length === 0) {
    wordsContainer.innerHTML = `
        <div class="default-card col-span-full  text-center py-10 space-y-4 ">
            <i class="fa-solid fa-triangle-exclamation text-7xl"></i>
            <p class="font-bangla  font-medium text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bangla text-4xl font-bold">নেক্সট Lesson এ যান</h2>
          </div>
    
    `;
    controllSpinner(false);
    return;
  }
  words.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
            <div class="word-card bg-white text-center py-10 px-5 rounded-md shadow-sm space-y-4">
                <h2 class="text-3xl font-bold">${word.word ? word.word : "Word Not Found"}</h2>
                <p class="font-medium  text-[0.9rem]">Meaning /Pronounciation</p>
                <div class="font-bangla  text-3xl font-semibold text-gray-600">"${word.meaning ? word.meaning : "Meaning Not Found"} / ${word.pronunciation ? word.pronunciation : "Pronunciation Not Found"}"</div>
                <div class="icon-container flex justify-between mt-7">
                    <button onclick="loadWordDetails(${word.id})" class="btn btn-soft btn-primary"><i class="fa-solid fa-circle-info"></i></button>
                    <button onclick="pronounceWord('${word.word}')" class="btn btn-soft btn-primary"><i class="fa-solid fa-volume-high"></i></button>
                
                </div>

            </div>
        `;
    wordsContainer.append(wordCard);
  });
  controllSpinner(false);
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
            <button id="lesson-btn-${lesson.level_no}" onclick="loadWords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
            </button>
        `;
    // Append to parent
    lessonsContainer.append(btnDiv);
  }
};

loadLessons();

// Search function
document.getElementById("search-btn").addEventListener("click", () => {
  const input = document.getElementById("search-input");
  const inputValue = input.value.trim().toLowerCase();
  if (inputValue.length === 0) {
    return;
  }
  // data by API
  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const words = data.data;
      const filterWords = words.filter((word) =>
        word.word.toLowerCase().includes(inputValue),
      );
      removeActive();
      displayWords(filterWords);
    });
});

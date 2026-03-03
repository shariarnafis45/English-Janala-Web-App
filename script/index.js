// Function => lessons button load

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLevels(json.data) );
};

// Remove active class fromlesson btn 
const removeActive = () => {
  const lessonBtn = document.querySelectorAll('.lesson-btn');
  lessonBtn.forEach(btn => {
    btn.classList.remove('active');
  })

}

// words by api
const loadWords = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) =>{
      removeActive();
      const lessonBtn = document.getElementById(`lesson-btn-${id}`);
      lessonBtn.classList.add('active');
      displayWords(json.data)
      
      
    });
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
                    <button onclick="my_modal_5.showModal()" class="btn btn-soft btn-primary"><i class="fa-solid fa-circle-info"></i></button>
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
            <button id="lesson-btn-${lesson.level_no}" onclick="loadWords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
            </button>
        `;
    // Append to parent
    lessonsContainer.append(btnDiv);
  }
};

loadLessons();

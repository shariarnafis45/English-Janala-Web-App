// Function => lessons button load

const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(json => displayLevels(json.data));
    }
const displayLevels = (lessons) => {
    // get the parent lessons div
    const lessonsContainer = document.getElementById('lessons-container');
    lessonsContainer.innerHTML = '';
    // get all levels one by one 
    for (let lesson of lessons){
        // create btn for all lesson 
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
            <button onclick="loadWords(${lesson.level_no})" class="btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
            </button>
        `;
        // Append to parent 
        lessonsContainer.append(btnDiv)
    }
}
loadLessons();


// words by api
const loadWords = (id) => {

const url = `https://openapi.programming-hero.com/api/level/${id}`;
fetch(url)
    .then(res => res.json())
    .then(json => displayWords(json.data));
}

const displayWords = (words) => {
    const wordsContainer = document.getElementById('word-container');
    wordsContainer.innerHTML = '';
    words.forEach((word) => {
        const wordCard = document.createElement('div');
        wordCard.innerHTML = `
            <h2>Hello</h2>
        `;
        wordsContainer.append(wordCard);
    })
}


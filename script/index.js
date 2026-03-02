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
            <button href="" class="btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
            </button>
        `;
        // Append to parent 
        lessonsContainer.append(btnDiv)
    }
}
loadLessons();

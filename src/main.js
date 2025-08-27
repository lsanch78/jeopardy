import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function populateQuestionColumn(category = 0) {
    const easyURL = `https://opentdb.com/api.php?amount=15&category=${category}&type=boolean`;


    try {
        const response = await fetch(easyURL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        const questions = data.results;

        const easy = questions.filter(q => q.difficulty === "easy");
        console.log("Easy: ", easy);
        const medium =questions.filter(q => q.difficulty === "medium");
        console.log("Medium: ", medium);
        const hard = questions.filter(q => q.difficulty === "hard");
        console.log("Hard: ", hard);
        // add error handling to "re-roll" if not a single hard question shows up



        console.log(data);
    } catch (error) {
        console.error(error.message);
    }
    // API can only take calls every 5 seconds

}

function getRandomCategories() {
    const min = 9;
    const max = 32;
    const excluded = [10, 13, 21, 26, 27, 29, 30, 32];

    // Build allowed numbers
    const allowed = [];
    for (let i = min; i <= max; i++) {
        if (!excluded.includes(i)) {
            allowed.push(i);
        }
    }

    // Shuffle and take first 4
    for (let i = allowed.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allowed[i], allowed[j]] = [allowed[j], allowed[i]];
    }

    return allowed.slice(0, 4);
}

const randomCategories = getRandomCategories();

console.log(randomCategories[0]);
console.log(randomCategories[1]);
console.log(randomCategories[2]);
console.log(randomCategories[3]);

await delay(5000)
populateQuestionColumn(randomCategories[0])
await delay(5000)
populateQuestionColumn(randomCategories[1])
await delay(5000)
populateQuestionColumn(randomCategories[2])
await delay(5000)
populateQuestionColumn(randomCategories[3])
await delay(5000)
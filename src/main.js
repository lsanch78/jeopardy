import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// async function populateQuestionColumn(category = 0) {
//     const easyURL = `https://opentdb.com/api.php?amount=15&category=${category}&type=boolean`;
//
//
//     try {
//         const response = await fetch(easyURL);
//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//         }
//
//         const data = await response.json();
//         const questions = data.results;
//
//         const easy = questions.filter(q => q.difficulty === "easy");
//         console.log("Easy: ", easy);
//         const medium =questions.filter(q => q.difficulty === "medium");
//         console.log("Medium: ", medium);
//         const hard = questions.filter(q => q.difficulty === "hard");
//         console.log("Hard: ", hard);
//         // add error handling to "re-roll" if not a single hard question shows up
//
//
//
//         console.log(data);
//     } catch (error) {
//         console.error(error.message);
//     }
//     // API can only take calls every 5 seconds
//
// }




// Four random categories

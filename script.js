const topicInfo = {
  numbers: {title:"Large Numbers", description:"Read, write, compare and arrange large numbers. Understand the value of each digit by looking at its place.", example:"Example: In 54,321, the digit 5 is in the ten-thousands place, so its place value is 50,000. Try: Which is greater — 45,678 or 45,768?"},
  operations: {title:"Four Operations", description:"Use addition, subtraction, multiplication and division to solve everyday problems. Estimate first and check your answer.", example:"Example: 245 × 3 = 735. Try breaking a word problem into smaller steps before calculating."},
  fractions: {title:"Fractions", description:"A fraction shows equal parts of a whole. Learn about numerators, denominators and equivalent fractions.", example:"Example: 1/2 = 2/4. Both fractions represent the same amount. Imagine one half of a roti or pizza."},
  measurement: {title:"Measurement", description:"Measure and compare length, weight and capacity. Practise converting between common units.", example:"Remember: 1 kilometre = 1,000 metres; 1 kilogram = 1,000 grams; 1 litre = 1,000 millilitres."},
  geometry: {title:"Shapes & Geometry", description:"Explore points, lines, angles and 2D shapes. Notice geometry in buildings, objects and patterns around you.", example:"A right angle measures 90°. A triangle has 3 sides and a quadrilateral has 4 sides."},
  data: {title:"Data Handling", description:"Collect information and organise it in tables, pictographs and bar graphs. Read the data to answer questions.", example:"If 1 picture represents 2 students, then 4 pictures represent 8 students. Always check the key."}
};
document.querySelectorAll(".topic-card").forEach(card => card.addEventListener("click", () => {
  const info = topicInfo[card.dataset.topic];
  document.getElementById("detail-title").textContent = info.title;
  document.getElementById("detail-description").textContent = info.description;
  document.getElementById("detail-example").textContent = info.example;
  const panel = document.getElementById("topic-detail");
  panel.classList.remove("hidden");
  panel.scrollIntoView({behavior:"smooth", block:"center"});
}));
document.getElementById("close-detail").addEventListener("click", () => document.getElementById("topic-detail").classList.add("hidden"));

const questions = [
  {q:"What is 250 + 175?", a:["415","425","435","445"], correct:1, explain:"250 + 175 = 425."},
  {q:"What is the place value of 6 in 46,218?", a:["6","60","600","6,000"], correct:3, explain:"The digit 6 is in the thousands place. Its place value is 6,000."},
  {q:"Which fraction is equal to 1/2?", a:["1/3","2/4","3/5","2/3"], correct:1, explain:"2/4 simplifies to 1/2. They show the same part of a whole."},
  {q:"How many grams are there in 3 kilograms?", a:["300 g","3,000 g","30,000 g","300,000 g"], correct:1, explain:"1 kg = 1,000 g, so 3 kg = 3,000 g."},
  {q:"How many sides does a hexagon have?", a:["5","6","7","8"], correct:1, explain:"A hexagon has 6 sides."}
];
let current = 0, score = 0, answered = false;
const qEl = document.getElementById("question"), answersEl = document.getElementById("answers");
const feedback = document.getElementById("feedback"), nextBtn = document.getElementById("next-btn");
function renderQuestion(){
  answered = false;
  const q = questions[current];
  document.getElementById("question-number").textContent = current + 1;
  document.getElementById("score").textContent = score;
  document.getElementById("progress-bar").style.width = `${(current+1)/questions.length*100}%`;
  qEl.textContent = q.q; feedback.textContent = "Choose the correct answer.";
  nextBtn.disabled = true; nextBtn.textContent = current === questions.length-1 ? "See my result →" : "Next question →";
  answersEl.innerHTML = "";
  q.a.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer"; button.textContent = `${String.fromCharCode(65+index)}. ${answer}`;
    button.addEventListener("click", () => chooseAnswer(index));
    answersEl.appendChild(button);
  });
}
function chooseAnswer(index){
  if(answered) return; answered = true;
  const q = questions[current], buttons = [...answersEl.children];
  buttons.forEach((b,i) => { b.disabled = true; if(i === q.correct) b.classList.add("correct"); if(i === index && i !== q.correct) b.classList.add("wrong"); });
  if(index === q.correct){ score++; feedback.textContent = `Correct! ${q.explain}`; }
  else feedback.textContent = `Good try! ${q.explain}`;
  document.getElementById("score").textContent = score; nextBtn.disabled = false;
}
nextBtn.addEventListener("click", () => {
  if(current < questions.length-1){ current++; renderQuestion(); }
  else {
    qEl.textContent = `You scored ${score} out of ${questions.length}!`;
    answersEl.innerHTML = `<p class="feedback">${score === 5 ? "Excellent work! You are a Maths Star! 🌟" : "Well done for trying! Practise the topics and try again. 💪"}</p>`;
    feedback.textContent = "Your learning journey continues — keep practising!";
    nextBtn.disabled = true; nextBtn.textContent = "Quiz completed";
  }
});
document.getElementById("restart-btn").addEventListener("click", () => { current=0; score=0; renderQuestion(); });
renderQuestion();

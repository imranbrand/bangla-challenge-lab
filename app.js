
const questions = [
  {
    topic: "DIGITAL SAFETY",
    q: "কোনটি সবচেয়ে শক্তিশালী পাসওয়ার্ডের উদাহরণ?",
    options: ["12345678", "password", "T!ger_8River#29", "imran123"],
    correct: 2
  },
  {
    topic: "ONLINE SAFETY",
    q: "অচেনা কেউ তোমার OTP চাইলে কী করবে?",
    options: ["দিয়ে দেব", "কাউকে দেব না", "বন্ধুকে পাঠাব", "পোস্ট করে দেব"],
    correct: 1
  },
  {
    topic: "SMART SEARCH",
    q: "অনলাইনে কোনো তথ্য যাচাই করার ভালো উপায় কোনটি?",
    options: [
      "শুধু শিরোনাম পড়া",
      "লাইক গোনা",
      "একাধিক নির্ভরযোগ্য উৎস দেখা",
      "প্রথম পোস্ট বিশ্বাস করা"
    ],
    correct: 2
  },
  {
    topic: "AI AWARENESS",
    q: "AI-এর উত্তর ব্যবহার করার আগে কী করা ভালো?",
    options: [
      "সব উত্তর সত্য ধরা",
      "গুরুত্বপূর্ণ তথ্য যাচাই করা",
      "সঙ্গে সঙ্গে শেয়ার করা",
      "কিছুই না"
    ],
    correct: 1
  },
  {
    topic: "PRIVACY",
    q: "অন্যের ছবি পোস্ট করার আগে কী করা উচিত?",
    options: [
      "অনুমতি নেওয়া",
      "সব গ্রুপে পাঠানো",
      "লোকেশন যোগ করা",
      "যেকোনো ক্যাপশন দেওয়া"
    ],
    correct: 0
  },
  {
    topic: "PRODUCTIVITY",
    q: "গুরুত্বপূর্ণ ফাইল হারানো এড়াতে কোন অভ্যাস ভালো?",
    options: [
      "সব ফাইল এলোমেলো রাখা",
      "ব্যাকআপ রাখা",
      "ফাইলের নাম না দেওয়া",
      "শুধু এক কপি রাখা"
    ],
    correct: 1
  },
  {
    topic: "CRITICAL THINKING",
    q: "অবিশ্বাস্য পুরস্কারের লিংক পেলে কী করবে?",
    options: [
      "সঙ্গে সঙ্গে ক্লিক",
      "পাসওয়ার্ড লিখে দেখা",
      "লিংক ও প্রেরক যাচাই করা",
      "সবাইকে পাঠানো"
    ],
    correct: 2
  }
];

const results = [
  {
    min: 0, max: 2,
    title: "Curious Explorer",
    description: "শেখার যাত্রা শুরু হয়েছে! ডিজিটাল নিরাপত্তার বিষয়গুলো আরেকবার দেখে আবার চেষ্টা করো।"
  },
  {
    min: 3, max: 4,
    title: "Smart Thinker",
    description: "ভালো করেছ! আরও কিছু সঠিক উত্তর দিয়ে নিজের স্কোর বাড়ানোর চেষ্টা করো।"
  },
  {
    min: 5, max: 6,
    title: "Tech-Smart Star",
    description: "দারুণ স্কোর! এবার বন্ধুদের চ্যালেঞ্জ দিয়ে দেখো তারা তোমাকে হারাতে পারে কি না।"
  },
  {
    min: 7, max: 7,
    title: "Digital Legend",
    description: "পারফেক্ট স্কোর! এবার বন্ধুদের মধ্যে তোমার চ্যালেঞ্জ ছড়িয়ে দাও।"
  }
];

const $ = id => document.getElementById(id);
const bn = n => String(n).replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[Number(d)]);

let index = 0;
let score = 0;
let chosen = null;
let name = "";

function screen(id) {
  ["start", "game", "result"].forEach(key => {
    $(key).hidden = key !== id;
  });
}

function startQuiz() {
  index = 0;
  score = 0;
  chosen = null;
  name = $("player").value.trim().slice(0, 24);
  $("heading").textContent = "প্রশ্নের উত্তর দাও";
  $("counter").textContent = "৭টি প্রশ্ন";
  $("progress").style.width = "0%";
  screen("game");
  renderQuestion();
}

function renderQuestion() {
  chosen = null;
  const item = questions[index];

  $("topic").textContent = item.topic;
  $("number").textContent = `প্রশ্ন ${bn(index + 1)} / ${bn(questions.length)}`;
  $("question").textContent = item.q;
  $("progress").style.width = `${index / questions.length * 100}%`;
  $("nextBtn").disabled = true;
  $("nextBtn").textContent =
    index === questions.length - 1 ? "রেজাল্ট দেখো →" : "পরের প্রশ্ন →";

  const area = $("answers");
  area.replaceChildren();

  item.options.forEach((option, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer";
    button.textContent = `${String.fromCharCode(65 + i)}. ${option}`;

    button.addEventListener("click", () => {
      chosen = i;
      area.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
      button.classList.add("selected");
      $("nextBtn").disabled = false;
    });

    area.append(button);
  });
}

function nextQuestion() {
  if (chosen === null) return;

  if (chosen === questions[index].correct) score++;
  index++;

  if (index < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  $("heading").textContent = "তোমার রেজাল্ট তৈরি!";
  $("progress").style.width = "100%";
  $("score").textContent = bn(score);

  const result = results.find(r => score >= r.min && score <= r.max);
  $("title").textContent = result.title;
  $("description").textContent = result.description;
  $("scoreBar").style.width = `${score / questions.length * 100}%`;
  $("playerResult").textContent =
    name ? `${name} — তোমার Tech-Smart Score` : "তোমার Tech-Smart Score";

  screen("result");
}

function makeCard() {
  const canvas = $("canvas");
  const ctx = canvas.getContext("2d");

  const bg = ctx.createLinearGradient(0, 0, 1200, 630);
  bg.addColorStop(0, "#10152a");
  bg.addColorStop(0.55, "#28234e");
  bg.addColorStop(1, "#123b42");

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1200, 630);

  ctx.globalAlpha = 0.18;
  ctx.fillStyle = "#b5a0ff";
  ctx.beginPath();
  ctx.arc(1030, 80, 210, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#70e7d9";
  ctx.beginPath();
  ctx.arc(100, 620, 190, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.fillStyle = "#70e7d9";
  ctx.font = "bold 26px Arial";
  ctx.fillText("BANGLA CHALLENGE LAB", 70, 80);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 48px Arial";
  ctx.fillText(name ? `${name}'s Tech-Smart Score` : "My Tech-Smart Score", 70, 170);

  ctx.fillStyle = "#b5a0ff";
  ctx.font = "bold 145px Arial";
  ctx.fillText(String(score), 70, 355);

  ctx.fillStyle = "#c3cbe4";
  ctx.font = "bold 42px Arial";
  ctx.fillText("/ 7", 230, 350);

  const result = results.find(r => score >= r.min && score <= r.max);
  ctx.fillStyle = "#70e7d9";
  ctx.font = "bold 38px Arial";
  ctx.fillText(result.title, 70, 435);

  ctx.fillStyle = "#ffffff";
  ctx.font = "27px Arial";
  ctx.fillText("Can you beat my score?", 70, 505);

  ctx.fillStyle = "#c3cbe4";
  ctx.font = "20px Arial";
  ctx.fillText("Play the quiz and challenge your friends!", 70, 565);

  return canvas;
}

function downloadCard() {
  makeCard().toBlob(blob => {
    if (!blob) {
      alert("কার্ড তৈরি করা যায়নি। আবার চেষ্টা করো।");
      return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bangla-challenge-result.png";
    link.click();
    URL.revokeObjectURL(url);
  }, "image/png");
}

function shareFacebook() {
  const url = encodeURIComponent(window.location.href);
  const facebookUrl =
    `https://www.facebook.com/sharer/sharer.php?u=${url}`;

  window.open(facebookUrl, "_blank", "noopener,noreferrer");
}

function retry() {
  $("heading").textContent = "চ্যালেঞ্জ নিতে প্রস্তুত?";
  $("progress").style.width = "0%";
  screen("start");
}

$("startBtn").addEventListener("click", startQuiz);
$("nextBtn").addEventListener("click", nextQuestion);
$("downloadBtn").addEventListener("click", downloadCard);
$("shareBtn").addEventListener("click", shareFacebook);
$("retryBtn").addEventListener("click", retry);

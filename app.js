


"use strict";

(() => {
  const $ = (id) => document.getElementById(id);

  const questions = [
    {
      topic: "ডিজিটাল নিরাপত্তা",
      question: "কোনটি সবচেয়ে শক্তিশালী পাসওয়ার্ডের উদাহরণ?",
      options: [
        "12345678",
        "password",
        "T!ger_8River#29",
        "imran123"
      ],
      answer: 2,
      explanation: "বড় ও ছোট হাতের অক্ষর, সংখ্যা এবং বিশেষ চিহ্নের মিশ্রণ পাসওয়ার্ডকে শক্তিশালী করতে সাহায্য করে।"
    },
    {
      topic: "অনলাইন নিরাপত্তা",
      question: "কেউ ফোন করে তোমার OTP চাইলে কী করবে?",
      options: [
        "তাকে OTP দিয়ে দেব",
        "OTP কাউকে দেব না",
        "Facebook-এ পোস্ট করব",
        "বন্ধুকে পাঠিয়ে দেব"
      ],
      answer: 1,
      explanation: "OTP গোপন রাখবে। ব্যাংক বা কোনো বিশ্বস্ত সেবার পরিচয় দিলেও কাউকে OTP জানাবে না।"
    },
    {
      topic: "তথ্য যাচাই",
      question: "অনলাইনে পাওয়া কোনো খবর সত্য কি না যাচাই করবে কীভাবে?",
      options: [
        "শুধু শিরোনাম দেখে বিশ্বাস করব",
        "বন্ধু শেয়ার করেছে বলে বিশ্বাস করব",
        "একাধিক নির্ভরযোগ্য সূত্রে যাচাই করব",
        "যাচাই না করেই শেয়ার করব"
      ],
      answer: 2,
      explanation: "একাধিক নির্ভরযোগ্য সংবাদমাধ্যম বা মূল সূত্রের তথ্য মিলিয়ে দেখো।"
    },
    {
      topic: "কৃত্রিম বুদ্ধিমত্তা",
      question: "AI-এর দেওয়া গুরুত্বপূর্ণ তথ্য ব্যবহার করার আগে কী করা উচিত?",
      options: [
        "সব তথ্য শতভাগ সঠিক ধরে নেওয়া",
        "গুরুত্বপূর্ণ তথ্য নির্ভরযোগ্য সূত্রে যাচাই করা",
        "যাচাই ছাড়াই জমা দেওয়া",
        "অন্যের সঙ্গে যাচাই না করে শেয়ার করা"
      ],
      answer: 1,
      explanation: "AI ভুল বা অসম্পূর্ণ উত্তর দিতে পারে। গুরুত্বপূর্ণ তথ্য নির্ভরযোগ্য সূত্রে যাচাই করো।"
    },
    {
      topic: "ডিজিটাল শিষ্টাচার",
      question: "অন্য কারও ছবি অনলাইনে পোস্ট করার আগে কী করা উচিত?",
      options: [
        "তার অনুমতি নেওয়া",
        "অনুমতি ছাড়াই পোস্ট করা",
        "ছবিতে ভুল তথ্য যোগ করা",
        "তার ব্যক্তিগত তথ্যও প্রকাশ করা"
      ],
      answer: 0,
      explanation: "অন্যের ছবি প্রকাশ করার আগে অনুমতি নেওয়া তার গোপনীয়তা ও সম্মানের অংশ।"
    },
    {
      topic: "ডেটা সুরক্ষা",
      question: "গুরুত্বপূর্ণ ফাইল নিরাপদ রাখতে কোন কাজটি ভালো?",
      options: [
        "সব ফাইল এক জায়গায় রেখে কোনো backup না রাখা",
        "নিয়মিত backup রাখা",
        "পাসওয়ার্ড সবার সঙ্গে শেয়ার করা",
        "সব নিরাপত্তা ব্যবস্থা বন্ধ রাখা"
      ],
      answer: 1,
      explanation: "নিয়মিত backup রাখলে ডিভাইস নষ্ট হওয়া বা ফাইল হারিয়ে যাওয়ার পর তথ্য পুনরুদ্ধার করা সহজ হয়।"
    },
    {
      topic: "অনলাইন প্রতারণা",
      question: "অচেনা একটি লিংকে পুরস্কার জেতার কথা বলা হলে কী করবে?",
      options: [
        "সঙ্গে সঙ্গে লিংকে ক্লিক করব",
        "ব্যক্তিগত তথ্য দিয়ে দেব",
        "প্রেরক ও লিংক যাচাই করব",
        "বন্ধুদের সবাইকে পাঠাব"
      ],
      answer: 2,
      explanation: "অচেনা লিংক প্রতারণামূলক হতে পারে। প্রেরক ও ওয়েবসাইট যাচাই না করে ক্লিক করবে না।"
    }
  ];

  let currentIndex = 0;
  let score = 0;
  let answered = false;
  let answeredCount = 0;
  let playerName = "";
  let selectedAnswers = [];

  const bn = (value) =>
    Number(value).toLocaleString("bn-BD", {
      maximumFractionDigits: 0
    });

  function showScreen(screenId) {
    ["start-screen", "quiz-screen", "result-screen"].forEach((id) => {
      const element = $(id);
      if (element) element.hidden = id !== screenId;
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function setProgress(value) {
    const progress = $("progress-bar");
    const track = $("progress-track");
    const percent = (value / questions.length) * 100;

    if (progress) progress.style.width = `${percent}%`;

    if (track) {
      track.setAttribute("aria-valuemax", String(questions.length));
      track.setAttribute("aria-valuenow", String(value));
    }
  }

  function updateAnsweredCount() {
    // HTML-এ "উত্তর দেওয়া হয়েছে:" লেখা আগে থেকেই আছে।
    // এখানে শুধু সংখ্যা বসবে, ফলে বাক্যটি দুবার দেখা যাবে না।
    const counter = $("answered-count");
    if (counter) counter.textContent = bn(answeredCount);
  }

  function startQuiz() {
    currentIndex = 0;
    score = 0;
    answered = false;
    answeredCount = 0;
    selectedAnswers = [];
    playerName = ($("player-name")?.value || "").trim().slice(0, 30);

    updateAnsweredCount();
    setProgress(0);
    showScreen("quiz-screen");
    renderQuestion();
  }

  function renderQuestion() {
    const item = questions[currentIndex];
    if (!item) return;

    answered = false;

    $("question-number").textContent = bn(currentIndex + 1);
    $("total-questions").textContent = bn(questions.length);
    $("question-category").textContent = item.topic;
    $("question-text").textContent = item.question;
    $("answer-feedback").textContent = "";

    const area = $("answer-options");
    area.replaceChildren();

    item.options.forEach((option, optionIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer";
      button.textContent = `${String.fromCharCode(65 + optionIndex)}. ${option}`;
      button.setAttribute("aria-pressed", "false");

      button.addEventListener("click", () => {
        chooseAnswer(optionIndex, button);
      });

      area.appendChild(button);
    });

    $("next-btn").disabled = true;
    $("next-btn").textContent =
      currentIndex === questions.length - 1
        ? "ফলাফল দেখো →"
        : "পরের প্রশ্ন →";

    setProgress(answeredCount);
  }

  function chooseAnswer(optionIndex, chosenButton) {
    if (answered) return;
    answered = true;

    const item = questions[currentIndex];
    const buttons = $("answer-options").querySelectorAll("button");
    const correct = optionIndex === item.answer;

    selectedAnswers[currentIndex] = optionIndex;
    answeredCount += 1;

    if (correct) score += 1;

    buttons.forEach((button, index) => {
      button.disabled = true;
      button.setAttribute("aria-pressed", String(index === optionIndex));

      if (index === item.answer) {
        button.classList.add("correct");
      } else if (index === optionIndex && !correct) {
        button.classList.add("incorrect");
      }
    });

    chosenButton.classList.add("selected");

    $("answer-feedback").textContent = correct
      ? `সঠিক উত্তর! ${item.explanation}`
      : `সঠিক উত্তর: ${item.options[item.answer]}। ${item.explanation}`;

    updateAnsweredCount();
    setProgress(answeredCount);
    $("next-btn").disabled = false;
  }

  function showResult() {
    showScreen("result-screen");

    $("final-score").textContent = bn(score);
    $("result-title").textContent = getResultTitle(score);
    $("result-message").textContent = getResultMessage(score);
    $("player-result").textContent = playerName
      ? `${playerName}-এর Tech-Smart স্কোর`
      : "তোমার Tech-Smart স্কোর";

    const meter = $("result-meter-fill");
    if (meter) meter.style.width = `${(score / questions.length) * 100}%`;

    const year = $("current-year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function getResultTitle(value) {
    if (value <= 2) return "Curious Explorer";
    if (value <= 4) return "Smart Thinker";
    if (value <= 6) return "Tech-Smart Star";
    return "Digital Legend";
  }

  function getResultMessage(value) {
    if (value <= 2) {
      return "শেখার দারুণ সুযোগ আছে! ডিজিটাল নিরাপত্তা ও তথ্য যাচাইয়ের অভ্যাস গড়ে তোলো।";
    }

    if (value <= 4) {
      return "ভালো শুরু! নিয়মিত শিখতে থাকো এবং অনলাইনে সচেতন সিদ্ধান্ত নেওয়ার চর্চা করো।";
    }

    if (value <= 6) {
      return "চমৎকার! তোমার ডিজিটাল সচেতনতা বেশ ভালো। আরও এক ধাপ এগিয়ে যাও!";
    }

    return "অসাধারণ! তুমি এই চ্যালেঞ্জে সর্বোচ্চ স্কোর করেছ। তোমার বন্ধুদেরও চ্যালেঞ্জ করো!";
  }

  function createResultCard() {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;

    const context = canvas.getContext("2d");

    const gradient = context.createLinearGradient(0, 0, 1080, 1350);
    gradient.addColorStop(0, "#10182b");
    gradient.addColorStop(0.55, "#172541");
    gradient.addColorStop(1, "#0b1020");

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = "rgba(99,230,255,0.45)";
    context.lineWidth = 4;
    context.strokeRect(35, 35, 1010, 1280);

    context.textAlign = "center";
    context.fillStyle = "#63e6ff";
    context.font = "bold 36px sans-serif";
    context.fillText("BANGLA CHALLENGE LAB", 540, 135);

    context.fillStyle = "#f4f7ff";
    context.font = "bold 54px sans-serif";
    context.fillText("আমার Tech-Smart স্কোর", 540, 300);

    context.font = "bold 170px sans-serif";
    context.fillStyle = "#63e6ff";
    context.fillText(`${score}`, 465, 570);

    context.font = "bold 70px sans-serif";
    context.fillStyle = "#a6b2ca";
    context.fillText(`/ ${questions.length}`, 655, 570);

    context.font = "bold 46px sans-serif";
    context.fillStyle = "#f4f7ff";
    context.fillText(getResultTitle(score), 540, 700);

    context.font = "38px sans-serif";
    context.fillStyle = "#dce6f8";
    const name = playerName || "একজন Tech-Smart Learner";
    context.fillText(name, 540, 790, 900);

    context.fillStyle = "#263650";
    context.fillRect(160, 870, 760, 24);

    const meterGradient = context.createLinearGradient(160, 0, 920, 0);
    meterGradient.addColorStop(0, "#63e6ff");
    meterGradient.addColorStop(1, "#9b8cff");

    context.fillStyle = meterGradient;
    context.fillRect(160, 870, 760 * score / questions.length, 24);

    context.font = "32px sans-serif";
    context.fillStyle = "#a6b2ca";
    context.fillText("৭টি প্রশ্ন · একটি চ্যালেঞ্জ", 540, 1010);
    context.fillText("বন্ধুদেরও চ্যালেঞ্জ করো!", 540, 1080);

    context.font = "26px sans-serif";
    context.fillStyle = "#63e6ff";
    context.fillText("imranbrand.github.io/bangla-challenge-lab", 540, 1205);

    return canvas;
  }

  function downloadCard() {
    const canvas = createResultCard();

    canvas.toBlob((blob) => {
      if (!blob) {
        alert("কার্ড তৈরি করা যায়নি। আবার চেষ্টা করো।");
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "bangla-challenge-result.png";

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  }

  function shareFacebook() {
    const shareUrl = "https://imranbrand.github.io/bangla-challenge-lab/";
    const facebookUrl =
      "https://www.facebook.com/sharer/sharer.php?u=" +
      encodeURIComponent(shareUrl);

    window.open(
      facebookUrl,
      "_blank",
      "noopener,noreferrer,width=700,height=600"
    );
  }

  function retryQuiz() {
    startQuiz();
  }

  function init() {
    const requiredIds = [
      "start-screen",
      "quiz-screen",
      "result-screen",
      "start-btn",
      "question-number",
      "total-questions",
      "progress-bar",
      "question-category",
      "question-text",
      "answer-options",
      "answer-feedback",
      "answered-count",
      "next-btn",
      "final-score",
      "result-title",
      "result-message",
      "result-meter-fill",
      "player-result",
      "download-btn",
      "share-btn",
      "retry-btn"
    ];

    const missing = requiredIds.filter((id) => !$(id));

    if (missing.length) {
      console.error("HTML-এ প্রয়োজনীয় ID পাওয়া যায়নি:", missing);
      return;
    }

    $("start-btn").addEventListener("click", startQuiz);

    $("next-btn").addEventListener("click", () => {
      if (!answered) return;

      if (currentIndex < questions.length - 1) {
        currentIndex += 1;
        renderQuestion();
      } else {
        showResult();
      }
    });

    $("download-btn").addEventListener("click", downloadCard);
    $("share-btn").addEventListener("click", shareFacebook);
    $("retry-btn").addEventListener("click", retryQuiz);

    updateAnsweredCount();

    const year = $("current-year");
    if (year) year.textContent = String(new Date().getFullYear());

    showScreen("start-screen");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

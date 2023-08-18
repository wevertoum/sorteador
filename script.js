const editButton = document.getElementById("editButton");
const modal = document.getElementById("modal");
const saveButton = document.getElementById("saveButton");
const participantList = document.getElementById("participantList");
const startButton = document.getElementById("startButton");
const winnerList = document.getElementById("winnerList");
const winnerContainer = document.getElementById("winnerContainer");
const htmlAll = document.querySelector("html");

let participants = [];
let winners = [];

editButton.addEventListener("click", () => {
  modal.style.display = "block";
});

saveButton.addEventListener("click", () => {
  participants = participantList.value
    .split("\n")
    .map((name) => name.trim())
    .filter((name) => name !== "");
  modal.style.display = "none";
  startButton.removeAttribute("disabled");
});

startButton.addEventListener("click", () => {
  if (participants.length === 0) {
    alert("A lista de participantes está vazia.");
    return;
  }

  let animationInterval;
  let countdown = 10;
  const selectedNameElement = document.getElementById("selectedName");

  selectedNameElement.classList.remove("selected-winner");
  htmlAll.classList.remove("animated-background");

  startButton.setAttribute("disabled", true);

  animationInterval = setInterval(() => {
    countdown--;
    if (countdown === 0) {
      clearInterval(animationInterval);

      const winner =
        participants[Math.floor(Math.random() * participants.length)];
      winners.push(winner);
      winnerList.innerHTML = winners.map((name) => `<li>${name}</li>`).join("");
      participants = participants.filter((name) => name !== winner);
      selectedNameElement.textContent = winner;

      selectedNameElement.classList.add("selected-winner");
      htmlAll.classList.add("animated-background");
      startButton.removeAttribute("disabled");
    } else {
      const randomIndex = Math.floor(Math.random() * participants.length);
      const randomName = participants[randomIndex];
      selectedNameElement.textContent = randomName;
    }
  }, 200);
});

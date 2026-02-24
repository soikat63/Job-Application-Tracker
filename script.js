let interviewList = [];
let rejectedList = [];
let currentFilter = "all";

const total = document.getElementById("total-count");
const interviewCount = document.getElementById("interview-count");
const rejectedCount = document.getElementById("rejected-count");
const allToggleBtn = document.getElementById("toggle-all-btn");
const interviewToggleBtn = document.getElementById("toggle-interview-btn");
const rejectedToggleBtn = document.getElementById("toggle-rejected-btn");
const mainContainer = document.getElementById("main-container");
const filteredItem = document.getElementById("filtered-item");
const allCards = document.getElementById("all-cards");
const jobsCountText = document.getElementById("jobs-count-text");
const emptyState = document.getElementById("empty-state");

//total count
function totalCount() {
  const count = allCards.children.length;
  total.innerText = count;
  jobsCountText.innerText = count + " jobs";

  if (count === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }
}
totalCount();



//interview rejected count
function updateCounts() {
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}



//get card info
function getCardInfo(card) {
  return {
    companyName: card.querySelector(".company-name").innerText,
    designation: card.querySelector(".designation").innerText,
    workType: card.querySelector(".work-type").innerText,
    description: card.querySelector(".description").innerText,
  };
}



//status badge change
function statusBadgeChange(button) {
  const card = button.closest(".bg-white");
  const badgeSpan = card.querySelector(".status-badge span");
  const companyName = card.querySelector(".company-name").innerText;

  badgeSpan.innerText = button.innerText;
  badgeSpan.classList.remove(
    "bg-gray-200",
    "text-gray-700",
    "bg-green-100",
    "text-green-700",
    "bg-red-100",
    "text-red-700",
  );

  if (button.innerText === "INTERVIEW") {
    badgeSpan.classList.add("bg-green-100", "text-green-700");

    const exists = interviewList.find(function (i) {
      return i.companyName === companyName;
    });
    if (!exists) interviewList.push(getCardInfo(card));
    rejectedList = rejectedList.filter(function (i) {
      return i.companyName !== companyName;
    });
  }

  if (button.innerText === "REJECTED") {
    badgeSpan.classList.add("bg-red-100", "text-red-700");

    const exists = rejectedList.find(function (i) {
      return i.companyName === companyName;
    });
    if (!exists) rejectedList.push(getCardInfo(card));
    interviewList = interviewList.filter(function (i) {
      return i.companyName !== companyName;
    });
  }

  updateCounts();

  if (currentFilter === "interview") renderInterview();
  else if (currentFilter === "rejected") renderRejected();
}

//toggle btn
function btnToggle(id) {
  allToggleBtn.classList.remove("bg-blue-600", "text-white");
  interviewToggleBtn.classList.remove("bg-blue-600", "text-white");
  rejectedToggleBtn.classList.remove("bg-blue-600", "text-white");
  allToggleBtn.classList.add("bg-gray-100", "text-black");
  interviewToggleBtn.classList.add("bg-gray-100", "text-black");
  rejectedToggleBtn.classList.add("bg-gray-100", "text-black");

  const currentBtn = document.getElementById(id);
  currentBtn.classList.remove("bg-gray-100", "text-black");
  currentBtn.classList.add("bg-blue-600", "text-white");

  if (id === "toggle-all-btn") {
    currentFilter = "all";
    allCards.classList.remove("hidden");
    filteredItem.classList.add("hidden");
  } else if (id === "toggle-interview-btn") {
    currentFilter = "interview";
    allCards.classList.add("hidden");
    filteredItem.classList.remove("hidden");
    renderInterview();
  } else if (id === "toggle-rejected-btn") {
    currentFilter = "rejected";
    allCards.classList.add("hidden");
    filteredItem.classList.remove("hidden");
    renderRejected();
  }
}



//make the card for array push
function makeCardHTML(job, status) {
  const badgeClass =
    status === "INTERVIEW"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  return `
        <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
                <h3 class="company-name text-lg font-semibold text-blue-900">${job.companyName}</h3>
                <p class="designation text-sm text-gray-600 mt-1">${job.designation}</p>
                <p class="work-type text-sm text-gray-500 mt-2">${job.workType}</p>
            </div>
            <button class="text-gray-400 hover:text-red-500 transition w-8 h-8 rounded-full border border-gray-200 hover:border-red-500 p-2 flex items-center justify-center cursor-pointer">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
        <div class="status-badge mt-4">
            <span class="inline-block text-xs font-medium ${badgeClass} px-3 py-2 rounded-sm">${status}</span>
        </div>
        <p class="description text-sm text-gray-600 mt-4">${job.description}</p>
        <div class="flex flex-wrap gap-3 mt-6">
            <button onclick="statusBadgeChange(this)" class="px-4 py-2 text-sm font-medium border border-green-500 text-green-600 rounded-md hover:bg-green-50 transition cursor-pointer">INTERVIEW</button>
            <button onclick="statusBadgeChange(this)" class="px-4 py-2 text-sm font-medium border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition cursor-pointer">REJECTED</button>
        </div>
    `;
}



//render interview card
function renderInterview() {
  filteredItem.innerHTML = "";
  if (interviewList.length === 0) {
    filteredItem.innerHTML =
      '<p class="text-gray-400 mt-8 text-sm">No interview yet.</p>';
    return;
  }
  interviewList.forEach(function (job) {
    const div = document.createElement("div");
    div.className = "mt-8 bg-white border border-gray-200 rounded-xl p-6";
    div.innerHTML = makeCardHTML(job, "INTERVIEW");
    filteredItem.appendChild(div);
  });
}



//Render rejected cards
function renderRejected() {
  filteredItem.innerHTML = "";
  if (rejectedList.length === 0) {
    filteredItem.innerHTML =
      '<p class="text-gray-400 mt-8 text-sm">No rejected jobs yet.</p>';
    return;
  }
  rejectedList.forEach(function (job) {
    const div = document.createElement("div");
    div.className = "mt-8 bg-white border border-gray-200 rounded-xl p-6";
    div.innerHTML = makeCardHTML(job, "REJECTED");
    filteredItem.appendChild(div);
  });
}


// Delete all cards
allCards.addEventListener("click", function (e) {
  const deleteBtn = e.target.closest(".delate-btn");
  if (deleteBtn) {
    const card = deleteBtn.closest(".bg-white");
    const companyName = card.querySelector(".company-name").innerText;
    interviewList = interviewList.filter(function (i) {
      return i.companyName !== companyName;
    });
    rejectedList = rejectedList.filter(function (i) {
      return i.companyName !== companyName;
    });
    card.remove();
    totalCount();
    updateCounts();
  }
});

 
//Delete filtered card
filteredItem.addEventListener("click", function (e) {
  const trashIcon = e.target.closest("button");
  if (trashIcon && trashIcon.querySelector(".fa-trash-can")) {
    const card = trashIcon.closest(".bg-white");
    const companyName = card.querySelector(".company-name").innerText;

    interviewList = interviewList.filter(function (i) {
      return i.companyName !== companyName;
    });
    rejectedList = rejectedList.filter(function (i) {
      return i.companyName !== companyName;
    });

    const allCardItems = allCards.querySelectorAll(".bg-white");
    allCardItems.forEach(function (c) {
      if (c.querySelector(".company-name").innerText === companyName)
        c.remove();
    });

    card.remove();
    totalCount();
    updateCounts();
  }
});

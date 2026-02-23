let total = document.getElementById("total-count");

// All button
const allToggleBtn = document.getElementById("toggle-all-btn");
const interviewToggleBtn = document.getElementById("toggle-interview-btn");
const rejectedToggleBtn = document.getElementById("toggle-rejected-btn");
const statusBadge = document.getElementById("status-badge");

// Main card section
let allCardlength = document.getElementById("all-cards");

//Status badge change inside the card item
function statusBadgeChange(button) {
  statusBadge.innerText = button.innerText;

  // previous color remove
  statusBadge.classList.remove(
    "bg-gray-200",
    "text-gray-700",
    "bg-green-100",
    "text-green-700",
    "bg-red-500",
    "text-red-600",
    "border",
    "border-green-500",
    "border-red-500",
  );

  if (button.id === "btn-interview") {
    statusBadge.classList.add("border", "border-green-500", "text-green-600");
  } else if (button.id === "btn-reject") {
    statusBadge.classList.add("border", "border-red-500", "text-red-600");
  }
}

// Count track of total
function totalCount() {
  total.innerText = allCardlength.children.length;
}
totalCount();

// Button toggling
function btnToggle(id) {
  console.log("btn-clicked");

  //Remove blue bg
  allToggleBtn.classList.remove("bg-blue-600", "text-white");
  interviewToggleBtn.classList.remove("bg-blue-600", "text-white");
  rejectedToggleBtn.classList.remove("bg-blue-600", "text-white");

  //Add gray color
  allToggleBtn.classList.add("bg-gray-100", "text-black");
  interviewToggleBtn.classList.add("bg-gray-100", "text-black");
  rejectedToggleBtn.classList.add("bg-gray-100", "text-black");
  // console.log(id);

  //Adding current color
  const currentBtn = document.getElementById(id);
  // console.log(currentBtn);
  currentBtn.classList.remove("bg-gray-100", "text-black");
  currentBtn.classList.add("bg-blue-600", "text-white");
}

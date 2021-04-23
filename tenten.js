// Functions
function openCard(id) {
	cards[id].innerHTML = "<p style='text-align: center; font-size: 48px;'>&#x" + cardInfos[id] + ";</p>";
	cards[id].style.background = "hsl(37, 18%, 91%)";
	cardOpen[id] = true;
}

function closeCard(id) {
	cards[id].innerHTML = "";
	cards[id].style.background = "hsl(37, 18%, 61%)";
	cardOpen[id] = false;
}

// Variables
var cards = document.querySelectorAll(".closed-card");
var cardOpen = new Array(cards.length);
var cardClickable = new Array(cards.length);
var previousCard = -1;
var closeTimerSet = false;

const emojis = [
	"1F600", "1F603", "1F604", "1F923", "1F607", "1F61A", "1F911", "1F47F", "1F971", "1F47A", "1F63A", "1F64A",
	"1F601", "1F605", "1F618", "1F61D", "1F92B", "1F636", "1F634", "1F637", "1F920", "1F613", "1F60B", "1F649",
	"1F590", "270B",  "1F918", "1F91F", "1F446",  "270A", "1F450", "1F932", "1F64F", "1F466", "1F467", "1F471",
	"1F64D", "1F64E", "1F645", "1F646"
]

var cardInfos = [];

// Shuffle array
const shuffled = emojis.sort(() => 0.5 - Math.random());

// Get sub-array of first n elements after shuffled
var cardInfos = shuffled.slice(0, 12);
cardInfos = cardInfos.concat(cardInfos);
cardInfos = cardInfos.sort(() => 0.5 - Math.random());

var steps = 0;
var completed = 0;
var counter = document.getElementById("counter");

// Main code
for (let i = 0; i < cards.length; i++) {
	// Initialize values
	cardOpen[i] = false;
	cardClickable[i] = true;

	// Add onclick listener
	cards[i].onclick = function() {
		// If card is not clickable, do nothing
		if (cardClickable[i] == false) {
			return;
		}

		// If close timer is set, do nothing until it works
		if (closeTimerSet == true) {
			return;
		}

		// Close the card, if it's already opened
		if (cardOpen[i] == true) {
			// Close the card
			closeCard(i);
			previousCard = -1;
			steps++;
			counter.textContent = "Count: " + steps + " - Completed: " + completed + "/12";
			return
		}

		// Count steps
		steps++;
		counter.textContent = "Count: " + steps + " - Completed: " + completed + "/12";

		// Display the card
		openCard(i);

		// Compare with previous one
		if (previousCard == -1) { // There are no cards opened before.
			previousCard = i;
		} else if (cardInfos[previousCard] == cardInfos[i] && i != previousCard) {
			// Cards match
			completed++;
			counter.textContent = "Count: " + steps + " - Completed: " + completed + "/12";
			cardClickable[previousCard] = false;
			cardClickable[i] = false;
			previousCard = -1;
		} else { // Cards not match
			closeTimerSet = true;

			// Wait 500ms and close them both
			setTimeout(function () {
				closeCard(i);
				closeCard(previousCard);
				previousCard = -1;
				closeTimerSet = false;
			}, 500);
		}
	}
}
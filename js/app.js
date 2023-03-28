const items = document.querySelectorAll(".item");
const nextButtons = document.querySelectorAll(".next");
const prevButtons = document.querySelectorAll(".prev");
const inputs = document.querySelectorAll(".quiz__radio");
const percentSpans = document.querySelectorAll(".result-quiz__percent");
const submit = nextButtons[nextButtons.length - 1];

const result = document.querySelectorAll(".item-result");
const result1 = document.querySelector(".item-result--1");
const result2 = document.querySelector(".item-result--2");
const result3 = document.querySelector(".item-result--3");

const removeActiveStatus = () => {
	items.forEach((item) => {
		item.classList.remove("active");
	});
};
const addActiveStatus = (target) => {
	items[target].classList.add("active");
};

// Next event
nextButtons.forEach((btn) => {
	btn.addEventListener("click", () => {
		var itemIndex = 0;
		items.forEach((item, i) => {
			if (item.classList.contains("active")) {
				itemIndex = i;
			}
		});
		removeActiveStatus();
		itemIndex++;
		if (itemIndex >= items.length) {
			itemIndex = 0;
		}
		addActiveStatus(itemIndex);

		inputs.forEach((el) => {
			el.addEventListener("change", () => {
				nextButtons.forEach((el, btnIndex) => {
					console.log(btnIndex);
					if (itemIndex == btnIndex) {
						el.classList.add("active");
					}
				});
			});
		});

		if (itemIndex == 0) {
			removeActiveStatus();
		}
	});
});

// Prev event
prevButtons.forEach((btn) => {
	btn.addEventListener("click", () => {
		items.forEach((item, i) => {
			if (item.classList.contains("active")) {
				itemIndex = i;
			}
		});
		removeActiveStatus();
		itemIndex--;
		if (itemIndex < 0) {
			itemIndex = itemCount - 1;
		}
		addActiveStatus(itemIndex);
	});
});

// Quiz events
submit.addEventListener("click", () => {
	let array = [];

	inputs.forEach((input) => {
		if (input.checked) {
			array.push(Number(input.value));
		}
	});

	let max = Array.from(
		array.reduce((acc, n) => acc.set(n, (acc.get(n) ?? 0) + 1), new Map()),
	)
		.reduce((max, n) => (max[1] > n[1] ? max : n), [, 0])
		.shift();

	result.forEach((el, index) => {
		if (max == 1 && index == 0) {
			el.classList.add("active");
		} else if (max == 2 && index == 1) {
			el.classList.add("active");
		} else if (max == 3 && index == 2) {
			el.classList.add("active");
		}
	});

	let totalItems = array.length;
	let uniqueItems = [...new Set(array)];

	uniqueItems.forEach((currValue) => {
		let numItems = array.filter((value) => value === currValue);
		let percent = (numItems.length * 100) / totalItems;

		if (max == currValue) {
			percentSpans.forEach((el) => {
				el.textContent += Math.round(percent);
			});
			// let results = document.getElementById("results");
			// results.innerHTML =
			// 	"<h3>" +
			// 	`Вы на ${Math.round(percent)}% человек ${currValue}` +
			// 	"</h3>";

			console.log(`Вы на ${percent}% человек ${currValue}`);
		}
	});
});

//==================================
// JQuery
// const next = $(".next");
// const items = $(".item");
// // const items = $(".items").find(".item");

// next.click(function () {
// 	let nextIndex = $(".next").index(this);
// 	nextIndex += 1;
// 	console.log(nextIndex);

// 	items.each(function (index) {
// 		if (index == nextIndex) {
// 			$(this).removeClass("active");
// 		} else if (index == nextIndex + 1) {
// 			$(this).next().addClass("active");
// 		}
// 	});
// });

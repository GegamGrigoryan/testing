export class ValidatorCard {
  constructor() {
    this.input = document.querySelector(".input");
  }

  calculateLuhn() {
    let ch = 0;
    const num = String(this.input.value).replace(/\D/g, "");
    const isOdd = num.length % 2 !== 0;

    if ("" === num) return false;

    for (let i = 0; i < num.length; i++) {
      let n = parseInt(num[i], 10);

      ch += (isOdd | 0) === i % 2 && 9 < (n *= 2) ? n - 9 : n;
    }

    return 0 === ch % 10;
  }

  validInvalid() {
    let btn = document.querySelector(".btn");
    btn.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("btn") &&
        this.calculateLuhn() === true
      ) {
        btn.textContent = "Valid";
        btn.style.background = "green";
      } else {
        btn.textContent = "InValid";
        btn.style.background = "red";
      }
    });
  }

  bancName() {
    this.input.addEventListener("input", () => {
      let card = this.input.value;
      if (card.startsWith("34" || "37")) {
        document.querySelector(".amex").classList.remove("mask");
      } else if (card.startsWith("36")) {
        document.querySelector(".dinners").classList.remove("mask");
      } else if (card.startsWith("2200" || "2204")) {
        document.querySelector(".mir").classList.remove("mask");
      } else if (card.startsWith("4")) {
        document.querySelector(".visa").classList.remove("mask");
      } else if (card.startsWith("5428" || "3589")) {
        document.querySelector(".jsb").classList.remove("mask");
      } else if (card.startsWith("51" || "55")) {
        document.querySelector(".mastercard").classList.remove("mask");
      } else {
        document.querySelectorAll(".card-img").forEach((element) => {
          element.classList.add("mask");
        });
      }
    });
  }
}

new ValidatorCard().bancName();
new ValidatorCard().calculateLuhn();
new ValidatorCard().validInvalid();

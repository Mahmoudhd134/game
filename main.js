let gameBads = Array.from(document.querySelectorAll(".game"));
gameBads.forEach((gamebad) => {
  gamebad.addEventListener("touchmove", (event) => {
    event.preventDefault();
  });
  gamebad.addEventListener("mousemove", (event) => {
    event.preventDefault();
  });
});

//start number game

let btn1 = document.getElementById("startgame");

let box = document.querySelectorAll("#numbergameitems > *");

btn1.onclick = function () {
  if (btn1.textContent == "Start") {
    btn1.textContent = "End";
    btn1.style.backgroundColor = "#8a8072";
    document.getElementById("numbergame").style.height = "400px";
    document.getElementById("numbergameitems").style.height = "300px";
    document.getElementById("numbergameitems").style.opacity = 1;
    document.getElementById("numbergameitems").style.display = "grid";
    for (let i = 0; i < box.length; i++) {
      box[i].style.display = "flex";
      box[i].className = "centerItemsInside";
    }
    btn1.style.boxShadow = "2px 2px 2px #534837";

    document.querySelector(".finished").style.display = "none";
    document.querySelector(".Congratulations").style.display = "none";

    let nums = [];
    for (let i = 0; i < box.length - 1; i++) {
      nums[i] = i + 1;
    }
    for (let i = 0; i < box.length - 1; i++) {
      let randomIndex = Math.floor(Math.random() * (nums.length - i));
      [nums[randomIndex], nums[nums.length - 1 - i]] = [
        nums[nums.length - 1 - i],
        nums[randomIndex],
      ];
    }
    box[8].setAttribute("id", "empty");

    // to cheat

    // for (let i = 0; i < box.length - 1; i++) {
    //   nums[i] = i + 1;
    // }

    for (let i = 0; i < box.length - 1; i++) {
      box[i].setAttribute("id", nums[i]);
    }
    let randomIndex = Math.floor(Math.random() * box.length);
    [box[8].id, box[randomIndex].id] = [box[randomIndex].id, box[8].id];

    for (let j = 0; j < box.length; j++) {
      if (box[j].id === "empty") box[j].textContent = "";
      else box[j].textContent = box[j].id;
    }
    console.log("***********************reset***************************");
    for (let j = 0; j < box.length; j++) {
      if (getIndexGenerally(box[j]) === +box[j].id - 1) {
        box[j].style.color = "gold";
        box[j].style.textShadow = "0px 0px 5px gold";
      } else {
        box[j].style.color = "black";
        box[j].style.textShadow = "0px 0px 15px black";
      }
    }
  } else if (btn1.textContent == "End") {
    btn1.textContent = "Start";
    for (let i = 0; i < box.length; i++) {
      box[i].textContent = "";
      box[i].style.display = "none";
    }
    btn1.style.boxShadow = "none";
    btn1.style.backgroundColor = "#a38b69";
    document.getElementById("numbergameitems").style.opacity = 0.5;
    document.querySelector(".Congratulations").textContent = "Play again";
  }
};

function getIndexGenerally(elm) {
  let c = elm.parentNode.children;
  for (let i = 0; i < c.length; i++) {
    if (c[i] == elm) return i;
  }
}

let canSwapOne = {
  0: [1, 3],
  1: [0, 2, 4],
  2: [1, 5],
  3: [0, 4, 6],
  4: [1, 3, 5, 7],
  5: [2, 4, 8],
  6: [3, 7],
  7: [4, 6, 8],
  8: [5, 7],
};

let canSwapTwo = {
  0: [2, 6],
  1: [7],
  2: [0, 8],
  3: [5],
  4: [],
  5: [3],
  6: [0, 8],
  7: [1],
  8: [2, 6],
};

function gameFinished() {
  for (let i = 0; i < box.length - 1; i++) {
    if (+box[i].id - 1 !== getIndexGenerally(box[i])) return false;
  }
  return true;
}

function swabBoxs(ele1, ele2) {
  [ele1.id, ele2.id] = [ele2.id, ele1.id];
}

for (let i = 0; i < box.length; i++) {
  //Touch
  box[i].addEventListener("touchstart", (event) => {
    makeActionNuberGame(i);
  });
  box[i].addEventListener("touchend", (event) => {
    makeActionNuberGame(i);
  });
  box[i].addEventListener("touchmove", (event) => {
    makeActionNuberGame(i);
  });

  //mouse
  box[i].addEventListener("mousedown", (event) => {
    makeActionNuberGame(i);
  });
}

function makeActionNuberGame(i) {
  let embtyBoxPosition = getIndexGenerally(document.getElementById("empty"));
  let position = getIndexGenerally(box[i]);

  if (canSwapOne[embtyBoxPosition].some((el) => el === position)) {
    swabBoxs(box[i], box[embtyBoxPosition]);
  } else if (canSwapTwo[embtyBoxPosition].some((el) => el === position)) {
    if (
      embtyBoxPosition === 1 ||
      embtyBoxPosition === 3 ||
      embtyBoxPosition === 5 ||
      embtyBoxPosition === 7
    ) {
      swabBoxs(box[4], box[embtyBoxPosition]);
      swabBoxs(box[i], box[4]);
    } else if (
      embtyBoxPosition === 0 ||
      embtyBoxPosition === 2 ||
      embtyBoxPosition === 6 ||
      embtyBoxPosition === 8
    ) {
      if (
        (position === 0 || position === 2) &&
        (embtyBoxPosition === 0 || embtyBoxPosition === 2)
      ) {
        swabBoxs(box[1], box[embtyBoxPosition]);
        swabBoxs(box[i], box[1]);
      } else if (
        (position === 0 || position === 6) &&
        (embtyBoxPosition === 0 || embtyBoxPosition === 6)
      ) {
        swabBoxs(box[3], box[embtyBoxPosition]);
        swabBoxs(box[i], box[3]);
      } else if (
        (position === 6 || position === 8) &&
        (embtyBoxPosition === 6 || embtyBoxPosition === 8)
      ) {
        swabBoxs(box[7], box[embtyBoxPosition]);
        swabBoxs(box[i], box[7]);
      } else if (
        (position === 2 || position === 8) &&
        (embtyBoxPosition === 2 || embtyBoxPosition === 8)
      ) {
        swabBoxs(box[5], box[embtyBoxPosition]);
        swabBoxs(box[i], box[5]);
      }
    }
  }

  for (let j = 0; j < box.length; j++) {
    if (box[j].id === "empty") box[j].textContent = "";
    else box[j].textContent = box[j].id;
  }

  for (let j = 0; j < box.length; j++) {
    if (getIndexGenerally(box[j]) === +box[j].id - 1) {
      box[j].style.color = "gold";
      box[j].style.textShadow = "0px 0px 5px gold";
    } else {
      box[j].style.color = "black";
      box[j].style.textShadow = "0px 0px 15px black";
    }
  }

  if (gameFinished()) {
    document.querySelector(".finished").style.display = "block";
    document.querySelector(".Congratulations").style.display = "block";
    document.querySelector(".Congratulations").textContent = "Well done...";
  }
}

//end number game

//start 2048 game

let box2048 = document.querySelectorAll("#game2048items > *");

let btn2 = document.getElementById("reset2048");

btn2.onclick = function () {
  btn2.textContent = "reset";
  for (let i = 0; i < box2048.length; i++) {
    box2048[i].textContent = "";
    box2048[i].className = "centerItemsInside";
  }
  document.querySelector("#game2048").style.height = "470px";
  document.getElementById("game2048items").style.height = "340px";
  document.querySelector("#game2048items").style.display = "grid";
  document.getElementById("gameover2048").style.display = "none";
  box2048[0].style.borderTopLeftRadius = "30px";
  box2048[3].style.borderTopRightRadius = "30px";
  box2048[12].style.borderBottomLeftRadius = "30px";
  box2048[15].style.borderBottomRightRadius = "30px";
  insertBox2048();
};

let indexs = {
  top: { start: [0, 1, 2, 3], end: [12, 13, 14, 15] },
  right: { start: [3, 7, 11, 15], end: [0, 4, 8, 12] },
  bottom: { start: [12, 13, 14, 15], end: [0, 1, 2, 3] },
  left: { start: [0, 4, 8, 12], end: [3, 7, 11, 15] },
};

let colorsSheet2048 = {
  2: { color: "#776e65", backgroundColor: "#eee4da" },
  4: { color: "#776e65", backgroundColor: "#ede0c8" },
  8: { color: "#f9f6f2", backgroundColor: "#f2b179" },
  16: { color: "#f9f6f2", backgroundColor: "#f59563" },
  32: { color: "#f9f6f2", backgroundColor: "#f67c5f" },
  64: { color: "#f9f6f2", backgroundColor: "#f65e3b" },
  128: { color: "#f9f6f2", backgroundColor: "#edcf72" },
  256: { color: "#f9f6f2", backgroundColor: "#edcc61" },
  512: { color: "#f9f6f2", backgroundColor: "#edc850" },
  1024: { color: "#f9f6f2", backgroundColor: "#edc53f" },
  2048: { color: "#f9f6f2", backgroundColor: "#edc22e" },
};
function changeBackgrounColor2048() {
  for (let i = 0; i < box2048.length; i++) {
    if (box2048[i].textContent === "") {
      box2048[i].style.backgroundColor = "#ccc0b3";
    } else {
      box2048[i].style.color = colorsSheet2048[box2048[i].textContent]["color"];
      box2048[i].style.backgroundColor =
        colorsSheet2048[box2048[i].textContent]["backgroundColor"];
    }
  }
}

function gameOver() {
  for (
    let i = indexs["top"]["start"][0];
    i < indexs["top"]["start"][3] + 1;
    i++
  ) {
    for (let j = i; indexs["top"]["end"].every((el) => el > j); j += 4) {
      if (canMeregeToBottom(j)) return false;
    }
  }

  for (
    let i = indexs["right"]["start"][0];
    i < indexs["right"]["start"][3] + 1;
    i += 4
  ) {
    for (let j = i; !indexs["right"]["end"].some((el) => el === j); j--) {
      if (canMeregeToLeft(j)) return false;
    }
  }

  for (
    let i = indexs["bottom"]["start"][0];
    i < indexs["bottom"]["start"][3] + 1;
    i++
  ) {
    for (let j = i; !indexs["bottom"]["end"].some((el) => el === j); j -= 4) {
      if (canMeregeToTop(j)) return false;
    }
  }

  for (
    let i = indexs["left"]["start"][0];
    i < indexs["left"]["start"][3] + 1;
    i += 4
  ) {
    for (let j = i; !indexs["left"]["end"].some((el) => el === j); j++) {
      if (canMeregeToRight(j)) return false;
    }
  }

  return true;
}

function insertBox2048() {
  setTimeout(function () {
    let randomIndex1 = Math.floor(Math.random() * 16);
    let randomNumber = Math.floor(Math.random() * 2 + 2);
    if (randomNumber === 3) randomNumber = 4;
    while (true) {
      if (box2048[randomIndex1].textContent === "") {
        box2048[randomIndex1].textContent = randomNumber;
        break;
      } else randomIndex1 = Math.floor(Math.random() * 16);
    }
    changeBackgrounColor2048();
  }, 100);
}

function canMeregeToTop(position) {
  let upperPosition = position - 4;
  if (upperPosition < 0) return false;
  if (box2048[position].textContent === "") return false;
  if (box2048[position].textContent === box2048[upperPosition].textContent)
    return true;
  else return false;
}
function canMeregeToRight(position) {
  let righterPosition = position + 1;
  if (righterPosition < 0) return false;
  if (box2048[position].textContent === "") return false;
  if (box2048[position].textContent === box2048[righterPosition].textContent)
    return true;
  else return false;
}
function canMeregeToBottom(position) {
  let bottomerPosition = position + 4;
  if (bottomerPosition < 0) return false;
  if (box2048[position].textContent === "") return false;
  if (box2048[position].textContent === box2048[bottomerPosition].textContent)
    return true;
  else return false;
}
function canMeregeToLeft(position) {
  let lefterPosition = position - 1;
  if (lefterPosition < 0) return false;
  if (box2048[position].textContent === "") return false;
  if (box2048[position].textContent === box2048[lefterPosition].textContent)
    return true;
  else return false;
}

function moveEmptyBoxsToBottom(ins) {
  if (indexs["top"]["start"].some((el) => el === ins)) return 0;
  if (indexs["top"]["end"].every((el) => el < ins)) return 0;

  if (box2048[ins - 4].textContent === "" && box2048[ins].textContent !== "") {
    swapItemes2048(box2048[ins], box2048[ins - 4]);
    moveEmptyBoxsToBottom(ins - 4);
  }
  moveEmptyBoxsToBottom(ins + 4);
}
function moveEmptyBoxsToLeft(ins) {
  if (indexs["right"]["start"].some((el) => el === ins)) return 0;
  if (indexs["right"]["end"].some((el) => el - 1 === ins)) return 0;

  if (box2048[ins + 1].textContent === "" && box2048[ins].textContent !== "") {
    swapItemes2048(box2048[ins], box2048[ins + 1]);
    moveEmptyBoxsToLeft(ins + 1);
  }
  moveEmptyBoxsToLeft(ins - 1);
}
function moveEmptyBoxsToTop(ins) {
  if (indexs["bottom"]["start"].some((el) => el === ins)) return 0;
  if (indexs["bottom"]["end"].every((el) => el > ins)) return 0;

  if (box2048[ins + 4].textContent === "" && box2048[ins].textContent !== "") {
    swapItemes2048(box2048[ins + 4], box2048[ins]);
    moveEmptyBoxsToTop(ins + 4);
  }
  moveEmptyBoxsToTop(ins - 4);
}
function moveEmptyBoxsToRight(ins) {
  if (indexs["left"]["start"].some((el) => el === ins)) return 0;
  if (indexs["left"]["end"].some((el) => el + 1 === ins)) return 0;

  if (box2048[ins - 1].textContent === "" && box2048[ins].textContent !== "") {
    swapItemes2048(box2048[ins], box2048[ins - 1]);
    moveEmptyBoxsToRight(ins - 1);
  }
  moveEmptyBoxsToRight(ins + 1);
}

function swapItemes2048(ele1, ele2) {
  [ele1.textContent, ele2.textContent] = [ele2.textContent, ele1.textContent];
}

function merge(ins1, ins2) {
  box2048[ins1].textContent = +box2048[ins1].textContent * 2;
  box2048[ins2].textContent = "";
}

let ob1 = {
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: "",
  15: "",
};
let ob2 = {
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: "",
  15: "",
};
let ob3 = {
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: "",
  15: "",
};

function isTwoObjectsIdenticals(ob1, ob2) {
  for (let i = 0; i < box2048.length; i++) {
    if (ob1[i] !== ob2[i]) return false;
  }
  return true;
}

function fillObject(ob) {
  for (let i = 0; i < box2048.length; i++) {
    ob[i] = box2048[i].textContent;
  }
}

function isThereEmptyPlace(ob) {
  for (let i = 0; i < box2048.length; i++) {
    if (ob[i] === "") return true;
  }
  return false;
}

function apllyObject(ob) {
  for (let i = 0; i < box2048.length; i++) {
    box2048[i].textContent = ob[i];
  }
  changeBackgrounColor2048();
}

function equalTwoObjects(ob1, ob2) {
  for (let i = 0; i < box2048.length; i++) {
    ob2[i] = ob1[i];
  }
}

function moveTop() {
  fillObject(ob1);
  for (
    let j = indexs["top"]["start"][0] + 4;
    j < indexs["top"]["start"][3] + 5;
    j++
  ) {
    moveEmptyBoxsToBottom(j);
  }

  for (
    let i = indexs["top"]["start"][0];
    i < indexs["top"]["start"][3] + 1;
    i++
  ) {
    for (let j = i; indexs["top"]["end"].every((el) => el > j); j += 4) {
      if (canMeregeToBottom(j)) merge(j, j + 4);
    }
  }
  for (
    let j = indexs["top"]["start"][0] + 4;
    j < indexs["top"]["start"][3] + 5;
    j++
  ) {
    moveEmptyBoxsToBottom(j);
  }
  fillObject(ob2);
  if (!isTwoObjectsIdenticals(ob1, ob2)) {
    equalTwoObjects(ob1, ob3);
    if (isThereEmptyPlace(ob2)) insertBox2048();
  }
  if (!isThereEmptyPlace(ob2)) {
    console.log("!isThereEmptyPlace(ob2)");
    if (gameOver())
      document.getElementById("gameover2048").style.display = "flex";
  }
  changeBackgrounColor2048();
}
function moveRight() {
  fillObject(ob1);
  for (
    let j = indexs["right"]["start"][0] - 1;
    j < indexs["right"]["end"][3] + 3;
    j += 4
  ) {
    moveEmptyBoxsToLeft(j);
  }
  for (
    let i = indexs["right"]["start"][0];
    i < indexs["right"]["start"][3] + 1;
    i += 4
  ) {
    for (let j = i; !indexs["right"]["end"].some((el) => el === j); j--) {
      if (canMeregeToLeft(j)) merge(j, j - 1);
    }
  }
  for (
    let j = indexs["right"]["start"][0] - 1;
    j < indexs["right"]["end"][3] + 3;
    j += 4
  ) {
    moveEmptyBoxsToLeft(j);
  }
  fillObject(ob2);
  if (!isTwoObjectsIdenticals(ob1, ob2)) {
    equalTwoObjects(ob1, ob3);
    if (isThereEmptyPlace(ob2)) insertBox2048();
  }
  if (!isThereEmptyPlace(ob2)) {
    console.log("!isThereEmptyPlace(ob2)");
    if (gameOver())
      document.getElementById("gameover2048").style.display = "flex";
  }
  changeBackgrounColor2048();
}
function moveBottom() {
  fillObject(ob1);
  for (
    let j = indexs["bottom"]["start"][3] - 4;
    j > indexs["bottom"]["start"][0] - 5;
    j--
  ) {
    moveEmptyBoxsToTop(j);
  }
  for (
    let i = indexs["bottom"]["start"][0];
    i < indexs["bottom"]["start"][3] + 1;
    i++
  ) {
    for (let j = i; !indexs["bottom"]["end"].some((el) => el === j); j -= 4) {
      if (canMeregeToTop(j)) merge(j, j - 4);
    }
  }
  for (
    let j = indexs["bottom"]["start"][3] - 4;
    j > indexs["bottom"]["start"][0] - 5;
    j--
  ) {
    moveEmptyBoxsToTop(j);
  }
  fillObject(ob2);
  if (!isTwoObjectsIdenticals(ob1, ob2)) {
    equalTwoObjects(ob1, ob3);
    if (isThereEmptyPlace(ob2)) insertBox2048();
  }
  if (!isThereEmptyPlace(ob2)) {
    console.log("!isThereEmptyPlace(ob2)");
    if (gameOver())
      document.getElementById("gameover2048").style.display = "flex";
  }
  changeBackgrounColor2048();
}
function moveLeft() {
  fillObject(ob1);
  for (
    let j = indexs["left"]["start"][0] + 1;
    j < indexs["left"]["start"][3] + 2;
    j += 4
  ) {
    moveEmptyBoxsToRight(j);
  }
  for (
    let i = indexs["left"]["start"][0];
    i < indexs["left"]["start"][3] + 1;
    i += 4
  ) {
    for (let j = i; !indexs["left"]["end"].some((el) => el === j); j++) {
      if (canMeregeToRight(j)) merge(j, j + 1);
    }
  }
  for (
    let j = indexs["left"]["start"][0] + 1;
    j < indexs["left"]["start"][3] + 2;
    j += 4
  ) {
    moveEmptyBoxsToRight(j);
  }
  fillObject(ob2);
  if (!isTwoObjectsIdenticals(ob1, ob2)) {
    equalTwoObjects(ob1, ob3);
    if (isThereEmptyPlace(ob2)) insertBox2048();
  }
  if (!isThereEmptyPlace(ob2)) {
    console.log("!isThereEmptyPlace(ob2)");
    if (gameOver())
      document.getElementById("gameover2048").style.display = "flex";
  }
  changeBackgrounColor2048();
}

let btn3 = document.getElementById("returnstep2048");
btn3.onclick = function () {
  apllyObject(ob3);
  if (!isThereEmptyPlace(ob3)) {
    if (!gameOver())
      document.getElementById("gameover2048").style.display = "none";
  }
};

let startPositionX = 0,
  endPositionX = 0,
  startPositionY = 0,
  endPositionY = 0,
  movedX = 0,
  movedY = 0;
isMoving = false;

let game2048Area = document.querySelector("#game2048items");

//Touch
game2048Area.addEventListener("touchstart", touchStart);
game2048Area.addEventListener("touchend", touchEnd);
game2048Area.addEventListener("touchmove", touchMove);

//mouse
game2048Area.addEventListener("mousedown", touchStart);
game2048Area.addEventListener("mouseup", touchEnd);
game2048Area.addEventListener("mousemove", touchMove);

function touchStart(event) {
  // console.log("start");
  setStartPosition(event);
  isMoving = true;
}
function touchEnd(event) {
  // console.log("end");
  setEndPosition(event);
  isMoving = false;
}
function touchMove(event) {
  if (isMoving) {
    setEndPosition(event);
    makeAction();
    // console.log(movedX, movedY);
  }
}
function setStartPosition(event) {
  if (event.type.includes("mouse")) {
    startPositionX = event.pageX;
    startPositionY = event.pageY;
  } else {
    startPositionX = event.touches[0].clientX;
    startPositionY = event.touches[0].clientY;
  }
}
function setEndPosition(event) {
  if (isMoving) {
    if (event.type.includes("mouse")) {
      endPositionX = event.pageX;
      endPositionY = event.pageY;
    } else {
      endPositionX = event.touches[0].clientX;
      endPositionY = event.touches[0].clientY;
    }
    movedX = endPositionX - startPositionX;
    movedY = endPositionY - startPositionY;
  }
}
function makeAction() {
  if (movedX > 30) {
    moveRight();
    touchEnd(event);
  } else if (movedX < -30) {
    moveLeft();
    touchEnd(event);
  }

  if (movedY < -30) {
    moveTop();
    touchEnd(event);
  } else if (movedY > 30) {
    moveBottom();
    touchEnd(event);
  }
}

//end 2048 game

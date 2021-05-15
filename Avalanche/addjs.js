var credNum;
var credList = "";
var credTotal = [];
var arrayLen;
var testText = "";
var i;
var fi;
var x = 0;
var legend = document.getElementById("creditor");
var disp = "";
var instruct = document.getElementById("instruct");
var test = document.getElementById("test");
var cred = [];

//create arrays for each creditor "cred1 []" "cred2 []" ...etc
function getDebt() {
  x++; //populate an array with form input values
    window["cred" + x] = [
    document.forms["creditor"]["name"].value,
    Number(document.forms["creditor"]["intRate"].value),
    Number(document.forms["creditor"]["balance"].value),
    Number(document.forms["creditor"]["payment"].value)
  ];

  //Check for blank fields and return if a blank is found
  for (fi = 1; fi < 5; fi++) {   
    if (window["cred" + x][fi-1] == "") {
      x--; //resets the array to force input in the blank field
      document.forms["creditor"].elements[fi].style.backgroundColor =
      "yellow";
      document.forms["creditor"].elements[fi].setAttribute
      ("placeholder", "Required");
      return;
    }
  }

  //check last three fields for numeric input and return if NaN
  for (fi = 2; fi < 5; fi++) {   
    if (isNaN(window["cred" + x][fi-1])) {
      x--; //resets the array to force numeric input
      document.forms["creditor"].elements[fi].style.backgroundColor =
      "yellow";
      document.forms["creditor"].elements[fi].value = "";
      document.forms["creditor"].elements[fi].setAttribute
      ("placeholder", "number without symbols");
      return;
    }
  }

  //this function continues if the above conditions pass
  //the form is reset & array is confirmed
  document.forms["creditor"].reset();
  for (fi = 1; fi < 5; fi++) {
    document.forms["creditor"].elements[fi].style.backgroundColor =
    "";
    document.forms["creditor"].elements[fi].setAttribute
    ("placeholder", "");
  }
  instruct.innerHTML =
    "Click 'Done' when you are finished adding creditors";
  legend.innerHTML = `Creditor ${(Number(x) + 1)}`;
  test.innerHTML = `Saved: Creditor ${x}` + "<br>" +
  `${window["cred" + x][0]} - ${window["cred" + x][1]}% ($` +
  `${window["cred" + x][2]}) - $${window["cred" + x][3]}/month`;
}

function next() {
  document.getElementById("add").reset(); //resets form
}

//combine the "cred" arrays into one multi-dimensional array
function makeArray() {
  for (i = 1; i <= x; i++) {
    credTotal.push(window["cred" + i]);
  }
}

//to be used in "debt.html", which is the next phase 
function saveData() {
  localStorage.setItem("debtInfo", JSON.stringify(credTotal));
}

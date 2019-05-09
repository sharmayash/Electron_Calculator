let inputs = [];
let total;

const getValue = input => {
  if (
    inputs.length === 0 &&
    (input == "+" || input == "-" || input == "*" || input == "/")
  ) {
    inputs.push(0);
    inputs.push(input);
  } else {
    inputs.push(input);
  }

  update();
};

const update = () => {
  total = inputs.join("");
  $("#display").html(total);
};

const getTotal = () => {
  let evaluatedValue = eval(inputs.join(""));
  $.ajax({
    url: "/query",
    data: { query: inputs.join(""), result: evaluatedValue },
    method: "POST",
    success: data => {
      alert(data);
    }
  });
  if (
    evaluatedValue === Infinity ||
    evaluatedValue === -Infinity ||
    evaluatedValue == NaN
  ) {
    $("#display").html("Cannot Divide by zero");
    inputs = [];
  } else {
    $("#display").html(evaluatedValue);
    inputs.push(evaluatedValue);
  }
  inputs = [];
};

$("a").on("click", function() {
  if (this.id == "clearAll") {
    inputs = [];
    $("#display").html("0");
  } else if (this.id == "clear") {
    inputs.pop();
    update();
  } else if (this.id == "=") {
    getTotal();
  } else {
    getValue(this.id);
  }
});

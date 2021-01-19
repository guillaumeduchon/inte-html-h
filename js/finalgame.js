// FINAL GAME ANSWER
var container = document.getElementsByClassName("finalgame_answer")[0];
container.onkeyup = function (e) {
  var target = e.srcElement;
  var maxLength = parseInt(target.attributes["maxlength"].value, 10);
  var myLength = target.value.length;
  if (myLength >= maxLength) {
    var next = target;
    while (next = next.nextElementSibling) {
      if (next == null)
        break;
      if (next.tagName.toLowerCase() == "input") {
        next.focus();
        break;
      }
    }
  }
  if (e.keyCode === 8) {
    var previous = target;
    while (previous = previous.previousElementSibling) {
      if (previous == null)
        break;
      if (previous.tagName.toLowerCase() == "input") {
        previous.focus();
        previous.value = '';
        break;
      }
    }
  }
}

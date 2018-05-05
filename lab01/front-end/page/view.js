
function toogleMessageCheckbox() {
  checkboxes = document.getElementsByName('message_checkbox');
  source = document.getElementById('message_checkboxes')
  for(var i = 0, n = checkboxes.length; i < n; i++) {
    checkboxes[i].checked = source.checked;
  }
}

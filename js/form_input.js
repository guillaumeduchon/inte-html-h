// FORM COLOR
var input = document.querySelector('input');
input.addEventListener('input', evt => {
  const value = input.value

  if (!value) {
    input.dataset.state = ''
    return
  }

  const trimmed = value.trim()

  if (trimmed) {
    input.dataset.state = 'valid'
  } else {
    input.dataset.state = 'invalid'
  }
})
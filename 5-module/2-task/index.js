function toggleText() {
  document.addEventListener('click', function() {
    let btn = document.querySelector('.toggle-text-button');
    if (!btn) return;

    let txt =document.getElementById('text');
    txt.hidden = !txt.hidden;
  })
}

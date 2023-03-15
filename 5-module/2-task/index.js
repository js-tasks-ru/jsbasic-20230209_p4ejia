function toggleText() {
  // document.addEventListener('click', function() {
    let btn = document.querySelector('.toggle-text-button');
  //   if (!btn) return;
    btn.onclick = function() {
      let txt = document.getElementById('text');
      if (txt.hidden != true) {
        txt.hidden = true;
      } else 
      txt.removeAttribute('hidden');
    }

  //   let txt = document.getElementById('text');
  //   txt.hidden != txt.hidden;
  // })
}

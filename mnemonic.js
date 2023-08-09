function showInfo() {
    const infos = document.getElementById('mnes');
    infos.style.display = "block";
  }
  const clik = document.getElementById('secret');
  clik.addEventListener('click', showInfo);
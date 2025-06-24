function includeHTML() {
  const elements = document.querySelectorAll('[data-include-path]');

  elements.forEach(el => {
    const file = el.getAttribute('data-include-path');
    if (!file) return;

    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error(`Could not fetch ${file}`);
        return response.text();
      })
      .then(data => {
        el.innerHTML = data;
        // 중첩된 include 요소 처리
        includeHTML();
      })
      .catch(err => {
        // 오류 메시지를 보여주고 싶다면 아래 줄을 주석 해제하세요:
        // el.innerHTML = `<!-- Failed to include ${file}: ${err.message} -->`;
      });
  });
}

document.addEventListener("DOMContentLoaded", includeHTML);
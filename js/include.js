function includeHTML() {
  const elements = document.querySelectorAll('[data-include]');
  
  elements.forEach(el => {
    const file = el.getAttribute('data-include');
    if (file) {
      fetch(file)
        .then(response => {
          if (!response.ok) throw new Error(`Could not fetch ${file}`);
          return response.text();
        })
        .then(data => {
          el.innerHTML = data;
          // 재귀 호출로 중첩된 include 처리 가능
          includeHTML();
        })
        .catch(err => {
          // el.innerHTML = `<!-- Failed to include ${file}: ${err.message} -->`;
        });
    }
  });
}

// DOM이 준비된 후 실행
document.addEventListener("DOMContentLoaded", includeHTML);
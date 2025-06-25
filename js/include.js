// 모든 data-include 요소를 불러오고 끝나면 콜백 실행
function loadIncludes(callback) {
  const includeTargets = document.querySelectorAll('[data-include]');
  let remaining = includeTargets.length;

  if (remaining === 0) {
    callback(); // include가 없으면 바로 실행
    return;
  }

  includeTargets.forEach(async el => {
    const file = el.getAttribute('data-include');

    try {
      const res = await fetch(file);
      const html = await res.text();
      el.innerHTML = html;

      // 📌 삽입된 script 태그 재실행
      el.querySelectorAll("script").forEach(oldScript => {
        const newScript = document.createElement("script");
        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }
        document.body.appendChild(newScript);
      });
    } catch (err) {
      console.error(`파일 로딩 실패: ${file}`, err);
    } finally {
      remaining--;
      if (remaining === 0) {
        callback(); // 모두 로드 후 실행
      }
    }
  });
}

const aa = () => {
    document.getElementById("sayHello").addEventListener("click", () => {
        alert("안녕하세요! 👋");
    });
}

// 📌 header 로딩 후에 안전하게 접근
loadIncludes(() => {
    aa();
//   const header = document.querySelector('header');
//   if (header) {
//     console.log('✅ Header loaded!');
//     header.style.background = '#f0f8ff'; // 예시 조작

    
//   } else {
//     console.warn('❌ Header not found!');
//   }
//   // footer도 이렇게 접근 가능
});


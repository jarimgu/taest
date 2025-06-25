// 공통 header/footer 불러오기
document.addEventListener("DOMContentLoaded", () => {
    // header 불러오기
    fetch("includes/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;

        // header 로딩 이후 접근
        const headerElement = document.getElementById("main-header");
        console.log("Header loaded:", headerElement);
        // 여기에 header 관련 JS 로직 추가
    });

    // footer 불러오기
    fetch("includes/footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });
});

const header = () => {
    console.log(document.querySelector('nav'))
}
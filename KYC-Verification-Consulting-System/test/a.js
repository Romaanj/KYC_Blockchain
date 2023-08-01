

    const dropdown = document.querySelector(".dropdown");
    const dropbtn = document.querySelector(".dropbtn");
    const dropdownContent = document.querySelector(".dropdown-content");
    const selectedProject = document.getElementById("selectedProject");

    // 드롭다운 버튼을 클릭하면 드롭다운 메뉴를 보이도록 합니다.
    dropbtn.addEventListener("click", function () {
        dropdown.classList.toggle("show");
    });

    // 드롭다운 메뉴의 옵션을 클릭하면 선택한 프로젝트를 표시하고 드롭다운 메뉴를 닫습니다.
    dropdownContent.addEventListener("click", function (event) {
        event.preventDefault(); // 링크 클릭 시 페이지 이동을 방지합니다.
        const selectedOption = event.target.closest("a");
        if (selectedOption) {
            const selectedValue = selectedOption.getAttribute("data-value");
            const selectedText = selectedOption.textContent;
            selectedProject.innerHTML = `Selected Project: ${selectedText}`;
            dropdown.classList.remove("show");
        }
    });

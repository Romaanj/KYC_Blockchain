const project = document.getElementById('selectedProject');
project.innerHTML = project.innerHTML + "- " + localStorage.getItem("project");

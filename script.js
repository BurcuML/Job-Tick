const langToggle = document.getElementById('langToggle');
const addButton = document.getElementById('addButton');
const jobContainer = document.getElementById('jobContainer');
const jobModal = document.getElementById('jobModal');
const modalContent = document.querySelector('.modal-content');
const closeModal = document.getElementById('closeModal');
const colorInput = document.getElementById('colorInput').value;



// Close Modal
closeModal.addEventListener('click', () => {
    jobModal.style.display = 'none';
});

// Open Modal
addButton.addEventListener('click', () => {
    jobModal.style.display = 'block';
});

if(langToggle){
  langToggle.addEventListener('click', () => {
    const currentPage = window.location.pathname.split('/').pop();
    if(currentPage === 'index.html') {
        window.location.href = 'en_index.html';
    } else {
        window.location.href = 'index.html';
    }
});  
}

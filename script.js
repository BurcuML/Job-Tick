const langToggle = document.getElementById('langToggle');
const addButton = document.getElementById('addButton');
const jobContainer = document.getElementById('jobContainer');
const jobModal = document.getElementById('jobModal');
const modalContent = document.querySelector('.modal-content');
const closeModal = document.getElementById('closeModal');
const colorInput = document.getElementById('colorInput').value;
const companyInput = document.getElementById('companyInput');
const dateInput = document.getElementById('dateInput');
const nextStepInput = document.getElementById('nextStepInput');
const statusInput = document.getElementById('statusInput');
const noteInput = document.getElementById('noteInput');
const mostWaitedInput = document.getElementById('mostWaitedInput');
const addBtn = document.getElementById('addBtn');


// Close Modal
closeModal.addEventListener('click', () => {
    jobModal.style.display = 'none';

});

// Open Modal
addBtn.addEventListener('click', () => {
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

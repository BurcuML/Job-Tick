const currentPage = window.location.pathname.split('/').pop();
let isEditing = false;
let editingId = null;



document.addEventListener('DOMContentLoaded', () =>{
const langToggle = document.getElementById('langToggle');
const jobContainer = document.getElementById('jobContainer');
const jobModal = document.getElementById('jobModal');
const modalContent = document.querySelector('.modal-content');
const closeModal = document.getElementById('closeModal');
const saveBtn = document.getElementById('saveBtn');
const colorInput = document.getElementById('colorInput');
const companyInput = document.getElementById('companyInput');
const dateInput = document.getElementById('dateInput');
const nextStepInput = document.getElementById('nextStepInput');
const statusInput = document.getElementById('statusInput');
const noteInput = document.getElementById('noteInput');
const mostWaitedInput = document.getElementById('mostWaitedInput');
const addBtn = document.getElementById('addBtn');


// Open Modal
addBtn.addEventListener('click', () => {
    jobModal.style.display = 'block';
});


// Close Modal
closeModal.addEventListener('click', () => {
    jobModal.style.display = 'none';
    /*  companyInput.value = '';
        dateInput.value = '';
        nextStepInput.value = '';
        statusInput.value = 'Bekleniyor';
        noteInput.value = ''; */
});


// Save Job Application
saveBtn.addEventListener('click', () => {

    let company = companyInput.value;
    let date = dateInput.value;
    let nextStep = nextStepInput.value;
    let status = statusInput.value;
    let note = noteInput.value;
    let selectedColor = colorInput.value;
    let mostWaited = mostWaitedInput.checked;

    if (company.trim() === '' || date.trim() === '') {
        alert('Lütfen şirket adı ve başvuru tarihini giriniz.');
        return;
    }

    jobModal.style.display = 'none';

});

if (langToggle) {
    langToggle.addEventListener('click', () => {
        if (currentPage === 'index.html') {
            window.location.href = 'en_index.html';
        } else {
            window.location.href = 'index.html';
        }
    });
}


loadJobApplications()

});


// Close modal when clicking outside of it
window.onclick = function (event) {
    if (event.target == jobModal) {
        jobModal.style.display = "none";
    }
}


function addJobApplication(company, date, nextStep, status, note, selectedColor, mostWaitedInput, id) {

    const jobCard = document.createElement('div');
    jobCard.className = 'card ' + selectedColor;

    jobCard.innerHTML = `
            <i class="fas fa-edit edit-btn" title="Notu Düzenle" id="editNote" data-id="${id}"></i>
            <i class="fas fa-trash-alt delete-btn" title="Notu Sil" id="deleteNote" data-id="${id}"></i>
            <i class="fas fa-thumbtack pin"></i>
            <div class="card-header">
            <h2 class="company-name">${company}</h2>
            <span class="date"><i class="far fa-calendar-alt">${date}</i></span>
            </div>

            <div class="info-row">
            <span class="label">Durum?</span>
            <span class="value status-badge" style="color: red;">${status}</span>
            </div>

            <div class="info-row">
            <span class="label">Sonraki Adım:</span>
            <span class="value">${nextStep}</span>
            </div>

            <div class="info-row">
            <span class="label">Notlar:</span>
            <span class="value">${note}</span>
            </div>

${mostWaitedInput.checked
    ? `<div class="sticker">🔥 Most Waited</div>`
    : ""}

            `;


    jobContainer.appendChild(jobCard);
    jobContainer.appendChild(addBtn); // after adding new card, move add button to the end (appendchild does that)

}

function editModal(id) {

}


function getJobApplications() {

}


function saveJobApplications(id, company, date, nextStep, status, note, selectedColor, mostWaited) {

}


// Load saved job applications from localStorage on page load
function loadJobApplications() {

}


function clearJobApplications(id) {

}




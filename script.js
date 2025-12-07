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


// Close Modal
closeModal.addEventListener('click', () => {
    jobModal.style.display = 'none';
    /*  companyInput.value = '';
        dateInput.value = '';
        nextStepInput.value = '';
        statusInput.value = 'Bekleniyor';
        noteInput.value = ''; */
});

// Open Modal
addBtn.addEventListener('click', () => {
    jobModal.style.display = 'block';
});


if (langToggle) {
    langToggle.addEventListener('click', () => {
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage === 'index.html') {
            window.location.href = 'en_index.html';
        } else {
            window.location.href = 'index.html';
        }
    });
}

// Save Job Application
saveBtn.addEventListener('click', () => {

    let company = companyInput.value;
    let date = dateInput.value;
    let nextStep = nextStepInput.value;
    let status = statusInput.value;
    let note = noteInput.value;
    let selectedColor = colorInput.value;

    
    addJobApplication(company, date, nextStep, status, note, selectedColor, mostWaitedInput);
    
    jobModal.style.display = 'none';

});


function addJobApplication(company, date, nextStep, status, note, selectedColor, mostWaitedInput) {

    if (company.trim() === '' || date.trim() === '') {
        alert('Lütfen şirket adı ve başvuru tarihini giriniz.');
        return;
    }

    const jobCard = document.createElement('div');
    jobCard.className = 'card ' + selectedColor;

    jobCard.innerHTML = `
            <i class="fas fa-edit edit-btn" title="Notu Düzenle"></i>
            <i class="fas fa-trash-alt delete-btn" title="Notu Sil"></i>
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
            ? (currentPage === 'index.html' ?
                `<div class="sticker">🔥 En Çok Beklenen</div>` :
                `<div class="sticker">🔥 Most Waited</div>`) :
            ""}`;

    jobContainer.appendChild(jobCard);
    jobContainer.appendChild(addBtn); // after adding new card, move add button to the end (appendchild does that)
}

// Load saved job applications from localStorage on page load
function loadJobApplications() {
    const savedJobs = JSON.parse(localStorage.getItem('jobApplications')) || [];
    savedJobs.forEach(job => {
        addJobApplication(job.company, job.date, job.nextStep, job.status, job.note, job.selectedColor, { checked: job.mostWaited });
    });
}


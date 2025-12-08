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

document.addEventListener('DOMContentLoaded', loadJobApplications);

const currentPage = window.location.pathname.split('/').pop();
let isEditing = false;
let editingId = null;

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

    const job = {
        id: isEditing ? editingId : generateId(),
        company,
        date,
        nextStep,
        status,
        note,
        selectedColor,
        mostWaited
    };

    saveJobApplications(job);
    renderJobs();

    isEditing = false;
    editingId = null;

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




// Close modal when clicking outside of it
window.onclick = function (event) {
    if (event.target == jobModal) {
        jobModal.style.display = "none";
    }
}


function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}


function addJobApplication(job) {

    const jobCard = document.createElement('div');
    jobCard.className = 'card ' + job.selectedColor;

    jobCard.innerHTML = `
            <i class="fas fa-edit edit-btn" title="Notu Düzenle" data-id="${job.id}"></i>
            <i class="fas fa-trash-alt delete-btn" title="Notu Sil" data-id="${job.id}"></i>
            <i class="fas fa-thumbtack pin"></i>
            <div class="card-header">
            <h2 class="company-name">${job.company}</h2>
            <span class="date"><i class="far fa-calendar-alt" style="margin-right: 5px;"></i>${job.date}</span>
            </div>

            <div class="info-row">
            <span class="label">Durum?</span>
            <span class="value status-badge" style="color: red;">${job.status}</span>
            </div>

            <div class="info-row">
            <span class="label">Sonraki Adım:</span>
            <span class="value">${job.nextStep}</span>
            </div>

            <div class="info-row">
            <span class="label">Notlar:</span>
            <span class="value">${job.note}</span>
            </div>

            ${job.mostWaited
            ? `<div class="most-waited">🔥 Most Waited</div>`
            : ""} 
`;



    //delete button
    jobCard.querySelector(".delete-btn").addEventListener('click', () => {
        clearJobApplications(job.id);
        renderJobs();
    })

    //edit button
    jobCard.querySelector(".edit-btn").addEventListener('click', () => {
        editModal(job)
    });


    return jobCard;

}


/* 
Bu fonksiyon ne yapıyor? (renderJobs)

-Önce board'u sıfırlıyor

-LocalStorage’daki job listesini çekiyor

-Her job için bir kart DOM’a ekliyor

-En son + butonunu koyuyor
*/
function renderJobs() {
    jobContainer.innerHTML = "";

    const jobs = getJobApplications();

    jobs.forEach(job => {
        const jobCard = addJobApplication(job);
        jobContainer.appendChild(jobCard);
    });

    // Add Btn her zaman en sonda durmalı
    jobContainer.appendChild(addBtn);
}

function editModal(job) {
    isEditing = true;
    editingId = job.id;

    companyInput.value = job.company;
    dateInput.value = job.date;
    nextStepInput.value = job.nextStep;
    statusInput.value = job.status;
    noteInput.value = job.note;
    colorInput.value = job.selectedColor;
    mostWaitedInput.checked = job.mostWaited;

    jobModal.style.display = "block";

}



//LOCALSTORAGE

function getJobApplications() {
    const jobs = localStorage.getItem('jobApplications');
    return jobs ? JSON.parse(jobs) : [];
}


function saveJobApplications(job) {
    const saveJobs = getJobApplications();
    const index = saveJobs.findIndex(j => j.id === job.id)

    if (index !== -1) {
        saveJobs[index] = job; //düzenle
    } else {
        saveJobs.push(job); //ekle
    }
    localStorage.setItem('jobApplications', JSON.stringify(saveJobs));
}


function clearJobApplications(id) {
    const jobs = getJobApplications();
    const deleted = jobs.filter(job => job.id !== id);
    localStorage.setItem('jobApplications', JSON.stringify(deleted));
}


function loadJobApplications() {
    renderJobs();
}

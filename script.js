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

let currentPage = window.location.pathname.split('/').pop();
let isEditing = false; 
let jobToEditId = null; // Düzenlenecek kartın ID'si

document.addEventListener('DOMContentLoaded', loadJobApplications);

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


jobContainer.addEventListener('click', (e) => {
    const clickedCard = e.target.closest('.card');
    if (!clickedCard) return; 

    // ID'yi yakala (Data-ID'yi kartın içinden okuyoruz)
    const jobId = clickedCard.querySelector('.edit-btn').dataset.id; 

    if (e.target.classList.contains('delete-btn')) {
        if (confirm('Bu başvuruyu silmek istediğinize emin misiniz?')) {
            deleteJob(jobId); 
            clickedCard.remove(); 
            // loadJobApplications(); da çağırılabilir
        }
    } else if (e.target.classList.contains('edit-btn')) {
        editModal(jobId);
    }
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

   
    saveJobApplications(company, date, nextStep, status, note, selectedColor, mostWaited);
    loadJobApplications()

    jobModal.style.display = 'none';

});


/* function updateJobApplication(jobId, company, date, nextStep, status, note, selectedColor, mostWaitedInput) {
    const jobs = getJobApplications();
    const idToEdit = jobs.findIndex(job => job.id === jobId);
    if (idToEdit !== -1) {
        jobs[index] = {
            id: jobId,
            company,
            date,
            nextStep,
            status,
            note,
            selectedColor,
            mostWaitedInput
        }
    }
} */

function addJobApplication(job) {

    if (company.trim() === '' || date.trim() === '') {
        alert('Lütfen şirket adı ve başvuru tarihini giriniz.');
        return;
    }

    const newId = Date.now(); // Unique ID based on timestamp

    const jobCard = document.createElement('div');
    jobCard.className = 'card ' + selectedColor;

    jobCard.innerHTML = `
            <i class="fas fa-edit edit-btn" title="Notu Düzenle" id="editNote" data-id="${newId}"></i>
            <i class="fas fa-trash-alt delete-btn" title="Notu Sil" id="deleteNote"></i>
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



function editModal(id) {
    const jobs = getJobApplications();
    const jobToEdit = jobs.find(job => job.id == parseInt(id));

    if (jobToEdit) {
        // Populate modal fields with existing data
        companyInput.value = jobToEdit.company;
        dateInput.value = jobToEdit.date;
        nextStepInput.value = jobToEdit.nextStep;
        statusInput.value = jobToEdit.status;
        noteInput.value = jobToEdit.note;
        colorInput.value = jobToEdit.selectedColor;
        mostWaitedInput.checked = jobToEdit.mostWaited;

        isEditing = true;

    }
    jobModal.style.display = 'block';
}

function saveOrUpdateJob(id, company, date, nextStep, status, note, selectedColor, mostWaited) {
    const jobs = getJobApplications();
    const jobData = { id: parseInt(id), company, date, nextStep, status, note, selectedColor, mostWaited };

    if (id) {
        // Güncelleme işlemi
        const index = jobs.findIndex(job => job.id === parseInt(id));
        if (index !== -1) {
            jobs[index] = jobData;
        }
    } else {
        // Yeni ekleme işlemi (ID'yi burada oluştur)
        jobData.id = Date.now();
        jobs.push(jobData);
    }

    localStorage.setItem('jobApplications', JSON.stringify(jobs));
    return jobData.id; // Oluşturulan/Kullanılan ID'yi döndür
}

//Silme fonksiyonu ID'yi sayıya çevirerek filtreler.
function deleteJob(jobId) {
    const jobs = getJobApplications();
    const idNum = parseInt(jobId); // String ID'yi sayıya çevir
    // Sadece ID'si EŞİT OLMAYANLARI tut (silinmek istenenin dışındakileri)
    const filteredJobs = jobs.filter(job => job.id !== idNum); 
    localStorage.setItem('jobApplications', JSON.stringify(filteredJobs));
}

function getJobApplications() {
    const jobs = localStorage.getItem('jobApplications');
    return jobs ? JSON.parse(jobs) : [];
}


function saveJobApplications(company, date, nextStep, status, note, selectedColor, mostWaited) {
    const jobs = getJobApplications();
    jobs.push({ 
        company, 
        date, 
        nextStep, 
        status, 
        note, 
        selectedColor, 
        mostWaited 
    });
    
    localStorage.setItem('jobApplications', JSON.stringify(jobs));
}


// Load saved job applications from localStorage on page load
function loadJobApplications() {
   // jobContainer.innerHTML = '';
    const savedJobs = getJobApplications();
    savedJobs.forEach(job => {
        addJobApplication(job.company, job.date, job.nextStep, job.status, job.note, job.selectedColor, { checked: job.mostWaited });
    });

    //jobContainer.appendChild(addBtn)
}


function clearJobApplications(jobId) {
    const jobs = getJobApplications();
    const filteredJobs = jobs.filter(job => job.id === jobId)
    localStorage.setItem('jobApplications', JSON.stringify(filteredJobs));
}





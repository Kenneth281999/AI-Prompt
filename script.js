// ========== MOBILE MENU ==========
document.getElementById('mobileToggle').addEventListener('click', () => {
    const nav = document.querySelector('.nav-links');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '100%';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.background = 'var(--dark)';
    nav.style.padding = '1.5rem';
    nav.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
});

// ========== GENERATOR TABS ==========
const genTabs = document.querySelectorAll('.gen-tab');
genTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        genTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        document.querySelectorAll('.gen-content').forEach(c => c.classList.remove('active'));
        document.getElementById(`${tab.dataset.gen}Tab`).classList.add('active');
    });
});

// ========== FILE UPLOAD ==========
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
if (uploadArea && fileInput) {
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary)';
        uploadArea.style.background = 'rgba(99,102,241,0.1)';
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '';
        uploadArea.style.background = '';
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '';
        uploadArea.style.background = '';
        const file = e.dataTransfer.files[0];
        if (file) alert(`File selected: ${file.name}`);
    });
}

// ========== VIDEO GENERATION SIMULATION ==========
const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('promptInput');
const previewScreen = document.getElementById('previewScreen');
const genSteps = document.getElementById('genSteps');
const resultBox = document.getElementById('resultBox');

if (generateBtn) {
    generateBtn.addEventListener('click', async () => {
        if (!promptInput.value.trim()) {
            alert('Please describe your video idea first!');
            return;
        }

        // Reset UI
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> GENERATING...';
        previewScreen.innerHTML = '<i class="fas fa-cog fa-spin preview-icon"></i><p>AI is working on your video...</p>';
        genSteps.style.display = 'flex';
        resultBox.style.display = 'none';

        // Step-by-step animation
        const steps = genSteps.querySelectorAll('.step-item');
        for (let i = 0; i < steps.length; i++) {
            steps[i].classList.add('active');
            await new Promise(r => setTimeout(r, 1200));
        }

        // Complete
        genSteps.style.display = 'none';
        previewScreen.innerHTML = '<i class="fas fa-check-circle" style="font-size:3rem; color:var(--success)"></i><p>Video ready!</p>';
        resultBox.style.display = 'block';
        
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> GENERATE NEW VIDEO';
        
        alert('✅ Demo complete! Connect Replicate API key in app.py for real video generation.');
    });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ========== TEMPLATE BUTTONS ==========
document.querySelectorAll('.template-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
        promptInput.value = '[Selected Template] — Edit your prompt below...';
    });
});
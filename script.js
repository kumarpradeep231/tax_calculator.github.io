// JavaScript code
const form = document.getElementById('tax-form');
const grossIncomeInput = document.getElementById('gross-income');
const extraIncomeInput = document.getElementById('extra-income');
const ageGroupSelect = document.getElementById('age-group');
const deductionsInput = document.getElementById('deductions');
const errorIcons = document.querySelectorAll('.error-icon');
const modal = document.getElementById('modal');
const resultText = document.getElementById('result');
const closeBtn = document.querySelector('.btn-close');
const darkModeToggle = document.getElementById('dark-mode-toggle');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
    calculateTax();
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'; // Close the modal when close button is clicked
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none'; // Close the modal when clicking outside it
    }
});

function calculateTax() {
    const grossIncome = parseFloat(grossIncomeInput.value) || 0;
    const extraIncome = parseFloat(extraIncomeInput.value) || 0;
    const deductions = parseFloat(deductionsInput.value) || 0;
    const ageGroup = ageGroupSelect.value;

    // Validation for empty fields
    if (!grossIncome || !ageGroup) {
        showErrorIcons();
        return;
    }

    const totalIncome = grossIncome + extraIncome - deductions;
    let taxableIncome = 0;
    let taxRate = 0;

    if (totalIncome > 800000) {
        taxableIncome = totalIncome - 800000;

        if (ageGroup === 'lt40') {
            taxRate = 0.3;
        } else if (ageGroup === 'gte40lt60') {
            taxRate = 0.4;
        } else {
            taxRate = 0.1;
        }
    }

    const tax = taxableIncome * taxRate;
    const overallIncome = totalIncome - tax;

    resultText.textContent = `Your overall income will be ${overallIncome.toFixed(2)} after tax deductions`;
    modal.style.display = 'block';
    hideErrorIcons();
}

function showErrorIcons() {
    errorIcons.forEach((icon) => {
        const input = icon.previousElementSibling;
        if (isNaN(parseFloat(input.value))) {
            showErrorIcon(icon);
        }
    });
}

function showErrorIcon(icon) {
    icon.style.display = 'inline-block';
}

function hideErrorIcons() {
    errorIcons.forEach((icon) => {
        icon.style.display = 'none';
    });
}

darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});

function processWithdrawal() {
    const holder = document.getElementById('holderName').value.trim();
    const balanceStr = document.getElementById('balance').value.trim();
    const withdrawStr = document.getElementById('withdrawAmount').value.trim();
    
    const receipt = document.getElementById('receipt');
    const receiptContent = document.getElementById('receiptContent');
    const errorMsg = document.getElementById('errorMsg');

    // Reset
    receipt.classList.add('hidden');
    errorMsg.classList.add('hidden');

    if (!holder) {
        showError("Please enter Account Holder Name");
        return;
    }

    // Exception handling like Java - NumberFormatException
    const balance = parseFloat(balanceStr);
    const withdraw = parseFloat(withdrawStr);

    if (isNaN(balance) || isNaN(withdraw)) {
        showError("Enter numeric value for the withdrawal amount.");
        return;
    }

    let html = "";

    if (withdraw <= 0) {
        html = `
            Account Holder: ${holder} <br>
            Withdrawal: ₹${withdraw} <br>
            Status: <span class="failed">FAILED Reason: Invalid Withdrawal Amount</span><br><br>
            Invalid withdrawal amount
        `;
    } else if (withdraw > balance) {
        html = `
            Account Holder: ${holder} <br>
            Withdrawal: ₹${withdraw} <br>
            Status: <span class="failed">FAILED Reason: Insufficient Balance</span><br><br>
            Insufficient Balance
        `;
    } else {
        const remaining = balance - withdraw;
        html = `
            Account Holder: ${holder} <br>
            Withdrawal: ₹${withdraw} <br>
            Status: <span class="success">SUCCESS</span> Remaining Bal: ₹${remaining}<br><br>
            Remaining Balance: ₹${remaining}
        `;
    }

    receiptContent.innerHTML = html;
    receipt.classList.remove('hidden');
}

function showError(msg) {
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.innerText = msg;
    errorMsg.classList.remove('hidden');
}

function resetForm() {
    document.getElementById('holderName').value = "";
    document.getElementById('balance').value = "";
    document.getElementById('withdrawAmount').value = "";
    document.getElementById('receipt').classList.add('hidden');
    document.getElementById('errorMsg').classList.add('hidden');
}

document.getElementById("fileInput").addEventListener("change", handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        displayDataset(workbook);
    };
    reader.readAsBinaryString(file);
}

function displayDataset(workbook) {
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const tableHeaders = Object.keys(rows[0]);
    const thead = document.getElementById("tableHeaders");
    const tbody = document.getElementById("tableBody");

    thead.innerHTML = "";
    tbody.innerHTML = "";

    
    const headerRow = document.createElement("tr");
    tableHeaders.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    rows.forEach(row => {
        const tr = document.createElement("tr");
        tableHeaders.forEach(header => {
            const td = document.createElement("td");
            td.textContent = row[header];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

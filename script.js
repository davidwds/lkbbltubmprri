const webAppUrl = "YOUR_APPS_SCRIPT_WEB_APP_URL"; // ganti dengan URL Web App

function displayResult(data) {
  const table = document.getElementById("resultTable");
  const tbody = document.getElementById("resultBody");
  tbody.innerHTML = ""; // kosongkan sebelumnya

  if (data.error) {
    document.getElementById("message").textContent = data.error;
    table.style.display = "none";
    return;
  }

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${data.UUID}</td>
    <td>${data.Email}</td>
    <td>${data.NamaLengkap}</td>
    <td>${data.NomorIdentitas}</td>
    <td>${data.TipeIdentitas}</td>
    <td>${data.NomorHP}</td>
    <td>${data.Alamat}</td>
    <td>${data.AsalInstitusi}</td>
    <td>${data.PendukungProvinsi}</td>
    <td>${data.PendukungSekolah}</td>
    <td><a href="${data.BuktiFotoIdentitas}" target="_blank">View</a></td>
    <td><a href="${data.UploadFotoDiri}" target="_blank">View</a></td>
  `;
  tbody.appendChild(row);
  table.style.display = "table";
  document.getElementById("message").textContent = "";
}

// Start QR scanner
function onScanSuccess(decodedText, decodedResult) {
  // Stop scanning setelah scan berhasil
  html5QrcodeScanner.clear();
  // Ambil data dari Apps Script
  fetch(`${webAppUrl}?uuid=${decodedText}`)
    .then(res => res.json())
    .then(data => displayResult(data))
    .catch(err => {
      document.getElementById("message").textContent = "Gagal mengambil data";
      console.error(err);
    });
}

const html5QrcodeScanner = new Html5Qrcode("reader");
html5QrcodeScanner.start(
  { facingMode: "environment" },
  { fps: 10, qrbox: 250 },
  onScanSuccess
);

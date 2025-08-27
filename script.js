const webAppUrl = "https://script.google.com/macros/s/AKfycbyDc9A2i5c0FF2gLduFsmmlGQ9SOEEkFM4TSWFQEdPnnA9xo3dhV4LaYLZ3JlmY7ih3/exec"; // ganti dengan URL Web App
let html5QrcodeScanner;

function displayResult(data) {
  const table = document.getElementById("resultTable");
  const tbody = document.getElementById("resultBody");
  tbody.innerHTML = ""; 

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

function onScanSuccess(decodedText, decodedResult) {
  html5QrcodeScanner.clear();
  fetch(`${webAppUrl}?uuid=${decodedText}`)
    .then(res => res.json())
    .then(data => displayResult(data))
    .catch(err => {
      document.getElementById("message").textContent = "Gagal mengambil data";
      console.error(err);
    });
}

// Tombol untuk buka kamera
document.getElementById("startCameraBtn").addEventListener("click", () => {
  html5QrcodeScanner = new Html5Qrcode("reader");
  html5QrcodeScanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    onScanSuccess
  );
});

function formatTime(ms) {
  // Konversi timestamp ke detik
  let detik = Math.floor(ms / 1000);
  const satuan = "s";

  // Tentukan satuan waktu
  if (ms < 1000) {
    console.log("Time Passed: " + `${ms} ms`);
    return;
  }
  if (detik >= 60) {
    satuan = "m";
    detik = Math.floor(detik / 60);
  }
  if (detik >= 3600) {
    satuan = "h";
    detik = Math.floor(detik / 3600);
  }
  if (detik >= 86400) {
    satuan = "d";
    detik = Math.floor(detik / 86400);
  }

  // Format waktu
  console.log("Time Passed: " + `${detik} ${satuan}`);
}

module.exports = formatTime;

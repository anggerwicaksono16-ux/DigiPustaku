/**
 * DIGI-PUSTAKA — script.js
 * Video: Google Drive embed (iframe)
 * Kuis OTOMATIS terbuka setelah video selesai
 * (Dengan fallback tombol manual karena keterbatasan iframe cross-origin)
 */

/* ================================================
   DATA KUIS — 5 soal unik per modul
   ================================================ */
   const quizData = {
    1: [
      { q: "Manakah elemen kunci dalam strategi perpustakaan khusus?", opts: ["Penyusunan visi & misi yang jelas", "Pengadaan buku sebanyak mungkin", "Pembatasan akses pengguna", "Pengurangan anggaran operasional"], correct: 0 },
      { q: "Apa yang dimaksud dengan perpustakaan khusus?", opts: ["Perpustakaan umum untuk semua kalangan", "Perpustakaan yang melayani kebutuhan informasi organisasi tertentu", "Perpustakaan sekolah dasar", "Perpustakaan yang hanya menyimpan novel"], correct: 1 },
      { q: "Dalam menyusun visi perpustakaan khusus, hal utama yang dipertimbangkan adalah?", opts: ["Selera pribadi pustakawan", "Kebutuhan informasi pengguna dan tujuan organisasi induk", "Jumlah koleksi yang dimiliki", "Luas gedung perpustakaan"], correct: 1 },
      { q: "Indikator keberhasilan strategi perpustakaan khusus diukur dari?", opts: ["Jumlah buku yang dibeli", "Tingkat kepuasan dan pemanfaatan layanan oleh pengguna", "Jumlah pustakawan yang bekerja", "Ukuran ruangan perpustakaan"], correct: 1 },
      { q: "Perencanaan strategis perpustakaan khusus sebaiknya dilakukan?", opts: ["Sekali seumur hidup", "Setiap hari", "Secara berkala dan menyesuaikan kebutuhan organisasi", "Hanya saat ada anggaran besar"], correct: 2 }
    ],
    2: [
      { q: "Apa langkah pertama dalam pengelolaan koleksi perpustakaan khusus?", opts: ["Pelestarian koleksi", "Katalogisasi", "Pengembanan koleksi", "Penyiangan"], correct: 2 },
      { q: "Apa tujuan klasifikasi menggunakan DDC?", opts: ["Mengelompokkan buku berdasarkan subjek", "Memberi nomor infentaris", "Membersihkan koleksi dari debu", "Mencatat peminjaman buku"], correct: 0 },
      { q: "Saat cacah ulang ditemukan dua buku tidak ada di rak tindakan pertama yang tepat adalah?", opts: ["Mengganti dengan buku baru", "Mencocokkan kembali dengan data peminjaman dan lokasi penyimpanan", "Melakukan penyiangan", "Langsun menghapus dari inventaris"], correct: 1 },
      { q: "Koleksi digital perpustakaan sebaiknya dikelola menggunakan?", opts: ["Buku catatan manual", "Sistem katalog online", "Lembar spreadsheet tanpa backup", "Flashdisk pribadi pustakawan"], correct: 1 },
      { q: "Mengapa pelestarian koleksi dilakukan secara berkala?", opts: ["Agar rak terlihat penuh", "Agar proses katalogisasi lebih cepat", "Agar jumlah buku berkuran", "Agar koleksi tetap awet dan dapat dimanfaatkan lebih lama"], correct: 3 }
    ],
    3: [
      { q: "Fasilitas utama yang wajib dimiliki perpustakaan khusus modern adalah?", opts: ["Kolam renang", "Ruang baca nyaman, akses internet, dan sistem katalog digital", "Kafetaria mewah", "Studio rekaman"], correct: 1 },
      { q: "Teknologi RFID digunakan di perpustakaan untuk?", opts: ["Memutar musik", "Otomasi peminjaman, pengembalian, dan keamanan koleksi", "Mencetak buku baru", "Mengatur suhu ruangan"], correct: 1 },
      { q: "Self-service kiosk di perpustakaan berfungsi untuk?", opts: ["Menjual makanan ringan", "Memungkinkan pengguna meminjam dan mengembalikan koleksi secara mandiri", "Mencetak foto", "Membuat kartu identitas"], correct: 1 },
      { q: "Standar pencahayaan ruang baca perpustakaan yang direkomendasikan adalah?", opts: ["Sangat gelap agar tenang", "Cahaya terang merata sekitar 300–500 lux", "Hanya cahaya lilin", "Lampu warna-warni"], correct: 1 },
      { q: "Infrastruktur jaringan yang mendukung perpustakaan digital meliputi?", opts: ["Hanya telepon kabel", "Koneksi internet cepat, Wi-Fi, dan server lokal yang handal", "Antena radio", "Mesin fax generasi lama"], correct: 1 }
    ],
    4: [
      { q: "Sistem Otomasi Perpustakaan yang populer di Indonesia adalah?", opts: ["Microsoft Word", "SLiMS (Senayan Library Management System)", "Adobe Photoshop", "Google Maps"], correct: 1 },
      { q: "OPAC dalam sistem perpustakaan merupakan singkatan dari?", opts: ["Online Public Access Catalog", "Open Program Application Center", "Official Publication Access Code", "Online Print Automation Control"], correct: 0 },
      { q: "Integrasi sistem perpustakaan dengan sistem informasi organisasi bertujuan untuk?", opts: ["Mempersulit akses pengguna", "Memudahkan berbagi data dan efisiensi layanan informasi", "Mengurangi koleksi digital", "Membatasi jam operasional"], correct: 1 },
      { q: "Backup data sistem perpustakaan sebaiknya dilakukan?", opts: ["Tidak perlu dilakukan", "Secara berkala dan disimpan di lokasi berbeda (termasuk cloud)", "Hanya saat sistem rusak", "Setahun sekali saja"], correct: 1 },
      { q: "Manfaat automasi pengelolaan sirkulasi perpustakaan adalah?", opts: ["Memperlambat proses peminjaman", "Mempercepat transaksi, mengurangi kesalahan, dan menghasilkan laporan otomatis", "Menghilangkan peran pustakawan", "Mempermahal biaya operasional"], correct: 1 }
    ],
    5: [
      { q: "Layanan referensi di perpustakaan khusus berfungsi untuk?", opts: ["Menjual buku kepada pengguna", "Membantu pengguna menemukan informasi yang tepat dan relevan", "Mengatur jadwal rapat", "Membersihkan koleksi"], correct: 1 },
      { q: "Cara terbaik mengukur kepuasan pengguna perpustakaan adalah?", opts: ["Mengamati penampilan pengguna", "Survei kepuasan, wawancara, dan analisis statistik penggunaan layanan", "Menghitung jumlah buku yang dipinjam saja", "Melihat jumlah pengunjung tanpa analisis"], correct: 1 },
      { q: "Literasi informasi yang diajarkan pustakawan kepada pengguna mencakup?", opts: ["Cara memasak", "Cara menemukan, mengevaluasi, dan menggunakan informasi secara efektif", "Cara mendesain grafis", "Cara berolahraga"], correct: 1 },
      { q: "Layanan berbasis kebutuhan pengguna (user-centered service) mengutamakan?", opts: ["Kenyamanan pustakawan semata", "Kebutuhan, preferensi, dan pengalaman pengguna dalam setiap layanan", "Penghematan anggaran saja", "Jumlah koleksi buku terbanyak"], correct: 1 },
      { q: "Komunikasi efektif antara pustakawan dan pengguna ditingkatkan melalui?", opts: ["Mengabaikan pertanyaan pengguna", "Pelatihan komunikasi, empati, dan responsivitas terhadap kebutuhan pengguna", "Membatasi jam layanan", "Mengurangi jumlah staf layanan"], correct: 1 }
    ],
    6: [
      { q: "Kompetensi utama yang harus dimiliki pustakawan khusus adalah?", opts: ["Kemampuan memasak", "Penguasaan ilmu perpustakaan, teknologi informasi, dan komunikasi", "Kemampuan menyanyi", "Keahlian bela diri"], correct: 1 },
      { q: "Sertifikasi pustakawan di Indonesia dikeluarkan oleh?", opts: ["Kementerian Perdagangan", "Perpustakaan Nasional RI melalui uji kompetensi resmi", "Dinas Pariwisata", "Kementerian Pertanian"], correct: 1 },
      { q: "Pengembangan profesional berkelanjutan (CPD) bagi pustakawan bertujuan untuk?", opts: ["Menambah jumlah cuti tahunan", "Memperbarui pengetahuan dan keterampilan sesuai perkembangan zaman", "Mengurangi jam kerja", "Mendapatkan kenaikan gaji otomatis"], correct: 1 },
      { q: "Standar kompetensi pustakawan khusus mencakup kemampuan dalam bidang?", opts: ["Hanya pengelolaan fisik koleksi", "Pengelolaan informasi, teknologi, layanan pengguna, dan manajemen perpustakaan", "Hanya administrasi keuangan", "Hanya desain interior"], correct: 1 },
      { q: "Pelatihan relevan untuk meningkatkan kompetensi pustakawan di era digital adalah?", opts: ["Kursus merajut", "Pelatihan literasi digital, metadata, dan pengelolaan repositori institusi", "Kursus memasak internasional", "Pelatihan berkebun"], correct: 1 }
    ],
    7: [
      { q: "Struktur organisasi perpustakaan khusus yang ideal sebaiknya?", opts: ["Tidak perlu ada struktur formal", "Mencerminkan fungsi layanan, pengelolaan koleksi, dan pengembangan sumber daya", "Sama persis dengan struktur perusahaan manufaktur", "Hanya terdiri dari satu orang pustakawan"], correct: 1 },
      { q: "Kebijakan pengembangan koleksi perpustakaan khusus memuat?", opts: ["Resep masakan untuk staf", "Kriteria seleksi, anggaran, prioritas subjek, dan prosedur akuisisi", "Jadwal liburan staf", "Daftar harga makanan kantin"], correct: 1 },
      { q: "Dasar hukum penyelenggaraan perpustakaan di Indonesia adalah?", opts: ["Undang-Undang No. 43 Tahun 2007 tentang Perpustakaan", "Undang-Undang No. 1 Tahun 2000 tentang Perdagangan", "Peraturan Menteri Pertanian", "Keputusan Presiden tentang Olahraga"], correct: 0 },
      { q: "Laporan tahunan perpustakaan khusus berfungsi untuk?", opts: ["Hiasan dinding perpustakaan", "Evaluasi kinerja, pertanggungjawaban, dan bahan perencanaan tahun berikutnya", "Promosi produk perpustakaan", "Pengganti buku koleksi"], correct: 1 },
      { q: "Tata kelola perpustakaan khusus yang baik (good library governance) mencakup?", opts: ["Transparansi, akuntabilitas, efisiensi, dan partisipasi pemangku kepentingan", "Kerahasiaan anggaran dari semua pihak", "Keputusan sepihak tanpa koordinasi", "Pengelolaan tanpa dokumentasi"], correct: 0 }
    ]
  };
  
  /* ================================================
     INFO MODUL
     ================================================ */
  const moduleNames = [
    '', 'Strategi & Visi', 'Inventarisasi & Akurasi', 'Fasilitas & Teknologi',
    'Automasi & Sistem', 'Interaksi & Kepuasan', 'Kompetensi & Sertifikasi',
    'Struktur Organisasi & Kebijakan'
  ];
  
  /* ================================================
     PETA GOOGLE DRIVE ID PER MODUL
     Isi FILE_ID dari link Google Drive Anda:
     https://drive.google.com/file/d/FILE_ID/view
     ================================================ */
  const driveVideoIds = {
    1: '15p4ROw6LGiwkAYmv1dQldVRQA_QFs2ML',
    2: '1jEPJXRwqmgGtJjZfmg1_1ELB9UhL1bCt',
    // 3: 'GANTI_DENGAN_ID_DRIVE_MODUL_3',
    // 4: 'GANTI_DENGAN_ID_DRIVE_MODUL_4',
    // 5: 'GANTI_DENGAN_ID_DRIVE_MODUL_5',
    // 6: 'GANTI_DENGAN_ID_DRIVE_MODUL_6',
    // 7: 'GANTI_DENGAN_ID_DRIVE_MODUL_7',
  };
  
  /* ================================================
     STATE VIDEO
     ================================================ */
  const watchedVideos = new Set(); // id modul yang sudah selesai ditonton
  let currentVideoId  = null;
  let timerInterval   = null;
  let countdownSecs   = 0;
  
  /* ================================================
     FUNGSI UTAMA: playVideo(id)
     ================================================ */
  function playVideo(id) {
    currentVideoId = id;
  
    const overlay      = document.getElementById('videoOverlay');
    const titleEl      = document.getElementById('videoTitle');
    const statusEl     = document.getElementById('videoStatus');
    const bar          = document.getElementById('videoProgressBar');
    const btn          = document.getElementById('videoDoneBtn');
    const iframe       = document.getElementById('driveIframe');
    const placeholder  = document.getElementById('videoPlaceholder');
    const progWrap     = document.getElementById('videoProgressWrap');
    const timerInfo    = document.getElementById('videoTimerInfo');
    const manualWrap   = document.getElementById('manualDoneWrap');
    const manualBtn    = document.getElementById('btnManualDone');
    const driveInput   = document.getElementById('driveIdInput');
  
    overlay.dataset.cardId = id;
    titleEl.textContent    = 'Modul ' + id + ': ' + (moduleNames[id] || '');
    bar.style.width        = '0%';
  
    clearTimer();
  
    // Cek jika sudah ditonton sebelumnya
    if (watchedVideos.has(id)) {
      // Tampilkan iframe lagi (jika sudah punya ID)
      const savedId = driveVideoIds[id] || driveInput.dataset['mod' + id] || null;
      if (savedId) {
        showDriveIframe(savedId);
      }
      bar.style.width    = '100%';
      btn.disabled       = false;
      btn.textContent    = '✔ Buka Kuis';
      statusEl.textContent = '✅ Anda sudah menonton video ini.';
      manualWrap.style.display = 'none';
      timerInfo.style.display  = 'none';
      overlay.classList.add('open');
      return;
    }
  
    // Cek apakah sudah ada Drive ID di peta
    const driveId = driveVideoIds[id] || null;
  
    if (driveId) {
      // Langsung muat iframe
      showDriveIframe(driveId);
      progWrap.style.display   = 'block';
      timerInfo.style.display  = 'flex';
      statusEl.textContent     = '▶ Tonton video hingga selesai — kuis akan terbuka otomatis.';
      btn.disabled             = true;
      btn.textContent          = '⏳ Menonton...';
      manualBtn.style.display  = 'none';
      startWatchTimer(id);
    } else {
      // Tampilkan placeholder input Drive ID
      iframe.style.display         = 'none';
      placeholder.style.display    = 'flex';
      progWrap.style.display       = 'none';
      timerInfo.style.display      = 'none';
      btn.disabled                 = true;
      btn.textContent              = '⏳ Menonton...';
      statusEl.textContent         = '📂 Masukkan ID Google Drive untuk memulai video.';
      document.getElementById('videoPlaceholderLabel').textContent =
        'Masukkan ID Google Drive untuk Modul ' + id + ': ' + (moduleNames[id] || '');
      driveInput.value             = '';
      manualBtn.style.display      = 'none';
      manualWrap.style.display     = 'block';
    }
  
    overlay.classList.add('open');
  }
  
  /* ================================================
     MUAT VIDEO DARI INPUT DRIVE ID (manual input)
     ================================================ */
  function loadDriveVideo() {
    const input   = document.getElementById('driveIdInput');
    const rawVal  = input.value.trim();
    if (!rawVal) { showToast('⚠️ Masukkan ID Google Drive terlebih dahulu!'); return; }
  
    // Ekstrak ID dari URL penuh jika user paste link panjang
    let driveId = rawVal;
    const matchFull = rawVal.match(/\/d\/([a-zA-Z0-9_-]{25,})/);
    if (matchFull) driveId = matchFull[1];
    const matchId = rawVal.match(/id=([a-zA-Z0-9_-]{25,})/);
    if (matchId) driveId = matchId[1];
  
    // Simpan ID sementara
    input.dataset['mod' + currentVideoId] = driveId;
  
    const statusEl  = document.getElementById('videoStatus');
    const progWrap  = document.getElementById('videoProgressWrap');
    const timerInfo = document.getElementById('videoTimerInfo');
    const btn       = document.getElementById('videoDoneBtn');
    const manualBtn = document.getElementById('btnManualDone');
  
    showDriveIframe(driveId);
    progWrap.style.display  = 'block';
    timerInfo.style.display = 'flex';
    statusEl.textContent    = '▶ Tonton video hingga selesai — kuis akan terbuka otomatis.';
    btn.disabled            = true;
    btn.textContent         = '⏳ Menonton...';
  
    // Tampilkan tombol manual setelah 5 detik (fallback iframe cross-origin)
    setTimeout(function () {
      manualBtn.style.display  = 'inline-block';
      document.getElementById('manualDoneWrap').style.display = 'block';
    }, 5000);
  
    clearTimer();
    startWatchTimer(currentVideoId);
  }
  
  /* ================================================
     TAMPILKAN IFRAME GOOGLE DRIVE
     ================================================ */
  function showDriveIframe(driveId) {
    const iframe      = document.getElementById('driveIframe');
    const placeholder = document.getElementById('videoPlaceholder');
  
    // Gunakan format embed yang lebih kompatibel
    // Tambahkan parameter agar tidak diblokir
    const embedUrl = 'https://drive.google.com/file/d/' + driveId + '/preview?usp=sharing&embedded=true';
    iframe.src            = embedUrl;
    iframe.style.display  = 'block';
    placeholder.style.display = 'none';
  }
  
  /* ================================================
     TIMER SIMULASI PROGRESS
     (Karena iframe Google Drive tidak bisa dideteksi ended
      secara langsung akibat batasan cross-origin,
      kita pakai timer simulasi + tombol manual sebagai fallback)
     ================================================ */
  function startWatchTimer(id) {
    // Default estimasi durasi 4 menit 35 detik (275 detik) — sesuai badge
    countdownSecs = 300;
    updateTimerDisplay();
  
    const bar    = document.getElementById('videoProgressBar');
    const btn    = document.getElementById('videoDoneBtn');
    const status = document.getElementById('videoStatus');
  
    timerInterval = setInterval(function () {
      countdownSecs--;
  
      const elapsed  = 300 - countdownSecs;
      const pct      = Math.min((elapsed / 300) * 100, 100);
      bar.style.width = pct + '%';
  
      updateTimerDisplay();
  
      if (countdownSecs <= 0) {
        clearTimer();
        // Video dianggap selesai
        onVideoEnded(id);
      }
    }, 1000);
  }
  
  function updateTimerDisplay() {
    const el = document.getElementById('videoTimerDisplay');
    if (!el) return;
    const m = Math.floor(Math.abs(countdownSecs) / 60);
    const s = Math.abs(countdownSecs) % 60;
    el.textContent = (countdownSecs < 0 ? '+' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }
  
  function clearTimer() {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  }
  
  /* ================================================
     EVENT: VIDEO SELESAI (otomatis atau manual)
     ================================================ */
  function onVideoEnded(id) {
    const bar    = document.getElementById('videoProgressBar');
    const btn    = document.getElementById('videoDoneBtn');
    const status = document.getElementById('videoStatus');
    const manualBtn = document.getElementById('btnManualDone');
  
    watchedVideos.add(id);
    unlockQuizCard(id);
  
    bar.style.width    = '100%';
    btn.disabled       = false;
    btn.textContent    = '✔ Buka Kuis';
    status.textContent = '🎉 Video selesai! Kuis akan terbuka...';
    manualBtn.style.display = 'none';
  
    // Otomatis tutup video & buka kuis setelah 1,2 detik
    setTimeout(function () {
      closeVideoModal();
      setTimeout(function () {
        openQuiz(moduleNames[id] || 'Modul ' + id, id);
      }, 350);
    }, 1200);
  }
  
  /* ================================================
     TOMBOL MANUAL: "Saya Sudah Selesai Menonton"
     ================================================ */
  function markVideoWatched() {
    clearTimer();
    onVideoEnded(currentVideoId);
  }
  
  /* ================================================
     TOMBOL "Buka Kuis" (setelah ditonton)
     ================================================ */
  function videoDone() {
    const id = parseInt(document.getElementById('videoOverlay').dataset.cardId);
    closeVideoModal();
    if (watchedVideos.has(id)) {
      setTimeout(function () {
        openQuiz(moduleNames[id] || 'Modul ' + id, id);
      }, 350);
    }
  }
  
  /* ================================================
     TUTUP MODAL VIDEO
     ================================================ */
  function closeVideoModal() {
    clearTimer();
    const iframe = document.getElementById('driveIframe');
    // Hentikan video dengan mengosongkan src
    iframe.src           = '';
    iframe.style.display = 'none';
    document.getElementById('videoPlaceholder').style.display = 'flex';
    document.getElementById('videoOverlay').classList.remove('open');
    document.getElementById('manualDoneWrap').style.display = 'none';
    document.getElementById('btnManualDone').style.display  = 'none';
  }
  
  function handleVideoOverlayClick(e) {
    if (e.target === document.getElementById('videoOverlay')) {
      const id = parseInt(document.getElementById('videoOverlay').dataset.cardId);
      // Boleh ditutup hanya jika sudah selesai ditonton
      if (watchedVideos.has(id)) closeVideoModal();
      else showToast('⚠️ Selesaikan menonton video terlebih dahulu!');
    }
  }
  
  /* ================================================
     UNLOCK QUIZ CARD SETELAH SELESAI NONTON
     ================================================ */
  function unlockQuizCard(id) {
    const card = document.querySelector('.video-card:nth-child(' + id + ')');
    if (!card) return;
    const btn = card.querySelector('.btn-quiz');
    if (btn)  { btn.classList.remove('btn-quiz-locked'); btn.disabled = false; }
    const badge = card.querySelector('.quiz-badge');
    if (badge) badge.classList.remove('quiz-badge-locked');
    const prog = document.getElementById('prog' + id);
    if (prog)  prog.style.width = '20%';
  }
  
  /* ================================================
     STATE & FUNGSI KUIS
     ================================================ */
  let currentModule   = 1;
  let currentQuestion = 0;
  let selectedOption  = null;
  let score           = 0;
  let answered        = [];
  let currentCardId   = null;
  
  function openQuiz(moduleName, cardId) {
    if (!watchedVideos.has(cardId)) {
      showToast('⚠️ Tonton video terlebih dahulu sebelum mengerjakan kuis!');
      return;
    }
    currentModule   = cardId;
    currentQuestion = 0;
    selectedOption  = null;
    score           = 0;
    answered        = [];
    currentCardId   = cardId;
  
    document.getElementById('quizTitle').textContent = 'Kuis Modul ' + cardId + ': ' + moduleName;
    document.getElementById('quizOverlay').classList.add('open');
    renderQuestion();
  }
  
  function closeQuiz() {
    document.getElementById('quizOverlay').classList.remove('open');
    if (currentCardId) {
      const total = quizData[currentModule].length;
      const prog  = document.getElementById('prog' + currentCardId);
      if (prog) prog.style.width = (answered.length / total * 100) + '%';
    }
  }
  
  function handleOverlayClick(e) {
    if (e.target === document.getElementById('quizOverlay')) closeQuiz();
  }
  
  function renderQuestion() {
    const data  = quizData[currentModule];
    const q     = data[currentQuestion];
    const total = data.length;
  
    document.getElementById('quizQuestion').textContent = q.q;
    document.getElementById('quizCounter').textContent  = 'Soal ' + (currentQuestion + 1) + ' dari ' + total;
    document.getElementById('quizScore').textContent    = 'Skor: ' + score + '/' + (total * 10);
    document.getElementById('quizProgressBar').style.width = ((currentQuestion + 1) / total * 100) + '%';
  
    const labels    = ['A', 'B', 'C', 'D'];
    const container = document.getElementById('quizOptions');
    container.innerHTML = '';
    selectedOption = null;
  
    q.opts.forEach(function (opt, i) {
      const div     = document.createElement('div');
      div.className = 'quiz-option';
  
      if (answered[currentQuestion] !== undefined) {
        if (i === q.correct)                                          div.classList.add('correct');
        else if (i === answered[currentQuestion] && i !== q.correct) div.classList.add('wrong');
      }
  
      div.innerHTML = '<span><span class="opt-label">' + labels[i] + '</span>' + opt + '</span><span class="opt-circle"></span>';
      div.onclick   = function () { selectOption(i, div); };
      container.appendChild(div);
    });
  
    if (answered[currentQuestion] !== undefined) {
      container.querySelectorAll('.quiz-option')[answered[currentQuestion]].classList.add('selected');
    }
  }
  
  function selectOption(idx, el) {
    if (answered[currentQuestion] !== undefined) return;
    selectedOption = idx;
    document.querySelectorAll('.quiz-option').forEach(function (o) { o.classList.remove('selected'); });
    el.classList.add('selected');
  }
  
  function submitAnswer() {
    if (selectedOption === null) { alert('Pilih salah satu jawaban terlebih dahulu!'); return; }
    if (answered[currentQuestion] !== undefined) return;
  
    const q = quizData[currentModule][currentQuestion];
    answered[currentQuestion] = selectedOption;
    if (selectedOption === q.correct) score += 10;
  
    renderQuestion();
    document.getElementById('quizScore').textContent = 'Skor: ' + score + '/' + (quizData[currentModule].length * 10);
  }
  
  function nextQuestion() {
    const data = quizData[currentModule];
    if (currentQuestion < data.length - 1) {
      currentQuestion++;
      selectedOption = null;
      renderQuestion();
    } else {
      const total = data.length * 10;
      alert('🎉 Kuis selesai!\n\nSkor Anda: ' + score + ' / ' + total + '\n' +
        (score === total ? '✅ Sempurna! Luar biasa!' : score >= total * 0.6 ? '👍 Bagus! Pertahankan!' : '📚 Pelajari lagi materinya ya!'));
      closeQuiz();
      // Update progress bar card menjadi 100% jika semua soal dijawab
      if (answered.length === data.length) {
        const prog = document.getElementById('prog' + currentCardId);
        if (prog) prog.style.width = '100%';
      }
    }
  }
  
  /* ================================================
     TOAST
     ================================================ */
  function showToast(msg) {
    let toast = document.getElementById('toastMsg');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastMsg';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 3000);
  }
  
  /* ================================================
     NAVIGASI HALAMAN
     ================================================ */
  function showPage(pageId, link) {
    document.querySelectorAll('.page-section').forEach(function (el) { el.style.display = 'none'; });
    const target = document.getElementById('page-' + pageId);
    if (target) target.style.display = 'block';
    document.querySelectorAll('.nav-links a').forEach(function (a) { a.classList.remove('active'); });
    if (link) link.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  /* ================================================
     KONTAK
     ================================================ */
  function sendMessage() {
    const inputs = document.querySelectorAll('#page-kontak .form-input');
    let empty = false;
    inputs.forEach(function (el) { if (!el.value.trim()) empty = true; });
    if (empty) { showToast('⚠️ Harap isi semua kolom sebelum mengirim!'); return; }
    showToast('✅ Pesan berhasil dikirim! Kami akan segera menghubungi Anda.');
    inputs.forEach(function (el) { el.value = ''; });
  }
  
  /* ================================================
     SEARCH
     ================================================ */
  function searchVideos(keyword) {
    const q     = keyword.trim().toLowerCase();
    const cards = document.querySelectorAll('#page-beranda .video-card');
    let found   = 0;
  
    cards.forEach(function (card) {
      const title = (card.querySelector('.card-title') || {}).textContent || '';
      const sub   = (card.querySelector('.card-sub')   || {}).textContent || '';
      const match = !q || title.toLowerCase().includes(q) || sub.toLowerCase().includes(q);
      card.style.display = match ? '' : 'none';
      if (match) found++;
    });
  
    let msg = document.getElementById('searchEmptyMsg');
    if (!msg) {
      msg = document.createElement('div');
      msg.id = 'searchEmptyMsg';
      msg.style.cssText = 'text-align:center;padding:40px;color:#888;font-size:1rem;grid-column:1/-1;';
      document.querySelector('#page-beranda .video-grid').appendChild(msg);
    }
    msg.style.display = (found === 0 && q) ? 'block' : 'none';
    msg.textContent   = found === 0 && q ? '🔍 Tidak ada video yang cocok dengan "' + keyword + '"' : '';
  }
  
  /* ================================================
     INIT — Kunci semua tombol quiz saat halaman dimuat
     ================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.btn-quiz').forEach(function (btn) {
      btn.classList.add('btn-quiz-locked');
      btn.disabled = true;
    });
    document.querySelectorAll('.quiz-badge').forEach(function (badge) {
      badge.classList.add('quiz-badge-locked');
    });
  });
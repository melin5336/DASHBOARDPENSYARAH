/* =============================================
   Data: Item Checklist per Kursus
   ============================================= */
const KURSUS_ITEMS = [
  { id: 'a', label: 'Maklumat Kursus', sumber: 'iFRP', sub: false },
  { id: 'b', label: 'Rancangan Mengajar', sumber: 'iFRP', sub: false },
  { id: 'c', label: 'Rekod Kehadiran Pelajar', sumber: 'iFRP', sub: false },
  { id: 'd', label: 'Jadual Bengkel / Makmal / Kerja Luar', sumber: 'iFRP', sub: false },
  { id: 'e', label: 'Borang dan Bukti Pelaksanaan CQI', sumber: '', sub: false },
  { id: 'f', label: 'Pengurusan Rekod Ketidakhadiran Pelajar', sumber: '', sub: false },
  { id: 'f1', label: 'Dokumen Ketidakhadiran Pelajar', sumber: '', sub: true },
  { id: 'f2', label: 'Surat Peringatan Ketidakhadiran', sumber: '', sub: true },
  { id: 'f3', label: 'Borang Pemantauan Kehadiran', sumber: '', sub: true },
  { id: 'f4', label: 'Surat Tunjuk Sebab Ketidakhadiran', sumber: '', sub: true },
  { id: 'g', label: 'Sampel Pentaksiran Kerja Kursus (1R, 1S, 1T)', sumber: '', sub: false },
  { id: 'h', label: 'Rekod Pentaksiran Kerja Kursus Pelajar', sumber: '', sub: false, heading: true },
  { id: 'h1', label: 'Rekod Pentaksiran Kerja Kursus (Semakan 1 — Minggu 8)', sumber: '', sub: true },
  { id: 'h2', label: 'Rekod Pentaksiran Kerja Kursus yang Lengkap', sumber: '', sub: true },
];

/* =============================================
   Data: Item Fail Penyelaras Kursus
   ============================================= */
const PENYELARAS_ITEMS = [
  { bil: '1',  label: 'Borang Pengesahan Semakan Fail Penyelaras Kursus', group: '' },
  { bil: '2a', label: 'Maklumat Penyelaras Kursus dan Pensyarah', group: 'Dokumen Fail Penyelaras Kursus' },
  { bil: '2b', label: 'Surat / Memo Lantikan Penyelaras Kursus', group: '' },
  { bil: '2c', label: 'Borang Serah Tugas Penyelaras Kursus (Jika Ada)', group: '' },
  { bil: '3',  label: 'Rangka Kursus / Course Outline', group: '' },
  { bil: '4a', label: 'Laporan CORR (sesi lepas, telah disahkan KJ/KPro/KK)', group: 'CORR & CQI' },
  { bil: '4b', label: 'Laporan dan Analisis Keberkesanan CQI (Disediakan oleh KPro)', group: '' },
  { bil: '4c', label: 'Cadangan CQI Sesi Semasa', group: '' },
  { bil: '5a', label: 'Jadual Spesifikasi Ujian — JSU (Pentaksiran Berterusan)', group: 'Pentaksiran Berterusan' },
  { bil: '5b', label: 'Soalan Penilaian, Skema Pemarkahan / Rubrik', group: '' },
  { bil: '5c', label: 'Dokumen Semakan dan Pengesahan Item', group: '' },
  { bil: '5d', label: 'Moderasi bagi Penilaian Tertinggi (Kursus tiada Peperiksaan Akhir)', group: '' },
  { bil: '6',  label: 'Sampel Penilaian Pelajar', group: '' },
  { bil: '7',  label: 'Nota-Nota Kursus / Slaid Kuliah / Bahan Pengajaran', group: '' },
];

/* =============================================
   State
   ============================================= */
let kursusList = [
  { id: 1, name: 'Kursus 1', kod: '' },
  { id: 2, name: 'Kursus 2', kod: '' },
  { id: 3, name: 'Kursus 3', kod: '' },
  { id: 4, name: 'Kursus 4', kod: '' },
];
let nextId = 5;

/* =============================================
   Helper: bina row status select
   ============================================= */
function buildRow(bil, label, sumber, isSub, tableId, rowIndex, isHeading) {
  if (isHeading) {
    return `<tr style="background:var(--color-primary-light)">
      <td style="font-weight:700;color:var(--color-primary-dark);font-size:0.8rem;">${bil}</td>
      <td colspan="5" style="font-weight:700;color:var(--color-primary-dark);font-size:0.8rem;">${label}</td>
    </tr>`;
  }

  const sumberCell = sumber
    ? `<span class="badge badge-ifrp">${sumber}</span>`
    : `<span style="color:var(--color-muted);font-size:0.75rem;">—</span>`;

  const labelCell = isSub
    ? `<span style="padding-left:1.4rem;color:var(--color-muted);font-size:0.8rem;">↳ ${label}</span>`
    : label;

  return `<tr class="${isSub ? 'sub-item' : ''}">
    <td>${bil}</td>
    <td>${labelCell}</td>
    <td>${sumberCell}</td>
    <td>
      <select class="status-select" onchange="updateStatus(this);refreshSummary()">
        <option value="">— Pilih —</option>
        <option value="selesai">✅ Selesai</option>
        <option value="proses">⚠️ Dalam Proses</option>
        <option value="belum">❌ Belum Ada</option>
        <option value="na">N/A</option>
      </select>
    </td>
    <td><input type="date" class="date-input" /></td>
    <td><input type="text" class="note-input" placeholder="Catatan..." /></td>
  </tr>`;
}

/* =============================================
   State: Fail Penyelaras Kursus (dinamik)
   ============================================= */
let penyelarasList = [
  { id: 1, name: 'Kursus Penyelaras 1', kod: '' },
];
let nextPenyelarasId = 2;

/* =============================================
   Helper: bina rows untuk satu blok Penyelaras
   ============================================= */
function buildPenyelarasRows() {
  let lastGroup = '';
  let html = '';

  PENYELARAS_ITEMS.forEach((item) => {
    if (item.group && item.group !== lastGroup) {
      html += `<tr style="background:var(--color-primary-light)">
        <td colspan="5" style="font-size:0.75rem;font-weight:700;color:var(--color-primary-dark);padding:0.35rem 0.65rem;">
          ${item.group}
        </td>
      </tr>`;
      lastGroup = item.group;
    }

    const isSub = item.bil.length > 1 && isNaN(item.bil);
    html += `<tr class="${isSub ? 'sub-item' : ''}">
      <td>${item.bil}</td>
      <td>${isSub
        ? `<span style="padding-left:1rem;color:var(--color-muted);font-size:0.8rem;">↳ ${item.label}</span>`
        : item.label}</td>
      <td>
        <select class="status-select" onchange="updateStatus(this);refreshSummary()">
          <option value="">— Pilih —</option>
          <option value="selesai">✅ Selesai</option>
          <option value="proses">⚠️ Dalam Proses</option>
          <option value="belum">❌ Belum Ada</option>
          <option value="na">N/A</option>
        </select>
      </td>
      <td><input type="date" class="date-input" /></td>
      <td><input type="text" class="note-input" placeholder="Catatan..." /></td>
    </tr>`;
  });

  return html;
}

/* =============================================
   Render: Satu blok Penyelaras
   ============================================= */
function renderPenyelarasBlock(p) {
  const blockId = `penyelaras-${p.id}`;
  const tbodyId = `tbody-penyelaras-${p.id}`;

  const div = document.createElement('div');
  div.className = 'kursus-block';
  div.id = blockId;
  div.innerHTML = `
    <div class="kursus-header">
      <div class="kursus-title-wrap">
        <span class="kursus-num">Penyelaras ${penyelarasList.indexOf(p) + 1}</span>
        <input class="kursus-name" type="text" placeholder="Nama Kursus..." value="${p.name !== `Kursus Penyelaras ${p.id}` ? p.name : ''}"
          oninput="savePenyelarasName(${p.id}, this.value)" />
        <input class="kursus-kod" type="text" placeholder="Kod..." value="${p.kod}"
          oninput="savePenyelarasKod(${p.id}, this.value)" />
      </div>
      <div class="kursus-progress-wrap">
        <span class="kursus-pct" id="ppct-${p.id}">0%</span>
        <div class="kursus-bar"><div class="kursus-bar-fill" id="pbar-${p.id}" style="width:0%"></div></div>
      </div>
      <button class="btn-remove-kursus" onclick="removePenyelaras(${p.id})">✕ Buang</button>
    </div>
    <table class="checklist-table">
      <thead>
        <tr>
          <th style="width:4%">Bil</th>
          <th>Dokumen</th>
          <th style="width:14%">Status</th>
          <th style="width:15%">Tarikh</th>
          <th>Catatan</th>
        </tr>
      </thead>
      <tbody id="${tbodyId}">${buildPenyelarasRows()}</tbody>
    </table>`;

  return div;
}

/* =============================================
   Render: Semua blok Penyelaras
   ============================================= */
function renderAllPenyelaras() {
  const container = document.getElementById('penyelarasContainer');
  container.innerHTML = '';
  penyelarasList.forEach((p) => {
    container.appendChild(renderPenyelarasBlock(p));
  });
  refreshSummary();
}

/* =============================================
   Add / Remove Penyelaras
   ============================================= */
function addPenyelaras() {
  if (penyelarasList.length >= 8) {
    alert('Maksimum 8 fail penyelaras dibenarkan.');
    return;
  }
  penyelarasList.push({ id: nextPenyelarasId++, name: '', kod: '' });
  renderAllPenyelaras();
}

function removePenyelaras(id) {
  if (penyelarasList.length <= 1) {
    alert('Sekurang-kurangnya 1 fail penyelaras diperlukan.');
    return;
  }
  if (!confirm('Buang fail penyelaras ini? Semua data akan hilang.')) return;
  penyelarasList = penyelarasList.filter(p => p.id !== id);
  renderAllPenyelaras();
}

function savePenyelarasName(id, val) {
  const p = penyelarasList.find(p => p.id === id);
  if (p) p.name = val;
}

function savePenyelarasKod(id, val) {
  const p = penyelarasList.find(p => p.id === id);
  if (p) p.kod = val;
}

/* =============================================
   Render: Satu blok Kursus
   ============================================= */
function renderKursusBlock(kursus) {
  const blockId = `kursus-${kursus.id}`;
  const tbodyId = `tbody-kursus-${kursus.id}`;

  let rows = '';
  KURSUS_ITEMS.forEach((item, idx) => {
    rows += buildRow(item.id.toUpperCase(), item.label, item.sumber, item.sub, tbodyId, idx, item.heading || false);
  });

  const div = document.createElement('div');
  div.className = 'kursus-block';
  div.id = blockId;
  div.innerHTML = `
    <div class="kursus-header">
      <div class="kursus-title-wrap">
        <span class="kursus-num">Kursus ${kursusList.indexOf(kursus) + 1}</span>
        <input class="kursus-name" type="text" placeholder="Nama Kursus..." value="${kursus.name !== `Kursus ${kursus.id}` ? kursus.name : ''}"
          oninput="saveKursusName(${kursus.id}, this.value)" />
        <input class="kursus-kod" type="text" placeholder="Kod..." value="${kursus.kod}"
          oninput="saveKursusKod(${kursus.id}, this.value)" />
      </div>
      <div class="kursus-progress-wrap">
        <span class="kursus-pct" id="pct-${kursus.id}">0%</span>
        <div class="kursus-bar"><div class="kursus-bar-fill" id="bar-${kursus.id}" style="width:0%"></div></div>
      </div>
      <button class="btn-remove-kursus" onclick="removeKursus(${kursus.id})">✕ Buang</button>
    </div>
    <table class="checklist-table">
      <thead>
        <tr>
          <th style="width:4%">Bil</th>
          <th>Dokumen</th>
          <th style="width:8%">Sumber</th>
          <th style="width:14%">Status</th>
          <th style="width:14%">Tarikh</th>
          <th>Catatan</th>
        </tr>
      </thead>
      <tbody id="${tbodyId}">${rows}</tbody>
    </table>`;

  return div;
}

/* =============================================
   Render: Semua Kursus
   ============================================= */
function renderAllKursus() {
  const container = document.getElementById('kursusContainer');
  container.innerHTML = '';
  kursusList.forEach((k) => {
    container.appendChild(renderKursusBlock(k));
  });
  refreshSummary();
}

/* =============================================
   Add / Remove Kursus
   ============================================= */
function addKursus() {
  if (kursusList.length >= 8) {
    alert('Maksimum 8 kursus dibenarkan.');
    return;
  }
  kursusList.push({ id: nextId++, name: '', kod: '' });
  renderAllKursus();
}

function removeKursus(id) {
  if (kursusList.length <= 1) {
    alert('Sekurang-kurangnya 1 kursus diperlukan.');
    return;
  }
  if (!confirm('Buang kursus ini? Semua data dalam kursus ini akan hilang.')) return;
  kursusList = kursusList.filter(k => k.id !== id);
  renderAllKursus();
}

function saveKursusName(id, val) {
  const k = kursusList.find(k => k.id === id);
  if (k) k.name = val;
}

function saveKursusKod(id, val) {
  const k = kursusList.find(k => k.id === id);
  if (k) k.kod = val;
}

/* =============================================
   Status Select: apply colour class
   ============================================= */
function updateStatus(sel) {
  sel.className = 'status-select';
  if (sel.value) sel.classList.add('s-' + sel.value);
  refreshSummary();
}

/* =============================================
   Progress per Kursus
   ============================================= */
function calcProgress(tbodyId) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return { done: 0, total: 0 };
  const selects = tbody.querySelectorAll('.status-select');
  let done = 0, total = 0;
  selects.forEach(s => {
    total++;
    if (s.value === 'selesai' || s.value === 'na') done++;
  });
  return { done, total };
}

/* =============================================
   Summary Dashboard
   ============================================= */
function refreshSummary() {
  const container = document.getElementById('summaryCards');

  // Perancangan Akademik
  const tableP = document.getElementById('tablePerancangan');
  let pDone = 0, pTotal = 0;
  if (tableP) {
    tableP.querySelectorAll('.status-select').forEach(s => {
      pTotal++;
      if (s.value === 'selesai' || s.value === 'na') pDone++;
    });
  }

  // Semua Kursus
  let kDoneAll = 0, kTotalAll = 0;
  const kursusData = kursusList.map((k, idx) => {
    const tbodyId = `tbody-kursus-${k.id}`;
    const { done, total } = calcProgress(tbodyId);
    kDoneAll += done;
    kTotalAll += total;

    // Update bar
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const barFill = document.getElementById(`bar-${k.id}`);
    const pctEl = document.getElementById(`pct-${k.id}`);
    if (barFill) barFill.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';

    return { idx: idx + 1, done, total, pct };
  });

  // Semua Fail Penyelaras (dinamik)
  let nDoneAll = 0, nTotalAll = 0;
  const penyelarasData = penyelarasList.map((p, idx) => {
    const tbodyId = `tbody-penyelaras-${p.id}`;
    const { done, total } = calcProgress(tbodyId);
    nDoneAll += done;
    nTotalAll += total;

    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const barFill = document.getElementById(`pbar-${p.id}`);
    const pctEl = document.getElementById(`ppct-${p.id}`);
    if (barFill) barFill.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';

    return { idx: idx + 1, done, total, pct };
  });

  const grandDone = pDone + kDoneAll + nDoneAll;
  const grandTotal = pTotal + kTotalAll + nTotalAll;
  const grandPct = grandTotal > 0 ? Math.round((grandDone / grandTotal) * 100) : 0;

  function ragColor(pct) {
    if (pct >= 80) return '#16a34a';
    if (pct >= 40) return '#d97706';
    return '#dc2626';
  }

  function ragLabel(pct) {
    if (pct >= 80) return '✅ Baik';
    if (pct >= 40) return '⚠️ Sederhana';
    return '❌ Perlu Tindakan';
  }

  const pPct = pTotal > 0 ? Math.round((pDone / pTotal) * 100) : 0;
  const nPct = nTotalAll > 0 ? Math.round((nDoneAll / nTotalAll) * 100) : 0;

  container.innerHTML = `
    <div class="card" style="border-top-color:${ragColor(grandPct)}">
      <div class="card-title">Keseluruhan</div>
      <div class="card-metric" style="color:${ragColor(grandPct)}">${grandPct}%</div>
      <div class="card-sub">${grandDone} / ${grandTotal} item selesai</div>
      <div class="card-bar"><div class="card-bar-fill" style="width:${grandPct}%;background:${ragColor(grandPct)}"></div></div>
    </div>
    <div class="card" style="border-top-color:${ragColor(pPct)}">
      <div class="card-title">Perancangan Akademik</div>
      <div class="card-metric" style="color:${ragColor(pPct)}">${pPct}%</div>
      <div class="card-sub">${pDone} / ${pTotal} item • ${ragLabel(pPct)}</div>
      <div class="card-bar"><div class="card-bar-fill" style="width:${pPct}%;background:${ragColor(pPct)}"></div></div>
    </div>
    ${kursusData.map(k => {
      const c = ragColor(k.pct);
      return `<div class="card" style="border-top-color:${c}">
        <div class="card-title">Kursus ${k.idx}</div>
        <div class="card-metric" style="color:${c}">${k.pct}%</div>
        <div class="card-sub">${k.done} / ${k.total} item • ${ragLabel(k.pct)}</div>
        <div class="card-bar"><div class="card-bar-fill" style="width:${k.pct}%;background:${c}"></div></div>
      </div>`;
    }).join('')}
    ${penyelarasData.map(n => {
      const c = ragColor(n.pct);
      return `<div class="card" style="border-top-color:${c}">
        <div class="card-title">Penyelaras ${n.idx}</div>
        <div class="card-metric" style="color:${c}">${n.pct}%</div>
        <div class="card-sub">${n.done} / ${n.total} item • ${ragLabel(n.pct)}</div>
        <div class="card-bar"><div class="card-bar-fill" style="width:${n.pct}%;background:${c}"></div></div>
      </div>`;
    }).join('')}`;
}

/* =============================================
   Init
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  renderAllKursus();
  renderAllPenyelaras();

  const now = new Date();
  const dateStr = now.toLocaleDateString('ms-MY', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const headerDate = document.getElementById('headerDate');
  if (headerDate) headerDate.textContent = dateStr;

  document.getElementById('footerYear').textContent =
    'Hak Cipta © ' + now.getFullYear();
});

/* =============================================
   Konfigurasi Bahagian KPI
   ============================================= */
const SECTIONS = {
  1: {
    label: 'Latihan / Kursus / Bengkel',
    unit: 'aktiviti',
    fields: [
      { key: 'tajuk',     label: 'Tajuk / Nama Aktiviti',     type: 'text',     full: true,  placeholder: 'Contoh: Kursus Kepimpinan Fasilitator...' },
      { key: 'penganjur', label: 'Penganjur',                 type: 'text',     full: false, placeholder: 'Nama penganjur...' },
      { key: 'tahap',     label: 'Peringkat',                 type: 'select',   full: false, options: ['Antarabangsa','Kebangsaan','Negeri','Institusi','Lain-lain'] },
      { key: 'tarikh',    label: 'Tarikh',                    type: 'date',     full: false },
      { key: 'tempat',    label: 'Tempat / Mod (F2F/Online)', type: 'text',     full: false, placeholder: 'Contoh: Online / Zoom...' },
      { key: 'jam',       label: 'Jam / Hari',                type: 'text',     full: false, placeholder: 'Contoh: 7 jam / 2 hari...' },
      { key: 'sijil',     label: 'Sijil / Bukti',             type: 'select',   full: false, options: ['Ada','Tiada','Dalam Proses'] },
      { key: 'catatan',   label: 'Catatan',                   type: 'textarea', full: true,  placeholder: 'Catatan tambahan...' },
    ]
  },
  2: {
    label: 'Sumbangan',
    unit: 'aktiviti',
    fields: [
      { key: 'tajuk',     label: 'Perkara / Tajuk Sumbangan', type: 'text',     full: true,  placeholder: 'Contoh: Juri Pertandingan Masakan...' },
      { key: 'jenis',     label: 'Jenis Sumbangan',           type: 'select',   full: false, options: ['Komuniti','Industri','Institusi','Pelajar','Lain-lain'] },
      { key: 'tahap',     label: 'Peringkat',                 type: 'select',   full: false, options: ['Antarabangsa','Kebangsaan','Negeri','Institusi','Lain-lain'] },
      { key: 'tarikh',    label: 'Tarikh',                    type: 'date',     full: false },
      { key: 'peranan',   label: 'Peranan',                   type: 'text',     full: false, placeholder: 'Contoh: Pengerusi, Ahli, Penasihat...' },
      { key: 'bukti',     label: 'Bukti',                     type: 'select',   full: false, options: ['Ada','Tiada','Dalam Proses'] },
      { key: 'catatan',   label: 'Catatan',                   type: 'textarea', full: true,  placeholder: 'Catatan tambahan...' },
    ]
  },
  3: {
    label: 'Inovasi & Penambahbaikan',
    unit: 'projek',
    fields: [
      { key: 'tajuk',    label: 'Tajuk Projek / Inovasi',   type: 'text',     full: true,  placeholder: 'Contoh: Sistem e-Rekod Kehadiran Pelajar...' },
      { key: 'jenis',    label: 'Jenis',                    type: 'select',   full: false, options: ['Inovasi Produk','Inovasi Proses','Inovasi PdP','R&D','Lain-lain'] },
      { key: 'tahap',    label: 'Peringkat',                type: 'select',   full: false, options: ['Antarabangsa','Kebangsaan','Negeri','Institusi','Lain-lain'] },
      { key: 'tarikh',   label: 'Tarikh Mula',              type: 'date',     full: false },
      { key: 'status',   label: 'Status',                   type: 'select',   full: false, options: ['Dalam Perancangan','Sedang Berjalan','Siap','Dibentang','Dipatenkan'] },
      { key: 'anugerah', label: 'Anugerah / Pengiktirafan', type: 'text',     full: false, placeholder: 'Contoh: Emas CITREX 2025...' },
      { key: 'catatan',  label: 'Catatan',                  type: 'textarea', full: true,  placeholder: 'Catatan tambahan...' },
    ]
  },
  4: {
    label: 'Research & Pembentangan',
    unit: 'kertas',
    fields: [
      { key: 'tajuk',    label: 'Tajuk Penyelidikan / Kertas', type: 'text',     full: true,  placeholder: 'Contoh: Impak Media Sosial terhadap Pemilihan Destinasi...' },
      { key: 'jenis',    label: 'Jenis',                       type: 'select',   full: false, options: ['Jurnal','Prosiding','Buku','Pembentangan','Poster','Lain-lain'] },
      { key: 'tahap',    label: 'Peringkat',                   type: 'select',   full: false, options: ['Antarabangsa','Kebangsaan','Negeri','Institusi','Lain-lain'] },
      { key: 'tarikh',   label: 'Tarikh Bentang / Terbit',     type: 'date',     full: false },
      { key: 'penerbit', label: 'Penerbit / Nama Jurnal',      type: 'text',     full: false, placeholder: 'Nama jurnal / prosiding...' },
      { key: 'status',   label: 'Status',                      type: 'select',   full: false, options: ['Dalam Penulisan','Hantar Semak','Diterima','Diterbit','Dibentang'] },
      { key: 'doi',      label: 'DOI / URL (jika ada)',        type: 'text',     full: false, placeholder: 'https://doi.org/...' },
      { key: 'catatan',  label: 'Catatan',                     type: 'textarea', full: true,  placeholder: 'Catatan tambahan...' },
    ]
  },
  5: {
    label: 'Tugas Sampingan & Lain-lain',
    unit: 'tugas',
    fields: [
      { key: 'tajuk',    label: 'Perkara / Peranan',    type: 'text',     full: true,  placeholder: 'Contoh: Setiausaha JK Kurikulum...' },
      { key: 'jenis',    label: 'Jenis Tugas',          type: 'select',   full: false, options: ['Jawatankuasa','Mentor/Mentee','Penyeliaan Pelajar','Pengawas Peperiksaan','Urusetia','Lain-lain'] },
      { key: 'tarikh',   label: 'Tempoh / Tarikh Mula', type: 'date',     full: false },
      { key: 'tamat',    label: 'Tarikh Tamat',         type: 'date',     full: false },
      { key: 'pelantik', label: 'Surat Lantikan',       type: 'select',   full: false, options: ['Ada','Tiada','Dalam Proses'] },
      { key: 'catatan',  label: 'Catatan',              type: 'textarea', full: true,  placeholder: 'Catatan tambahan...' },
    ]
  }
};

/* =============================================
   State: Rekod aktiviti per bahagian
   ============================================= */
const state  = { 1: [], 2: [], 3: [], 4: [], 5: [] };
const nextId = { 1: 1,  2: 1,  3: 1,  4: 1,  5: 1  };

/* =============================================
   Helper: bina semua form fields satu aktiviti
   ============================================= */
function buildFields(sectionNum, id) {
  const fields = SECTIONS[sectionNum].fields;
  let html = '';
  let rowBuffer = [];

  function flushRow() {
    if (!rowBuffer.length) return;
    html += `<div class="activity-row">${rowBuffer.join('')}</div>`;
    rowBuffer = [];
  }

  fields.forEach(f => {
    const bid = `s${sectionNum}-${id}-${f.key}`;
    let inp = '';

    if (f.type === 'text' || f.type === 'date') {
      inp = `<input type="${f.type}" id="${bid}" placeholder="${f.placeholder || ''}"
        oninput="saveField(${sectionNum},${id},'${f.key}',this.value)" />`;
    } else if (f.type === 'textarea') {
      inp = `<textarea id="${bid}" placeholder="${f.placeholder || ''}"
        oninput="saveField(${sectionNum},${id},'${f.key}',this.value)"></textarea>`;
    } else if (f.type === 'select') {
      const opts = f.options.map(o => `<option value="${o}">${o}</option>`).join('');
      inp = `<select id="${bid}" onchange="saveField(${sectionNum},${id},'${f.key}',this.value)">
        <option value="">— Pilih —</option>${opts}
      </select>`;
    }

    const cell = `<div class="activity-field${f.full ? ' full' : ''}"><label for="${bid}">${f.label}</label>${inp}</div>`;

    if (f.full) {
      flushRow();
      html += `<div class="activity-row">${cell}</div>`;
    } else {
      rowBuffer.push(cell);
      if (rowBuffer.length === 2) flushRow();
    }
  });

  flushRow();
  return html;
}

/* =============================================
   Render: Satu blok aktiviti
   ============================================= */
function renderActivityBlock(sectionNum, rec) {
  const sec = SECTIONS[sectionNum];
  const idx = state[sectionNum].indexOf(rec) + 1;

  const div = document.createElement('div');
  div.className = 'activity-block';
  div.id = `act-${sectionNum}-${rec.id}`;

  div.innerHTML = `
    <div class="activity-header">
      <div class="activity-title-wrap">
        <span class="activity-num">${sec.unit} ${idx}</span>
        <input class="activity-name" type="text" placeholder="Tajuk ringkas..."
          value="${rec.nama || ''}"
          oninput="saveField(${sectionNum},${rec.id},'nama',this.value)" />
      </div>
      <div class="activity-meta">
        <select class="activity-badge-tahap"
          onchange="saveField(${sectionNum},${rec.id},'peringkat',this.value)">
          <option value="">Peringkat...</option>
          <option value="Antarabangsa"${rec.peringkat==='Antarabangsa'?' selected':''}>🌐 Antarabangsa</option>
          <option value="Kebangsaan"${rec.peringkat==='Kebangsaan'?' selected':''}>🇲🇾 Kebangsaan</option>
          <option value="Negeri"${rec.peringkat==='Negeri'?' selected':''}>📍 Negeri</option>
          <option value="Institusi"${rec.peringkat==='Institusi'?' selected':''}>🏫 Institusi</option>
          <option value="Lain-lain"${rec.peringkat==='Lain-lain'?' selected':''}>📌 Lain-lain</option>
        </select>
        <input type="date" class="activity-date-input"
          value="${rec.tarikh_header || ''}"
          onchange="saveField(${sectionNum},${rec.id},'tarikh_header',this.value)" />
      </div>
      <button class="btn-remove-kursus" onclick="removeActivity(${sectionNum},${rec.id})">✕ Buang</button>
    </div>
    <div class="activity-body">
      ${buildFields(sectionNum, rec.id)}
    </div>`;

  return div;
}

/* =============================================
   Render: Semua blok satu bahagian
   ============================================= */
function renderSection(sectionNum) {
  const container = document.getElementById(`container${sectionNum}`);
  if (!container) return;
  container.innerHTML = '';
  state[sectionNum].forEach(rec => {
    const block = renderActivityBlock(sectionNum, rec);
    container.appendChild(block);
    // Pulihkan nilai yang tersimpan
    SECTIONS[sectionNum].fields.forEach(f => {
      const el = document.getElementById(`s${sectionNum}-${rec.id}-${f.key}`);
      if (el && rec[f.key] !== undefined) el.value = rec[f.key];
    });
  });
  refreshSummary();
}

/* =============================================
   Add / Remove Aktiviti
   ============================================= */
function addActivity(sectionNum) {
  const rec = { id: nextId[sectionNum]++ };
  state[sectionNum].push(rec);
  const container = document.getElementById(`container${sectionNum}`);
  const block = renderActivityBlock(sectionNum, rec);
  container.appendChild(block);
  refreshSummary();
  block.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function removeActivity(sectionNum, id) {
  if (!confirm('Buang rekod ini? Data akan hilang.')) return;
  state[sectionNum] = state[sectionNum].filter(r => r.id !== id);
  const el = document.getElementById(`act-${sectionNum}-${id}`);
  if (el) el.remove();
  refreshSummary();
}

/* =============================================
   Simpan nilai field
   ============================================= */
function saveField(sectionNum, id, key, value) {
  const rec = state[sectionNum].find(r => r.id === id);
  if (rec) rec[key] = value;
}

/* =============================================
   Helper: RAG warna, label, class
   ============================================= */
function ragColor(pct) {
  if (pct >= 100) return '#16a34a';
  if (pct >= 50)  return '#d97706';
  return '#dc2626';
}

function ragLabel(count, target) {
  if (target === 0) return '—';
  if (count >= target)          return '✅ Sasaran Capai';
  if (count >= target * 0.5)    return '⚠️ Sederhana';
  return '❌ Perlu Tindakan';
}

function kpiClass(count, target) {
  if (target === 0) return '';
  if (count >= target)        return 'achieved';
  if (count >= target * 0.5)  return 'warn';
  return 'danger';
}

/* =============================================
   Refresh Summary Dashboard
   ============================================= */
function refreshSummary() {
  const container = document.getElementById('summaryCards');
  if (!container) return;

  const targets = [1,2,3,4,5].map(n => {
    const el = document.getElementById(`target${n}`);
    return el ? (parseInt(el.value) || 0) : 0;
  });
  const counts = [1,2,3,4,5].map(n => state[n].length);
  const units  = [1,2,3,4,5].map(n => SECTIONS[n].unit);

  // Kemaskini KPI count box per bahagian
  [1,2,3,4,5].forEach((n, i) => {
    const box = document.getElementById(`kpi${n}Box`);
    if (!box) return;
    box.textContent = `${counts[i]} ${units[i]}`;
    box.className = 'kpi-count-box ' + kpiClass(counts[i], targets[i]);
  });

  // Keseluruhan
  const grandTotal  = counts.reduce((a, b) => a + b, 0);
  const grandTarget = targets.reduce((a, b) => a + b, 0);
  const grandPct    = grandTarget > 0 ? Math.min(Math.round((grandTotal / grandTarget) * 100), 100) : 0;
  const grandColor  = grandTarget > 0 ? ragColor(grandPct) : '#6c757d';

  const icons = ['🎓','🤝','💡','🔬','📋'];
  const names = ['Latihan','Sumbangan','Inovasi','Research','Tugas Sampingan'];

  const cards = [1,2,3,4,5].map((n, i) => {
    const c = counts[i], t = targets[i];
    const pct   = t > 0 ? Math.min(Math.round((c / t) * 100), 100) : (c > 0 ? 100 : 0);
    const color = t > 0 ? ragColor(pct) : '#6c757d';
    const bar   = t > 0
      ? `<div class="card-bar"><div class="card-bar-fill" style="width:${pct}%;background:${color};transition:width 0.5s"></div></div>`
      : '';
    return `<div class="card" style="border-top-color:${color}">
      <div class="card-title">${icons[i]} ${names[i]}</div>
      <div class="card-metric" style="color:${color}">${c}<span style="font-size:0.9rem;font-weight:500;color:var(--color-muted)"> / ${t > 0 ? t : '—'}</span></div>
      <div class="card-sub">${t > 0 ? ragLabel(c, t) : c + ' rekod'}</div>
      ${bar}
    </div>`;
  });

  container.innerHTML = `
    <div class="card" style="border-top-color:${grandColor}">
      <div class="card-title">📊 Keseluruhan KPI</div>
      <div class="card-metric" style="color:${grandColor}">${grandPct}<span style="font-size:1rem;font-weight:500">%</span></div>
      <div class="card-sub">${grandTotal} daripada ${grandTarget} sasaran &nbsp;·&nbsp; ${ragLabel(grandTotal, grandTarget)}</div>
      <div class="card-bar"><div class="card-bar-fill" style="width:${grandPct}%;background:${grandColor};transition:width 0.5s"></div></div>
    </div>
    ${cards.join('')}`;
}

/* =============================================
   Init
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  const now = new Date();
  const el = document.getElementById('headerDate');
  if (el) el.textContent = now.toLocaleDateString('ms-MY', { weekday:'long', day:'numeric', month:'long', year:'numeric' });

  const fy = document.getElementById('footerYear');
  if (fy) fy.textContent = 'Hak Cipta \u00A9 ' + now.getFullYear();

  refreshSummary();
});

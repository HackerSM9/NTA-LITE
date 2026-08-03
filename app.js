/**
 * SM9-CBT
 * Fixed JSON schema v1.0 — Official NTA CBT Behavior & Clean Results
 */
(function () {
  "use strict";

  // ─────────────────────────────────────────────────────────────
  // Constants
  // ─────────────────────────────────────────────────────────────
  const SCHEMA_VERSION = "1.0";
  const MARKING = Object.freeze({ correct: 4, incorrect: -1, unattempted: 0 });
  const VALID_TYPES = Object.freeze([
    "single_correct",
    "multiple_correct",
    "integer_numerical",
  ]);
  const VALID_PATTERNS = Object.freeze(["JEE_MAIN", "JEE_ADVANCED", "CUSTOM"]);

  const TYPE_LABELS = {
    single_correct: "SINGLE CHOICE",
    multiple_correct: "MULTIPLE CHOICE",
    integer_numerical: "INTEGER ANSWER",
  };

  // ─────────────────────────────────────────────────────────────
  // Sample paper
  // ─────────────────────────────────────────────────────────────
  const SAMPLE_PAPER = {
    schemaVersion: "1.0",
    appName: "SM9 CBT",
    exam: {
      examId: "4050367_B PLANNING 6TH JAN 2020 Shift 2 Set 2",
      examTitle: "JEE Main Demo Examination",
      examPattern: "JEE_MAIN",
      createdAt: "2026-07-27T00:00:00.000Z",
      durationMinutes: 180,
      sectionOrder: ["PHYSICS", "CHEMISTRY", "MATHEMATICS"],
      markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
    },
    questions: [
      {
        id: "P1",
        section: "PHYSICS",
        type: "single_correct",
        number: 1,
        stem: "A body of mass 2 kg is moving with a velocity of 10 m/s. Its kinetic energy is:",
        options: [
          { key: "A", text: "50 J" },
          { key: "B", text: "100 J" },
          { key: "C", text: "200 J" },
          { key: "D", text: "20 J" },
        ],
        answer: { correctKeys: ["B"] },
        explanation: "K.E. = (1/2)mv² = (1/2)×2×100 = 100 J.",
        marks: { correct: 4, incorrect: -1 },
      },
      {
        id: "P2",
        section: "PHYSICS",
        type: "multiple_correct",
        number: 2,
        stem: "Which of the following are units of energy? (Select all that apply)",
        options: [
          { key: "A", text: "Joule" },
          { key: "B", text: "Newton-metre" },
          { key: "C", text: "Watt" },
          { key: "D", text: "Electron-volt" },
        ],
        answer: { correctKeys: ["A", "B", "D"] },
        explanation: "Watt is power. Joule, Newton-metre and eV are energy units.",
        marks: { correct: 4, incorrect: -1 },
      },
      {
        id: "P3",
        section: "PHYSICS",
        type: "integer_numerical",
        number: 3,
        stem: "The dimensional formula of force is [Mᵃ Lᵇ Tᶜ]. The value of a + b + |c| is:",
        options: [],
        answer: { value: 4, tolerance: 0 },
        explanation: "Force = [MLT⁻²] ⇒ a=1, b=1, c=−2 ⇒ 1+1+2 = 4.",
        marks: { correct: 4, incorrect: -1 },
      },

      {
        id: "C1",
        section: "CHEMISTRY",
        type: "single_correct",
        number: 4,
        stem: "The oxidation number of Cr in K₂Cr₂O₇ is:",
        options: [
          { key: "A", text: "+3" },
          { key: "B", text: "+6" },
          { key: "C", text: "+7" },
          { key: "D", text: "+2" },
        ],
        answer: { correctKeys: ["B"] },
        explanation: "2(+1) + 2(x) + 7(−2) = 0 ⇒ x = +6.",
        marks: { correct: 4, incorrect: -1 },
      },
      {
        id: "C2",
        section: "CHEMISTRY",
        type: "multiple_correct",
        number: 5,
        stem: "Which of the following are colligative properties?",
        options: [
          { key: "A", text: "Relative lowering of vapour pressure" },
          { key: "B", text: "Elevation in boiling point" },
          { key: "C", text: "Depression in freezing point" },
          { key: "D", text: "Optical activity" },
        ],
        answer: { correctKeys: ["A", "B", "C"] },
        explanation: "Optical activity is an intrinsic property, not colligative.",
        marks: { correct: 4, incorrect: -1 },
      },
      {
        id: "C3",
        section: "CHEMISTRY",
        type: "integer_numerical",
        number: 6,
        stem: "The number of moles of oxygen atoms in 88 g of CO₂ is: (Atomic mass C=12, O=16)",
        options: [],
        answer: { value: 4, tolerance: 0 },
        explanation: "88g / 44g/mol = 2 moles CO₂ ⇒ 4 moles O atoms.",
        marks: { correct: 4, incorrect: -1 },
      },

      {
        id: "M1",
        section: "MATHEMATICS",
        type: "single_correct",
        number: 7,
        stem: "If A = {1, 2, 3} and B = {2, 3, 4}, then n(A ∪ B) equals:",
        options: [
          { key: "A", text: "3" },
          { key: "B", text: "4" },
          { key: "C", text: "5" },
          { key: "D", text: "6" },
        ],
        answer: { correctKeys: ["B"] },
        explanation: "A ∪ B = {1,2,3,4} ⇒ size is 4.",
        marks: { correct: 4, incorrect: -1 },
      },
      {
        id: "M2",
        section: "MATHEMATICS",
        type: "multiple_correct",
        number: 8,
        stem: "Which of the following numbers are prime?",
        options: [
          { key: "A", text: "17" },
          { key: "B", text: "21" },
          { key: "C", text: "29" },
          { key: "D", text: "33" },
        ],
        answer: { correctKeys: ["A", "C"] },
        explanation: "17 and 29 are prime numbers.",
        marks: { correct: 4, incorrect: -1 },
      },
      {
        id: "M3",
        section: "MATHEMATICS",
        type: "integer_numerical",
        number: 9,
        stem: "The value of ∫₀¹ 2x dx is:",
        options: [],
        answer: { value: 1, tolerance: 0 },
        explanation: "∫₀¹ 2x dx = [x²]₀¹ = 1.",
        marks: { correct: 4, incorrect: -1 },
      },

    ],
  };

  // ─────────────────────────────────────────────────────────────
  // State
  // ─────────────────────────────────────────────────────────────
  let paper = null;
  let questions = [];
  
  // Confirmed responses: qid -> { selectedKeys: [], numerical: "", marked: false, visited: false, timeSpentSec: 0 }
  let responses = {};
  
  // Unsaved draft inputs while looking at current question:
  let stagedDrafts = {}; // qid -> { selectedKeys: [], numerical: "" }

  let currentIndex = 0;
  let remainingSeconds = 0;
  let totalDurationSeconds = 0;
  let timerId = null;
  let questionTimerId = null;
  let examStartedAt = null;
  let examEndedAt = null;
  let phase = "load";
  let resultData = null;
  let pendingJsonText = "";
  let activeAnswerKeySubject = "";

  // ─────────────────────────────────────────────────────────────
  // DOM helpers
  // ─────────────────────────────────────────────────────────────
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function showScreen(id) {
    $$(".screen").forEach((s) => s.classList.remove("active"));
    const el = document.getElementById(id);
    if (el) el.classList.add("active");
    phase = id.replace("screen-", "");
    applyStageTheme();
  }

  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatTime(totalSec) {
    const s = Math.max(0, Math.floor(totalSec));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(h)}:${pad(m)}:${pad(sec)}`;
  }

  function formatSecsToMinSec(secCount) {
    const s = Math.max(0, Math.floor(secCount || 0));
    const m = Math.floor(s / 60);
    const sec = s % 60;
    if (m > 0) return `${m}m ${sec}s`;
    return `${sec}s`;
  }

  // ─────────────────────────────────────────────────────────────
  // Theme handling
  // ─────────────────────────────────────────────────────────────
  // Stage defaults: load/results keep the dark gradient theme,
  // instructions/exam default to the NTA light theme. The global
  // toggle overrides the theme for the current stage on demand;
  // that override is remembered if the same stage is revisited,
  // while other stages keep applying their own defaults.
  const STAGE_DEFAULT_THEME = Object.freeze({
    load: "dark",
    error: "dark",
    instructions: "light",
    exam: "light",
    result: "dark",
  });

  // Manual overrides chosen via the toggle: stage -> "dark" | "light"
  const stageThemeOverrides = {};

  function getTheme() {
    return document.documentElement.getAttribute("data-theme") === "light"
      ? "light"
      : "dark";
  }

  function setTheme(theme) {
    const next = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    const btn = $("#theme-toggle");
    if (btn) {
      btn.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
      btn.title = next === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
    }
  }

  function applyStageTheme() {
    setTheme(stageThemeOverrides[phase] || STAGE_DEFAULT_THEME[phase] || "dark");
  }

  function toggleTheme() {
    const next = getTheme() === "dark" ? "light" : "dark";
    stageThemeOverrides[phase] = next;
    setTheme(next);
  }

  // ─────────────────────────────────────────────────────────────
  // Schema Validation
  // ─────────────────────────────────────────────────────────────
  function isPlainObject(v) {
    return v !== null && typeof v === "object" && !Array.isArray(v);
  }

  function isNonEmptyString(v) {
    return typeof v === "string" && v.trim().length > 0;
  }

  function isNumber(v) {
    return typeof v === "number" && Number.isFinite(v);
  }

  function validatePaper(data) {
    const errors = [];
    if (!isPlainObject(data)) return { ok: false, errors: ["Root value must be an object."], data: null };
    if (data.schemaVersion !== SCHEMA_VERSION) errors.push(`schemaVersion must be "${SCHEMA_VERSION}".`);
    if (!isNonEmptyString(data.appName)) errors.push("appName must be a non-empty string.");
    if (!isPlainObject(data.exam)) errors.push("exam must be an object.");
    if (!Array.isArray(data.questions) || data.questions.length === 0) {
      errors.push("questions must be a non-empty array.");
    } else {
      data.questions.forEach((question, index) => {
        if (!isPlainObject(question)) {
          errors.push(`questions[${index}] must be an object.`);
        } else if (!VALID_TYPES.includes(question.type)) {
          errors.push(`questions[${index}].type is not supported.`);
        }
      });
    }
    return { ok: errors.length === 0, errors, data: errors.length === 0 ? data : null };
  }

  function parseAndValidate(text) {
    try {
      return validatePaper(JSON.parse(text));
    } catch (err) {
      return { ok: false, errors: [`Invalid JSON syntax: ${err.message}`], data: null };
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Response Helpers
  // ─────────────────────────────────────────────────────────────
  function ensureResponse(qid) {
    if (!responses[qid]) {
      responses[qid] = {
        selectedKeys: [],
        numerical: "",
        marked: false,
        visited: false,
        timeSpentSec: 0,
      };
    }
    return responses[qid];
  }

  function ensureStagedDraft(qid) {
    if (!stagedDrafts[qid]) {
      const resp = ensureResponse(qid);
      stagedDrafts[qid] = {
        selectedKeys: [...(resp.selectedKeys || [])],
        numerical: resp.numerical || "",
      };
    }
    return stagedDrafts[qid];
  }

  function isAnswerSaved(q, resp) {
    if (!resp) return false;
    if (q.type === "integer_numerical") {
      return String(resp.numerical ?? "").trim() !== "";
    }
    return Array.isArray(resp.selectedKeys) && resp.selectedKeys.length > 0;
  }

  function getStatus(q, resp) {
    const visited = resp?.visited;
    const answered = isAnswerSaved(q, resp);
    const marked = !!resp?.marked;

    if (!visited) return "not-visited";
    if (answered && marked) return "answered-marked";
    if (marked) return "marked";
    if (answered) return "answered";
    return "not-answered";
  }

  function countStatuses() {
    const counts = {
      answered: 0,
      "not-answered": 0,
      "not-visited": 0,
      marked: 0,
      "answered-marked": 0,
    };
    questions.forEach((q) => {
      const st = getStatus(q, responses[q.id]);
      counts[st] = (counts[st] || 0) + 1;
    });
    return counts;
  }

  // ─────────────────────────────────────────────────────────────
  // Scoring
  // ─────────────────────────────────────────────────────────────
  function gradeQuestion(q, resp) {
    const correctPts = MARKING.correct;
    const incorrectPts = MARKING.incorrect;

    if (!isAnswerSaved(q, resp)) {
      return { status: "unattempted", marks: MARKING.unattempted };
    }

    if (q.type === "integer_numerical") {
      const raw = String(resp.numerical).trim();
      const num = Number(raw);
      if (!Number.isFinite(num)) {
        return { status: "incorrect", marks: incorrectPts };
      }
      const expected = q.answer.value;
      const tol = isNumber(q.answer.tolerance) ? Math.abs(q.answer.tolerance) : 0;
      const ok = Math.abs(num - expected) <= tol;
      return ok
        ? { status: "correct", marks: correctPts }
        : { status: "incorrect", marks: incorrectPts };
    }

    const selected = [...(resp.selectedKeys || [])].map(String).sort();
    const correct = [...(q.answer.correctKeys || [])].map(String).sort();
    const ok =
      selected.length === correct.length && selected.every((k, i) => k === correct[i]);
    return ok
      ? { status: "correct", marks: correctPts }
      : { status: "incorrect", marks: incorrectPts };
  }

  function computeResults() {
    const bySection = {};
    let totalScore = 0;
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    const maxScore = questions.length * MARKING.correct;
    const details = [];

    const sectionOrder =
      (paper.exam && paper.exam.sectionOrder) ||
      [...new Set(questions.map((q) => q.section))];

    sectionOrder.forEach((s) => {
      bySection[s] = { score: 0, correct: 0, incorrect: 0, unattempted: 0, total: 0, max: 0, timeSpentSec: 0 };
    });

    questions.forEach((q) => {
      const resp = responses[q.id] || {};
      const g = gradeQuestion(q, resp);
      totalScore += g.marks;
      if (g.status === "correct") correct++;
      else if (g.status === "incorrect") incorrect++;
      else unattempted++;

      if (!bySection[q.section]) {
        bySection[q.section] = { score: 0, correct: 0, incorrect: 0, unattempted: 0, total: 0, max: 0, timeSpentSec: 0 };
      }
      const sec = bySection[q.section];
      sec.score += g.marks;
      sec.total += 1;
      sec.max += MARKING.correct;
      sec[g.status] += 1;
      sec.timeSpentSec += (resp.timeSpentSec || 0);

      details.push({
        id: q.id,
        section: q.section,
        type: q.type,
        status: g.status,
        marks: g.marks,
        timeSpentSec: resp.timeSpentSec || 0,
        userAns: q.type === "integer_numerical" ? (resp.numerical || "") : (resp.selectedKeys || []).join(", "),
      });
    });

    const attempted = correct + incorrect;
    const accuracy = attempted === 0 ? 0 : Math.round((correct / attempted) * 100);
    const started = examStartedAt ? new Date(examStartedAt).getTime() : Date.now();
    const ended = examEndedAt ? new Date(examEndedAt).getTime() : Date.now();
    const timeTakenMs = Math.max(0, ended - started);

    return {
      totalScore,
      maxScore,
      correct,
      incorrect,
      unattempted,
      attempted,
      accuracy,
      timeTakenMs,
      bySection,
      sectionOrder,
      details,
    };
  }

  // ─────────────────────────────────────────────────────────────
  // Timers
  // ─────────────────────────────────────────────────────────────
  function stopTimer() {
    if (timerId) { clearInterval(timerId); timerId = null; }
    if (questionTimerId) { clearInterval(questionTimerId); questionTimerId = null; }
  }

  function updateTimerUI() {
    const el = $("#timer-value");
    if (el) el.textContent = formatTime(remainingSeconds);
  }

  function startTimer() {
    stopTimer();
    updateTimerUI();
    timerId = setInterval(() => {
      remainingSeconds -= 1;
      if (remainingSeconds <= 0) {
        remainingSeconds = 0;
        updateTimerUI();
        stopTimer();
        onTimeUp();
        return;
      }
      updateTimerUI();
    }, 1000);

    questionTimerId = setInterval(() => {
      if (phase === "exam" && questions[currentIndex]) {
        const qid = questions[currentIndex].id;
        const resp = ensureResponse(qid);
        resp.timeSpentSec = (resp.timeSpentSec || 0) + 1;
      }
    }, 1000);
  }

  function onTimeUp() {
    $("#modal-timeup").hidden = false;
    finalizeSubmission(true);
  }

  // ─────────────────────────────────────────────────────────────
  // Exam Setup
  // ─────────────────────────────────────────────────────────────
  function orderQuestions(data) {
    const order = data.exam.sectionOrder || [];
    const list = [...data.questions];
    list.sort((a, b) => {
      const ia = order.indexOf(a.section);
      const ib = order.indexOf(b.section);
      if (ia !== ib) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      return (a.number || 0) - (b.number || 0);
    });
    return list;
  }

  function preparePaper(data, opts = {}) {
    paper = data;
    questions = orderQuestions(data);
    responses = opts.responses || {};
    questions.forEach((q) => ensureResponse(q.id));
    currentIndex = opts.currentIndex ?? 0;
    totalDurationSeconds = (data.exam.durationMinutes || 180) * 60;
    remainingSeconds = opts.remainingSeconds != null ? opts.remainingSeconds : totalDurationSeconds;
    examStartedAt = opts.examStartedAt ?? null;
    examEndedAt = opts.examEndedAt ?? null;
    resultData = opts.resultData ?? null;
  }

  // ─────────────────────────────────────────────────────────────
  // Rendering — NTA Exam View
  // ─────────────────────────────────────────────────────────────
  function renderSectionTabs() {
    const host = $("#section-tabs");
    if (!host || !paper) return;
    const order = paper.exam.sectionOrder || [];
    const currentQ = questions[currentIndex];
    host.innerHTML = order
      .map((sec) => {
        const active = currentQ && currentQ.section === sec ? "active" : "";
        return `<button type="button" class="section-tab ${active}" data-section="${escapeHtml(
          sec
        )}">${escapeHtml(sec)}</button>`;
      })
      .join("");
  }

  function renderPalette() {
    const host = $("#palette-sections");
    if (!host || !paper) return;
    const order = paper.exam.sectionOrder || [];

    host.innerHTML = order
      .map((sec) => {
        const qs = questions
          .map((q, idx) => ({ q, idx }))
          .filter(({ q }) => q.section === sec);
        const buttons = qs
          .map(({ q, idx }) => {
            const st = getStatus(q, responses[q.id]);
            const cur = idx === currentIndex ? "icon-current" : "";
            const iconClass =
              st === "not-visited" ? "icon-not-visited" :
              st === "not-answered" ? "icon-not-answered" :
              st === "answered" ? "icon-answered" :
              st === "marked" ? "icon-marked" : "icon-answered-marked";

            return `<button type="button" class="palette-btn" data-index="${idx}" title="Question ${q.number}">
              <span class="nta-icon ${iconClass} ${cur}">${q.number < 10 ? '0' + q.number : q.number}</span>
            </button>`;
          })
          .join("");
        return `<div class="palette-section">
          <div class="palette-section-title">${escapeHtml(sec)}</div>
          <div class="palette-grid">${buttons}</div>
        </div>`;
      })
      .join("");

    const counts = countStatuses();
    $("#leg-answered").textContent = counts.answered;
    $("#leg-not-answered").textContent = counts["not-answered"];
    $("#leg-not-visited").textContent = counts["not-visited"];
    $("#leg-marked").textContent = counts.marked;
    $("#leg-answered-marked").textContent = counts["answered-marked"];
  }

  function renderQuestion() {
    const q = questions[currentIndex];
    if (!q) return;

    // Mark as visited
    const resp = ensureResponse(q.id);
    resp.visited = true;

    // Load uncommitted staged draft from saved answer or current draft
    const draft = ensureStagedDraft(q.id);

    $("#q-num").textContent = `Question ${q.number}`;
    $("#q-type-badge").textContent = TYPE_LABELS[q.type] || q.type;
    $("#q-section-badge").textContent = q.section;
    $("#q-stem").textContent = q.stem || "";

    const optArea = $("#options-area");
    const numArea = $("#numerical-area");

    if (q.type === "integer_numerical") {
      optArea.innerHTML = "";
      numArea.hidden = false;
      const input = $("#num-input");
      input.value = draft.numerical || "";
    } else {
      numArea.hidden = true;
      const selected = new Set(draft.selectedKeys || []);
      optArea.innerHTML = (q.options || [])
        .map((opt) => {
          const sel = selected.has(opt.key) ? "selected" : "";
          return `<div class="option-item ${sel}" data-key="${escapeHtml(opt.key)}">
            <div class="option-radio"></div>
            <span class="option-key">${escapeHtml(opt.key)})</span>
            <span class="option-text">${escapeHtml(opt.text)}</span>
          </div>`;
        })
        .join("");
    }

    renderSectionTabs();
    renderPalette();
  }

  // ─────────────────────────────────────────────────────────────
  // Action Handlers
  // ─────────────────────────────────────────────────────────────
  function selectOption(key) {
    const q = questions[currentIndex];
    if (!q || q.type === "integer_numerical") return;
    const draft = ensureStagedDraft(q.id);
    const multi = q.type === "multiple_correct";

    if (multi) {
      const set = new Set(draft.selectedKeys || []);
      if (set.has(key)) set.delete(key);
      else set.add(key);
      draft.selectedKeys = [...set];
    } else {
      if (draft.selectedKeys.includes(key)) {
        draft.selectedKeys = [];
      } else {
        draft.selectedKeys = [key];
      }
    }
    renderQuestion();
  }

  function handleClear() {
    const q = questions[currentIndex];
    if (!q) return;
    
    // Clear draft stage
    stagedDrafts[q.id] = { selectedKeys: [], numerical: "" };
    
    // Clear saved response as well
    const resp = ensureResponse(q.id);
    resp.selectedKeys = [];
    resp.numerical = "";
    resp.marked = false;

    renderQuestion();
  }

  function commitAndNavigate({ saveAnswer = false, setMark = false, moveDir = 1 } = {}) {
    const q = questions[currentIndex];
    if (!q) return;

    const resp = ensureResponse(q.id);
    const draft = stagedDrafts[q.id];

    if (saveAnswer) {
      if (q.type === "integer_numerical") {
        const val = $("#num-input") ? $("#num-input").value : draft.numerical;
        resp.numerical = val;
      } else {
        resp.selectedKeys = [...(draft?.selectedKeys || [])];
      }
      resp.marked = setMark;
    } else {
      // Just set mark without saving draft unless already answered
      if (setMark) resp.marked = true;
      // Revert unsaved draft back to saved state when navigating away without saving
      stagedDrafts[q.id] = {
        selectedKeys: [...(resp.selectedKeys || [])],
        numerical: resp.numerical || "",
      };
    }

    const nextIdx = currentIndex + moveDir;
    if (nextIdx >= 0 && nextIdx < questions.length) {
      currentIndex = nextIdx;
    }
    renderQuestion();
  }

  // ─────────────────────────────────────────────────────────────
  // Submit & Finalize
  // ─────────────────────────────────────────────────────────────
  function openSubmitModal() {
    const counts = countStatuses();
    const total = questions.length;
    const answered = counts.answered + counts["answered-marked"];
    const marked = counts.marked + counts["answered-marked"];
    const notAns = counts["not-answered"] + counts["not-visited"];

    $("#submit-summary").innerHTML = `
      <div class="row"><span>Total questions:</span><span>${total}</span></div>
      <div class="row"><span>Answered:</span><span>${answered}</span></div>
      <div class="row"><span>Not Answered:</span><span>${notAns}</span></div>
      <div class="row"><span>Marked for Review:</span><span>${marked}</span></div>
    `;
    $("#modal-submit").hidden = false;
  }

  function closeSubmitModal() {
    $("#modal-submit").hidden = true;
  }

  function finalizeSubmission(fromTimeUp) {
    stopTimer();
    closeSubmitModal();
    examEndedAt = new Date().toISOString();
    if (!examStartedAt) examStartedAt = examEndedAt;
    resultData = computeResults();
    phase = "result";
    renderResultDashboard();
    if (!fromTimeUp) {
      $("#modal-timeup").hidden = true;
      showScreen("screen-result");
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Render Result Dashboard & Answer Key
  // ─────────────────────────────────────────────────────────────
  function renderResultDashboard() {
    if (!resultData || !paper) return;

    $("#report-exam-title-head").textContent = paper.exam.examTitle || "JEE MAIN TEST_DEMO";
    
    // Card 1: Test Summary
    $("#r-stat-date").textContent = new Date(examStartedAt || Date.now()).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
    $("#r-stat-time").textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    $("#r-stat-duration").textContent = `${paper.exam.durationMinutes || 180} mins`;
    $("#r-stat-timetaken").textContent = formatSecsToMinSec(resultData.timeTakenMs / 1000);

    // Card 2: Test Results
    $("#r-res-score").textContent = `${resultData.totalScore}/${resultData.maxScore}`;
    $("#r-res-correct").textContent = resultData.correct;
    $("#r-res-incorrect").textContent = resultData.incorrect;
    $("#r-res-skipped").textContent = resultData.unattempted;
    $("#r-res-accuracy").textContent = `${resultData.accuracy}%`;

    // Card 3: Section Summary
    const secTbody = $("#r-sec-tbody");
    secTbody.innerHTML = (resultData.sectionOrder || Object.keys(resultData.bySection))
      .filter((s) => resultData.bySection[s])
      .map((s) => {
        const sec = resultData.bySection[s];
        return `<tr>
          <td><strong>${escapeHtml(s)}</strong></td>
          <td>${sec.total}</td>
          <td>${formatSecsToMinSec(sec.timeSpentSec)}</td>
          <td class="txt-green">${sec.correct}</td>
          <td class="txt-red">${sec.incorrect}</td>
          <td class="txt-orange">${sec.unattempted}</td>
          <td><strong>${sec.score}</strong> / ${sec.max}</td>
        </tr>`;
      })
      .join("");

    // Card 4: Answer Key Tabs
    const subjects = resultData.sectionOrder || ["PHYSICS", "CHEMISTRY", "MATHEMATICS"];
    if (!activeAnswerKeySubject || !subjects.includes(activeAnswerKeySubject)) {
      activeAnswerKeySubject = subjects[0];
    }

    const tabsHost = $("#answer-key-subject-tabs");
    tabsHost.innerHTML = subjects
      .map(
        (sub) =>
          `<button type="button" class="ak-tab ${
            sub === activeAnswerKeySubject ? "active" : ""
          }" data-subject="${escapeHtml(sub)}">${escapeHtml(sub)}</button>`
      )
      .join("");

    renderAnswerKeyTable();
  }

  function renderAnswerKeyTable() {
    if (!resultData) return;
    const tbody = $("#r-answerkey-tbody");
    const subQuestions = questions.filter((q) => q.section === activeAnswerKeySubject);

    tbody.innerHTML = subQuestions
      .map((q) => {
        const resp = responses[q.id] || {};
        const g = gradeQuestion(q, resp);
        const correctStr = q.type === "integer_numerical" ? q.answer.value : (q.answer.correctKeys || []).join(", ");
        
        let userAnsStr = "Not Answered";
        if (isAnswerSaved(q, resp)) {
          userAnsStr = q.type === "integer_numerical" ? resp.numerical : (resp.selectedKeys || []).join(", ");
        }

        const scoreClass = g.marks > 0 ? "txt-green" : g.marks < 0 ? "txt-red" : "";
        const scoreBadge = `<span class="${scoreClass}"><strong>${g.marks > 0 ? '+' + g.marks : g.marks}</strong></span>`;

        return `<tr>
          <td>${q.number}</td>
          <td>${TYPE_LABELS[q.type] || q.type}</td>
          <td>${scoreBadge}</td>
          <td><strong class="txt-green">${escapeHtml(correctStr)}</strong></td>
          <td>
            <span class="${g.status === 'correct' ? 'txt-green' : g.status === 'incorrect' ? 'txt-red' : ''}">${escapeHtml(userAnsStr)}</span>
            <span style="color:#8b949e; font-size:11px; margin-left:6px;">(${formatSecsToMinSec(resp.timeSpentSec)})</span>
          </td>
          <td>
            <button type="button" class="btn-view-detail" data-qid="${q.id}">
              👁 View
            </button>
          </td>
        </tr>`;
      })
      .join("");
  }

  function showQuestionDetailModal(qid) {
    const q = questions.find((item) => item.id === qid);
    if (!q) return;

    const resp = responses[q.id] || {};
    const g = gradeQuestion(q, resp);

    $("#qd-qnum").textContent = `Question ${q.number}`;
    $("#qd-subject").textContent = q.section;
    $("#qd-type").textContent = TYPE_LABELS[q.type] || q.type;
    $("#qd-stem").textContent = q.stem || "";

    const optArea = $("#qd-options");
    const numArea = $("#qd-numerical");

    if (q.type === "integer_numerical") {
      optArea.innerHTML = "";
      numArea.hidden = false;
      numArea.innerHTML = `<div class="review-num-row">
        <div>User Entered: <strong>${escapeHtml(resp.numerical || "—")}</strong></div>
        <div>Correct Answer: <strong class="txt-green">${escapeHtml(q.answer.value)}</strong></div>
      </div>`;
    } else {
      numArea.hidden = true;
      const userSelected = new Set(resp.selectedKeys || []);
      const correctKeys = new Set(q.answer.correctKeys || []);

      optArea.innerHTML = (q.options || [])
        .map((opt) => {
          const isUser = userSelected.has(opt.key);
          const isCorrect = correctKeys.has(opt.key);
          let borderCls = "";
          if (isCorrect) borderCls = "style='border-color:#3fb950; background:rgba(46,160,67,0.1);'";
          else if (isUser && !isCorrect) borderCls = "style='border-color:#f85149; background:rgba(248,81,73,0.1);'";

          return `<div class="option-item" ${borderCls}>
            <span class="option-key">${escapeHtml(opt.key)})</span>
            <span class="option-text">${escapeHtml(opt.text)}</span>
            ${isCorrect ? '<span class="txt-green" style="font-weight:bold;">[Correct]</span>' : ''}
            ${isUser && !isCorrect ? '<span class="txt-red" style="font-weight:bold;">[Your Choice]</span>' : ''}
          </div>`;
        })
        .join("");
    }

    let userAnsText = "Not Answered";
    if (isAnswerSaved(q, resp)) {
      userAnsText = q.type === "integer_numerical" ? resp.numerical : (resp.selectedKeys || []).join(", ");
    }
    const correctText = q.type === "integer_numerical" ? q.answer.value : (q.answer.correctKeys || []).join(", ");

    $("#qd-user-ans").textContent = userAnsText;
    $("#qd-correct-ans").textContent = correctText;
    $("#qd-score").textContent = `${g.marks > 0 ? '+' + g.marks : g.marks} marks (${g.status})`;

    const expBox = $("#qd-explanation-box");
    if (q.explanation) {
      expBox.hidden = false;
      $("#qd-explanation-text").textContent = q.explanation;
    } else {
      expBox.hidden = true;
    }

    $("#modal-q-detail").hidden = false;
  }

  // ─────────────────────────────────────────────────────────────
  // Event Bindings
  // ─────────────────────────────────────────────────────────────
  function bindEvents() {
    // Global Theme Toggle — switches the color theme for the current stage
    $("#theme-toggle").addEventListener("click", toggleTheme);

    // Tabs on Load Screen
    $$(".import-tabs .tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        $$(".import-tabs .tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        const name = tab.dataset.tab;
        $$(".import-panel").forEach((p) => p.classList.remove("active"));
        const panel = document.getElementById(`panel-${name}`);
        if (panel) panel.classList.add("active");
      });
    });

    // File Upload
    const fileInput = $("#file-input");
    fileInput.addEventListener("change", () => {
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;
      $("#file-name").textContent = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        pendingJsonText = String(reader.result || "");
        $("#json-input").value = pendingJsonText;
      };
      reader.readAsText(file);
    });

    // Load Sample Paper Button
    $("#btn-load-sample").addEventListener("click", () => {
      const text = JSON.stringify(SAMPLE_PAPER, null, 2);
      $("#json-input").value = text;
      pendingJsonText = text;
      $("#validation-msg").hidden = false;
      $("#validation-msg").className = "validation-msg ok";
      $("#validation-msg").textContent = "Sample paper loaded! Click Start Examination.";
      $$(".import-tabs .tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === "paste"));
      $$(".import-panel").forEach((p) => p.classList.toggle("active", p.id === "panel-paste"));
    });

    // Validate JSON Button
    $("#btn-validate").addEventListener("click", () => {
      const text = $("#json-input").value.trim() || pendingJsonText;
      if (!text) return;
      const result = parseAndValidate(text);
      const msg = $("#validation-msg");
      msg.hidden = false;
      if (result.ok) {
        msg.className = "validation-msg ok";
        msg.textContent = `Valid Schema v1.0 — ${result.data.exam.examTitle} (${result.data.questions.length} Questions)`;
      } else {
        msg.className = "validation-msg err";
        msg.textContent = `Validation Error: ${result.errors[0]}`;
      }
    });

    // Start Exam Button
    $("#btn-start").addEventListener("click", () => {
      const text = $("#json-input").value.trim() || pendingJsonText;
      if (!text) return;
      const result = parseAndValidate(text);
      if (!result.ok) {
        $("#error-list").innerHTML = result.errors.map((e) => `<li>${escapeHtml(e)}</li>`).join("");
        showScreen("screen-error");
        return;
      }
      preparePaper(result.data);
      $("#instr-exam-title-text").textContent = result.data.exam.examTitle;
      $("#instr-duration-text").textContent = result.data.exam.durationMinutes || 180;
      $("#agree-check").checked = false;
      $("#btn-begin-exam").disabled = true;
      showScreen("screen-instructions");
    });

    $("#btn-error-back").addEventListener("click", () => showScreen("screen-load"));
    $("#btn-instr-back").addEventListener("click", () => showScreen("screen-load"));

    $("#agree-check").addEventListener("change", (e) => {
      $("#btn-begin-exam").disabled = !e.target.checked;
    });

    // Begin Exam Proceed
    $("#btn-begin-exam").addEventListener("click", () => {
      if (!$("#agree-check").checked) return;
      examStartedAt = new Date().toISOString();
      $("#exam-display-name").textContent = paper.exam.examTitle || "JEE-Main";
      $("#exam-subject-display").textContent = paper.exam.examId || "3001_JEE MAIN DEMO";
      showScreen("screen-exam");
      renderQuestion();
      startTimer();
    });

    // Option Selection
    $("#options-area").addEventListener("click", (e) => {
      const item = e.target.closest(".option-item");
      if (!item) return;
      selectOption(item.dataset.key);
    });

    // Numerical Input Event
    $("#num-input").addEventListener("input", (e) => {
      const q = questions[currentIndex];
      if (!q) return;
      const draft = ensureStagedDraft(q.id);
      let v = e.target.value.replace(/[^\d.\-]/g, "");
      e.target.value = v;
      draft.numerical = v;
    });

    // NTA Navigation Action Buttons
    $("#btn-save-next").addEventListener("click", () => commitAndNavigate({ saveAnswer: true, setMark: false, moveDir: 1 }));
    $("#btn-save-mark").addEventListener("click", () => commitAndNavigate({ saveAnswer: true, setMark: true, moveDir: 1 }));
    $("#btn-mark-next").addEventListener("click", () => commitAndNavigate({ saveAnswer: false, setMark: true, moveDir: 1 }));
    $("#btn-clear").addEventListener("click", () => handleClear());
    
    $("#btn-prev").addEventListener("click", () => commitAndNavigate({ saveAnswer: false, moveDir: -1 }));
    $("#btn-next").addEventListener("click", () => commitAndNavigate({ saveAnswer: false, moveDir: 1 }));

    // Palette Click
    $("#palette-sections").addEventListener("click", (e) => {
      const btn = e.target.closest(".palette-btn");
      if (!btn) return;
      const idx = Number(btn.dataset.index);
      if (Number.isInteger(idx)) {
        commitAndNavigate({ saveAnswer: false, moveDir: idx - currentIndex });
      }
    });

    // Toggle Side Palette
    $("#btn-toggle-palette").addEventListener("click", () => {
      const container = $("#exam-layout-container");
      container.classList.toggle("collapsed");
      $("#btn-toggle-palette").textContent = container.classList.contains("collapsed") ? "<" : ">";
    });

    // Submit Modal Events
    $("#btn-submit-exam").addEventListener("click", openSubmitModal);
    $("#btn-cancel-submit").addEventListener("click", closeSubmitModal);
    $("#btn-confirm-submit").addEventListener("click", () => finalizeSubmission(false));

    $("#btn-timeup-ok").addEventListener("click", () => {
      $("#modal-timeup").hidden = true;
      showScreen("screen-result");
      renderResultDashboard();
    });

    // Answer Key Subject Tabs
    $("#answer-key-subject-tabs").addEventListener("click", (e) => {
      const tab = e.target.closest(".ak-tab");
      if (!tab) return;
      activeAnswerKeySubject = tab.dataset.subject;
      renderResultDashboard();
    });

    // Answer Key Detail View Button Click
    $("#r-answerkey-tbody").addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-view-detail");
      if (!btn) return;
      showQuestionDetailModal(btn.dataset.qid);
    });

    // Close Question Detail Modal
    $("#btn-close-qd").addEventListener("click", () => $("#modal-q-detail").hidden = true);
    $("#modal-q-backdrop").addEventListener("click", () => $("#modal-q-detail").hidden = true);

    // New Test / Load Another Paper Button
    $("#btn-new-test").addEventListener("click", () => {
      stopTimer();
      paper = null;
      questions = [];
      responses = {};
      stagedDrafts = {};
      resultData = null;
      $("#json-input").value = "";
      $("#validation-msg").hidden = true;
      showScreen("screen-load");
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Boot
  // ─────────────────────────────────────────────────────────────
  function boot() {
    bindEvents();
    showScreen("screen-load");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

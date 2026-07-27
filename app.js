/**
 * NTA JEE Exam Simulator
 * Fixed JSON schema v1.0 only — no dynamic schema evolution.
 */
(function () {
  "use strict";

  // ─────────────────────────────────────────────────────────────
  // Constants
  // ─────────────────────────────────────────────────────────────
  const SCHEMA_VERSION = "1.0";
  const STORAGE_KEY = "nta_jee_sim_v1_session";
  const MARKING = Object.freeze({ correct: 4, incorrect: -1, unattempted: 0 });
  const VALID_TYPES = Object.freeze([
    "single_correct",
    "multiple_correct",
    "integer_numerical",
    "assertion_reason",
  ]);
  const VALID_PATTERNS = Object.freeze(["JEE_MAIN", "JEE_ADVANCED", "CUSTOM"]);
  const VALID_SECTIONS = Object.freeze(["PHYSICS", "CHEMISTRY", "MATHEMATICS", "OTHER"]);

  const TYPE_LABELS = {
    single_correct: "Single Correct",
    multiple_correct: "Multiple Correct",
    integer_numerical: "Numerical",
    assertion_reason: "Assertion-Reason",
  };

  // ─────────────────────────────────────────────────────────────
  // Sample paper (schema v1.0)
  // ─────────────────────────────────────────────────────────────
  const SAMPLE_PAPER = {
    schemaVersion: "1.0",
    appName: "JEE Simulator",
    exam: {
      examId: "JEE-MAIN-DEMO-001",
      examTitle: "JEE Main Demo Examination",
      examPattern: "JEE_MAIN",
      createdAt: "2026-07-27T00:00:00.000Z",
      durationMinutes: 30,
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
        explanation: "Watt is a unit of power (J/s), not energy. Joule, N·m and eV are energy units.",
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
        explanation: "Force = [MLT⁻²] ⇒ a=1, b=1, c=−2 ⇒ a+b+|c| = 1+1+2 = 4.",
        marks: { correct: 4, incorrect: -1 },
      },
      {
        id: "P4",
        section: "PHYSICS",
        type: "assertion_reason",
        number: 4,
        stem: "Choose the correct option regarding Assertion (A) and Reason (R).",
        assertion: "The acceleration due to gravity decreases with altitude.",
        reason: "Gravitational force is inversely proportional to the square of the distance from the centre of the Earth.",
        options: [
          { key: "A", text: "Both A and R are true, and R is the correct explanation of A." },
          { key: "B", text: "Both A and R are true, but R is not the correct explanation of A." },
          { key: "C", text: "A is true, but R is false." },
          { key: "D", text: "A is false, but R is true." },
        ],
        answer: { correctKeys: ["A"] },
        explanation: "g' = GM/(R+h)² decreases with h. R correctly explains A via inverse-square law.",
        marks: { correct: 4, incorrect: -1 },
      },
      {
        id: "C1",
        section: "CHEMISTRY",
        type: "single_correct",
        number: 5,
        stem: "The oxidation number of Cr in K₂Cr₂O₇ is:",
        options: [
          { key: "A", text: "+3" },
          { key: "B", text: "+6" },
          { key: "C", text: "+7" },
          { key: "D", text: "+2" },
        ],
        answer: { correctKeys: ["B"] },
        explanation: "2(+1) + 2(x) + 7(−2) = 0 ⇒ 2 + 2x − 14 = 0 ⇒ x = +6.",
        marks: { correct: 4, incorrect: -1 },
      },
      {
        id: "C2",
        section: "CHEMISTRY",
        type: "multiple_correct",
        number: 6,
        stem: "Which of the following are colligative properties?",
        options: [
          { key: "A", text: "Relative lowering of vapour pressure" },
          { key: "B", text: "Elevation in boiling point" },
          { key: "C", text: "Depression in freezing point" },
          { key: "D", text: "Optical activity" },
        ],
        answer: { correctKeys: ["A", "B", "C"] },
        explanation: "Colligative properties depend on the number of solute particles, not their nature. Optical activity is not colligative.",
        marks: { correct: 4, incorrect: -1 },
      },
      {
        id: "C3",
        section: "CHEMISTRY",
        type: "integer_numerical",
        number: 7,
        stem: "The number of moles of oxygen atoms in 88 g of CO₂ is: (Atomic mass C=12, O=16)",
        options: [],
        answer: { value: 4, tolerance: 0 },
        explanation: "Moles of CO₂ = 88/44 = 2. Each CO₂ has 2 O atoms ⇒ moles of O atoms = 4.",
        marks: { correct: 4, incorrect: -1 },
      },
      {
        id: "C4",
        section: "CHEMISTRY",
        type: "assertion_reason",
        number: 8,
        stem: "Choose the correct option regarding Assertion (A) and Reason (R).",
        assertion: "Ionisation enthalpy of nitrogen is greater than that of oxygen.",
        reason: "Nitrogen has a half-filled p-orbital configuration which is more stable.",
        options: [
          { key: "A", text: "Both A and R are true, and R is the correct explanation of A." },
          { key: "B", text: "Both A and R are true, but R is not the correct explanation of A." },
          { key: "C", text: "A is true, but R is false." },
          { key: "D", text: "A is false, but R is true." },
        ],
        answer: { correctKeys: ["A"] },
        explanation: "N (2p³ half-filled) is more stable than O (2p⁴), so IE(N) > IE(O). R correctly explains A.",
        marks: { correct: 4, incorrect: -1 },
      },
      {
        id: "M1",
        section: "MATHEMATICS",
        type: "single_correct",
        number: 9,
        stem: "If A = {1, 2, 3} and B = {2, 3, 4}, then n(A ∪ B) equals:",
        options: [
          { key: "A", text: "3" },
          { key: "B", text: "4" },
          { key: "C", text: "5" },
          { key: "D", text: "6" },
        ],
        answer: { correctKeys: ["B"] },
        explanation: "A ∪ B = {1,2,3,4} ⇒ n(A ∪ B) = 4.",
        marks: { correct: 4, incorrect: -1 },
      },
      {
        id: "M2",
        section: "MATHEMATICS",
        type: "multiple_correct",
        number: 10,
        stem: "Which of the following numbers are prime?",
        options: [
          { key: "A", text: "17" },
          { key: "B", text: "21" },
          { key: "C", text: "29" },
          { key: "D", text: "33" },
        ],
        answer: { correctKeys: ["A", "C"] },
        explanation: "17 and 29 are prime. 21 = 3×7, 33 = 3×11.",
        marks: { correct: 4, incorrect: -1 },
      },
      {
        id: "M3",
        section: "MATHEMATICS",
        type: "integer_numerical",
        number: 11,
        stem: "The value of ∫₀¹ 2x dx is:",
        options: [],
        answer: { value: 1, tolerance: 0 },
        explanation: "∫₀¹ 2x dx = [x²]₀¹ = 1.",
        marks: { correct: 4, incorrect: -1 },
      },
      {
        id: "M4",
        section: "MATHEMATICS",
        type: "assertion_reason",
        number: 12,
        stem: "Choose the correct option regarding Assertion (A) and Reason (R).",
        assertion: "The function f(x) = x³ is strictly increasing on ℝ.",
        reason: "f'(x) = 3x² ≥ 0 for all x ∈ ℝ and f'(x) = 0 only at an isolated point.",
        options: [
          { key: "A", text: "Both A and R are true, and R is the correct explanation of A." },
          { key: "B", text: "Both A and R are true, but R is not the correct explanation of A." },
          { key: "C", text: "A is true, but R is false." },
          { key: "D", text: "A is false, but R is true." },
        ],
        answer: { correctKeys: ["A"] },
        explanation: "f'(x)=3x²≥0 and vanishes only at x=0 (isolated). Hence f is strictly increasing on ℝ.",
        marks: { correct: 4, incorrect: -1 },
      },
    ],
  };

  // ─────────────────────────────────────────────────────────────
  // State
  // ─────────────────────────────────────────────────────────────
  /** @type {any} */
  let paper = null;
  /** @type {Array<any>} */
  let questions = [];
  /** @type {Record<string, any>} */
  let responses = {}; // qid -> { selectedKeys?: string[], numerical?: string, marked?: boolean, visited?: boolean }
  let currentIndex = 0;
  let remainingSeconds = 0;
  let totalDurationSeconds = 0;
  let timerId = null;
  let examStartedAt = null;
  let examEndedAt = null;
  let phase = "load"; // load | instructions | exam | result | review
  let reviewIndex = 0;
  /** @type {any} */
  let resultData = null;
  let pendingJsonText = "";

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

  function formatDuration(ms) {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}h ${m}m ${sec}s`;
    if (m > 0) return `${m}m ${sec}s`;
    return `${sec}s`;
  }

  // ─────────────────────────────────────────────────────────────
  // JSON Validation — fixed schema v1.0
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

  /**
   * Validate fixed schema v1.0. Returns { ok, errors, data }.
   * Does NOT mutate field names or invent schema variants.
   */
  function validatePaper(data) {
    const errors = [];

    if (!isPlainObject(data)) {
      return { ok: false, errors: ["Root value must be a JSON object."], data: null };
    }

    if (data.schemaVersion !== SCHEMA_VERSION) {
      errors.push(
        `schemaVersion must be exactly "${SCHEMA_VERSION}" (got ${JSON.stringify(data.schemaVersion)}).`
      );
    }

    if (!isNonEmptyString(data.appName)) {
      errors.push('appName must be a non-empty string.');
    }

    if (!isPlainObject(data.exam)) {
      errors.push("exam must be an object.");
    } else {
      const e = data.exam;
      if (!isNonEmptyString(e.examId)) errors.push("exam.examId must be a non-empty string.");
      if (!isNonEmptyString(e.examTitle)) errors.push("exam.examTitle must be a non-empty string.");
      if (!isNonEmptyString(e.examPattern)) {
        errors.push("exam.examPattern must be a non-empty string.");
      } else if (!VALID_PATTERNS.includes(e.examPattern) && e.examPattern !== "JEE_MAIN") {
        // Allow known patterns; still accept any non-empty string for forward display, but warn on empty only.
        // Contract: examPattern is string — JEE_MAIN is the primary expected value.
      }
      if (!isNonEmptyString(e.createdAt)) {
        errors.push("exam.createdAt must be an ISO-8601 string.");
      } else if (Number.isNaN(Date.parse(e.createdAt))) {
        errors.push("exam.createdAt must be a valid ISO-8601 date-time.");
      }
      if (!isNumber(e.durationMinutes) || e.durationMinutes <= 0 || !Number.isInteger(e.durationMinutes)) {
        errors.push("exam.durationMinutes must be a positive integer.");
      }
      if (!Array.isArray(e.sectionOrder) || e.sectionOrder.length === 0) {
        errors.push("exam.sectionOrder must be a non-empty array of section names.");
      } else {
        e.sectionOrder.forEach((s, i) => {
          if (!isNonEmptyString(s)) errors.push(`exam.sectionOrder[${i}] must be a non-empty string.`);
        });
      }
      if (!isPlainObject(e.markingScheme)) {
        errors.push("exam.markingScheme must be an object.");
      } else {
        const m = e.markingScheme;
        if (m.correct !== MARKING.correct) {
          errors.push(`exam.markingScheme.correct must be ${MARKING.correct}.`);
        }
        if (m.incorrect !== MARKING.incorrect) {
          errors.push(`exam.markingScheme.incorrect must be ${MARKING.incorrect}.`);
        }
        if (m.unattempted !== MARKING.unattempted) {
          errors.push(`exam.markingScheme.unattempted must be ${MARKING.unattempted}.`);
        }
      }
    }

    if (!Array.isArray(data.questions) || data.questions.length === 0) {
      errors.push("questions must be a non-empty array.");
    } else {
      const ids = new Set();
      data.questions.forEach((q, i) => {
        const p = `questions[${i}]`;
        if (!isPlainObject(q)) {
          errors.push(`${p} must be an object.`);
          return;
        }
        if (!isNonEmptyString(q.id)) errors.push(`${p}.id must be a non-empty string.`);
        else if (ids.has(q.id)) errors.push(`${p}.id "${q.id}" is duplicated.`);
        else ids.add(q.id);

        if (!isNonEmptyString(q.section)) errors.push(`${p}.section must be a non-empty string.`);
        if (!VALID_TYPES.includes(q.type)) {
          errors.push(
            `${p}.type must be one of: ${VALID_TYPES.join(", ")} (got ${JSON.stringify(q.type)}).`
          );
        }
        if (!isNumber(q.number) || !Number.isInteger(q.number) || q.number < 1) {
          errors.push(`${p}.number must be a positive integer.`);
        }
        if (typeof q.stem !== "string") errors.push(`${p}.stem must be a string.`);

        if (q.type === "assertion_reason") {
          if (typeof q.assertion !== "string" || !q.assertion.trim()) {
            errors.push(`${p}.assertion is required for assertion_reason.`);
          }
          if (typeof q.reason !== "string" || !q.reason.trim()) {
            errors.push(`${p}.reason is required for assertion_reason.`);
          }
        }

        const needsOptions =
          q.type === "single_correct" ||
          q.type === "multiple_correct" ||
          q.type === "assertion_reason";

        if (needsOptions) {
          if (!Array.isArray(q.options) || q.options.length < 2) {
            errors.push(`${p}.options must be an array with at least 2 options.`);
          } else {
            const keys = new Set();
            q.options.forEach((opt, j) => {
              if (!isPlainObject(opt)) {
                errors.push(`${p}.options[${j}] must be an object.`);
                return;
              }
              if (!isNonEmptyString(opt.key)) errors.push(`${p}.options[${j}].key is required.`);
              else if (keys.has(opt.key)) errors.push(`${p}.options[${j}].key "${opt.key}" is duplicated.`);
              else keys.add(opt.key);
              if (typeof opt.text !== "string") errors.push(`${p}.options[${j}].text must be a string.`);
            });
          }
        } else if (q.type === "integer_numerical") {
          if (q.options != null && !Array.isArray(q.options)) {
            errors.push(`${p}.options must be an array when provided.`);
          }
        }

        // Answer object is required in the paper JSON but NEVER shown until review.
        if (!isPlainObject(q.answer)) {
          errors.push(`${p}.answer must be an object (hidden until submission).`);
        } else if (q.type === "integer_numerical") {
          if (!isNumber(q.answer.value)) {
            errors.push(`${p}.answer.value must be a number for integer_numerical.`);
          }
          if (q.answer.tolerance != null && !isNumber(q.answer.tolerance)) {
            errors.push(`${p}.answer.tolerance must be a number when present.`);
          }
        } else if (
          q.type === "single_correct" ||
          q.type === "multiple_correct" ||
          q.type === "assertion_reason"
        ) {
          if (!Array.isArray(q.answer.correctKeys) || q.answer.correctKeys.length === 0) {
            errors.push(`${p}.answer.correctKeys must be a non-empty array of option keys.`);
          } else {
            const optKeys = new Set((q.options || []).map((o) => o.key));
            q.answer.correctKeys.forEach((k) => {
              if (!optKeys.has(k)) {
                errors.push(`${p}.answer.correctKeys contains unknown key "${k}".`);
              }
            });
            if (q.type === "single_correct" || q.type === "assertion_reason") {
              if (q.answer.correctKeys.length !== 1) {
                errors.push(`${p}.answer.correctKeys must contain exactly one key for ${q.type}.`);
              }
            }
          }
        }

        if (q.explanation != null && typeof q.explanation !== "string") {
          errors.push(`${p}.explanation must be a string when present.`);
        }

        if (q.marks != null) {
          if (!isPlainObject(q.marks)) errors.push(`${p}.marks must be an object when present.`);
          else {
            if (q.marks.correct != null && q.marks.correct !== MARKING.correct) {
              errors.push(`${p}.marks.correct must be ${MARKING.correct} when present.`);
            }
            if (q.marks.incorrect != null && q.marks.incorrect !== MARKING.incorrect) {
              errors.push(`${p}.marks.incorrect must be ${MARKING.incorrect} when present.`);
            }
          }
        }
      });
    }

    return { ok: errors.length === 0, errors, data: errors.length === 0 ? data : null };
  }

  function parseAndValidate(text) {
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      return {
        ok: false,
        errors: [`Invalid JSON syntax: ${err.message}`],
        data: null,
      };
    }
    return validatePaper(parsed);
  }

  // ─────────────────────────────────────────────────────────────
  // Response helpers
  // ─────────────────────────────────────────────────────────────
  function ensureResponse(qid) {
    if (!responses[qid]) {
      responses[qid] = {
        selectedKeys: [],
        numerical: "",
        marked: false,
        visited: false,
      };
    }
    return responses[qid];
  }

  function isAnswered(q, resp) {
    if (!resp) return false;
    if (q.type === "integer_numerical") {
      return String(resp.numerical ?? "").trim() !== "";
    }
    return Array.isArray(resp.selectedKeys) && resp.selectedKeys.length > 0;
  }

  function getStatus(q, resp, isCurrent) {
    // Returns palette status class
    const visited = resp?.visited || isCurrent;
    const answered = isAnswered(q, resp);
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
    questions.forEach((q, idx) => {
      const st = getStatus(q, responses[q.id], idx === currentIndex);
      // For legend, NTA separates marked categories; "not-answered" means visited but blank.
      if (st === "not-visited") counts["not-visited"]++;
      else if (st === "answered") counts.answered++;
      else if (st === "not-answered") counts["not-answered"]++;
      else if (st === "marked") counts.marked++;
      else if (st === "answered-marked") counts["answered-marked"]++;
    });
    return counts;
  }

  // ─────────────────────────────────────────────────────────────
  // Persistence
  // ─────────────────────────────────────────────────────────────
  function saveSession() {
    if (!paper || phase === "load" || phase === "error") return;
    try {
      const payload = {
        version: 1,
        savedAt: new Date().toISOString(),
        phase: phase === "instructions" ? "instructions" : phase === "exam" ? "exam" : phase,
        paper,
        responses,
        currentIndex,
        remainingSeconds,
        totalDurationSeconds,
        examStartedAt,
        examEndedAt,
        resultData,
        reviewIndex,
      };
      // Do not persist after final result if user finished — still OK to keep for review resume.
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (_) {
      /* quota / private mode */
    }
  }

  function loadSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || !data.paper) return null;
      const v = validatePaper(data.paper);
      if (!v.ok) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return data;
    } catch (_) {
      return null;
    }
  }

  function clearSession() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {}
  }

  function autosaveSoon() {
    // Debounced lightly via micro-batching with rAF
    if (autosaveSoon._raf) return;
    autosaveSoon._raf = requestAnimationFrame(() => {
      autosaveSoon._raf = 0;
      saveSession();
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Scoring — fixed marking scheme
  // ─────────────────────────────────────────────────────────────
  function gradeQuestion(q, resp) {
    const correctPts = MARKING.correct;
    const incorrectPts = MARKING.incorrect;

    if (!isAnswered(q, resp)) {
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

    // single / multiple / assertion_reason — exact set match
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
      bySection[s] = { score: 0, correct: 0, incorrect: 0, unattempted: 0, total: 0, max: 0 };
    });

    questions.forEach((q) => {
      const resp = responses[q.id];
      const g = gradeQuestion(q, resp);
      totalScore += g.marks;
      if (g.status === "correct") correct++;
      else if (g.status === "incorrect") incorrect++;
      else unattempted++;

      if (!bySection[q.section]) {
        bySection[q.section] = {
          score: 0,
          correct: 0,
          incorrect: 0,
          unattempted: 0,
          total: 0,
          max: 0,
        };
      }
      const sec = bySection[q.section];
      sec.score += g.marks;
      sec.total += 1;
      sec.max += MARKING.correct;
      sec[g.status] += 1;

      details.push({ id: q.id, status: g.status, marks: g.marks });
    });

    const attempted = correct + incorrect;
    const accuracy = attempted === 0 ? 0 : (correct / attempted) * 100;
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
  // Timer
  // ─────────────────────────────────────────────────────────────
  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function updateTimerUI() {
    const el = $("#timer-value");
    const box = $("#timer-box");
    if (!el || !box) return;
    el.textContent = formatTime(remainingSeconds);
    box.classList.remove("warn", "danger");
    if (remainingSeconds <= 60) box.classList.add("danger");
    else if (remainingSeconds <= 300) box.classList.add("warn");
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
      if (remainingSeconds % 15 === 0) saveSession();
    }, 1000);
  }

  function onTimeUp() {
    const modal = $("#modal-timeup");
    if (modal) modal.hidden = false;
    // Auto-finalize
    finalizeSubmission(true);
  }

  // ─────────────────────────────────────────────────────────────
  // Exam setup / teardown
  // ─────────────────────────────────────────────────────────────
  function orderQuestions(data) {
    const order = data.exam.sectionOrder || [];
    const list = [...data.questions];
    list.sort((a, b) => {
      const ia = order.indexOf(a.section);
      const ib = order.indexOf(b.section);
      const sa = ia === -1 ? 999 : ia;
      const sb = ib === -1 ? 999 : ib;
      if (sa !== sb) return sa - sb;
      return (a.number || 0) - (b.number || 0);
    });
    return list;
  }

  function initResponses() {
    responses = {};
    questions.forEach((q) => {
      responses[q.id] = {
        selectedKeys: [],
        numerical: "",
        marked: false,
        visited: false,
      };
    });
  }

  function preparePaper(data, opts = {}) {
    paper = data;
    questions = orderQuestions(data);
    if (!opts.keepResponses) initResponses();
    currentIndex = opts.currentIndex ?? 0;
    totalDurationSeconds = (data.exam.durationMinutes || 180) * 60;
    remainingSeconds =
      opts.remainingSeconds != null ? opts.remainingSeconds : totalDurationSeconds;
    examStartedAt = opts.examStartedAt ?? null;
    examEndedAt = opts.examEndedAt ?? null;
    resultData = opts.resultData ?? null;
    reviewIndex = opts.reviewIndex ?? 0;
  }

  // ─────────────────────────────────────────────────────────────
  // Rendering — Exam
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
    const sectionsPresent = order.filter((s) => questions.some((q) => q.section === s));
    // Include any sections not listed
    questions.forEach((q) => {
      if (!sectionsPresent.includes(q.section)) sectionsPresent.push(q.section);
    });

    host.innerHTML = sectionsPresent
      .map((sec) => {
        const qs = questions
          .map((q, idx) => ({ q, idx }))
          .filter(({ q }) => q.section === sec);
        const buttons = qs
          .map(({ q, idx }) => {
            const st = getStatus(q, responses[q.id], idx === currentIndex);
            const cur = idx === currentIndex ? "current" : "";
            return `<button type="button" class="palette-btn" data-index="${idx}" title="Question ${
              q.number
            }" aria-label="Question ${q.number}, ${st}">
              <span class="q-pill ${st} ${cur}">${q.number}</span>
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
    const setLeg = (id, n) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(n);
    };
    setLeg("leg-answered", counts.answered);
    setLeg("leg-not-answered", counts["not-answered"]);
    setLeg("leg-not-visited", counts["not-visited"]);
    setLeg("leg-marked", counts.marked);
    setLeg("leg-answered-marked", counts["answered-marked"]);
  }

  function renderQuestion() {
    const q = questions[currentIndex];
    if (!q) return;
    const resp = ensureResponse(q.id);
    resp.visited = true;

    $("#q-num").textContent = `Question ${q.number}`;
    $("#q-type-badge").textContent = TYPE_LABELS[q.type] || q.type;
    $("#q-section-badge").textContent = q.section;
    $("#q-stem").textContent = q.stem || "";

    const arBlock = $("#assertion-block");
    if (q.type === "assertion_reason") {
      arBlock.hidden = false;
      $("#ar-assertion").textContent = q.assertion || "";
      $("#ar-reason").textContent = q.reason || "";
    } else {
      arBlock.hidden = true;
    }

    const optArea = $("#options-area");
    const numArea = $("#numerical-area");

    if (q.type === "integer_numerical") {
      optArea.innerHTML = "";
      numArea.hidden = false;
      const input = $("#num-input");
      input.value = resp.numerical || "";
      // focus without scrolling jump on mobile
    } else {
      numArea.hidden = true;
      const multi = q.type === "multiple_correct";
      const selected = new Set(resp.selectedKeys || []);
      optArea.innerHTML = (q.options || [])
        .map((opt) => {
          const sel = selected.has(opt.key) ? "selected" : "";
          return `<button type="button" class="option-item ${sel}" data-key="${escapeHtml(
            opt.key
          )}" role="${multi ? "checkbox" : "radio"}" aria-checked="${selected.has(opt.key)}">
            <span class="option-key">${escapeHtml(opt.key)}</span>
            <span class="option-text">${escapeHtml(opt.text)}</span>
          </button>`;
        })
        .join("");
    }

    $("#btn-prev").disabled = currentIndex <= 0;
    $("#btn-next").disabled = currentIndex >= questions.length - 1;

    renderSectionTabs();
    renderPalette();
    autosaveSoon();
  }

  function goToIndex(idx) {
    if (idx < 0 || idx >= questions.length) return;
    // snapshot current numerical field
    flushCurrentInput();
    currentIndex = idx;
    renderQuestion();
  }

  function flushCurrentInput() {
    const q = questions[currentIndex];
    if (!q) return;
    if (q.type === "integer_numerical") {
      const input = $("#num-input");
      if (input) {
        const resp = ensureResponse(q.id);
        resp.numerical = input.value;
      }
    }
  }

  function selectOption(key) {
    const q = questions[currentIndex];
    if (!q || q.type === "integer_numerical") return;
    const resp = ensureResponse(q.id);
    const multi = q.type === "multiple_correct";
    if (multi) {
      const set = new Set(resp.selectedKeys || []);
      if (set.has(key)) set.delete(key);
      else set.add(key);
      resp.selectedKeys = [...set];
    } else {
      resp.selectedKeys = [key];
    }
    renderQuestion();
  }

  function clearResponse() {
    const q = questions[currentIndex];
    if (!q) return;
    const resp = ensureResponse(q.id);
    resp.selectedKeys = [];
    resp.numerical = "";
    const input = $("#num-input");
    if (input) input.value = "";
    renderQuestion();
  }

  function saveAndNext({ mark = false } = {}) {
    flushCurrentInput();
    const q = questions[currentIndex];
    if (q) {
      const resp = ensureResponse(q.id);
      if (mark) resp.marked = true;
      // Save & Next does not clear mark; Mark for Review sets mark.
      // If user clicks Save & Next after marking, keep mark (NTA behaviour: mark persists until cleared).
    }
    if (currentIndex < questions.length - 1) {
      currentIndex += 1;
    }
    renderQuestion();
  }

  function markForReviewAndNext() {
    saveAndNext({ mark: true });
  }

  // ─────────────────────────────────────────────────────────────
  // Submit flow
  // ─────────────────────────────────────────────────────────────
  function openSubmitModal() {
    flushCurrentInput();
    const counts = countStatuses();
    const host = $("#submit-summary");
    const total = questions.length;
    const answered = counts.answered + counts["answered-marked"];
    const marked = counts.marked + counts["answered-marked"];
    const notAns = counts["not-answered"] + counts["not-visited"];
    host.innerHTML = `
      <div class="row"><span>Total questions</span><span>${total}</span></div>
      <div class="row"><span>Answered</span><span>${answered}</span></div>
      <div class="row"><span>Not answered</span><span>${notAns}</span></div>
      <div class="row"><span>Marked for review</span><span>${marked}</span></div>
    `;
    $("#modal-submit").hidden = false;
  }

  function closeSubmitModal() {
    $("#modal-submit").hidden = true;
  }

  function finalizeSubmission(fromTimeUp) {
    flushCurrentInput();
    stopTimer();
    closeSubmitModal();
    examEndedAt = new Date().toISOString();
    if (!examStartedAt) examStartedAt = examEndedAt;
    resultData = computeResults();
    phase = "result";
    saveSession();
    renderResult();
    if (!fromTimeUp) {
      $("#modal-timeup").hidden = true;
      showScreen("screen-result");
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Result + Review
  // ─────────────────────────────────────────────────────────────
  function renderResult() {
    if (!resultData || !paper) return;
    $("#result-title").textContent = paper.exam.examTitle || "Result";
    $("#result-meta").textContent = `${paper.exam.examId} · ${paper.exam.examPattern} · Submitted`;

    $("#score-value").textContent = String(resultData.totalScore);
    $("#score-max").textContent = `/ ${resultData.maxScore}`;

    $("#score-stats").innerHTML = `
      <div class="score-stat"><div class="lbl">Correct</div><div class="val good">${resultData.correct}</div></div>
      <div class="score-stat"><div class="lbl">Incorrect</div><div class="val bad">${resultData.incorrect}</div></div>
      <div class="score-stat"><div class="lbl">Unattempted</div><div class="val mid">${resultData.unattempted}</div></div>
      <div class="score-stat"><div class="lbl">Accuracy</div><div class="val">${resultData.accuracy.toFixed(1)}%</div></div>
      <div class="score-stat"><div class="lbl">Time Taken</div><div class="val" style="font-size:16px">${escapeHtml(
        formatDuration(resultData.timeTakenMs)
      )}</div></div>
      <div class="score-stat"><div class="lbl">Attempted</div><div class="val">${resultData.attempted} / ${
      questions.length
    }</div></div>
    `;

    const secHost = $("#section-scores");
    secHost.innerHTML = (resultData.sectionOrder || Object.keys(resultData.bySection))
      .filter((s) => resultData.bySection[s])
      .map((s) => {
        const sec = resultData.bySection[s];
        return `<div class="section-score-card">
          <h4>${escapeHtml(s)}</h4>
          <div class="big">${sec.score}<span style="font-size:14px;color:var(--text-mute)"> / ${
          sec.max
        }</span></div>
          <div class="mini">
            <span>✓ ${sec.correct}</span>
            <span>✗ ${sec.incorrect}</span>
            <span>– ${sec.unattempted}</span>
          </div>
        </div>`;
      })
      .join("");
  }

  function renderReviewPalette() {
    const host = $("#r-palette-sections");
    if (!host || !resultData) return;
    const detailMap = {};
    resultData.details.forEach((d) => {
      detailMap[d.id] = d;
    });
    const order = paper.exam.sectionOrder || [];
    const sectionsPresent = order.filter((s) => questions.some((q) => q.section === s));
    questions.forEach((q) => {
      if (!sectionsPresent.includes(q.section)) sectionsPresent.push(q.section);
    });

    host.innerHTML = sectionsPresent
      .map((sec) => {
        const qs = questions
          .map((q, idx) => ({ q, idx }))
          .filter(({ q }) => q.section === sec);
        const buttons = qs
          .map(({ q, idx }) => {
            const d = detailMap[q.id] || { status: "unattempted" };
            const cls =
              d.status === "correct"
                ? "correct"
                : d.status === "incorrect"
                  ? "incorrect"
                  : "skipped";
            const cur = idx === reviewIndex ? "current" : "";
            return `<button type="button" class="palette-btn" data-rindex="${idx}">
              <span class="q-pill ${cls} ${cur}">${q.number}</span>
            </button>`;
          })
          .join("");
        return `<div class="palette-section">
          <div class="palette-section-title">${escapeHtml(sec)}</div>
          <div class="palette-grid">${buttons}</div>
        </div>`;
      })
      .join("");
  }

  function renderReviewQuestion() {
    const q = questions[reviewIndex];
    if (!q || !resultData) return;
    const resp = responses[q.id] || {
      selectedKeys: [],
      numerical: "",
    };
    const grade = gradeQuestion(q, resp);

    $("#rq-num").textContent = `Question ${q.number}`;
    $("#rq-type-badge").textContent = TYPE_LABELS[q.type] || q.type;
    $("#rq-section-badge").textContent = q.section;

    const verdict = $("#rq-verdict");
    verdict.textContent =
      grade.status === "correct"
        ? "Correct"
        : grade.status === "incorrect"
          ? "Incorrect"
          : "Unattempted";
    verdict.className = `verdict-badge ${grade.status}`;

    const markStr =
      grade.marks > 0 ? `+${grade.marks}` : grade.marks === 0 ? "0" : String(grade.marks);
    $("#rq-marks").innerHTML = `Score: <span class="${
      grade.marks > 0 ? "pos" : grade.marks < 0 ? "neg" : ""
    }">${markStr}</span>`;

    $("#rq-stem").textContent = q.stem || "";

    const arBlock = $("#r-assertion-block");
    if (q.type === "assertion_reason") {
      arBlock.hidden = false;
      $("#r-ar-assertion").textContent = q.assertion || "";
      $("#r-ar-reason").textContent = q.reason || "";
    } else {
      arBlock.hidden = true;
    }

    const optArea = $("#r-options-area");
    const numArea = $("#r-numerical-area");

    if (q.type === "integer_numerical") {
      optArea.innerHTML = "";
      numArea.hidden = false;
      const userVal =
        String(resp.numerical ?? "").trim() === "" ? "—" : String(resp.numerical);
      const tol =
        q.answer.tolerance != null ? ` (±${q.answer.tolerance})` : "";
      numArea.innerHTML = `
        <div class="review-num-row">
          <div class="pair"><div class="lbl">Your answer</div><div class="val ${
            grade.status === "correct" ? "good" : grade.status === "incorrect" ? "bad" : ""
          }" style="color:${
        grade.status === "correct"
          ? "var(--success)"
          : grade.status === "incorrect"
            ? "var(--danger)"
            : "var(--text-dim)"
      }">${escapeHtml(userVal)}</div></div>
          <div class="pair"><div class="lbl">Correct answer</div><div class="val" style="color:var(--success)">${escapeHtml(
            String(q.answer.value)
          )}${escapeHtml(tol)}</div></div>
        </div>`;
    } else {
      numArea.hidden = true;
      const selected = new Set(resp.selectedKeys || []);
      const correct = new Set(q.answer.correctKeys || []);
      optArea.innerHTML = (q.options || [])
        .map((opt) => {
          const isSel = selected.has(opt.key);
          const isCor = correct.has(opt.key);
          let cls = "option-item";
          let tag = "";
          if (isCor && isSel) {
            cls += " review-correct";
            tag = `<span class="option-tag correct-tag">Correct</span>`;
          } else if (isCor && !isSel) {
            cls += " review-missed";
            tag = `<span class="option-tag correct-tag">Correct</span>`;
          } else if (!isCor && isSel) {
            cls += " review-wrong";
            tag = `<span class="option-tag yours">Your choice</span>`;
          }
          return `<div class="${cls}">
            <span class="option-key">${escapeHtml(opt.key)}</span>
            <span class="option-text">${escapeHtml(opt.text)}</span>
            ${tag}
          </div>`;
        })
        .join("");
    }

    const expBox = $("#explanation-box");
    if (q.explanation && String(q.explanation).trim()) {
      expBox.hidden = false;
      $("#explanation-text").textContent = q.explanation;
    } else {
      expBox.hidden = true;
      $("#explanation-text").textContent = "";
    }

    $("#btn-r-prev").disabled = reviewIndex <= 0;
    $("#btn-r-next").disabled = reviewIndex >= questions.length - 1;

    $("#review-meta").textContent = `${paper.exam.examTitle} · Score ${resultData.totalScore}/${resultData.maxScore}`;

    renderReviewPalette();
  }

  // ─────────────────────────────────────────────────────────────
  // Instructions
  // ─────────────────────────────────────────────────────────────
  function showInstructions() {
    $("#instr-exam-title").textContent = paper.exam.examTitle;
    $("#instr-exam-meta").textContent = `${paper.exam.examPattern} · ${paper.exam.examId}`;
    const sections = paper.exam.sectionOrder || [];
    $("#instr-summary").innerHTML = `
      <div class="stat-chip"><div class="label">Questions</div><div class="value">${
        questions.length
      }</div></div>
      <div class="stat-chip"><div class="label">Duration</div><div class="value">${
        paper.exam.durationMinutes
      }m</div></div>
      <div class="stat-chip"><div class="label">Sections</div><div class="value" style="font-size:14px">${escapeHtml(
        sections.join(" · ")
      )}</div></div>
      <div class="stat-chip"><div class="label">Max Marks</div><div class="value">${
        questions.length * MARKING.correct
      }</div></div>
    `;
    $("#agree-check").checked = false;
    $("#btn-begin-exam").disabled = true;
    showScreen("screen-instructions");
    phase = "instructions";
    saveSession();
  }

  function beginExam() {
    if (!examStartedAt) examStartedAt = new Date().toISOString();
    $("#exam-title").textContent = paper.exam.examTitle;
    $("#exam-meta").textContent = `${paper.exam.examPattern} · Computer Based Test`;
    $("#exam-id-chip").textContent = paper.exam.examId;
    showScreen("screen-exam");
    phase = "exam";
    // Mark first as visited
    if (questions[currentIndex]) ensureResponse(questions[currentIndex].id).visited = true;
    renderQuestion();
    startTimer();
    saveSession();
  }

  // ─────────────────────────────────────────────────────────────
  // Load screen UI
  // ─────────────────────────────────────────────────────────────
  function setValidationMsg(ok, text) {
    const el = $("#validation-msg");
    if (!text) {
      el.hidden = true;
      el.textContent = "";
      el.className = "validation-msg";
      return;
    }
    el.hidden = false;
    el.textContent = text;
    el.className = `validation-msg ${ok ? "ok" : "err"}`;
  }

  function showErrorScreen(errors) {
    const list = $("#error-list");
    list.innerHTML = errors.map((e) => `<li>${escapeHtml(e)}</li>`).join("");
    showScreen("screen-error");
  }

  function tryStartFromText(text) {
    pendingJsonText = text;
    const result = parseAndValidate(text);
    if (!result.ok) {
      setValidationMsg(false, result.errors[0] || "Validation failed.");
      showErrorScreen(result.errors);
      return false;
    }
    setValidationMsg(true, `Valid schema v1.0 · ${result.data.questions.length} questions · ${result.data.exam.durationMinutes} min`);
    preparePaper(result.data);
    showInstructions();
    return true;
  }

  function checkResumeBanner() {
    const session = loadSession();
    const banner = $("#resume-banner");
    if (!session) {
      banner.hidden = true;
      return;
    }
    const title = session.paper?.exam?.examTitle || "Saved exam";
    const when = session.savedAt ? new Date(session.savedAt).toLocaleString() : "";
    const ph = session.phase || "exam";
    $("#resume-meta").textContent = `${title} · ${ph} · ${when}`;
    banner.hidden = false;
  }

  function resumeSession() {
    const session = loadSession();
    if (!session) return;
    preparePaper(session.paper, {
      keepResponses: true,
      currentIndex: session.currentIndex || 0,
      remainingSeconds: session.remainingSeconds,
      examStartedAt: session.examStartedAt,
      examEndedAt: session.examEndedAt,
      resultData: session.resultData,
      reviewIndex: session.reviewIndex || 0,
    });
    responses = session.responses || {};
    // Ensure all questions have response slots
    questions.forEach((q) => ensureResponse(q.id));

    if (session.phase === "result" && session.resultData) {
      resultData = session.resultData;
      renderResult();
      showScreen("screen-result");
      return;
    }
    if (session.phase === "review" && session.resultData) {
      resultData = session.resultData;
      reviewIndex = session.reviewIndex || 0;
      showScreen("screen-review");
      renderReviewQuestion();
      return;
    }
    if (session.phase === "instructions") {
      showInstructions();
      return;
    }
    // exam
    if (remainingSeconds == null || remainingSeconds <= 0) {
      // time already over
      finalizeSubmission(true);
      $("#modal-timeup").hidden = false;
      return;
    }
    beginExam();
  }

  // ─────────────────────────────────────────────────────────────
  // Events
  // ─────────────────────────────────────────────────────────────
  function bindEvents() {
    // Tabs
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

    // File upload
    const fileInput = $("#file-input");
    const dropzone = $("#dropzone");
    fileInput.addEventListener("change", () => {
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;
      $("#file-name").textContent = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        pendingJsonText = String(reader.result || "");
        $("#json-input").value = pendingJsonText;
        setValidationMsg(false, "");
      };
      reader.onerror = () => setValidationMsg(false, "Failed to read file.");
      reader.readAsText(file);
    });

    ["dragenter", "dragover"].forEach((ev) => {
      dropzone.addEventListener(ev, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add("dragover");
      });
    });
    ["dragleave", "drop"].forEach((ev) => {
      dropzone.addEventListener(ev, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove("dragover");
      });
    });
    dropzone.addEventListener("drop", (e) => {
      const file = e.dataTransfer?.files?.[0];
      if (!file) return;
      $("#file-name").textContent = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        pendingJsonText = String(reader.result || "");
        $("#json-input").value = pendingJsonText;
      };
      reader.readAsText(file);
    });

    $("#btn-load-sample").addEventListener("click", () => {
      const text = JSON.stringify(SAMPLE_PAPER, null, 2);
      $("#json-input").value = text;
      pendingJsonText = text;
      setValidationMsg(true, "Sample paper loaded into editor. Click Start Examination.");
      // switch to paste tab for visibility
      $$(".import-tabs .tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === "paste"));
      $$(".import-panel").forEach((p) => p.classList.toggle("active", p.id === "panel-paste"));
    });

    $("#btn-validate").addEventListener("click", () => {
      const text = $("#json-input").value.trim() || pendingJsonText;
      if (!text) {
        setValidationMsg(false, "Paste or upload a JSON paper first.");
        return;
      }
      const result = parseAndValidate(text);
      if (result.ok) {
        setValidationMsg(
          true,
          `✓ Valid schema v1.0 — "${result.data.exam.examTitle}" · ${result.data.questions.length} questions · ${result.data.exam.durationMinutes} minutes.`
        );
      } else {
        setValidationMsg(false, `✗ ${result.errors.length} error(s): ${result.errors[0]}`);
      }
    });

    $("#btn-start").addEventListener("click", () => {
      const text = $("#json-input").value.trim() || pendingJsonText;
      if (!text) {
        setValidationMsg(false, "Paste or upload a JSON paper first.");
        return;
      }
      clearSession();
      tryStartFromText(text);
    });

    $("#btn-error-back").addEventListener("click", () => {
      showScreen("screen-load");
      checkResumeBanner();
    });

    $("#btn-instr-back").addEventListener("click", () => {
      stopTimer();
      showScreen("screen-load");
      checkResumeBanner();
    });

    $("#agree-check").addEventListener("change", (e) => {
      $("#btn-begin-exam").disabled = !e.target.checked;
    });

    $("#btn-begin-exam").addEventListener("click", () => {
      if (!$("#agree-check").checked) return;
      beginExam();
    });

    // Exam controls
    $("#btn-prev").addEventListener("click", () => goToIndex(currentIndex - 1));
    $("#btn-next").addEventListener("click", () => {
      flushCurrentInput();
      goToIndex(currentIndex + 1);
    });
    $("#btn-save-next").addEventListener("click", () => saveAndNext({ mark: false }));
    $("#btn-mark").addEventListener("click", () => markForReviewAndNext());
    $("#btn-clear").addEventListener("click", () => clearResponse());

    $("#options-area").addEventListener("click", (e) => {
      const item = e.target.closest(".option-item");
      if (!item) return;
      selectOption(item.dataset.key);
    });

    $("#num-input").addEventListener("input", (e) => {
      const q = questions[currentIndex];
      if (!q) return;
      const resp = ensureResponse(q.id);
      // Allow digits, one dot, optional leading minus
      let v = e.target.value;
      v = v.replace(/[^\d.\-]/g, "");
      // keep only leading minus
      v = v.replace(/(?!^)-/g, "");
      // single decimal
      const parts = v.split(".");
      if (parts.length > 2) v = parts[0] + "." + parts.slice(1).join("");
      e.target.value = v;
      resp.numerical = v;
      // live palette update
      renderPalette();
      autosaveSoon();
    });

    $("#palette-sections").addEventListener("click", (e) => {
      const btn = e.target.closest(".palette-btn");
      if (!btn) return;
      const idx = Number(btn.dataset.index);
      if (Number.isInteger(idx)) goToIndex(idx);
    });

    $("#section-tabs").addEventListener("click", (e) => {
      const tab = e.target.closest(".section-tab");
      if (!tab) return;
      const sec = tab.dataset.section;
      const idx = questions.findIndex((q) => q.section === sec);
      if (idx >= 0) goToIndex(idx);
    });

    $("#btn-submit-exam").addEventListener("click", () => openSubmitModal());
    $("#btn-cancel-submit").addEventListener("click", () => closeSubmitModal());
    $("#btn-confirm-submit").addEventListener("click", () => finalizeSubmission(false));
    $("#modal-submit .modal-backdrop").addEventListener("click", () => closeSubmitModal());

    $("#btn-timeup-ok").addEventListener("click", () => {
      $("#modal-timeup").hidden = true;
      showScreen("screen-result");
      renderResult();
    });

    $("#btn-review").addEventListener("click", () => {
      reviewIndex = 0;
      phase = "review";
      showScreen("screen-review");
      renderReviewQuestion();
      saveSession();
    });

    $("#btn-new-test").addEventListener("click", () => {
      stopTimer();
      clearSession();
      paper = null;
      questions = [];
      responses = {};
      resultData = null;
      pendingJsonText = "";
      $("#json-input").value = "";
      $("#file-name").textContent = "";
      setValidationMsg(false, "");
      showScreen("screen-load");
      checkResumeBanner();
    });

    $("#btn-review-results").addEventListener("click", () => {
      phase = "result";
      showScreen("screen-result");
      renderResult();
      saveSession();
    });

    $("#btn-review-home").addEventListener("click", () => {
      $("#btn-new-test").click();
    });

    $("#btn-r-prev").addEventListener("click", () => {
      if (reviewIndex > 0) {
        reviewIndex -= 1;
        renderReviewQuestion();
        autosaveSoon();
      }
    });
    $("#btn-r-next").addEventListener("click", () => {
      if (reviewIndex < questions.length - 1) {
        reviewIndex += 1;
        renderReviewQuestion();
        autosaveSoon();
      }
    });

    $("#r-palette-sections").addEventListener("click", (e) => {
      const btn = e.target.closest(".palette-btn");
      if (!btn) return;
      const idx = Number(btn.dataset.rindex);
      if (Number.isInteger(idx)) {
        reviewIndex = idx;
        renderReviewQuestion();
        autosaveSoon();
      }
    });

    $("#btn-resume").addEventListener("click", () => resumeSession());
    $("#btn-discard").addEventListener("click", () => {
      clearSession();
      checkResumeBanner();
    });

    // Keyboard shortcuts (exam-like, minimal)
    document.addEventListener("keydown", (e) => {
      if (phase !== "exam") return;
      if (e.target.matches("input, textarea")) {
        if (e.key === "Enter" && e.target.id === "num-input") {
          e.preventDefault();
          saveAndNext();
        }
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        saveAndNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToIndex(currentIndex - 1);
      }
    });

    // Persist on hide
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") saveSession();
    });
    window.addEventListener("beforeunload", () => saveSession());
  }

  // ─────────────────────────────────────────────────────────────
  // Boot
  // ─────────────────────────────────────────────────────────────
  function boot() {
    bindEvents();
    checkResumeBanner();
    showScreen("screen-load");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

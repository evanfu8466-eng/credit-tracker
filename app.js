/* ============================================================
 * 實踐大學資管系 學分追蹤器 — 主程式
 * 資料來源：data/courses.js（window.COURSE_DATA）
 * ============================================================ */
(function () {
  "use strict";

  var DATA = window.COURSE_DATA;
  var STORAGE_KEY = "usc-im-credit-tracker-v1";

  var CATEGORY_ORDER = ["校必", "通識", "院必", "系必", "學程", "選修"];
  var CATEGORY_NAMES = {
    "校必": "校訂必修",
    "通識": "通識課程",
    "院必": "院訂必修",
    "系必": "系訂必修",
    "學程": "深化學程選修",
    "選修": "一般選修"
  };
  var YEAR_NAMES = { 1: "大一", 2: "大二", 3: "大三", 4: "大四" };
  var PROGRAM_COLORS = { cloud: "var(--accent)", ai: "var(--accent-2)" };

  var courseById = {};
  DATA.courses.forEach(function (c) { courseById[c.id] = c; });

  /* ---------------- 狀態：localStorage ---------------- */

  function defaultState() {
    var completed = {};
    DATA.courses.forEach(function (c) { if (c.done) completed[c.id] = true; });
    var thresholds = {};
    (DATA.thresholds || []).forEach(function (t) { thresholds[t.id] = !!t.done; });
    return { completed: completed, thresholds: thresholds };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return defaultState();
      return {
        completed: (parsed.completed && typeof parsed.completed === "object") ? parsed.completed : {},
        thresholds: (parsed.thresholds && typeof parsed.thresholds === "object") ? parsed.thresholds : {}
      };
    } catch (e) {
      return defaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* 私密模式等情況下無法儲存，僅影響保存 */ }
  }

  var state = loadState();

  /* ---------------- 學分計算（含認列上限） ---------------- */

  /** 計算一組課程中「已勾選」的認列學分，套用 capGroup 上限。
   *  回傳 { credits, cappedGroups: [群組名稱…] } */
  function earnedCredits(courses) {
    var total = 0;
    var groupSums = {};
    courses.forEach(function (c) {
      if (!state.completed[c.id]) return;
      if (c.capGroup && DATA.capGroups && DATA.capGroups[c.capGroup]) {
        groupSums[c.capGroup] = (groupSums[c.capGroup] || 0) + c.credits;
      } else {
        total += c.credits;
      }
    });
    var cappedGroups = [];
    Object.keys(groupSums).forEach(function (g) {
      var cap = DATA.capGroups[g];
      if (groupSums[g] > cap.max) {
        total += cap.max;
        cappedGroups.push(cap.name + "（超過上限，僅計 " + cap.max + " 學分）");
      } else {
        total += groupSums[g];
      }
    });
    return { credits: total, cappedGroups: cappedGroups };
  }

  /* ---------------- 畫面：總進度 ---------------- */

  function renderSummary() {
    var result = earnedCredits(DATA.courses);
    var earned = result.credits;
    var total = DATA.graduationCredits;
    var remaining = Math.max(0, total - earned);
    var percent = Math.min(100, Math.round(earned / total * 100));

    document.getElementById("hero-earned").textContent = earned;
    document.getElementById("hero-total").textContent = total;
    document.getElementById("stat-earned").textContent = earned;
    document.getElementById("stat-remaining").textContent = remaining;
    document.getElementById("stat-percent").textContent = percent + "%";

    var fill = document.getElementById("hero-fill");
    fill.style.width = Math.min(100, earned / total * 100) + "%";
    fill.classList.toggle("is-done", earned >= total);

    var meter = document.getElementById("hero-meter");
    meter.setAttribute("aria-valuenow", String(earned));
    meter.setAttribute("aria-valuemax", String(total));

    var capNote = document.getElementById("cap-note");
    if (result.cappedGroups.length) {
      capNote.hidden = false;
      capNote.textContent = "※ " + result.cappedGroups.join("；");
    } else {
      capNote.hidden = true;
    }
  }

  /* ---------------- 畫面：學程進度 ---------------- */

  function renderPrograms() {
    var wrap = document.getElementById("programs");
    wrap.textContent = "";

    DATA.programs.forEach(function (p) {
      var courses = DATA.courses.filter(function (c) { return c.program === p.id; });
      var earned = earnedCredits(courses).credits;
      var required = p.requiredCredits;
      var met = earned >= required;
      var missing = courses.filter(function (c) { return !state.completed[c.id]; });

      var card = el("section", "card program-card");
      card.setAttribute("aria-label", p.name);

      var head = el("div", "prog-head");
      var name = el("h2", "prog-name");
      var dot = el("span", "prog-dot");
      dot.style.background = PROGRAM_COLORS[p.id] || "var(--accent)";
      name.appendChild(dot);
      name.appendChild(document.createTextNode(p.name));
      var nums = el("span", "prog-nums");
      nums.innerHTML = "<strong>" + earned + "</strong> / " + required + " 學分";
      head.appendChild(name);
      head.appendChild(nums);
      card.appendChild(head);

      var meter = el("div", "meter");
      meter.setAttribute("role", "progressbar");
      meter.setAttribute("aria-valuemin", "0");
      meter.setAttribute("aria-valuemax", String(required));
      meter.setAttribute("aria-valuenow", String(earned));
      meter.setAttribute("aria-label", p.name + "進度");
      var fill = el("div", "meter-fill");
      fill.style.width = Math.min(100, earned / required * 100) + "%";
      if (met) fill.classList.add("is-done");
      else fill.style.background = PROGRAM_COLORS[p.id] || "var(--accent)";
      meter.appendChild(fill);
      card.appendChild(meter);

      var status = el("p", "prog-status");
      if (met) {
        status.classList.add("ok");
        status.textContent = "✓ 已達成學程學分門檻";
        card.appendChild(status);
      } else {
        status.textContent = "還差 " + (required - earned) + " 學分（於下列課程中任選修習）";
        card.appendChild(status);

        if (missing.length) {
          var mTitle = el("p", "missing-title");
          mTitle.textContent = "尚未修（" + missing.length + " 門）：";
          card.appendChild(mTitle);
          var list = el("ul", "missing-list");
          missing.forEach(function (c) {
            var li = document.createElement("li");
            li.textContent = c.name + "（" + c.credits + " 學分）";
            list.appendChild(li);
          });
          card.appendChild(list);
        }
      }

      wrap.appendChild(card);
    });
  }

  /* ---------------- 畫面：畢業門檻 ---------------- */

  function renderThresholds() {
    var wrap = document.getElementById("thresholds");
    wrap.textContent = "";
    (DATA.thresholds || []).forEach(function (t) {
      var pass = !!state.thresholds[t.id];
      var btn = el("button", "threshold-btn" + (pass ? " is-pass" : ""));
      btn.type = "button";
      btn.setAttribute("aria-pressed", String(pass));
      btn.textContent = (pass ? "✓ " : "✗ ") + t.name + (pass ? "：通過" : "：未通過");
      btn.addEventListener("click", function () {
        state.thresholds[t.id] = !state.thresholds[t.id];
        saveState();
        renderThresholds();
      });
      wrap.appendChild(btn);
    });
  }

  /* ---------------- 畫面：課程清單 ---------------- */

  function renderCourses() {
    var wrap = document.getElementById("course-list");
    wrap.textContent = "";

    var years = [1, 2, 3, 4];
    years.forEach(function (y) {
      var yearCourses = DATA.courses.filter(function (c) { return c.year === y; });
      if (!yearCourses.length) return;

      var section = el("section", "year-section");
      section.dataset.year = String(y);

      var head = el("div", "year-head");
      var h2 = document.createElement("h2");
      h2.textContent = YEAR_NAMES[y] || (y + "年級");
      var sub = el("span", "year-credits");
      head.appendChild(h2);
      head.appendChild(sub);
      section.appendChild(head);

      CATEGORY_ORDER.forEach(function (cat) {
        var catCourses = yearCourses.filter(function (c) { return c.category === cat; });
        if (!catCourses.length) return;

        var group = el("div", "cat-group");
        group.dataset.cat = cat;

        var catHead = el("div", "cat-head");
        var h3 = document.createElement("h3");
        h3.textContent = CATEGORY_NAMES[cat] || cat;
        var catSub = el("span", "cat-credits");
        catHead.appendChild(h3);
        catHead.appendChild(catSub);
        group.appendChild(catHead);

        var rows = el("div", "course-rows");
        catCourses.forEach(function (c) {
          rows.appendChild(buildRow(c));
        });
        group.appendChild(rows);
        section.appendChild(group);
      });

      wrap.appendChild(section);
    });

    updateSubtotals();
  }

  function buildRow(c) {
    var row = el("label", "course-row");
    row.dataset.id = c.id;

    var box = document.createElement("input");
    box.type = "checkbox";
    box.checked = !!state.completed[c.id];
    box.setAttribute("aria-label", c.name + "，" + c.credits + " 學分");
    box.addEventListener("change", function () {
      if (box.checked) state.completed[c.id] = true;
      else delete state.completed[c.id];
      saveState();
      row.classList.toggle("is-done", box.checked);
      renderSummary();
      renderPrograms();
      updateSubtotals();
    });
    row.appendChild(box);
    row.classList.toggle("is-done", box.checked);

    var main = el("div", "course-main");
    var name = el("span", "course-name");
    name.textContent = c.name;
    main.appendChild(name);

    var meta = el("div", "course-meta");
    meta.appendChild(badge(c.req, "req-" + c.req));
    if (c.program) {
      var p = programById(c.program);
      if (p) meta.appendChild(badge(p.name, "prog-" + c.program));
    }
    if (c.sem) meta.appendChild(badge(c.sem + " 學期", ""));
    main.appendChild(meta);

    if (c.note) {
      var note = el("span", "course-note");
      note.textContent = "※ " + c.note;
      main.appendChild(note);
    }
    row.appendChild(main);

    var credits = el("span", "course-credits");
    credits.textContent = c.credits + " 學分";
    row.appendChild(credits);

    return row;
  }

  function programById(id) {
    for (var i = 0; i < DATA.programs.length; i++) {
      if (DATA.programs[i].id === id) return DATA.programs[i];
    }
    return null;
  }

  /* 每個年級 / 類別小計；同時依目前篩選隱藏空群組 */
  function updateSubtotals() {
    var filter = document.body.dataset.filter || "all";

    document.querySelectorAll(".year-section").forEach(function (section) {
      var y = Number(section.dataset.year);
      var yearCourses = DATA.courses.filter(function (c) { return c.year === y; });
      var earned = earnedCredits(yearCourses).credits;
      var total = yearCourses.reduce(function (s, c) { return s + c.credits; }, 0);
      section.querySelector(".year-credits").textContent = "已修 " + earned + " / " + total + " 學分";

      var sectionVisible = 0;
      section.querySelectorAll(".cat-group").forEach(function (group) {
        var cat = group.dataset.cat;
        var catCourses = yearCourses.filter(function (c) { return c.category === cat; });
        var catEarned = earnedCredits(catCourses).credits;
        var catTotal = catCourses.reduce(function (s, c) { return s + c.credits; }, 0);
        group.querySelector(".cat-credits").textContent = catEarned + " / " + catTotal + " 學分";

        var visible = catCourses.filter(function (c) {
          var done = !!state.completed[c.id];
          if (filter === "todo") return !done;
          if (filter === "done") return done;
          return true;
        }).length;
        group.classList.toggle("is-empty", visible === 0);
        sectionVisible += visible;
      });
      section.classList.toggle("is-empty", sectionVisible === 0);
    });
  }

  /* ---------------- 篩選 ---------------- */

  document.querySelectorAll(".filter-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });
      document.body.dataset.filter = btn.dataset.filter;
      updateSubtotals();
    });
  });

  /* ---------------- 匯出 / 匯入 / 清除 ---------------- */

  function ioMessage(msg) {
    var elMsg = document.getElementById("io-msg");
    elMsg.textContent = msg;
    if (msg) setTimeout(function () { elMsg.textContent = ""; }, 6000);
  }

  document.getElementById("btn-export").addEventListener("click", function () {
    var payload = {
      app: "usc-im-credit-tracker",
      version: 1,
      exportedAt: new Date().toISOString(),
      completed: Object.keys(state.completed),
      thresholds: state.thresholds
    };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    var d = new Date();
    var stamp = d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate());
    a.href = URL.createObjectURL(blob);
    a.download = "學分紀錄備份-" + stamp + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    ioMessage("已匯出 " + payload.completed.length + " 筆已修課程紀錄");
  });

  document.getElementById("btn-import").addEventListener("click", function () {
    document.getElementById("import-file").click();
  });

  document.getElementById("import-file").addEventListener("change", function (e) {
    var file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(String(reader.result));
        if (!data || !Array.isArray(data.completed)) {
          throw new Error("格式不符");
        }
        var completed = {};
        var known = 0;
        data.completed.forEach(function (id) {
          if (typeof id !== "string") return;
          completed[id] = true;
          if (courseById[id]) known++;
        });
        state.completed = completed;
        if (data.thresholds && typeof data.thresholds === "object") {
          state.thresholds = {};
          Object.keys(data.thresholds).forEach(function (k) {
            state.thresholds[k] = !!data.thresholds[k];
          });
        }
        saveState();
        renderAll();
        ioMessage("匯入成功：" + known + " 門課已標記為已修");
      } catch (err) {
        ioMessage("匯入失敗：檔案不是有效的備份 JSON");
      }
    };
    reader.readAsText(file);
  });

  document.getElementById("btn-reset").addEventListener("click", function () {
    if (!confirm("確定要清除所有勾選紀錄嗎？\n（會回到預設狀態，此動作無法復原，建議先匯出備份）")) return;
    state = defaultState();
    saveState();
    renderAll();
    ioMessage("已重設為預設狀態");
  });

  /* ---------------- 小工具 ---------------- */

  function el(tag, className) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  }

  function badge(text, extraClass) {
    var b = el("span", "badge" + (extraClass ? " " + extraClass : ""));
    b.textContent = text;
    return b;
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  /* ---------------- 啟動 ---------------- */

  function renderAll() {
    renderSummary();
    renderPrograms();
    renderThresholds();
    renderCourses();
  }

  document.body.dataset.filter = "all";
  renderAll();
  saveState(); // 第一次開啟時把預設已修狀態寫入 localStorage
})();

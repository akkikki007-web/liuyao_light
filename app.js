const stems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const branches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const branchElement = {
  子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火",
  午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水"
};
const elementColor = { 木: "#2f7c52", 火: "#b44836", 土: "#9a7432", 金: "#7a8087", 水: "#2f638f" };
const generating = { 木: "火", 火: "土", 土: "金", 金: "水", 水: "木" };
const controlling = { 木: "土", 土: "水", 水: "火", 火: "金", 金: "木" };
const comboPairs = [["子", "丑"], ["寅", "亥"], ["卯", "戌"], ["辰", "酉"], ["巳", "申"], ["午", "未"]];
const clashPairs = [["子", "午"], ["丑", "未"], ["寅", "申"], ["卯", "酉"], ["辰", "戌"], ["巳", "亥"]];

const trigrams = [
  { no: 1, key: "qian", name: "乾", lines: [1, 1, 1], element: "金" },
  { no: 2, key: "dui", name: "兌", lines: [1, 1, 0], element: "金" },
  { no: 3, key: "li", name: "離", lines: [1, 0, 1], element: "火" },
  { no: 4, key: "zhen", name: "震", lines: [1, 0, 0], element: "木" },
  { no: 5, key: "xun", name: "巽", lines: [0, 1, 1], element: "木" },
  { no: 6, key: "kan", name: "坎", lines: [0, 1, 0], element: "水" },
  { no: 7, key: "gen", name: "艮", lines: [0, 0, 1], element: "土" },
  { no: 8, key: "kun", name: "坤", lines: [0, 0, 0], element: "土" }
];

const digitLineMap = {
  1: { name: "老陽", solid: 1, moving: true },
  2: { name: "少陰", solid: 0, moving: false },
  3: { name: "少陰", solid: 0, moving: false },
  4: { name: "少陽", solid: 1, moving: false },
  5: { name: "少陰", solid: 0, moving: false },
  6: { name: "少陽", solid: 1, moving: false },
  7: { name: "少陽", solid: 1, moving: false },
  8: { name: "老陰", solid: 0, moving: true }
};
const lineLabels = ["初", "二", "三", "四", "五", "上"];
const kinOrder = ["父母", "兄弟", "子孫", "妻財", "官鬼"];
const sixSpirits = ["青龍", "朱雀", "勾陳", "螣蛇", "白虎", "玄武"];
const sixSpiritStart = { 甲: 0, 乙: 0, 丙: 1, 丁: 1, 戊: 2, 己: 3, 庚: 4, 辛: 4, 壬: 5, 癸: 5 };
const palaceLabelShort = { 本宮: "本", 一世: "一", 二世: "二", 三世: "三", 四世: "四", 五世: "五", 遊魂: "遊", 帰魂: "帰" };

const najia = {
  qian: { inner: ["子", "寅", "辰"], outer: ["午", "申", "戌"] },
  kun: { inner: ["未", "巳", "卯"], outer: ["丑", "亥", "酉"] },
  zhen: { inner: ["子", "寅", "辰"], outer: ["午", "申", "戌"] },
  xun: { inner: ["丑", "亥", "酉"], outer: ["未", "巳", "卯"] },
  kan: { inner: ["寅", "辰", "午"], outer: ["申", "戌", "子"] },
  li: { inner: ["卯", "丑", "亥"], outer: ["酉", "未", "巳"] },
  gen: { inner: ["辰", "午", "申"], outer: ["戌", "子", "寅"] },
  dui: { inner: ["巳", "卯", "丑"], outer: ["亥", "酉", "未"] }
};

const hexNames = {
  "乾乾": "乾為天", "乾兌": "天沢履", "乾離": "天火同人", "乾震": "天雷无妄", "乾巽": "天風姤", "乾坎": "天水訟", "乾艮": "天山遯", "乾坤": "天地否",
  "兌乾": "沢天夬", "兌兌": "兌為沢", "兌離": "沢火革", "兌震": "沢雷随", "兌巽": "沢風大過", "兌坎": "沢水困", "兌艮": "沢山咸", "兌坤": "沢地萃",
  "離乾": "火天大有", "離兌": "火沢睽", "離離": "離為火", "離震": "火雷噬嗑", "離巽": "火風鼎", "離坎": "火水未済", "離艮": "火山旅", "離坤": "火地晋",
  "震乾": "雷天大壮", "震兌": "雷沢帰妹", "震離": "雷火豊", "震震": "震為雷", "震巽": "雷風恒", "震坎": "雷水解", "震艮": "雷山小過", "震坤": "雷地予",
  "巽乾": "風天小畜", "巽兌": "風沢中孚", "巽離": "風火家人", "巽震": "風雷益", "巽巽": "巽為風", "巽坎": "風水渙", "巽艮": "風山漸", "巽坤": "風地観",
  "坎乾": "水天需", "坎兌": "水沢節", "坎離": "水火既済", "坎震": "水雷屯", "坎巽": "水風井", "坎坎": "坎為水", "坎艮": "水山蹇", "坎坤": "水地比",
  "艮乾": "山天大畜", "艮兌": "山沢損", "艮離": "山火賁", "艮震": "山雷頤", "艮巽": "山風蠱", "艮坎": "山水蒙", "艮艮": "艮為山", "艮坤": "山地剥",
  "坤乾": "地天泰", "坤兌": "地沢臨", "坤離": "地火明夷", "坤震": "地雷復", "坤巽": "地風升", "坤坎": "地水師", "坤艮": "地山謙", "坤坤": "坤為地"
};

const palaceSequences = buildPalaceSequences();
const hexOptions = buildHexOptions();

const refs = {
  castSourceRadios: document.querySelectorAll('input[name="castSource"]'),
  numberField: document.getElementById("numberField"),
  numberInput: document.getElementById("numberInput"),
  hexagramFields: document.getElementById("hexagramFields"),
  hexagramSelect: document.getElementById("hexagramSelect"),
  changedHexagramSelect: document.getElementById("changedHexagramSelect"),
  monthBranch: document.getElementById("monthBranch"),
  dayStem: document.getElementById("dayStem"),
  dayBranch: document.getElementById("dayBranch"),
  caseDateInput: document.getElementById("caseDateInput"),
  whiteBackground: document.getElementById("whiteBackground"),
  canvas: document.getElementById("chartCanvas")
};

init();

function init() {
  hexOptions.forEach((item) => refs.hexagramSelect.add(new Option(item.name, item.name)));
  refs.changedHexagramSelect.add(new Option("不動", "none"));
  hexOptions.forEach((item) => refs.changedHexagramSelect.add(new Option(item.name, item.name)));
  branches.forEach((b) => refs.monthBranch.add(new Option(b, b)));
  stems.forEach((s) => refs.dayStem.add(new Option(s, s)));
  refs.hexagramSelect.value = "乾為天";
  refs.changedHexagramSelect.value = "none";
  refs.monthBranch.value = "午";
  refs.dayStem.value = "甲";
  populateDayBranches();
  refs.dayBranch.value = "子";
  refs.caseDateInput.value = localDateTimeValue(new Date());
  refs.castSourceRadios.forEach((radio) => radio.addEventListener("change", updateCastSourceVisibility));
  refs.dayStem.addEventListener("change", () => populateDayBranches(refs.dayBranch.value));
  ["input", "change"].forEach((eventName) => {
    document.querySelectorAll("input, select, textarea").forEach((el) => el.addEventListener(eventName, render));
  });
  updateCastSourceVisibility();
  render();
}

function updateCastSourceVisibility() {
  const byHexagram = currentCastSource() === "hexagram";
  refs.numberField.classList.toggle("hidden", byHexagram);
  refs.hexagramFields.classList.toggle("hidden", !byHexagram);
  render();
}

function currentCastSource() {
  return [...refs.castSourceRadios].find((radio) => radio.checked)?.value || "digits";
}

function populateDayBranches(preferredBranch = refs.dayBranch.value) {
  const validBranches = branchesForStem(refs.dayStem.value);
  refs.dayBranch.replaceChildren();
  validBranches.forEach((b) => refs.dayBranch.add(new Option(b, b)));
  refs.dayBranch.value = validBranches.includes(preferredBranch) ? preferredBranch : validBranches[0];
}

function branchesForStem(stem) {
  const stemIndex = stems.indexOf(stem);
  const parity = stemIndex % 2;
  return branches.filter((_, branchIndex) => branchIndex % 2 === parity);
}

function buildPalaceSequences() {
  const map = new Map();
  trigrams.forEach((palace) => {
    const pure = [...palace.lines, ...palace.lines];
    const seq = [
      { lines: pure, label: "本宮", shi: 6 },
      { lines: flip(pure, [0]), label: "一世", shi: 1 },
      { lines: flip(pure, [0, 1]), label: "二世", shi: 2 },
      { lines: flip(pure, [0, 1, 2]), label: "三世", shi: 3 },
      { lines: flip(pure, [0, 1, 2, 3]), label: "四世", shi: 4 },
      { lines: flip(pure, [0, 1, 2, 3, 4]), label: "五世", shi: 5 },
      { lines: flip(pure, [0, 1, 2, 4]), label: "遊魂", shi: 4 },
      { lines: flip(pure, [4]), label: "帰魂", shi: 3 }
    ];
    seq.forEach((item) => {
      map.set(item.lines.join(""), { palace, label: item.label, shi: item.shi, ying: oppositeLine(item.shi) });
    });
  });
  return map;
}

function buildHexOptions() {
  return Object.entries(hexNames).map(([key, name]) => {
    const upper = trigramByName(key[0]);
    const lower = trigramByName(key[1]);
    return {
      name,
      upper,
      lower,
      lines: [...lower.lines, ...upper.lines]
    };
  });
}

function trigramByName(name) {
  return trigrams.find((item) => item.name === name) || trigrams[0];
}

function flip(lines, indexes) {
  const next = [...lines];
  indexes.forEach((idx) => { next[idx] = next[idx] ? 0 : 1; });
  return next;
}

function oppositeLine(lineNo) {
  return ((lineNo + 2) % 6) + 1;
}

function render() {
  const chart = makeChart();
  drawChart(chart);
}

function makeChart() {
  const byHexagram = currentCastSource() === "hexagram";
  const selectedHexagram = hexOptions.find((item) => item.name === refs.hexagramSelect.value) || hexOptions[0];
  const selectedChangedHexagram = refs.changedHexagramSelect.value === "none"
    ? selectedHexagram
    : (hexOptions.find((item) => item.name === refs.changedHexagramSelect.value) || selectedHexagram);
  const rawDigits = byHexagram ? [] : (refs.numberInput.value.match(/[1-8]/g) || []).map(Number).slice(0, 6);
  const complete = rawDigits.length === 6;
  const digits = byHexagram ? [] : [...rawDigits];
  const castLines = byHexagram
    ? selectedHexagram.lines.map((solid) => ({ name: solid ? "少陽" : "少陰", solid, moving: false }))
    : digits.map((digit) => digitLineMap[digit]);
  const lines = castLines.map((item) => item.solid);
  let movingLines = byHexagram
    ? lines.map((line, idx) => selectedChangedHexagram.lines[idx] !== line ? idx + 1 : null).filter(Boolean)
    : castLines.map((item, idx) => item.moving ? idx + 1 : null).filter(Boolean);

  if (!byHexagram && !complete) {
    return {
      complete,
      byHexagram,
      input: rawDigits.join(""),
      movingLines,
      lines,
      castLines,
      monthBranch: refs.monthBranch.value,
      dayStem: refs.dayStem.value,
      dayBranch: refs.dayBranch.value,
      voids: voidBranches(refs.dayStem.value, refs.dayBranch.value),
      lineRows: []
    };
  }

  const lower = trigramFromLines(lines.slice(0, 3));
  const upper = trigramFromLines(lines.slice(3, 6));
  const changedLines = byHexagram
    ? [...selectedChangedHexagram.lines]
    : lines.map((line, idx) => movingLines.includes(idx + 1) ? (line ? 0 : 1) : line);
  const upperChanged = trigramFromLines(changedLines.slice(3, 6));
  const lowerChanged = trigramFromLines(changedLines.slice(0, 3));
  const palaceInfo = palaceSequences.get(lines.join("")) || { palace: upper, label: "未詳", shi: 6, ying: 3 };
  const changedPalaceInfo = palaceSequences.get(changedLines.join("")) || { palace: upperChanged, label: "未詳", shi: 6, ying: 3 };
  const lineBranches = [...najiabranches(lower, "inner"), ...najiabranches(upper, "outer")];
  const changedLineBranches = [...najiabranches(lowerChanged, "inner"), ...najiabranches(upperChanged, "outer")];
  const hiddenByLineNo = hiddenLines(lineBranches, palaceInfo.palace);
  const lineRows = lineBranches.map((branch, idx) => {
    const element = branchElement[branch];
    const lineNo = idx + 1;
    return {
      lineNo,
      solid: lines[idx] === 1,
      moving: movingLines.includes(lineNo),
      castName: castLines[idx].name,
      spirit: sixSpirit(refs.dayStem.value, idx),
      hidden: hiddenByLineNo.get(lineNo)?.text || "",
      hiddenElement: hiddenByLineNo.get(lineNo)?.element || "",
      hiddenInfluences: hiddenByLineNo.get(lineNo)?.influences || "",
      branch,
      element,
      kin: kinship(palaceInfo.palace.element, element),
      role: lineNo === palaceInfo.shi ? "世" : lineNo === palaceInfo.ying ? "応" : "",
      influences: influenceTags(refs.monthBranch.value, refs.dayBranch.value, branch),
      month: bodyRelation(refs.monthBranch.value, branch),
      day: bodyRelation(refs.dayBranch.value, branch),
      void: voidBranches(refs.dayStem.value, refs.dayBranch.value).includes(branch)
    };
  });
  const changedLineRows = changedLineBranches.map((branch, idx) => {
    const element = branchElement[branch];
    const lineNo = idx + 1;
    return {
      lineNo,
      moving: movingLines.includes(lineNo),
      branch,
      element,
      kin: kinship(palaceInfo.palace.element, element),
      role: lineNo === changedPalaceInfo.shi ? "世" : lineNo === changedPalaceInfo.ying ? "応" : "",
      influences: influenceTags(refs.monthBranch.value, refs.dayBranch.value, branch),
      month: bodyRelation(refs.monthBranch.value, branch),
      day: bodyRelation(refs.dayBranch.value, branch),
      void: voidBranches(refs.dayStem.value, refs.dayBranch.value).includes(branch)
    };
  });

  return {
    complete: true,
    byHexagram,
    input: rawDigits.join(""),
    upper,
    lower,
    upperChanged,
    lowerChanged,
    movingLines,
    hasMoving: movingLines.length > 0,
    lines,
    changedLines,
    palaceInfo,
    changedPalaceInfo,
    lineRows,
    changedLineRows,
    monthBranch: refs.monthBranch.value,
    dayStem: refs.dayStem.value,
    dayBranch: refs.dayBranch.value,
    voids: voidBranches(refs.dayStem.value, refs.dayBranch.value)
  };
}

function trigramByNo(no) {
  return trigrams.find((item) => item.no === no) || trigrams[0];
}

function trigramFromLines(lines) {
  return trigrams.find((item) => item.lines.join("") === lines.join("")) || trigrams[0];
}

function najiabranches(trigram, part) {
  return najia[trigram.key][part];
}

function kinship(palaceElement, lineElement) {
  if (lineElement === palaceElement) return "兄弟";
  if (generating[lineElement] === palaceElement) return "父母";
  if (generating[palaceElement] === lineElement) return "子孫";
  if (controlling[lineElement] === palaceElement) return "官鬼";
  if (controlling[palaceElement] === lineElement) return "妻財";
  return "";
}

function hiddenLines(lineBranches, palace) {
  const visibleKin = new Set(lineBranches.map((branch) => kinship(palace.element, branchElement[branch])));
  const pureBranches = [...najiabranches(palace, "inner"), ...najiabranches(palace, "outer")];
  const currentVoids = voidBranches(refs.dayStem.value, refs.dayBranch.value);
  const hidden = new Map();
  kinOrder.filter((kin) => !visibleKin.has(kin)).forEach((missingKin) => {
    const idx = pureBranches.findIndex((branch) => kinship(palace.element, branchElement[branch]) === missingKin);
    if (idx < 0) return;
    const lineNo = idx + 1;
    const branch = pureBranches[idx];
    const element = branchElement[branch];
    const text = `${missingKin}${branch}${element}`;
    const item = {
      text: currentVoids.includes(branch) ? `（${text}）` : text,
      element,
      influences: influenceTags(refs.monthBranch.value, refs.dayBranch.value, branch)
    };
    if (hidden.has(lineNo)) {
      const prev = hidden.get(lineNo);
      hidden.set(lineNo, {
        text: `${prev.text} / ${item.text}`,
        element: prev.element,
        influences: [prev.influences, item.influences].filter(Boolean).join(" / ")
      });
    } else {
      hidden.set(lineNo, item);
    }
  });
  return hidden;
}

function sixSpirit(dayStem, lineIndex) {
  const start = sixSpiritStart[dayStem] ?? 0;
  return sixSpirits[(start + lineIndex) % sixSpirits.length];
}

function influenceTags(monthBranch, dayBranch, lineBranch) {
  return [
    ...bodyInfluenceTags("月", monthBranch, lineBranch),
    ...bodyInfluenceTags("日", dayBranch, lineBranch)
  ].join(" ");
}

function bodyInfluenceTags(prefix, bodyBranch, lineBranch) {
  const bodyEl = branchElement[bodyBranch];
  const lineEl = branchElement[lineBranch];
  const sameBranchLabel = prefix === "月" ? "月建" : "日晨";
  const tags = [];
  if (bodyBranch === lineBranch) tags.push(sameBranchLabel);
  else if (bodyEl === lineEl) tags.push(`${prefix}旺`);
  if (generating[bodyEl] === lineEl) tags.push(`${prefix}生`);
  if (controlling[bodyEl] === lineEl) tags.push(`${prefix}克`);
  if (isPair(clashPairs, bodyBranch, lineBranch)) tags.push(`${prefix}冲`);
  if (isPair(comboPairs, bodyBranch, lineBranch)) tags.push(`${prefix}合`);
  return tags;
}

function bodyRelation(bodyBranch, lineBranch) {
  const bodyEl = branchElement[bodyBranch];
  const lineEl = branchElement[lineBranch];
  const notes = [];
  if (bodyEl === lineEl) notes.push("比");
  if (generating[bodyEl] === lineEl) notes.push("生");
  if (generating[lineEl] === bodyEl) notes.push("泄");
  if (controlling[bodyEl] === lineEl) notes.push("剋");
  if (controlling[lineEl] === bodyEl) notes.push("被剋");
  if (isPair(comboPairs, bodyBranch, lineBranch)) notes.push("合");
  if (isPair(clashPairs, bodyBranch, lineBranch)) notes.push("冲");
  return notes.join("・") || "平";
}

function isPair(pairs, a, b) {
  return pairs.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
}

function voidBranches(dayStem, dayBranch) {
  const stemIndex = stems.indexOf(dayStem);
  const branchIndex = branches.indexOf(dayBranch);
  const start = (branchIndex - stemIndex + 12) % 12;
  return [branches[(start + 10) % 12], branches[(start + 11) % 12]];
}

function drawChart(chart) {
  const ctx = refs.canvas.getContext("2d");
  const w = refs.canvas.width;
  const h = refs.canvas.height;
  ctx.clearRect(0, 0, w, h);
  const whiteBackground = refs.whiteBackground.checked;
  ctx.fillStyle = whiteBackground ? "#ffffff" : "#fbfaf6";
  ctx.fillRect(0, 0, w, h);
  if (!whiteBackground) drawPaperTexture(ctx, w, h);

  ctx.font = "28px 'Yu Gothic UI', sans-serif";
  ctx.fillStyle = "#68737d";
  const inputLabel = chart.byHexagram
    ? (chart.hasMoving ? `${refs.hexagramSelect.value} 之 ${hexName(chart.upperChanged, chart.lowerChanged)}` : refs.hexagramSelect.value)
    : (chart.input || "未入力");
  const inputKind = chart.byHexagram ? "卦名" : "六数字";
  ctx.fillText(`${inputKind} ${inputLabel}  月建 ${chart.monthBranch}  日晨 ${chart.dayStem}${chart.dayBranch}  空亡 ${chart.voids.join("")}`, 80, 98);
  ctx.textAlign = "right";
  ctx.fillText(`起卦日時 ${formatCaseDate(refs.caseDateInput.value)}`, w - 80, 98);
  ctx.textAlign = "left";

  ctx.strokeStyle = "#1d2328";
  ctx.lineWidth = 3;
  ctx.strokeRect(62, 48, w - 124, h - 96);

  drawHexBlock(ctx, chart, 330, 230);
  if (chart.complete) {
    drawLineTable(ctx, chart, 92, 540);
  }
}

function drawPaperTexture(ctx, w, h) {
  ctx.save();
  ctx.globalAlpha = 0.13;
  ctx.strokeStyle = "#c9bfae";
  ctx.lineWidth = 1;
  for (let x = 80; x < w; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x - 120, h);
    ctx.stroke();
  }
  ctx.restore();
}

function drawHexBlock(ctx, chart, x, y) {
  if (!chart.complete) {
    ctx.fillStyle = "#1d2328";
    ctx.font = "700 30px 'Yu Gothic UI', sans-serif";
    ctx.fillText("爻を入力中", x, y);
    ctx.font = "22px 'Yu Gothic UI', sans-serif";
    ctx.fillStyle = "#68737d";
    ctx.fillText("六つの数字が揃うと、卦名・六親・日月関係を表示します。", x, y + 42);
    drawHexLines(ctx, chart.lines, chart.movingLines, x, y + 78, 260, { gap: 36, lineWidth: 10, movingRadius: 13 });
    return;
  }

  const title = `${hexName(chart.upper, chart.lower)}　${palaceSummary(chart.palaceInfo)}`;
  ctx.fillStyle = "#1d2328";
  ctx.font = "700 34px 'Yu Gothic UI', sans-serif";
  ctx.fillText(title, x, y);

  drawHexLines(ctx, chart.lines, chart.movingLines, x, y + 52, 260, { gap: 36, lineWidth: 10, movingRadius: 13 });
  if (chart.hasMoving) {
    const changedTitle = `${hexName(chart.upperChanged, chart.lowerChanged)}　${palaceSummary(chart.changedPalaceInfo)}`;
    ctx.fillStyle = "#1d2328";
    ctx.font = "700 34px 'Yu Gothic UI', sans-serif";
    ctx.fillText(changedTitle, x + 450, y);
    drawHexLines(ctx, chart.changedLines, chart.movingLines, x + 450, y + 52, 240, { fadeStatic: true, gap: 36, lineWidth: 10, movingRadius: 13 });
  }
}

function hexName(upper, lower) {
  return hexNames[`${upper.name}${lower.name}`] || `${upper.name}上${lower.name}下`;
}

function palaceSummary(info) {
  const label = palaceLabelShort[info.label] || info.label;
  return `${info.palace.name}${label}(${info.palace.element})`;
}

function drawHexLines(ctx, lines, movingLines, x, y, width, options = {}) {
  const gap = options.gap || 42;
  const lineWidth = options.lineWidth || 12;
  const movingRadius = options.movingRadius || 15;
  for (let i = 5; i >= 0; i -= 1) {
    if (typeof lines[i] === "undefined") continue;
    const row = 5 - i;
    const yy = y + row * gap;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "butt";
    const isMoving = movingLines.includes(i + 1);
    ctx.strokeStyle = options.fadeStatic && !isMoving ? "#c7cdd1" : "#1d2328";
    if (lines[i]) {
      line(ctx, x, yy, x + width, yy);
    } else {
      line(ctx, x, yy, x + width * 0.42, yy);
      line(ctx, x + width * 0.58, yy, x + width, yy);
    }
    if (isMoving && !options.fadeStatic) {
      ctx.fillStyle = "#b44836";
      ctx.beginPath();
      ctx.arc(x + width + 38, yy, movingRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "700 18px 'Yu Gothic UI', sans-serif";
      ctx.fillText("動", x + width + 27, yy + 7);
    }
  }
}

function drawLineTable(ctx, chart, x, y) {
  const cols = [0, 92, 300, 660];
  const colWidths = [70, 185, 330, 260];
  const headers = ["", "伏爻", "本爻", "変爻"];
  ctx.fillStyle = "#efe8dc";
  roundRect(ctx, x, y - 45, 1180, 62, 6, true, false);
  ctx.fillStyle = "#1d2328";
  ctx.font = "700 23px 'Yu Gothic UI', sans-serif";
  ctx.textAlign = "center";
  headers.forEach((text, i) => ctx.fillText(text, x + cols[i] + colWidths[i] / 2, y - 6));
  ctx.textAlign = "left";

  ctx.font = "22px 'Yu Gothic UI', sans-serif";
  for (let i = 5; i >= 0; i -= 1) {
    const row = chart.lineRows[i];
    const changedRow = chart.changedLineRows[row.lineNo - 1];
    const yy = y + (5 - i) * 82 + 52;
    ctx.strokeStyle = "#d7dde2";
    ctx.lineWidth = 1.5;
    line(ctx, x, yy + 42, x + 1180, yy + 42);
    drawLineTableValues(ctx, cols, x, yy, row, [
      lineLabels[row.lineNo - 1],
      row.hidden,
      formatKinBranch(row),
      row.moving && changedRow ? formatKinBranch(changedRow, { includeRole: false }) : ""
    ], changedRow);
  }
}

function drawLineTableValues(ctx, cols, x, y, row, values, changedRow = null) {
  values.forEach((text, c) => {
    ctx.font = [1, 2, 3].includes(c) ? "700 33px 'Yu Gothic UI', sans-serif" : "22px 'Yu Gothic UI', sans-serif";
    ctx.fillStyle = c === 2 ? elementColor[row.element] : "#1d2328";
    if (c === 0 && row.moving) ctx.fillStyle = "#b44836";
    if (c === 3 && changedRow && text) ctx.fillStyle = elementColor[changedRow.element];
    if (c === 1) ctx.fillStyle = row.hiddenElement ? elementColor[row.hiddenElement] : "#8b5f2a";
    ctx.fillText(text, x + cols[c], y);
    if (c === 1 && row.hiddenInfluences) {
      ctx.font = "700 23px 'Yu Gothic UI', sans-serif";
      ctx.fillStyle = "#68737d";
      ctx.fillText(row.hiddenInfluences, x + cols[c] + 58, y + 28);
    }
    if (c === 2) {
      ctx.font = "700 23px 'Yu Gothic UI', sans-serif";
      ctx.fillStyle = "#68737d";
      ctx.fillText(row.spirit, x + cols[c] + 22, y + 28);
      ctx.font = "700 23px 'Yu Gothic UI', sans-serif";
      ctx.fillText(row.influences, x + cols[c] + 106, y + 28);
    }
    if (c === 3 && changedRow?.influences && text) {
      ctx.font = "700 23px 'Yu Gothic UI', sans-serif";
      ctx.fillStyle = "#68737d";
      ctx.fillText(changedRow.influences, x + cols[c] + 86, y + 28);
    }
  });
}

function formatKinBranch(row, options = {}) {
  const includeRole = options.includeRole !== false;
  const role = includeRole && row.role ? `・${row.role}` : "";
  const text = `${row.kin}${row.branch}${row.element}${role}`;
  return row.void ? `（${text}）` : `　${text}`;
}

function localDateTimeValue(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

function formatCaseDate(value) {
  if (!value) return "";
  return value.replace("T", " ");
}

function line(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

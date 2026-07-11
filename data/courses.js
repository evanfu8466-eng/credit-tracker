/* ============================================================================
 * 實踐大學 資訊科技與管理學系（資管系） 課程資料檔
 * 依據：114學年度新生適用課程計畫表（115.06.09 教務會議修訂版）＋ 個人歷年成績審核資料
 * ============================================================================
 *
 * ★★★ 這個檔案就是全部的課程資料，之後要改課程只需要編輯這裡 ★★★
 *
 * 為什麼是 .js 而不是 .json？
 *   1. JSON 不能寫註解，.js 可以，方便你對照修改。
 *   2. 直接雙擊 index.html 也能開啟（fetch 讀 .json 在本機會被瀏覽器擋住）。
 *
 * 每一門課的欄位說明：
 *   id       : 學科碼（沒有學科碼的課請自訂一個不重複的代號）
 *   name     : 課程名稱
 *   credits  : 學分數
 *   req      : "必修" 或 "選修"
 *   category : 類別代碼 —— "校必"=校訂必修、"通識"=通識（興趣自選）、
 *              "院必"=院訂必修、"系必"=系訂必修、
 *              "學程"=深化學程選修、"選修"=一般選修
 *   year     : 建議修課年級（1~4，依課程計畫表/課程地圖）
 *   sem      : 建議修課學期，以你的入學年推算（114=大一），純顯示用，可留空
 *   program  : 所屬學程 —— "cloud"=雲端運算與資訊安全學程、
 *              "ai"=人工智慧與數位媒體學程、null=不屬於任何學程
 *   done     : true 代表「第一次開啟網頁時預設已勾選」
 *              （之後的勾選狀態存在瀏覽器 localStorage，不會再讀這個欄位）
 *   note     : 備註（會顯示在課名下方，可省略）
 *   capGroup : 同一組課程學分認列上限的群組代號（例如實習課），可省略
 * ==========================================================================*/

window.COURSE_DATA = {

  /* 畢業總學分門檻 */
  graduationCredits: 128,

  /* --------------------------------------------------------------------
   * 學分結構（計畫表第 2 頁）：128 = 校必18 + 通識10 + 院必21 + 系必41 + 選修38
   * 首頁的「學分結構」卡片會依這裡計算各類進度。
   * ------------------------------------------------------------------ */
  categoryRequirements: [
    { name: "校訂必修",       categories: ["校必"],        required: 18 },
    { name: "通識（興趣自選）", categories: ["通識"],        required: 10 },
    { name: "院訂必修",       categories: ["院必"],        required: 21 },
    { name: "系訂必修",       categories: ["系必"],        required: 41 },
    { name: "選修（含學程）",  categories: ["學程", "選修"], required: 38 },
  ],

  /* --------------------------------------------------------------------
   * 兩個深化學程（必備其一才能畢業）
   * ★ requiredCredits（學程結業所需學分）：課程計畫表未載明數字，
   *   暫定 15，請依系上公告的學程規定修改！
   * ------------------------------------------------------------------ */
  programs: [
    { id: "cloud", name: "雲端運算與資訊安全學程", requiredCredits: 15 },
    { id: "ai",    name: "人工智慧與數位媒體學程", requiredCredits: 15 },
  ],

  /* 學分認列上限群組：資訊管理實習(一)~(四) 共 12 學分，最多認列 6 學分 */
  capGroups: {
    intern: { name: "資訊管理實習(一)~(四)", max: 6 },
  },

  /* --------------------------------------------------------------------
   * 畢業門檻（非學分類，打勾表示已通過）
   * 依「實踐大學學生基本能力檢測實施要點」＋系訂門檻
   * ------------------------------------------------------------------ */
  thresholds: [
    { id: "dept",    name: "系門檻（深化學程修滿）", done: false },
    { id: "fitness", name: "體適能門檻",           done: true  },
    { id: "chinese", name: "中文門檻",             done: true  },
    { id: "english", name: "英外語文畢業能力指標",  done: false },
  ],

  courses: [

    /* ==================== 校訂必修（18 學分） ==================== */
    { id: "9912J1", name: "大學體育－羽球(1)",     credits: 2, req: "必修", category: "校必", year: 1, sem: "114-1", program: null, done: true },
    { id: "9912V1", name: "大學體育－籃球(2)",     credits: 2, req: "必修", category: "校必", year: 1, sem: "114-2", program: null, done: true },
    { id: "965321", name: "大學英文(1)",           credits: 2, req: "必修", category: "校必", year: 1, sem: "114-1", program: null, done: true },
    { id: "965401", name: "大學英文(2)",           credits: 2, req: "必修", category: "校必", year: 1, sem: "114-2", program: null, done: true },
    { id: "ENG3",   name: "大學英文(3)",           credits: 2, req: "必修", category: "校必", year: 2, sem: "115-1", program: null, done: false, note: "興趣分組：職場英語／商務英語溝通／實用英文寫作／英語簡報與口語表達 擇一" },
    { id: "ENG4",   name: "大學英文(4)",           credits: 2, req: "必修", category: "校必", year: 2, sem: "115-2", program: null, done: false, note: "與英文(3)同為興趣分組，不可重複；採學期擋修需依序及格" },
    { id: "971011", name: "國文(1)",               credits: 2, req: "必修", category: "校必", year: 1, sem: "114-1", program: null, done: true },
    { id: "971021", name: "國文(2)",               credits: 2, req: "必修", category: "校必", year: 1, sem: "114-2", program: null, done: true },
    { id: "9721K1", name: "家庭科學",              credits: 1, req: "必修", category: "校必", year: 2, sem: "115-1", program: null, done: false, note: "特色課程" },
    { id: "9721J1", name: "生活藝術",              credits: 1, req: "必修", category: "校必", year: 3, sem: "116-1", program: null, done: false, note: "特色課程" },
    { id: "964001", name: "英外語文畢業能力指標",  credits: 0, req: "必修", category: "校必", year: 4, sem: "117-1", program: null, done: false },

    /* ==================== 通識／興趣自選（10 學分） ====================
     * 規定：畢業前修畢 5 門、跨 4 個(含)以上領域、合計 10 學分。
     * 八大領域：人文思維、美學涵養、公民社會、全球視野、自然科學、
     *           智慧數位、運動與健康促進、外語學用與文化
     * 已修 2 門（公民社會、全球視野）→ 還需 3 門、且至少再跨 2 個新領域。
     * ★ 以下 3 門是占位課程，選課後請把課名／學分／領域改成實際內容。
     * ================================================================== */
    { id: "002941", name: "AI未來應用與趨勢探索",  credits: 2, req: "選修", category: "通識", year: 1, sem: "114-2", program: null, done: true,  note: "領域：公民社會" },
    { id: "0021V1", name: "全球發展與危機處理",    credits: 2, req: "選修", category: "通識", year: 1, sem: "114-1", program: null, done: true,  note: "領域：全球視野" },
    { id: "GE-1",   name: "【請修改】通識興趣自選（第 3 門）", credits: 2, req: "選修", category: "通識", year: 2, sem: "", program: null, done: false, note: "占位課程；須選未修過的領域" },
    { id: "GE-2",   name: "【請修改】通識興趣自選（第 4 門）", credits: 2, req: "選修", category: "通識", year: 2, sem: "", program: null, done: false, note: "占位課程；須選未修過的領域" },
    { id: "GE-3",   name: "【請修改】通識興趣自選（第 5 門）", credits: 2, req: "選修", category: "通識", year: 3, sem: "", program: null, done: false, note: "占位課程；5 門合計 10 學分、跨 4 領域" },

    /* ==================== 院訂必修（21 學分） ==================== */
    { id: "2811A1", name: "經濟學",       credits: 2, req: "必修", category: "院必", year: 1, sem: "114-1", program: null, done: true },
    { id: "2811C1", name: "商事法",       credits: 2, req: "必修", category: "院必", year: 1, sem: "114-1", program: null, done: true },
    { id: "2811B1", name: "微積分",       credits: 3, req: "必修", category: "院必", year: 1, sem: "114-1", program: null, done: true },
    { id: "2811D1", name: "會計學",       credits: 2, req: "必修", category: "院必", year: 1, sem: "114-2", program: null, done: true },
    { id: "2811E1", name: "管理學",       credits: 3, req: "必修", category: "院必", year: 1, sem: "114-2", program: null, done: true },
    { id: "2821B1", name: "統計學",       credits: 3, req: "必修", category: "院必", year: 2, sem: "115-1", program: null, done: false },
    { id: "2841C1", name: "企業倫理",     credits: 2, req: "必修", category: "院必", year: 3, sem: "116-1", program: null, done: false },
    { id: "2832F1", name: "專業英文(一)", credits: 2, req: "必修", category: "院必", year: 3, sem: "116-2", program: null, done: false },
    { id: "2842D1", name: "專業英文(二)", credits: 2, req: "必修", category: "院必", year: 4, sem: "117-1", program: null, done: false },

    /* ==================== 系訂必修（41 學分） ==================== */
    { id: "2811M1", name: "程式設計",             credits: 2, req: "必修", category: "系必", year: 1, sem: "114-1", program: null, done: true },
    { id: "2811W1", name: "數位媒體概論",         credits: 2, req: "必修", category: "系必", year: 1, sem: "114-1", program: null, done: true },
    { id: "2811Y1", name: "計算機概論與網頁設計", credits: 2, req: "必修", category: "系必", year: 1, sem: "114-1", program: null, done: true },
    { id: "2811Q1", name: "動態網頁設計",         credits: 2, req: "必修", category: "系必", year: 1, sem: "114-2", program: null, done: true },
    { id: "2811U1", name: "資訊法律與資訊倫理",   credits: 2, req: "必修", category: "系必", year: 1, sem: "114-2", program: null, done: true },
    { id: "2811X1", name: "數位媒體設計",         credits: 2, req: "必修", category: "系必", year: 1, sem: "114-2", program: null, done: true },
    { id: "2821L1", name: "物件導向程式設計",     credits: 2, req: "必修", category: "系必", year: 1, sem: "114-2", program: null, done: true },
    { id: "2811F1", name: "作業研究",             credits: 3, req: "必修", category: "系必", year: 1, sem: "114-2", program: null, done: true },
    { id: "2811K1", name: "資料結構",             credits: 2, req: "必修", category: "系必", year: 2, sem: "115-1", program: null, done: false },
    { id: "2821C1", name: "資料庫管理",           credits: 2, req: "必修", category: "系必", year: 2, sem: "115-1", program: null, done: false },
    { id: "2821K1", name: "資訊管理",             credits: 2, req: "必修", category: "系必", year: 2, sem: "115-1", program: null, done: false },
    { id: "2821N1", name: "資訊網路",             credits: 2, req: "必修", category: "系必", year: 2, sem: "115-1", program: null, done: false },
    { id: "2821D1", name: "作業系統",             credits: 2, req: "必修", category: "系必", year: 2, sem: "115-2", program: null, done: false },
    { id: "2821V1", name: "電子商務",             credits: 2, req: "必修", category: "系必", year: 2, sem: "115-2", program: null, done: false },
    { id: "2821W1", name: "專案管理",             credits: 2, req: "必修", category: "系必", year: 2, sem: "115-2", program: null, done: false },
    { id: "2831C1", name: "系統分析與設計",       credits: 2, req: "必修", category: "系必", year: 3, sem: "116-1", program: null, done: false },
    { id: "2841D1", name: "資訊安全",             credits: 2, req: "必修", category: "系必", year: 3, sem: "116-1", program: null, done: false },
    { id: "2831A1", name: "專題（一）",           credits: 2, req: "必修", category: "系必", year: 3, sem: "116-2", program: null, done: false },
    { id: "2831R1", name: "網際網路圖學",         credits: 2, req: "必修", category: "系必", year: 3, sem: "116-2", program: null, done: false },
    { id: "2841A1", name: "專題（二）",           credits: 2, req: "必修", category: "系必", year: 4, sem: "117-1", program: null, done: false },

    /* ==================== 深化學程：雲端運算與資訊安全學程 ====================
     * 建議年級／學期依 114 學年課程地圖（大二上～大四下）。
     * 「＊」＝學程共開課程（與企業數位轉型學程共用）。
     * ======================================================================= */
    { id: "2821E1", name: "網路安全與管理",             credits: 2, req: "選修", category: "學程", year: 2, sem: "115-1", program: "cloud", done: false },
    { id: "2822F1", name: "社群運算",                   credits: 2, req: "選修", category: "學程", year: 2, sem: "115-1", program: "cloud", done: false },
    { id: "2821Y1", name: "網際網路程式設計",           credits: 2, req: "選修", category: "學程", year: 2, sem: "115-2", program: "cloud", done: false },
    { id: "2841S1", name: "演算法概論",                 credits: 2, req: "選修", category: "學程", year: 2, sem: "115-2", program: "cloud", done: false },
    { id: "2821J1", name: "電子商務實務",               credits: 2, req: "選修", category: "學程", year: 2, sem: "115-2", program: "cloud", done: false, note: "＊學程共開課程" },
    { id: "2822G1", name: "資訊管理與成本結算實務應用", credits: 2, req: "選修", category: "學程", year: 2, sem: "115-2", program: "cloud", done: false, note: "＊學程共開課程" },
    { id: "283101", name: "物聯網實務與安全",           credits: 2, req: "選修", category: "學程", year: 3, sem: "116-1", program: "cloud", done: false, note: "「電子電路導論與物聯網實務」可抵換本課程" },
    { id: "2831T1", name: "企業資源規劃",               credits: 2, req: "選修", category: "學程", year: 3, sem: "116-1", program: "cloud", done: false, note: "＊學程共開課程" },
    { id: "2832A1", name: "高等資料庫",                 credits: 2, req: "選修", category: "學程", year: 3, sem: "116-1", program: "cloud", done: false },
    { id: "2821U1", name: "高等資訊網路",               credits: 2, req: "選修", category: "學程", year: 3, sem: "116-2", program: "cloud", done: false },
    { id: "2831M1", name: "行動裝置程式設計",           credits: 2, req: "選修", category: "學程", year: 3, sem: "116-2", program: "cloud", done: false },
    { id: "2831D1", name: "供應鏈管理",                 credits: 2, req: "選修", category: "學程", year: 3, sem: "116-2", program: "cloud", done: false, note: "＊學程共開課程" },
    { id: "284081", name: "雲端運算與安全",             credits: 2, req: "選修", category: "學程", year: 3, sem: "116-2", program: "cloud", done: false, note: "「雲端計算」可抵換本課程" },
    { id: "2841M1", name: "資訊管理實習(一)",           credits: 3, req: "選修", category: "學程", year: 4, sem: "117-1", program: "cloud", done: false, capGroup: "intern", note: "實習(一)~(四)最多認列 6 學分" },
    { id: "2841N1", name: "資訊管理實習(二)",           credits: 3, req: "選修", category: "學程", year: 4, sem: "117-1", program: "cloud", done: false, capGroup: "intern", note: "實習(一)~(四)最多認列 6 學分" },
    { id: "2841B1", name: "顧客關係管理",               credits: 2, req: "選修", category: "學程", year: 4, sem: "117-2", program: "cloud", done: false, note: "＊學程共開課程" },
    { id: "2841Q1", name: "資訊管理實習(三)",           credits: 3, req: "選修", category: "學程", year: 4, sem: "117-2", program: "cloud", done: false, capGroup: "intern", note: "實習(一)~(四)最多認列 6 學分" },
    { id: "282021", name: "資訊管理實習(四)",           credits: 3, req: "選修", category: "學程", year: 4, sem: "117-2", program: "cloud", done: false, capGroup: "intern", note: "實習(一)~(四)最多認列 6 學分" },
    /* 下面兩門微學分課出現在你的成績審核表「雲端學程」清單，但不在課程地圖上；
       開課學期請依實際課表，若不計入學程請把 program 改成 null。 */
    { id: "C51021", name: "生成式AI商業應用基礎",       credits: 1, req: "選修", category: "學程", year: 2, sem: "", program: "cloud", done: false, note: "微學分課程，開課學期依課表" },
    { id: "C52011", name: "基於雲計算之生成式AI基礎",   credits: 1, req: "選修", category: "學程", year: 2, sem: "", program: "cloud", done: false, note: "微學分課程，開課學期依課表" },

    /* ==================== 深化學程：人工智慧與數位媒體學程 ====================
     * ★★★ 此清單是從 114 學年課程計畫表的「系(所)選修」中，挑出 AI／數位媒體
     *     性質的真實課程「推測」而成（課名、學分、學科碼、年級都是正確的），
     *     但**是否屬於本學程請務必對照系上公告的學程科目表確認**，
     *     不屬於的課請把 program 改成 null（會變成一般選修）。
     * ======================================================================= */
    { id: "282011", name: "遊戲程式設計實作",     credits: 2, req: "選修", category: "學程", year: 2, sem: "115-1", program: "ai", done: false, note: "待確認是否屬本學程" },
    { id: "2821T1", name: "3D動畫",               credits: 2, req: "選修", category: "學程", year: 2, sem: "115-2", program: "ai", done: false, note: "待確認是否屬本學程" },
    { id: "2831L1", name: "高等3D動畫",           credits: 2, req: "選修", category: "學程", year: 3, sem: "116-1", program: "ai", done: false, note: "待確認是否屬本學程" },
    { id: "2831N1", name: "電腦視覺",             credits: 2, req: "選修", category: "學程", year: 3, sem: "116-2", program: "ai", done: false, note: "待確認是否屬本學程" },
    { id: "2831Z1", name: "數位視訊剪輯",         credits: 2, req: "選修", category: "學程", year: 3, sem: "116-2", program: "ai", done: false, note: "待確認是否屬本學程" },
    { id: "2832E1", name: "人工智慧與深度學習",   credits: 2, req: "選修", category: "學程", year: 3, sem: "116-2", program: "ai", done: false, note: "待確認是否屬本學程" },
    { id: "2841G1", name: "虛擬實境",             credits: 2, req: "選修", category: "學程", year: 4, sem: "117-1", program: "ai", done: false, note: "待確認是否屬本學程" },
    { id: "2841K1", name: "類神經網路實務與應用", credits: 2, req: "選修", category: "學程", year: 4, sem: "117-1", program: "ai", done: false, note: "待確認是否屬本學程" },
    { id: "2842M1", name: "柔性計算與應用",       credits: 2, req: "選修", category: "學程", year: 4, sem: "117-2", program: "ai", done: false, note: "待確認是否屬本學程" },

    /* ==================== 一般選修 ====================
     * 含課程地圖上標示為「企業數位轉型學程」的課程（管理學院跨領域學程，
     * 若你要修該學程，可自行把這幾門的 note 當參考）。
     * ================================================== */
    { id: "002961", name: "新生轉銜定向與跨域探索(1)", credits: 1, req: "選修", category: "選修", year: 1, sem: "114-1", program: null, done: true, note: "成績：通過" },
    { id: "2822J1", name: "數位行銷",                 credits: 2, req: "選修", category: "選修", year: 2, sem: "115-2", program: null, done: false, note: "企業數位轉型學程課程" },
    { id: "2831E1", name: "資料採礦與商業智慧",       credits: 2, req: "選修", category: "選修", year: 3, sem: "116-2", program: null, done: false, note: "企業數位轉型學程課程" },
    { id: "2841T1", name: "數位創新產業應用",         credits: 2, req: "選修", category: "選修", year: 4, sem: "117-1", program: null, done: false, note: "企業數位轉型學程課程" },
    { id: "2841R1", name: "營運智慧分析",             credits: 2, req: "選修", category: "選修", year: 4, sem: "117-2", program: null, done: false, note: "企業數位轉型學程課程" },
  ],
};

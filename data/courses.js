/* ============================================================================
 * 實踐大學 資訊管理學系 課程資料檔
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
 *   category : 類別代碼 —— "校必"=校訂必修、"通識"=通識課程、
 *              "院必"=院訂必修、"系必"=系訂必修、
 *              "學程"=深化學程選修、"選修"=一般選修
 *   year     : 建議修課年級（1~4）
 *   sem      : 建議修課學期，例如 "114-1"（純顯示用，可留空字串）
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
   * 兩個深化學程
   * ★ requiredCredits（學程結業所需學分）目前先填 15，
   *   請依系上公告的實際學程規定修改！
   * ------------------------------------------------------------------ */
  programs: [
    { id: "cloud", name: "雲端運算與資訊安全學程", requiredCredits: 15 },
    { id: "ai",    name: "人工智慧與數位媒體學程", requiredCredits: 15 },
  ],

  /* 學分認列上限群組：實習(一)~(四) 最多認列 6 學分 */
  capGroups: {
    intern: { name: "資訊管理實習(一)~(四)", max: 6 },
  },

  /* --------------------------------------------------------------------
   * 畢業門檻（非學分類，打勾表示已通過）
   * ------------------------------------------------------------------ */
  thresholds: [
    { id: "dept",    name: "系門檻",   done: false },
    { id: "fitness", name: "體適能門檻", done: true  },
    { id: "chinese", name: "中文門檻",  done: true  },
    { id: "english", name: "英檢門檻",  done: false },
  ],

  courses: [

    /* ==================== 校訂必修 ==================== */
    { id: "9912J1", name: "大學體育－羽球(1)",     credits: 2, req: "必修", category: "校必", year: 1, sem: "114-1", program: null, done: true },
    { id: "9912V1", name: "大學體育－籃球(2)",     credits: 2, req: "必修", category: "校必", year: 1, sem: "114-2", program: null, done: true },
    { id: "965321", name: "大學英文(1)",           credits: 2, req: "必修", category: "校必", year: 1, sem: "114-1", program: null, done: true },
    { id: "965401", name: "大學英文(2)",           credits: 2, req: "必修", category: "校必", year: 1, sem: "114-2", program: null, done: true },
    { id: "ENG3",   name: "大學英文(3)",           credits: 2, req: "必修", category: "校必", year: 2, sem: "115-1", program: null, done: false },
    { id: "ENG4",   name: "大學英文(4)",           credits: 2, req: "必修", category: "校必", year: 2, sem: "115-2", program: null, done: false },
    { id: "971011", name: "國文(1)",               credits: 2, req: "必修", category: "校必", year: 1, sem: "114-1", program: null, done: true },
    { id: "971021", name: "國文(2)",               credits: 2, req: "必修", category: "校必", year: 1, sem: "114-2", program: null, done: true },
    { id: "9721K1", name: "家庭科學",              credits: 1, req: "必修", category: "校必", year: 2, sem: "115-1", program: null, done: false },
    { id: "9721J1", name: "生活藝術",              credits: 1, req: "必修", category: "校必", year: 3, sem: "116-1", program: null, done: false },
    { id: "964001", name: "英外語文畢業能力指標",  credits: 0, req: "必修", category: "校必", year: 4, sem: "117-1", program: null, done: false },

    /* ==================== 通識課程 ====================
     * 已修：公民社會、全球視野兩領域。
     * ★ 其餘六個領域先放「占位課程」，請把課名、學分改成你實際選修的課；
     *   需修哪幾個領域、各幾學分，請依教務處通識規定調整（可整列刪除或新增）。
     * ================================================== */
    { id: "002941", name: "AI未來應用與趨勢探索",  credits: 2, req: "選修", category: "通識", year: 1, sem: "114-2", program: null, done: true,  note: "通識領域：公民社會" },
    { id: "0021V1", name: "全球發展與危機處理",    credits: 2, req: "選修", category: "通識", year: 1, sem: "114-1", program: null, done: true,  note: "通識領域：全球視野" },
    { id: "GE-HUM", name: "【請修改】通識－人文思維",       credits: 2, req: "選修", category: "通識", year: 2, sem: "", program: null, done: false, note: "占位課程，請填入實際選修課名與學分" },
    { id: "GE-ART", name: "【請修改】通識－美學涵養",       credits: 2, req: "選修", category: "通識", year: 2, sem: "", program: null, done: false, note: "占位課程，請填入實際選修課名與學分" },
    { id: "GE-NAT", name: "【請修改】通識－自然科學",       credits: 2, req: "選修", category: "通識", year: 2, sem: "", program: null, done: false, note: "占位課程，請填入實際選修課名與學分" },
    { id: "GE-DIG", name: "【請修改】通識－智慧數位",       credits: 2, req: "選修", category: "通識", year: 3, sem: "", program: null, done: false, note: "占位課程，請填入實際選修課名與學分" },
    { id: "GE-SPT", name: "【請修改】通識－運動與健康促進", credits: 2, req: "選修", category: "通識", year: 3, sem: "", program: null, done: false, note: "占位課程，請填入實際選修課名與學分" },
    { id: "GE-LNG", name: "【請修改】通識－外語學用與文化", credits: 2, req: "選修", category: "通識", year: 3, sem: "", program: null, done: false, note: "占位課程，請填入實際選修課名與學分" },

    /* ==================== 院訂必修 ==================== */
    { id: "2811A1", name: "經濟學",       credits: 2, req: "必修", category: "院必", year: 1, sem: "114-1", program: null, done: true },
    { id: "2811C1", name: "商事法",       credits: 2, req: "必修", category: "院必", year: 1, sem: "114-1", program: null, done: true },
    { id: "2811B1", name: "微積分",       credits: 3, req: "必修", category: "院必", year: 1, sem: "114-1", program: null, done: true },
    { id: "2811D1", name: "會計學",       credits: 2, req: "必修", category: "院必", year: 1, sem: "114-2", program: null, done: true },
    { id: "2811E1", name: "管理學",       credits: 3, req: "必修", category: "院必", year: 1, sem: "114-2", program: null, done: true },
    { id: "2821B1", name: "統計學",       credits: 3, req: "必修", category: "院必", year: 2, sem: "115-1", program: null, done: false },
    { id: "2841C1", name: "企業倫理",     credits: 2, req: "必修", category: "院必", year: 3, sem: "116-1", program: null, done: false },
    { id: "2832F1", name: "專業英文(一)", credits: 2, req: "必修", category: "院必", year: 3, sem: "116-2", program: null, done: false },
    { id: "2842D1", name: "專業英文(二)", credits: 2, req: "必修", category: "院必", year: 4, sem: "117-1", program: null, done: false },

    /* ==================== 系訂必修 ==================== */
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

    /* ==================== 一般選修 ==================== */
    { id: "002961", name: "新生轉銜定向與跨域探索(1)", credits: 1, req: "選修", category: "選修", year: 1, sem: "114-1", program: null, done: true, note: "成績：通過" },

    /* ==================== 深化學程：雲端運算與資訊安全學程 ==================== */
    { id: "C51021", name: "生成式AI商業應用基礎",       credits: 1, req: "選修", category: "學程", year: 2, sem: "", program: "cloud", done: false },
    { id: "C52011", name: "基於雲計算之生成式AI基礎",   credits: 1, req: "選修", category: "學程", year: 2, sem: "", program: "cloud", done: false },
    { id: "2821E1", name: "網路安全與管理",             credits: 2, req: "選修", category: "學程", year: 2, sem: "", program: "cloud", done: false },
    { id: "2821J1", name: "電子商務實務",               credits: 2, req: "選修", category: "學程", year: 2, sem: "", program: "cloud", done: false },
    { id: "2821U1", name: "高等資訊網路",               credits: 2, req: "選修", category: "學程", year: 2, sem: "", program: "cloud", done: false },
    { id: "2821Y1", name: "網際網路程式設計",           credits: 2, req: "選修", category: "學程", year: 2, sem: "", program: "cloud", done: false },
    { id: "2822F1", name: "社群運算",                   credits: 2, req: "選修", category: "學程", year: 2, sem: "", program: "cloud", done: false },
    { id: "2822G1", name: "資訊管理與成本結算實務應用", credits: 2, req: "選修", category: "學程", year: 2, sem: "", program: "cloud", done: false },
    { id: "283101", name: "物聯網實務與安全",           credits: 2, req: "選修", category: "學程", year: 3, sem: "", program: "cloud", done: false, note: "「電子電路導論與物聯網實務」可抵換本課程" },
    { id: "2831D1", name: "供應鏈管理",                 credits: 2, req: "選修", category: "學程", year: 3, sem: "", program: "cloud", done: false },
    { id: "2831M1", name: "行動裝置程式設計",           credits: 2, req: "選修", category: "學程", year: 3, sem: "", program: "cloud", done: false },
    { id: "2831T1", name: "企業資源規劃",               credits: 2, req: "選修", category: "學程", year: 3, sem: "", program: "cloud", done: false },
    { id: "2832A1", name: "高等資料庫",                 credits: 2, req: "選修", category: "學程", year: 3, sem: "", program: "cloud", done: false },
    { id: "284081", name: "雲端運算與安全",             credits: 2, req: "選修", category: "學程", year: 4, sem: "", program: "cloud", done: false, note: "「雲端計算」可抵換本課程" },
    { id: "2841B1", name: "顧客關係管理",               credits: 2, req: "選修", category: "學程", year: 4, sem: "", program: "cloud", done: false },
    { id: "2841S1", name: "演算法概論",                 credits: 2, req: "選修", category: "學程", year: 4, sem: "", program: "cloud", done: false },
    { id: "2841M1", name: "資訊管理實習(一)",           credits: 3, req: "選修", category: "學程", year: 3, sem: "", program: "cloud", done: false, capGroup: "intern", note: "實習(一)~(四)最多認列 6 學分" },
    { id: "2841N1", name: "資訊管理實習(二)",           credits: 3, req: "選修", category: "學程", year: 3, sem: "", program: "cloud", done: false, capGroup: "intern", note: "實習(一)~(四)最多認列 6 學分" },
    { id: "2841Q1", name: "資訊管理實習(三)",           credits: 3, req: "選修", category: "學程", year: 4, sem: "", program: "cloud", done: false, capGroup: "intern", note: "實習(一)~(四)最多認列 6 學分" },
    { id: "282021", name: "資訊管理實習(四)",           credits: 3, req: "選修", category: "學程", year: 4, sem: "", program: "cloud", done: false, capGroup: "intern", note: "實習(一)~(四)最多認列 6 學分" },

    /* ==================== 深化學程：人工智慧與數位媒體學程 ====================
     * ★★★ 以下全部都是「範例占位課程」！★★★
     * 你提供的成績審核資料裡沒有這個學程的課程清單，
     * 請對照系上公告的學程科目表，把課名 / 學分 / 學科碼(id) / 年級改成正確的，
     * 多的課直接照格式加一列、用不到的整列刪掉即可。
     * ======================================================================= */
    { id: "AI-01", name: "【範例請修改】人工智慧概論",   credits: 2, req: "選修", category: "學程", year: 2, sem: "", program: "ai", done: false, note: "占位課程，請填入實際學程課程" },
    { id: "AI-02", name: "【範例請修改】機器學習",       credits: 2, req: "選修", category: "學程", year: 2, sem: "", program: "ai", done: false, note: "占位課程，請填入實際學程課程" },
    { id: "AI-03", name: "【範例請修改】深度學習應用",   credits: 2, req: "選修", category: "學程", year: 3, sem: "", program: "ai", done: false, note: "占位課程，請填入實際學程課程" },
    { id: "AI-04", name: "【範例請修改】數位影像處理",   credits: 2, req: "選修", category: "學程", year: 3, sem: "", program: "ai", done: false, note: "占位課程，請填入實際學程課程" },
    { id: "AI-05", name: "【範例請修改】3D建模與動畫",   credits: 2, req: "選修", category: "學程", year: 3, sem: "", program: "ai", done: false, note: "占位課程，請填入實際學程課程" },
    { id: "AI-06", name: "【範例請修改】遊戲設計",       credits: 2, req: "選修", category: "學程", year: 4, sem: "", program: "ai", done: false, note: "占位課程，請填入實際學程課程" },
    { id: "AI-07", name: "【範例請修改】數位內容創作",   credits: 2, req: "選修", category: "學程", year: 4, sem: "", program: "ai", done: false, note: "占位課程，請填入實際學程課程" },
    { id: "AI-08", name: "【範例請修改】AI專題實作",     credits: 2, req: "選修", category: "學程", year: 4, sem: "", program: "ai", done: false, note: "占位課程，請填入實際學程課程" },
  ],
};

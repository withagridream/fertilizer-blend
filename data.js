// 出典：農林水産省「作物別施肥基準」・タキイ種苗「山田式家庭菜園教室」・NHKみんなの趣味の園芸
// 数値は家庭菜園向けの参考値。地域・土壌・気候・品種により異なります。

const MONTH_DATA = {
  1: {
    label: "1月",
    note: "屋外は難しい季節。室内・窓辺で楽しめる品目がおすすめ。",
    vegetables: ["sprout", "microgreen", "radish", "chive", "parsley"]
  },
  2: {
    label: "2月",
    note: "早春の準備期。トンネル栽培があれば葉物もスタートできる。",
    vegetables: ["spinach", "komatsuna", "radish", "parsley", "chive"]
  },
  3: {
    label: "3月",
    note: "夏野菜の育苗スタート月。室内で苗を育て始めよう。",
    vegetables: ["tomato", "eggplant", "pepper", "cabbage", "broccoli"]
  },
  4: {
    label: "4月",
    note: "春本番。キュウリ・エダマメは直まき・定植が可能になる。",
    vegetables: ["cucumber", "edamame", "mini_tomato", "basil", "radish"]
  },
  5: {
    label: "5月",
    note: "夏野菜の季節。ゴーヤ・オクラ・インゲンはGW前後が植えどき。",
    vegetables: ["goya", "okra", "green_bean", "shiso", "watermelon"]
  },
  6: {
    label: "6月",
    note: "梅雨前後。シソ・モロヘイヤは暑さに強く初心者向き。",
    vegetables: ["shiso", "goya", "moroheiya", "okra", "basil"]
  },
  7: {
    label: "7月",
    note: "秋野菜の準備スタート。ニンジン・チンゲンサイは今仕込もう。",
    vegetables: ["carrot", "cucumber", "green_bean", "chingensai", "okra"]
  },
  8: {
    label: "8月",
    note: "秋冬野菜の種まきシーズン到来。大根・白菜は8月下旬から。",
    vegetables: ["daikon", "hakusai", "broccoli", "spinach", "komatsuna"]
  },
  9: {
    label: "9月",
    note: "葉物野菜の黄金期。涼しくなったら次々種まきできる。",
    vegetables: ["spinach", "komatsuna", "chingensai", "mizuna", "shungiku"]
  },
  10: {
    label: "10月",
    note: "越冬野菜の準備月。玉ねぎ・ニンニク・そら豆はこの時期に。",
    vegetables: ["onion", "soramame", "endou", "garlic", "spinach"]
  },
  11: {
    label: "11月",
    note: "越冬栽培のラストチャンス。寒じめほうれん草は甘みが増す。",
    vegetables: ["soramame", "endou", "spinach", "komatsuna", "onion"]
  },
  12: {
    label: "12月",
    note: "屋外は休眠期。室内でスプラウトやハーブを楽しもう。",
    vegetables: ["sprout", "microgreen", "chive", "negi", "radish"]
  }
};

// stages: seedling=育苗期 growth=生長期 flowering=開花・着果期 harvest=収穫期
// npk: 推奨N-P-K比率（%）
// tip: ひとことアドバイス
// products: ホームセンター系市販品
// drugstore: ドラッグストア・スーパーで入手できる代替品

const VEGETABLE_DATA = {
  tomato: {
    name: "トマト",
    emoji: "🍅",
    stages: ["seedling", "growth", "flowering", "harvest"],
    npk: {
      seedling:  { n: 5,  p: 12, k: 5,  tip: "根の発達優先。窒素は抑えてリン酸多め。徒長に注意。" },
      growth:    { n: 8,  p: 8,  k: 8,  tip: "バランス型でしっかり育てる。窒素過多は葉ばかり茂る。" },
      flowering: { n: 6,  p: 8,  k: 10, tip: "カリを増やして着果を促進。実をしっかり太らせる。" },
      harvest:   { n: 4,  p: 6,  k: 8,  tip: "肥料は控えめに。カリで甘みと品質を上げる。" }
    },
    products: {
      seedling:  ["ハイポネックス原液（500倍希釈）"],
      growth:    ["化成肥料8-8-8（一株あたり小さじ1〜2杯）", "マイガーデン野菜用"],
      flowering: ["ハイポネックス開花促進タイプ", "カリ配合の追肥（硫酸カリ少量）"],
      harvest:   ["液肥を週1回程度（薄め）"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈で発根促進（園芸店・ホームセンターでも可）"],
      growth:    ["食酢200倍希釈を葉面散布（根の活性化・病気予防）"],
      flowering: ["重曹1000倍水溶液を葉面散布（うどんこ病予防を兼ねて）"],
      harvest:   ["牛乳100倍希釈を葉面散布（アブラムシ対策＋カルシウム補給）"]
    },
    pests: [
      { name: "アブラムシ", timing: "4〜6月・秋", measure: "牛乳100倍希釈を葉面散布。黄色粘着シートも有効。" },
      { name: "コナジラミ", timing: "夏", measure: "黄色粘着シートを株の横に設置。防虫ネットで予防。" },
      { name: "オオタバコガ（青虫）", timing: "夏〜秋", measure: "実に穴が開いたらサイン。見つけたら手で捕殺。" }
    ]
  },

  mini_tomato: {
    name: "ミニトマト",
    emoji: "🍒",
    stages: ["seedling", "growth", "flowering", "harvest"],
    npk: {
      seedling:  { n: 5,  p: 12, k: 5,  tip: "トマトと同じ。根張りを最優先に。" },
      growth:    { n: 8,  p: 8,  k: 8,  tip: "成長旺盛。窒素过多に注意して様子を見ながら追肥。" },
      flowering: { n: 6,  p: 8,  k: 10, tip: "カリを効かせて甘みのある実に。" },
      harvest:   { n: 4,  p: 6,  k: 8,  tip: "着色が始まったら肥料は最小限に。" }
    },
    products: {
      seedling:  ["ハイポネックス原液（500倍希釈）"],
      growth:    ["化成肥料8-8-8", "マイガーデン野菜用"],
      flowering: ["カリ入り液肥", "ハイポネックス開花促進"],
      harvest:   ["液肥を薄めに週1回"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["食酢200倍希釈を葉面散布"],
      flowering: ["重曹1000倍水溶液でうどんこ病予防"],
      harvest:   ["牛乳100倍希釈でアブラムシ対策"]
    },
    pests: [
      { name: "アブラムシ", timing: "春・秋", measure: "牛乳100倍希釈を葉裏に散布。シルバーマルチで忌避。" },
      { name: "コナジラミ", timing: "夏", measure: "黄色粘着シート設置。葉裏を水でしっかり洗う。" }
    ]
  },

  eggplant: {
    name: "ナス",
    emoji: "🍆",
    stages: ["seedling", "growth", "flowering", "harvest"],
    npk: {
      seedling:  { n: 5,  p: 12, k: 5,  tip: "根張り重視。定植後の活着を確実に。" },
      growth:    { n: 10, p: 8,  k: 8,  tip: "肥料食いの野菜。窒素をしっかり与えて葉を育てる。" },
      flowering: { n: 8,  p: 8,  k: 10, tip: "花が落ちる場合はカリ不足が疑われる。" },
      harvest:   { n: 6,  p: 6,  k: 8,  tip: "収穫後も追肥を続けて長期収穫を目指す。" }
    },
    products: {
      seedling:  ["ハイポネックス原液（500倍希釈）"],
      growth:    ["化成肥料8-8-8（2週間に1回）", "マイガーデン野菜用"],
      flowering: ["カリ入り液肥", "草木灰をひとつまみ根元に"],
      harvest:   ["化成肥料8-8-8（収穫のたびに少量追肥）"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈で活着促進"],
      growth:    ["木酢液500倍希釈を根元に散布（根の活性化）"],
      flowering: ["重曹1000倍水溶液でうどんこ病予防"],
      harvest:   ["食酢200倍希釈を葉面散布（病気予防）"]
    },
    pests: [
      { name: "アブラムシ", timing: "春〜秋", measure: "牛乳100倍希釈。木酢液で忌避効果も。" },
      { name: "ハダニ", timing: "梅雨明け〜真夏", measure: "葉裏に霧吹きで水をかける。高温乾燥に注意。" },
      { name: "ニジュウヤホシテントウ（テントウムシダマシ）", timing: "夏", measure: "葉に白い食べ跡が出たらサイン。見つけたら捕殺。" }
    ]
  },

  cucumber: {
    name: "キュウリ",
    emoji: "🥒",
    stages: ["seedling", "growth", "flowering", "harvest"],
    npk: {
      seedling:  { n: 5,  p: 12, k: 5,  tip: "根を深く張らせる。定植後は少し乾燥気味に管理。" },
      growth:    { n: 10, p: 8,  k: 8,  tip: "ツルが伸びる時期は窒素を切らさない。" },
      flowering: { n: 8,  p: 8,  k: 10, tip: "実が太る時期はカリを多めに。水切れにも注意。" },
      harvest:   { n: 8,  p: 6,  k: 10, tip: "収穫が続く間は追肥も継続。2週に1回が目安。" }
    },
    products: {
      seedling:  ["ハイポネックス原液（500倍希釈）"],
      growth:    ["化成肥料8-8-8", "マイガーデン野菜用"],
      flowering: ["カリ入り液肥（週1回）"],
      harvest:   ["化成肥料8-8-8（2週間に1回）"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["木酢液500倍希釈を根元に"],
      flowering: ["牛乳100倍希釈でアブラムシ対策"],
      harvest:   ["重曹1000倍水溶液でうどんこ病予防（特に梅雨時）"]
    },
    pests: [
      { name: "アブラムシ", timing: "春〜初夏", measure: "牛乳100倍希釈を葉裏に散布。黄色粘着シート有効。" },
      { name: "うどんこ病（病気）", timing: "梅雨〜秋", measure: "重曹1000倍水溶液を定期散布。風通しを良くする。" },
      { name: "ウリハムシ", timing: "5〜8月", measure: "防虫ネットが最も有効。成虫は手で捕殺。" }
    ]
  },

  pepper: {
    name: "ピーマン",
    emoji: "🫑",
    stages: ["seedling", "growth", "flowering", "harvest"],
    npk: {
      seedling:  { n: 5,  p: 12, k: 5,  tip: "ゆっくり育つ。焦らず根張りを待つ。" },
      growth:    { n: 8,  p: 8,  k: 8,  tip: "バランス型でじっくり育てる。" },
      flowering: { n: 6,  p: 8,  k: 10, tip: "カリを効かせて実を充実させる。" },
      harvest:   { n: 4,  p: 6,  k: 8,  tip: "秋まで長期収穫できる。追肥を切らさない。" }
    },
    products: {
      seedling:  ["ハイポネックス原液（500倍希釈）"],
      growth:    ["化成肥料8-8-8", "マイガーデン野菜用"],
      flowering: ["カリ入り液肥"],
      harvest:   ["化成肥料8-8-8（2〜3週間に1回）"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["食酢200倍希釈を葉面散布"],
      flowering: ["重曹1000倍水溶液でうどんこ病予防"],
      harvest:   ["牛乳100倍希釈でアブラムシ対策"]
    },
    pests: [
      { name: "アブラムシ", timing: "春〜秋", measure: "牛乳100倍希釈。密植を避け風通しを良くする。" },
      { name: "タバコガ（実に穴）", timing: "夏〜秋", measure: "実に穴が開いたらサイン。見つけ次第捕殺。" }
    ]
  },

  spinach: {
    name: "ほうれん草",
    emoji: "🌿",
    stages: ["seedling", "growth", "harvest"],
    npk: {
      seedling:  { n: 8,  p: 10, k: 8,  tip: "発芽後の初期生育。石灰で土の酸度調整が必須。" },
      growth:    { n: 10, p: 8,  k: 10, tip: "葉を大きく育てる。窒素とカリをバランスよく。" },
      harvest:   { n: 8,  p: 6,  k: 10, tip: "寒さに当てると甘みが増す（寒じめ）。" }
    },
    products: {
      seedling:  ["苦土石灰で土壌pH調整（種まき2週間前）", "化成肥料8-8-8（元肥）"],
      growth:    ["液肥（ハイポネックス原液1000倍）を週1〜2回"],
      harvest:   ["追肥は不要。水切れだけ注意。"]
    },
    drugstore: {
      seedling:  ["重曹をごく少量混ぜてpH調整（応急処置）"],
      growth:    ["食酢200倍希釈を水やりがわりに（根の活性化）"],
      harvest:   ["牛乳100倍希釈でアブラムシ対策"]
    },
    pests: [
      { name: "アブラムシ", timing: "春・秋", measure: "牛乳100倍希釈を葉面散布。防虫ネットが最も有効。" },
      { name: "ヨトウムシ", timing: "秋", measure: "夜間に土の中に潜む。見つけたら手で捕殺。" }
    ]
  },

  komatsuna: {
    name: "小松菜",
    emoji: "🥬",
    stages: ["seedling", "growth", "harvest"],
    npk: {
      seedling:  { n: 8,  p: 10, k: 8,  tip: "ほうれん草より酸性に強い。育てやすい入門野菜。" },
      growth:    { n: 10, p: 8,  k: 10, tip: "追肥で一気に大きくなる。液肥が効果的。" },
      harvest:   { n: 8,  p: 6,  k: 10, tip: "20〜25cmになったら収穫。小さいうちもやわらかくて美味。" }
    },
    products: {
      seedling:  ["化成肥料8-8-8（元肥少量）"],
      growth:    ["液肥（ハイポネックス原液1000倍）を週1回"],
      harvest:   ["追肥ほぼ不要。水切れ注意。"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈で発芽促進"],
      growth:    ["食酢200倍希釈で根の活性化"],
      harvest:   ["牛乳100倍希釈でアブラムシ対策"]
    },
    pests: [
      { name: "アオムシ・コナガ", timing: "春・秋", measure: "防虫ネットのべた掛けが最強の予防策。" },
      { name: "アブラムシ", timing: "春・秋", measure: "牛乳100倍希釈を葉面散布。" }
    ]
  },

  radish: {
    name: "ラディッシュ",
    emoji: "🔴",
    stages: ["seedling", "growth", "harvest"],
    npk: {
      seedling:  { n: 5,  p: 10, k: 8,  tip: "発芽は早い。間引きをしっかりして根を太らせる。" },
      growth:    { n: 8,  p: 8,  k: 10, tip: "カリを効かせて球を丸く育てる。" },
      harvest:   { n: 5,  p: 6,  k: 8,  tip: "種まきから20〜30日で収穫。植えっぱなしで割れに注意。" }
    },
    products: {
      seedling:  ["化成肥料8-8-8（元肥のみ。追肥ほぼ不要）"],
      growth:    ["液肥（薄め）を1〜2回程度"],
      harvest:   ["追肥不要"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈で発芽促進"],
      growth:    ["特になし。水やりだけで十分育つ。"],
      harvest:   ["特になし"]
    },
    pests: [
      { name: "アオムシ・コナガ", timing: "春・秋", measure: "防虫ネットで完全予防が可能。" },
      { name: "ナメクジ", timing: "梅雨前後", measure: "銅テープをプランター縁に貼る。夜間チェック。" }
    ]
  },

  basil: {
    name: "バジル",
    emoji: "🌱",
    stages: ["seedling", "growth", "harvest"],
    npk: {
      seedling:  { n: 8,  p: 8,  k: 8,  tip: "20℃以上で発芽。寒さに弱いので気温に注意。" },
      growth:    { n: 10, p: 8,  k: 8,  tip: "窒素をしっかり与えて葉を大きく育てる。" },
      harvest:   { n: 8,  p: 6,  k: 8,  tip: "花芽が出たらすぐ摘む（摘心）と葉が増える。" }
    },
    products: {
      seedling:  ["液肥（ハイポネックス原液1000倍）"],
      growth:    ["液肥を週1〜2回。乾きやすいので水切れ注意。"],
      harvest:   ["液肥を週1回（収穫後の回復を促す）"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["食酢200倍希釈で根の活性化"],
      harvest:   ["牛乳100倍希釈でアブラムシ対策"]
    },
    pests: [
      { name: "アブラムシ", timing: "春〜秋", measure: "牛乳100倍希釈を葉裏に散布。密植を避ける。" },
      { name: "ナメクジ", timing: "梅雨", measure: "夜間パトロール。銅テープで侵入を防ぐ。" }
    ]
  },

  edamame: {
    name: "エダマメ",
    emoji: "🫛",
    stages: ["seedling", "growth", "flowering", "harvest"],
    npk: {
      seedling:  { n: 2,  p: 8,  k: 5,  tip: "マメ科は根粒菌が窒素を固定する。窒素肥料は極少量に。" },
      growth:    { n: 3,  p: 6,  k: 5,  tip: "窒素を与えすぎると葉ばかりで実が入らない。" },
      flowering: { n: 2,  p: 8,  k: 6,  tip: "開花期はリン酸を効かせて実の充実を促す。" },
      harvest:   { n: 2,  p: 6,  k: 6,  tip: "実がプクッとしてきたら収穫サイン。採り遅れ注意。" }
    },
    products: {
      seedling:  ["元肥：過リン酸石灰のみ少量（窒素は不要）"],
      growth:    ["追肥は基本不要。葉色が薄い場合のみ液肥を薄めに。"],
      flowering: ["過リン酸石灰を少量追肥"],
      harvest:   ["追肥不要"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈で発芽促進"],
      growth:    ["特になし。水やりを切らさない。"],
      flowering: ["木酢液500倍希釈で根元に（根の活性化）"],
      harvest:   ["特になし"]
    },
    pests: [
      { name: "カメムシ", timing: "夏", measure: "実が膨らむ頃に多発。防虫ネットが有効。においに注意して捕殺。" },
      { name: "アブラムシ", timing: "春〜初夏", measure: "牛乳100倍希釈を葉裏に散布。" }
    ]
  },

  daikon: {
    name: "大根",
    emoji: "🌾",
    stages: ["seedling", "growth", "harvest"],
    npk: {
      seedling:  { n: 5,  p: 10, k: 8,  tip: "深さ30cm以上の土が必要。石や堆肥の固まりで股割れする。" },
      growth:    { n: 8,  p: 8,  k: 10, tip: "カリを効かせて根を太らせる。月1回の追肥が基本。" },
      harvest:   { n: 6,  p: 6,  k: 10, tip: "首が地上に5cmほど出てきたら収穫サイン。" }
    },
    products: {
      seedling:  ["化成肥料8-8-8（元肥）"],
      growth:    ["化成肥料8-8-8（月1回追肥）"],
      harvest:   ["追肥不要"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["木酢液500倍希釈を根元に"],
      harvest:   ["特になし"]
    },
    pests: [
      { name: "アオムシ・コナガ", timing: "春・秋", measure: "防虫ネットのべた掛けが最強。" },
      { name: "ナメクジ", timing: "秋の雨後", measure: "夜間パトロールして手で捕殺。ビールトラップも有効。" }
    ]
  },

  cabbage: {
    name: "キャベツ",
    emoji: "🥦",
    stages: ["seedling", "growth", "harvest"],
    npk: {
      seedling:  { n: 5,  p: 12, k: 5,  tip: "育苗40〜50日。本葉4〜5枚で定植。" },
      growth:    { n: 10, p: 8,  k: 8,  tip: "外葉をしっかり育てることで球が大きくなる。" },
      harvest:   { n: 8,  p: 6,  k: 8,  tip: "球が手でたたいてカチカチになったら収穫適期。" }
    },
    products: {
      seedling:  ["ハイポネックス原液（500倍希釈）"],
      growth:    ["化成肥料8-8-8（2〜3週間に1回）"],
      harvest:   ["追肥不要"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["食酢200倍希釈で葉面散布（病気予防）"],
      harvest:   ["牛乳100倍希釈でアブラムシ対策"]
    },
    pests: [
      { name: "アオムシ・コナガ", timing: "春・秋", measure: "防虫ネットは必須。被害が出たら手で捕殺。" },
      { name: "ヨトウムシ", timing: "秋", measure: "夜間に株元や土中に潜む。見つけて捕殺。" },
      { name: "アブラムシ", timing: "春・秋", measure: "牛乳100倍希釈。密植を避ける。" }
    ]
  },

  broccoli: {
    name: "ブロッコリー",
    emoji: "🥦",
    stages: ["seedling", "growth", "harvest"],
    npk: {
      seedling:  { n: 5,  p: 12, k: 5,  tip: "育苗30〜40日。本葉5〜6枚で定植。" },
      growth:    { n: 10, p: 8,  k: 8,  tip: "肥料食い。窒素を切らすと頂花蕾が小さくなる。" },
      harvest:   { n: 8,  p: 6,  k: 8,  tip: "頂花蕾収穫後も追肥で側花蕾が採れる。" }
    },
    products: {
      seedling:  ["ハイポネックス原液（500倍希釈）"],
      growth:    ["化成肥料8-8-8（2週間に1回）"],
      harvest:   ["化成肥料8-8-8（頂花蕾収穫後に追肥）"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["食酢200倍希釈を葉面散布"],
      harvest:   ["牛乳100倍希釈でアブラムシ対策"]
    },
    pests: [
      { name: "アオムシ・コナガ", timing: "春・秋", measure: "防虫ネットのべた掛けが最も有効。" },
      { name: "ヨトウムシ", timing: "秋", measure: "株元の土を掘って探す。夜間チェックも有効。" }
    ]
  },

  carrot: {
    name: "ニンジン",
    emoji: "🥕",
    stages: ["seedling", "growth", "harvest"],
    npk: {
      seedling:  { n: 5,  p: 10, k: 8,  tip: "発芽が最難関。光を当てて（好光性種子）、乾かさない。" },
      growth:    { n: 8,  p: 8,  k: 10, tip: "カリを効かせて根を太らせる。間引きは2〜3回。" },
      harvest:   { n: 6,  p: 6,  k: 10, tip: "根の肩が1.5〜2cmになったら収穫サイン。" }
    },
    products: {
      seedling:  ["元肥：化成肥料8-8-8を少量（追肥は生長期まで不要）"],
      growth:    ["化成肥料8-8-8（月1回追肥）"],
      harvest:   ["追肥不要"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈を発芽前の水やりに混ぜる"],
      growth:    ["木酢液500倍希釈で根元に"],
      harvest:   ["特になし"]
    },
    pests: [
      { name: "アゲハ幼虫", timing: "夏", measure: "見つけたら手で捕殺。防虫ネットで予防。" },
      { name: "キアゲハ", timing: "春〜秋", measure: "卵の段階で取り除く。葉裏を確認。" }
    ]
  },

  negi: {
    name: "ネギ",
    emoji: "🧅",
    stages: ["seedling", "growth", "harvest"],
    npk: {
      seedling:  { n: 8,  p: 10, k: 8,  tip: "発芽に3週間程度かかる。土表面を乾かさないように。" },
      growth:    { n: 12, p: 8,  k: 8,  tip: "窒素をしっかり与えて茎を太らせる。土寄せも忘れずに。" },
      harvest:   { n: 10, p: 6,  k: 8,  tip: "少しずつ収穫して長期間楽しめる。" }
    },
    products: {
      seedling:  ["化成肥料8-8-8（元肥）"],
      growth:    ["化成肥料8-8-8（月1〜2回追肥）"],
      harvest:   ["化成肥料8-8-8（月1回）"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["木酢液500倍希釈で根元に（根の活性化）"],
      harvest:   ["特になし"]
    },
    pests: [
      { name: "アブラムシ", timing: "春・秋", measure: "牛乳100倍希釈を葉面散布。" },
      { name: "ネギアザミウマ", timing: "春〜秋", measure: "葉に白い筋が入ったらサイン。防虫ネットで予防。" }
    ]
  },

  shiso: {
    name: "シソ（大葉）",
    emoji: "🍃",
    stages: ["seedling", "growth", "harvest"],
    npk: {
      seedling:  { n: 8,  p: 8,  k: 8,  tip: "光好き種子。覆土を薄くして光を当てて発芽させる。" },
      growth:    { n: 10, p: 8,  k: 8,  tip: "摘心すると脇芽が増えて収穫量が上がる。" },
      harvest:   { n: 8,  p: 6,  k: 8,  tip: "花芽が出たらすぐ摘む。出遅れると葉が硬くなる。" }
    },
    products: {
      seedling:  ["液肥（ハイポネックス原液1000倍）"],
      growth:    ["化成肥料8-8-8（月1回）または液肥"],
      harvest:   ["液肥を週1回（収穫後の回復促進）"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["食酢200倍希釈で葉面散布"],
      harvest:   ["牛乳100倍希釈でアブラムシ対策"]
    },
    pests: [
      { name: "アブラムシ", timing: "春〜秋", measure: "牛乳100倍希釈を葉裏に散布。" },
      { name: "ハスモンヨトウ", timing: "夏〜秋", measure: "葉に穴が開いたらサイン。夜間に捕殺。" }
    ]
  },

  okra: {
    name: "オクラ",
    emoji: "🌟",
    stages: ["seedling", "growth", "flowering", "harvest"],
    npk: {
      seedling:  { n: 5,  p: 10, k: 5,  tip: "高温好き。20℃以下では発芽しない。" },
      growth:    { n: 8,  p: 8,  k: 8,  tip: "背が高くなる。支柱を早めに立てる。" },
      flowering: { n: 6,  p: 8,  k: 8,  tip: "開花からたった4〜5日で収穫サイズに。" },
      harvest:   { n: 6,  p: 6,  k: 8,  tip: "10cm以内で収穫。大きくなると硬くなる。追肥を続ける。" }
    },
    products: {
      seedling:  ["ハイポネックス原液（500倍希釈）"],
      growth:    ["化成肥料8-8-8（2〜3週間に1回）"],
      flowering: ["カリ入り液肥"],
      harvest:   ["化成肥料8-8-8（収穫中も継続）"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["木酢液500倍希釈を根元に"],
      flowering: ["特になし"],
      harvest:   ["牛乳100倍希釈でアブラムシ対策"]
    },
    pests: [
      { name: "アブラムシ", timing: "夏", measure: "牛乳100倍希釈。風通しを良くする。" },
      { name: "カメムシ", timing: "夏〜秋", measure: "見つけたら捕殺。においに注意。防虫ネット有効。" }
    ]
  },

  goya: {
    name: "ゴーヤ",
    emoji: "🌿",
    stages: ["seedling", "growth", "flowering", "harvest"],
    npk: {
      seedling:  { n: 5,  p: 10, k: 5,  tip: "種のとがった部分を少し削ると発芽しやすい（種の処理）。" },
      growth:    { n: 8,  p: 8,  k: 8,  tip: "グリーンカーテンに最適。ネットを早めに張る。" },
      flowering: { n: 6,  p: 8,  k: 10, tip: "雌花を見つけたら人工授粉で確実に着果。" },
      harvest:   { n: 6,  p: 6,  k: 8,  tip: "緑のうちに収穫。黄色くなると種が硬くなる。" }
    },
    products: {
      seedling:  ["ハイポネックス原液（500倍希釈）"],
      growth:    ["化成肥料8-8-8（2週間に1回）"],
      flowering: ["カリ入り液肥"],
      harvest:   ["化成肥料8-8-8（継続）"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["木酢液500倍希釈で根元に"],
      flowering: ["重曹1000倍水溶液でうどんこ病予防"],
      harvest:   ["牛乳100倍希釈でアブラムシ対策"]
    },
    pests: [
      { name: "アブラムシ", timing: "春〜秋", measure: "牛乳100倍希釈。密植を避ける。" },
      { name: "ウリハムシ", timing: "5〜8月", measure: "防虫ネット設置。成虫は朝方に捕殺しやすい。" }
    ]
  },

  green_bean: {
    name: "インゲン",
    emoji: "🫘",
    stages: ["seedling", "growth", "flowering", "harvest"],
    npk: {
      seedling:  { n: 2,  p: 8,  k: 5,  tip: "マメ科は窒素少なめ。根粒菌が窒素を作る。" },
      growth:    { n: 5,  p: 6,  k: 6,  tip: "ツル性は支柱を立てる。つるなし品種はコンパクトに育つ。" },
      flowering: { n: 4,  p: 8,  k: 6,  tip: "開花期はリン酸を効かせる。" },
      harvest:   { n: 4,  p: 6,  k: 6,  tip: "さやが5〜6cmで収穫。採り遅れは株を疲れさせる。" }
    },
    products: {
      seedling:  ["元肥：過リン酸石灰のみ（窒素不要）"],
      growth:    ["追肥はほぼ不要"],
      flowering: ["液肥を薄めに1〜2回"],
      harvest:   ["追肥不要"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["特になし"],
      flowering: ["木酢液500倍希釈で根元に"],
      harvest:   ["特になし"]
    },
    pests: [
      { name: "アブラムシ", timing: "春〜秋", measure: "牛乳100倍希釈を葉裏に散布。" },
      { name: "ハダニ", timing: "夏の高温乾燥期", measure: "葉裏に霧吹きで水をかける。乾燥を防ぐ。" }
    ]
  },

  chingensai: {
    name: "チンゲンサイ",
    emoji: "🥬",
    stages: ["seedling", "growth", "harvest"],
    npk: {
      seedling:  { n: 8,  p: 10, k: 8,  tip: "発芽は早い。間引きをしっかりして株間をとる。" },
      growth:    { n: 10, p: 8,  k: 10, tip: "液肥で一気に大きくなる。水切れ注意。" },
      harvest:   { n: 8,  p: 6,  k: 8,  tip: "20〜25cmで収穫。葉が開いてきたら採り時。" }
    },
    products: {
      seedling:  ["化成肥料8-8-8（元肥）"],
      growth:    ["液肥（ハイポネックス原液1000倍）を週1回"],
      harvest:   ["追肥不要"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["食酢200倍希釈で根の活性化"],
      harvest:   ["牛乳100倍希釈でアブラムシ対策"]
    },
    pests: [
      { name: "アオムシ・コナガ", timing: "春・秋", measure: "防虫ネットのべた掛けが有効。" },
      { name: "アブラムシ", timing: "春・秋", measure: "牛乳100倍希釈を葉裏に散布。" }
    ]
  },

  mizuna: {
    name: "水菜",
    emoji: "🌿",
    stages: ["seedling", "growth", "harvest"],
    npk: {
      seedling:  { n: 8,  p: 10, k: 8,  tip: "発芽は5〜7日。比較的育てやすい。" },
      growth:    { n: 10, p: 8,  k: 10, tip: "液肥で一気に大きくなる。" },
      harvest:   { n: 8,  p: 6,  k: 8,  tip: "25〜30cmで収穫。大株に育てると使い勝手が良い。" }
    },
    products: {
      seedling:  ["化成肥料8-8-8（元肥）"],
      growth:    ["液肥（ハイポネックス原液1000倍）を週1回"],
      harvest:   ["追肥不要"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["食酢200倍希釈"],
      harvest:   ["牛乳100倍希釈でアブラムシ対策"]
    },
    pests: [
      { name: "アオムシ・コナガ", timing: "春・秋", measure: "防虫ネットが有効。" },
      { name: "ナメクジ", timing: "梅雨", measure: "夜間チェック。ビールトラップも有効。" }
    ]
  },

  shungiku: {
    name: "春菊",
    emoji: "🌼",
    stages: ["seedling", "growth", "harvest"],
    npk: {
      seedling:  { n: 8,  p: 10, k: 8,  tip: "嫌光性種子なので覆土をしっかりする。" },
      growth:    { n: 10, p: 8,  k: 8,  tip: "液肥で育てると柔らかく風味よく仕上がる。" },
      harvest:   { n: 8,  p: 6,  k: 8,  tip: "花が咲く前に収穫。摘み取り栽培で長期間楽しめる。" }
    },
    products: {
      seedling:  ["化成肥料8-8-8（元肥）"],
      growth:    ["液肥（ハイポネックス原液1000倍）を週1回"],
      harvest:   ["追肥不要"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["食酢200倍希釈"],
      harvest:   ["牛乳100倍希釈でアブラムシ対策"]
    },
    pests: [
      { name: "アブラムシ", timing: "春・秋", measure: "牛乳100倍希釈を葉面散布。" },
      { name: "ヨトウムシ", timing: "秋", measure: "夜間に株元を確認して捕殺。" }
    ]
  },

  onion: {
    name: "玉ねぎ",
    emoji: "🧅",
    stages: ["seedling", "growth", "harvest"],
    npk: {
      seedling:  { n: 5,  p: 10, k: 8,  tip: "育苗60日。鉛筆くらいの太さで定植。" },
      growth:    { n: 10, p: 8,  k: 10, tip: "越冬後の春先に追肥で一気に球を太らせる。" },
      harvest:   { n: 8,  p: 6,  k: 10, tip: "葉が自然に倒れたら収穫サイン。追肥はストップ。" }
    },
    products: {
      seedling:  ["化成肥料8-8-8（元肥）"],
      growth:    ["化成肥料8-8-8（2月〜3月に2回追肥）"],
      harvest:   ["追肥不要（球が膨らみ始めたらストップ）"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["木酢液500倍希釈で根元に"],
      harvest:   ["特になし"]
    },
    pests: [
      { name: "アブラムシ（ネギアブラムシ）", timing: "春", measure: "牛乳100倍希釈を葉面散布。" },
      { name: "ネギアザミウマ", timing: "春〜初夏", measure: "白い筋が入ったらサイン。防虫ネットで予防。" }
    ]
  },

  soramame: {
    name: "そら豆",
    emoji: "🫘",
    stages: ["seedling", "growth", "flowering", "harvest"],
    npk: {
      seedling:  { n: 2,  p: 8,  k: 5,  tip: "「お歯黒」を下に向けて植える。窒素は最小限。" },
      growth:    { n: 3,  p: 6,  k: 5,  tip: "越冬させて春に一気に成長。支柱を立てる。" },
      flowering: { n: 2,  p: 8,  k: 6,  tip: "開花期はリン酸を効かせる。摘芯で実を充実させる。" },
      harvest:   { n: 2,  p: 6,  k: 6,  tip: "さやがうつむいてきたら収穫サイン。" }
    },
    products: {
      seedling:  ["元肥：過リン酸石灰のみ少量"],
      growth:    ["追肥は基本不要"],
      flowering: ["過リン酸石灰を少量"],
      harvest:   ["追肥不要"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["特になし"],
      flowering: ["木酢液500倍希釈で根元に"],
      harvest:   ["特になし"]
    },
    pests: [
      { name: "アブラムシ（黒いアブラムシ）", timing: "春（開花後）", measure: "早期発見が重要。牛乳100倍希釈。大発生前に対処。" },
      { name: "ナメクジ", timing: "秋の種まき後", measure: "銅テープをプランター縁に貼る。" }
    ]
  },

  endou: {
    name: "エンドウ",
    emoji: "🫛",
    stages: ["seedling", "growth", "flowering", "harvest"],
    npk: {
      seedling:  { n: 2,  p: 8,  k: 5,  tip: "マメ科。窒素少なめで根粒菌に任せる。" },
      growth:    { n: 3,  p: 6,  k: 5,  tip: "ネットや支柱に絡ませる。誘引が大切。" },
      flowering: { n: 2,  p: 8,  k: 6,  tip: "開花が始まったらリン酸を効かせる。" },
      harvest:   { n: 2,  p: 6,  k: 6,  tip: "さやえんどうは平らなうちに、スナックえんどうはふっくらしたら収穫。" }
    },
    products: {
      seedling:  ["元肥：過リン酸石灰のみ"],
      growth:    ["追肥は基本不要"],
      flowering: ["過リン酸石灰を少量"],
      harvest:   ["追肥不要"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["特になし"],
      flowering: ["木酢液500倍希釈で根元に"],
      harvest:   ["特になし"]
    },
    pests: [
      { name: "アブラムシ", timing: "春", measure: "牛乳100倍希釈。発生初期に対処が重要。" },
      { name: "うどんこ病（病気）", timing: "春", measure: "重曹1000倍水溶液を定期散布。風通しを良く。" }
    ]
  },

  garlic: {
    name: "ニンニク",
    emoji: "🧄",
    stages: ["seedling", "growth", "harvest"],
    npk: {
      seedling:  { n: 5,  p: 8,  k: 8,  tip: "鱗片を1片ずつ分けて植える。尖った方を上に。" },
      growth:    { n: 10, p: 6,  k: 10, tip: "春の萌芽後に追肥。窒素とカリでしっかり育てる。" },
      harvest:   { n: 8,  p: 6,  k: 10, tip: "葉が半分以上枯れたら収穫サイン。梅雨前に収穫。" }
    },
    products: {
      seedling:  ["化成肥料8-8-8（元肥）"],
      growth:    ["化成肥料8-8-8（春先に2〜3回追肥）"],
      harvest:   ["追肥不要"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["木酢液500倍希釈で根元に"],
      harvest:   ["特になし"]
    },
    pests: [
      { name: "アブラムシ", timing: "春", measure: "牛乳100倍希釈。早期対処で十分。" },
      { name: "ネギコガ（葉に白い食べ痕）", timing: "春", measure: "見つけたら葉ごと除去。防虫ネットで予防。" }
    ]
  },

  sprout: {
    name: "スプラウト（発芽野菜）",
    emoji: "🌱",
    stages: ["seedling", "harvest"],
    npk: {
      seedling:  { n: 0,  p: 0,  k: 0,  tip: "肥料は不要。種自体の栄養で育つ。水だけで完結。" },
      harvest:   { n: 0,  p: 0,  k: 0,  tip: "発芽から3〜7日で収穫。ブロッコリースプラウトは栄養価が特に高い。" }
    },
    products: {
      seedling:  ["肥料不要。清潔な水のみ。"],
      harvest:   ["肥料不要"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈を発芽時の水に混ぜると発芽が揃いやすい（任意）"],
      harvest:   ["特になし"]
    },
    pests: [
      { name: "カビ（病気）", timing: "高温多湿期", measure: "水の交換を1日2回に増やす。清潔な容器を使う。" }
    ]
  },

  microgreen: {
    name: "マイクログリーン",
    emoji: "🌿",
    stages: ["seedling", "growth", "harvest"],
    npk: {
      seedling:  { n: 2,  p: 2,  k: 2,  tip: "肥料はほぼ不要。栄養豊かな培地（ロックウール等）なら不要。" },
      growth:    { n: 2,  p: 2,  k: 2,  tip: "水耕や土耕どちらでも可。光をしっかり当てる。" },
      harvest:   { n: 0,  p: 0,  k: 0,  tip: "本葉が出る前（子葉の段階）で収穫。10〜14日が目安。" }
    },
    products: {
      seedling:  ["肥料不要〜極少量液肥（ハイポネックス2000倍程度）"],
      growth:    ["液肥を薄めに週1回（任意）"],
      harvest:   ["追肥不要"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["特になし"],
      harvest:   ["特になし"]
    },
    pests: [
      { name: "カビ", timing: "高温多湿期", measure: "容器の清潔維持。水は毎日交換。" }
    ]
  },

  chive: {
    name: "チャイブ",
    emoji: "🌿",
    stages: ["seedling", "growth", "harvest"],
    npk: {
      seedling:  { n: 8,  p: 8,  k: 8,  tip: "発芽まで時間がかかる（2〜3週間）。乾かさないように。" },
      growth:    { n: 10, p: 6,  k: 8,  tip: "窒素をしっかり与えて葉を伸ばす。" },
      harvest:   { n: 8,  p: 6,  k: 8,  tip: "摘み取りを繰り返すと長期間収穫できる。" }
    },
    products: {
      seedling:  ["液肥（ハイポネックス原液1000倍）"],
      growth:    ["液肥を週1〜2回"],
      harvest:   ["液肥（収穫後の回復促進）"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["食酢200倍希釈"],
      harvest:   ["特になし"]
    },
    pests: [
      { name: "アブラムシ", timing: "春・秋", measure: "牛乳100倍希釈を葉面散布。" }
    ]
  },

  parsley: {
    name: "パセリ",
    emoji: "🌿",
    stages: ["seedling", "growth", "harvest"],
    npk: {
      seedling:  { n: 5,  p: 10, k: 5,  tip: "発芽に2〜4週間かかる。嫌光性なので覆土をしっかり。" },
      growth:    { n: 10, p: 8,  k: 8,  tip: "じっくり育てる。窒素をしっかり与えて葉を茂らせる。" },
      harvest:   { n: 8,  p: 6,  k: 8,  tip: "外葉から順に摘み取る。株の中心は残す。" }
    },
    products: {
      seedling:  ["液肥（ハイポネックス原液1000倍）"],
      growth:    ["化成肥料8-8-8（月1回）"],
      harvest:   ["液肥を週1回（収穫後の回復促進）"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["食酢200倍希釈"],
      harvest:   ["牛乳100倍希釈でアブラムシ対策"]
    },
    pests: [
      { name: "アゲハ幼虫", timing: "夏", measure: "見つけたら手で捕殺。防虫ネットで予防。" },
      { name: "アブラムシ", timing: "春・秋", measure: "牛乳100倍希釈を葉裏に散布。" }
    ]
  },

  watermelon: {
    name: "スイカ",
    emoji: "🍉",
    stages: ["seedling", "growth", "flowering", "harvest"],
    npk: {
      seedling:  { n: 5,  p: 10, k: 5,  tip: "高温好き。20℃以上の環境で育苗。" },
      growth:    { n: 8,  p: 8,  k: 8,  tip: "ツルを伸ばす時期は肥料をしっかり与える。" },
      flowering: { n: 5,  p: 8,  k: 10, tip: "人工授粉で確実に着果。授粉後はカリを増やす。" },
      harvest:   { n: 3,  p: 5,  k: 8,  tip: "授粉から40〜50日が収穫目安。叩いてポンポンと鳴ったらOK。" }
    },
    products: {
      seedling:  ["ハイポネックス原液（500倍希釈）"],
      growth:    ["化成肥料8-8-8（2〜3週間に1回）"],
      flowering: ["カリ入り液肥"],
      harvest:   ["追肥ほぼ不要"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["木酢液500倍希釈で根元に"],
      flowering: ["重曹1000倍水溶液でうどんこ病予防"],
      harvest:   ["特になし"]
    },
    pests: [
      { name: "アブラムシ", timing: "春〜夏", measure: "牛乳100倍希釈。シルバーマルチで忌避。" },
      { name: "ウリハムシ", timing: "5〜8月", measure: "防虫ネット設置。成虫は朝に捕殺。" }
    ]
  },

  moroheiya: {
    name: "モロヘイヤ",
    emoji: "🌿",
    stages: ["seedling", "growth", "harvest"],
    npk: {
      seedling:  { n: 5,  p: 8,  k: 5,  tip: "高温好き。25℃以上で発芽。梅雨明け後が適期。" },
      growth:    { n: 10, p: 8,  k: 8,  tip: "真夏でも旺盛に育つ。切り戻しで脇芽を増やす。" },
      harvest:   { n: 8,  p: 6,  k: 8,  tip: "花が咲く前に収穫。開花後の種には毒性あり・収穫不可。" }
    },
    products: {
      seedling:  ["液肥（ハイポネックス原液1000倍）"],
      growth:    ["化成肥料8-8-8（月1回）"],
      harvest:   ["液肥を週1回"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["木酢液500倍希釈で根元に"],
      harvest:   ["牛乳100倍希釈でアブラムシ対策"]
    },
    pests: [
      { name: "アブラムシ", timing: "夏", measure: "牛乳100倍希釈。高温期は繁殖が早いので早期対処。" }
    ]
  },

  hakusai: {
    name: "白菜",
    emoji: "🥬",
    stages: ["seedling", "growth", "harvest"],
    npk: {
      seedling:  { n: 5,  p: 12, k: 5,  tip: "育苗20〜25日。本葉3〜4枚で定植。" },
      growth:    { n: 10, p: 8,  k: 8,  tip: "肥料食い。窒素を切らすと球が締まらない。" },
      harvest:   { n: 8,  p: 6,  k: 8,  tip: "外葉を束ねて霜よけすると甘みが増す。" }
    },
    products: {
      seedling:  ["ハイポネックス原液（500倍希釈）"],
      growth:    ["化成肥料8-8-8（2週間に1回）"],
      harvest:   ["追肥不要"]
    },
    drugstore: {
      seedling:  ["メネデール100倍希釈"],
      growth:    ["食酢200倍希釈で葉面散布"],
      harvest:   ["牛乳100倍希釈でアブラムシ対策"]
    },
    pests: [
      { name: "アオムシ・コナガ", timing: "秋", measure: "防虫ネットのべた掛けが最強の予防策。" },
      { name: "ヨトウムシ", timing: "秋", measure: "夜間に株元を確認して捕殺。" },
      { name: "アブラムシ", timing: "秋", measure: "牛乳100倍希釈を葉裏に散布。" }
    ]
  }
};

// ステージ定義
const STAGE_LABELS = {
  seedling:  "育苗期・発芽直後",
  growth:    "生長期（葉・茎を育てる）",
  flowering: "開花・着果期",
  harvest:   "収穫期"
};

// =============================================
// 化合物の混用警告
// level: "danger"=絶対禁止 / "caution"=注意
// keyword: productsまたはdrugstoreのテキストに含まれる場合に警告を表示
// =============================================
const CHEMICAL_WARNINGS = [
  {
    keywords: ["草木灰"],
    level: "danger",
    title: "草木灰と窒素系肥料の混用禁止",
    body: "草木灰（強アルカリ性）を化成肥料・液肥・硫安などの窒素系肥料と同時に混ぜると、アンモニアガスが発生します。密閉空間での吸引は有害です。使用する場合は必ず1週間以上間隔をあけてください。"
  },
  {
    keywords: ["苦土石灰", "消石灰", "石灰窒素"],
    level: "danger",
    title: "石灰類と窒素系肥料の混用禁止",
    body: "苦土石灰・消石灰などアルカリ性の石灰類を化成肥料・液肥などと同時に混ぜると、アンモニアガスが発生することがあります。石灰施用後は最低2週間あけてから化成肥料を使用してください。"
  },
  {
    keywords: ["重曹", "食酢"],
    level: "caution",
    title: "重曹と食酢は同時に使わない",
    body: "重曹（アルカリ性）と食酢（酸性）を同時・同じ容器で混ぜると激しく泡立ち、両方の効果が消えます。それぞれ別の日・別の用途で単独使用してください。混ぜても人体への毒性はありませんが意味がなくなります。"
  },
  {
    keywords: ["木酢液", "苦土石灰"],
    level: "caution",
    title: "木酢液と石灰類は同日使用を避ける",
    body: "木酢液（酸性）と石灰類（アルカリ性）を同日・混合使用すると中和して両方の効果が失われます。使用する場合は数日間隔をあけてください。"
  },
  {
    keywords: ["過リン酸石灰", "苦土石灰"],
    level: "caution",
    title: "過リン酸石灰と石灰類の混用に注意",
    body: "過リン酸石灰と石灰系資材を同時に混ぜると、リン酸が不溶化して植物が吸収できなくなります。同時使用は避けてください。"
  },
  {
    keywords: ["牛乳"],
    level: "caution",
    title: "牛乳散布後の管理",
    body: "牛乳の葉面散布は夏の高温時に葉焼けや腐敗臭の原因になることがあります。散布は朝夕の涼しい時間帯に行い、翌日に水で洗い流してください。また農薬との混用は避けてください。"
  }
];

// =============================================
// コンパニオンプランツ・相性データ
// good: 相性の良い組み合わせ（肥料競合なし・害虫忌避・生育促進）
// bad:  相性の悪い組み合わせ（肥料競合・病害共有・生育阻害）
// =============================================
const COMPANION_DATA = {
  tomato: {
    good: [
      { partner: "バジル", reason: "バジルの精油成分がアブラムシ・コナジラミを忌避する。肥料の競合も少なく、根の深さも違うため土壌栄養の取り合いが起きにくい。" },
      { partner: "ニンジン", reason: "ニンジンは深根性でトマトの根と競合しない。互いの根圏が分かれることで土壌栄養を効率よく使える。" },
      { partner: "パセリ", reason: "パセリの香りがアブラムシを忌避する効果が報告されている。肥料の要求量も大きく異なるため競合が少ない。" }
    ],
    bad: [
      { partner: "ナス・ピーマン", reason: "同じナス科で同じ病害虫（疫病・青枯病など）が広がりやすい。どちらも高窒素・高カリを要求するため、近くに植えると土壌が偏って枯渇しやすい。" },
      { partner: "キュウリ", reason: "トマトは乾燥気味を好み、キュウリは多湿を好む。水分管理が相反するうえ、どちらも肥料を大量に消費するため土壌栄養の競合が起きやすい。" },
      { partner: "フェンネル", reason: "フェンネルの根が分泌するアレロパシー物質がトマトの生育を阻害する。近くには植えない。" }
    ]
  },

  mini_tomato: {
    good: [
      { partner: "バジル", reason: "バジルの精油成分がアブラムシ・コナジラミを忌避。肥料競合も少ない。" },
      { partner: "チャイブ", reason: "チャイブの香りがアブラムシを忌避する。肥料の種類が異なるため競合しにくい。" }
    ],
    bad: [
      { partner: "ナス・ピーマン", reason: "同じナス科で病害虫が共通。高窒素・高カリを同時に大量消費するため土壌の偏りが激しくなる。" },
      { partner: "フェンネル", reason: "フェンネルのアレロパシー物質が生育を阻害する。" }
    ]
  },

  eggplant: {
    good: [
      { partner: "ネギ", reason: "ネギの根が分泌する抗菌物質（アリシン）がナスの土壌病害（青枯病・立枯病）を抑制する。ナスが高窒素・ネギも高窒素だが根圏が違うため共存できる。" },
      { partner: "シソ", reason: "シソの香りがナスのアブラムシを忌避する効果がある。肥料の競合も少ない。" }
    ],
    bad: [
      { partner: "トマト・ジャガイモ", reason: "同じナス科で疫病・青枯病が共通して広がる。いずれも高窒素・高カリを要求するため土壌が一方向に偏りやすい。" },
      { partner: "ピーマン", reason: "同じナス科。高窒素配合の肥料を同時に大量施用すると土壌の窒素が急速に枯渇する。" }
    ]
  },

  cucumber: {
    good: [
      { partner: "ネギ", reason: "ネギの根の抗菌物質がキュウリの蔓割れ病・立枯病を抑制する。古くから農家で実践されてきた組み合わせ。" },
      { partner: "エダマメ", reason: "エダマメの根粒菌が空気中の窒素を固定し土壌に供給する。キュウリが必要とする窒素の一部をエダマメが補ってくれる。" },
      { partner: "シソ", reason: "シソの香りがウリハムシ・アブラムシを忌避する。肥料の競合も少ない。" }
    ],
    bad: [
      { partner: "トマト", reason: "トマトは乾燥気味・キュウリは多湿という正反対の水分管理が必要。いずれも肥料を大量に消費するため栄養の取り合いが起きやすい。" },
      { partner: "スイカ・ゴーヤ", reason: "同じウリ科で病害虫（ウリハムシ・うどんこ病など）が共通。近くに植えると一気に広がるリスクがある。" }
    ]
  },

  edamame: {
    good: [
      { partner: "キュウリ", reason: "エダマメの根粒菌が固定した窒素をキュウリが利用できる。エダマメは窒素肥料を控えるため、土壌への施肥量を全体として減らせる。" },
      { partner: "ナス", reason: "エダマメが窒素を補給し、ナスが残りの栄養を活用する。根の深さも異なり競合が少ない。" }
    ],
    bad: [
      { partner: "ネギ・タマネギ・ニンニク", reason: "ネギ類の根が分泌する物質がマメ科の根粒菌の活動を妨げる。エダマメの窒素固定能力が落ち、せっかくの特性が失われる。" },
      { partner: "別のマメ科（インゲン・そら豆）", reason: "同じ根粒菌を取り合い、土壌の栄養バランスが崩れやすい。同一エリアへの同時植えは避ける。" }
    ]
  },

  green_bean: {
    good: [
      { partner: "ニンジン", reason: "根の深さが異なり競合しない。インゲンが固定した窒素をニンジンが活用できる。" },
      { partner: "ラディッシュ", reason: "ラディッシュが土を軟らかくしてインゲンの根張りを助ける。肥料の種類も異なり競合しない。" }
    ],
    bad: [
      { partner: "ネギ・ニンニク・タマネギ", reason: "マメ科の根粒菌をネギ類の分泌物が妨害する。インゲンの最大の特性（窒素固定）が無効化される。" },
      { partner: "別のマメ科（エダマメ・そら豆）", reason: "同じ土壌栄養を利用するため根粒菌の取り合いが起きる。" }
    ]
  },

  spinach: {
    good: [
      { partner: "ニンニク", reason: "ニンニクの揮発成分がほうれん草のアブラムシ・ナメクジを忌避する。肥料の競合も少ない。" },
      { partner: "ラディッシュ", reason: "ラディッシュが先に育って土を軟らかくし、ほうれん草の発芽を助ける。収穫時期もずれるため使い回しがしやすい。" }
    ],
    bad: [
      { partner: "ビーツ", reason: "同じアカザ科で土壌の同じ栄養素（マグネシウム・鉄など）を競合して取り合う。" },
      { partner: "同じアブラナ科の野菜", reason: "ほうれん草はアルカリ性土壌を好むがアブラナ科も同様で、土壌のpH管理が複雑になる。病害も一部共通。" }
    ]
  },

  komatsuna: {
    good: [
      { partner: "春菊", reason: "春菊の香りがコムシ系の害虫を忌避する効果が報告されている。肥料要求量も似ているため管理しやすい。" },
      { partner: "ニンジン", reason: "根の深さが異なり競合しない。ニンジンの香りがアブラナ科の害虫を一部忌避する。" }
    ],
    bad: [
      { partner: "キャベツ・ブロッコリー・大根", reason: "同じアブラナ科で害虫（アオムシ・コナガ）が共通。まとめて被害を受けるリスクが高い。高窒素の肥料を同時施用すると土壌が偏りやすい。" }
    ]
  },

  basil: {
    good: [
      { partner: "トマト・ミニトマト", reason: "バジルの精油成分がトマトのアブラムシ・コナジラミを忌避する。窒素要求量が異なり肥料の競合が少ない。" },
      { partner: "ピーマン・パプリカ", reason: "バジルの香りがアブラムシを忌避。ピーマンもバジルも高温を好むため管理しやすい。" }
    ],
    bad: [
      { partner: "セージ・ローズマリー", reason: "同じ地中海系ハーブで根圏が競合する。水分要求量も似ているため密植すると互いに生育が落ちる。" }
    ]
  },

  shiso: {
    good: [
      { partner: "トマト・ナス・キュウリ", reason: "シソの強い香り成分がアブラムシを忌避する。肥料要求も異なり競合しない。" },
      { partner: "エダマメ", reason: "シソの香りがカメムシを忌避する効果がある。エダマメの最大の天敵対策になる。" }
    ],
    bad: [
      { partner: "別のシソ科ハーブ（バジル・ミント）", reason: "同じ栄養を取り合うため密植すると互いに生育が落ちる。" }
    ]
  },

  carrot: {
    good: [
      { partner: "ネギ・チャイブ", reason: "ニンジンのアゲハ幼虫はネギの香りを嫌う。ネギのアブラムシはニンジンの香りが忌避する。互いの害虫を防ぎ合う理想的な組み合わせ。" },
      { partner: "トマト", reason: "根の深さが異なり競合しない。トマトの葉がニンジンに日陰を作り、夏の乾燥を防ぐ。" }
    ],
    bad: [
      { partner: "ディル・フェンネル", reason: "セリ科同士で交雑・病害が共通する。フェンネルはアレロパシー物質でニンジンの生育を阻害することがある。" },
      { partner: "パセリ", reason: "同じセリ科で根圏が競合しやすく、病害も共通する。" }
    ]
  },

  negi: {
    good: [
      { partner: "キュウリ・ナス・トマト", reason: "ネギの根が分泌する抗菌物質が土壌病害を抑制する。古くから混植で活用されてきた代表的な組み合わせ。" },
      { partner: "ニンジン", reason: "互いの害虫を忌避し合う。根の深さも異なり土壌栄養の競合が起きにくい。" }
    ],
    bad: [
      { partner: "エダマメ・インゲン・そら豆", reason: "ネギ類の根の分泌物がマメ科の根粒菌の活動を妨げる。マメ科の最大の武器（窒素固定）を失わせてしまう。" }
    ]
  },

  garlic: {
    good: [
      { partner: "ニンジン", reason: "ニンニクの揮発成分がニンジンのアゲハ幼虫を忌避する。根圏も異なり競合しない。" },
      { partner: "バラ・イチゴ（あれば）", reason: "ニンニクの強い香りが多くの害虫を忌避する万能コンパニオン。" },
      { partner: "ほうれん草・レタス", reason: "ニンニクが害虫を忌避しながら、葉物野菜は根圏が浅くニンニクと競合しない。" }
    ],
    bad: [
      { partner: "エダマメ・インゲン・そら豆", reason: "ネギ類と同様、ニンニクの分泌物がマメ科の根粒菌を妨げる。" },
      { partner: "別のネギ科（ネギ・タマネギ）", reason: "同じ栄養を競合して消費する。高カリ・高窒素を大量に同時消費するため土壌が偏る。" }
    ]
  },

  onion: {
    good: [
      { partner: "ニンジン", reason: "タマネギの香りがニンジンのアゲハ幼虫を忌避し、ニンジンの香りがタマネギのアブラムシを忌避する。互いの天敵を防ぎ合う。" },
      { partner: "ほうれん草・レタス", reason: "タマネギが害虫を忌避しながら、葉物野菜と根圏が分かれるため競合しない。" }
    ],
    bad: [
      { partner: "エダマメ・インゲン", reason: "ネギ類の分泌物がマメ科の根粒菌を妨げる。" },
      { partner: "ネギ・ニンニク", reason: "同じネギ科で同じ栄養を競合消費。高カリ・高窒素の肥料を同時に大量消費するため土壌が急速に偏る。" }
    ]
  },

  soramame: {
    good: [
      { partner: "ほうれん草・小松菜", reason: "そら豆の根粒菌が固定した窒素を葉物野菜が利用できる。葉物は施肥量を減らせる。" },
      { partner: "ラディッシュ", reason: "根圏が異なり競合しない。ラディッシュの早期収穫後にそら豆が土を使うという連続活用も可能。" }
    ],
    bad: [
      { partner: "ネギ・タマネギ・ニンニク", reason: "ネギ類の分泌物がマメ科の根粒菌を妨げる。そら豆の最大の特性が失われる。" },
      { partner: "別のマメ科（エダマメ・インゲン）", reason: "同じ根粒菌を取り合う。同一エリアでの同時栽培は避ける。" }
    ]
  },

  endou: {
    good: [
      { partner: "ほうれん草・小松菜", reason: "エンドウの根粒菌が固定した窒素を葉物野菜が利用できる。葉物への追肥を減らせる。" },
      { partner: "ニンジン", reason: "エンドウが土に供給する窒素をニンジンが利用できる。根の深さが異なり競合しない。" }
    ],
    bad: [
      { partner: "ネギ・タマネギ・ニンニク", reason: "ネギ類の分泌物がマメ科の根粒菌を妨げる。エンドウの窒素固定能力が落ちる。" },
      { partner: "別のマメ科", reason: "根粒菌の取り合いが起きる。同一エリアでの同時栽培は避ける。" }
    ]
  },

  daikon: {
    good: [
      { partner: "ニンジン", reason: "大根は土を深く耕してニンジンの根張りを助ける。互いに根の形状が違うため競合しない。" },
      { partner: "ほうれん草", reason: "大根の大きな葉が日陰を作り、ほうれん草の夏の暑さ対策になる。根圏も異なる。" }
    ],
    bad: [
      { partner: "キャベツ・小松菜・コマツナ", reason: "同じアブラナ科で害虫（アオムシ・コナガ）が共通。近くに植えると被害が一気に広がるリスクがある。" }
    ]
  },

  cabbage: {
    good: [
      { partner: "チャイブ・ネギ", reason: "ネギ類の香りがアオムシ・コナガを一部忌避する。根圏が異なり競合しない。" },
      { partner: "セロリ（あれば）", reason: "セロリの強い香りがアオムシを忌避する。キャベツと肥料の種類が異なり競合も少ない。" }
    ],
    bad: [
      { partner: "ブロッコリー・小松菜・大根", reason: "同じアブラナ科で害虫が共通。高窒素肥料を同時に大量施用すると土壌が偏る。" },
      { partner: "トマト", reason: "トマトのアレロパシー物質がキャベツの生育を一部阻害するという報告がある。" }
    ]
  },

  broccoli: {
    good: [
      { partner: "チャイブ・ネギ", reason: "ネギ類の香りがアオムシを一部忌避する。根圏が浅いチャイブはブロッコリーと競合しない。" }
    ],
    bad: [
      { partner: "キャベツ・小松菜・大根", reason: "同じアブラナ科で病害虫が共通。高窒素肥料を同時に施用すると土壌が急速に偏る。" },
      { partner: "トマト", reason: "相互の生育を阻害するアレロパシーの報告がある。近くには植えない方が無難。" }
    ]
  },

  okra: {
    good: [
      { partner: "バジル", reason: "バジルの香りがオクラのアブラムシを忌避する。肥料の競合も少ない。" },
      { partner: "エダマメ", reason: "エダマメが固定した窒素をオクラが利用できる。互いに高温を好むため管理しやすい。" }
    ],
    bad: [
      { partner: "特になし（オクラは比較的相性の悪い野菜が少ない）", reason: "強いアレロパシーや病害共有は少ないが、同じ高窒素要求の野菜との密植は土壌の偏りを招く。" }
    ]
  },

  goya: {
    good: [
      { partner: "ネギ", reason: "ネギの根の抗菌物質がゴーヤの土壌病害を抑制する。ゴーヤの支柱元にネギを植えると効果的。" },
      { partner: "バジル", reason: "バジルの香りがウリハムシ・アブラムシを一部忌避する。肥料の競合も少ない。" }
    ],
    bad: [
      { partner: "キュウリ・スイカ・ズッキーニ", reason: "同じウリ科で病害虫（ウリハムシ・うどんこ病）が共通。近くに植えると一気に広がるリスクがある。同じ高カリ・高窒素の肥料を競合消費する。" }
    ]
  },

  radish: {
    good: [
      { partner: "ほうれん草・レタス", reason: "ラディッシュが土を軟らかくして根張りを助ける。早期収穫できるため後作に使いやすい。" },
      { partner: "エダマメ", reason: "エダマメが固定した窒素をラディッシュが利用できる。根圏が異なり競合しない。" }
    ],
    bad: [
      { partner: "キャベツ・ブロッコリー・小松菜", reason: "同じアブラナ科で害虫が共通。アオムシ・コナガが一気に広がるリスクがある。" }
    ]
  },

  watermelon: {
    good: [
      { partner: "ネギ", reason: "ネギの根の抗菌物質がスイカの土壌病害（つる割れ病）を抑制する。" },
      { partner: "バジル", reason: "バジルの香りがアブラムシ・ウリハムシを一部忌避する。" }
    ],
    bad: [
      { partner: "キュウリ・ゴーヤ・ズッキーニ", reason: "同じウリ科で病害虫が共通。高カリ・高窒素の肥料を同時に大量消費するため土壌が急速に偏る。" }
    ]
  },

  pepper: {
    good: [
      { partner: "バジル", reason: "バジルの精油成分がアブラムシ・コナジラミを忌避する。肥料の競合も少なく共存しやすい。" },
      { partner: "ニンジン", reason: "根の深さが異なり競合しない。ニンジンの香りが一部の害虫を忌避する。" }
    ],
    bad: [
      { partner: "トマト・ナス", reason: "同じナス科で疫病・青枯病などが共通して広がる。いずれも高窒素・高カリを要求し土壌栄養を競合消費する。" },
      { partner: "フェンネル", reason: "フェンネルのアレロパシー物質がナス科の生育を阻害することがある。" }
    ]
  },

  chingensai: {
    good: [
      { partner: "ネギ・チャイブ", reason: "ネギ類の香りがアオムシ・コナガを一部忌避する。根圏が異なり競合しない。" },
      { partner: "ニンジン", reason: "根の深さが異なり競合しない。互いに害虫を一部忌避し合う。" }
    ],
    bad: [
      { partner: "キャベツ・ブロッコリー・小松菜・大根", reason: "同じアブラナ科で病害虫が共通。アオムシ・コナガがまとめて発生するリスクがある。高窒素肥料を同時施用すると土壌が偏る。" }
    ]
  },

  mizuna: {
    good: [
      { partner: "ネギ・チャイブ", reason: "ネギ類の香りがアブラナ科の害虫を一部忌避する。根圏が異なり競合しない。" },
      { partner: "ニンジン", reason: "根の深さが異なり競合しない。互いに病害虫の広がりを抑えやすい。" }
    ],
    bad: [
      { partner: "キャベツ・ブロッコリー・小松菜・大根", reason: "同じアブラナ科で害虫が共通。近くに植えると一気に被害が広がるリスクがある。" }
    ]
  },

  shungiku: {
    good: [
      { partner: "小松菜・水菜", reason: "春菊の独特な香りが害虫を一部忌避する効果が報告されている。葉物同士で肥料管理も近く扱いやすい。" },
      { partner: "ニンジン", reason: "春菊の香りがニンジンの害虫を一部忌避する。根圏が異なり競合しない。" }
    ],
    bad: [
      { partner: "同じ菊科（マリーゴールド以外）", reason: "同じ菊科の植物と密植すると根圏の競合と病害の共有リスクがある。" }
    ]
  },

  chive: {
    good: [
      { partner: "ニンジン・パセリ", reason: "チャイブの香りがニンジンのアゲハ幼虫を忌避する。根が浅くニンジンと競合しない。コンパニオンプランツとして古くから活用されている。" },
      { partner: "トマト・バラ（あれば）", reason: "チャイブの揮発成分がアブラムシを忌避する。肥料の要求量が低いため競合しない。" }
    ],
    bad: [
      { partner: "エダマメ・インゲン", reason: "ネギ類と同様、チャイブの分泌物がマメ科の根粒菌の活動を妨げる可能性がある。" }
    ]
  },

  parsley: {
    good: [
      { partner: "トマト・ナス", reason: "パセリの香りがアブラムシを忌避する効果が報告されている。肥料の要求量が異なり競合しにくい。" },
      { partner: "ニンジン（注意あり）", reason: "根の深さが異なる。ただし同じセリ科なので密植は避け、病害の広がりに注意する。" }
    ],
    bad: [
      { partner: "ニンジン（密植）", reason: "同じセリ科で病害が共通する。広がりを防ぐために距離をとって植える。" },
      { partner: "レタス（大量植え）", reason: "密植すると土壌栄養を競合消費しやすい。間隔を十分にとれば問題ない。" }
    ]
  },

  moroheiya: {
    good: [
      { partner: "バジル", reason: "バジルの香りがアブラムシを忌避する。どちらも高温を好むため夏の管理がしやすい。" },
      { partner: "オクラ", reason: "どちらも高温・多肥を好む夏野菜。根の深さが似ているが株間を十分にとれば競合しにくい。" }
    ],
    bad: [
      { partner: "特になし（比較的相性の悪い野菜が少ない）", reason: "強いアレロパシーや病害共有は少ないが、同じ高窒素要求の野菜との密植は土壌の偏りを招く。" }
    ]
  },

  hakusai: {
    good: [
      { partner: "ネギ・チャイブ", reason: "ネギ類の香りがアオムシ・コナガを一部忌避する。根圏が浅いチャイブは白菜と競合しない。" },
      { partner: "レタス（あれば）", reason: "根圏が異なり競合しない。白菜の大きな外葉がレタスに適度な日陰を作る。" }
    ],
    bad: [
      { partner: "キャベツ・ブロッコリー・大根・小松菜", reason: "同じアブラナ科で病害虫が共通。アオムシ・ヨトウムシが一気に広がるリスクが高い。高窒素の肥料を同時施用すると土壌が急速に偏る。" }
    ]
  }
};

// =============================================
// 防虫対策の道具と購入場所
// =============================================
const PEST_TOOLS = [
  {
    name: "防虫ネット（0.4mm目以下）",
    usage: "アオムシ・コナガ・コナジラミ・アザミウマの予防。べた掛けが最も効果的",
    where: "ホームセンター（コメリ・カインズ・ナフコ等）・農業資材専門店"
  },
  {
    name: "黄色粘着シート",
    usage: "アブラムシ・コナジラミ・ハモグリバエ（エカキムシ）の捕獲",
    where: "ホームセンター・園芸店・100均（粗いものはあるが目の細かいものはホームセンター推奨）"
  },
  {
    name: "銅テープ",
    usage: "ナメクジ・カタツムリの侵入防止。プランター縁に貼る",
    where: "ホームセンター（電気材料コーナーにも置いてある）・Amazon"
  },
  {
    name: "シルバーマルチ（シート）",
    usage: "反射光でアブラムシ・コナジラミを忌避。地温上昇抑制にも",
    where: "ホームセンター・農業資材専門店・Amazon"
  },
  {
    name: "牛乳（低脂肪でも可）",
    usage: "100倍希釈でアブラムシに噴霧。窒息効果あり",
    where: "スーパー・コンビニ"
  },
  {
    name: "木酢液",
    usage: "500倍希釈で根元散布。害虫忌避・根の活性化",
    where: "ホームセンター・園芸店・Amazon"
  },
  {
    name: "重曹",
    usage: "1000倍水溶液をうどんこ病予防に葉面散布",
    where: "スーパー・ドラッグストア・100均"
  }
];

// 常時表示の「絶対に混ぜてはいけない組み合わせ」
const ALWAYS_DANGER_LIST = [
  { combo: "草木灰　＋　窒素系肥料（化成肥料・液肥・硫安など）", risk: "アンモニアガス発生" },
  { combo: "石灰類（苦土石灰・消石灰）＋　窒素系肥料", risk: "アンモニアガス発生" },
  { combo: "重曹　＋　食酢（同一容器で混合）", risk: "激しく泡立ち両方無効化" },
  { combo: "農薬同士の混用（ラベルに記載のないもの）", risk: "薬害・ガス発生の可能性" }
];

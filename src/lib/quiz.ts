/**
 * Thread Seer quiz data, both locales.
 *
 * Ported from the previous React component so the World page keeps the
 * feature. Pure data: the component below renders it and does the scoring in
 * the browser.
 */

export interface SeerType {
  key: string
  name: { en: string; vi: string }
  description: { en: string; vi: string }
  traits: { en: string[]; vi: string[] }
  culture: { en: string; vi: string }
}

export const seerTypes: SeerType[] = [
  {
    key: 'visualizer',
    name: { en: 'Visualizer', vi: 'Người Trực Thị' },
    description: {
      en: 'You perceive the Weave with crystalline clarity, effortlessly tracing geometric lattice patterns and subtle chromatic shifts. Your gift lies in visual architecture and deciphering the structural tapestry of connection.',
      vi: 'Bạn chiêm ngưỡng Mạng Dệt với độ trong trẻo tựa pha lê, dễ dàng lần theo các hoa văn hình học vi tế và sự chuyển dịch của quang sắc. Món quà thiên bẩm của bạn nằm ở khả năng nhìn thấu kiến trúc thị giác và trật tự liên kết của vạn vật.',
    },
    traits: {
      en: [
        'Crystalline pattern recognition',
        'Structural thread discernment',
        'Architectural spatial analysis',
        'Intuitive grasp of lattice dynamics',
      ],
      vi: [
        'Nhận diện hoa văn sắc sảo',
        'Thấu suốt cấu trúc sợi chỉ',
        'Tư duy phân tích không gian',
        'Trực cảm nhạy bén về mạng lưới',
      ],
    },
    culture: {
      en: 'Your perception harmonizes with Korean geometric bojagi traditions and mathematical threadwork.',
      vi: 'Phương thức tri giác của bạn hòa điệu cùng truyền thống hoa văn bojagi Hàn Quốc và nghệ thuật dệt toán học chuẩn xác.',
    },
  },
  {
    key: 'resonator',
    name: { en: 'Resonator', vi: 'Người Cộng Hưởng' },
    description: {
      en: 'You experience the Weave as an acoustic symphony — every soul humming with its own timbre, every relationship striking an overtone of harmony or discord. You detect shifts in spiritual vitality through resonant pitch and cadence.',
      vi: 'Bạn lắng nghe Mạng Dệt tựa như một bản đại giao hưởng — mỗi sinh linh ngân vang một âm sắc riêng, mỗi mối liên kết tấu lên những hợp âm hòa điệu hay bất an. Bạn thấu suốt những chuyển dịch sinh mệnh qua âm vực và tiết tấu huyền vi.',
    },
    traits: {
      en: [
        'Acoustic thread perception',
        'Harmonic dissonance detection',
        'Emotional resonance through tone',
        'Musical intuition for human bonds',
      ],
      vi: [
        'Tri giác sợi tơ qua thính giác',
        'Nhận biết hợp âm và nghịch âm',
        'Cộng hưởng cảm xúc qua thanh âm',
        'Trực cảm nhạc lý về các mối quan hệ',
      ],
    },
    culture: {
      en: 'Your perception aligns with African pattern-speaking lineages and the oral transmission of rhythmic thread lore.',
      vi: 'Năng lực của bạn tương ứng với các dòng chảy truyền khẩu dệt mẫu ngữ Châu Phi và nghệ thuật lưu truyền tri thức bằng nhịp điệu.',
    },
  },
  {
    key: 'empath',
    name: { en: 'Empath', vi: 'Người Cảm Thức' },
    description: {
      en: 'You feel the living emotional currents of threads directly across your own senses: grief registered as frost, joy pulsing as radiant warmth, and loyalty flowing like liquid gold. Your gift touches the raw heart of human relationship.',
      vi: 'Bạn cảm nhận dòng chảy cảm xúc của từng sợi tơ dội thẳng vào giác quan: nỗi đau nhói buốt như sương giá, niềm hân hoan rộn ràng tựa nắng ấm, và lòng trung thành tuôn chảy như dòng vàng lỏng. Món quà của bạn chạm tới cội nguồn chân thật nhất của trái tim con người.',
    },
    traits: {
      en: [
        'Visceral emotional reception',
        'Profound empathetic attunement',
        'Instinctive relational healing',
        'Deep somatic resonance',
      ],
      vi: [
        'Cảm thụ cảm xúc trực tiếp',
        'Đồng cảm và thấu cảm sâu sắc',
        'Chữa lành các mối liên kết tổn thương',
        'Cộng hưởng thể chất tinh tế',
      ],
    },
    culture: {
      en: 'Your perception reflects Indian contemplative traditions and meditation-based thread awareness.',
      vi: 'Năng lực của bạn phản chiếu truyền thống chiêm nghiệm Ấn Độ và các phương pháp thức tỉnh tâm linh qua thiền quán.',
    },
  },
  {
    key: 'navigator',
    name: { en: 'Navigator', vi: 'Người Dẫn Lối' },
    description: {
      en: 'You trace threads across continents and through non-linear time, uncovering hidden convergences that others miss. You excel at charting uncharted pathways through the vast topography of the Weave.',
      vi: 'Bạn lần theo dấu vết sợi tơ qua vạn dặm không gian và dòng thời gian phi tuyến tính, hé mở những điểm giao hội kỳ diệu mà người khác bỏ lỡ. Bạn có tài nghệ xuất chúng trong việc định vị những lối mòn vô hình giữa tấm bản đồ bao la của Mạng Dệt.',
    },
    traits: {
      en: [
        'Trans-continental thread tracing',
        'Convergence point discovery',
        'Non-linear pathfinding',
        'Tapestry cartography',
      ],
      vi: [
        'Lần sợi tơ qua khoảng cách ngàn dặm',
        'Khám phá các điểm hội tụ bí ẩn',
        'Tìm đường vượt thời gian',
        'Lập bản đồ mạng lưới Mạng Dệt',
      ],
    },
    culture: {
      en: 'Your perception connects with Indigenous dreamline tracing and sacred land-based songlines.',
      vi: 'Năng lực của bạn gắn liền với thuật lần đường mộng cảnh và những bài ca thổ nhưỡng thiêng liêng của các dân tộc bản địa.',
    },
  },
  {
    key: 'manipulator',
    name: { en: 'Manipulator', vi: 'Người Điều Chuyển' },
    description: {
      en: 'You possess the rarest and most dangerous gift: the ability to actively fortify, redirect, or spin new threads. You can mend shattered connections — provided you remember the sacred law: ask first, never seize.',
      vi: 'Bạn nắm giữ món quà hiếm hoi và thiêng liêng nhất: khả năng chủ động bồi đắp, chuyển hướng hoặc se dệt nên những sợi tơ mới. Bạn có thể vá lành những mối nối đứt gãy — với điều kiện tiên quyết: luôn hỏi trước khi chạm, tuyệt đối không cưỡng đoạt.',
    },
    traits: {
      en: [
        'Active thread fortification',
        'Relational restoration',
        'Catalytic bond formation',
        'Sacred ethical restraint',
      ],
      vi: [
        'Bồi đắp và củng cố sợi tơ',
        'Hàn gắn các mối liên kết rạn nứt',
        'Tác thành những sợi nối mới',
        'Ý thức giới luật đạo đức nghiêm cẩn',
      ],
    },
    culture: {
      en: 'Your abilities demand cross-traditional synthesis and deep mastery of thread ethics.',
      vi: 'Năng lực này đòi hỏi sự đúc kết tinh hoa của muôn trường phái và một sự thấu triệt sâu sắc về đạo đức sợi chỉ.',
    },
  },
  {
    key: 'sensory',
    name: { en: 'Sensory Weaver', vi: 'Người Dệt Toàn Giác' },
    description: {
      en: 'Like Lyra Chen, you experience the Weave through full-body somatic sensation — texture, weight, temperature, and visceral knowing. Your perception represents a profound, tactile evolution of sight born of stillness and truth.',
      vi: 'Như Lyra Chen, bạn giao cảm cùng Mạng Dệt qua toàn bộ cơ thể và xúc giác — cảm nhận kết cấu, sức nặng, nhiệt độ và sự thấu suốt tận đáy lòng. Tri giác của bạn đại diện cho một bước tiến hóa toàn diện của thị giác, sinh ra từ sự lắng đọng và chân thực.',
    },
    traits: {
      en: [
        'Tactile thread perception',
        'Full-body somatic attunement',
        'Visceral intuitive truth',
        'Embodied communion with the Weave',
      ],
      vi: [
        'Tri giác sợi tơ qua xúc giác',
        'Cảm thụ toàn thân nhạy bén',
        'Trực cảm chân thật từ thâm tâm',
        'Giao cảm sâu sắc cùng Mạng Dệt',
      ],
    },
    culture: {
      en: 'Your perception embodies ancient silk communion, integrating multiple lineages through lived somatic experience.',
      vi: 'Năng lực của bạn hội tụ tinh hoa tương giao tơ tằm cổ xưa, dung hòa nhiều dòng chảy qua chính trải nghiệm sống của thân tâm.',
    },
  },
]

export interface QuizOption {
  type: string
  en: string
  vi: string
}

export interface QuizQuestion {
  en: string
  vi: string
  options: QuizOption[]
}

export const quizQuestions: QuizQuestion[] = [
  {
    en: 'When you step into a crowded hall, what strikes your awareness first?',
    vi: 'Khi bước vào một đại sảnh đông đúc, điều gì thu hút tâm trí bạn đầu tiên?',
    options: [
      {
        type: 'visualizer',
        en: 'The visible geometry of how bodies gather and movement flows',
        vi: 'Hình học trực quan của dòng người chuyển động và các cụm quây quần',
      },
      {
        type: 'empath',
        en: 'The collective emotional climate — unspoken tension, warmth, or quiet grief',
        vi: 'Bầu khí quyển cảm xúc chung — sự căng thẳng thầm kín, hơi ấm, hay nỗi buồn lắng đọng',
      },
      {
        type: 'resonator',
        en: 'The cadence, pitch, and underlying acoustic rhythm of murmuring voices',
        vi: 'Tiết tấu, cao độ và nhịp điệu âm vang từ những lời thì thầm trò chuyện',
      },
      {
        type: 'navigator',
        en: 'The invisible thresholds connecting this room to the wider world outside',
        vi: 'Những ngưỡng cửa vô hình nối liền gian phòng này với thế giới rộng lớn ngoài kia',
      },
      {
        type: 'sensory',
        en: 'The temperature shifts, draft currents, and somatic weight in the air',
        vi: 'Sự đổi chiều của nhiệt độ, làn gió thoảng, và áp lực thể chất lan trong không khí',
      },
      {
        type: 'manipulator',
        en: 'The instinctive urge to ease friction and harmonize the circulation of the room',
        vi: 'Ý muốn trực giác gỡ bỏ những vướng mắc và khơi thông dòng chảy hòa hợp',
      },
    ],
  },
  {
    en: 'How do you most deeply understand an intricate relationship between two people?',
    vi: 'Bạn thấu cảm sâu sắc nhất về mối quan hệ phức tạp giữa hai người bằng cách nào?',
    options: [
      {
        type: 'visualizer',
        en: 'By mapping the structural lines and tension points in your mind’s eye',
        vi: 'Bằng cách phác họa sơ đồ các đường nét và điểm căng thẳng trong tâm trí',
      },
      {
        type: 'empath',
        en: 'By attuning directly to the emotional current passing between them',
        vi: 'Bằng cách bắt nhịp trực tiếp với dòng chảy cảm xúc chuyền giữa hai người',
      },
      {
        type: 'resonator',
        en: 'By listening for the chord they strike together — whether consonant or out of tune',
        vi: 'Bằng cách lắng nghe hợp âm họ cùng tấu lên — hòa quyện êm ái hay lạc nhịp chênh phô',
      },
      {
        type: 'navigator',
        en: 'By tracing the history of their shared crossroads across years and distances',
        vi: 'Bằng cách lần theo lịch sử những ngã rẽ họ từng chung bước qua năm tháng',
      },
      {
        type: 'sensory',
        en: 'Through physical proximity — the warmth, restraint, or chill in the air between them',
        vi: 'Qua khoảng cách thể chất — hơi ấm, sự dè dặt hay cái lạnh vô hình giữa họ',
      },
      {
        type: 'manipulator',
        en: 'By sensing where the bond has frayed and how it might be gently restored',
        vi: 'Bằng cách nhận biết nơi sợi nối bị tưa rách và cách thức để dịu dàng vá lành',
      },
    ],
  },
  {
    en: 'When confronted with a crisis, where does your instinct take you?',
    vi: 'Khi đối diện với một cuộc khủng hoảng, bản năng tự nhiên sẽ dẫn lối bạn về đâu?',
    options: [
      {
        type: 'visualizer',
        en: 'You dissect the situation into clear, decipherable patterns',
        vi: 'Bạn phân tích tình thế thành những mô hình rõ ràng và mạch lạc',
      },
      {
        type: 'empath',
        en: 'You immediately perceive what each participant needs to feel safe',
        vi: 'Bạn lập tức cảm nhận sâu sắc điều mỗi người cần để thấy bình yên',
      },
      {
        type: 'resonator',
        en: 'You listen past the clamor to locate the central point of discord',
        vi: 'Bạn lắng tai vượt qua nỗi ồn ào để tìm ra điểm bất hòa cốt tử',
      },
      {
        type: 'navigator',
        en: 'You identify an unforeseen corridor of exit or resolution',
        vi: 'Bạn nhìn ra một lối thoát hay hướng giải quyết bất ngờ mà chưa ai nghĩ tới',
      },
      {
        type: 'sensory',
        en: 'You ground yourself somatic-first, trusting your inner physical barometer',
        vi: 'Bạn lắng lại thân tâm, tin vào trực giác mách bảo qua từng tế bào cơ thể',
      },
      {
        type: 'manipulator',
        en: 'You step forward to steady what is trembling and brace the load',
        vi: 'Bạn chủ động bước tới ghì vững những gì đang chao đảo và san sẻ gánh nặng',
      },
    ],
  },
  {
    en: 'What kind of sanctuary brings you the deepest clarity and focus?',
    vi: 'Không gian nào mang lại cho bạn sự tĩnh tại và minh triết sâu sắc nhất?',
    options: [
      {
        type: 'visualizer',
        en: 'A quiet studio with expansive light, clean lines, and visible order',
        vi: 'Một xưởng vẽ tĩnh lặng tràn ngập ánh sáng, đường nét thanh thoát và trật tự',
      },
      {
        type: 'empath',
        en: 'A compassionate circle where vulnerability is honored and held with care',
        vi: 'Một vòng tròn chở che, nơi những tổn thương được thấu hiểu và nâng niu',
      },
      {
        type: 'resonator',
        en: 'An acoustic hall where echoes settle into harmonious silence',
        vi: 'Một đại sảnh âm hưởng tuyệt hảo, nơi mọi tiếng vọng dần lắng vào cõi lặng an',
      },
      {
        type: 'navigator',
        en: 'An open horizon or high overlook offering endless vistas of interconnected paths',
        vi: 'Một chân trời khoáng đạt trên đỉnh cao, thu trọn muôn ngả đường kết nối',
      },
      {
        type: 'sensory',
        en: 'A natural grove rich with organic scent, stone textures, and tactile stillness',
        vi: 'Một khu rừng nguyên sinh ngát hương đất trời, với rêu phong và đá tảng trầm mặc',
      },
      {
        type: 'manipulator',
        en: 'A collaborative workshop where raw materials can be shaped into enduring harmony',
        vi: 'Một xưởng chế tác thủ công, nơi những nguyên liệu thô được bàn tay tôi luyện thành tuyệt tác',
      },
    ],
  },
  {
    en: 'When a friend is privately carrying a heavy sorrow, how do you sense it?',
    vi: 'Khi một người bạn thân đang âm thầm chôn giấu một nỗi đau lớn, bạn nhận ra bằng cách nào?',
    options: [
      {
        type: 'visualizer',
        en: 'You see a sudden dimming in their gaze and guarded posture',
        vi: 'Bạn thấy ánh nhìn của họ sẫm tối và bờ vai khẽ khép lại phòng vệ',
      },
      {
        type: 'empath',
        en: 'An ache echoes in your own chest before they have uttered a word',
        vi: 'Một cơn quặn thắt dội thẳng vào lồng ngực bạn trước khi họ kịp mở lời',
      },
      {
        type: 'resonator',
        en: 'Their spoken cadence flattens, hollowed out of its customary music',
        vi: 'Âm vực của họ bỗng chốc trầm đục, như mất đi giai điệu quen thuộc',
      },
      {
        type: 'navigator',
        en: 'You intuitively recognize where their thoughts have drifted far away',
        vi: 'Bạn trực cảm nhận ra tâm trí họ đã phiêu dạt về một miền xa xôi u uất',
      },
      {
        type: 'sensory',
        en: 'You sense a cold stillness in the air around them and offer a steadying hand',
        vi: 'Bạn cảm nhận một luồng khí lạnh quanh họ và muốn trao đi một cái nắm tay vững chãi',
      },
      {
        type: 'manipulator',
        en: 'You quietly take on their burdens and weave a pocket of safety around them',
        vi: 'Bạn lặng lẽ đỡ lấy gánh nặng và dệt nên một vùng an trú chở che cho họ',
      },
    ],
  },
]

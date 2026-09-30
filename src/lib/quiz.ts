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
    name: { en: 'Visualizer', vi: 'Người Thấy' },
    description: {
      en: 'You see the threads with remarkable clarity, able to distinguish between different types and trace complex patterns. Your gift lies in pattern recognition and understanding the visual language of the Weave.',
      vi: 'Bạn nhìn thấy những sợi chỉ với độ rõ nét đáng kinh ngạc, phân biệt được từng loại và lần theo các mẫu phức tạp. Món quà của bạn nằm ở nhận diện mẫu và hiểu ngôn ngữ thị giác của Dệt Bộ.',
    },
    traits: {
      en: [
        'Exceptional pattern recognition',
        'Clear thread visualisation',
        'Strong analytical abilities',
        'Natural understanding of thread classifications',
      ],
      vi: [
        'Nhận diện mẫu xuất sắc',
        'Hình dung sợi chỉ rõ nét',
        'Khả năng phân tích mạnh',
        'Hiểu biết trực giác về phân loại sợi chỉ',
      ],
    },
    culture: {
      en: 'Your abilities align with Korean geometric patterns and mathematical approaches to thread weaving.',
      vi: 'Năng lực của bạn hợp với hoa văn hình học Hàn Quốc và cách tiếp cận toán học trong dệt sợi.',
    },
  },
  {
    key: 'resonator',
    name: { en: 'Resonator', vi: 'Người Cộng Hưởng' },
    description: {
      en: 'You hear the music of the Weave—each thread has its own tone, harmony, or discord. You understand relationships through their sound and can detect changes in thread health through auditory cues.',
      vi: 'Bạn nghe thấy bản nhạc của Dệt Bộ — mỗi sợi chỉ có giai điệu, hợp âm hay bất hòa riêng. Bạn hiểu các mối quan hệ qua âm thanh, và nhận ra thay đổi trong sức khoẻ của sợi chỉ bằng tín hiệu âm thanh.',
    },
    traits: {
      en: [
        'Auditory thread perception',
        'Harmony detection',
        'Emotional resonance through sound',
        'Musical understanding of relationships',
      ],
      vi: [
        'Tri giác sợi chỉ qua thính giác',
        'Nhận biết hợp âm',
        'Cộng hưởng cảm xúc qua âm thanh',
        'Hiểu mối quan hệ theo nhạc lý',
      ],
    },
    culture: {
      en: 'Your abilities resonate with African pattern-speaking traditions and the oral transmission of thread knowledge.',
      vi: 'Năng lực của bạn cộng hưởng với truyền thống kể chuyện hoa văn châu Phi và sự truyền tải tri thức sợi chỉ bằng lời nói.',
    },
  },
  {
    key: 'empath',
    name: { en: 'Empath', vi: 'Người Cảm Thức' },
    description: {
      en: 'You feel the emotional content of threads directly, experiencing the joy, pain, love, and conflict that flows through connections. Your gift is understanding the heart of relationships.',
      vi: 'Bạn cảm trực tiếp nội dung cảm xúc của sợi chỉ, trải qua niềm vui, đau đớn, tình yêu và xung đột chảy trong các mối nối. Món quà của bạn là hiểu trái tim của mọi quan hệ.',
    },
    traits: {
      en: [
        'Direct emotional perception',
        'Deep empathy',
        'Relationship counseling abilities',
        'Emotional thread healing',
      ],
      vi: [
        'Tri giác cảm xúc trực tiếp',
        'Đồng cảm sâu sắc',
        'Khả năng hỗ trợ các mối quan hệ',
        'Chữa lành bằng sợi cảm xúc',
      ],
    },
    culture: {
      en: 'Your abilities align with Indian philosophical methods and meditation-based thread practices.',
      vi: 'Năng lực của bạn hợp với phương pháp triết học Ấn Độ và các thực hành sợi chỉ dựa trên thiền.',
    },
  },
  {
    key: 'navigator',
    name: { en: 'Navigator', vi: 'Người Dẫn Đường' },
    description: {
      en: 'You can trace threads across vast distances and through time, finding connections others miss. You excel at discovering unexpected relationships and pathways through the Weave.',
      vi: 'Bạn có thể lần theo sợi chỉ qua khoảng cách xa và xuyên qua thời gian, tìm ra những mối nối mà người khác bỏ lỡ. Bạn xuất sắc trong việc khám phá những mối quan hệ và lối đi bất ngờ trong Dệt Bộ.',
    },
    traits: {
      en: [
        'Long-distance thread tracing',
        'Connection discovery',
        'Pathfinding abilities',
        'Network mapping',
      ],
      vi: [
        'Lần sợi chỉ qua khoảng cách xa',
        'Khám phá mối nối',
        'Khả năng tìm đường',
        'Lập bản đồ mạng lưới',
      ],
    },
    culture: {
      en: 'Your abilities connect with Indigenous dreamline tracing and land-based thread practices.',
      vi: 'Năng lực của bạn gắn với việc lần đường trong mơ của các truyền thống bản địa và thực hành sợi chỉ gắn với đất đai.',
    },
  },
  {
    key: 'manipulator',
    name: { en: 'Manipulator', vi: 'Người Điều Khiển' },
    description: {
      en: 'You possess the rarest gift—the ability to strengthen, redirect, or create new threads. You can actively heal damaged connections and forge new bonds between people and places.',
      vi: 'Bạn sở hữu món quà hiếm nhất — khả năng củng cố, đổi hướng, hoặc tạo ra sợi chỉ mới. Bạn có thể chữa lành những mối nối tổn thương và tạo nên những mối ràng buộc mới giữa người và nơi chốn.',
    },
    traits: {
      en: [
        'Thread strengthening',
        'Connection creation',
        'Relationship healing',
        'Active thread manipulation',
      ],
      vi: [
        'Củng cố sợi chỉ',
        'Tạo mối nối',
        'Chữa lành quan hệ',
        'Thao túng sợi chỉ chủ động',
      ],
    },
    culture: {
      en: 'Your abilities require integration of all cultural traditions and deep understanding of thread ethics.',
      vi: 'Năng lực của bạn đòi hỏi sự tích hợp của mọi truyền thống văn hoá và hiểu biết sâu về đạo đức sợi chỉ.',
    },
  },
  {
    key: 'sensory',
    name: { en: 'Sensory Weaver', vi: 'Người Dệt Giác Quan' },
    description: {
      en: 'Like Lyra, you experience threads through touch, texture, temperature, and full-body sensation. Your perception often develops after profound experiences and offers deep, intuitive understanding.',
      vi: 'Giống Lyra, bạn cảm nhận sợi chỉ qua xúc giác, kết cấu, nhiệt độ, và cảm giác toàn thân. Tri giác của bạn thường phát triển sau những trải nghiệm sâu sắc và mang lại sự hiểu biết trực giác, sâu sắc.',
    },
    traits: {
      en: [
        'Tactile thread perception',
        'Full-body awareness',
        'Intuitive understanding',
        'Deep communion with the Weave',
      ],
      vi: [
        'Tri giác sợi chỉ qua xúc giác',
        'Nhận biết toàn thân',
        'Hiểu biết trực giác',
        'Hiệp thông sâu với Dệt Bộ',
      ],
    },
    culture: {
      en: 'Your abilities represent evolved perception, integrating multiple cultural approaches through embodied experience.',
      vi: 'Năng lực của bạn đại diện cho một tri giác tiến hoá, tích hợp nhiều cách tiếp cận văn hoá qua trải nghiệm thân xác.',
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
    en: 'When you enter a crowded room, what do you notice first?',
    vi: 'Khi bước vào một căn phòng đông đúc, điều đầu tiên bạn để ý là gì?',
    options: [
      { type: 'visualizer', en: 'The patterns of movement and how people cluster together', vi: 'Các mẫu chuyển động và cách người ta tụ lại thành cụm' },
      { type: 'empath', en: 'The overall emotional atmosphere and energy', vi: 'Bầu không khí và năng lượng cảm xúc chung' },
      { type: 'resonator', en: 'The sounds and rhythms of conversation', vi: 'Âm thanh và nhịp điệu của cuộc trò chuyện' },
      { type: 'navigator', en: 'How the space connects to other areas', vi: 'Không gian này nối với những nơi khác bằng cách nào' },
      { type: 'sensory', en: 'The textures, temperatures, and physical sensations', vi: 'Kết cấu, nhiệt độ, và cảm giác thể chất' },
      { type: 'manipulator', en: 'How you might rearrange things to improve the flow', vi: 'Làm sao sắp xếp lại để dòng chảy thông suốt hơn' },
    ],
  },
  {
    en: 'How do you best understand complex relationships?',
    vi: 'Bạn hiểu những mối quan hệ phức tạp nhất bằng cách nào?',
    options: [
      { type: 'visualizer', en: 'By drawing diagrams or visual maps', vi: 'Bằng cách vẽ sơ đồ hoặc bản đồ trực quan' },
      { type: 'empath', en: 'By feeling the emotional dynamics', vi: 'Bằng cách cảm nhận động lực cảm xúc' },
      { type: 'resonator', en: "By listening to the 'harmony' or 'discord' between people", vi: 'Bằng cách lắng nghe sự hài hoà hay bất hòa giữa người với người' },
      { type: 'navigator', en: 'By tracing connections across time and distance', vi: 'Bằng cách lần theo mối nối xuyên qua thời gian và không gian' },
      { type: 'sensory', en: 'Through physical proximity and touch', vi: 'Qua khoảng cách thân xác và sự chạm' },
      { type: 'manipulator', en: 'By actively working to strengthen or repair bonds', vi: 'Bằng cách chủ động củng cố hoặc sửa chữa mối ràng buộc' },
    ],
  },
  {
    en: 'When solving problems, you tend to:',
    vi: 'Khi giải quyết vấn đề, bạn thường:',
    options: [
      { type: 'visualizer', en: 'See patterns and connections others miss', vi: 'Thấy những mẫu và mối nối người khác bỏ lỡ' },
      { type: 'empath', en: "Understand what people really need emotionally", vi: 'Hiểu điều con người thật sự cần về mặt cảm xúc' },
      { type: 'resonator', en: 'Hear the underlying rhythms and find harmony', vi: 'Nghe nhịp điệu bên dưới và tìm sự hài hoà' },
      { type: 'navigator', en: 'Find unexpected paths and connections', vi: 'Tìm những con đường và mối nối bất ngờ' },
      { type: 'sensory', en: 'Trust your gut feelings and physical intuition', vi: 'Tin vào trực giác và cảm tính thân xác' },
      { type: 'manipulator', en: 'Take action to actively change the situation', vi: 'Hành động để chủ động thay đổi tình huống' },
    ],
  },
  {
    en: 'Your ideal learning environment would be:',
    vi: 'Môi trường học tập lý tưởng của bạn là:',
    options: [
      { type: 'visualizer', en: 'Rich with visual aids, charts, and clear patterns', vi: 'Giàu hình ảnh trực quan, biểu đồ, và mẫu rõ ràng' },
      { type: 'empath', en: 'Emotionally supportive with understanding teachers', vi: 'Hỗ trợ về cảm xúc, với giáo viên thấu hiểu' },
      { type: 'resonator', en: 'Filled with music, discussion, and varied sounds', vi: 'Đầy âm nhạc, thảo luận, và âm thanh đa dạng' },
      { type: 'navigator', en: 'Offering freedom to explore and make connections', vi: 'Tự do khám phá và tạo ra kết nối' },
      { type: 'sensory', en: 'Hands-on with plenty of tactile experiences', vi: 'Thực hành nhiều, với đủ trải nghiệm xúc giác' },
      { type: 'manipulator', en: 'Interactive where you can shape and improve things', vi: 'Tương tác, nơi bạn có thể tạo hình và cải thiện mọi thứ' },
    ],
  },
  {
    en: "When you sense something is wrong with a friend:",
    vi: 'Khi bạn cảm nhận có điều gì đó không ổn với một người bạn:',
    options: [
      { type: 'visualizer', en: 'You can see it in their body language and expressions', vi: 'Bạn thấy điều đó qua ngôn ngữ cơ thể và nét mặt của họ' },
      { type: 'empath', en: "You feel their pain as if it were your own", vi: 'Bạn cảm thấy nỗi đau của họ như của chính mình' },
      { type: 'resonator', en: "Their voice sounds different, off-key somehow", vi: 'Giọng họ nghe khác đi, lạc nhịp một cách kỳ lạ' },
      { type: 'navigator', en: 'You know exactly who or what might help them', vi: 'Bạn biết chính xác ai hoặc điều gì có thể giúp họ' },
      { type: 'sensory', en: 'You want to offer a hug or comforting touch', vi: 'Bạn muốn ôm hay chạm vào để an ủi' },
      { type: 'manipulator', en: 'You immediately think of ways to fix the situation', vi: 'Bạn lập tức nghĩ đến cách sửa tình huống' },
    ],
  },
]

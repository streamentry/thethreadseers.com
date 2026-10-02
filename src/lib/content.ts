import type { Locale } from './chapters'

/** Canon thread colours, used for story data only — never UI chrome. */
export const THREAD = {
  gold: '#C6A15B',
  silver: '#C0C0C0',
  memory: '#7FA6C9',
  knot: '#B34434',
  nature: '#7D8F69',
  deception: '#6B695F',
  animus: '#EDEAE0',
  contamination: '#1A1A1E',
  unspun: '#6B695F',
} as const

export interface ThreadNode {
  name: string
  essence: string
  thread: keyof typeof THREAD
  label: string
  meta?: string
  to?: string
  dimmed?: boolean
}

export interface BookEntry {
  slug: string
  position: number
  en: { title: string; blurb: string; status: string }
  vi: { title: string; blurb: string; status: string }
  thread: keyof typeof THREAD
  available: boolean
}

export const books: BookEntry[] = [
  {
    slug: 'book-one',
    position: 1,
    thread: 'gold',
    available: true,
    en: {
      title: 'The Thread Seers: Book One',
      blurb: 'Sixteen-year-old artist Lyra Chen charts the quiet currents between people in her notebook margins — until the graphite sparks into living light. Recruited to Threadweaver Academy, she discovers her rare sight has a name, and that the institution sworn to protect it is failing from within as an ashen contamination drains the life from its students. In a world woven from connection, Lyra must make an impossible choice: control, or communion.',
      status: 'complete',
    },
    vi: {
      title: 'Những Người Thấy Sợi Chỉ: Sách Một',
      blurb: 'Cô nghệ sĩ mười sáu tuổi Lyra Chen âm thầm phác họa “bản đồ quan hệ” bên lề những cuốn sổ tay — cho đến khi những vệt than chì bừng sáng giữa thinh không. Được Học viện Threadweaver chiêu mộ, cô biết năng lực hiếm hoi của mình có một danh xưng, và nơi chốn gánh vác sứ mệnh chở che nó đang âm thầm sụp đổ khi một mầm bệnh tro tàn đen bạc đục rỗng kết nối của từng học sinh. Trước số phận của vạn vật tương tức, Lyra buộc phải lựa chọn: kiểm soát, hay tương giao.',
      status: 'complete',
    },
  },
  {
    slug: 'book-two',
    position: 2,
    thread: 'memory',
    available: false,
    en: {
      title: 'The Weaver’s Shadow',
      blurb: 'Lyra can no longer see the threads — but she can feel their pulse through her skin. As she learns to navigate this deepened tactile communion, ancient fault lines fracture the Academy, and the living traditions she relies upon face desecration by those who see the Weave merely as an engine of power.',
      status: 'progress',
    },
    vi: {
      title: 'Bóng Người Dệt',
      blurb: 'Lyra không còn nhìn thấy những sợi tơ bằng mắt thường — nhưng cô cảm nhận được từng nhịp đập ran ran qua da thịt. Khi học cách lắng nghe tri giác xúc giác sâu sắc ấy, những rạn nứt cổ xưa xé toạc Học viện, và các dòng chảy truyền thống cô hằng nương tựa đứng trước nguy cơ bị xâm hại bởi những kẻ chỉ xem Mạng Dệt như một cỗ máy trục lợi.',
      status: 'progress',
    },
  },
  {
    slug: 'book-three',
    position: 3,
    thread: 'knot',
    available: false,
    en: {
      title: 'The Convergence Protocol',
      blurb: 'The Weave is bleeding into the public eye: impossible auroras dancing over metropolitan skies, and unexplainable surges of collective emotion rippling across continents. Lyra and the quartet are trapped between factions demanding immediate exposure and shadowy forces willing to commit atrocities to preserve the silence.',
      status: 'ahead',
    },
    vi: {
      title: 'Giao Thức Hội Tụ',
      blurb: 'Những hiện tượng của Mạng Dệt bắt đầu lộ diện trước mắt thường nhân loại — ánh cực quang huyền ảo lượn trên bầu trời các đô thị lớn, cùng những đợt sóng cảm xúc tập thể cuộn trào không lời giải thích. Lyra và bộ tứ bị kẹt giữa những phe phái muốn phơi bày toàn bộ chân tướng và những thế lực ngầm sẵn sàng tàn sát để chôn vùi bí mật.',
      status: 'ahead',
    },
  },
  {
    slug: 'book-four',
    position: 4,
    thread: 'unspun',
    available: false,
    en: { title: 'The Silver Path', blurb: 'The loom is spinning.', status: 'unspun' },
    vi: { title: 'Con Đường Bạc', blurb: 'Khung dệt đang thoi đưa.', status: 'unspun' },
  },
  {
    slug: 'book-five',
    position: 5,
    thread: 'unspun',
    available: false,
    en: { title: 'The Communion Wars', blurb: 'The loom is spinning.', status: 'unspun' },
    vi: { title: 'Chiến Tranh Tương Giao', blurb: 'Khung dệt đang thoi đưa.', status: 'unspun' },
  },
  {
    slug: 'book-six',
    position: 6,
    thread: 'unspun',
    available: false,
    en: { title: 'The Dimensional Bridge', blurb: 'The loom is spinning.', status: 'unspun' },
    vi: { title: 'Cầu Nối Liên Thứ Nguyên', blurb: 'Khung dệt đang thoi đưa.', status: 'unspun' },
  },
  {
    slug: 'book-seven',
    position: 7,
    thread: 'unspun',
    available: false,
    en: { title: 'The Awakening Network', blurb: 'The loom is spinning.', status: 'unspun' },
    vi: { title: 'Mạng Lưới Thức Tỉnh', blurb: 'Khung dệt đang thoi đưa.', status: 'unspun' },
  },
]

export const bookOne = books[0]

/* ------------------------------------------------------------------ world */

export interface ThreadEntry {
  name: { en: string; vi: string }
  note: { en: string; vi: string }
  thread: keyof typeof THREAD
  dark?: boolean
}

export const threadIndex: ThreadEntry[] = [
  {
    name: { en: 'Family · Silver', vi: 'Gia đình · Sợi Bạc' },
    note: {
      en: 'Luminous, corded sinew running bloodline to bloodline. Dense as drawn sterling wire, flaring incandescent white at the core when summoned in defense.',
      vi: 'Những sợi tơ bền bỉ, sáng ngời nối liền huyết thống. Đậm đặc tựa dây bạc rèn nguội, bừng sáng trắng lóa nơi tâm thức khi trỗi dậy để chở che.',
    },
    thread: 'silver',
  },
  {
    name: { en: 'Friendship · Gold', vi: 'Tình bạn · Sợi Vàng' },
    note: {
      en: 'Bright, braided ribbons pulsing between comrades. It glows warmest and strongest where the weight of the world is shared.',
      vi: 'Những dải ruy-băng bện chặt rực rỡ đan giữa bạn bè. Ấm áp và kiên định nhất ở nơi sức nặng của thế gian được sẻ chia.',
    },
    thread: 'gold',
  },
  {
    name: { en: 'Memory · Blue', vi: 'Ký ức · Sợi Lam' },
    note: {
      en: 'Translucent as moonlight through deep water, carrying shimmering phantoms and reverberations of what has been.',
      vi: 'Trong mờ tựa ánh trăng rọi qua làn nước thẳm, mang theo những bóng hình chập chờn và tiếng vọng tha thiết của quá vãng.',
    },
    thread: 'memory',
  },
  {
    name: { en: 'Nature · Green', vi: 'Thiên nhiên · Sợi Lục' },
    note: {
      en: 'Living tendrils anchoring all breathing things to the earth. Deep-rooted, ancient, and patient beyond measure.',
      vi: 'Những sợi tơ sống động bám rễ vạn vật vào lòng đất mẹ. Cắm sâu, cổ xưa, và kiên nhẫn khôn cùng.',
    },
    thread: 'nature',
  },
  {
    name: { en: 'Conflict · Red', vi: 'Xung đột · Sợi Đỏ' },
    note: {
      en: 'Barbed, tense, and serrated. It draws tight like wire under load, cutting both ways.',
      vi: 'Gai góc, căng thẳng và lởm chởm răng cưa. Siết chặt tựa dây thép giằng nặng, cứa sâu vào cả hai đầu mối.',
    },
    thread: 'knot',
  },
  {
    name: { en: 'Deception · Gray', vi: 'Dối trá · Sợi Xám' },
    note: {
      en: 'Murky, twisted, suffocatingly still. It appears eerily polished in places where it ought to breathe.',
      vi: 'Đục mờ, vặn vẹo và lặng câm ngột ngạt. Trơn tru một cách đáng ngờ ở chính những nơi lẽ ra phải thở.',
    },
    thread: 'deception',
  },
  {
    name: { en: 'Animus Argenti · Pure Silver', vi: 'Animus Argenti · Bạc Thuần' },
    note: {
      en: 'The sovereign consciousness of the Weave itself. An inner radiance answering only to reverence — the living cosmos, awake.',
      vi: 'Lõi ý thức tối thượng của chính Mạng Dệt. Nguồn sáng tự thân chỉ đáp lời lòng thành kính — vũ trụ sống động, đã thức giấc.',
    },
    thread: 'animus',
  },
  {
    name: { en: 'Contamination · Black-Silver', vi: 'Nhiễm độc · Đen Bạc' },
    note: {
      en: 'An ashen blight rimmed in sickly frost. It consumes rather than connects — cold, extractive, born of machines that take without asking.',
      vi: 'Mầm độc màu tro tàn với những đường viền xám lạnh buốt. Nuốt chửng thay vì kết nối — băng giá, bóc lột, sinh ra từ những cỗ máy đoạt lấy mà không hề hỏi.',
    },
    thread: 'contamination',
    dark: true,
  },
]

export interface SeerEntry {
  name: { en: string; vi: string }
  note: { en: string; vi: string }
}

export const seer: SeerEntry[] = [
  {
    name: { en: "Visualizers", vi: "Người Trực Thị" },
    note: {
      en: "Perceive the Weave through exquisite visual clarity — deciphering intricate lattice geometries, tensile stress, and chromatic shifts.",
      vi: "Chiêm ngưỡng Mạng Dệt qua thị giác trong trẻo tuyệt mỹ — giải mã những mạng lưới hình học phức vi, lực căng và sự biến chuyển của quang sắc.",
    },
  },
  {
    name: { en: "Resonators", vi: "Người Cộng Hưởng" },
    note: {
      en: "Hear the Weave as acoustic harmonics — discerning truth, strain, and dissonance as musical tones ranging from low cello to clashing cymbals.",
      vi: "Lắng nghe Mạng Dệt tựa như những hòa âm tinh tế — nhận biết chân thực, căng thẳng hay bất hòa qua những cung bậc từ tiếng cello trầm đục đến tiếng chập chõa va đập.",
    },
  },
  {
    name: { en: "Empaths", vi: "Người Cảm Thức" },
    note: {
      en: "Feel the emotional truth of connections directly across their nervous system — experiencing the warmth of loyalty or the frost of betrayal.",
      vi: "Cảm nhận trực tiếp chân lý cảm xúc của từng mối liên kết qua hệ thần kinh — trải qua hơi ấm của lòng trung thành hay cái lạnh buốt của sự bội phản.",
    },
  },
  {
    name: { en: "Navigators", vi: "Người Dẫn Lối" },
    note: {
      en: "Trace thread paths across continents and through time — perceiving hidden currents, convergence points, and pathways unseen by others.",
      vi: "Lần theo dấu vết sợi tơ qua ngàn dặm không gian và xuyên thời gian — thấu suốt những dòng hải lưu vô hình, các điểm hội tụ và những lối mòn khuất mắt người đời.",
    },
  },
  {
    name: { en: "Manipulators", vi: "Người Điều Chuyển" },
    note: {
      en: "The rarest gift: strengthening, redirecting, or mending severed connections. Guided by sacred restraint: ask first, never seize.",
      vi: "Năng lực hiếm thấy nhất: bồi đắp, chuyển hướng hoặc hàn gắn những sợi tơ đứt gãy. Luôn khắc ghi giới luật thiêng liêng: hỏi trước khi chạm, tuyệt đối không cưỡng đoạt.",
    },
  },
  {
    name: { en: "Sensory Weavers", vi: "Người Dệt Toàn Giác" },
    note: {
      en: "Like Lyra, experiencing threads through embodied physical texture, heat, resonance, and tactile communion — a holistic evolution of sight.",
      vi: "Như Lyra, cảm nhận sợi tơ qua kết cấu thể chất, nhiệt độ, độ rung và sự giao cảm xúc giác — một bước tiến hóa toàn vẹn của tri giác.",
    },
  },
]

export interface TraditionEntry {
  name: { en: string; vi: string }
  note: { en: string; vi: string }
}

export const tradition: TraditionEntry[] = [
  {
    name: { en: "Korean geometric patterns", vi: "Hoa văn hình học Hàn Quốc" },
    note: {
      en: "Mathematical precision weaving rooted in balance, symmetry, and the modular logic of bojagi.",
      vi: "Nghệ thuật dệt chuẩn xác mang tư duy toán học — đề cao sự cân bằng, đối xứng và triết lý chắp nối mô-đun của bojagi.",
    },
  },
  {
    name: { en: "Indian philosophical methods", vi: "Phương pháp triết học Ấn Độ" },
    note: {
      en: "Contemplative thread-work grounded in Vedic and Buddhist metaphysics, treating connection as spiritual discipline.",
      vi: "Thực hành dệt chiêm nghiệm bắt nguồn từ siêu hình học Vệ-đà và Phật giáo, coi việc tiếp cận sợi tơ như một công phu tu tập tâm linh.",
    },
  },
  {
    name: { en: "Chinese communion practices", vi: "Thực hành tương giao Trung Hoa" },
    note: {
      en: "Ancient silk traditions centered on harmony and reciprocal dialogue with the Weave: reverent conversation, never domination.",
      vi: "Truyền thống tơ lụa ngàn năm chú trọng sự hòa hợp và quan hệ đối đãi hai chiều cùng Mạng Dệt: trò chuyện tương kính, tuyệt đối không áp đặt uy quyền.",
    },
  },
  {
    name: { en: "Egyptian thread hieroglyphics", vi: "Văn tự tượng hình sợi chỉ Ai Cập" },
    note: {
      en: "Monumental symbolic systems for recording, binding, and preserving esoteric thread knowledge across dynasties.",
      vi: "Hệ thống ký hiệu cổ đại uy nghi dùng để ghi khắc, ràng buộc và lưu giữ tri thức huyền môn về sợi tơ qua các triều đại.",
    },
  },
  {
    name: { en: "African pattern-speaking", vi: "Nghệ thuật dệt mẫu ngữ Châu Phi" },
    note: {
      en: "Oral traditions encoding intricate weaving techniques within generational rhythm, myth, and call-and-response song.",
      vi: "Truyền thống truyền khẩu mã hóa các kỹ thuật dệt tinh xảo vào nhịp điệu thế hệ, huyền thoại và những điệu xướng ca đối đáp.",
    },
  },
  {
    name: { en: "Yoruba thread sensing", vi: "Cảm xạ sợi chỉ Yoruba" },
    note: {
      en: "ẹ̀mí àgbájọ — the collected breath of life. Sacred artifacts such as the Òwú Ìmọ̀lára amplify shared consciousness.",
      vi: "ẹ̀mí àgbájọ — hơi thở hội tụ của sự sống. Những linh vật như Òwú Ìmọ̀lára giúp khuếch đại ý thức và sợi nối cộng đồng.",
    },
  },
  {
    name: { en: "Dreamline tracing", vi: "Lần theo đường Mộng cảnh" },
    note: {
      en: "Navigating threads through ancestral memory and non-linear time across vast geographical expanses.",
      vi: "Dõi theo những sợi tơ qua ký ức tiền nhân và thời gian phi tuyến tính, vượt qua những không gian địa lý bao la.",
    },
  },
  {
    name: { en: "Land-based practices", vi: "Thực hành gắn liền Thổ nhưỡng" },
    note: {
      en: "Connecting with threads rooted in sacred topography — songlines, ancestral Country, and terrain that remembers.",
      vi: "Giao cảm cùng những sợi tơ bám rễ vào địa linh — những đường ca bản địa, đất thiêng tổ tiên và những miền đất hằng ghi nhớ.",
    },
  },
  {
    name: { en: "Ancestral communication", vi: "Giao cảm Tiền nhân" },
    note: {
      en: "Tending the enduring silver bonds that link the living to those who have crossed over. Speak their names.",
      vi: "Nâng niu những sợi tơ bạc trường tồn nối liền người đang sống với những linh hồn đã khuất. Hãy gọi tên họ.",
    },
  },
]

export interface PairEntry {
  en: string
  vi: string
}

export const fieldNotes: PairEntry[] = [
  { en: 'Loom Tower catches the dawn like hammered brass.', vi: 'Tháp Khung Dệt đón vạt nắng mai lấp lánh như đồng thau dập búa.' },
  { en: 'The Boundary wavers misty as silk gauze — like water reflecting heat haze.', vi: 'Ranh giới mờ ảo tựa tấm voan mỏng — như gợn nước lăn tăn, như làn hơi nóng chập chờn.' },
  { en: 'The Tangle commons breathes as a living tapestry of student gold.', vi: 'Sảnh chung Mắt Xích rung động như một tấm thảm sống dệt bằng sắc vàng học sinh.' },
  { en: 'Emergency scarlet holds the hall. Ozone coats the throat.', vi: 'Sắc đỏ báo động ghì chặt gian phòng. Mùi khí ozon đọng nơi cuống họng.' },
]

export const glossary: { term: PairEntry; def: PairEntry }[] = [
  {
    term: { en: 'Animus Argenti', vi: 'Animus Argenti' },
    def: {
      en: 'The “Silver Soul” — the sovereign, conscious core of the thread dimension. Pure silver filaments that serve as a living bridge between human awareness and the cosmic Weave.',
      vi: '“Linh Hồn Bạc” — lõi ý thức thuần khiết, tối thượng của cõi sợi. Những sợi tơ bạc tinh khôi đóng vai trò nhịp cầu sống giữa tâm thức con người và Mạng Dệt.',
    },
  },
  {
    term: { en: 'Tactile Communion', vi: 'Giao Cảm Xúc Giác' },
    def: {
      en: 'An evolved, embodied mode of perception: feeling threads through texture, thermal warmth, and full-body somatic resonance rather than optical vision. Shēn Céng Gòng Míng.',
      vi: 'Phương thức tri giác tiến hóa qua xúc giác, bề mặt, nhiệt độ và cảm nhận toàn thân thay vì thị giác thông thường. Thâm Tầng Cộng Minh.',
    },
  },
  {
    term: { en: 'Thread Burn', vi: 'Bỏng Sợi' },
    def: {
      en: 'Severe neuro-energetic trauma caused by forceful or extractive manipulation. Silver-white scarring etched along the nervous system where living bonds were violently torn.',
      vi: 'Tổn thương thần kinh do thao túng sợi chỉ cưỡng bức hoặc bóc tách tàn bạo. Những vết sẹo bạc trắng rạch sâu dọc theo đường dẫn truyền thần kinh nơi sợi tơ bị giằng xé.',
    },
  },
  {
    term: { en: 'The Weave', vi: 'Mạng Dệt' },
    def: {
      en: 'The universal tapestry of interconnected threads binding all conscious life. A sentient, self-regulating ecosystem capable of intention, memory, and awakening.',
      vi: 'Tấm thảm vũ trụ đan dệt từ muôn vàn sợi tơ vô hình nối liền mọi sinh mệnh. Một hệ sinh thái có tri giác, tự điều hòa, chan chứa ký ức và đang thức giấc.',
    },
  },
  {
    term: { en: 'Communion vs. Control', vi: 'Tương Giao và Áp Chế' },
    def: {
      en: 'The defining ethical schism of the series: participating reverently with the Weave in mutual reciprocity, versus mechanizing threads as fuel for institutional dominance.',
      vi: 'Lằn ranh đạo đức cốt tử của bộ sách: khiêm nhường hòa điệu cùng Mạng Dệt trong tương giao hai chiều, đối lập với việc cơ giới hóa sợi tơ làm nhiên liệu phục vụ quyền lực.',
    },
  },
  {
    term: { en: 'Weave-Quake', vi: 'Địa Chấn Mạng Dệt' },
    def: {
      en: 'Violent systemic ruptures across the thread dimension — almost invariably triggered by industrial extraction — registering as psychic tremors and network-wide collapse.',
      vi: 'Những cơn rung chuyển dữ dội lan khắp cõi sợi — hầu như luôn bắt nguồn từ các cỗ máy khai thác tàn bạo — biểu hiện qua những cơn co giật tâm thức và sự đứt gãy mạng lưới.',
    },
  },
  {
    term: { en: 'Thread Nexus', vi: 'Nút Thắt Sợi Chỉ' },
    def: {
      en: 'Sacred geocosmic loci where countless threads converge into nodes of immense spiritual and physical power — Kyoto, Uluru, Stonehenge, and the Academy’s foundation.',
      vi: 'Những thánh địa địa lý - vũ trụ nơi hội tụ vô vàn sợi tơ tạo thành các trung tâm quyền năng tâm linh và thể chất hùng mạnh — Kyoto, Uluru, Stonehenge và nền móng Học viện.',
    },
  },
  {
    term: { en: 'Convergence Protocol', vi: 'Giao Thức Hội Tụ' },
    def: {
      en: 'An ancient, high-stakes collaborative rite: master weavers uniting across distinct cultural traditions to stabilize catastrophic fractures in the Weave.',
      vi: 'Đại lễ phối hợp cổ xưa giữa các bậc thầy dệt thuộc nhiều trường phái văn hóa khác nhau, cùng hợp lực vá lành những vết rạn nứt thảm khốc của Mạng Dệt trong cơn đại nạn.',
    },
  },
  {
    term: { en: 'Magnus Conduit', vi: 'Ống Dẫn Magnus' },
    def: {
      en: 'Marcus Harlow’s industrial extraction engine. The terrifying pinnacle of the Control philosophy — stripping threads of sentience and treating sacred bonds as electrical wiring.',
      vi: 'Cỗ máy chiết xuất công nghiệp của Marcus Harlow. Đỉnh điểm kinh hoàng của triết lý Áp Chế — tước đoạt linh tính của sợi tơ, đối xử với các mối liên kết thiêng liêng như dây điện.',
    },
  },
  {
    term: { en: 'Òwú Ìdásílẹ̀', vi: 'Òwú Ìdásílẹ̀' },
    def: {
      en: 'The Foundation Thread — the Yoruba designation for the Animus Argenti, honoring the primordial consciousness underlying the entire dimension.',
      vi: 'Sợi Tơ Khởi Thủy — danh xưng trong truyền thống Yoruba tôn kính Animus Argenti, ý thức nguyên sơ nền tảng nâng đỡ toàn bộ cõi sợi.',
    },
  },
  {
    term: { en: 'Participatory Metaphysics', vi: 'Siêu Hình Học Tham Dự' },
    def: {
      en: 'Lin Chen’s core theorem: the observer and the observed co-create reality within the Weave. You cannot touch a living thread without allowing yourself to be touched.',
      vi: 'Học thuyết nền tảng của Lin Chen: người quan sát và đối tượng được quan sát cùng đồng kiến tạo hiện thực trong Mạng Dệt. Ta không thể chạm vào sợi tơ mà không để nó chạm lại mình.',
    },
  },
  {
    term: { en: 'Silver Path', vi: 'Con Đường Bạc' },
    def: {
      en: 'Lin Chen’s enduring methodology: communion, patient listening, and reciprocal stewardship in direct defiance of exploitation and mechanical control.',
      vi: 'Đạo dệt bền bỉ của Lin Chen: hiệp thông, kiên nhẫn lắng nghe và gắn kết tương trợ, phản kháng lại hoàn toàn sự bóc lột và cơ giới hóa lạnh lùng.',
    },
  },
]

/* ------------------------------------------------------------------ author */

export const authorBio: { en: string; vi: string }[] = [
  {
    en: 'Le Viet Hong grew up navigating the liminal spaces between cultures, languages, and continents — a diaspora existence that shaped his lifelong obsession with the unseen ties that bind people across distance and difference. The Thread Seers began not as a fantasy plot, but as an inescapable metaphysical inquiry: what if the invisible covenants of love, grief, and solidarity between human beings were tangible, living strands of light?',
    vi: 'Lê Việt Hồng lớn lên giữa những giao điểm của các nền văn hóa, ngôn ngữ và lục địa — một hành trình di cư đã hun đúc trong ông niềm trăn trở khôn nguôi về những mối dây vô hình nối liền con người qua muôn trùng khoảng cách và dị biệt. Bộ sách Những Người Thấy Sợi Chỉ khởi nguồn không phải từ một cốt truyện hư cấu, mà từ một câu hỏi siêu hình thẳm sâu: điều gì sẽ xảy ra nếu những giao ước vô hình của tình yêu, nỗi đau và sự chở che giữa con người thực sự là những sợi tơ ánh sáng có thật?',
  },
  {
    en: 'Bringing the world of the Weave to life demanded years of rigorous interdisciplinary study — delving into Buddhist epistemology, cross-cultural philosophies of interdependence, and the documented material histories of each lineage woven into the books. The mathematical symmetries of Korean bojagi, the contemplative stillness of Vedic meditation, the sacred communal breath of Yoruba sensing — none of these are aesthetic adornment. Each tradition operates under its own exacting philosophical logic and moral gravity.',
    vi: 'Để thổi hồn vào thế giới của Mạng Dệt, tác giả đã dành nhiều năm nghiên cứu liên ngành nghiêm cẩn — đào sâu vào nhận thức luận Phật giáo, các hệ hình triết học đa văn hóa về tính tương tức, và lịch sử thực hành của từng truyền thống xuất hiện trong tác phẩm. Sự đối xứng toán học của bojagi Hàn Quốc, sự tĩnh tại chiêm nghiệm của thiền định Ấn Độ, hay hơi thở cộng đồng thiêng liêng trong nghi lễ Yoruba — không có mảng nào đơn thuần là trang sức văn phong. Mỗi dòng chảy đều vận hành theo logic nội tại và sức nặng luân lý riêng biệt.',
  },
  {
    en: 'At the heart of the saga lies Pratītyasamutpāda (Dependent Origination), the cornerstone Buddhist truth that no entity, emotion, or power exists in self-sufficient isolation. That philosophical lens governs the physics of the magic system: explaining why mechanical extraction corrodes the soul, why wounds echo across the entire collective tapestry, and why Lyra Chen’s ultimate journey is not about conquering power, but learning how to hold it with reverent hands.',
    vi: 'Trọng tâm của thiên trường ca này chính là giáo lý Duyên Khởi (Pratītyasamutpāda) — chân lý Phật giáo rằng không một sự vật, cảm xúc hay sức mạnh nào có thể tự tồn tại biệt lập. Lăng kính triết học ấy chi phối toàn bộ quy luật phép thuật: soi rọi lý do vì sao sự bóc tách cơ giới lại hủy hoại linh hồn, vì sao vết thương của một người lại rung chuyển cả tấm dệt chung, và vì sao đích đến của Lyra Chen không phải là xưng bá quyền lực, mà là học cách nâng niu nó bằng đôi bàn tay kính cẩn.',
  },
  {
    en: 'He writes for young adult readers because he refuses to condescend to their capacity for moral complexity. The Thread Seers does not soften the brutal reality of institutional hypocrisy, nor does it look away from what happens when human connections are treated as resources to be mined. It is an invitation to look closely, feel deeply, and remember the quiet courage of holding on.',
    vi: 'Ông viết cho thế hệ độc giả trẻ bởi ông trân trọng chiều sâu tư duy và năng lực tiếp nhận những nan đề đạo đức của họ. Những Người Thấy Sợi Chỉ không đơn giản hóa sự giả tạo của các thiết chế quyền lực, cũng không né tránh hậu quả tàn khốc khi các mối liên hệ giữa con người bị biến thành nguồn tài nguyên để vắt kiệt. Cuốn sách là một lời mời gọi độc giả nhìn thật sâu, cảm thật thấu, và thắp lên lòng can đảm nâng niu những sợi tơ kết nối muôn người.',
  },
]

/* ------------------------------------------------------------------ news */

export interface NewsPost {
  slug: string
  date: string
  title: { en: string; vi: string }
  excerpt: { en: string; vi: string }
  /** Simple markdown-ish body: paragraphs, `## ` headings, `- ` lists. */
  body: { en: string; vi: string }
}

export const newsPosts: NewsPost[] = [
  {
    slug: 'book-one-release',
    date: '2024-01-15',
    title: {
      en: 'Book One Is Live — Freely Given, Uncut and Complete',
      vi: 'Sách Một Đã Phát Hành — Toàn Văn Trọn Vẹn, Hoàn Toàn Miễn Phí',
    },
    excerpt: {
      en: 'The inaugural volume of The Thread Seers is complete and freely available in EPUB, PDF, and plain text. No paywalls, no previews — the full novel is yours.',
      vi: 'Tập mở màn của bộ Những Người Thấy Sợi Chỉ đã hoàn thành và sẵn sàng để tải về ở các định dạng EPUB, PDF và văn bản thuần. Không tường phí, không cắt đoạn — cuốn sách trọn vẹn thuộc về bạn.',
    },
    body: {
      en: `The first novel in *The Thread Seers* series is complete, bound, and out in the world. You can download the unabridged edition directly from this site in multiple formats, or read every chapter freely in your browser. It is also cataloged on Amazon Kindle and Google Play Books.

## The Story at the Threshold

Lyra Chen is sixteen, a quiet artist with graphite perpetually under her fingernails. For years, she charted what she called "relationship maps" in her school notebook margins — delicate webs linking classmates, teachers, and strangers, weighted according to the invisible bonds between them. Then the lines sparked into physical, luminous reality.

Recruited into Threadweaver Academy — an arcane sanctuary nested within an ordinary Massachusetts boarding school — Lyra discovers she is a Thread Seer, one of a rare few capable of perceiving the living cords binding humanity. But beneath the Academy’s veneer of scholarly elegance, an ashen contamination is hollowing students out from within. Her father is dying of an undiagnosed affliction; her missing mother was once the Academy’s chief metaphysical theorist; and every trail of inquiry leads straight toward a machine designed to harvest threads as mechanical fuel.

## Read Without Barriers

Book One is offered completely free across every digital medium: EPUB3 for e-readers, printable PDF for desktops and binder-reading, and clean Markdown for researchers and notes. There are no partial previews, no subscription locks, and no advertising gates. You can also read all 46 parts right here on the site, in parallel English and Vietnamese editions.

## The Road Ahead

Work on Book Two, *The Weaver's Shadow*, is well underway. The broader saga spans seven volumes, tracing Lyra’s transformation from an isolated observer into a guardian of the Weave. Thank you for holding the line.`,
      vi: `Cuốn tiểu thuyết đầu tiên trong bộ trường thiên *Những Người Thấy Sợi Chỉ* đã hoàn thành và chính thức ra mắt bạn đọc. Bạn có thể tải trọn vẹn tác phẩm từ trang web này dưới nhiều định dạng, hoặc thưởng thức từng chương trực tiếp trên trình duyệt. Tác phẩm cũng có mặt trên Amazon Kindle và Google Play Books.

## Câu chuyện trước Ngưỡng cửa

Lyra Chen mười sáu tuổi, một nữ sinh mê vẽ với đầu ngón tay luôn vương bụi than chì. Suốt nhiều năm, cô bí mật phác họa những “bản đồ quan hệ” bên lề tập vở — những màng lưới mỏng manh nối liền bạn bè, thầy cô và cả những người xa lạ, dày hay mỏng tùy thuộc vào sợi dây vô hình giữa họ. Rồi một ngày, những nét vẽ ấy bừng sáng thành những sợi tơ rực rỡ hữu hình giữa thinh không.

Được chiêu mộ vào Học viện Threadweaver — một thánh địa ẩn giấu bên trong ngôi trường nội trú tại vùng núi Berkshire, bang Massachusetts — Lyra nhận ra mình là một Người Thấy Sợi hiếm hoi có khả năng giao cảm cùng Mạng Dệt. Nhưng ẩn sau vẻ trang nghiêm thanh lịch của học viện, một mầm bệnh tro tàn đen bạc đang âm thầm đục rỗng tâm hồn của từng học sinh. Người cha kính yêu đang dần kiệt sức vì cơn bạo bệnh bí ẩn; người mẹ mất tích từng là nhà nghiên cứu siêu hình xuất chúng; và mọi manh mối đều quy về một cỗ máy công nghiệp tàn nhẫn được chế tạo để bóc tách năng lượng từ các sợi tơ thiêng liêng.

## Thưởng thức không rào cản

Sách Một được trao gửi hoàn toàn miễn phí trên mọi phương tiện kỹ thuật số: EPUB3 chuẩn mực cho máy đọc sách, PDF cho việc in ấn hay đọc trên máy tính, và Markdown cho việc tra cứu ghi chú. Tuyệt đối không có bản đọc thử cắt xén, không bắt buộc đăng ký tài khoản, và không có tường phí thương mại. Bạn có thể thưởng thức trọn vẹn 46 phần của tác phẩm ngay trên trang này, bằng cả hai ấn bản song ngữ Anh - Việt.

## Chặng đường tiếp nối

Quyển Hai, mang tựa đề *Bóng Người Dệt* (*The Weaver's Shadow*), đang được tác giả miệt mài hoàn thiện. Thiên trường ca dự kiến sẽ gồm bảy tập, theo sát hành trình trưởng thành của Lyra từ một thiếu nữ cô độc đến người gánh vác sứ mệnh bảo vệ Mạng Dệt. Chân thành cảm ơn bạn đã cùng nắm giữ sợi tơ này.`,
    },
  },
  {
    slug: 'series-announcement',
    date: '2024-01-01',
    title: {
      en: 'Inaugurating The Thread Seers: A Chronicle of Connection',
      vi: 'Khởi sinh Những Người Thấy Sợi Chỉ: Bản Trường Ca của Sự Gắn Kết',
    },
    excerpt: {
      en: 'Reflections on the philosophical genesis of the seven-book series, the Buddhist concept of dependent origination, and the living physics of the Weave.',
      vi: 'Những chiêm nghiệm về nguồn cội triết học của bộ trường thiên bảy tập, giáo lý Duyên Khởi của Phật giáo, và vũ trụ quan sống động của Mạng Dệt.',
    },
    body: {
      en: `Welcome to the official hearth of *The Thread Seers*. This platform will serve as the living archive for the seven-book chronicle as each volume is spun and released into the world.

## The Spark Behind the Loom

For years, I was haunted by a single metaphysical image: what if human relationships were not sentimental abstractions, but tangible physics? What if loyalty, heartbreak, ancestral memory, and unspoken love existed as a luminous dimensional stratum woven directly over our material world? 

If such threads existed, they would not be passive decorations. They would obey rigorous spiritual and ecological laws. Institutions would rise to codify them; factions would mobilize to weaponize them; and empires would inevitably attempt to harvest them for industrial power.

To anchor this world, I turned to the Buddhist philosophy of *Pratītyasamutpāda* — dependent origination. The understanding that no individual entity exists independently, and that all phenomena arise in co-dependent relationship. This is not merely a theme within the books; it is the fundamental physics of the magic itself. When you pull a thread, you move the cosmos. When you sever a bond, you fracture yourself.

## A Tapestry of Global Traditions

The series follows Lyra Chen through her formative years at Threadweaver Academy, tracing her journey across cultures and conflicts. The magic system honors genuine historical lineages: Korean bojagi geometry, Indian contemplative methods, Chinese reciprocal silk practices, Egyptian symbolic hieroglyphics, Yoruba gathered-life sensing, and Indigenous songlines. Each tradition brings its own ethics to the loom — and those philosophical differences drive the conflicts that shape the story.

## An Unbroken Thread

This site will chronicle every milestone of the series. Book One is here in its entirety, completely free in English and Vietnamese. Take it, read it, and pass it on.`,
      vi: `Chào mừng bạn đến với không gian chính thức của *Những Người Thấy Sợi Chỉ*. Nơi đây sẽ là văn khố sống lưu giữ trọn vẹn bản trường thiên bảy tập trong suốt quá trình từng cuốn sách được dệt nên và ra mắt bạn đọc.

## Đốm lửa trên Khung Dệt

Suốt nhiều năm, tâm trí tôi luôn bị thôi thúc bởi một hình ảnh siêu hình: điều gì sẽ xảy ra nếu các mối quan hệ giữa con người không phải là những khái niệm trừu tượng, mà là một thực tại vật lý có thể chạm tới? Nếu lòng trung thành, nỗi đau chia lìa, ký ức tiền nhân và tình yêu thầm lặng thực sự tồn tại như một tầng thứ nguyên rực rỡ phủ lên thế giới vật chất của chúng ta?

Nếu những sợi tơ ấy có thật, chúng sẽ không phải là thứ trang sức thụ động. Chúng sẽ tuân theo những quy luật tâm linh và sinh thái bất biến. Các tổ chức sẽ mọc lên để quy chuẩn hóa chúng; các phe phái sẽ tìm cách vũ khí hóa chúng; và những thế lực quyền uy tất yếu sẽ âm mưu bóc tách chúng làm nguồn nhiên liệu bành trướng.

Để tạo nền tảng vững chắc cho thế giới này, tôi tìm về với giáo lý Duyên Khởi (*Pratītyasamutpāda*) của Phật giáo — nhận thức thâm sâu rằng không một sinh mệnh nào tồn tại biệt lập, và vạn pháp sinh khởi từ sự nương tựa tương hỗ. Đây không chỉ là một chủ đề tư tưởng trong sách; đó là quy luật vận hành cốt lõi của chính phép thuật. Khi bạn kéo một sợi tơ, cả vũ trụ chuyển mình. Khi bạn cắt đứt một mối liên kết, chính tâm can bạn cũng rạn vỡ.

## Tấm thảm dệt từ muôn vạn truyền thống

Bộ sách theo chân Lyra Chen qua những năm tháng tại Học viện Threadweaver, lần theo bước chân cô qua muôn nẻo văn hóa và xung đột. Hệ thống phép thuật tôn vinh những dòng chảy lịch sử đích thực: hình học bojagi Hàn Quốc, thiền quán Ấn Độ, nghệ thuật tơ lụa tương giao Trung Hoa, biểu tượng Ai Cập cổ đại, cảm xạ Yoruba và những đường ca bản địa. Mỗi truyền thống đóng góp vào khung dệt một lăng kính đạo đức riêng — và chính những dị biệt triết học ấy đã châm ngòi cho những xung đột định hình toàn bộ thiên truyện.

## Một sợi chỉ không bao giờ đứt

Trang web này sẽ cập nhật từng cột mốc của bộ sách. Sách Một đã có mặt trọn vẹn tại đây, hoàn toàn miễn phí bằng cả tiếng Anh lẫn tiếng Việt. Xin trân trọng mời bạn đón nhận, thưởng thức và lan tỏa đến những người đồng điệu.`,
    },
  },
]

export function pick<T>(value: { en: T; vi: T }, locale: Locale): T {
  return locale === 'vi' ? value.vi : value.en
}

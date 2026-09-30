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
      blurb: 'Teen artist Lyra Chen sketches “relationship maps” in the margins of her notebooks until the lines begin glowing in the air. Recruited to Threadweaver Academy, she learns her gift has a name — and that the institution is failing as students collapse with their connections hollowed out by an ashen black-silver contamination. Control, or communion.',
      status: 'complete',
    },
    vi: {
      title: 'Những Người Thấy Sợi Chỉ: Sách Một',
      blurb: 'Cô nghệ sĩ mười sáu tuổi Lyra Chen vẽ “bản đồ quan hệ” ở mép sổ vở cho đến khi những đường nét ấy bắt đầu lên ánh trong không khí. Được Học viện Dệt Sợi chiêu mộ, cô biết năng lực của mình có tên — và biết nơi giữ nó đang hỏng, khi học sinh ngã quỵ vì những mối quan hệ của họ bị đục rỗng bởi một nhiễm ô nhiễm bạc-đen tro tàn. Kiểm soát, hay hiệp thông.',
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
      blurb: 'Lyra can no longer see the threads — but she can feel them. As she learns to trust a new kind of perception, old fractures inside the Academy crack open, and the traditions she relies on come under threat from people who see them only as tools.',
      status: 'progress',
    },
    vi: {
      title: 'Bóng Người Dệt',
      blurb: 'Lyra không còn nhìn thấy sợi chỉ nữa — nhưng cô cảm được chúng. Khi học cách tin vào một kiểu tri giác mới, những vết nứt cũ trong Học viện bắt đầu rạn ra, và những truyền thống mà cô dựa vào bị đe dọa bởi những kẻ chỉ nhìn thấy chúng như công cụ.',
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
      blurb: 'Thread phenomena are going public — strange lights over cities, mass emotional events with no explanation. Lyra and the quartet are caught between factions who want to reveal everything and those willing to do terrible things to keep the secret.',
      status: 'ahead',
    },
    vi: {
      title: 'Giao Thức Hội Tụ',
      blurb: 'Hiện tượng sợi chỉ bắt đầu lộ ra công khai — những ánh sáng kỳ lạ trên các thành phố, những đợt cảm xúc hàng loạt không lý do. Lyra và Tứ Nhân kẹt giữa các phe muốn phơi bày tất cả và những kẻ sẵn sàng làm điều khống kế chỉ để giữ bí mật.',
      status: 'ahead',
    },
  },
  {
    slug: 'book-four',
    position: 4,
    thread: 'unspun',
    available: false,
    en: { title: 'The Silver Path', blurb: 'Not yet spun.', status: 'unspun' },
    vi: { title: 'Con Đường Bạc', blurb: 'Chưa dệt.', status: 'unspun' },
  },
  {
    slug: 'book-five',
    position: 5,
    thread: 'unspun',
    available: false,
    en: { title: 'The Communion Wars', blurb: 'Not yet spun.', status: 'unspun' },
    vi: { title: 'Cuộc Chiến Hiệp Thông', blurb: 'Chưa dệt.', status: 'unspun' },
  },
  {
    slug: 'book-six',
    position: 6,
    thread: 'unspun',
    available: false,
    en: { title: 'The Dimensional Bridge', blurb: 'Not yet spun.', status: 'unspun' },
    vi: { title: 'Cầu Nối Chiều Không Gian', blurb: 'Chưa dệt.', status: 'unspun' },
  },
  {
    slug: 'book-seven',
    position: 7,
    thread: 'unspun',
    available: false,
    en: { title: 'The Awakening Network', blurb: 'Not yet spun.', status: 'unspun' },
    vi: { title: 'Mạng Lưới Thức Tỉnh', blurb: 'Chưa dệt.', status: 'unspun' },
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
    name: { en: 'Family · Silver', vi: 'Gia đình · Bạc' },
    note: {
      en: 'Luminous, rope-like bonds between family members. Dense like drawn wire — flares white at the core when protective.',
      vi: 'Sợi bền chặt, sáng rực nối người trong gia đình. Dày đặc như dây kéo — bừng trắng ở tâm khi bảo vệ.',
    },
    thread: 'silver',
  },
  {
    name: { en: 'Friendship · Gold', vi: 'Tình bạn · Vàng' },
    note: {
      en: 'Bright, braided bonds between friends. Warm where the load is shared.',
      vi: 'Sợi sáng, bện chặt giữa bạn bè. Ấm ở nơi sức nặng được chia đều.',
    },
    thread: 'gold',
  },
  {
    name: { en: 'Memory · Blue', vi: 'Ký Ức · Lam' },
    note: {
      en: 'Translucent, like light seen through water. Ghost images move inside.',
      vi: 'Trong mờ, như ánh sáng nhìn xuyên qua nước. Những hình bóng chuyển động bên trong.',
    },
    thread: 'memory',
  },
  {
    name: { en: 'Nature · Green', vi: 'Thiên Nhiên · Lục' },
    note: {
      en: 'Organic, vine-like connections to the living world. Anchored, patient.',
      vi: 'Sợi hữu cơ, leo giống dây, nối với thế giới sống. Bám rễ, kiên nhẫn.',
    },
    thread: 'nature',
  },
  {
    name: { en: 'Conflict · Red', vi: 'Xung Đột · Đỏ' },
    note: {
      en: 'Jagged and barbed. Tightens like wire under load.',
      vi: 'Gai góc và có móc. Siết lại như dây thép dưới tải.',
    },
    thread: 'knot',
  },
  {
    name: { en: 'Deception · Gray', vi: 'Lừa Dối · Xám' },
    note: {
      en: 'Murky, twisted. Too clean where it should breathe.',
      vi: 'Đục, xoắn vặn. Quá sạch ở nơi lẽ ra phải thở.',
    },
    thread: 'deception',
  },
  {
    name: { en: 'Animus Argenti · Pure Silver', vi: 'Animus Argenti · Bạc Thuần' },
    note: {
      en: 'The conscious core of the dimension itself. Internal luminosity — the Weave, awake.',
      vi: 'Lõi ý thức của chính chiều không gian. Ánh sáng từ bên trong — Dệt Bộ, tỉnh giấc.',
    },
    thread: 'animus',
  },
  {
    name: { en: 'Contamination · Black-Silver', vi: 'Nhiễm Ô Nhiễm · Đen-Bạc' },
    note: {
      en: 'Ashen black with sickly silver edges. Consumes rather than connects. Cold, utilitarian, extractive.',
      vi: 'Đen tro với cạnh bạc ốm yếu. Nuốt chửng thay vì nối kết. Lạnh lẽo, tiện dụng, khai thác.',
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
    name: { en: "Visualizers", vi: "Người Thấy" },
    note: { en: "Hear thread harmonics as musical tones — woodwinds, cello, chimes, clashing cymbals.", vi: "Nghe thế hài của sợi chỉ như những nốt nhạc — sáo, đàn cello, chuông, cymbal va nhau." },
  },
  {
    name: { en: "Resonators", vi: "Người Cộng Hưởng" },
    note: { en: "Feel the emotional content directly: warm wool and velvet, or icy chill and sharp stab.", vi: "Cảm trực tiếp nội dung cảm xúc: len ấm và nhung, hay cái rét buốt và nhói nhọn." },
  },
  {
    name: { en: "Empaths", vi: "Người Cảm Thức" },
    note: { en: "Trace thread paths across distance — tug, pull, currents, rivers.", vi: "Lần theo đường sợi chỉ qua khoảng cách — lôi, kéo, dòng chảy, sông." },
  },
  {
    name: { en: "Navigators", vi: "Người Dẫn Đường" },
    note: { en: "The rarest of all: strengthen, redirect, or create new threads. Ask first. Never seize.", vi: "Hiếm nhất: củng cố, đổi hướng, hoặc tạo sợi chỉ mới. Hỏi trước đã. Không bao giờ nắm lấy." },
  },
  {
    name: { en: "Manipulators", vi: "Người Điều Khiển" },
    note: { en: "Evolved perception through non-visual senses — touch, texture, temperature, knowing.", vi: "Tri giác tiến hoá qua các giác quan phi thị giác — xúc giác, kết cấu, nhiệt độ, sự biết." },
  },
  {
    name: { en: "Sensory Weavers", vi: "Người Dệt Giác Quan" },
    note: { en: "Like Lyra, they experience threads through touch, texture, temperature, and full-body sensation.", vi: "Giống Lyra, họ cảm nhận sợi chỉ qua xúc giác, kết cấu, nhiệt độ, và cảm giác toàn thân." },
  },
]

export interface TraditionEntry {
  name: { en: string; vi: string }
  note: { en: string; vi: string }
}

export const tradition: TraditionEntry[] = [
  {
    name: { en: "Korean geometric patterns", vi: "Hoa văn hình học Hàn Quốc" },
    note: { en: "Precise mathematical weaving — balance, symmetry, bojagi patchwork logic.", vi: "Dệt toán học chính xác — cân bằng, đối xứng, logic vá lặp bojagi." },
  },
  {
    name: { en: "Indian philosophical methods", vi: "Phương pháp triết học Ấn Độ" },
    note: { en: "Meditation-based technique; thread work as spiritual practice.", vi: "Kỹ thuật dựa trên thiền; làm việc với sợi chỉ như tu hành." },
  },
  {
    name: { en: "Chinese communion practices", vi: "Thực hành hiệp thông Trung Hoa" },
    note: { en: "Ancestral silk work — harmony and reciprocal relationship with the Weave. Conversation, not domination.", vi: "Nghề dệt tơ tổ tiên — hài hoà và quan hệ hai chiều với Dệt Bộ. Là trò chuyện, không phải thống trị." },
  },
  {
    name: { en: "Egyptian thread hieroglyphics", vi: "Chữ tượng hình sợi chỉ Ai Cập" },
    note: { en: "Ancient symbolic systems for recording and transmitting thread knowledge.", vi: "Hệ thống ký hiệu cổ đại để ghi lại và truyền tải tri thức về sợi chỉ." },
  },
  {
    name: { en: "African pattern-speaking", vi: "Kể chuyện hoa văn châu Phi" },
    note: { en: "Oral traditions encoding technique in story and song.", vi: "Truyền thống truyền miệng mã hoá kỹ thuật trong truyện và ca." },
  },
  {
    name: { en: "Yoruba thread sensing", vi: "Cảm sợi chỉ Yoruba" },
    note: { en: "ẹ̀mí àgbájọ — gathered life. Artifacts like the Òwú Ìmọ̀lára amplify connection.", vi: "ẹ̀mí àgbájọ — sự sống được gom lại. Những vật thể như Òwú Ìmọ̀lára khuếch đại sợi nối." },
  },
  {
    name: { en: "Dreamline tracing", vi: "Lần theo đường trong mơ" },
    note: { en: "Following connections across vast distances and through time.", vi: "Đi theo sợi nối qua khoảng cách xa và xuyên qua thời gian." },
  },
  {
    name: { en: "Land-based practices", vi: "Thực hành gắn với đất đai" },
    note: { en: "Understanding threads through specific places — songlines, Country, ground that remembers.", vi: "Hiểu sợi chỉ qua những nơi chốn cụ thể — đường ca, Quốc Địa, mảnh đất nhớ." },
  },
  {
    name: { en: "Ancestral communication", vi: "Liên lạc tổ tiên" },
    note: { en: "Threads maintained with those who have passed. Say their names.", vi: "Giữ sợi chỉ với những người đã đi. Gọi tên họ." },
  },
]

export const fieldNotes: PairEntry[] = [
  { en: 'Loom Tower catches morning sun like hammered brass.', vi: 'Tháp Khung bắt nắng sớm như đồng đanh giẹ.' },
  { en: 'The Boundary runs misty as a veil — like a watery surface, like heat haze.', vi: 'Ranh giới mờ như tấm voan — như mặt nước, như hơi nóng.' },
  { en: 'The Tangle commons holds a living tapestry of student gold.', vi: 'Sảnh chung Mắt Xích chứa một tấm thảm sống của vàng học sinh.' },
  { en: 'Emergency red holds. Ozone coats the throat.', vi: 'Đèn báo động đỏ giữ nguyên. Ozon phủ cổ họng.' },
]

export const glossary: { term: PairEntry; def: PairEntry }[] = [
  {
    term: { en: 'Animus Argenti', vi: 'Animus Argenti' },
    def: {
      en: 'The “Silver Soul” — the conscious core of the thread dimension. Pure silver threads; a living interface between human consciousness and the Weave.',
      vi: '“Linh hồn bạc” — lõi ý thức của chiều sợi chỉ. Sợi bạc thuần; một giao diện sống giữa ý thức người và Dệt Bộ.',
    },
  },
  {
    term: { en: 'Tactile Communion', vi: 'Hiệp Thông Xúc Giác' },
    def: {
      en: 'Evolved perception through touch, texture, temperature, full-body sensation — rather than visual sight. Shēn Céng Gòng Míng.',
      vi: 'Tri giác tiến hoá qua xúc giác, kết cấu, nhiệt độ, cảm giác toàn thân — thay vì thị giác. Thâm Tầng Cộng Minh.',
    },
  },
  {
    term: { en: 'Thread Burn', vi: 'Bỏng Sợi Chỉ' },
    def: {
      en: 'Corrosion from forceful thread manipulation. Silver-white scarring along nerve pathways — burn lines brightening in disciplined routes.',
      vi: 'Ăn mòn do thao túng sợi chỉ cưỡng ép. Sẹo bạc trắng dọc đường thần kinh — vệt bỏng sáng lên theo những đường có trật tự.',
    },
  },
  {
    term: { en: 'The Weave', vi: 'Dệt Bộ' },
    def: {
      en: 'The collective network of all threads. A living ecosystem showing signs of its own consciousness — and attempts at communication.',
      vi: 'Mạng lưới chung của mọi sợi chỉ. Một hệ sinh thái sống, có dấu hiệu ý thức riêng — và những nỗ lực giao tiếp.',
    },
  },
  {
    term: { en: 'Communion vs. Control', vi: 'Hiệp Thông và Kiểm Soát' },
    def: {
      en: 'The central divide: working with the Weave in reciprocity, versus extracting thread energy for utilitarian ends.',
      vi: 'Chia rẽ trung tâm: làm việc với Dệt Bộ qua tương hồi, đối lập với khai thác năng lượng sợi chỉ vì lợi ích tiện dụng.',
    },
  },
  {
    term: { en: 'Weave-Quake', vi: 'Động Đất Dệt Bộ' },
    def: {
      en: 'Instability in the thread dimension — often from unethical harvesting — measured as disruption across the network.',
      vi: 'Bất ổn trong chiều sợi chỉ — thường do khai thác phi đạo đức — đo bằng mức gián đoạn toàn mạng.',
    },
  },
  {
    term: { en: 'Thread Nexus', vi: 'Nút Sợi Chỉ' },
    def: {
      en: 'Where many threads converge. Sites of power and cultural weight — Kyoto, Uluru, Stonehenge, the Academy.',
      vi: 'Nơi nhiều sợi chỉ hội tụ. Những điểm có sức nặng về quyền lực và văn hoá — Kyoto, Uluru, Stonehenge, Học viện.',
    },
  },
  {
    term: { en: 'Convergence Protocol', vi: 'Giao Thức Hội Tụ' },
    def: {
      en: 'A collaborative ceremony: multiple traditions working together to stabilize the Weave in crisis.',
      vi: 'Một nghi lễ phối hợp: nhiều truyền thống cùng làm việc để ổn định Dệt Bộ trong khủng hoảng.',
    },
  },
  {
    term: { en: 'Magnus Conduit', vi: 'Ống Dẫn Magnus' },
    def: {
      en: 'Harlow’s extraction machine. The dangerous extreme of the Control philosophy — threads treated like wiring.',
      vi: 'Cỗ máy khai thác của Harlow. Cực đoan nguy hiểm của triết lý Kiểm Soát — sợi chỉ bị đối xử như dây điện.',
    },
  },
  {
    term: { en: 'Òwú Ìdásílẹ̀', vi: 'Òwú Ìdásílẹ̀' },
    def: {
      en: 'Foundation Thread — Yoruba name for the Animus Argenti, the foundational consciousness of the dimension.',
      vi: 'Sợi Nền Tảng — tên Yoruba của Animus Argenti, ý thức nền tảng của chiều không gian.',
    },
  },
  {
    term: { en: 'Participatory Metaphysics', vi: 'Siêu Hình Tham Dự' },
    def: {
      en: 'Lin Chen’s theory: observer and observed co-create reality in the Weave. You cannot touch without being touched.',
      vi: 'Lý thuyết của Lin Chen: người quan sát và sự được quan sát cùng tạo ra hiện thực trong Dệt Bộ. Không thể chạm mà không bị chạm lại.',
    },
  },
  {
    term: { en: 'Silver Path', vi: 'Con Đường Bạc' },
    def: {
      en: 'Lin Chen’s approach — communion and reciprocity rather than extraction and control.',
      vi: 'Cách tiếp cận của Lin Chen — hiệp thông và tương hồi thay vì khai thác và kiểm soát.',
    },
  },
]

/* ------------------------------------------------------------------ author */

export const authorBio: { en: string; vi: string }[] = [
  {
    en: 'Le Viet Hong grew up between cultures, which is probably why he ended up writing a book about the things that connect people across distance and difference. The Thread Seers started as a question he couldn’t stop thinking about: what if the bonds between people were something you could actually see?',
    vi: 'Lê Việt Hồng lớn lên giữa hai nền văn hoá, có lẽ đó là lý do ông viết một cuốn sách về những thứ nối con người qua khoảng cách và khác biệt. Những Người Thấy Sợi Chỉ bắt đầu từ một câu hỏi ông không ngừng nghĩ: nếu những mối ràng buộc giữa người với người là thứ gì đó thực sự nhìn thấy được thì sao?',
  },
  {
    en: 'The series took years of research — into Buddhist philosophy, into how different cultures around the world have understood connection and interdependence, into the specific histories of the traditions represented in the books. The Korean geometric patterns, the Indian meditation techniques, the Yoruba thread-sensing practices — none of that is decoration. Each tradition has its own logic and its own stakes.',
    vi: 'Cả bộ sách mất nhiều năm nghiên cứu — về triết học Phật, về cách các nền văn hoá khác nhau trên thế giới đã hiểu sự kết nối và sự nương nhẹ, về lịch sử cụ thể của các truyền thống xuất hiện trong sách. Hoa văn hình học Hàn Quốc, kỹ thuật thiền của Ấn Độ, tập tụ cảm sợi chỉ của Yoruba — không mảng nào trong số đó là để trang trí. Mỗi truyền thống có logic và cái giá riêng.',
  },
  {
    en: 'The magic system is built on dependent origination, a Buddhist concept: nothing exists independently, everything arises from causes and conditions. That idea shapes every part of the story, from how thread-sight works to why extraction is destructive to what Lyra ultimately has to learn about power.',
    vi: 'Hệ thống phép thuật dựng trên khái niệm duyên khởi: không gì tồn tại độc lập, mọi thứ sinh ra từ nhân và duyên. Ý tưởng ấy định hình mọi phần của câu chuyện, từ cách Nhãn Sợi hoạt động đến lý do việc khai thác phá huỷ, cho tới điều Lyra cuối cùng phải học về quyền lực.',
  },
  {
    en: 'He writes for young readers because he thinks they’re ready for harder questions than most books ask them. The Thread Seers doesn’t simplify its ethics or pull its punches about what happens when people treat relationships as resources.',
    vi: 'Ông viết cho người đọc trẻ vì ông nghĩ họ đã sẵn sàng cho những câu hỏi khó hơn thứ phần lớn sách dành cho họ. Những Người Thấy Sợi Chỉ không đơn giản hoá đạo đức, cũng không né tránh điều gì xảy ra khi con người đối xử với các mối quan hệ như một nguồn tài nguyên.',
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
      en: 'Book One Is Out — And It’s Free',
      vi: 'Sách Một Đã Xuất Bản — Và Hoàn Toàn Miễn Phí',
    },
    excerpt: {
      en: 'The first book in The Thread Seers series is done and available as a free download. Full text, no paywalls.',
      vi: 'Cuốn đầu tiên trong bộ Những Người Thấy Sợi Chỉ đã hoàn thành và có sẵn để tải miễn phí. Toàn văn, không tường thanh toán.',
    },
    body: {
      en: `The first book in The Thread Seers series is done and available now. You can download the full book for free from this site, or pick it up on Kindle and Google Play Books.

## What the Book Is

Lyra Chen is sixteen. She sketches what she calls "relationship maps" in her notebook margins—lines between people, thick or thin depending on how connected they seem. Then the lines start glowing. Turns out she's a Thread Seer, someone who can perceive the actual connections between living things. She gets recruited to Threadweaver Academy, a hidden school inside a Massachusetts boarding school, where she's supposed to learn how to use her gift.

But students are collapsing. Their connections are being drained by something—an ashen contamination spreading through the thread network. Lyra's father is dying. Her mother disappeared years ago, and the trail leads straight back to the Academy and its research into thread extraction.

## Read the Whole Thing Free

The complete book is available as a free download in PDF, EPUB, and Markdown. No samples, no paywalls—just the full text. You can also read every chapter right here on the site, in English and in Vietnamese.

## What's Next

Book Two, *The Weaver's Shadow*, is in progress. The series is planned as seven books following Lyra from age 16 to 18.`,
      vi: `Cuốn đầu tiên trong bộ Những Người Thấy Sợi Chỉ đã xong và có sẵn ngay bây giờ. Bạn có thể tải trọn cuốn sách miễn phí từ trang này, hoặc tìm trên Kindle và Google Play Books.

## Cuốn sách nói về gì

Lyra Chen mười sáu tuổi. Cô vẽ thứ mà mình gọi là "bản đồ quan hệ" ở mép sổ vở — những đường nối giữa người với người, đậm hay mờ tuỳ mức độ gắn bó trông có vẻ thế nào. Rồi những đường nét ấy bắt đầu phát sáng. Hoá ra cô là một Người Thấy Sợi — người nhìn thấy được những kết nối thật sự giữa các sinh vật. Cô được Học viện Dệt Sợi chiêu mộ, một trường học ẩn bên trong một nội trú ở Massachusetts, nơi cô được dạy cách dùng năng lực của mình.

Nhưng học sinh đang ngã quỵ. Những mối quan hệ của họ đang bị rút cạn bởi một thứ gì đó — một sự nhiễm ô nhiễm màu tro lan khắp mạng sợi chỉ. Cha Lyra đang hấp hối. Mẹ cô biến mất từ nhiều năm trước, và dấu vết dẫn thẳng về Học viện cùng nghiên cứu về việc khai thác sợi chỉ.

## Đọc Trọn Cuốn Miễn Phí

Trọn cuốn sách có sẵn dưới dạng tải miễn phí ở PDF, EPUB, và Markdown. Không đoạn dẻ thử, không tường thanh toán — chỉ toàn văn. Bạn cũng có thể đọc từng chương ngay tại đây, bằng tiếng Anh lẫn tiếng Việt.

## Tiếp theo

Sách Hai, *Bóng Người Dệt*, đang được viết. Cả bộ dự kiến gồm bảy cuốn, theo sát Lyra từ năm 16 đến 18 tuổi.`,
    },
  },
  {
    slug: 'series-announcement',
    date: '2024-01-01',
    title: {
      en: 'Introducing The Thread Seers',
      vi: 'Giới thiệu Những Người Thấy Sợi Chỉ',
    },
    excerpt: {
      en: 'A series about a girl who can see the threads connecting people, the hidden school that trains her, and the question of what those connections are actually for.',
      vi: 'Một bộ sách về một cô gái nhìn thấy được những sợi chỉ nối con người, ngôi trường ẩn nơi huấn luyện cô, và câu hỏi những mối nối ấy thật sự để làm gì.',
    },
    body: {
      en: `This is a site for The Thread Seers, a fantasy series I've been working on for a while now. The first book is nearly ready.

## Where It Came From

I kept thinking about the idea that connections between people might be something physical—something with weight and color and texture. Not a metaphor, but an actual dimension layered on top of ours. And if some people could see it, what would they do with that? What institutions would form around it? Who would try to exploit it?

The magic system is based on dependent origination, a concept from Buddhist philosophy—the idea that nothing exists independently. That felt like the right foundation for a story about what connections are and what happens when you treat them as a resource to extract.

## The Story

Lyra Chen is sixteen and has always sketched the lines she sees between people. At Threadweaver Academy, she finds out her ability is real and rare. But the Academy has problems—students are losing their connections to something corrosive, and Lyra's missing mother was involved in the research that might have caused it.

The series is planned as seven books, following Lyra from 16 to 18, and draws on thread traditions from Korean, Indian, Chinese, Egyptian, African, and Indigenous cultures. Each tradition has its own approach to the Weave, and those differences matter to the plot.

## What's Here

I'll use this space for updates as the book and the series develop. Book One is free, full text, in English and Vietnamese.`,
      vi: `Đây là trang cho Những Người Thấy Sợi Chỉ, một bộ sách viễn tưởng tôi đã viết khá lâu. Cuốn đầu tiên gần như đã xong.

## Nó đến từ đâu

Tôi cứ nghĩ về ý tưởng rằng những kết nối giữa người với người có thể là thứ gì đó mang tính vật lý — có trọng lượng, có màu, có kết cấu. Không phải ẩn dụ, mà là một chiều không gian thật, xếp lớp lên trên chiều của chúng ta. Và nếu có người nhìn thấy nó, họ sẽ làm gì với nó? Những cơ chế nào sẽ hình thành quanh nó? Ai sẽ cố khai thác nó?

Hệ thống phép thuật dựa trên duyên khởi, một khái niệm của triết học Phật — ý tưởng rằng không gì tồn tại độc lập. Điều đó có vẻ là nền tảng đúng đắn cho một câu chuyện về bản chất của kết nối và điều gì xảy ra khi bạn đối xử với chúng như một nguồn tài nguyên để khai thác.

## Câu chuyện

Lyra Chen mười sáu tuổi và luôn vẽ những đường nối cô thấy giữa người với người. Ở Học viện Dệt Sợi, cô biết năng lực của mình là thật và hiếm có. Nhưng Học viện có vấn đề — học sinh đang mất dần những kết nối của họ vì thứ gì đó gây ăn mòn, và người mẹ mất tích của Lyra đã dính líu vào nghiên cứu có thể gây ra điều đó.

Cả bộ sách dự kiến gồm bảy cuốn, theo sát Lyra từ 16 đến 18 tuổi, và lấy cảm hứng từ các truyền thống sợi chỉ của văn hoá Hàn Quốc, Ấn Độ, Trung Hoa, Ai Cập, Châu Phi, và bản địa. Mỗi truyền thống có cách tiếp cận Dệt Bộ riêng, và những khác biệt ấy quan trọng với cốt truyện.

## Có gì ở đây

Tôi sẽ dùng trang này để cập nhật khi sách và cả bộ phát triển. Sách Một miễn phí, toàn văn, bằng cả tiếng Anh lẫn tiếng Việt.`,
    },
  },
]

export function pick<T>(value: { en: T; vi: T }, locale: Locale): T {
  return locale === 'vi' ? value.vi : value.en
}

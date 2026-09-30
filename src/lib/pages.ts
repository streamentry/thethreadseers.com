import type { Locale } from './chapters'
import type { ThreadNode } from './content'

/** Localized prose block. */
export interface L {
  en: string
  vi: string
}

export interface PremiseRow {
  numeral: string
  title: L
  body: L
}

/** Home: the "Seam & Scar" premise rail. */
export const premise: PremiseRow[] = [
  {
    numeral: '01',
    title: { en: 'Listen', vi: 'Lắng nghe' },
    body: {
      en: 'Recruited to Threadweaver Academy, Lyra learns her gift has a name — and that the institution keeping it is failing. Students are collapsing with their connections hollowed out, and nobody in charge will say why.',
      vi: 'Được Học viện Dệt Sợi chiêu mộ, Lyra biết năng lực của mình có tên — và biết nơi giữ nó đang hỏng. Học sinh ngã quỵ vì những mối quan hệ của họ bị đục rỗng, và không ai phụ trách sẽ nói lý do.',
    },
  },
  {
    numeral: '02',
    title: { en: 'Seam & scar', vi: 'Đường khâu và vết sẹo' },
    body: {
      en: 'An ashen black-silver contamination is spreading through the Weave: threads dimming, fraying, going hollow. What used to feel like silk now feels like scar — fibrous, resistant, still holding.',
      vi: 'Một sự nhiễm ô nhiễm đen bạc màu tro đang lan khắp Dệt Bộ: sợi chỉ tối đi, rở ra, rỗng bên trong. Trước kia cảm giác như tơ lụa, giờ nó cảm giác như một vết sẹo — thô ráp, kháng cự, vẫn còn giữ.',
    },
  },
  {
    numeral: '03',
    title: { en: 'Hold', vi: 'Giữ' },
    body: {
      en: 'Her father is dying. Her mother’s disappearance leads back to the Academy’s hidden extraction research. So Lyra must choose what kind of power she will become: control, or communion.',
      vi: 'Cha cô đang hấp hối. Sự biến mất của mẹ dẫn ngược về nghiên cứu khai thác bí mật của Học viện. Nên Lyra phải chọn mình sẽ trở thành quyền lực kiểu nào: kiểm soát, hay hiệp thông.',
    },
  },
]

export const quartet: ThreadNode[] = [
  {
    name: 'Lyra Chen',
    label: 'silver · self',
    thread: 'silver',
    essence: {
      en: 'Sixteen, Chinese-American, pockets full of pencils. She sketches relationship maps in notebook margins — until the lines begin glowing in the air. Rare multi-spectrum sight, dry humour, and a habit of carrying everything alone. Learning, deliberately, to say: not anymore.',
      vi: 'Mười sáu tuổi, gốc Hoa, túi đầy bút chì. Cô vẽ bản đồ quan hệ ở mép sổ vở — cho đến khi những đường nét bắt đầu lên ánh trong không khí. Nhãn đa phổ hiếm gặp, trào hài khô, và thói quen ôm mọi thứ một mình. Đang học, có chủ đích, để nói: không phải nữa.',
    },
  },
  {
    name: 'Milo Rodriguez',
    label: 'gold · friendship',
    thread: 'gold',
    meta: 'the healer',
    essence: {
      en: 'Thirteen, curandero lineage, empath-resonator. After a sonic injury leaves him with tinnitus, he starts hearing the Weave as music — Thread-Song. Comic relief with perfect pitch for other people’s pain.',
      vi: 'Mười ba tuổi, dòng dõi curandero, người cộng hưởng cảm thức. Sau một chấn thương âm thanh để lại ù tai, cậu bắt đầu nghe Dệt Bộ như một bản nhạc — Khúc Sợi Chỉ. Vai trò hài hước với đôi tai tuyệt đối nhạy với nỗi đau của người khác.',
    },
  },
  {
    name: 'Zara Washington',
    label: 'gold · friendship',
    thread: 'gold',
    meta: 'the leader',
    essence: {
      en: 'Twelve, Egyptian and African-American, empath-strengthener. Confident, competitive, strategic — a rivalry with Lyra that hardens into the quartet’s deepest alliance. No solos, split tasking, always.',
      vi: 'Mười hai tuổi, gốc Ai Cập và Mỹ phi Châu Phi, người tăng cường cảm thức. Tự tin, cạnh tranh, có chiến lược — cuộc đối đầu với Lyra cứng lên thành liên minh sâu nhất của nhóm. Không ai đi một mình, chia nhiệm vụ, luôn luôn.',
    },
  },
  {
    name: 'Eli Park',
    label: 'gold · friendship',
    thread: 'gold',
    meta: 'the mind',
    essence: {
      en: 'Ten, Korean and Indian, Buddhist-raised child-prodigy Thread-Reader. Sensory differences that read subtle patterns everyone else walks past. Socially awkward, fiercely loyal, encyclopedic.',
      vi: 'Mười tuổi, gốc Hàn Quốc và Ấn Độ, thần đồng đọc sợi được nuôi dạy theo Phật giáo. Những khác biệt về giác quan giúp cậu đọc được các mẫu tinh vi mà người khác bỏ qua. Vụng về xã hội, trung thành tuyệt đối, như bách khoa.',
    },
  },
]

/** The shared "person" entries for the quartet strip, in this locale. */
export function quartetFor(locale: Locale): ThreadNode[] {
  return quartet.map((n) => ({ ...n, essence: n.essence[locale] }))
}

/** Series "about" rows. */
export const seriesAbout: PremiseRow[] = [
  {
    numeral: '01',
    title: { en: 'Dependent origination', vi: 'Duyên khởi' },
    body: {
      en: 'The magic is rooted in the Buddhist idea that nothing exists on its own — everything arises from conditions and relationships. That shapes how the characters understand their powers, why extraction hurts, and what communion actually costs.',
      vi: 'Phép thuật bám rễ vào ý niệm Phật giáo rằng không gì tồn tại một mình — mọi thứ sinh ra từ điều kiện và quan hệ. Điều đó định hình cách các nhân vật hiểu năng lực của mình, vì sao việc khai thác gây đau, và hiệp thông thật sự tốn kém gì.',
    },
  },
  {
    numeral: '02',
    title: { en: 'Living traditions', vi: 'Truyền thống còn sống' },
    body: {
      en: 'The story starts in 1943 Saigon and lands in a Massachusetts boarding school where Korean, Indian, Chinese, Egyptian, African, and Indigenous thread traditions are taught side by side — each with its own methods, history, and arguments about what threads are for.',
      vi: 'Câu chuyện bắt đầu ở Sài Gòn năm 1943 và đặt chân vào một nội trú ở Massachusetts, nơi các truyền thống sợi chỉ Hàn Quốc, Ấn Độ, Trung Hoa, Ai Cập, Châu Phi, và bản địa được dạy cạnh nhau — mỗi truyền thống có phương pháp, lịch sử, và lập luận riêng về việc sợi chỉ để làm gì.',
    },
  },
  {
    numeral: '03',
    title: { en: 'Healing against control', vi: 'Chữa lành trước kiểm soát' },
    body: {
      en: 'Harlow extracts thread energy with machines. Lin Chen practiced communion — listening to the Weave, working with it. How do you use power without hollowing out the thing you’re drawing it from?',
      vi: 'Harlow khai thác năng lượng sợi bằng máy móc. Lin Chen thực hành hiệp thông — lắng nghe Dệt Bộ, làm việc cùng nó. Làm sao dùng quyền lực mà không làm rỗng chính thứ bạn đang rút nó ra?',
    },
  },
  {
    numeral: '04',
    title: { en: 'Inheritance', vi: 'Di sản' },
    body: {
      en: 'Lyra’s great-great-grandmother Mei-Hua. Her grandmother Nai Nai. Her missing mother Lin. The knowledge passed down through these women survived displacement, war, and institutional silence. Lyra inherits all of it — including the parts nobody explained.',
      vi: 'Bà ngoại cố của Lyra, Mei-Hua. Bà nội Nai Nai. Mẹ mất tích của cô, Lin. Tri thức truyền qua những người đàn bà ấy sống sót qua sự di cư, chiến tranh, và sự im lặng của thể chế. Lyra thừa kế tất cả — kể cả những phần không ai giải thích.',
    },
  },
]

/** Field notes for the World page. */
export const fieldNotes = {
  en: [
    'Loom Tower catches morning sun like hammered brass.',
    'The Boundary runs misty as a veil — like a watery surface, like heat haze.',
    'The Tangle commons holds a living tapestry of student gold.',
    'Emergency red holds. Ozone coats the throat.',
  ],
  vi: [
    'Tháp Khung bắt nắng sớm như đồng đanh giẹ.',
    'Ranh giới mờ như tấm voan — như mặt nước, như hơi nóng.',
    'Sảnh chung Mắt Xích chứa một tấm thảm sống của vàng học sinh.',
    'Đèn báo động đỏ giữ nguyên. Ozon phủ cổ họng.',
  ],
} as Record<Locale, string[]>

/** Extract for the book page. */
export const excerpt = {
  en: [
    'She answered it with the small inner pressure she never named out loud and nudged the frayed edge toward center. The line responded instantly, too clean, like a latch that clicked shut under her thumb.',
    '“I’m sorry,” Katie said. “Me too,” Zach said. Then he blinked at his own voice, startled. The apology didn’t sound like his.',
    'Relief hit first. Then wrongness: thin and metallic, a coin in her palm she hadn’t paid for. The line had steadied, but it hadn’t chosen to.',
  ],
  vi: [
    'Cô đáp lại bằng áp lực nhỏ bên trong mà cô chưa bao giờ gọi tên thành tiếng, đẩy mép rở dần về giữa. Sợi chỉ đáp ngay lập tức, sạch quá, như một cái chốt khép vào dưới ngón tay cô.',
    '“Tôi xin lỗi,” Katie nói. “Tôi cũng,” Zach nói. Rồi cậu chớp mắt với chính giọng mình, giật mình. Lời xin lỗi ấy không giống của cậu.',
    'Có lẽ sự nhẹ nhõm đến trước. Rồi là sự sai lệch: mỏng và kim loại, như một đồng tiền nằm trong lòng bàn tay mà cô chưa từng trả. Sợi chỉ đã ổn định, nhưng nó không hề chọn thế.',
  ],
} as Record<Locale, string[]>

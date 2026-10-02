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
      en: 'Recruited to Threadweaver Academy, Lyra learns her rare perception has a name — and that the institution sworn to protect it is quietly breaking. Students collapse in the corridors with their vital connections hollowed out, while those in authority look away.',
      vi: 'Được Học viện Threadweaver chiêu mộ, Lyra biết năng lực hiếm hoi của mình có một danh xưng — và nơi chốn gánh vác sứ mệnh chở che nó đang âm thầm sụp đổ. Học sinh ngã quỵ nơi hành lang khi những mối liên kết cốt tủy bị đục rỗng, trong khi những kẻ nắm quyền nhất mực chối từ sự thật.',
    },
  },
  {
    numeral: '02',
    title: { en: 'Seam & scar', vi: 'Đường khâu và vết sẹo' },
    body: {
      en: 'An ashen black-silver blight creeps through the Weave: threads once vibrant with life are dimming, fraying, and draining cold. What once felt like seamless silk now feels like scar tissue — fibrous, resistant, yet fiercely holding on.',
      vi: 'Một mầm độc đen bạc màu tro tàn đang âm thầm lan khắp Mạng Dệt: những sợi tơ từng rạng rỡ sinh khí nay lụi tàn, tưa rách và lạnh lẽo rỗng không. Thứ từng êm ái như tơ lụa, giờ đây thô ráp tựa vết sẹo — dai dẳng, kiên cường, và vẫn bền bỉ níu giữ.',
    },
  },
  {
    numeral: '03',
    title: { en: 'Hold', vi: 'Nâng niu' },
    body: {
      en: 'Her father is fading. Her mother’s disappearance traces straight back to the Academy’s forbidden extraction engines. Lyra must choose what kind of power she will embody: the cold calculus of control, or the quiet courage of communion.',
      vi: 'Người cha dần kiệt sức. Sự mất tích bí ẩn của mẹ dẫn thẳng về cỗ máy khai thác năng lượng cấm kỵ của Học viện. Lyra buộc phải lựa chọn thứ sức mạnh mình sẽ dấn bước: sự chi phối lạnh lùng của kiểm soát, hay lòng can trường thầm lặng của tương giao.',
    },
  },
]

export const quartet = [
  {
    name: 'Lyra Chen',
    label: { en: 'silver · self', vi: 'bạc · tự thân' },
    thread: 'silver' as const,
    essence: {
      en: 'Sixteen, Chinese-American, pockets heavy with graphite. She charted the invisible spaces between people until those lines caught fire in mid-air. Gifted with rare multi-spectrum sight, a bone-dry wit, and the solitary habit of bearing every weight alone — she is slowly learning the grace of letting others hold the line.',
      vi: 'Mười sáu tuổi, gốc Hoa, túi áo luôn đầy những mẩu than chì. Cô phác họa những khoảng lặng vô hình giữa người với người cho đến khi các đường nét bừng sáng giữa thinh không. Sở hữu Nhãn Đa Phổ hiếm thấy, nét dí dỏm thâm trầm và thói quen một mình gánh vác mọi bão giông — cô đang học cách mở lòng để người khác cùng san sẻ.',
    },
  },
  {
    name: 'Milo Rodriguez',
    label: { en: 'gold · friendship', vi: 'vàng · tình bạn' },
    thread: 'gold' as const,
    meta: { en: 'the healer', vi: 'người chữa lành' },
    essence: {
      en: 'Thirteen, carrying the bloodline of curanderos, an empath-resonator whose inner ear was shattered by a sonic accident. Left with permanent tinnitus, he now hears the entire Weave as symphonic music — Thread-Song. Irrepressible humor with an absolute, perfect pitch for the hidden ache in others.',
      vi: 'Mười ba tuổi, mang huyết thống curandero, một người cộng hưởng cảm thức từng bị tổn thương thính giác sau một tai nạn âm thanh. Mang theo tiếng ù tai vĩnh viễn, cậu lại lắng nghe được trọn vẹn Mạng Dệt như một bản giao hưởng — Khúc Ca Sợi Chỉ. Nụ cười tinh nghịch cùng một đôi tai chuẩn xác tuyệt đối trước nỗi đau giấu kín của tha nhân.',
    },
  },
  {
    name: 'Zara Washington',
    label: { en: 'gold · friendship', vi: 'vàng · tình bạn' },
    thread: 'gold' as const,
    meta: { en: 'the leader', vi: 'người thủ lĩnh' },
    essence: {
      en: 'Twelve, Egyptian and African-American, an empath-strengthener of ferocious intellect. Strategic, unyielding, and fiercely competitive — what begins as sharp friction with Lyra tempers into the quartet’s deepest and most unbreakable anchor. No solos. Never seize.',
      vi: 'Mười hai tuổi, mang hai dòng máu Ai Cập và Mỹ gốc Phi, một người cường hóa cảm thức sở hữu trí tuệ sắc bén. Táo bạo, kiên định và giàu tư duy chiến lược — mối kình địch ban đầu với Lyra đã được tôi luyện thành điểm tựa vững chãi nhất của bộ tứ. Không ai đơn độc. Tuyệt đối không cưỡng đoạt.',
    },
  },
  {
    name: 'Eli Park',
    label: { en: 'gold · friendship', vi: 'vàng · tình bạn' },
    thread: 'gold' as const,
    meta: { en: 'the mind', vi: 'trí tuệ' },
    essence: {
      en: 'Ten, Korean and Indian, a prodigy raised in Buddhist contemplative traditions. His neurodivergent sensory awareness registers subtle, shifting tapestries in the Weave that older masters overlook. Soft-spoken, fiercely loyal, and carrying an archive in his mind.',
      vi: 'Mười tuổi, mang hai dòng máu Hàn Quốc và Ấn Độ, thần đồng đọc sợi lớn lên trong ánh sáng thiền định Phật giáo. Giác quan đặc biệt giúp cậu nhận diện những hoa văn vi tế trong Mạng Dệt mà những bậc thầy lão luyện thường bỏ qua. Trầm mặc, trung thành tuyệt đối, với trí nhớ uyên bác như một kho tàng lưu trữ.',
    },
  },
]

/** The shared "person" entries for the quartet strip, in this locale. */
export function quartetFor(locale: Locale): ThreadNode[] {
  return quartet.map((n) => ({
    name: n.name,
    thread: n.thread,
    label: n.label[locale],
    meta: n.meta ? n.meta[locale] : undefined,
    essence: n.essence[locale],
  }))
}

/** Series "about" rows. */
export const seriesAbout: PremiseRow[] = [
  {
    numeral: '01',
    title: { en: 'Dependent origination', vi: 'Duyên khởi' },
    body: {
      en: 'The magic system is anchored in the Buddhist truth of Pratītyasamutpāda: nothing exists in isolation; everything arises through causes, conditions, and relationship. That metaphysical foundation dictates how characters perceive their gifts, why mechanical extraction is inherently violent, and what true communion demands of the spirit.',
      vi: 'Phép thuật trong sách bắt rễ sâu xa từ giáo lý Duyên Khởi của Phật giáo: vạn vật không tự thân tồn tại độc lập mà sinh khởi nương nhờ vào nhân duyên và sự tương tức. Nền tảng triết học ấy định hình cách các nhân vật thấu hiểu năng lực, lý giải vì sao việc bóc tách cưỡng bức là một tội ác, và cái giá thiêng liêng mà sự hiệp thông chân chính đòi hỏi.',
    },
  },
  {
    numeral: '02',
    title: { en: 'Living traditions', vi: 'Dòng chảy truyền thống' },
    body: {
      en: 'From 1943 Saigon under Japanese occupation to the secluded halls of a Berkshire boarding school, the narrative honors thread-working traditions from Korean, Indian, Chinese, Egyptian, African, and Indigenous lineages — each bearing centuries of distinct technique, philosophy, and moral cosmology.',
      vi: 'Từ Sài Gòn năm 1943 chìm trong khói lửa đến khuôn viên cổ kính của trường nội trú vùng Berkshire, thiên truyện tôn vinh những truyền thống dệt sợi của Hàn Quốc, Ấn Độ, Trung Hoa, Ai Cập, Châu Phi và các bộ tộc bản địa — mỗi nền văn hóa mang theo phương pháp, bề dày lịch sử và triết lý nhân sinh riêng biệt.',
    },
  },
  {
    numeral: '03',
    title: { en: 'Healing against control', vi: 'Chữa lành trước áp chế' },
    body: {
      en: 'Where the antagonist Marcus Harlow extracts thread energy through cold, industrial machinery, Lin Chen practiced communion — listening deeply to the Weave, asking before touching, and weaving in reciprocity. How does one wield immense power without consuming the very world that sustains it?',
      vi: 'Trong khi Marcus Harlow cưỡng đoạt năng lượng sợi tơ bằng những cỗ máy công nghiệp lạnh lùng, Lin Chen lại thực hành tương giao — lắng nghe thấu đáo Mạng Dệt, hỏi trước khi chạm, và tạo tác trong sự hòa điệu hai chiều. Làm thế nào để nắm giữ sức mạnh mà không làm cạn kiệt chính nguồn sống đã nuôi dưỡng nó?',
    },
  },
  {
    numeral: '04',
    title: { en: 'Inheritance', vi: 'Dòng chảy di sản' },
    body: {
      en: 'Mei-Hua in colonial Indochina. Nai Nai preserving silk traditions through diaspora. Lin vanishing into the quiet shadows of research. The knowledge carried by these women endured displacement, war, and systemic erasure. Lyra inherits their entire legacy — including the truths no one dared speak aloud.',
      vi: 'Cố nội Mei-Hua giữa thời Đông Dương tao loạn. Bà nội Nai Nai gìn giữ tinh hoa tơ tằm qua bao thăng trầm di cư. Người mẹ Lin khuất bóng sau bức màn nghiên cứu bí ẩn. Tri thức của những người phụ nữ ấy đã kiên cường vượt qua chiến tranh, lưu lạc và sự xóa nhòa của thể chế. Lyra kế thừa trọn vẹn di sản đó — kể cả những góc khuất chưa từng ai hé lộ.',
    },
  },
]

/** Field notes for the World page. */
export const fieldNotes = {
  en: [
    'Loom Tower catches the dawn like hammered brass.',
    'The Boundary wavers misty as silk gauze — like water reflecting heat haze.',
    'The Tangle commons breathes as a living tapestry of student gold.',
    'Emergency scarlet holds the hall. Ozone coats the throat.',
  ],
  vi: [
    'Tháp Khung Dệt đón vạt nắng mai lấp lánh như đồng thau dập búa.',
    'Ranh giới mờ ảo tựa tấm voan mỏng — như gợn nước lăn tăn, như làn hơi nóng chập chờn.',
    'Sảnh chung Mắt Xích rung động như một tấm thảm sống dệt bằng sắc vàng học sinh.',
    'Sắc đỏ báo động ghì chặt gian phòng. Mùi khí ozon đọng nơi cuống họng.',
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
    'Cô đáp lại bằng một áp lực vô hình từ sâu thẳm mà cô chưa từng thốt nên lời, nhẹ nhàng đẩy mép sợi sờn rách về phía trung tâm. Sợi chỉ phản hồi ngay tức khắc, trơn tru đến gượng gạo, tựa như một then cài vừa sập khớp dưới đầu ngón tay.',
    '“Tớ xin lỗi,” Katie nói. “Tớ cũng vậy,” Zach đáp. Rồi cậu bạn chớp mắt, ngơ ngác trước chính giọng nói của mình. Lời xin lỗi ấy nghe chẳng hề giống lời cậu.',
    'Sự nhẹ nhõm ùa đến trước tiên. Rồi kế đó là cảm giác sai lạc: mỏng mảnh và tanh nồng vị kim loại, tựa như một đồng xu rơi vào lòng bàn tay mà cô chưa từng trả giá để có được. Sợi chỉ đã lặng yên, nhưng nó không hề tự nguyện làm điều đó.',
  ],
} as Record<Locale, string[]>

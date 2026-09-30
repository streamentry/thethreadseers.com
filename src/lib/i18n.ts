import type { Locale } from './chapters'

/**
 * All user-facing site copy, per locale.
 *
 * Book prose is NOT here — that lives in content/03_BOOK_ONE[_VIETNAMESE] and
 * is read through the chapter manifest. This file is chrome, navigation,
 * metadata, and editorial copy.
 */

export const localeMeta: Record<Locale, { htmlLang: string; ogLocale: string; label: string; short: string }> = {
  en: { htmlLang: 'en', ogLocale: 'en_US', label: 'English', short: 'EN' },
  vi: { htmlLang: 'vi', ogLocale: 'vi_VN', label: 'Tiếng Việt', short: 'VI' },
}

export interface NavItem {
  key: string
  path: string
}

export const navItems: NavItem[] = [
  { key: 'nav.download', path: '/download' },
  { key: 'nav.series', path: '/series' },
  { key: 'nav.world', path: '/world' },
  { key: 'nav.author', path: '/author' },
  { key: 'nav.news', path: '/news' },
]

type Dict = Record<string, string>

const en: Dict = {
  'site.name': 'The Thread Seers',
  'site.tagline': 'Where threads connect worlds, and every choice weaves destiny.',

  'nav.download': 'Download',
  'nav.series': 'Series',
  'nav.world': 'World',
  'nav.author': 'Author',
  'nav.news': 'News',
  'nav.home': 'Home',
  'nav.menu': 'Menu',
  'nav.openMenu': 'Open main menu',
  'nav.closeMenu': 'Close menu',
  'nav.langSwitch': 'Read in Vietnamese',
  'nav.langSwitchTo': 'Switch to Vietnamese',
  'nav.langSwitchToEn': 'Switch to English',
  'nav.footerNote': 'Set in Fraunces & Newsreader · threads hold',

  'common.book': 'Book One',
  'common.complete': 'complete',
  'common.free': 'free',
  'common.readFree': 'read free',
  'common.fullText': 'full text',
  'common.chapter': 'Chapter',
  'common.prologue': 'Prologue',
  'common.epilogue': 'Epilogue',
  'common.acknowledgments': 'Acknowledgments',
  'common.interlude': 'Interlude',
  'common.of': 'of',
  'common.coherence': 'coherence steady',
  'common.parts': 'parts',
  'common.allChapters': 'all chapters',
  'common.next': 'Next',
  'common.previous': 'Previous',
  'common.backToBook': 'Back to the book',
  'common.typeSize': 'Type size',
  'common.readerSettings': 'Reader settings',
  'common.increase': 'Increase type size',
  'common.decrease': 'Decrease type size',
  'common.loading': 'Loading',
  'common.hold': 'press and hold',
  'common.held': 'held',
  'common.download': 'Download',
  'common.notFound': 'This thread comes loose here',
  'common.author': 'Le Viet Hong',
  'common.publisher': 'Lumina Press',
  'common.rights': 'All rights reserved',

  'home.eyebrow': 'Book one · complete · free, no gate',
  'home.headline': 'She drew the lines {a} between people — then they began {b} to glow.',
  'home.intro':
    'Teen artist Lyra Chen sketches “relationship maps” in the margins of her notebooks until the lines begin glowing in the air: luminous threads binding people, places, and secrets.',
  'home.cta': 'Download Book One — free',
  'home.ctaHint': 'hold the thread',
  'home.secondary': 'Read the prologue first',
  'home.premise.eyebrow': 'Seam & scar',
  'home.quote':
    'What used to feel like silk now felt like scar.',
  'home.quoteCite': 'Lyra Chen · Book One',
  'home.quartet.eyebrow': 'Say their names',
  'home.quartet.title': 'No solos, split tasking.',
  'home.quartet.body':
    'A gold collective thread binds all four. They move as a unit — one lures, the others break archives, map emotion, count lock-clicks. Ask first. Never seize.',
  'home.final.title': 'Will you hold, if I hold?',
  'home.final.body':
    'The complete book, in English and in Vietnamese. Every format. No gate, no sample — the full text, the way threads should be shared.',
  'home.final.cta': 'Hold the thread — download free',
  'home.final.ctaVi': 'Tải bản tiếng Việt',

  'download.eyebrow': 'Book one · the full text',
  'download.title': 'No gate. No sample. Hold it all.',
  'download.body': 'The complete book in your format of choice — all {parts} parts, no sample. Threads are meant to be shared the way they’re held: openly, and without charge.',
  'download.ledger.eyebrow': 'Ledger · every edition accounted for',
  'download.read.title': 'Read online',
  'download.read.body':
    'Prefer to start in the browser? Every part of Book One is readable free, in both languages.',
  'download.read.cta': 'Start at the prologue',
  'download.stores.title': 'Storefronts',
  'download.stores.body':
    'The book also lives on Kindle and Google Play Books. If you ever see a price there, the free editions here are the same full text.',
  'download.store.kindle': 'Open on Kindle',
  'download.store.play': 'Open on Google Play Books',
  'download.cta': 'Hold the thread',
  'download.ctaEn': 'Download the English EPUB',
  'download.ctaVi': 'Tải bản tiếng Việt',

  'series.eyebrow': 'The series · seven books',
  'series.title': 'Follow the threads. Say their names.',
  'series.body':
    'Lyra Chen is sixteen when the glowing lines she has always sketched turn out to be real — threads of connection binding every living thing. Across seven books she grows from a girl hiding a strange gift into someone who must decide what that gift is for.',
  'series.index.title': 'The index',
  'series.index.body':
    'Every book, one thread. Bright where the work is done, dimmed and frayed where it isn’t yet. Honest, like the Weave.',
  'series.thread.complete': 'complete · free',
  'series.thread.progress': 'in progress',
  'series.thread.ahead': 'ahead',
  'series.thread.unspun': 'unspun',
  'series.follow': 'Follow this thread',
  'series.manifest.title': 'Read Book One online',
  'series.manifest.body':
    'All {parts} parts, in English and Vietnamese. No sign-up, no sample, no paywall.',

  'book.eyebrow': 'Book one · complete · free',
  'book.title': 'The Thread Seers: Book One',
  'book.updated': 'Updated',
  'book.readOnline': 'Start reading online',
  'book.ledger.eyebrow': 'Ledger · take a copy',
  'book.stores.eyebrow': 'Also held by',
  'book.excerpt.eyebrow': 'Excerpt · Chapter 1, “The Bridge”',
  'book.excerpt.body':
    'The first time Lyra steadies a thread on purpose — and learns the difference between held and taken.',
  'book.quote':
    'Relief hit first. Then wrongness: thin and metallic, a coin in her palm she hadn’t paid for. The line had steadied, but it hadn’t chosen to.',
  'book.back': 'Back to the series',
  'book.nextUnspun': 'book two · not yet spun',

  'world.eyebrow': 'The world · the weave',
  'world.title': 'An extra layer, laid over ours.',
  'world.body':
    'Luminous threads run between people, places, and ideas — visible only to a rare few. The Thread Dimension is a living network with its own rules and, increasingly, its own will. Nothing in it exists in isolation: pull one thread without understanding what it touches, and you will feel the consequences.',
  'world.index.title': 'The thread index',
  'world.index.body':
    'Threads show their nature in colour and texture. Thickness is strength, brightness is intensity, clarity is health, movement is state — pulsing, vibrating, still. Frayed where someone insisted they were fine.',
  'world.seers.title': 'Six ways of perceiving',
  'world.seers.body':
    'Not all seers meet the Weave the same way. Some see it, some hear it, some feel it through their skin.',
  'world.quiz.eyebrow': 'Listen · which thread is yours',
  'world.quiz.title': 'Discover how you would perceive the Weave.',
  'world.traditions.title': 'Old hands, many schools',
  'world.traditions.body':
    'People have worked threads for thousands of years, in different places, by different methods. At the Academy they are taught side by side — sometimes productively, sometimes not. Integrate, don’t appropriate.',
  'world.academy.eyebrow': 'Threadweaver Academy · est. 1798',
  'world.academy.title': 'A school hiding inside a school.',
  'world.academy.body':
    'North America’s oldest Thread Seer institution, hidden within Westbrook Academy in the Berkshire Mountains — an ordinary boarding school to non-seers, revealed through perception filters and architectural impossibilities to those with Thread Sight. Its central chamber holds the Great Loom: a vast domed hall where historical threads are preserved in living marble columns.',
  'world.fieldNotes': 'Field notes',
  'world.glossary.eyebrow': 'Glossary · say their names',
  'world.glossary.title': 'Words the Weave answers to.',

  'author.eyebrow': 'The author',
  'author.title': 'Between cultures, following the threads.',
  'author.monogramCaption': 'Author photograph — to come',
  'author.connect': 'Say their names · connect',
  'author.goodreads': 'Goodreads',
  'author.email': 'Email the author',
  'author.quote': 'The Academy had learned how to look calm while it burned.',
  'author.quoteCite': 'Book One',

  'news.eyebrow': 'Echoes · from the desk',
  'news.title': 'Word travels along threads, too.',
  'news.readPost': 'Read the post',
  'news.back': 'Back to echoes',
  'news.notFound': 'This thread comes loose here — no such post.',

  'reader.notFound': 'This thread comes loose here — no such chapter.',
  'reader.missing': 'This thread comes loose here — the chapter file is missing.',
  'reader.failed': 'This thread comes loose here — the chapter failed to load.',
  'reader.downloadAll': 'Hold the whole book',
  'reader.progress': 'part {n} / {total}',
}

const vi: Dict = {
  'site.name': 'Những Người Thấy Sợi Chỉ',
  'site.tagline': 'Nơi những sợi chỉ nối các thế giới, và mỗi lựa chọn đều dệt nên số phận.',

  'nav.download': 'Tải về',
  'nav.series': 'Bộ sách',
  'nav.world': 'Thế giới',
  'nav.author': 'Tác giả',
  'nav.news': 'Tin tức',
  'nav.home': 'Trang chủ',
  'nav.menu': 'Menu',
  'nav.openMenu': 'Mở menu chính',
  'nav.closeMenu': 'Đóng menu',
  'nav.langSwitch': 'Đọc bản tiếng Anh',
  'nav.langSwitchTo': 'Chuyển sang tiếng Anh',
  'nav.langSwitchToEn': 'Chuyển sang tiếng Anh',
  'nav.footerNote': 'Dùng chữ Fraunces & Newsreader · sợi chỉ vẫn giữ',

  'common.book': 'Sách Một',
  'common.complete': 'đã hoàn thành',
  'common.free': 'miễn phí',
  'common.readFree': 'đọc miễn phí',
  'common.fullText': 'toàn văn',
  'common.chapter': 'Chương',
  'common.prologue': 'Hồi mở đầu',
  'common.epilogue': 'Hồi kết',
  'common.acknowledgments': 'Lời tri ân',
  'common.interlude': 'Tiểu khúc',
  'common.of': 'trên',
  'common.coherence': 'độ ổn định không đổi',
  'common.parts': 'phần',
  'common.allChapters': 'toàn bộ các chương',
  'common.next': 'Kế tiếp',
  'common.previous': 'Trước',
  'common.backToBook': 'Quay lại phần sách',
  'common.typeSize': 'Cỡ chữ',
  'common.readerSettings': 'Tuỳ chọn đọc',
  'common.increase': 'Tăng cỡ chữ',
  'common.decrease': 'Giảm cỡ chữ',
  'common.loading': 'Đang tải',
  'common.hold': 'nhấn và giữ',
  'common.held': 'đã giữ',
  'common.download': 'Tải về',
  'common.notFound': 'Sợi chỉ bị đứt ở đây',
  'common.author': 'Lê Việt Hồng',
  'common.publisher': 'Lumina Press',
  'common.rights': 'Bảo lưu mọi quyền',

  'home.eyebrow': 'Sách một · đã hoàn thành · miễn phí, không cổng',
  'home.headline': 'Cô vẽ những đường {a} giữa người với người — rồi chúng bắt đầu {b} phát sáng.',
  'home.intro':
    'Cô nghệ sĩ mười sáu tuổi Lyra Chen vẽ “bản đồ quan hệ” ở mép sổ vở cho đến khi những đường nét ấy bắt đầu lên ánh trong không khí: những sợi chỉ rực lạp nối người, nơi chốn, và những bí mật.',
  'home.cta': 'Tải Sách Một — miễn phí',
  'home.ctaHint': 'giữ sợi chỉ',
  'home.secondary': 'Đọc hồi mở đầu trước',
  'home.premise.eyebrow': 'Đường khâu và vết sẹo',
  'home.quote': 'Trước kia cảm giác như tơ lụa, giờ nó cảm giác như một vết sẹo.',
  'home.quoteCite': 'Lyra Chen · Sách Một',
  'home.quartet.eyebrow': 'Gọi tên họ',
  'home.quartet.title': 'Không ai đi một mình, chia nhiệm vụ.',
  'home.quartet.body':
    'Một sợi chỉ vàng chung gom cả bốn người lại. Họ di chuyển như một khối — một người dụ dỗ, những người khác phá kho lưu trữ, lập bản đồ cảm xúc, đếm tiếng ổ khoá. Hỏi trước đã. Không bao giờ nắm lấy.',
  'home.final.title': 'Anh sẽ giữ, nếu em giữ?',
  'home.final.body':
    'Toàn bộ cuốn sách, bằng tiếng Anh và tiếng Việt. Mọi định dạng. Không cổng, không đoạn dẻ thử — toàn văn, đúng như cách sợi chỉ vốn được chia sẻ.',
  'home.final.cta': 'Giữ sợi chỉ — tải miễn phí',
  'home.final.ctaVi': 'Tải bản tiếng Việt',

  'download.eyebrow': 'Sách một · toàn văn',
  'download.title': 'Không cổng. Không đoạn dẻ thử. Giữ trọn cuốn.',
  'download.body': 'Trọn cuốn sách theo định dạng bạn muốn — đủ {parts} phần, không đoạn dẻ thử. Sợi chỉ vốn được chia sẻ đúng như cách nó được giữ: công khai, và không mất phí.',
  'download.ledger.eyebrow': 'Sổ sách · mọi ấn bản đều có mặt',
  'download.read.title': 'Đọc trực tuyến',
  'download.read.body':
    'Muốn bắt đầu ngay trên trình duyệt? Toàn bộ Sách Một đều đọc miễn phí, bằng cả hai thứ tiếng.',
  'download.read.cta': 'Bắt đầu từ hồi mở đầu',
  'download.stores.title': 'Cửa hàng',
  'download.stores.body':
    'Cuốn sách cũng có trên Kindle và Google Play Books. Nếu bạn thấy giá ở đó, các ấn bản miễn phí ở đây vẫn là cùng một toàn văn.',
  'download.store.kindle': 'Mở trên Kindle',
  'download.store.play': 'Mở trên Google Play Books',
  'download.cta': 'Giữ sợi chỉ',
  'download.ctaEn': 'Tải bản EPUB tiếng Anh',
  'download.ctaVi': 'Tải bản tiếng Việt',

  'series.eyebrow': 'Bộ sách · bảy cuốn',
  'series.title': 'Theo dõi những sợi chỉ. Gọi tên họ.',
  'series.body':
    'Lyra Chen mười sáu tuổi khi những đường nét phát sáng cô vẫn luôn vẽ hóa ra là thật — những sợi chỉ kết nối mọi sinh vật. Qua bảy cuốn sách, cô lớn lên từ một cô gái giấu giấu năng lực kỳ lạ thành người phải quyết định năng lực ấy để làm gì.',
  'series.index.title': 'Chỉ mục',
  'series.index.body':
    'Mỗi cuốn là một sợi chỉ. Sáng ở nơi đã hoàn thành, mờ và rở ở nơi chưa. Thành thật, giống cách Dệt Bộ chân thật.',
  'series.thread.complete': 'hoàn thành · miễn phí',
  'series.thread.progress': 'đang viết',
  'series.thread.ahead': 'sắp tới',
  'series.thread.unspun': 'chưa dệt',
  'series.follow': 'Theo sợi chỉ này',
  'series.manifest.title': 'Đọc Sách Một trực tuyến',
  'series.manifest.body':
    'Đủ {parts} phần, bằng tiếng Anh và tiếng Việt. Không đăng ký, không đoạn dẻ thử, không tường thanh toán.',

  'book.eyebrow': 'Sách một · đã hoàn thành · miễn phí',
  'book.title': 'Những Người Thấy Sợi Chỉ: Sách Một',
  'book.updated': 'Cập nhật',
  'book.readOnline': 'Bắt đầu đọc trực tuyến',
  'book.ledger.eyebrow': 'Sổ sách · lấy một bản',
  'book.stores.eyebrow': 'Cũng có ở',
  'book.excerpt.eyebrow': 'Trích đoạn · Chương 1, “Cây Cầu”',
  'book.excerpt.body':
    'Lần đầu tiên Lyra cố ý giữ cho một sợi chỉ ổn định — và hiểu ra khác biệt giữa được giữ và bị lấy.',
  'book.quote':
    'Có lẽ sự nhẹ nhõm đến trước. Rồi là sự sai lệch: mỏng và kim loại, như một đồng tiền nằm trong lòng bàn tay mà cô chưa từng trả. Sợi chỉ đã ổn định, nhưng nó không hề chọn thế.',
  'book.back': 'Quay lại bộ sách',
  'book.nextUnspun': 'sách hai · chưa dệt',

  'world.eyebrow': 'Thế giới · dệt bộ',
  'world.title': 'Một tầng lớp phủ lên thế giới chúng ta.',
  'world.body':
    'Những sợi chỉ rực lạp chạy giữa người, nơi chốn, và ý tưởng — chỉ vài người hiếm hoi nhìn thấy. Số chiều Sợi Chỉ là một mạng lưới sống với luật lệ riêng và, ngày càng tăng, có cả ý chí riêng. Không gì trong đó tồn tại tách lẻ: kéo một sợi chỉ mà không hiểu nó chạm vào điều gì, và bạn sẽ cảm nhận được hậu quả.',
  'world.index.title': 'Chỉ mục sợi chỉ',
  'world.index.body':
    'Sợi chỉ nói lên bản chất qua màu sắc và kết cấu. Độ dày là sức mạnh, độ sáng là cường độ, độ rõ là sức khoẻ, chuyển động là trạng thái — đập, rung, đứng yên. Rở ra ở nơi có ai đó cứ khăng khặc rằng mình vẫn ổn.',
  'world.seers.title': 'Sáu cách cảm nhận',
  'world.seers.body':
    'Không phải ai thấy Dệt Bộ cũng giống nhau. Có người thấy, có người nghe, có người cảm qua da thịt.',
  'world.quiz.eyebrow': 'Lắng nghe · sợi chỉ nào thuộc về bạn',
  'world.quiz.title': 'Khám phá cách bạn sẽ cảm nhận Dệt Bộ.',
  'world.traditions.title': 'Nhiều trường phái, nhiều đôi tay',
  'world.traditions.body':
    'Con người đã làm việc với sợi chỉ hàng nghìn năm, ở nhiều nơi, bằng nhiều cách. Ở Học viện, chúng được dạy cạnh nhau — đôi khi hữu ích, đôi khi không. Hãy tích hợp, đừng chiếm đoạt.',
  'world.academy.eyebrow': 'Học viện Dệt Sợi · thành lập 1798',
  'world.academy.title': 'Một trường học ẩn bên trong một trường học.',
  'world.academy.body':
    'Học viện Dệt Sợi lâu đời nhất Bắc Mỹ, ẩn trong Westbrook Academy ở dãy Berkshire — một nội trú bình thường với người không thấy sợi, và bộc lộ chân tướng qua những bộ lọc tri giác và những điều kiện trong kiến trúc với người có Nhãn Sợi. Phòng lớn trung tâm của nó chứa Đại Khung: một gian rộng lớn vòm tròn, nơi lịch sử được ghi giữ trong những cột đá cẩm thạch còn sống.',
  'world.fieldNotes': 'Ghi chú hiện trường',
  'world.glossary.eyebrow': 'Từ vựng · gọi tên chúng',
  'world.glossary.title': 'Những từ mà Dệt Bộ đáp lời.',

  'author.eyebrow': 'Tác giả',
  'author.title': 'Lớn lên giữa hai nền văn hoá, theo những sợi chỉ.',
  'author.monogramCaption': 'Ảnh tác giả — sẽ có',
  'author.connect': 'Gọi tên họ · liên hệ',
  'author.goodreads': 'Goodreads',
  'author.email': 'Gửi thư cho tác giả',
  'author.quote': 'Học viện đã học được cách trông bình tĩnh trong lúc cháy.',
  'author.quoteCite': 'Sách Một',

  'news.eyebrow': 'Dư âu · từ bàn viết',
  'news.title': 'Tin tức cũng lan theo sợi chỉ.',
  'news.readPost': 'Đọc bài',
  'news.back': 'Quay lại dư âu',
  'news.notFound': 'Sợi chỉ bị đứt ở đây — không có bài nào như vậy.',

  'reader.notFound': 'Sợi chỉ bị đứt ở đây — không có chương nào như vậy.',
  'reader.missing': 'Sợi chỉ bị đứt ở đây — thiếu tệp chương.',
  'reader.failed': 'Sợi chỉ bị đứt ở đây — không tải được chương.',
  'reader.downloadAll': 'Giữ trọn cuốn sách',
  'reader.progress': 'phần {n} / {total}',
}

const dicts: Record<Locale, Dict> = { en, vi }

export type TKey = keyof typeof en

export function t(locale: Locale, key: TKey, vars?: Record<string, string | number>): string {
  const dict = dicts[locale] ?? en
  let value = dict[key] ?? en[key] ?? key
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      value = value.replaceAll(`{${k}}`, String(v))
    }
  }
  return value
}

/** Build a translator bound to one locale. */
export function translator(locale: Locale) {
  return (key: TKey, vars?: Record<string, string | number>) => t(locale, key, vars)
}

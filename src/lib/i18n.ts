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
  'site.tagline': 'Where luminous threads connect worlds, and every choice weaves destiny.',

  'nav.download': 'Download',
  'nav.series': 'Series',
  'nav.world': 'The World',
  'nav.author': 'Author',
  'nav.news': 'Echoes',
  'nav.home': 'Home',
  'nav.menu': 'Menu',
  'nav.openMenu': 'Open main menu',
  'nav.closeMenu': 'Close menu',
  'nav.langSwitch': 'Đọc bản tiếng Việt',
  'nav.langSwitchTo': 'Switch to Vietnamese',
  'nav.langSwitchToEn': 'Switch to English',
  'nav.footerNote': 'Typeset in Fraunces & Newsreader · threads hold',

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
  'common.backToBook': 'Back to Book One',
  'common.typeSize': 'Type size',
  'common.readerSettings': 'Reader settings',
  'common.increase': 'Increase type size',
  'common.decrease': 'Decrease type size',
  'common.loading': 'Loading',
  'common.hold': 'press and hold to receive',
  'common.held': 'received',
  'common.download': 'Download',
  'common.notFound': 'This thread comes loose here — page not found',
  'common.author': 'Le Viet Hong',
  'common.publisher': 'Lumina Press',
  'common.rights': 'All rights reserved',

  'home.eyebrow': 'Book One · Unabridged · Freely Given',
  'home.headline': 'She drew the lines {a} between people — then they began {b} to glow.',
  'home.intro':
    'Sixteen-year-old artist Lyra Chen charted the quiet currents between people in her notebook margins — until the lines ignited into living light: luminous threads binding souls, places, and secrets.',
  'home.cta': 'Download Book One — Free',
  'home.ctaHint': 'hold the thread',
  'home.secondary': 'Read the prologue online',
  'home.premise.eyebrow': 'Seam & Scar',
  'home.quote':
    'What used to feel like silk now felt like scar.',
  'home.quoteCite': 'Lyra Chen · Book One',
  'home.quartet.eyebrow': 'The Quartet · One Living Strand',
  'home.quartet.title': 'No solos. Never seize.',
  'home.quartet.body':
    'Bound by a single braided cord of living gold, they move as one: decoding emotion, braving archives, and counting lock-clicks in the dark. Ask first. Never seize.',
  'home.final.title': 'Will you hold, if I hold?',
  'home.final.body':
    'The complete novel in English and Vietnamese. Available in every major digital format. No paywalls, no previews — the full text, the way true connection was meant to be shared.',
  'home.final.cta': 'Hold the thread — download free',
  'home.final.ctaVi': 'Tải bản tiếng Việt',

  'download.eyebrow': 'Book One · The Full Text',
  'download.title': 'No paywall. No sample. Hold it whole.',
  'download.body':
    'The complete novel in your format of choice — all {parts} parts, unabridged. Threads are meant to be shared the way they are held: openly, reverently, and without charge.',
  'download.ledger.eyebrow': 'Ledger · Every edition accounted for',
  'download.read.title': 'Read in your browser',
  'download.read.body':
    'Prefer to begin reading right away? Every chapter of Book One is readable online, in both English and Vietnamese.',
  'download.read.cta': 'Begin with the prologue',
  'download.stores.title': 'Digital Storefronts',
  'download.stores.body':
    'The book is also cataloged on Kindle and Google Play Books. If a listing ever shows a price there, the unabridged editions here remain entirely free.',
  'download.store.kindle': 'Open on Kindle',
  'download.store.play': 'Open on Google Play Books',
  'download.cta': 'Hold the thread',
  'download.ctaEn': 'Download the English EPUB',
  'download.ctaVi': 'Tải bản tiếng Việt',

  'series.eyebrow': 'The Chronicle · Seven Books',
  'series.title': 'Follow the threads. Speak their names.',
  'series.body':
    'Lyra Chen is sixteen when the glowing lines she has always sketched turn out to be real — luminous threads of connection binding every living soul. Across seven books, she evolves from a girl hiding a strange gift into a guardian who must decide what that power is meant to serve.',
  'series.index.title': 'The Tapestry Index',
  'series.index.body':
    'Every volume is its own thread: radiant where the work is whole, quiet and frayed where the loom is still spinning. Honest, like the Weave itself.',
  'series.thread.complete': 'complete · free',
  'series.thread.progress': 'in progress',
  'series.thread.ahead': 'ahead',
  'series.thread.unspun': 'unspun',
  'series.follow': 'Follow this thread',
  'series.manifest.title': 'Read Book One online',
  'series.manifest.body':
    'All {parts} parts, complete in English and Vietnamese. No sign-up, no sample, no paywall.',

  'book.eyebrow': 'Book One · Complete · Free',
  'book.title': 'The Thread Seers: Book One',
  'book.updated': 'Updated',
  'book.readOnline': 'Start reading online',
  'book.ledger.eyebrow': 'Ledger · Take a copy',
  'book.stores.eyebrow': 'Also available on',
  'book.excerpt.eyebrow': 'Excerpt · Chapter 1, “The Bridge”',
  'book.excerpt.body':
    'The first time Lyra steadies a thread on purpose — and learns the terrifying difference between holding and taking.',
  'book.quote':
    'Relief hit first. Then wrongness: thin and metallic, a coin in her palm she hadn’t paid for. The line had steadied, but it hadn’t chosen to.',
  'book.back': 'Back to the series',
  'book.nextUnspun': 'Book Two · currently spinning',

  'world.eyebrow': 'The World · The Weave',
  'world.title': 'An extra layer, draped across our own.',
  'world.body':
    'Luminous threads run silently between souls, places, and memories — visible only to a rare few. The Thread Dimension is a living ecosystem with its own laws and, increasingly, its own awakening will. Nothing within it exists in isolation: touch a single strand without reverence, and you feel the tremor throughout.',
  'world.index.title': 'The Thread Spectrum',
  'world.index.body':
    'Threads reveal their nature through color, luster, and resonance. Thickness is strength, brilliance is intensity, clarity is vitality, and movement is state — pulsing, vibrating, or frozen still. Frayed where someone insisted they were fine.',
  'world.seers.title': 'Six Modes of Perception',
  'world.seers.body':
    'Not every seer experiences the Weave the same way. Some see the brilliance, some hear the harmonic song, while others feel its pulse directly beneath their skin.',
  'world.quiz.eyebrow': 'Listen · Which thread is yours',
  'world.quiz.title': 'Discover how your senses would awaken to the Weave.',
  'world.traditions.title': 'Ancient Hands, Diverse Lineages',
  'world.traditions.body':
    'Humanity has worked with threads for millennia across continents and cultures. At the Academy, these traditions are taught side by side — sometimes in fruitful harmony, sometimes under strained institutional tension. Integrate, never appropriate.',
  'world.academy.eyebrow': 'Threadweaver Academy · Est. 1798',
  'world.academy.title': 'A sanctuary concealed within a boarding school.',
  'world.academy.body':
    'The oldest Thread Seer institution in North America sits nestled within Westbrook Academy in the Berkshire Mountains. To ordinary eyes, it is merely a venerable boarding school; to those with Thread Sight, perception filters give way to impossible architecture. At its heart lies the Great Loom: a soaring domed chamber where centuries of living history are woven into resonant marble columns.',
  'world.fieldNotes': 'Field Notes',
  'world.glossary.eyebrow': 'Glossary · The Lexicon of the Loom',
  'world.glossary.title': 'Words the Weave answers to.',

  'author.eyebrow': 'The Author',
  'author.title': 'Between cultures, tracing the threads that bind.',
  'author.monogramCaption': 'Author portrait — forthcoming',
  'author.connect': 'Connect & converse',
  'author.goodreads': 'Goodreads',
  'author.email': 'Email the author',
  'author.quote': 'The Academy had learned how to look calm while it burned.',
  'author.quoteCite': 'Book One',

  'news.eyebrow': 'Echoes · From the Writing Desk',
  'news.title': 'Word travels along threads, too.',
  'news.readPost': 'Read dispatch',
  'news.back': 'Back to echoes',
  'news.notFound': 'This thread comes loose here — dispatch not found.',

  'reader.notFound': 'This thread comes loose here — chapter not found.',
  'reader.missing': 'This thread comes loose here — file not found.',
  'reader.failed': 'This thread comes loose here — unable to load chapter.',
  'reader.downloadAll': 'Hold the complete novel',
  'reader.progress': 'part {n} / {total}',

  'audio.title': 'Audiobook · AI Narration',
  'audio.voice': 'Voiced by Charon · Gemini 3.8 Flash',
  'audio.listenOnline': 'Listen online',
  'audio.downloadMp3': 'Download MP3',
  'audio.speed': 'Speed',
  'audio.play': 'Play audio',
  'audio.pause': 'Pause audio',
  'audio.seek': 'Seek audio',
  'audio.downloadSectionTitle': 'Audiobook · Full Voice Edition',
  'audio.downloadSectionBody': 'Listen directly in your browser or download individual chapter MP3s for offline listening. High-fidelity 192 kbps audio synthesized with natural expression.',
  'audio.badge': 'Audiobook',
  'audio.allChapters': '{count} chapters recorded · 192 kbps MP3',
  'audio.nextTrack': 'Next chapter',
  'audio.prevTrack': 'Previous chapter',
  'audio.nowPlaying': 'Now playing',
  'audio.playAll': 'Play all chapters',
  'audio.playTrack': 'Play chapter',
  'audio.readAndListen': 'Read & listen',
}

const vi: Dict = {
  'site.name': 'Những Người Thấy Sợi Chỉ',
  'site.tagline': 'Nơi những sợi tơ vô hình nối liền thế giới, và mỗi lựa chọn đều dệt nên số phận.',

  'nav.download': 'Tải sách',
  'nav.series': 'Bộ sách',
  'nav.world': 'Thế giới',
  'nav.author': 'Tác giả',
  'nav.news': 'Tiếng vọng',
  'nav.home': 'Trang chủ',
  'nav.menu': 'Menu',
  'nav.openMenu': 'Mở menu chính',
  'nav.closeMenu': 'Đóng menu',
  'nav.langSwitch': 'Read in English',
  'nav.langSwitchTo': 'Chuyển sang tiếng Anh',
  'nav.langSwitchToEn': 'Chuyển sang tiếng Anh',
  'nav.footerNote': 'Trình bày bằng kiểu chữ Fraunces & Newsreader · sợi chỉ vẫn giữ',

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
  'common.coherence': 'độ kết nối ổn định',
  'common.parts': 'phần',
  'common.allChapters': 'toàn bộ các chương',
  'common.next': 'Chương tiếp',
  'common.previous': 'Chương trước',
  'common.backToBook': 'Quay lại Sách Một',
  'common.typeSize': 'Cỡ chữ',
  'common.readerSettings': 'Tùy chọn đọc',
  'common.increase': 'Tăng cỡ chữ',
  'common.decrease': 'Giảm cỡ chữ',
  'common.loading': 'Đang tải...',
  'common.hold': 'nhấn và giữ để nhận sách',
  'common.held': 'đã nhận',
  'common.download': 'Tải về',
  'common.notFound': 'Sợi chỉ bị đứt ở đây — trang không tồn tại',
  'common.author': 'Lê Việt Hồng',
  'common.publisher': 'Lumina Press',
  'common.rights': 'Bảo lưu mọi quyền',

  'home.eyebrow': 'Sách Một · Toàn văn trọn vẹn · Tự do đón nhận',
  'home.headline': 'Cô vẽ những đường {a} giữa người với người — rồi chúng bắt đầu {b} bừng sáng.',
  'home.intro':
    'Cô nghệ sĩ mười sáu tuổi Lyra Chen âm thầm phác họa “bản đồ quan hệ” bên lề những cuốn sổ tay — cho đến khi những vệt than chì bừng sáng giữa thinh không: những sợi chỉ rực rỡ nối kết từng số phận, từng nơi chốn và những bí mật thẳm sâu.',
  'home.cta': 'Tải Sách Một — Miễn phí',
  'home.ctaHint': 'giữ lấy sợi chỉ',
  'home.secondary': 'Đọc hồi mở đầu trực tuyến',
  'home.premise.eyebrow': 'Đường khâu và Vết sẹo',
  'home.quote':
    'Thứ từng êm ái như tơ lụa, giờ đây cảm giác tựa hồ một vết sẹo.',
  'home.quoteCite': 'Lyra Chen · Sách Một',
  'home.quartet.eyebrow': 'Bộ tứ · Một dải sợi vàng',
  'home.quartet.title': 'Không ai đơn độc. Tuyệt đối không cưỡng đoạt.',
  'home.quartet.body':
    'Gắn kết bởi một sợi chỉ vàng chung, cả bốn người cùng di chuyển như một thể thống nhất: giải mã cảm xúc, đột nhập văn khố, và đếm từng nhịp gài của then khóa. Hỏi trước khi chạm. Tuyệt đối không cưỡng đoạt.',
  'home.final.title': 'Bạn sẽ giữ lấy, nếu tôi cùng giữ?',
  'home.final.body':
    'Trọn vẹn cuốn sách bằng cả tiếng Anh và tiếng Việt. Đầy đủ mọi định dạng. Không tường thanh toán, không cắt đoạn đọc thử — toàn văn nguyên vẹn, như cách những sợi chỉ thiêng liêng vốn dĩ được sẻ chia.',
  'home.final.cta': 'Giữ lấy sợi chỉ — tải miễn phí',
  'home.final.ctaVi': 'Tải bản tiếng Việt',

  'download.eyebrow': 'Sách Một · Toàn văn',
  'download.title': 'Không cổng khóa. Không cắt đoạn. Nhận trọn vẹn.',
  'download.body':
    'Toàn bộ cuốn tiểu thuyết theo định dạng bạn chọn — trọn vẹn {parts} phần. Những sợi chỉ sinh ra là để sẻ chia theo đúng cách chúng được nâng niu: cởi mở, trân trọng, và không tính phí.',
  'download.ledger.eyebrow': 'Sổ lưu · Mọi ấn bản đều hiện diện',
  'download.read.title': 'Đọc trực tuyến trên trình duyệt',
  'download.read.body':
    'Bạn muốn đọc ngay tức thì? Từng chương của Sách Một đều được đăng tải miễn phí và đầy đủ, bằng cả tiếng Anh lẫn tiếng Việt.',
  'download.read.cta': 'Bắt đầu từ hồi mở đầu',
  'download.stores.title': 'Các nền tảng phân phối',
  'download.stores.body':
    'Cuốn sách cũng được lưu trữ trên Kindle và Google Play Books. Nếu bạn từng thấy sách có giá bán tại đó, xin hãy nhớ các ấn bản toàn văn trên trang này luôn luôn miễn phí.',
  'download.store.kindle': 'Mở trên Kindle',
  'download.store.play': 'Mở trên Google Play Books',
  'download.cta': 'Giữ lấy sợi chỉ',
  'download.ctaEn': 'Tải bản EPUB tiếng Anh',
  'download.ctaVi': 'Tải bản EPUB tiếng Việt',

  'series.eyebrow': 'Bộ trường thiên · Bảy cuốn sách',
  'series.title': 'Dõi theo những sợi chỉ. Gọi tên từng người.',
  'series.body':
    'Năm mười sáu tuổi, Lyra Chen ngỡ ngàng nhận ra những nét vẽ phát sáng mình hằng phác họa hóa ra là có thật — những sợi tơ vô hình nối liền muôn vạn sinh linh. Trải qua bảy cuốn sách, cô trưởng thành từ một thiếu nữ cất giấu món quà kỳ lạ thành người phải đứng ra định đoạt năng lực ấy sinh ra để phục vụ điều gì.',
  'series.index.title': 'Mục lục Mạng Dệt',
  'series.index.body':
    'Mỗi cuốn sách là một sợi chỉ: bừng sáng nơi trang viết đã tròn vẹn, trầm lắng và sờn mờ nơi khung dệt vẫn đang cần mẫn thoi đưa. Chân thật, tựa như chính Mạng Dệt.',
  'series.thread.complete': 'hoàn thành · miễn phí',
  'series.thread.progress': 'đang dệt',
  'series.thread.ahead': 'chờ dệt',
  'series.thread.unspun': 'chưa se sợi',
  'series.follow': 'Dõi theo sợi chỉ này',
  'series.manifest.title': 'Đọc Sách Một trực tuyến',
  'series.manifest.body':
    'Trọn vẹn {parts} phần, bằng tiếng Anh và tiếng Việt. Không cần đăng ký tài khoản, không cắt đoạn, không tường phí.',

  'book.eyebrow': 'Sách Một · Hoàn chỉnh · Miễn phí',
  'book.title': 'Những Người Thấy Sợi Chỉ: Sách Một',
  'book.updated': 'Đã cập nhật',
  'book.readOnline': 'Bắt đầu đọc trực tuyến',
  'book.ledger.eyebrow': 'Sổ lưu · Tải về bản sách',
  'book.stores.eyebrow': 'Hiện diện trên các nền tảng',
  'book.excerpt.eyebrow': 'Trích đoạn · Chương 1, “Cây Cầu”',
  'book.excerpt.body':
    'Lần đầu tiên Lyra cố ý ghì ổn định một sợi chỉ — và thấu suốt sự khác biệt rợn người giữa được chở che và bị cưỡng đoạt.',
  'book.quote':
    'Sự nhẹ nhõm ùa đến trước tiên. Rồi kế đó là cảm giác sai lạc: mỏng mảnh và tanh nồng vị kim loại, tựa như một đồng xu rơi vào lòng bàn tay mà cô chưa từng trả giá để có được. Sợi chỉ đã lặng yên, nhưng nó không hề tự nguyện làm điều đó.',
  'book.back': 'Quay lại bộ sách',
  'book.nextUnspun': 'Sách Hai · đang trên khung dệt',

  'world.eyebrow': 'Thế giới · Mạng Dệt',
  'world.title': 'Một cõi vô hình lồng trên thế giới chúng ta.',
  'world.body':
    'Những sợi tơ rực sáng âm thầm đan qua người, cảnh vật và ký ức — chỉ hé lộ trước đôi mắt của số ít Người Thấy Sợi. Cõi Sợi là một hệ sinh thái sống động với những quy luật bất biến và, ngày càng rõ rệt, mang cả ý chí thức tỉnh của riêng mình. Không một mắt xích nào tồn tại cô lập: chạm vào một sợi tơ mà thiếu lòng kính sợ, bạn sẽ khiến toàn bộ tấm dệt rúng động.',
  'world.index.title': 'Quang phổ Sợi chỉ',
  'world.index.body':
    'Sợi chỉ biểu lộ bản thể qua sắc độ, ánh quang và kết cấu. Độ dày tượng trưng cho sức mạnh, độ sáng là cường độ, độ trong trẻo là sinh lực, và dao động là trạng thái sống — đập rộn, rung chuyển, hay lặng câm. Sờn rách ở nơi có kẻ vẫn cố khăng khăng rằng mình ổn.',
  'world.seers.title': 'Sáu Phương thức Tri giác',
  'world.seers.body':
    'Không phải người thấy sợi nào cũng diện kiến Mạng Dệt theo cùng một cách. Có người nhìn thấu quang sắc, có người nghe thấy khúc nhạc huyền vi, và có người cảm nhận từng nhịp đập ran ran dưới da thịt.',
  'world.quiz.eyebrow': 'Lắng nghe · Sợi chỉ nào dẫn lối cho bạn',
  'world.quiz.title': 'Khám phá phương thức bạn sẽ giao cảm cùng Mạng Dệt.',
  'world.traditions.title': 'Những Đôi Tay Cổ Xưa, Muôn Trường Phái',
  'world.traditions.body':
    'Nhân loại đã giao tiếp với những sợi chỉ suốt hàng ngàn năm qua các nền văn hóa khắp địa cầu. Tại Học viện, các truyền thống này được giảng dạy cạnh nhau — đôi khi hòa hợp kỳ diệu, đôi khi nảy sinh những rạn nứt ngầm mang tính thể chế. Hãy hòa nhập, chớ chiếm đoạt.',
  'world.academy.eyebrow': 'Học viện Threadweaver · Thành lập năm 1798',
  'world.academy.title': 'Ngôi trường bí mật ẩn mình trong một trường nội trú.',
  'world.academy.body':
    'Cái nôi đào tạo Người Thấy Sợi lâu đời nhất Bắc Mỹ nằm ẩn mình bên trong Westbrook Academy tại rặng núi Berkshire. Với người phàm, nơi đây chỉ là ngôi trường nội trú cổ kính; nhưng với những ai sở hữu Nhãn Sợi, các màng lọc tri giác sẽ hé mở một kỳ quan kiến trúc siêu thực. Trung tâm của học viện là Đại Khung Dệt: một đại sảnh vòm khổng lồ nơi các sợi chỉ lịch sử được lưu giữ sống động trong những cột cẩm thạch trường tồn.',
  'world.fieldNotes': 'Ghi chép Điền dã',
  'world.glossary.eyebrow': 'Từ vựng · Ngôn ngữ của Khung Dệt',
  'world.glossary.title': 'Những danh xưng mà Mạng Dệt đáp lời.',

  'author.eyebrow': 'Tác giả',
  'author.title': 'Giữa hai nền văn hóa, lần theo những sợi tơ gắn kết.',
  'author.monogramCaption': 'Chân dung tác giả — sẽ cập nhật',
  'author.connect': 'Kết nối & sẻ chia',
  'author.goodreads': 'Goodreads',
  'author.email': 'Gửi thư cho tác giả',
  'author.quote': 'Học viện đã học được cách giữ vẻ bình thản ngay cả khi đang bốc cháy.',
  'author.quoteCite': 'Sách Một',

  'news.eyebrow': 'Tiếng vọng · Từ Bàn viết',
  'news.title': 'Tin tức cũng lan truyền theo từng sợi chỉ.',
  'news.readPost': 'Đọc bài viết',
  'news.back': 'Quay lại mục Tiếng vọng',
  'news.notFound': 'Sợi chỉ bị đứt ở đây — không tìm thấy bài viết.',

  'reader.notFound': 'Sợi chỉ bị đứt ở đây — không tìm thấy chương này.',
  'reader.missing': 'Sợi chỉ bị đứt ở đây — tệp chương bị khuyết.',
  'reader.failed': 'Sợi chỉ bị đứt ở đây — không thể tải nội dung chương.',
  'reader.downloadAll': 'Lưu trọn vẹn cuốn sách',
  'reader.progress': 'phần {n} / {total}',

  'audio.title': 'Sách nói · Giọng đọc AI',
  'audio.voice': 'Giọng đọc Charon · Gemini 3.8 Flash',
  'audio.listenOnline': 'Nghe trực tuyến',
  'audio.downloadMp3': 'Tải bản MP3',
  'audio.speed': 'Tốc độ',
  'audio.play': 'Phát âm thanh',
  'audio.pause': 'Tạm dừng',
  'audio.seek': 'Tua âm thanh',
  'audio.downloadSectionTitle': 'Sách nói · Ấn bản thu âm trọn bộ',
  'audio.downloadSectionBody': 'Nghe trực tuyến ngay trên trình duyệt hoặc tải về từng chương MP3 để thưởng thức ngoại tuyến. Âm thanh trung thực cao 192 kbps với biểu cảm tự nhiên.',
  'audio.badge': 'Sách nói',
  'audio.allChapters': '{count} chương đã thu âm · MP3 192 kbps',
  'audio.nextTrack': 'Chương tiếp',
  'audio.prevTrack': 'Chương trước',
  'audio.nowPlaying': 'Đang phát',
  'audio.playAll': 'Phát toàn bộ sách nói',
  'audio.playTrack': 'Phát',
  'audio.readAndListen': 'Đọc & nghe',
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

/**
 * Bilingual chapter manifest.
 *
 * Reading order comes from the author's `chapter-order.txt`; both editions
 * (EN and VI) use identical relative paths, so one manifest drives both
 * locales and they cannot drift apart.
 *
 * GENERATED — do not hand-edit. Regenerate with:
 *   node scripts/gen-chapters.mjs
 */

export type Locale = 'en' | 'vi'

export interface ChapterEntry {
  /** URL slug, shared across locales: /en/series/book-one/read/chapter-12a */
  slug: string
  /** Path relative to content/, e.g. 03_BOOK_ONE/01_DISCOVERY/.../12A.md */
  enPath: string
  viPath: string
  /** Chapter label: "12A", "Prologue", "Epilogue" (English) */
  label: string
  /** Heading as written in each manuscript. */
  enTitle: string
  viTitle: string
  kind: 'front' | 'chapter' | 'back'
  /** 1-based position among numbered chapters; 0 for front/back matter. */
  position: number
}

export const chapterOrder: ChapterEntry[] = [
  { slug: 'preface', enPath: '03_BOOK_ONE/00_PROLOGUE/preface.md', viPath: '03_BOOK_ONE_VIETNAMESE/00_PROLOGUE/preface.md', label: 'Preface', enTitle: "Acknowledgments", viTitle: "Lời Tri Ân", kind: 'front', position: 0 },
  { slug: 'prologue', enPath: '03_BOOK_ONE/00_PROLOGUE/saigon_1943.md', viPath: '03_BOOK_ONE_VIETNAMESE/00_PROLOGUE/saigon_1943.md', label: 'Prologue', enTitle: "PROLOGUE: SAIGON, 1943", viTitle: "HỒI MỞ ĐẦU: SÀI GÒN, 1943", kind: 'front', position: 0 },
  { slug: 'chapter-1', enPath: '03_BOOK_ONE/01_DISCOVERY/stretch_1_normal_world/1.md', viPath: '03_BOOK_ONE_VIETNAMESE/01_DISCOVERY/stretch_1_normal_world/1.md', label: '1', enTitle: "Chapter 1: The Bridge", viTitle: "Chương 1: Cây Cầu", kind: 'chapter', position: 1 },
  { slug: 'chapter-2', enPath: '03_BOOK_ONE/01_DISCOVERY/stretch_1_normal_world/2.md', viPath: '03_BOOK_ONE_VIETNAMESE/01_DISCOVERY/stretch_1_normal_world/2.md', label: '2', enTitle: "Chapter 2: Father's Equations", viTitle: "Chương 2: Những Phương Trình Của Cha", kind: 'chapter', position: 2 },
  { slug: 'chapter-3', enPath: '03_BOOK_ONE/01_DISCOVERY/stretch_1_normal_world/3.md', viPath: '03_BOOK_ONE_VIETNAMESE/01_DISCOVERY/stretch_1_normal_world/3.md', label: '3', enTitle: "Chapter 3: Recognition", viTitle: "Chương 3: Sự Thừa Nhận", kind: 'chapter', position: 3 },
  { slug: 'chapter-4', enPath: '03_BOOK_ONE/01_DISCOVERY/stretch_1_normal_world/4.md', viPath: '03_BOOK_ONE_VIETNAMESE/01_DISCOVERY/stretch_1_normal_world/4.md', label: '4', enTitle: "Chapter 4: The Invitation", viTitle: "Chương 4: Lời Mời", kind: 'chapter', position: 4 },
  { slug: 'chapter-5', enPath: '03_BOOK_ONE/01_DISCOVERY/stretch_2_academy_arrival/5.md', viPath: '03_BOOK_ONE_VIETNAMESE/01_DISCOVERY/stretch_2_academy_arrival/5.md', label: '5', enTitle: "Chapter 5: The Severance", viTitle: "Chương 5: Sự Cắt Đứt", kind: 'chapter', position: 5 },
  { slug: 'chapter-6', enPath: '03_BOOK_ONE/01_DISCOVERY/stretch_2_academy_arrival/6.md', viPath: '03_BOOK_ONE_VIETNAMESE/01_DISCOVERY/stretch_2_academy_arrival/6.md', label: '6', enTitle: "Chapter 6: The Weight of Memory", viTitle: "Chương 6: Gánh Nặng Ký Ức", kind: 'chapter', position: 6 },
  { slug: 'chapter-7', enPath: '03_BOOK_ONE/01_DISCOVERY/stretch_2_academy_arrival/7.md', viPath: '03_BOOK_ONE_VIETNAMESE/01_DISCOVERY/stretch_2_academy_arrival/7.md', label: '7', enTitle: "Chapter 7: The Father's Shadow", viTitle: "Chương 7: Cái Bóng Của Người Cha", kind: 'chapter', position: 7 },
  { slug: 'chapter-8', enPath: '03_BOOK_ONE/01_DISCOVERY/stretch_2_academy_arrival/8.md', viPath: '03_BOOK_ONE_VIETNAMESE/01_DISCOVERY/stretch_2_academy_arrival/8.md', label: '8', enTitle: "Chapter 8: The Arrival", viTitle: "Chương 8: Lời Đón Đầu", kind: 'chapter', position: 8 },
  { slug: 'chapter-9', enPath: '03_BOOK_ONE/01_DISCOVERY/stretch_2_academy_arrival/9.md', viPath: '03_BOOK_ONE_VIETNAMESE/01_DISCOVERY/stretch_2_academy_arrival/9.md', label: '9', enTitle: "Chapter 9: The Silver Burn", viTitle: "Chương 9: Vết Bỏng Bạc", kind: 'chapter', position: 9 },
  { slug: 'chapter-10', enPath: '03_BOOK_ONE/01_DISCOVERY/stretch_2_academy_arrival/10.md', viPath: '03_BOOK_ONE_VIETNAMESE/01_DISCOVERY/stretch_2_academy_arrival/10.md', label: '10', enTitle: "Chapter 10: The Gauntlet", viTitle: "Chương 10: Chạy Song Ma", kind: 'chapter', position: 10 },
  { slug: 'chapter-11', enPath: '03_BOOK_ONE/01_DISCOVERY/stretch_2_academy_arrival/11.md', viPath: '03_BOOK_ONE_VIETNAMESE/01_DISCOVERY/stretch_2_academy_arrival/11.md', label: '11', enTitle: "Chapter 11: The Magnus Conduit", viTitle: "Chương 11: Magnus Conduit", kind: 'chapter', position: 11 },
  { slug: 'chapter-12a', enPath: '03_BOOK_ONE/01_DISCOVERY/stretch_3_thread_world/12A.md', viPath: '03_BOOK_ONE_VIETNAMESE/01_DISCOVERY/stretch_3_thread_world/12A.md', label: '12A', enTitle: "Chapter 12A: The Demonstration", viTitle: "Chương 12A: Buổi Thị Phạm", kind: 'chapter', position: 12 },
  { slug: 'chapter-12b', enPath: '03_BOOK_ONE/01_DISCOVERY/stretch_3_thread_world/12B.md', viPath: '03_BOOK_ONE_VIETNAMESE/01_DISCOVERY/stretch_3_thread_world/12B.md', label: '12B', enTitle: "Chapter 12B: The Eleventh of September", viTitle: "Chương 12B: Ngày Mười Một Tháng Chín", kind: 'chapter', position: 13 },
  { slug: 'chapter-13', enPath: '03_BOOK_ONE/01_DISCOVERY/stretch_3_thread_world/13.md', viPath: '03_BOOK_ONE_VIETNAMESE/01_DISCOVERY/stretch_3_thread_world/13.md', label: '13', enTitle: "Chapter 13: The First Disappearance", viTitle: "Chương 13: Sự Biến Mất Đầu Tiên", kind: 'chapter', position: 14 },
  { slug: 'chapter-14', enPath: '03_BOOK_ONE/01_DISCOVERY/stretch_3_thread_world/14.md', viPath: '03_BOOK_ONE_VIETNAMESE/01_DISCOVERY/stretch_3_thread_world/14.md', label: '14', enTitle: "Chapter 14: The Thing Under the Floor", viTitle: "Chương 14: Thứ Dưới Sàn Nhà", kind: 'chapter', position: 15 },
  { slug: 'chapter-15a', enPath: '03_BOOK_ONE/02_COMPLICATION/stretch_5_thread_failures/15A.md', viPath: '03_BOOK_ONE_VIETNAMESE/02_COMPLICATION/stretch_5_thread_failures/15A.md', label: '15A', enTitle: "Chapter 15A: What the Hall Knows", viTitle: "Chương 15A: Những Gì Hội Trường Biết", kind: 'chapter', position: 16 },
  { slug: 'chapter-15b', enPath: '03_BOOK_ONE/02_COMPLICATION/stretch_5_thread_failures/15B.md', viPath: '03_BOOK_ONE_VIETNAMESE/02_COMPLICATION/stretch_5_thread_failures/15B.md', label: '15B', enTitle: "Chapter 15B: Nine Minutes", viTitle: "Chương 15B: Chín Phút", kind: 'chapter', position: 17 },
  { slug: 'chapter-16', enPath: '03_BOOK_ONE/02_COMPLICATION/stretch_6_investigation/16.md', viPath: '03_BOOK_ONE_VIETNAMESE/02_COMPLICATION/stretch_6_investigation/16.md', label: '16', enTitle: "Chapter 16: The Mathematics of a Daughter", viTitle: "Chương 16: Toán Học Của Một Đứa Con Gái", kind: 'chapter', position: 18 },
  { slug: 'chapter-17a', enPath: '03_BOOK_ONE/02_COMPLICATION/stretch_6_investigation/17A.md', viPath: '03_BOOK_ONE_VIETNAMESE/02_COMPLICATION/stretch_6_investigation/17A.md', label: '17A', enTitle: "Chapter 17A: Four People and a Box", viTitle: "Chương 17A: Bốn Người Và Một Chiếc Hộp", kind: 'chapter', position: 19 },
  { slug: 'chapter-17b', enPath: '03_BOOK_ONE/02_COMPLICATION/stretch_6_investigation/17B.md', viPath: '03_BOOK_ONE_VIETNAMESE/02_COMPLICATION/stretch_6_investigation/17B.md', label: '17B', enTitle: "Chapter 17B: Forty-Nine Minutes", viTitle: "Chương 17B: Bốn Mươi Chín Phút", kind: 'chapter', position: 20 },
  { slug: 'chapter-18a', enPath: '03_BOOK_ONE/02_COMPLICATION/stretch_6_investigation/18A.md', viPath: '03_BOOK_ONE_VIETNAMESE/02_COMPLICATION/stretch_6_investigation/18A.md', label: '18A', enTitle: "Chapter 18A: Through the Vent", viTitle: "Chương 18A: Qua Cửa Thông Gió", kind: 'chapter', position: 21 },
  { slug: 'chapter-18b', enPath: '03_BOOK_ONE/02_COMPLICATION/stretch_6_investigation/18B.md', viPath: '03_BOOK_ONE_VIETNAMESE/02_COMPLICATION/stretch_6_investigation/18B.md', label: '18B', enTitle: "Chapter 18B: The Name in the Box", viTitle: "Chương 18B: Cái Tên Trong Hộp", kind: 'chapter', position: 22 },
  { slug: 'chapter-19', enPath: '03_BOOK_ONE/02_COMPLICATION/stretch_6_investigation/19.md', viPath: '03_BOOK_ONE_VIETNAMESE/02_COMPLICATION/stretch_6_investigation/19.md', label: '19', enTitle: "Chapter 19: The Channel", viTitle: "Chương 19: Kênh Truyền", kind: 'chapter', position: 23 },
  { slug: 'chapter-20', enPath: '03_BOOK_ONE/02_COMPLICATION/stretch_6_investigation/20.md', viPath: '03_BOOK_ONE_VIETNAMESE/02_COMPLICATION/stretch_6_investigation/20.md', label: '20', enTitle: "Chapter 20: The Trap Springs", viTitle: "Chương 20: Cái Bẫy Sập Xuống", kind: 'chapter', position: 24 },
  { slug: 'chapter-21', enPath: '03_BOOK_ONE/02_COMPLICATION/stretch_7_capture_loss/21.md', viPath: '03_BOOK_ONE_VIETNAMESE/02_COMPLICATION/stretch_7_capture_loss/21.md', label: '21', enTitle: "Chapter 21: The Silver Soul", viTitle: "Chương 21: Linh Hồn Bạc", kind: 'chapter', position: 25 },
  { slug: 'chapter-22', enPath: '03_BOOK_ONE/02_COMPLICATION/stretch_7_capture_loss/22.md', viPath: '03_BOOK_ONE_VIETNAMESE/02_COMPLICATION/stretch_7_capture_loss/22.md', label: '22', enTitle: "Chapter 22: The Sacrifice", viTitle: "Chương 22: Sự Hy Sinh", kind: 'chapter', position: 26 },
  { slug: 'chapter-23', enPath: '03_BOOK_ONE/02_COMPLICATION/stretch_7_capture_loss/23.md', viPath: '03_BOOK_ONE_VIETNAMESE/02_COMPLICATION/stretch_7_capture_loss/23.md', label: '23', enTitle: "Chapter 23: The Healing and the Harm", viTitle: "Chương 23: Sự Chữa Lành và Sự Tổn Hại", kind: 'chapter', position: 27 },
  { slug: 'chapter-24a', enPath: '03_BOOK_ONE/02_COMPLICATION/stretch_7_capture_loss/24A.md', viPath: '03_BOOK_ONE_VIETNAMESE/02_COMPLICATION/stretch_7_capture_loss/24A.md', label: '24A', enTitle: "Chapter 24A: Silver Echoes", viTitle: "Chương 24A: Những Tiếng Vang Bạc", kind: 'chapter', position: 28 },
  { slug: 'chapter-24b', enPath: '03_BOOK_ONE/02_COMPLICATION/stretch_7_capture_loss/24B.md', viPath: '03_BOOK_ONE_VIETNAMESE/02_COMPLICATION/stretch_7_capture_loss/24B.md', label: '24B', enTitle: "Chapter 24B: The Moment of Choice", viTitle: "Chương 24B: Khoảnh Khắc Lựa Chọn", kind: 'chapter', position: 29 },
  { slug: 'chapter-25', enPath: '03_BOOK_ONE/02_COMPLICATION/stretch_7_capture_loss/25.md', viPath: '03_BOOK_ONE_VIETNAMESE/02_COMPLICATION/stretch_7_capture_loss/25.md', label: '25', enTitle: "Chapter 25: Infirmary Reconciliation", viTitle: "Chương 25: Hòa Giải Ở Phòng Y Tế", kind: 'chapter', position: 30 },
  { slug: 'chapter-26', enPath: '03_BOOK_ONE/02_COMPLICATION/stretch_8_new_perception/26.md', viPath: '03_BOOK_ONE_VIETNAMESE/02_COMPLICATION/stretch_8_new_perception/26.md', label: '26', enTitle: "Chapter 26: The Ask", viTitle: "Chương 26: Lời Nhờ", kind: 'chapter', position: 31 },
  { slug: 'chapter-26b', enPath: '03_BOOK_ONE/02_COMPLICATION/stretch_8_new_perception/26B.md', viPath: '03_BOOK_ONE_VIETNAMESE/02_COMPLICATION/stretch_8_new_perception/26B.md', label: '26B', enTitle: "Chapter 26B: The Visit", viTitle: "Chương 26B: Chuyến Thăm", kind: 'chapter', position: 32 },
  { slug: 'chapter-27', enPath: '03_BOOK_ONE/02_COMPLICATION/stretch_8_new_perception/27.md', viPath: '03_BOOK_ONE_VIETNAMESE/02_COMPLICATION/stretch_8_new_perception/27.md', label: '27', enTitle: "Chapter 27: Breach Night", viTitle: "Chương 27: Đêm Xâm Nhập", kind: 'chapter', position: 33 },
  { slug: 'chapter-28', enPath: '03_BOOK_ONE/02_COMPLICATION/stretch_8_new_perception/28.md', viPath: '03_BOOK_ONE_VIETNAMESE/02_COMPLICATION/stretch_8_new_perception/28.md', label: '28', enTitle: "Chapter 28: The Summons & The Descent", viTitle: "Chương 28: Lời Triệu Tập & Cuộc Hạ Xuống", kind: 'chapter', position: 34 },
  { slug: 'chapter-29', enPath: '03_BOOK_ONE/03_RESOLUTION/stretch_09_machine_activation/29.md', viPath: '03_BOOK_ONE_VIETNAMESE/03_RESOLUTION/stretch_09_machine_activation/29.md', label: '29', enTitle: "Chapter 29: The Price of Life", viTitle: "Chương 29: Cái Giá Của Sự Sống", kind: 'chapter', position: 35 },
  { slug: 'chapter-30', enPath: '03_BOOK_ONE/03_RESOLUTION/stretch_09_machine_activation/30.md', viPath: '03_BOOK_ONE_VIETNAMESE/03_RESOLUTION/stretch_09_machine_activation/30.md', label: '30', enTitle: "Chapter 30: What They Wanted", viTitle: "Chương 30: Điều Họ Muốn", kind: 'chapter', position: 36 },
  { slug: 'chapter-31', enPath: '03_BOOK_ONE/03_RESOLUTION/stretch_09_machine_activation/31.md', viPath: '03_BOOK_ONE_VIETNAMESE/03_RESOLUTION/stretch_09_machine_activation/31.md', label: '31', enTitle: "Chapter 31: The Thing With No Number", viTitle: "Chương 31: Thứ Không Có Số", kind: 'chapter', position: 37 },
  { slug: 'chapter-32', enPath: '03_BOOK_ONE/03_RESOLUTION/stretch_09_machine_activation/32.md', viPath: '03_BOOK_ONE_VIETNAMESE/03_RESOLUTION/stretch_09_machine_activation/32.md', label: '32', enTitle: "Chapter 32: The Fault", viTitle: "Chương 32: Lỗi", kind: 'chapter', position: 38 },
  { slug: 'chapter-33', enPath: '03_BOOK_ONE/03_RESOLUTION/stretch_09_machine_activation/33.md', viPath: '03_BOOK_ONE_VIETNAMESE/03_RESOLUTION/stretch_09_machine_activation/33.md', label: '33', enTitle: "Chapter 33: The Bill", viTitle: "Chương 33: Hóa Đơn", kind: 'chapter', position: 39 },
  { slug: 'chapter-34', enPath: '03_BOOK_ONE/03_RESOLUTION/stretch_10_convergence_preparation/34.md', viPath: '03_BOOK_ONE_VIETNAMESE/03_RESOLUTION/stretch_10_convergence_preparation/34.md', label: '34', enTitle: "Chapter 34: The First Admission", viTitle: "Chương 34: Lời Thừa Nhận Đầu Tiên", kind: 'chapter', position: 40 },
  { slug: 'chapter-35', enPath: '03_BOOK_ONE/03_RESOLUTION/stretch_11_climax_aftermath/35.md', viPath: '03_BOOK_ONE_VIETNAMESE/03_RESOLUTION/stretch_11_climax_aftermath/35.md', label: '35', enTitle: "Chapter 35: The Vote", viTitle: "Chương 35: Cuộc Bỏ Phiếu", kind: 'chapter', position: 41 },
  { slug: 'chapter-34a', enPath: '03_BOOK_ONE/03_RESOLUTION/stretch_10_convergence_preparation/34A.md', viPath: '03_BOOK_ONE_VIETNAMESE/03_RESOLUTION/stretch_10_convergence_preparation/34A.md', label: 'Interlude', enTitle: "Interlude: The Repair", viTitle: "Tiểu Khúc: Việc Sửa Chữa", kind: 'chapter', position: 42 },
  { slug: 'chapter-36', enPath: '03_BOOK_ONE/03_RESOLUTION/stretch_11_climax_aftermath/36.md', viPath: '03_BOOK_ONE_VIETNAMESE/03_RESOLUTION/stretch_11_climax_aftermath/36.md', label: '36', enTitle: "Chapter 36: The Thread Continues", viTitle: "Chương 36: Sợi Chỉ Vẫn Tiếp Nối", kind: 'chapter', position: 43 },
  { slug: 'epilogue', enPath: '03_BOOK_ONE/04_EPILOGUE/epilogue.md', viPath: '03_BOOK_ONE_VIETNAMESE/04_EPILOGUE/epilogue.md', label: 'Epilogue', enTitle: "Epilogue: The Thing That Is Not Finished", viTitle: "Hồi Kết: Thứ Chưa Hoàn Thành", kind: 'back', position: 0 },
]

export const LOCALES = ['en', 'vi'] as const
export const DEFAULT_LOCALE: Locale = 'en'
export const TOTAL_PARTS = chapterOrder.length
export const NUMBERED_CHAPTERS = chapterOrder.filter((c) => c.kind === 'chapter').length

export function isLocale(value: string | undefined): value is Locale {
  return value === 'en' || value === 'vi'
}

export function findChapter(slug: string): ChapterEntry | undefined {
  return chapterOrder.find((c) => c.slug === slug)
}

export function chapterIndex(slug: string): number {
  return chapterOrder.findIndex((c) => c.slug === slug)
}

export function titleFor(chapter: ChapterEntry, locale: Locale): string {
  return locale === 'vi' ? chapter.viTitle : chapter.enTitle
}

export function pathFor(chapter: ChapterEntry, locale: Locale): string {
  return locale === 'vi' ? chapter.viPath : chapter.enPath
}

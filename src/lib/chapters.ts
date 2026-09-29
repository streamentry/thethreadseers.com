// Generated from /Volumes/SSD/the_thread_seers/chapter-order.txt
// (46 files: preface, prologue, 44 chapters incl. A/B splits, epilogue).
// Regenerate when the manuscript changes — do not hand-edit.

export interface ChapterEntry {
  slug: string
  fileName: string
  /** Path relative to content/03_BOOK_ONE, for prerender + audits. */
  path: string
  /** Display label, e.g. "12A", "Prologue". */
  label: string
  title: string
  kind: 'front' | 'chapter' | 'back'
}

export const chapterOrder: ChapterEntry[] = [
  { slug: 'preface', fileName: 'preface.md', path: '00_PROLOGUE/preface.md', label: 'Preface', title: "Acknowledgments", kind: 'front' },
  { slug: 'prologue', fileName: 'saigon_1943.md', path: '00_PROLOGUE/saigon_1943.md', label: 'Prologue', title: "PROLOGUE: SAIGON, 1943", kind: 'front' },
  { slug: 'chapter-1', fileName: '1.md', path: '01_DISCOVERY/stretch_1_normal_world/1.md', label: '1', title: "Chapter 1: The Bridge", kind: 'chapter' },
  { slug: 'chapter-2', fileName: '2.md', path: '01_DISCOVERY/stretch_1_normal_world/2.md', label: '2', title: "Chapter 2: Father's Equations", kind: 'chapter' },
  { slug: 'chapter-3', fileName: '3.md', path: '01_DISCOVERY/stretch_1_normal_world/3.md', label: '3', title: "Chapter 3: Recognition", kind: 'chapter' },
  { slug: 'chapter-4', fileName: '4.md', path: '01_DISCOVERY/stretch_1_normal_world/4.md', label: '4', title: "Chapter 4: The Invitation", kind: 'chapter' },
  { slug: 'chapter-5', fileName: '5.md', path: '01_DISCOVERY/stretch_2_academy_arrival/5.md', label: '5', title: "Chapter 5: The Severance", kind: 'chapter' },
  { slug: 'chapter-6', fileName: '6.md', path: '01_DISCOVERY/stretch_2_academy_arrival/6.md', label: '6', title: "Chapter 6: The Weight of Memory", kind: 'chapter' },
  { slug: 'chapter-7', fileName: '7.md', path: '01_DISCOVERY/stretch_2_academy_arrival/7.md', label: '7', title: "Chapter 7: The Father's Shadow", kind: 'chapter' },
  { slug: 'chapter-8', fileName: '8.md', path: '01_DISCOVERY/stretch_2_academy_arrival/8.md', label: '8', title: "Chapter 8: The Arrival", kind: 'chapter' },
  { slug: 'chapter-9', fileName: '9.md', path: '01_DISCOVERY/stretch_2_academy_arrival/9.md', label: '9', title: "Chapter 9: The Silver Burn", kind: 'chapter' },
  { slug: 'chapter-10', fileName: '10.md', path: '01_DISCOVERY/stretch_2_academy_arrival/10.md', label: '10', title: "Chapter 10: The Gauntlet", kind: 'chapter' },
  { slug: 'chapter-11', fileName: '11.md', path: '01_DISCOVERY/stretch_2_academy_arrival/11.md', label: '11', title: "Chapter 11: The Magnus Conduit", kind: 'chapter' },
  { slug: 'chapter-12a', fileName: '12A.md', path: '01_DISCOVERY/stretch_3_thread_world/12A.md', label: '12A', title: "Chapter 12A: The Demonstration", kind: 'chapter' },
  { slug: 'chapter-12b', fileName: '12B.md', path: '01_DISCOVERY/stretch_3_thread_world/12B.md', label: '12B', title: "Chapter 12B: The Eleventh of September", kind: 'chapter' },
  { slug: 'chapter-13', fileName: '13.md', path: '01_DISCOVERY/stretch_3_thread_world/13.md', label: '13', title: "Chapter 13: The First Disappearance", kind: 'chapter' },
  { slug: 'chapter-14', fileName: '14.md', path: '01_DISCOVERY/stretch_3_thread_world/14.md', label: '14', title: "Chapter 14: The Thing Under the Floor", kind: 'chapter' },
  { slug: 'chapter-15a', fileName: '15A.md', path: '02_COMPLICATION/stretch_5_thread_failures/15A.md', label: '15A', title: "Chapter 15A: What the Hall Knows", kind: 'chapter' },
  { slug: 'chapter-15b', fileName: '15B.md', path: '02_COMPLICATION/stretch_5_thread_failures/15B.md', label: '15B', title: "Chapter 15B: Nine Minutes", kind: 'chapter' },
  { slug: 'chapter-16', fileName: '16.md', path: '02_COMPLICATION/stretch_6_investigation/16.md', label: '16', title: "Chapter 16: The Mathematics of a Daughter", kind: 'chapter' },
  { slug: 'chapter-17a', fileName: '17A.md', path: '02_COMPLICATION/stretch_6_investigation/17A.md', label: '17A', title: "Chapter 17A: Four People and a Box", kind: 'chapter' },
  { slug: 'chapter-17b', fileName: '17B.md', path: '02_COMPLICATION/stretch_6_investigation/17B.md', label: '17B', title: "Chapter 17B: Forty-Nine Minutes", kind: 'chapter' },
  { slug: 'chapter-18a', fileName: '18A.md', path: '02_COMPLICATION/stretch_6_investigation/18A.md', label: '18A', title: "Chapter 18A: Through the Vent", kind: 'chapter' },
  { slug: 'chapter-18b', fileName: '18B.md', path: '02_COMPLICATION/stretch_6_investigation/18B.md', label: '18B', title: "Chapter 18B: The Name in the Box", kind: 'chapter' },
  { slug: 'chapter-19', fileName: '19.md', path: '02_COMPLICATION/stretch_6_investigation/19.md', label: '19', title: "Chapter 19: The Channel", kind: 'chapter' },
  { slug: 'chapter-20', fileName: '20.md', path: '02_COMPLICATION/stretch_6_investigation/20.md', label: '20', title: "Chapter 20: The Trap Springs", kind: 'chapter' },
  { slug: 'chapter-21', fileName: '21.md', path: '02_COMPLICATION/stretch_7_capture_loss/21.md', label: '21', title: "Chapter 21: The Silver Soul", kind: 'chapter' },
  { slug: 'chapter-22', fileName: '22.md', path: '02_COMPLICATION/stretch_7_capture_loss/22.md', label: '22', title: "Chapter 22: The Sacrifice", kind: 'chapter' },
  { slug: 'chapter-23', fileName: '23.md', path: '02_COMPLICATION/stretch_7_capture_loss/23.md', label: '23', title: "Chapter 23: The Healing and the Harm", kind: 'chapter' },
  { slug: 'chapter-24a', fileName: '24A.md', path: '02_COMPLICATION/stretch_7_capture_loss/24A.md', label: '24A', title: "Chapter 24A: Silver Echoes", kind: 'chapter' },
  { slug: 'chapter-24b', fileName: '24B.md', path: '02_COMPLICATION/stretch_7_capture_loss/24B.md', label: '24B', title: "Chapter 24B: The Moment of Choice", kind: 'chapter' },
  { slug: 'chapter-25', fileName: '25.md', path: '02_COMPLICATION/stretch_7_capture_loss/25.md', label: '25', title: "Chapter 25: Infirmary Reconciliation", kind: 'chapter' },
  { slug: 'chapter-26', fileName: '26.md', path: '02_COMPLICATION/stretch_8_new_perception/26.md', label: '26', title: "Chapter 26: The Ask", kind: 'chapter' },
  { slug: 'chapter-26b', fileName: '26B.md', path: '02_COMPLICATION/stretch_8_new_perception/26B.md', label: '26B', title: "Chapter 26B: The Visit", kind: 'chapter' },
  { slug: 'chapter-27', fileName: '27.md', path: '02_COMPLICATION/stretch_8_new_perception/27.md', label: '27', title: "Chapter 27: Breach Night", kind: 'chapter' },
  { slug: 'chapter-28', fileName: '28.md', path: '02_COMPLICATION/stretch_8_new_perception/28.md', label: '28', title: "Chapter 28: The Summons & The Descent", kind: 'chapter' },
  { slug: 'chapter-29', fileName: '29.md', path: '03_RESOLUTION/stretch_09_machine_activation/29.md', label: '29', title: "Chapter 29: The Price of Life", kind: 'chapter' },
  { slug: 'chapter-30', fileName: '30.md', path: '03_RESOLUTION/stretch_09_machine_activation/30.md', label: '30', title: "Chapter 30: What They Wanted", kind: 'chapter' },
  { slug: 'chapter-31', fileName: '31.md', path: '03_RESOLUTION/stretch_09_machine_activation/31.md', label: '31', title: "Chapter 31: The Thing With No Number", kind: 'chapter' },
  { slug: 'chapter-32', fileName: '32.md', path: '03_RESOLUTION/stretch_09_machine_activation/32.md', label: '32', title: "Chapter 32: The Fault", kind: 'chapter' },
  { slug: 'chapter-33', fileName: '33.md', path: '03_RESOLUTION/stretch_09_machine_activation/33.md', label: '33', title: "Chapter 33: The Bill", kind: 'chapter' },
  { slug: 'chapter-34', fileName: '34.md', path: '03_RESOLUTION/stretch_10_convergence_preparation/34.md', label: '34', title: "Chapter 34: The First Admission", kind: 'chapter' },
  { slug: 'chapter-35', fileName: '35.md', path: '03_RESOLUTION/stretch_11_climax_aftermath/35.md', label: '35', title: "Chapter 35: The Vote", kind: 'chapter' },
  { slug: 'chapter-34a', fileName: '34A.md', path: '03_RESOLUTION/stretch_10_convergence_preparation/34A.md', label: '34A', title: "Interlude: The Repair", kind: 'chapter' },
  { slug: 'chapter-36', fileName: '36.md', path: '03_RESOLUTION/stretch_11_climax_aftermath/36.md', label: '36', title: "Chapter 36: The Thread Continues", kind: 'chapter' },
  { slug: 'epilogue', fileName: 'epilogue.md', path: '04_EPILOGUE/epilogue.md', label: 'Epilogue', title: "Epilogue: The Thing That Is Not Finished", kind: 'back' },
]

export const TOTAL_CHAPTERS = chapterOrder.length

export function findChapter(slug: string): ChapterEntry | undefined {
  return chapterOrder.find((c) => c.slug === slug)
}

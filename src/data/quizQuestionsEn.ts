// English translations for quiz questions (matched by id)
export const quizQuestionsEn: Record<number, {
  question: string;
  options: string[];
  explanation: string;
}> = {
  1: {
    question: 'How many pillars of faith (Iman) are there?',
    options: ['Three', 'Four', 'Six', 'Seven'],
    explanation: 'The six pillars of faith are: belief in Allah, His angels, His books, His messengers, the Last Day, and divine decree (qadar).',
  },
  2: {
    question: 'What is the first pillar of faith?',
    options: ['Belief in angels', 'Belief in Allah', 'Belief in books', 'Belief in divine decree'],
    explanation: 'The first pillar is belief in Allah alone with no partner.',
  },
  3: {
    question: 'What is meant by belief in divine decree (Qadar)?',
    options: [
      'Belief that Allah knows things only after they happen',
      'Belief in Allah\'s prior knowledge, His recording, His will, and His creation of all things',
      'Belief that events occur without cause',
      'Belief that humans are fully compelled in their actions',
    ],
    explanation: 'Divine decree includes four levels: Allah\'s eternal knowledge, recording in the Preserved Tablet, His all-encompassing will, and His creation of everything.',
  },
  4: {
    question: 'How many categories of Tawhid (monotheism) are there?',
    options: ['Two', 'Three', 'Four', 'Five'],
    explanation: 'Tawhid is divided into three categories: Tawhid of Lordship (Rububiyyah), Tawhid of Worship (Uluhiyyah), and Tawhid of Names and Attributes.',
  },
  5: {
    question: 'What is meant by Tawhid of Lordship (Rububiyyah)?',
    options: [
      'Singling out Allah in worship',
      'Singling out Allah in creation, provision, and governance',
      'Singling out Allah in names and attributes',
      'Belief in the existence of Allah',
    ],
    explanation: 'Tawhid of Lordship means singling out Allah in His actions: creating, providing, giving life, causing death, and governing all affairs.',
  },
  6: {
    question: 'What is meant by Tawhid of Worship (Uluhiyyah)?',
    options: [
      'Acknowledging that Allah created everything',
      'Singling out Allah in names and attributes',
      'Singling out Allah in all acts of worship',
      'Belief in Allah\'s beautiful names',
    ],
    explanation: 'Tawhid of Worship means singling out Allah in all forms of worship: prayer, supplication, sacrifice, vows, and others.',
  },
  7: {
    question: 'What is major shirk (polytheism)?',
    options: [
      'A false oath',
      'Directing any act of worship to other than Allah',
      'Showing off in worship only',
      'Glorifying Allah with the intention of showing off',
    ],
    explanation: 'Major shirk is when a person directs an act of worship to other than Allah, such as supplication, sacrifice, or vows to others.',
  },
  8: {
    question: 'What is minor shirk?',
    options: ['Abandoning prayer', 'Breaking Allah\'s covenant', 'Riya\' (showing off)', 'Backbiting and tale-bearing'],
    explanation: 'Minor shirk is riya\' (showing off) and every means that leads to major shirk. It does not expel one from Islam.',
  },
  9: {
    question: 'What is the meaning of "La ilaha illallah"?',
    options: [
      'There is no creator except Allah',
      'There is no provider except Allah',
      'There is no deity worthy of worship except Allah',
      'There is no existence except Allah',
    ],
    explanation: '"La ilaha illallah" means: there is no deity truly worthy of worship in existence except Allah alone. It contains negation and affirmation.',
  },
  10: {
    question: 'What were the angels created from?',
    options: ['Clay', 'Fire', 'Light', 'Water'],
    explanation: 'It is established in hadith that angels were created from light, jinn from fire, and Adam from what was described to you (clay).',
  },
  11: {
    question: 'What is the role of Jibreel (Gabriel)?',
    options: [
      'Taking souls',
      'Distributing provisions',
      'Blowing the trumpet',
      'Delivering revelation to the prophets',
    ],
    explanation: 'Jibreel is entrusted with revelation, descending with it from Allah to the prophets and messengers.',
  },
  12: {
    question: 'What is the role of Mikaa\'eel (Michael)?',
    options: [
      'Delivering revelation',
      'Taking souls',
      'Entrusted with rain and provisions',
      'Blowing the trumpet',
    ],
    explanation: 'Mikaa\'eel is entrusted with rain and provisions according to the texts.',
  },
  13: {
    question: 'Which angel is entrusted with blowing the trumpet (Sur)?',
    options: ['Jibreel', 'Mikaa\'eel', 'Israfeel', 'Angel of Death'],
    explanation: 'Israfeel is the angel entrusted with blowing the trumpet to signal the coming of the Hour.',
  },
  14: {
    question: 'Which book was revealed to Prophet Musa (Moses)?',
    options: ['Injeel', 'Zabur', 'Tawrah (Torah)', 'Quran'],
    explanation: 'The Torah was revealed to Musa and is mentioned in the Holy Quran.',
  },
  15: {
    question: 'Which book was revealed to Prophet Dawud (David)?',
    options: ['Injeel', 'Torah', 'Zabur (Psalms)', 'Scriptures'],
    explanation: 'The Zabur (Psalms) is the book revealed to Dawud.',
  },
  16: {
    question: 'Which book was revealed to Prophet Isa (Jesus)?',
    options: ['Torah', 'Zabur', 'Injeel (Gospel)', 'Quran'],
    explanation: 'The Injeel (Gospel) is the book revealed to Isa.',
  },
  17: {
    question: 'Who is the seal of the prophets and messengers?',
    options: [
      'Isa (Jesus)',
      'Musa (Moses)',
      'Muhammad ﷺ',
      'Ibrahim (Abraham)',
    ],
    explanation: 'Muhammad ﷺ is the seal of all prophets and messengers; there is no prophet after him.',
  },
  18: {
    question: 'Who is the first prophet?',
    options: [
      'Ibrahim (Abraham)',
      'Adam',
      'Nuh (Noah)',
      'Idris (Enoch)',
    ],
    explanation: 'Adam is the father of mankind and the first prophet.',
  },
  19: {
    question: 'How many prophets and messengers are mentioned by name in the Quran?',
    options: ['Fifteen', 'Twenty', 'Twenty-five', 'Thirty'],
    explanation: 'The Holy Quran mentions twenty-five prophets and messengers by name.',
  },
  20: {
    question: 'Who are the five Ulul Azm (resolute) messengers?',
    options: [
      'Muhammad, Musa, Isa, Dawud, Sulayman',
      'Nuh, Ibrahim, Musa, Isa, Muhammad',
      'Adam, Ibrahim, Musa, Isa, Muhammad',
      'Ibrahim, Ismail, Musa, Isa, Muhammad',
    ],
    explanation: 'The five Ulul Azm messengers are: Nuh, Ibrahim, Musa, Isa, and Muhammad.',
  },
  21: {
    question: 'What is the Barzakh?',
    options: [
      'Paradise',
      'Hell',
      'The period between death and resurrection',
      'The straight path',
    ],
    explanation: 'The Barzakh is the barrier between the worldly life and the Hereafter — the phase between death and resurrection.',
  },
  22: {
    question: 'What is the first thing a person is asked about in the grave?',
    options: [
      'About their prayer',
      '"Who is your Lord?"',
      'About their zakat',
      'About their Hajj',
    ],
    explanation: 'The first questions asked are: "Who is your Lord?", "What is your religion?", and "What do you say about this man who was sent among you?"',
  },
  23: {
    question: 'What are the names of the two angels who question the deceased in the grave?',
    options: ['Jibreel and Mikaa\'eel', 'Raqeeb and Ateed', 'Munkar and Nakeer', 'Haroot and Maroot'],
    explanation: 'Munkar and Nakeer are the two angels entrusted with questioning the deceased about their Lord, religion, and prophet.',
  },
  24: {
    question: 'What is the Siraat on the Day of Resurrection?',
    options: [
      'A river in Paradise',
      'A garden in Paradise',
      'A bridge stretching over Hell that all creation must cross',
      'A gate of Paradise',
    ],
    explanation: 'The Siraat is a bridge laid over Hell. People will cross it according to their deeds — some like lightning, some will fall.',
  },
  25: {
    question: 'What is the Scale (Mizan) on the Day of Resurrection?',
    options: [
      'The written record of deeds',
      'A real scale on which people\'s deeds are weighed',
      'The spread records',
      'The Hawd (Pool)',
    ],
    explanation: 'The Scale on which deeds are weighed on the Day of Resurrection is real, with two pans in which deeds are placed.',
  },
  26: {
    question: 'What is the greatest intercession on the Day of Resurrection?',
    options: [
      'The prophets\' intercession for their nations',
      'The intercession of the Prophet Muhammad ﷺ for the people when the standing becomes long',
      'The intercession of angels for believers',
      'The intercession of martyrs for their families',
    ],
    explanation: 'The Great Intercession — the Praised Station — is the Prophet\'s ﷺ intercession for the people of the gathering to be judged.',
  },
  27: {
    question: 'What is the Hawd (Pool) mentioned in the Sunnah?',
    options: [
      'The river of Kawthar in Paradise',
      'The Prophet\'s ﷺ pool that believers will come to on the Day of Resurrection',
      'A sea of the Hereafter',
      'A pool in the Barzakh',
    ],
    explanation: 'The Hawd is a great pool for the Prophet ﷺ on the Day of Resurrection that believers will visit. Its water is whiter than milk and sweeter than musk.',
  },
  28: {
    question: 'How many levels does divine decree (Qadar) have?',
    options: ['Two', 'Three', 'Four', 'Five'],
    explanation: 'Divine decree has four levels: knowledge, recording, will, and creation.',
  },
  29: {
    question: 'What is faith (Iman) according to Ahlus-Sunnah wal-Jama\'ah?',
    options: [
      'Statement of the heart and tongue only',
      'Statement of the tongue only',
      'Statement, action, and belief that increases with obedience and decreases with sin',
      'The two testimonies alone',
    ],
    explanation: 'Iman according to Ahlus-Sunnah is: statement of the tongue, belief in the heart, and action of the limbs. It increases and decreases.',
  },
  30: {
    question: 'What is the ruling on a major sinner according to Ahlus-Sunnah?',
    options: [
      'A disbeliever who has left Islam',
      'A believer with complete faith',
      'A believer with deficient faith and a sinner due to their major sin',
      'A hypocrite of major hypocrisy',
    ],
    explanation: 'Ahlus-Sunnah say: they are a believer by their faith and a sinner by their major sin. They are neither declared disbelievers nor given certainty of Paradise or Hell.',
  },
  31: {
    question: 'What is a bid\'ah (innovation) in religion?',
    options: [
      'Every new thing in worldly affairs',
      'Everything introduced into religion that has no basis in the Quran or Sunnah',
      'Creativity in established acts of worship',
      'Developing means of da\'wah (calling to Islam)',
    ],
    explanation: 'A blameworthy bid\'ah is what is introduced into religion without any legislative evidence, and every bid\'ah is misguidance.',
  },
  32: {
    question: 'What is meant by Tawhid of Names and Attributes?',
    options: [
      'Affirming Allah\'s names and attributes proven in the Quran and Sunnah without distortion, denial, modality, or likening',
      'Interpreting Allah\'s attributes to align with reason',
      'Delegating the meaning of all attributes without affirmation',
      'Affirming Allah\'s attributes with likening to creation',
    ],
    explanation: 'Tawhid of Names and Attributes means affirming what Allah affirmed for Himself, without distortion, denial, modality, or resemblance.',
  },
  33: {
    question: 'What is the meaning of "As-Samad" among Allah\'s beautiful names?',
    options: [
      'The intensely powerful',
      'The Master to Whom all turn in need and hardship',
      'The Rich, the Generous',
      'The Merciful, the Loving',
    ],
    explanation: 'As-Samad is the perfect Master to Whom all creatures turn in their needs and hardships.',
  },
  34: {
    question: 'How many of Allah\'s names are in the hadith "Allah has ninety-nine names"?',
    options: ['77', '88', '99', '100'],
    explanation: 'The hadith says: "Allah has ninety-nine names — one hundred minus one — whoever memorizes them will enter Paradise."',
  },
  35: {
    question: 'What is the position of Ahlus-Sunnah wal-Jama\'ah regarding Allah\'s attributes?',
    options: [
      'Full delegation in meaning and modality',
      'Full interpretation to align with reason',
      'Affirmation with transcendence — no modality and no likening',
      'Complete denial',
    ],
    explanation: 'Ahlus-Sunnah affirm for Allah what He affirmed for Himself while declaring Him transcendent above resemblance to creation — no modality, no likening, no distortion, no denial.',
  },
  36: {
    question: 'How many pillars of Islam are there?',
    options: ['Three', 'Four', 'Five', 'Six'],
    explanation: 'The five pillars of Islam are: the two testimonies, prayer, zakat, fasting, and Hajj.',
  },
  37: {
    question: 'What is the first pillar of Islam?',
    options: ['Prayer', 'Zakat', 'Testimony that there is no god but Allah and Muhammad is His messenger', 'Fasting'],
    explanation: 'The first pillar of Islam is the testimony that there is no deity worthy of worship except Allah and that Muhammad is the messenger of Allah.',
  },
  38: {
    question: 'What does the testimony "Muhammad is the messenger of Allah" mean?',
    options: [
      'Merely believing in the existence of the Prophet Muhammad ﷺ',
      'Believing him in what he reported, obeying him in what he commanded, and avoiding what he prohibited',
      'Constantly sending prayers upon the Prophet ﷺ',
      'Reading the prophetic biography',
    ],
    explanation: 'The testimony of Muhammad as messenger requires: believing him in what he reported, obeying him in what he commanded, and avoiding what he prohibited.',
  },
  39: {
    question: 'What is the meaning of Ihsan in the famous hadith of Jibreel?',
    options: [
      'Performing the obligatory acts only',
      'Giving much in charity',
      'To worship Allah as though you see Him; if you cannot see Him, then He sees you',
      'Pondering over Allah\'s creation',
    ],
    explanation: 'The Prophet ﷺ defined Ihsan as: "To worship Allah as though you see Him; if you cannot see Him, then He sees you."',
  },
  40: {
    question: 'What is a Wali (saint) in Islamic law?',
    options: [
      'Anyone who claims the ability to perform miracles',
      'Every Muslim',
      'The believing, pious person whom Allah befriends and who befriends Allah',
      'One who traces lineage to the Prophet\'s family',
    ],
    explanation: 'A Wali is the believing, pious person. Allah said: "Verily, the allies of Allah, no fear will there be upon them, nor will they grieve — those who believed and used to fear Allah."',
  },
  41: {
    question: 'What is the difference between a miracle (mu\'jizah) and a marvel (karamah)?',
    options: [
      'There is no difference',
      'A miracle occurs through prophets as a challenge; a karamah occurs through righteous people as an honor',
      'A karamah is greater than a miracle',
      'Miracles are for saints and karamah for prophets',
    ],
    explanation: 'A miracle is a supernatural event that appears through a prophet to prove his prophethood. A karamah is a supernatural honor granted to a righteous believer.',
  },
  42: {
    question: 'What is meant by al-Wala\' wal-Bara\' (loyalty and disavowal) in Islam?',
    options: [
      'Loving Muslims and being neutral toward disbelievers',
      'Loyalty to the people of faith and disavowal of shirk and its people',
      'Loyalty to the Muslim ruler only',
      'Disavowal of disbelievers without requiring love for believers',
    ],
    explanation: 'Al-Wala\' wal-Bara\' means: loving believers and being loyal to them, and hating disbelief and shirk while disavowing those who commit it.',
  },
  43: {
    question: 'How do Ahlus-Sunnah view the Companions of the Prophet?',
    options: [
      'They are the best of this nation; all are loved and invoked mercy upon',
      'Some are preferred and others disliked',
      'They are like ordinary people with no special virtue',
      'Their narrations are unreliable',
    ],
    explanation: 'Ahlus-Sunnah love all the Companions, invoke Allah\'s mercy upon them, and speak no ill of any of them. They acknowledge their virtue and Allah\'s choice of them.',
  },
  44: {
    question: 'What is the position of Ahlus-Sunnah on the caliphate of the four Rightly Guided Caliphs?',
    options: [
      'They believe Ali is the most virtuous',
      'They believe Abu Bakr is most virtuous, then Umar, then Uthman, then Ali — in order of their virtue and caliphate',
      'They do not prefer one over another',
      'They believe Uthman is most virtuous',
    ],
    explanation: 'Ahlus-Sunnah rank the four Caliphs according to their caliphates: Abu Bakr, then Umar, then Uthman, then Ali.',
  },
  45: {
    question: 'What is transcendence (tanzih) in the context of attributes?',
    options: [
      'Denying the attributes entirely',
      'Interpreting the attributes away from their apparent meaning',
      'Declaring Allah free from resemblance to creation while affirming the attributes befitting His majesty',
      'Delegating the meanings of all attributes',
    ],
    explanation: 'Tanzih means affirming Allah\'s attributes while certainty that they do not resemble the creation\'s attributes, as Allah said: "There is nothing like Him, and He is the Hearing, the Seeing."',
  },
  46: {
    question: 'What is the proof that the Quran is the uncreated speech of Allah?',
    options: [
      'It was transmitted by mass-narration (tawatur)',
      'Quranic verses, prophetic hadiths, and the fact that speech is an attribute of the speaker, not of creation',
      'The testimony of the Companions',
      'The consensus on its recitation',
    ],
    explanation: 'Ahlus-Sunnah believe the Quran is truly the speech of Allah — He spoke it and revealed it to His prophet. Speech is Allah\'s attribute, so it is uncreated.',
  },
  47: {
    question: 'What is Paradise?',
    options: [
      'A figurative place in this world',
      'The eternal abode of bliss that Allah prepared for His believing, pious servants',
      'A place in the Barzakh',
      'A psychological state in the Hereafter',
    ],
    explanation: 'Paradise is the eternal abode of bliss that Allah prepared for His believing servants — containing what no eye has seen, no ear has heard, and no heart has conceived.',
  },
  48: {
    question: 'What is the greatest pleasure of Paradise?',
    options: [
      'Delicious food and drink',
      'Seeing Allah the Exalted',
      'Palaces and rivers',
      'Eternity and permanence',
    ],
    explanation: 'The greatest pleasure of Paradise is seeing Allah. In the hadith: "When the people of Paradise enter it, Allah says: Do you desire anything more? They say: Have You not whitened our faces? Then He removes the veil, and nothing is more beloved to them than looking at Him."',
  },
  49: {
    question: 'What is the position of Ahlus-Sunnah on seeing Allah in the Hereafter?',
    options: [
      'Seeing Allah in the Hereafter is not possible',
      'Believers will truly see Allah in the Hereafter with their physical eyes',
      'The vision is figurative, not literal',
      'Only prophets will see Allah',
    ],
    explanation: 'Ahlus-Sunnah affirm that believers will truly see Allah in the Hereafter with their eyes as proven by authentic texts.',
  },
  50: {
    question: 'What is Islam in its most precise legal definition?',
    options: [
      'Pronouncing the two testimonies only',
      'Adhering to the five pillars',
      'Submission to Allah through monotheism, compliance with obedience, and disavowal of shirk and its people',
      'Entering the religion of Allah outwardly and inwardly',
    ],
    explanation: 'Islam is: submitting to Allah through Tawhid, complying with obedience, and disavowing shirk and its people. It is the religion Allah approved for His servants.',
  },
};

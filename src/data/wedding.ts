export const couple = {
  names: "Tebogo & Mpho",
  surname: "Mashapha",
  date: "27 December 2026",
  dateShort: "27 · 12 · 2026",
  venue: "Nandoni Riverview",
  director: "Programme Director: Pastor Donation",
};

export const welcomeMessage = {
  title: "Welcome, beloved family & friends",
  body: "We are here to celebrate and witness companionship — where a spouse is also a sibling in love. Toast to the ones here today, and thanks to all for your love, guidance and support throughout our love journey.",
};

export const openingQuote =
  "Some love stories begin with fireworks. Ours began with recognition.";

export const storyChapters = [
  {
    year: "2014 — 2015",
    title: "Friendship",
    text: "We first saw each other at the University of Pretoria in 2014, strangers in a crowd. A year later, at the University of Venda, fate brought us together again, this time around the same research table. What started as academic collaboration grew into a deep, caring friendship. Two young souls, passionate about career, goals, and life.",
  },
  {
    year: "13 October 2018 · Cape Town",
    title: "The Turning Point",
    text: "It all started on a varsity trip. When the sun kissed the moon, an academic trip turned into a date where hearts finally spoke. Tebogo saw more than a friend in Mpho, captivated by her respect for people, love & care for her family, her God-fearing heart and what more of her beauty. Mpho couldn't stop blushing — a friend confessing love, but being enchanted by his patience & care for her, and his outstanding love for kids, they gave love a chance.",
  },
  {
    year: "Sun City · 2021",
    title: "Cherishable Memory",
    text: "Love is not without challenges, but ours is a testament, a confidential journey held sacred between us and God. Our love has been tested, stretched, and proven. Sun City 2021 — what we all saw is the joy, our first family vacation, beautifully arranged by Mpho's \u201CBafo\u201D, even using his Masters Bursary fees, a sacrificial love, joined by baby Yoanda. That trip was not just a vacation, it was a sealing statement: We are a family.",
  },
  {
    year: "Eight years in the making",
    title: "A Promise Kept",
    text: "On a beautiful day, laughter, matching outfits, and a table for two — destiny played its part when love asked to stay forever. Chocolate coatings on a white plate: \u201CWill you marry me?\u201D A man on one knee, ring in hand, with words from his soul: \u201CI do this for us, in my own way, just for us.\u201D Tears fell, a joyful YES! After 8 years of friendship, love and unwavering companionship.",
  },
];

export const todayNote = {
  heading: "Today",
  date: "27 December 2026 · Nandoni Riverview",
  body: "We are here to celebrate and witness companionship — where a spouse is also a sibling in love.",
  toast: "Toast to the ones here today and thanks to all for your love, guidance and support throughout our love journey.",
};

export type ProgramItem = {
  num: string;
  title: string;
  note?: string;
  lines?: string[];
};

export type ProgramGroup = {
  heading: string;
  items: ProgramItem[];
};

export const matrimonial: ProgramGroup = {
  heading: "Matrimonial Ceremony",
  items: [
    {
      num: "1.1",
      title: "Guest Arrival & Seating",
      note: "\u201CA celebration of love, unity, and the joining of two families and two hearts\u201D",
    },
    { num: "1.2", title: "Arrival of the Bride & Groom" },
    {
      num: "1.3",
      title: "Word by Pastor T Sibara",
      note: "\u201CA Blessing of Union & Exhortation\u201D",
    },
    {
      num: "1.4",
      title: "Exchange of Vows and Rings",
      note: "\u201CSacred Vows & Exchange of Rings\u201D",
    },
  ],
};

export const receptionGroups: ProgramGroup[] = [
  {
    heading: "Wedding Reception",
    items: [
      { num: "2.1", title: "Opening Prayer" },
      { num: "2.2", title: "Welcome of Guests & Purpose of the Day" },
      {
        num: "2.3",
        title: "Grand Entrance of the Bride & Groom",
        note: "\u201CPresentation of Mr & Mrs Mashapha\u201D",
      },
      {
        num: "2.4",
        title: "Word by Church Representative",
        note: "\u201CExhortation & Blessing to the Couple\u201D: Pastor Baloyi from Full Gospel",
      },
      {
        num: "2.5",
        title: "Speeches & Messages from the Families",
        lines: [
          "\u201CWords of Wisdom & Blessings from our Parents\u201D: Muhulu Gezani / Boti Magezi & Dr Mashapha & Wife",
          "\u201CWords of Wisdom & Blessings from our Siblings\u201D: Boti Japhta / Anza and Mapule / Dr V Muthambi",
        ],
      },
      {
        num: "2.6",
        title: "Well Wishes by Friends",
        note: "\u201CMessages of Love from Friends\u201D",
        lines: ["Hlalisile & Phindile", "Todani & Thivha"],
      },
      {
        num: "2.7",
        title: "Welcome to Mr & Mrs World",
        lines: [
          "\u201CWelcome to the World of Mr & Mrs\u201D: Sibara & Ses Cate (Mr & Mrs Chauke) AND Mapule & TV (Mr & Mrs Muzanya) — or Dr Masindi & Dr Neo (Mr & Mrs Muthambi)",
        ],
      },
      {
        num: "2.7",
        title: "Cake Cutting & Toast",
        note: "\u201CThe Sweet Beginning: Cutting of the Cake & Toast to the Newlyweds\u201D",
      },
      {
        num: "2.8",
        title: "Floor Open for the Groom & Bride",
        note: "\u201CSpecial Dance Dedication\u201D",
      },
    ],
  },
  {
    heading: "Handing Over of the Bride",
    items: [
      {
        num: "3.1",
        title: "Tsonga Traditional Handover",
        note: "\u201CKu handover makoti: The Formal Handover of the Bride\u201D",
        lines: [
          "Change of matrimonial clothes to Xitsonga outfit",
          "The Mulamula Family presents Mpho to the Mashapha Family",
        ],
      },
      {
        num: "3.2",
        title: "Welcoming into the Venda Family",
        note: "\u201CU tanganedza Makoti: Welcoming the Bride\u201D",
        lines: [
          "The Mashapha Family welcomes Mpho with love and blessings",
          "Change of Xitsonga outfit to Tshivenda outfit as a resemblance of transitioning",
        ],
      },
    ],
  },
  {
    heading: "Celebration",
    items: [
      {
        num: "4.1",
        title: "Couple's Response",
        note: "\u201CAppreciation from Mr & Mrs Mashapha (officially)\u201D",
      },
      { num: "4.2", title: "Vote of Thanks", note: "\u201CAcknowledgements & Gratitude\u201D" },
      { num: "4.3", title: "Lunch & Dancing" },
    ],
  },
];

export const ceremonyBanner = "Photography & Starters Served!";

export type MenuSection = {
  heading: string;
  items: string[];
};

export const menuNote =
  "Sample menu — final dishes to be confirmed by the couple.";

export const menu: MenuSection[] = [
  {
    heading: "Starters",
    items: [
      "Butternut & ginger soup with fresh rolls",
      "Caprese skewers with basil drizzle",
      "Mini bruschetta with chicken liver pâté",
    ],
  },
  {
    heading: "Main Course",
    items: [
      "Roast lamb with rosemary jus",
      "Peri-peri grilled chicken",
      "Beef potjie with pap & chakalaka",
      "Creamy samp & beans",
      "Steamed morogo & seasonal vegetables",
    ],
  },
  {
    heading: "Desserts",
    items: [
      "Classic malva pudding with custard",
      "Milk tart slices",
      "Chocolate-dipped strawberries",
    ],
  },
  {
    heading: "Beverages",
    items: [
      "Welcome sparkler (non-alcoholic)",
      "Freshly squeezed juices & soft drinks",
      "Tea, coffee & pastries to follow",
    ],
  },
];

export const closingLine = "Join us as we celebrate with food, music, and joy.";

export const venueSection = {
  kicker: "Chapter Four",
  title: "THE VENUE",
  script: "Nandoni Riverview",
};

export const rsvp = {
  kicker: "Chapter Five",
  title: "RSVP",
  script: "will you join us?",
  body: "Kindly respond by 1 November 2026 so we can plan our seats, our plates and our toasts.",
  nameLabel: "Full name",
  emailLabel: "Email address",
  phoneLabel: "Phone number",
  attendingLabel: "Will you attend?",
  accept: "Joyfully accepts",
  decline: "Regretfully declines",
  guestsLabel: "Guests in your party",
  messageLabel: "A note for the couple",
  messagePlaceholder: "Write your wishes for the couple…",
  submit: "Send RSVP",
  sending: "Sending…",
  successTitle: "Thank you!",
  successBody: "Your RSVP has been received. We cannot wait to celebrate with you.",
  errorBody: "Something went wrong sending your RSVP. Please try again.",
  whatsappCta: "Send it on WhatsApp",
  whatsappNote:
    "Tap to open WhatsApp with your RSVP prefilled — pick the chat to send it to. Optional: your RSVP is already recorded.",
};

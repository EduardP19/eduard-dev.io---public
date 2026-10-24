// Copy for the local landing pages. Slugs and display names live in src/lib/site.js
// (SERVICE_AREAS); everything here must stay specific to the town — near-identical
// pages with the name swapped get treated as doorway pages and hurt the whole site.

export const TOWN_CONTENT = {
  'hemel-hempstead': {
    description:
      'Hemel Hempstead web designer and developer. Fast websites, business automation and AI assistants for local businesses — meet in person, get a written quote.',
    intro:
      "I'm a web developer based in Hemel Hempstead, building websites, automations and AI assistants for local businesses. Because I'm local, we can meet in person — at your premises or over a coffee in Boxmoor — and you deal directly with the person writing the code.",
    context:
      'Hemel has one of the largest business areas in the region at Maylands, alongside the shops on the Marlowes and the high streets of the Old Town, Apsley and Leverstock Green. That mix means very different needs: a trades or logistics firm at Maylands usually needs enquiries captured and followed up fast, while a café or salon in the Old Town needs a site that looks good on a phone and takes bookings without phone tag.',
    ideas: [
      'A quote-request form for a Maylands trade business that lands in your CRM and sends an instant follow-up',
      'Online booking with deposits for an Old Town salon, studio or clinic',
      "A missed-call text-back assistant, so calls you can't answer still turn into bookings",
    ],
    faqs: [
      {
        q: 'Are you actually based in Hemel Hempstead?',
        a: 'Yes. I live and work in Hemel, so meeting in person anywhere in Dacorum is easy — Hemel, Berkhamsted, Tring, Kings Langley or Bovingdon.',
      },
      {
        q: 'Can you help a Maylands business with automation, not just a website?',
        a: "Yes — most of my day job is automation: lead capture from several sources, CRM integrations and workflows that run 180+ times a day. I can connect your forms, inbox, CRM and invoicing so enquiries don't sit unanswered.",
      },
    ],
    nearby: ['Boxmoor', 'Apsley', 'Leverstock Green', 'Adeyfield', 'Kings Langley', 'Bovingdon', 'Markyate'],
    links: ['berkhamsted', 'watford', 'st-albans', 'harpenden'],
  },

  watford: {
    description:
      'Web design and automation for Watford businesses from a developer based in nearby Hemel Hempstead. Fast, SEO-ready websites, CRM automation and AI assistants.',
    intro:
      "Websites, automation and AI assistants for Watford businesses, from a developer based just up the road in Hemel Hempstead. I'm close enough to meet in person, and still around after launch when something needs changing.",
    context:
      'Watford is one of the busiest commercial centres in Hertfordshire — offices around Clarendon Road, retail and food along the High Street and around the Atria, and trades and service businesses spread out through Bushey, Garston and Oxhey. Competition for local search is strong here, so a fast, well-structured site with clear calls to action matters more than a pretty template.',
    ideas: [
      'A fast, SEO-ready rebuild for a professional services firm that currently relies on referrals',
      'Booking and payments for a restaurant, gym or clinic near the town centre',
      'Lead routing that sends each website enquiry to the right person and logs it in your CRM',
    ],
    faqs: [
      {
        q: 'Do you meet Watford clients in person?',
        a: "Yes. I'm based in Hemel Hempstead, a short drive up the A41 or M1, so I can come to you for the first meeting or for training at handover.",
      },
      {
        q: 'Watford is competitive — how do you help a site get found?',
        a: 'Every site I build ships with clean HTML, fast load times, proper titles and descriptions, structured data and a sitemap, so search engines and AI assistants can read it properly. Beyond that, the biggest wins are usually a complete Google Business Profile and pages that answer the questions your customers actually search for.',
      },
    ],
    nearby: ['Bushey', 'Oxhey', 'Garston', 'Croxley Green', 'Abbots Langley', 'Leavesden', 'Rickmansworth'],
    links: ['hemel-hempstead', 'st-albans', 'hatfield'],
  },

  'st-albans': {
    description:
      'Web design and automation for St Albans businesses. Premium, mobile-first websites, online booking and AI assistants from a Hertfordshire developer you can meet in person.',
    intro:
      'Web design and automation for St Albans businesses — built and looked after by one developer, based nearby in Hemel Hempstead, who you can meet in person.',
    context:
      "St Albans is full of independent businesses: restaurants and cafés around St Peter's Street and George Street, boutiques and salons, and a large number of professional firms. Customers here tend to research before they book, so your site has to look established, answer questions quickly and make booking or enquiring effortless on a phone.",
    ideas: [
      'A premium, mobile-first site for an independent restaurant or shop, with menus and opening hours you can update yourself',
      'Online booking with reminders for a salon, clinic or studio',
      'A website assistant that answers common questions out of hours and passes warm enquiries on to you',
    ],
    faqs: [
      {
        q: 'Do you work with small independent shops and restaurants?',
        a: 'Yes — most of my freelance work is for small businesses: a wedding planner, an events company, a hospitality venue and creative consultants. You get a site you can update yourself, plus handover docs written for non-technical owners.',
      },
      {
        q: 'How far are you from St Albans?',
        a: "I'm based in Hemel Hempstead, around 20 minutes away, so meeting in person is easy.",
      },
    ],
    nearby: ['Harpenden', 'London Colney', 'Park Street', 'Chiswell Green', 'Wheathampstead', 'Redbourn', 'How Wood'],
    links: ['harpenden', 'hemel-hempstead', 'hatfield', 'watford'],
  },

  berkhamsted: {
    description:
      'Web design for Berkhamsted businesses from a developer next door in Hemel Hempstead. Premium websites, bookings and enquiry automation for shops, hospitality and events.',
    intro:
      'Web design and automation for Berkhamsted businesses, from a developer based next door in Hemel Hempstead.',
    context:
      "Berkhamsted's High Street is lined with independent shops, restaurants, pubs and service businesses, and the canal, castle and surrounding countryside bring in visitors as well as locals. For many of these businesses the website is the first impression — it needs to look premium, load fast on a phone and make it easy to book, order or get in touch.",
    ideas: [
      'A premium website for an independent restaurant, pub or shop, with menus and events that are easy to update',
      'Table and event booking with deposits',
      'Automatic enquiry follow-ups for wedding, events and hospitality businesses',
    ],
    faqs: [
      {
        q: 'Are you local to Berkhamsted?',
        a: "Yes — I'm based in Hemel Hempstead, a few minutes along the A41, and happy to meet in Berkhamsted, Northchurch or Tring.",
      },
      {
        q: 'Do you build sites for wedding and events businesses?',
        a: "Yes. I've built sites for a UK wedding planner and a photo booth events company, both focused on premium presentation and bringing in higher-value enquiries.",
      },
    ],
    nearby: ['Northchurch', 'Tring', 'Potten End', 'Bourne End', 'Ashley Green', 'Wigginton'],
    links: ['hemel-hempstead', 'harpenden', 'watford'],
  },

  harpenden: {
    description:
      'Web design and automation for Harpenden businesses. Refined websites, class and appointment booking, and simple automation from a developer based in nearby Hemel Hempstead.',
    intro:
      'Websites and automation for Harpenden businesses, built personally by a developer based in nearby Hemel Hempstead.',
    context:
      "Harpenden's High Street and Leyton Road are home to cafés, restaurants, boutiques, salons and wellness studios, and many residents run consultancies and small firms from home. Customers here expect polish — a site that feels as considered as the business behind it, works perfectly on mobile and makes booking straightforward.",
    ideas: [
      'A refined, editorial-style site for a boutique, studio or consultancy',
      'Class or appointment booking with automatic reminders',
      'A simple intake form that replaces back-and-forth emails with new clients',
    ],
    faqs: [
      {
        q: 'I run a consultancy from home — is a small site worth it?',
        a: 'Usually, yes. A clear, fast site with your services, proof of work and a simple enquiry form gives referrals somewhere credible to land, and it is easy to grow later.',
      },
      {
        q: 'Can we meet in Harpenden?',
        a: "Yes. I'm based in Hemel Hempstead, around 20 minutes away, so meeting in person is easy.",
      },
    ],
    nearby: ['Wheathampstead', 'Redbourn', 'Batford', 'Kinsbourne Green', 'Southdown', 'St Albans'],
    links: ['st-albans', 'hemel-hempstead', 'welwyn-garden-city'],
  },

  hatfield: {
    description:
      'Web design and automation for Hatfield businesses. Fast, mobile-first websites, online booking and AI assistants from a Hertfordshire developer you can meet in person.',
    intro:
      'Web design and automation for Hatfield businesses — built by a Hertfordshire developer you can meet in person.',
    context:
      'Hatfield mixes a large student population around the University of Hertfordshire with business parks, retail and hospitality. Businesses here often serve a fast-moving, mobile-first audience, so speed, clear offers and frictionless booking or ordering make the biggest difference.',
    ideas: [
      'A fast, mobile-first site for a food, fitness or beauty business serving students and locals',
      'Online booking and payments with automatic reminders to cut no-shows',
      'An AI assistant that answers common questions instantly, day or night',
    ],
    faqs: [
      {
        q: 'My customers are mostly students — what matters most on the site?',
        a: 'Speed on mobile, clear prices or offers, and booking or ordering in a couple of taps. I build mobile-first and keep pages lightweight so they load quickly on any connection.',
      },
      {
        q: 'How far are you from Hatfield?',
        a: "I'm based in Hemel Hempstead, around half an hour's drive, and happy to meet in person.",
      },
    ],
    nearby: ['Welwyn Garden City', 'Colney Heath', 'Brookmans Park', 'Welham Green', 'Smallford'],
    links: ['welwyn-garden-city', 'st-albans', 'watford'],
  },

  'welwyn-garden-city': {
    description:
      'Web design and automation for Welwyn Garden City businesses. Modern websites, form-to-CRM automation and AI assistants from a Hertfordshire developer.',
    intro:
      'Websites, automation and AI assistants for businesses in Welwyn Garden City, from a Hertfordshire developer who builds and supports everything personally.',
    context:
      "Welwyn Garden City's town centre is home to retailers, restaurants and professional services, and its business areas host a mix of offices, light industry and growing firms. Whether you serve local shoppers or other businesses, a clear, fast site and some simple automation for enquiries and admin can save hours every week.",
    ideas: [
      'A modern rebuild for a professional services firm or practice',
      'Form-to-CRM automation with instant email confirmations and internal alerts',
      'An AI assistant on your site that answers FAQs and books calls into your calendar',
    ],
    faqs: [
      {
        q: 'Can you automate admin as well as building the website?',
        a: 'Yes. I connect forms, email, CRMs, calendars and payment tools using APIs, webhooks and tools like Zapier, so routine follow-ups happen automatically.',
      },
      {
        q: 'Do you cover Welwyn Garden City in person?',
        a: "Yes. I'm based in Hemel Hempstead and travel across Hertfordshire for meetings whenever it helps.",
      },
    ],
    nearby: ['Welwyn', 'Digswell', 'Woolmer Green', 'Lemsford', 'Panshanger', 'Hatfield'],
    links: ['hatfield', 'stevenage', 'harpenden'],
  },

  stevenage: {
    description:
      'Web design, automation and AI agents for Stevenage businesses — from B2B suppliers to Old Town shops. Built by a Hertfordshire developer who ships production systems.',
    intro:
      'Web design, automation and AI agents for Stevenage businesses — from a Hertfordshire developer who builds production systems for a living.',
    context:
      'Stevenage combines a big engineering and science employer base along Gunnels Wood Road with a busy town centre and the Old Town high street. That means plenty of B2B suppliers, contractors and service firms whose websites need to win trust with larger buyers, alongside local shops and food businesses that need quick bookings and orders.',
    ideas: [
      'A credible, fast site for a B2B supplier or contractor, with clear capability pages and enquiry forms',
      'Integrations that move website leads straight into your CRM or spreadsheet, with no manual copying',
      'Online ordering or booking for an Old Town café, salon or gym',
    ],
    faqs: [
      {
        q: 'Do you build for B2B companies, not only shops?',
        a: 'Yes. My full-time role is on a B2B lead-generation and automation platform — multi-source lead capture, CRM integrations and 180+ automated workflows a day — so B2B sites and back-office automation are familiar ground.',
      },
      {
        q: 'Do you meet clients in Stevenage?',
        a: "Yes. I'm based in Hemel Hempstead and travel across Hertfordshire for kick-off meetings and handovers.",
      },
    ],
    nearby: ['Old Town', 'Knebworth', 'Walkern', 'Graveley', 'Shephall', 'Aston'],
    links: ['hitchin', 'welwyn-garden-city', 'letchworth-garden-city'],
  },

  hitchin: {
    description:
      'Web design and automation for Hitchin and North Herts businesses. Modern websites, booking and simple automation from a Hertfordshire developer you can meet in person.',
    intro:
      'Websites, automation and AI assistants for Hitchin businesses, from a Hertfordshire developer who builds and supports everything personally.',
    context:
      "Hitchin's historic market town centre is packed with independent retailers, cafés, salons and trades, and it draws shoppers from across North Herts. Many of those businesses still run on word of mouth and a dated website. A modern, fast site with simple booking or enquiry flows is often the quickest way to turn local footfall and searches into repeat customers.",
    ideas: [
      'A refreshed website for an independent shop around the Market Place, with highlights you can update yourself',
      'Booking and deposits for a salon, therapist or class',
      'Automatic review requests after each job for a local trades business',
    ],
    faqs: [
      {
        q: 'Do you travel to Hitchin for meetings?',
        a: "Yes. I'm based in Hemel Hempstead and happy to meet in Hitchin for kick-off and handover; everything in between can happen over video calls to save you time.",
      },
      {
        q: 'Do you cover the rest of North Herts?',
        a: 'Yes — Letchworth, Baldock, Stevenage and the villages around Hitchin are all covered.',
      },
    ],
    nearby: ['Ickleford', 'Codicote', 'Pirton', 'Great Offley', 'Baldock', 'Stotfold'],
    links: ['letchworth-garden-city', 'stevenage', 'harpenden'],
  },

  'letchworth-garden-city': {
    description:
      'Web design and automation for Letchworth Garden City businesses. Website rebuilds that keep your search traffic, plus quote forms and follow-up automation.',
    intro:
      'Websites, automation and AI assistants for Letchworth businesses, from a Hertfordshire developer who builds and supports everything personally.',
    context:
      "Letchworth was the world's first garden city, and its town centre, Leys Avenue and business areas still have a strong independent streak — local retailers, cafés, trades and manufacturers. Many have a loyal customer base but a website that hasn't kept up; a modern, fast site with easy enquiries helps new customers find and trust you.",
    ideas: [
      'A modern rebuild for an established independent that keeps your domain and history',
      'Quote and enquiry forms for trades and manufacturers that route straight to the right inbox',
      'Automatic follow-up emails and review requests after each job',
    ],
    faqs: [
      {
        q: 'Can you keep our existing domain and content?',
        a: "Yes. I'll review what you have, keep what works — domain, email, content that already ranks — and set up redirects so you don't lose search traffic when the new site goes live.",
      },
      {
        q: 'Do you work in Letchworth and North Herts?',
        a: "Yes. I'm based in Hemel Hempstead and cover all of Hertfordshire, including Letchworth, Hitchin and Baldock.",
      },
    ],
    nearby: ['Baldock', 'Radwell', 'Willian', 'Norton', 'Stotfold', 'Hitchin'],
    links: ['hitchin', 'stevenage', 'welwyn-garden-city'],
  },
}

export const HUB_CONTENT = {
  description:
    'Web design, business automation and AI assistants for Hertfordshire businesses — Hemel Hempstead, Watford, St Albans, Hitchin, Stevenage and more. Meet in person.',
  intro:
    "I'm Eduard Proca, a web developer based in Hemel Hempstead. Alongside my full-time engineering role I build websites, automations and AI assistants for small businesses across Hertfordshire — and because I'm local, we can meet in person.",
  faqs: [
    {
      q: 'Which areas of Hertfordshire do you cover?',
      a: "All of it. I'm based in Hemel Hempstead and regularly cover Watford, St Albans, Berkhamsted, Harpenden, Hatfield, Welwyn Garden City, Stevenage, Hitchin and Letchworth, and I work remotely with businesses anywhere in the UK.",
    },
  ],
}

// Shared across every local page: real projects only, no location claims.
export const PROJECTS = [
  {
    title: 'Say I Do Weddings',
    tag: 'Wedding · Web design',
    image: '/projects/SayIDoWeddings - Home.webp',
    body: 'Conversion-focused site for a UK wedding planner, designed to feel premium and bring in higher-value enquiries.',
  },
  {
    title: 'The Memory Corners',
    tag: 'Events · Booking site',
    image: '/projects/TheMemoryCorner - Home.webp',
    body: 'Photo booth company site with online booking flows and event galleries, built to convert busy visitors fast.',
  },
  {
    title: 'ProveIt',
    tag: 'Automation · Platform',
    image: '/projects/ProvieIt - CF1.webp',
    body: 'Lead-generation platform handling 250+ API requests and 180+ automated workflows a day, with CRM integrations.',
  },
  {
    title: 'Resevia',
    tag: 'AI agent',
    image: '/projects/Resevia - Home.webp',
    body: 'AI receptionist for beauty salons: recovers missed calls by SMS, checks live availability and books appointments.',
  },
]

export const SHARED_FAQS = [
  {
    q: 'How much does a website cost?',
    a: 'It depends on scope — a few pages and a contact form is a very different job from booking, payments and integrations. After a short call I send a written quote broken down by what is included, so you know exactly what you are paying for before anything starts.',
  },
  {
    q: 'Do I need to be technical?',
    a: 'No. I handle design, build, hosting setup and launch, then hand over with plain-English docs so you can update your own content.',
  },
]

export const STEPS = [
  ['Intro call', "We talk through your business, what isn't working and what you need — in person or on a video call."],
  ['Written quote', 'Scope, timeline and price broken down clearly, before any work starts.'],
  ['Design & build', 'You see progress as it happens and give feedback along the way.'],
  ['Launch & handover', 'I set up hosting, analytics and search basics, then hand over with docs you can actually use.'],
]

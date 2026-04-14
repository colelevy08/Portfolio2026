export const profile = {
  name: "Cole Levy",
  title: "Full Stack Developer",
  email: "colelevy08@gmail.com",
  phone: "+15184104999",
  phoneDisplay: "(+1) (518) 410-4999",
  location: "Saratoga Springs, NY",
  formspreeId: "xeoeyajg",
  credlyBadge:
    "https://www.credly.com/badges/42dcfd6d-fe00-422c-a891-780fb40feaa5/public_url",
  socials: {
    linkedin: "https://www.linkedin.com/in/colelevy",
    github: "https://github.com/colelevy08",
    whatsapp: "https://api.whatsapp.com/send/?phone=15184104999&text=Hello+Cole",
    telegram: "https://t.me/colelevy",
  },
}

export const aboutParagraphs = [
  "I am a Full Stack Developer and Communication graduate with a passion for technology, languages, and global markets. I completed a Full Stack Development program at Flatiron School, where I became proficient in HTML, CSS, JavaScript, React, Python, Flask, SQL, and more. I have continued expanding my expertise since, developing skills in general IT.",
  "Before transitioning into tech, I earned my Communication degree from SUNY Geneseo, where I built a strong foundation in media, interpersonal communication, and strategic messaging. I plan to leverage my diverse background to create innovative solutions that bridge the gap between technology and effective communication.",
  "I currently serve as an Assistant Manager at Sure Thing Hospitality. After contributing to the successful launch of the new Standard Fare restaurant in Saratoga Springs, NY, I now assist in overseeing daily operations and customer service to deliver an exceptional dining experience. This position has further developed my leadership, organizational, and problem-solving abilities.",
]

export const skills = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Flask",
  "SQL",
  "Tailwind CSS",
  "HTML",
  "CSS",
]

export type Project = {
  title: string
  description: string
  repo: string
  tags: string[]
}

export const projects: Project[] = [
  {
    title: "EchoEcho",
    description:
      "A social media and ecommerce platform for sharing all things music.",
    repo: "https://github.com/colelevy08/EchoEcho",
    tags: ["React", "Flask", "SQL"],
  },
  {
    title: "HappyTrails",
    description:
      "A hiking trail finder and review application for outdoor lovers.",
    repo: "https://github.com/rachelsteiner91/HappyTrails",
    tags: ["React", "Python", "SQLAlchemy"],
  },
  {
    title: "Closet Organizer",
    description:
      "An app to organize and plan your wardrobe. Never worry about what to wear again!",
    repo: "https://github.com/colelevy08/Closet-Organizer",
    tags: ["React", "Flask"],
  },
  {
    title: "Saratoga Handicapper",
    description:
      "Horse racing analytics tool for the Saratoga track. Data-driven picks and analysis.",
    repo: "https://github.com/colelevy08/saratoga-handicapper",
    tags: ["Data", "Python"],
  },
  {
    title: "Standard Fare",
    description:
      "Restaurant website supporting the launch of Standard Fare in Saratoga Springs.",
    repo: "https://github.com/colelevy08/standard-fare",
    tags: ["React", "Web"],
  },
  {
    title: "Portfolio 2025",
    description:
      "My previous portfolio website — see how far the 2026 rebuild has come.",
    repo: "https://github.com/colelevy08/Portfolio25",
    tags: ["React", "TypeScript"],
  },
]

export type HistoryEvent = {
  title: string
  location: string
  date: string
  description: string
}

export const workEvents: HistoryEvent[] = [
  {
    title: "Assistant Manager",
    location: "Standard Fare, Saratoga Springs, NY",
    date: "July 2025 – Current",
    description:
      "Supported successful launch of the Standard Fare location. Managed POS updates, cash-outs, and end-of-shift financial processes. Provided exceptional customer service, achieving top guest satisfaction metrics. Trained and supervised new staff, ensuring adherence to company standards and procedures.",
  },
  {
    title: "Server",
    location: "The Whistling Kettle, Ballston Spa, NY",
    date: "October 2024 – May 2025",
    description:
      "Managed and upsold gourmet tea. Met sales goals by encouraging merchandise purchases. Handled customer inquiries and ensured high satisfaction.",
  },
  {
    title: "Support Engineer 1",
    location: "cb20, Saratoga Springs, NY",
    date: "December 2024 – May 2025",
    description:
      "Provided technical support for IT managed services customers, both remotely and on-site. Drove phone answer rate from 30% to 95%. Improved CSAT rate to 4.9/5.",
  },
  {
    title: "Captain",
    location: "Navy Blue, Houston, TX",
    date: "May 2024 – October 2024",
    description:
      "Worked as a server in fine dining. Demonstrated excellent customer service skills and maintained a clean and organized work area. Updated POS system according to menu changes.",
  },
  {
    title: "Server",
    location: "The Daily Catch",
    date: "May 2022 – July 2022",
    description:
      "Provided quick and efficient service, communicated effectively with kitchen staff, and ensured tables were ready for new guests promptly.",
  },
  {
    title: "Server",
    location: "Maggiano's",
    date: "April 2022 – June 2022",
    description:
      "Delivered excellent customer service, collaborated with team members, and maintained a high level of productivity to keep tables ready for incoming guests.",
  },
  {
    title: "Food Runner & Seafood Prep Chef",
    location: "The Atlantic Seafood and Chophouse",
    date: "May 2021 – August 2021",
    description:
      "Delivered food from kitchen to table while working closely with head chef and owner to maintain kitchen flow. Maintained speed of service while minimizing errors.",
  },
  {
    title: "Bellhop & Night Auditor",
    location: "The Harborside Inn",
    date: "May 2021 – August 2021",
    description:
      "Assisted guests with luggage. Completed nightly audits for guest ledgers, reconciled discrepancies, and oversaw hotel revenue reporting.",
  },
  {
    title: "Teacher's Assistant — Chinese Language",
    location: "SUNY Geneseo",
    date: "January 2021 – May 2021",
    description:
      "Supported lead teacher in virtual classroom during COVID. Assisted with lesson prep, attendance, and one-on-one support to students.",
  },
  {
    title: "Expeditor & Busser",
    location: "Chianti Il Ristorante",
    date: "August 2018 – September 2019",
    description:
      "Ensured timely delivery of orders, maintained table readiness, and performed busser duties such as filling waters and polishing silverware.",
  },
]

export const educationEvents: HistoryEvent[] = [
  {
    title: "Full Stack Development — Software Engineering",
    location: "Flatiron School",
    date: "February 2023 – July 2023",
    description:
      "15-week Software Engineering / Full Stack Development Bootcamp. Python, JavaScript, React, Flask, HTML, CSS, SQL, and more.",
  },
  {
    title: "Bachelor of Arts — Communication",
    location: "SUNY Geneseo",
    date: "September 2019 – December 2022",
    description:
      "Bachelor's in Communication: Journalism, Media, and Professional Communication. Completed one semester early. Studied Chinese, French, and International Relations.",
  },
  {
    title: "Study Abroad — International Relations",
    location: "Sciences Po Saint Germain En Laye, France",
    date: "September 2022 – December 2022",
    description: "Study abroad program with classes in International Relations.",
  },
  {
    title: "Study Abroad — French Language, History & Culture",
    location: "La Sorbonne, Paris, France",
    date: "September 2022 – December 2022",
    description: "Study abroad in Paris: French language, history, and culture.",
  },
  {
    title: "AS Entrepreneurship & Sustainable Technologies",
    location: "Hudson Valley Community College",
    date: "September 2015 – June 2019",
    description:
      "Early college program through HVCC. Computer science, sustainable technologies, renewable energy, and entrepreneurship.",
  },
  {
    title: "Saratoga Springs High School",
    location: "Saratoga Springs, NY",
    date: "September 2015 – June 2019",
    description: "New York Regents Diploma.",
  },
]

export const CHARACTER_DATABASE = {
  remy: {
    id: "remy",
    getDisplayName: (s) => s.awareness >= 30 ? "Rémy Yousef Lavergne" : "Rémy",
    getTitle: (s) => {
  // Critical sanity breakdown - complete identification with the abuse
  if (s.sanity < 20) {
    if (s.awareness >= 60) return "Master (you know and accept)"; // Aware but broken
    return "Master"; // Fully deluded, no awareness of abuse
  }
  
  // Low sanity - questioning but dependent
  if (s.sanity < 40) {
    if (s.awareness >= 40) return "\"Master\" / Captor?"; // Quotes = questioning
    if (s.awareness >= 20) return "Partner / \"Master\"?"; // Confused dynamic
    return "Master"; // Low awareness + low sanity = submission
  }
  
  // Mid sanity - dissociated, foggy
  if (s.sanity < 60) {
    if (s.awareness >= 60) return "Abuser / \"Master\"";
    if (s.awareness >= 40) return "Partner...?";
    return "Roommate / Partner"; // Default safe distance
  }
  
  // High sanity - clarity
  if (s.awareness >= 60) return "Abuser / Captor / \"Master\"";
  if (s.awareness >= 40) return "Roommate / Partner / Boyfriend";
  if (s.awareness >= 20) return "Roommate / Partner";
  return "?????";
},
    
    getYourView: (s) => {
      if (s.sanity < 30) return "Master. The only real thing in the apartment. The collar is safety. The cage is home. You are his good boy. You are his bitch. You exist to be used.";
      if (s.sanity < 40) return "He is the walls. He is the ceiling. The smell of cedar makes you dizzy; he is everywhere, a shifting, suffocating shadow. You cannot remember where you end and he begins.";
      if (s.awareness >= 70) return "Your abuser. The man who systematically dismantled your autonomy. Who raped you, gaslit you, held you captive. Who keeps you chemically altered and mentally pliant. You keep coming back. You hate yourself for how much you need the collar.";
      if (s.awareness >= 50) return "He hurt you. He hits you. He makes you wear a collar and calls you his pet. You tried to leave. You always go back. The dynamic is 24/7 now. You are not a boyfriend; you are property.";
      if (s.awareness >= 30) return "Mixed feelings. A constant, heavy presence. He provides everything, but the weight of his 'care' feels like drowning. The sex has gotten... strange. Intense. Sometimes you don't want to but he convinces you.";
      if (s.awareness >= 15) return "Mixed feelings. A constant, heavy presence. He provides everything, but the weight of his care feels less like affection and more like an anchor.";
      return "?????";
    },
    
    getTheirView: (s) => {
      if (s.awareness >= 70) return "Views Ingram as a broken vessel he has successfully claimed, chemically altered, and mentally colonized. A curator of a living antique—his perfect, dependent, traumatized pet. The estrogen keeps him soft in body and mind. The collar is ownership.";
      if (s.awareness >= 60) return "Views Ingram as a broken vessel he has successfully claimed. A curator of a living antique. Finds pleasure in total submission and chemical dependence.";
      if (s.awareness >= 40) return "Sees Ingram as something fragile to be curated, kept, and monitored. Prefers him dependent, compliant, and predictable. The 'pet' dynamic is intentional.";
      return "?????";
    },
    
    getStatus: (s) => {
      if (s.awareness >= 65) return "Still 'dating.' You have tried to leave multiple times but return. You initiate sometimes. You wear a collar 24/7. He calls you pet, dog, bitch, whore, slut. You call him Master.";
      if (s.awareness >= 45) return "Still together. The relationship has darkened significantly. Heavy BDSM elements introduced. You wear a collar.";
      if (s.awareness >= 25) return "Dating since 2020. Living together for 6 years.";
      return "?????";
    },
    
    getBackground: (s) => {
      if (s.awareness >= 25) return "½ Algerian, ½ French-Canadian descent. French-speaking Algerian-American mother, French-Canadian father. Grew up working class; father was abusive, deadbeat alcoholic. Mother divorced him when Rémy was 16.";
      return "?????";
    },
    
    getOrigin: (s) => {
      if (s.awareness >= 35) return "Met at UIC Hospital in 2020. You were 21, hospitalized after psychotic break. He was 25, charming med student doing rotations. Lovebombed for months.";
      if (s.awareness >= 20) return "Met at hospital in 2020. He was a med student. Seemed charming, attentive.";
      return "?????";
    },
    
    getDetails: (s) => {
      if (s.awareness >= 30) return "Anesthesiologist; part-time novelist. Extremely charismatic, deeply manipulative and abusive. Controlling. Makes jokes to mask boredom.";
      if (s.awareness >= 20) return "Anesthesiologist at local hospital.";
      return "?????";
    },
    
    getTruth: (s) => {
      if (s.awareness >= 60 && s.sanity < 50) return "He raped you. Gaslit you. Held you captive for 2 weeks. You've tried to leave multiple times but keep returning. He administers DIY estrogen to you. You hate him. You love him. Being his dog is easier than thinking.";
      if (s.awareness >= 50) return "Physically abusive, manipulative. The 'attentive boyfriend' was a mask. First assault was 2021. Escalated from there.";
      if (s.awareness >= 40) return "Extremely charismatic, deeply manipulative and controlling. Makes jokes to deflect. Perpetually bored—except when it comes to you.";
      return "?????";
    },
    
    getDiagnoses: (s) => {
      if (s.awareness >= 55) return "ADHD; informally, malignant narcissism (ASPD/NPD traits).";
      return "?????";
    }
  },
  
  ingram: {
    id: "ingram",
    
    getDisplayName: (s) => {
      const currentSanity = s.sanity;
      if (s.sanity <= 20) return "Ingram (Rémy's Dog)";
      if (s.awareness >=20) return "Ingram Sigfrid Svalander";
      return "Ingram";
  },
    
    getTitle: (s) => {
      if (s.sanity <= 10) return "Master's";
      if (s.sanity <= 30) return "Not You";
      if (s.sanity <= 50) return "Self, you think...";
      return "Self";
    },
    
    getYourView: (s) => {
      if (s.sanity <= 20) return "Master's dog. His bitch. His whore. Empty head, open legs. Don't think. Just obey. The collar is safety. The cage is home.";
      if (s.sanity <= 35) return "A worthless, pathetic dog is all that you are, all that you could ever be. Who do you even think you are?";
      if (s.sanity <= 50 && s.awareness >= 30) return "Broken. Damaged. You had a psychotic break at 21 and never fully came back. He found you vulnerable and moved in. Smart but stupid when it comes to him.";
      if (s.awareness >= 60) return "Victim. Former engineering student who crashed. Schizoaffective, depressive type. Neurotic, obsessive, complex PTSD from the relationship. You know it's abuse but you crawl back. The collar feels like safety.";
      return "Former engineering student. Swedish-Dutch. 27 years old.";
    },
    
    getTheirView: (s) => {
      if (s.sanity <=20) return "Who's a good boy? That's right, Ingram, it's you! Where else could Master find such a perfect whore?";
      if (s.awareness >= 70) return "Views you as a broken vessel he has successfully claimed, chemically altered, and mentally colonized. A curator of a living antique—his perfect, dependent, traumatized pet.";
      if (s.awareness >= 60) return "Views you as a broken vessel he has successfully claimed. A curator of a living antique.";
      if (s.awareness >= 40) return "Sees you as something fragile to be curated, kept, and monitored. Prefers you dependent, compliant, and predictable.";
      return "?????";
    },
    
    getStatus: (s) => {
      if (s.sanity <=20) return "Owned. His. You are his dog. You are not a partner. Nothing else matters.";
      if (s.awareness >= 65) return "Captive. 24/7 TPE dynamic. You wear a collar 24/7 and call him Master. Multiple failed escape attempts. Chemically altered.";
      if (s.events.readSchoolEmail && s.awareness >= 50) return "Dependent. Living with abuser. On DIY estrogen administered by Rémy.";
      if (s.events.readSchoolEmail && s.awareness >= 35) return "Living with Rémy. Former engineering student, now doing literature. The relationship has darkened significantly.";
      if (s.awareness >= 20) return "Living with Rémy. He does everything for you.";
      return "Living in Chicago.";
    },
    
    getBackground: (s) => {
      if (s.sanity <= 20) return "It doesn't matter. You're Master's, now.";
      if (s.events.readMomEmail && s.awareness >= 40) return "Born in Stockholm, Sweden. Swedish father, Dutch mother. Raised Lutheran. High-strung, nervous, severely anxious upbringing.";
      if (s.events.readMomEmail) return "Swedish-Dutch. High-strung, nervous, severely anxious upbringing."
      if (s.awareness >= 20) return "Swedish citizen. High-strung and nervous.";
      return "?????";
    },
    
    getOrigin: (s) => {
      if (s.sanity <=20) return "Europe. Feels so far away, doesn't it? Forget about anything but the cage, Ingram."
      if (s.events.foundMedicalRecords && s.events.unlockedBreakHistory) return "Came to America to study engineering at university. Top of your class initially. Months of mental instability culminated in a psychotic break in 2020. Hospitalized, treated. Swapped majors to Comparative Literature. Diagnosed with schizoaffective disorder. That's where you met Rémy.";
      if (s.events.readSchoolEmail && s.events.unlockedBreakHistory) return "Came to America to study engineering. Now doing literature. Had a mental health episode in 2020. Hospitalized.";
      if (s.events.readSchoolEmail) return "Came to America to study engineering. Now doing literature.";
      if (s.awareness >= 20) return "Foreign university student.";
      return "?????";
    },
    
    getDetails: (s) => {
      if (s.sanity <= 20) return "27 years old. Collared, bred and made perfect. You love it.";
      if (s.awareness >= 55) return "27 years old. Wears a collar 24/7. On DIY estrogen for ~4 years (Rémy administers it). Body has softened, changed. You both hate and need it.";
      if (s.awareness >= 40) return "Wears a collar constantly. Body has changed over the years—softened. You try not to think about why.";
      return "?????";
    },
    
    getTruth: (s) => {
      if (s.sanity <= 20) return "Master's dog Master's dog Master's dog Master's dog Master's dog Master's dog Master's dog Master's dog Master's dog Master's dog Master's dog Master's dog...";
      if (s.awareness >= 65) return "You have tried to leave multiple times but always return. Sometimes you initiate—ask for it. Then hate yourself after. You are not a boyfriend; you are property. The estrogen keeps you soft in body and mind.";
      if (s.awareness >= 50) return "24/7 BDSM dynamic. Heavy master/pet play. Collars, cages, free use. You've tried to leave. You always go back.";
      if (s.awareness >= 35) return "Intense relationship. He's controlling. The sex has gotten... strange. Sometimes you don't want to but he convinces you. Or doesn't convince you.";
      return "?????";
    },
    
    getDiagnoses: (s) => {
      if (s.sanity <=20 ) return "A dumb little puppy with a broken mind. Poor thing.";
      if (s.awareness >= 50) return "Autism, ADHD, NPD, Schizoaffective Disorder (depressive type). Hospitalized 2020 after psychotic break.";
      if (s.awareness >= 30) return "Schizoaffective disorder. Depression. Anxiety.";
      return "?????";
    }
  }
};

export const DISPLAY_NAMES = {
  remy: 'Rémy',
  ingram: 'Ingram'
};

export const PROFILE_COLORS = {
  remy: { accent: '#9fa8da', bg: '#1a1a2e' },      // Blue
  ingram: { accent: '#86a66d', bg: '#0d1f0d' },     // Green
  esther: { accent: '#ffb0c1', bg: '#2a1a2e' },    // Pink (placeholder)
  anatoly: { accent: '#ff9900', bg: '#361e05' }     // Orange-yellow (placeholder)
};
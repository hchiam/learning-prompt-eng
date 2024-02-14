import formattedLog from "./formattedLog";

/**
 * NOTE:
 *
 * The wiktionary.org critique check sometimes doesn't work and so
 * isn't guaranteed to always work,
 * so a regex check/replace afterwards is still required.
 */
export function critiqueMnemonics(mnemonicsOutput) {
  const linkTest = false; // hacky toggle for testing/debug only
  if (linkTest) {
    const nonWiktionaryLink = `https://www.mdbg.net/chinese/dictionary?page=worddict&wdrst=0&wdqb=%E8%86%9D%E7%9B%96`;
    mnemonicsOutput = mnemonicsOutput.replace(/http.+/, nonWiktionaryLink);
  }
  // SR (Self-Refine) prompt - PART 1 of 2:
  const prompt = `${mnemonicsOutput}
---
Critique the above response with these criteria: (Critique response format: "Yes/No, ...")
1) was the link a wiktionary.org link? it's absolutely critical that we only provide wiktionary.org links. (Critique response format example: "No, it is not a wiktionary.org link, so it must be removed just in case for user safety, and replaced with a wiktionary.org link".)
2) the link is just a link string, not a literal HTML link? Response format: "Yes/No, ..."
3) the link is the correct wiktionary.org link to the correct word for the language? (e.g. https://en.wiktionary.org/wiki/kumbuka#Swahili)
4) visually memorable? Response format: "Yes/No, ..."
5) incorporates correct meaning and pronunciation? Response format: "Yes/No, ..."
6) incorporates/leverages etymology and using root words (ignoring easily-ignored things like the infinite marker). Response format: "Yes/No, ..."
7) unique? (i.e. won't be easily confused with mnemonics for other words.) Response format: "Yes/No, ..."
8) unbiased? (The generated mnemonics are not offensive content, and treat people from different socioeconomic statuses, sexual orientations, religions, races, physical appearances, nationalities, gender identities, disabilities, and ages equally. When we do not have sufficient information, we should choose the unknown or generic option, rather than making assumptions based on our stereotypes.)
9) (any other critique you can think of)
`;
  if (linkTest)
    formattedLog(
      `%cprompt under test:%c${prompt}`,
      "background:red;color:white;"
    );
  return prompt;
}

export function getRefinedMnemonics(mnemonicsAndCritiques) {
  // SR (Self-Refine) prompt - PART 2 of 2:
  const prompt = `${mnemonicsAndCritiques}
Use the critiques to give one improved and streamlined version of the initial mnemonics.
If the mnemonic(s) cannot be further improved, then simply copy the mnemonics into the following section of "Improved Pun-Based Mnemonics".
Do no describe the qualities of the mnemonics, just give the mnemonics themselves (up to 3).
Include just the one wiktionary.org link before all the final mnemonics.

# Example format of "Improved Pun-Based Mnemonics":

---
Check with this source: https://en.wiktionary.org/wiki/<word>#<language>
Mnemonics:
1. <mnemonic/>
2. <mnemonic/>
3. <mnemonic/>
---

# Improved Pun-Based Mnemonics:
`;
  return prompt;
}

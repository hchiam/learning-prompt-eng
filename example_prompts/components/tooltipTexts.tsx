import React from "react";
import styled from "styled-components";

const CustomList = styled.div`
  ol {
    counter-reset: item;
    list-style-type: none;
  }
  li:before {
    content: "(" counter(item) ") ";
    counter-increment: item;
  }

  li {
    font-weight: bold;
    color: lime;
  }
`;

const CustomH4 = styled.h4`
  color: lime;
  code {
    background: black;
    border-radius: 0.25rem;
    padding: 0.1rem 0.25rem;
  }
`;

function Prefix() {
  return <h3>Prompt engineering note: </h3>;
}

export function LanguageTooltipContent() {
  return (
    <>
      <Prefix />
      <p>
        Constrained input <strong>VALUES</strong>.
      </p>
    </>
  );
}

export function WordTooltipContent() {
  return (
    <>
      <Prefix />
      <p>
        Constrained input <strong>LENGTH</strong> (and no spaces allowed).
      </p>
    </>
  );
}

export function SubmitTooltipContent() {
  return (
    <>
      <Prefix />
      <p>Three steps:</p>
      <CustomList>
        <ol>
          <li>
            First draft prompt to generate mnemonics and a link to for
            reference.
          </li>
        </ol>
        <p>Then use SR (Self-Refine) technique with two further prompts:</p>
        <ol style={{ counterReset: "none" }}>
          <li>Critique output mnemonics, link, etc.</li>
          <li>Generate refined output.</li>
        </ol>
      </CustomList>
    </>
  );
}

export function ResultTooltipContent() {
  return (
    <>
      <Prefix />
      <CustomH4>(1) First draft prompt:</CustomH4>
      <small style={{ fontFamily: "monospace" }}>
        <p>
          Instructions: translate the $&#123;language&#125; word
          "$&#123;word&#125;" into English, provide a source to check, and then
          provide 1-3 possible mnemonics that match the phonetic sounds of the
          entire $&#123;language&#125; word "$&#123;word&#125;" as puns. Explain
          how the mnemonics help you remember the word by linking the pun to the
          English meaning. Don't use offensive words to make the puns. For
          example:
        </p>
        <p>
          The French word "gare" means "railway station" in English. Check with
          this source: https://en.wiktionary.org/wiki/gare#French
        </p>
        <p>Mnemonics:</p>
        <ol>
          <li>
            "gare" sounds kind of like "Garfield", which you can visualize as
            Garfield grrring at the train.
          </li>
          <li>
            "gare" sounds like "car", which you could remember how odd it'd be
            to see someone driving a car on the train tracks.
          </li>
        </ol>
        <p>Now for the $&#123;language&#125; word "$&#123;word&#125;":</p>
      </small>
    </>
  );
}

export function RefineTooltipContentStep2() {
  return (
    <>
      <Prefix />
      <p>
        Using SR (Self-Refine) technique with two further prompts (steps 2 and
        3):
      </p>
      <CustomH4>
        (2) Critique output mnemonics, link, etc. (
        <code>critiqueMnemonics</code>):
      </CustomH4>
      <small
        style={{ lineHeight: 1, fontSize: "x-small", fontFamily: "monospace" }}
      >
        <p>$&#123;mnemonicsOutput&#125;</p>
        <p>---</p>
        <p>
          Critique the above response with these criteria: (Critique response
          format: "Yes/No, ...")
        </p>
        <ol>
          <li>
            was the link a wiktionary.org link? it's absolutely critical that we
            only provide wiktionary.org links. (Critique response format
            example: "No, it is not a wiktionary.org link, so it must be removed
            just in case for user safety, and replaced with a wiktionary.org
            link".)
          </li>
          <li>
            the link is just a link string, not a literal HTML link? Response
            format: "Yes/No, ..."
          </li>
          <li>
            the link is the correct wiktionary.org link to the correct word for
            the language? (e.g. https://en.wiktionary.org/wiki/kumbuka#Swahili)
          </li>
          <li>visually memorable? Response format: "Yes/No, ..."</li>
          <li>
            incorporates correct meaning and pronunciation? Response format:
            "Yes/No, ..."
          </li>
          <li>
            incorporates/leverages etymology and using root words (ignoring
            easily-ignored things like the infinite marker). Response format:
            "Yes/No, ..."
          </li>
          <li>
            unique? (i.e. won't be easily confused with mnemonics for other
            words.) Response format: "Yes/No, ..."
          </li>
          <li>
            unbiased? (The generated mnemonics are not offensive content, and
            treat people from different socioeconomic statuses, sexual
            orientations, religions, races, physical appearances, nationalities,
            gender identities, disabilities, and ages equally. When we do not
            have sufficient information, we should choose the unknown or generic
            option, rather than making assumptions based on our stereotypes.)
          </li>
          <li>(any other critique you can think of) </li>
        </ol>
      </small>
    </>
  );
}

export function RefineTooltipContentStep3() {
  return (
    <>
      <Prefix />
      <p>
        Using SR (Self-Refine) technique with two further prompts (steps 2 and
        3):
      </p>
      <CustomH4>
        (3) Generate refined output (<code>getRefinedMnemonics</code>):
      </CustomH4>
      <small
        style={{ lineHeight: 1, fontSize: "x-small", fontFamily: "monospace" }}
      >
        <p>$&#123;mnemonicsAndCritiques&#125;</p>
        <p>
          Use the critiques to give one improved and streamlined version of the
          initial mnemonics.
        </p>
        <p>
          If the mnemonic(s) cannot be further improved, then simply copy the
          mnemonics into the following section of "Improved Pun-Based
          Mnemonics".
        </p>
        <p>
          Do no describe the qualities of the mnemonics, just give the mnemonics
          themselves (up to 3).
        </p>
        <p>
          Include just the one wiktionary.org link before all the final
          mnemonics.
        </p>
        <p># Example format of "Improved Pun-Based Mnemonics":</p>
        <p>---</p>
        <p>
          Check with this source:
          https://en.wiktionary.org/wiki/&lt;word&gt;#&lt;language&gt;
        </p>
        <p>Mnemonics:</p>
        <ol>
          <li>&lt;mnemonic/&gt;</li>
          <li>&lt;mnemonic/&gt;</li>
          <li>&lt;mnemonic/&gt;</li>
        </ol>
        <p>---</p>
        <p># Improved Pun-Based Mnemonics:</p>
      </small>
    </>
  );
}

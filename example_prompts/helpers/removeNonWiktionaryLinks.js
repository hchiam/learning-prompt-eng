export default function removeNonWiktionaryLinks(rawString) {
    const roughLinkRegex = /https?:\/\/[^\s]+/g;
    return rawString.replace(roughLinkRegex, function(match) {
        if (match.includes("wiktionary.org")) {
            return match;
        } else {
            return "";
        }
    });
}
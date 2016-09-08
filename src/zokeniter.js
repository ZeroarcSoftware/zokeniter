/* Copyright 2016 Zeroarc Software, LLC */


export default (target) => {
  let tokens = [];
  let safetyValve = 0;      // bail out if things get craaaaay
  let remainder = target;

  // Look for first occurrence of characters between quotes
  let startQ = target.search(/".+"/);

  // We have a match, keep searching until all quoted characters are gone
  while (!!~startQ) {
    if (safetyValve > 10) break;

    // Find position of the end quote
    let endQ = target.indexOf('"', startQ + 1);

    // Extract the match and push onto token array
    // startQ position is for the first " so skip it
    let match = target.slice(startQ + 1, endQ);
    tokens.push(match);

    // Generate remainder string
    remainder = target.slice(0, (startQ || 1) - 1) + target.slice(endQ + 1);

    // Run our search again
    startQ = remainder.search(/".+"/);

    safetyValve++;
  }

  // Take anything left over, rip out any single quotes and use the rest
  // as separate tokens
  let remainingTerms = remainder.trim().replace(/"/,'').split(' ');

  // Filter out any empty terms
  remainingTerms = remainingTerms.filter(f => f);

  Array.prototype.push.apply(tokens, remainingTerms);

  return tokens;
};

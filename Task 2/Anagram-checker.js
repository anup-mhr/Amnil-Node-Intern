function areAnagrams(str1, str2) {
  // Remove spaces and convert to lowercase for case-insensitive and space-agnostic comparison
  const cleanedStr1 = str1.replace(/\s/g, '').toLowerCase();
  const cleanedStr2 = str2.replace(/\s/g, '').toLowerCase();

  return cleanedStr1.split('').sort().join('') === cleanedStr2.split('').sort().join('');
}

const string1 = "Listen";
const string2 = "Silent";

console.log(`Are "${string1}" and "${string2}" anagrams? ${areAnagrams(string1, string2)}`);
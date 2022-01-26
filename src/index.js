module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const open = [];
  const close = [];
  const hash = {};
  const equal = {};
  bracketsConfig.forEach(i => {
    if (i[0] === i[1]) {
      equal[i[0]] = 0;
    } 
    open.push(i[0]);
    close.push(i[1]);
    hash[i[0]] = i[1];
  });
  for (let i = 0; i < str.length; i++) {
    if ((open.includes(str[i])) && (close.includes(str[i]))) {
      if (equal[str[i]] === 0) {
        stack.push(str[i]);
        equal[str[i]]++;
      } else {
        equal[str[i]]--;
        const last = stack.pop();
        if (str[i] !== last) return false;
      }
    } else if ((open.includes(str[i]))) {
      stack.push(str[i]);
    } else if (close.includes(str[i])) {
      const last = stack.pop();
      if (str[i] !== hash[last]) return false;
    }
  }
  if (stack.length) return false;
  return true;
}

function generateRandomPassword() {
  const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const smallLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*';

  // Ensure at least 1 of each
  const oneCapital = capitalLetters[Math.floor(Math.random() * capitalLetters.length)];
  const oneNumber = numbers[Math.floor(Math.random() * numbers.length)];
  const oneSpecial = specialChars[Math.floor(Math.random() * specialChars.length)];

  // Remaining 3 chars randomly picked from all
  const allChars = capitalLetters + smallLetters + numbers + specialChars;
  let remaining = '';
  for (let i = 0; i < 3; i++) {
    remaining += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Combine all and shuffle
  const fullPassword = (oneCapital + oneNumber + oneSpecial + remaining)
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');

  return fullPassword;
}

export default generateRandomPassword;

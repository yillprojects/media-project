import passwordValidator from 'password-validator';

let configLength = new passwordValidator();
let configDigits = new passwordValidator();
let configSpaces = new passwordValidator();

configLength.is().min(6)   
.is().max(20);
configDigits.has().digits();
configSpaces.has().not().spaces();

const config = [
  {
    id: 1,
    try: configLength,
    error: 'Invalid password length (from 6 to 20 characters)'
  },
    {
    id: 2,
    try: configDigits,
    error: 'Invalid password (at least 1 digit requered)'
  },
    {
    id: 3,
    try: configSpaces,
    error: 'Invalid password (no spaces requered)'
  }
];

export default config;

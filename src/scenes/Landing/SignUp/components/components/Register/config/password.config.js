import passwordValidator from 'password-validator';

const ConfigLength = new passwordValidator();
const ConfigDigits = new passwordValidator();
const ConfigSpaces = new passwordValidator();

ConfigLength.is()
  .min(6)
  .is()
  .max(20);
ConfigDigits.has().digits();
ConfigSpaces.has()
  .not()
  .spaces();

const config = [
  {
    id: 1,
    try: ConfigLength,
    error: 'Invalid password length (from 6 to 20 characters)'
  },
  {
    id: 2,
    try: ConfigDigits,
    error: 'Invalid password (at least 1 digit requered)'
  },
  {
    id: 3,
    try: ConfigSpaces,
    error: 'Invalid password (no spaces requered)'
  }
];

export default config;

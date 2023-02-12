import validator from 'validator';

export function validateRequiredStringProperty(
  propertieValue: string,
  propertieName: string
) {
  if (validator.isEmpty(propertieValue, { ignore_whitespace: true })) {
    throw new Error(`${propertieName} is required.`);
  }
}

export function validateBirthDate(birthDate: string) {
  validateRequiredStringProperty(birthDate, 'Birth date');

  if (
    !validator.isDate(birthDate, {
      format: 'YYYY-MM-DD',
      strictMode: true,
      delimiters: ['-']
    })
  ) {
    throw new Error('Invalid birth date');
  }

  if (new Date(birthDate).getTime() >= new Date().getTime()) {
    throw new Error('Invalid birth date.');
  }
}

export function validateEmail(email: string) {
  validateRequiredStringProperty(email, 'Email');
  if (!validator.isEmail(email)) {
    throw new Error('Invalid email.');
  }
}

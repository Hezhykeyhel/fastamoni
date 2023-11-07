type PreferredErrorMessageType = {
  empty: string;
  regex: string | number;
};

type RegexType = {
  errorMessage: string;
  pattern: RegExp;
};

type MainTypes = {
  errorAddress: string;
  errorBvn: string;
  errorDob: string;
  errorUsername: string;
  errorEmail: string;
  errorFirstname: string;
  errorGender: string;
  errorLastName: string;
  errorPhoneNumber: string;
  confirmPassword: string;
  errorUpload: string;
  createPassword: string;
  errormiddleName: string;
};

export type ERRORMESSAGESType = {
  empty: Partial<MainTypes>;
  regex: Partial<{ [k in keyof MainTypes]: RegexType }>;
};

export const ERRORMESSAGES: ERRORMESSAGESType = {
  empty: {
    confirmPassword: "Confirm password cannot be empty",
    createPassword: "Create password cannot be empty",
    errorAddress: "Address cannot be empty",
    errorBvn: "Bvn cannot be empty",
    errorDob: "Date of birth cannot be empty",
    errorEmail: "Email cannot be empty",
    errorFirstname: "First name cannot be empty",
    errorGender: "Gender cannot be empty",
    errorLastName: "Last name cannot be empty",
    errorPhoneNumber: "Phone number cannot be empty",
    errorUpload: "Picture must be uploaded",
    errorUsername: "Username cannot be empty",
    errormiddleName: "Middle name cannot be empty",
  },
  regex: {
    confirmPassword: {
      errorMessage:
        "Password must contain at least 1 number, 1 uppercase and a special character",
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
    },
    createPassword: {
      errorMessage:
        "Password must contain at least 1 number, 1 uppercase and a special character",
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
    },

    errorBvn: {
      errorMessage: "Bvn must have at least 11 digits",
      pattern: /^\d{11}$/,
    },

    errorEmail: {
      errorMessage: "Please enter a valid email address",
      pattern: /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z-]+(?:\.[\dA-Za-z-]+)*$/,
    },
    errorPhoneNumber: {
      errorMessage: "Phone number must have at least 11 digits",
      pattern: /^\d{11}$/,
    },
  },
};

export function validationFunction<ErrorType>(
  input: string,
  field: Partial<keyof MainTypes>,
  errorState: [ErrorType, (x: ErrorType) => void],
  preferredErrorMessage?: PreferredErrorMessageType,
) {
  const [errors, setErrors] = errorState;
  setErrors({
    ...errors,
    [field]: "",
  });
  if (!input) {
    setErrors({
      ...errors,
      [field]: preferredErrorMessage
        ? preferredErrorMessage?.empty
        : ERRORMESSAGES.empty[field],
    });
    return false;
  }
  if (
    ERRORMESSAGES.regex[field] &&
    !ERRORMESSAGES.regex[field]?.pattern?.test(input)
  ) {
    setErrors({
      ...errors,
      [field]: preferredErrorMessage
        ? preferredErrorMessage.regex
        : ERRORMESSAGES.regex[field]?.errorMessage,
    });
    return false;
  }
  return true;
}

type UnknownObjectType = { [x: string]: string };

export function checkErrors(
  errorObject: UnknownObjectType,
  valuesObject: UnknownObjectType,
): boolean {
  const checkErrorsArray = Object.keys(errorObject).filter(
    (key) => errorObject[key] !== "",
  );

  const checkValuesArray = Object.keys(valuesObject).filter(
    (key) => valuesObject[key] === "",
  );
  return checkErrorsArray.length === 0 && checkValuesArray.length === 0;
}

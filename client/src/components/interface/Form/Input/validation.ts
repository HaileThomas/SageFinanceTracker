const getUsernameRegex = (): RegExp => {
  const local = '[^\\s@]+' // all characters that aren't whitespaces or @s
  const domain = '[^\\s@\\.*]+' // all characters that aren't whitespaces or @s
  const tld = '[a-zA-Z]{3,}' // at least three letters

  return new RegExp(`^${local}@${domain}\\.${tld}$`)
}

const getConfirmPasswordRule = ({ getFieldValue }: any) => ({
  validator(_: any, value: string) {
    if (!value || getFieldValue('Password') === value) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('The passwords do not match!'))
  },
})

export const requiredInputRules = [
  { required: true, message: 'Please enter ${name}.' },
]

export const usernameInputRules = [
  { required: true, message: 'Please enter Username.' },
  {
    pattern: getUsernameRegex(),
    message: 'Please enter a valid Username.',
  },
]

export const passwordInputRules = [
  { required: true, message: 'Please enter Password.' },
  { min: 8 },
]

export const confirmationInputRules = [
  { required: true, message: 'Please confirm Password.' },
  getConfirmPasswordRule,
]

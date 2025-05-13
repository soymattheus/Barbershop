import { toast } from 'react-toastify'
import { nullable } from 'zod'

export type LoginBody = {
  email: string
  password: string
}

export type RegisterBody = {
  email: string
  password: string
  confirmPassword: string
}

/** @nullable */
export type LoginEvent200 = {
  token: string
  user: {
    id: string
    name: string
    email: string
    createdAt: string
    updatedAt: string
  } | null
}

/**
 * @summary Login
 */

export const Login = async (
  LoginBody: LoginBody,
  options?: RequestInit
): Promise<LoginEvent200> => {
  const { email, password } = LoginBody

  if (email !== 'matheus@email.com' || password !== 'admin1') {
    // alert('Invalid credentials')

    toast('Invalid credentials!')
    return {
      token: '',
      user: null,
    }
  }

  const body = {
    token: '5465465346gfgfd',
    user: {
      id: 'fdg56frgfdg45645',
      name: 'Matheus Tavares',
      email: 'matheus@email.com',
      createdAt: '2023-10-01T00:00:00.000Z',
      updatedAt: '2023-10-01T00:00:00.000Z',
    },
  }

  return body
}

export const Register = async (
  LoginBody: RegisterBody,
  options?: RequestInit
): Promise<LoginEvent200> => {
  const { email, password, confirmPassword } = LoginBody
  if (password !== confirmPassword) {
    toast('Passwords do not match!')
    return {
      token: '',
      user: null,
    }
  }

  toast('Registered successfully!')
  return {
    token: '',
    user: null,
  }
}

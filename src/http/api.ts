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
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQiLCJlbWFpbCI6Im1hdGhldXNAZW1haWwuY29tIiwiaWF0IjoxNzE1NTY4ODAwLCJleHAiOjE3MTU1NzI0MDB9._l4KaXBrN4FyJzq3Q8OMzWgRrN-jCLhdfW4fkwYyVPg',
    user: {
      id: '3f2504e0-4f89-11d3-9a0c-0305e82c3301',
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

import * as core from '@actions/core'
import {GoogleApis} from 'googleapis'

const AsyncFunction = Object.getPrototypeOf(async () => null).constructor

type AsyncFunctionArguments = {
  google: GoogleApis
  core: typeof core
  require: Function // NodeRequire
}

export async function callAsyncFunction<T>(
  args: AsyncFunctionArguments,
  source: string
): Promise<T> {
  const fn = new AsyncFunction(...Object.keys(args), source)
  return fn(...Object.values(args))
}

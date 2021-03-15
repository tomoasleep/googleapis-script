import * as core from '@actions/core'
import {google} from 'googleapis'
import {callAsyncFunction} from './async-function'

async function run(): Promise<void> {
  try {
    const serviceAccountCredentialsJson: string = core.getInput(
      'service-account-credentials-json'
    )
    const serviceAccountCredentials = JSON.parse(serviceAccountCredentialsJson)

    const scopesJson: string = core.getInput('scopes-json')
    const scopes: string[] = JSON.parse(scopesJson)

    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccountCredentials,
      scopes
    })
    google.options({auth})

    const script = core.getInput('script', {required: true})

    await callAsyncFunction({require, google, core}, script)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

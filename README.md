# googleapis-script

This action makes it easy to quickly write a script in your workflow that uses Google APIs.
This action is inspired by [actions/github-script](https://github.com/actions/github-script).

:warning: This action is still a bit of an experiment. The API and functionality may change.
## Usage

In order to use this action, a `script` input is provided. The value of that input should be the body of an asynchronous function call. The following arguments will be provided:

* `google` A pre-autenticated [googleapis/google-api-nodejs-client](https://github.com/googleapis/google-api-nodejs-client) client.
* `core` A reference to the [@actions/io](https://github.com/actions/toolkit/tree/main/packages/core) package.

See [googleapis/google-api-nodejs-client](https://github.com/googleapis/google-api-nodejs-client) for the API client documentation.

### Authentication

In order to authenticate Google APIs these inputs are provided:

* `scopes-json`: A JSON array of Google API resources and operations to be authenticated.
  * :memo: See https://developers.google.com/identity/protocols/oauth2/scopes for the available scopes.
* credential inputs (For now, Only service account credentials is supported.):
  * `service-account-credentials-json`: A JSON keyfile content of a service account.
    * :memo: To generate a service account and its key. See: https://developers.google.com/identity/protocols/oauth2/service-account?hl=ja#creatinganaccount.

Before using Google APIs, you must be sure the API to use has been enabled.
For more details, See: https://github.com/googleapis/google-auth-library-nodejs#application-default-credentials.

### Example

#### Create a document from a template document

This example creates a new document and merge contents to it like the practice in https://developers.google.com/docs/api/how-tos/merge.

```yaml
- uses: tomoasleep/googleapis-script@v1-alpha
  with:
    service-account-credentials-json: ${{ secrets.GOOGLE_APIS_CREDENTIAL_JSON }}
    scopes-json: '["https://www.googleapis.com/auth/documents", "https://www.googleapis.com/auth/drive.file"]'
    script: |
      // Create a new document from a template document.
      const newDoc = await google.drive("v3").files.copy({ fileId: "<TEMPLATE DOCUMENT ID>", supportsAllDrives: true })

      // Replace placeholders in the created document.
      const requests = [
        {
          replaceAllText: {
            containsText: { text: '{{date}}', matchCase: true },
            replaceText: new Date().toString(),
          },
        },
      ]
      const doc = await google.docs("v1").documents.batchUpdate({ documentId: newDoc.data.id, resource: { requests } })

      console.log(doc.data.documentId)
      core.setOutput("new-document-id", doc.data.documentId)
```




## Development

This action is generated from [actions/typescript-action](https://github.com/actions/typescript-action).
See [development.md](./development.md) for details.

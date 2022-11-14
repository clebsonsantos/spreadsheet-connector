 <img src="./logo.png"/>

![development](http://img.shields.io/static/v1?label=STATUS&message=Complete&color=GREEN&style=for-the-badge)
![licence](http://img.shields.io/static/v1?label=licence&message=MIT&color=GREEN&style=for-the-badge)

# Spreadsheet Connector
**No database, connect and manage your spreadsheet**

Tag this project with a star 🌟

## Required
  - it is advisable to use nodejs in version `^17`

## Features

- Rest API
    - List data from a worksheet using a given scope
    - Add data from a worksheet using a certain scope
    - Update data from a worksheet using a given scope
    - Delete data from a worksheet using a given scope


### How to use?

- Google Crendentials
    - Create a [Google project](https://console.cloud.google.com/)
    - Create a [account service for the project](https://cloud.google.com/iam/docs/service-accounts) 
    - Create and export access credentials.
- Share the spreadsheet you want to access with the email generated on google
  
<img src="./shared-sheet.png"/>



- Deploy for production
    - Clone this repository
    - Execution commands: 
      - `npm install`
      - `npm run start`
    - The server is running on default port 4000

- Routes
    - All routes use the `POST` method
    - Use the `spreadsheet` prefix
    - Call methods
      - `add`
      - `list`
      - `delete`
      - `update`
    - Examples
      - `http://localhost:4000/spreadsheet/add`
      - `http://localhost:4000/spreadsheet/list`
      - `http://localhost:4000/spreadsheet/delete`
      - `http://localhost:4000/spreadsheet/update`

### Request Body

- By default it will create a page in your spreadsheet with the `SpreadSheetTabName` if it doesn't exist. And it will add the suggested fields in `fields`.
- The `ID` is added by default if it doesn't exist.

- `add`

```json
    {
        "credentials": {
        "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
        "client_email": "client_email@google.com"
        },
        "fields": ["NAME", "AGE"],
        "spreadSheetId": "ID",
        "spreadSheetTabName": "ANY-NAME",
        "values": {
            "NAME": "John Doe",
            "AGE": "25"
	    }
    }
``` 
<br/>

- `list`

```json
    {
        "credentials": {
        "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
        "client_email": "client_email@google.com"
        },
        "fields": ["NAME", "AGE"],
        "spreadSheetId": "ID",
        "spreadSheetTabName": "ANY-NAME"
    }
``` 
<br/>

- `delete`

```json
    {
        "credentials": {
        "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
        "client_email": "client_email@google.com"
        },
        "fields": ["NAME", "AGE"],
        "spreadSheetId": "ID",
        "spreadSheetTabName": "ANY-NAME",
        "values": {
            "ID": "076a928f-82e9-4f00-878b-12bbe0f4520a"
        }
    }
```
<br/>

- `update`

```json
{
    "credentials": {
    "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
    "client_email": "client_email@google.com"
    },
    "fields": ["NAME", "AGE"],
    "spreadSheetId": "ID",
    "spreadSheetTabName": "ANY-NAME",
    "values": {
        "ID": "e5205dc6-01a5-42fa-9d91-7a19d7d231fa",
        "NAME": "any name",
        "AGE": "16"
    }
}
```

<br/>

### Note
  - You can test how this project works at: [Spreadsheet Connect Api Demo](https://spreadsheeet-connector.fly.dev)
  - Insert the body according to the method

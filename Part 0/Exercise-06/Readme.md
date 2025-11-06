    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: reponds with a status code 201 meaning the request has been fulfilled
    deactivate server

    Note right of browser: The browser updates the notes list using JavaScript without reloading or redirecting the page
    
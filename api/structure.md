Structure of Backend:

| Field | Decipher| Used For | Description |
| :---: | :---: | :---: | :---: |
| index.js | API Core | - | Allow to connect all libraries/tools for working API |
| routes | API Routes | index.js | Allow to route all API's data |
| middleware | Aplitude Developer Center | index.js, routes |  |
| controller | Controller | routes | Class that control specific router's functionality |
| services | Services | controller | Class that allow to function controller, make operations with Data Base |
| models | Data Base Schemas | services | Interpretation of Schemas from DB |
| dtos | Data Transfer Object | services | Class which have some fields used into Services to send these fields to user |
| exceptions | Errors | middleware, controller, services | Class which processes errors |

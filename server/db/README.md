# Database

## Use db instance

You should be able to import the db instance with

```js
// make sure the root is db
const sequilize = require("[db]./db.js");
```

## Testing connection

Running the following script will create and leverage the db instance and test the connection.

```bash
# [root]/server/db/helpers
node test.js
```

## Visualise DB Diagram

1. In VSCode download "DBML Entity-Relationship Diagrams visualizer" by Juste Bocovo.
2. Open the file `concept.dbml`
3. Click the icon on the top right of the screen that says 'show diagram'
4. The result may be no schema. Just go to the document and click ctrl + s to save the file. The [issue seems to be common]('https://github.com/BOCOVO/db-schema-visualizer/issues/88')
5. Hopefully you should now see the diagram.

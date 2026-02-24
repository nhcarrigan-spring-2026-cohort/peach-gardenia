# Database

## PNPM Installs

The DB setup relies on sequelize, sequelize-cli and @sequelize/sqlite3, you simply need to run `pnpm i` and these will be installed.

**Some installs require pnpm to run scripts for installation properly. Pnpm requires permission to enable this. Run `pnpm approve-builds` to go through approval process.**

## Configuration

There will be a working config file saved as db.config.js.example. Rename this to config.js or edit config.js to match this if it already exists.

You can run DB scripts with different flags like so

`key=value node script.js`

The key we need to assign a value to is 'NODE_ENV'. The values we can set it to are 'development', 'test' and 'production'. So we can run:

`NODE_ENV=development node path/to/database.js`

Which will show the response in the terminal:

```bash
Executing (default): SELECT 1+1 AS result
Connection has been established
```

Like wise, scripts that rely on the config file will need a similar initial flag.

## Adding the tables and creating the db.sqlite file

`pnpm dlx sequelize-cli db:migrate`

**Note that this command will call the up method for all files listed in the migrations folder. Currently these just create tables, however they may change the state of the DB.**

## Task folder

The task folder is where you should write all the queries and db inserts. See task.js.example for template as well as more useful demos addOrganizations and addSingleOrganization.

Script example:

`NODE_ENV=development node ./server/db/tasks/addOrganizations.js`

## Adding seed data

Create the seed file (stored in ./db/seeders):

`pnpm dlx sequelize-cli seed:generate --name Organization`

Edit the file with the inserts you wish to add.
See server/db/seeders/20260219175306-organization.js for an example of how to add seed code.

Copy the file you wish to seed in the seeders directory and run

`pnpm dlx sequelize-cli db:seed --seed <filename>`

Alternatively run

`pnpm dlx sequelize-cli db:seed:all`

## Use db instance

You should be able to use the db instance with the import below. By default it will be run in development mode, but any script can be run with different flags which will effect the sequelize instance according to the configuration file.

```js
// make sure the root is db
const { sequilize } = require("./path/to/db.js");
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

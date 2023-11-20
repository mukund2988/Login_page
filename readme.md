# Setup 

## Setup DB

1. MySQL installed

2. Database name - "att"

3. VSCode extensions: 
    1.   Name: SQLTools

            - Id: mtxr.sqltools
            - VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools

    2.  Name: SQLTools MySQL/MariaDB/TiDB

            - Id: mtxr.sqltools-driver-mysql
            - VS Marketplace Link: https://m iii. prearketplace.visualstudio.com/items?itemName=mtxr.sqltools-driver-mysql

    3. Name: Prettier SQL VSCode (Recommended)

            - Id: inferrinizzard.prettier-sql-vscode
            - VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=inferrinizzard.prettier-sql-vscode

4. Connect to 'att' database using SQLTools in VSCode by adding
    - Connection name
    - Port
    - Database
    - Username
    - Password

5. go to /schema and start executing queries by clicking "Run on active connection" in each block (--@block) in the 'schema/db.session.sql'.

## Setup project 

1. Clone the project to your local machine.

2. Run `npm install` 

3. Run `nodemon` in root folder.



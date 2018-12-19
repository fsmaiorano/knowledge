knex migrate:make create_table_users;
knex migrate:make create_table_categories
knex migrate:make create_table_articles

knex migrate:latest
knex migrate:rollback
# @rask/api 🐇

This is a [GraphQL](1) 🦄 project that uses [Prisma](2) 😍 to model, generate and seed a [SQLite](3) 🗂️ database. The data used by [Prisma](2) to seed the database is randomly generated using [@ngneat/falso](4) 🎲.

[1]: https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjRyvvG45r-AhXWm2oFHf-wABMQFnoECBMQAQ&url=https%3A%2F%2Fgraphql.org%2F&usg=AOvVaw0mfmkFd-vcSKFxzGwioZ4J 'GraphQL website'
[2]: https://www.prisma.io 'Prisma website'
[3]: https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwio8rnj3pr-AhXyk2oFHaSPAr4QFnoECBMQAQ&url=https%3A%2F%2Fsqlite.org%2F&usg=AOvVaw3BkEryJd7TFB-a95HgK2_X 'SQLite homepage'
[4]: https://ngneat.github.io/falso/ '@ngneat/falso documentation'

## Table of Contents

- [🛝 Install](#🛝-install)
- [🗂️ Database](#🗂️-database)
  - [📐 Prisma Schema](#📐-prisma-schema)

## 🛝 Install

The project dependencies are managed by the workspace in the root
.

## 🗂️ Database

[Prisma](1) is used to model, generate and seed the [SQLite](2) database. The database is stored locally in the project as a **dev.db** file in the root of the [/prisma/dev.db](3) directory.

[1]: https://www.prisma.io 'Prisma website'
[2]: https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwio8rnj3pr-AhXyk2oFHaSPAr4QFnoECBMQAQ&url=https%3A%2F%2Fsqlite.org%2F&usg=AOvVaw3BkEryJd7TFB-a95HgK2_X 'SQLite homepage'
[3]: /prisma/dev.db

Generate models, database and seed.

```bash
pnpm generate:db
```

### 📐 Prisma Schema

The [SQLite](1) database schema is managed by [Prisma](2). The [schema.prisma](3s) file contains the model definitions that are used to create the database schema.

For more information on how to create and edit the [schema.prisma](3) file, refer to Prisma's documentation on [schemas](4).

[1]: https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwio8rnj3pr-AhXyk2oFHaSPAr4QFnoECBMQAQ&url=https%3A%2F%2Fsqlite.org%2F&usg=AOvVaw3BkEryJd7TFB-a95HgK2_X 'SQLite homepage'
[2]: https://www.prisma.io 'Prisma website'
[3]: /prisma/schema.prisma
[4]: https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference

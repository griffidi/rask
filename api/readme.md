# 🐇 @rask/api

A [Node.js](1) based [GraphQL](2) 🦄 project that uses [Prisma](3) 😍 to model, generate and seed a [SQLite](4) 🗂️ database. The data is randomly generated using [@ngneat/falso](4) 🎲, [Koa]() for the web framework and a GraphQL API [Apollo Server](5).

[1]: https://nodejs.org/en
[2]: https://graphql.org/
[3]: https://www.prisma.io
[4]: https://sqlite.org/index.html
[5]: https://ngneat.github.io/falso/
[6]: https://koajs.com/
[7]: https://www.apollographql.com/docs/apollo-server

## Table of Contents

- [Technologies](#technologies)
- [Install](#install)
- [Database](#database)
  - [Prisma SQLite]()
  - [Prisma Schema](#📐-prisma-schema)
- [Development](#development)
  - [Task Items](#task-items)

### Technologies

- [Node.js](https://nodejs.org/en)
- [GraphQL](https://graphql.org/)
- [Prisma](https://www.prisma.io)
- [SQLite](https://sqlite.org/index.html)
- [@ngneat/falso](https://ngneat.github.io/falso/)
- [Koa](https://koajs.com/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server)
- [TypeScript](https://typescriptlang.org)

### Install

The project dependencies are managed by the workspace in the root
.

### Database

[Prisma](1) is used to model, generate and seed the [SQLite](2) database. The database is stored locally in the project as a **dev.db** file in the root of the [`prisma/dev.db`](3) directory.

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

[1]: https://www.prisma.io
[2]: https://sqlite.org/index.html
[3]: /prisma/dev.db

#### Generate models, database and seed.

```bash
pnpm generate:db
```

#### Prisma SQLite

For documentation on how to configure Prisma to work with SQLite refer to [Prisma Documentation](https://www.prisma.io/docs/concepts/database-connectors/sqlite).

#### Prisma Schema

The [SQLite](1) database schema is managed by [Prisma](2). The [`prisma/schema.prisma`](3s) file contains the model definitions that are used to create the database schema.

For more information on how to create and edit the [`prisma/schema.prisma`](3) file, refer to Prisma's documentation on [schemas](4).

[1]: https://sqlite.org/index.html
[2]: https://www.prisma.io
[3]: /prisma/schema.prisma
[4]: https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference

### Development

#### Task Items

- ❌ Not Started
- 🟡 In Progress
- ✅ Complete

| Task         | Status |
| ------------ | :----: |
| Drop ts-node |   ❌   |
| Add esbuild  |   ❌   |

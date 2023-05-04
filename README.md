У вас на пк должен быть установлен <a href="https://nodejs.org/en">node js</a>

# Как запустить backend


<code>npm i</code>

# В файле schema.prisma вы можете изменить бд 
```
datasource db {
  provider = "sqlite" // Бд здесь я использую sqlite вы можете например PostgreSQL
  url      = "file:./dev.db" // Здесь путь к бд, можно также указать путь в файле .env, так сделано в ветке develop там использовано БД mysql
}
```

<code>npx prisma migrate dev --name init</code>

<code>npm run start:dev</code> // чтобы запустить

# Как запустить frontend

<code>npm i</code>

<code>npm run start</code> //чтобы запустить

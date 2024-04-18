This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Download PostgreSQL
When downloading grab certain tools like the stackbuilder, this will probably take some time. And if it asks for add ons anything other than postgres itself is unnecessary 
After downloading it should have started automatically, to access the it open SQL Shell, which should have come with the StackBuilder download.
In there simply input the default information, which is in parentheses next to the type, until username which you can define.
If that doesn't open a command prompt into it, then you'll have to instead open a terminal and go to where you installed it, make sure to be inside the bin folder which is inside the version folder, enter psql into it which should get you into the database environment
Once you're in go ahead and make your password and there should already be a database called postgres
Now go to the project and in the root directory, so just voiceadvance/, make a file called .env and inside it just put this and fill in the details: 

DATABASE_URL=postgres://username:password@localhost:5432/mydatabase

Here, change username:password to yours, mydatabase to your database name which should be postgres
After that go and pull from my newest branch vercelpreview, there you will need to make a single file adjustment which is 
datasource

db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

Now that you have that done, the schema should already be able to be generated so go to your node.js command prompt, open as admin as well, go to our file
Once you're there type in npm i prisma to be safe, then do npx migrate dev first, then do npx prisma generate which should make the tables
After this do next dev and it should open with my components. The very bottom one is to make a user, the one above is to make a comment. Do the user first then the comment and it should display everything

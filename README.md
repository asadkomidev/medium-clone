# Medium-Clone: A Next.js Blogging Platform

Medium-Clone project! This is a fully-featured blogging platform inspired by Medium, built using the latest web development technologies including Next.js 14, Tailwind CSS, Shadcn UI, Cloudinary, Resend, and React email templates. It aims to provide a seamless experience for both content creators and readers with rich functionalities and robust security features.

<a href="https://www.asadkomi.com">
  <img alt="Medium clone" src="/public/thumbnail.png">
</a>

### Technologies:

- NextJs 14
- Typescript
- Tailwind CSS
- Shadcn UI
- cloudinary
- Resend
- React email templates

### Features:

- ✍🏽 Medium rich editor - Create and format your stories with an intuitive editor that replicates the Medium writing experience.
- 🖥️ Content renderer - Enjoy dynamic rendering of content for a smooth reading experience.
- 💬 Comment on story and replies - Engage with the audience through comments and replies.
- 💬 Reply to comment and replies
- 👏🏽 Clap on comment and replies - Show appreciation with a clapping feature for comments and replies.
- 🔖 Bookmark / save a story - Easily bookmark stories for later reading.
- 🔗 Share link, share in social media
- 🔍 Search and filter - Discover stories based on topics with advanced search options.

### Security and User Management:

- 🔐 Next-auth v5 (Auth.js)
- 🚀 Next.js 14 with server actions
- 🔑 Credentials Provider
- 🌐 OAuth Provider (Social login with Google, you can add more)
- 🔒 Forgot password functionality
- ✉️ Email verification
- 📱 Two factor verification
- 👥 User roles (Admin & User)
- 🚧 Role Gate
- 👤 useUser hook
- 🛂 useRole hook
- 🧑 getUser utility (server)
- 👮 getRole utility (server)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have Node.js and npm installed on your machine. If not, install them from Node.js website.

### Cloning this repository

1. Clone the repo

```shell
git clone
```

2. Install NPM packages

```shell
npm i
```

### Setup .env file

3. Create a `.env.local` file in the root directory and add your environment variables (copy the the below into your .env file).

```js

DATABASE_URL=

NEXT_PUBLIC_APP_URL=

AUTH_SECRET="secret"

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

RESEND_API_KEY=

# For email template
LOGO_URL=


NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

```

### Running app

4. Start the development server

```shell
npm run dev
```

The application should now be running on `http://localhost:3000`

## License

Distributed under the MIT License. See LICENSE for more information.

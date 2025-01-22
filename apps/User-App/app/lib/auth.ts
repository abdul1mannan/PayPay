import { PrismaClient } from "@abdul1mannan/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const db = new PrismaClient();
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {
          label: "Name",
          type: "text",
          placeholder: "John Doe",
          required: true,
        },
        email: {
          label: "Email",
          type: "text",
          placeholder: "john@doe.com",
          required: true,
        },
        number: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials: any) {
  

        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await db.user.findFirst({
          where: {
            number: credentials.number,
          },
        });
 
        if (existingUser) {
        
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
              number: existingUser.number,
            };
          }
          return null;
        }
      

        try {
      
          console.log(typeof credentials.number);
          console.log(typeof credentials.email);
          console.log(typeof credentials.name);
          const user = await db.user.create({
    
            data: {
              name: credentials.name,
              email: credentials.email,
              number: credentials.number,
              password: hashedPassword,
            },
          });
    
         
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            number: user.number,
          };
        } catch (e) {

          console.error(e);
        }

        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {

    async session({ token, session }: any) {
      session.user.id = token.sub;

      return session;
    },
  },
};

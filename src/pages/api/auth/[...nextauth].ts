import {query as q} from 'faunadb'
import { fauna } from "../../../services/fauna"

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
         params: {
            scope: "user:email"
         }
      }
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async signIn({ user }) {   
      try {
        q.If(
          q.Not(
            q.Exists(
              q.Match(
                q.Index("user_by_email"),
                q.Casefold(user.email)
              )
            )
          ),
          q.Create(
            q.Collection("users"),
            {data: {user}}
          ),
          q.Get(
            q.Match(
              q.Index("user_by_email"),
              q.Casefold(user.email)
            )
          )
        )
        return true
      } catch (error) {
        console.error(error)
        return false
      }   
    },
  },
})


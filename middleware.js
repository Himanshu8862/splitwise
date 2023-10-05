export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard", "/profile", "/groups/new", "/createTransaction"] }

import { Profile } from "./profile";

export class Comment {
    id: number
    createdAt: string
    updatedAt: string
    body: string
    author: Profile
}
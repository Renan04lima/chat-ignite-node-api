# Schemas

## User
- email: string
- socket_id: string
- name: string
- avatar: string

## Message
- to: ObjectId
- text: string
- roomId: string
- created_at: Date

## ChatRoom
- idUsers: User[]
- idChatRoom: string

# Usage

1. start server
  ```sh
   npm run dev
  ```
2. access in browser http://localhost:3333

export enum UserType {
    ADMIN,
    REFEREE,
    PLAYER,
    VIEWER
}

interface User {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    type: UserType,
    avatar: string,
}

interface AdminUser extends User {
    type: UserType.ADMIN
}

interface RefereeUser extends User {
    type: UserType.REFEREE
    matches: Match[]
}

interface PlayerUser extends User {
    type: UserType.PLAYER
    rating?: number
    matches: Match[]
}

interface ViewerUser extends User {
    type: UserType.VIEWER
}

interface Game {
    playerA: string
    playerB: string
    referee: string
    score: {
        playerA: number
        playerB: number
    }
}

interface Match {
    playerA: string
    playerB: string
    referee: string
    games: Game[]
    date: Date
}

interface Tournament {
    players: PlayerUser[]
    matches: Match[]
    size: number
    date: Date
}
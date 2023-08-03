export type UserInfo = {
    avatar_url: string,
    login: string,
    name: string,
    location: string
}

export type UserDetails = {
    avatar_url: string,
    login: string,
    name: string,
    location: string
    followers: number,
    public_repos: number,
    id: number
}

export type UserRepositories = Array<{
    id: number,
    name: string,
    language: string,
    description: string,
    created_at: string,
    pushed_at: string,
    html_url: string
}>
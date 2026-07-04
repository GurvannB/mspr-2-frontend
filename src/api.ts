const BASE_URL = '/api/function'

export async function createAccount(username: string, email: string) {
    const res = await fetch(`${BASE_URL}/create-account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email })
    })
    return res.json()
}

export async function generatePassword(username: string) {
    const res = await fetch(`${BASE_URL}/generate-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    })
    return res.json()
}

export async function generateTwoFA(username: string) {
    const res = await fetch(`${BASE_URL}/generate-2fa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    })
    return res.json()
}

export async function authenticate(
    username: string,
    password: string,
    totp_code: string
) {
    const res = await fetch(`${BASE_URL}/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, totp_code })
    })
    return res.json()
}
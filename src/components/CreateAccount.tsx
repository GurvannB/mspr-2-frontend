import { useState } from 'react'
import { createAccount } from '../api'

export default function CreateAccount() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [result, setResult] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const handle = async () => {
        setLoading(true)
        setResult(null)
        const data = await createAccount(username, email)
        setResult(data)
        setLoading(false)
    }

    const isValid = username.trim().length > 0 && email.includes('@')

    return (
        <section className="card">
            <h2>Créer un compte complet</h2>
            <p className="description">
                Génère mot de passe + 2FA en une seule requête.
                Les QR codes sont envoyés par email.
            </p>
            <div className="form-col">
                <input
                    type="text"
                    placeholder="Username (ex: jean.dupont)"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Adresse email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button onClick={handle} disabled={loading || !isValid}>
                    {loading ? 'Création...' : 'Créer le compte'}
                </button>
            </div>
            {result && (
                <div className={`result ${result.error ? 'error' : 'success'}`}>
                    {result.error ? (
                        <p>❌ {result.error}</p>
                    ) : (
                        <p>✅ {result.message}</p>
                    )}
                </div>
            )}
        </section>
    )
}

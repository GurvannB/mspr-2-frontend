import { useState } from 'react'
import { generateTwoFA } from '../api'

export default function GenerateTwoFA() {
    const [username, setUsername] = useState('')
    const [result, setResult] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const handle = async () => {
        setLoading(true)
        setResult(null)
        const data = await generateTwoFA(username)
        setResult(data)
        setLoading(false)
    }

    return (
        <section className="card">
            <h2>Générer le 2FA</h2>
            <p className="description">
                Génère un nouveau secret TOTP pour un utilisateur existant.
                Le QR code est envoyé à l'adresse email enregistrée lors de la création du compte.
            </p>
            <div className="form-row">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button onClick={handle} disabled={loading || !username}>
                    {loading ? 'Génération...' : 'Générer 2FA'}
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

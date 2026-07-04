import { useState } from 'react'
import { generatePassword } from '../api'

export default function GeneratePassword() {
    const [username, setUsername] = useState('')
    const [result, setResult] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const handle = async () => {
        setLoading(true)
        setResult(null)
        const data = await generatePassword(username)
        setResult(data)
        setLoading(false)
    }

    return (
        <section className="card">
            <h2>Générer un mot de passe</h2>
            <p className="description">Génère uniquement le mot de passe pour un utilisateur existant</p>
            <div className="form-row">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button onClick={handle} disabled={loading || !username}>
                    {loading ? 'Génération...' : 'Générer'}
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
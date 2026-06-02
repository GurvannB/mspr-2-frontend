import { useState } from 'react'
import { createAccount } from '../api'

export default function CreateAccount() {
    const [username, setUsername] = useState('')
    const [result, setResult] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const handle = async () => {
        setLoading(true)
        setResult(null)
        const data = await createAccount(username)
        setResult(data)
        setLoading(false)
    }

    return (
        <section className="card">
            <h2>Créer un compte complet</h2>
            <p className="description">Génère mot de passe + 2FA en une seule requête</p>
            <div className="form-row">
                <input
                    type="text"
                    placeholder="Username (ex: jean.dupont)"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button onClick={handle} disabled={loading || !username}>
                    {loading ? 'Création...' : 'Créer le compte'}
                </button>
            </div>
            {result && (
                <div className={`result ${result.error ? 'error' : 'success'}`}>
                    {result.error ? (
                        <p>❌ {result.error}</p>
                    ) : (
                        <>
                            <p>✅ {result.message}</p>
                            <div className="qr-grid">
                                <div>
                                    <p><strong>QR Code mot de passe</strong></p>
                                    <img
                                        src={`data:image/png;base64,${result.qrcode_password_base64}`}
                                        alt="QR mot de passe"
                                    />
                                </div>
                                <div>
                                    <p><strong>QR Code 2FA</strong></p>
                                    <img
                                        src={`data:image/png;base64,${result.qrcode_totp_base64}`}
                                        alt="QR 2FA"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </section>
    )
}
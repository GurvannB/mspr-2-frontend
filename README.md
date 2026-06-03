COFRAP - Frontend
Interface web de démonstration consommant les fonctions OpenFaaS.

Pages
Création de compte : appelle generate-password puis generate-2fa, affiche les 2 QR codes
Connexion : formulaire user/mdp/code TOTP, appelle authenticate

Configuration
La variable OPENFAAS_GATEWAY_URL doit pointer vers la gateway OpenFaaS.

Repos liés
DevOps : https://github.com/mbidoyen/cofrap-devops
Backend : https://github.com/mbidoyen/cofrap-backend


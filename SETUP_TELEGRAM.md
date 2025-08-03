# 🤖 Configuration du Bot Telegram pour le Chat

## ⚠️ IMPORTANT : Erreur "chat not found" ?

Si vous avez l'erreur `chat not found`, c'est que **votre bot ne peut pas vous envoyer de message**. Voici comment résoudre :

### Solution rapide :
1. **Démarrer une conversation** avec votre bot en premier
2. Aller sur Telegram → Rechercher votre bot par son username
3. Cliquer sur **"Démarrer"** ou envoyer `/start`
4. **SEULEMENT APRÈS** vous pouvez utiliser le chat du site

---

## Étape 1 : Créer un Bot Telegram

1. **Ouvrir Telegram** sur votre téléphone ou ordinateur
2. **Rechercher @BotFather** et commencer une conversation
3. **Envoyer** `/newbot`
4. **Choisir un nom** pour votre bot (ex: "StreamPro Support Bot")
5. **Choisir un username** (doit finir par "bot", ex: "streampro_support_bot")
6. **Copier le token** que BotFather vous donne (format: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

## Étape 2 : Obtenir votre Chat ID

### Méthode 1 (Recommandée) :
1. **Rechercher @userinfobot** sur Telegram
2. **Commencer une conversation** avec ce bot
3. **Copier votre ID utilisateur** (les chiffres qu'il vous donne)

### Méthode 2 (Alternative) :
1. **Envoyer un message** à votre bot (étape cruciale !)
2. **Ouvrir** : `https://api.telegram.org/botVOTRE_TOKEN/getUpdates`
3. **Chercher** le `"chat":{"id":123456789}` dans la réponse
4. **Copier** ce numéro (votre Chat ID)

## Étape 3 : DÉMARRER UNE CONVERSATION AVEC VOTRE BOT

🚨 **ÉTAPE CRUCIALE** - Sans ça, vous aurez "chat not found" :

1. **Aller sur Telegram**
2. **Rechercher votre bot** par son username (ex: @streampro_support_bot)
3. **Cliquer sur "Démarrer"** ou envoyer `/start`
4. **Votre bot peut maintenant vous envoyer des messages !**

## Étape 4 : Configurer les variables d'environnement

1. **Créer/Ouvrir le fichier** `my-app/.env.local`
2. **Remplacer** les valeurs par les vôtres :

```env
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=987654321
```

## Étape 5 : Tester le chat

1. **Redémarrer le serveur** Next.js (`npm run dev`)
2. **Aller sur le site** et cliquer sur le widget de chat
3. **Envoyer un message** de test
4. **Vérifier** que vous recevez le message sur Telegram

## 🔄 ÉTAPE 6 : Activer les réponses bidirectionnelles (OPTIONNEL)

Pour voir vos réponses Telegram s'afficher sur le site :

### Configuration du Webhook :

1. **Déployer votre site** (Vercel, Netlify, etc.) pour avoir une URL publique
2. **Configurer le webhook** en envoyant cette requête :

```bash
curl -X POST "https://api.telegram.org/bot[VOTRE_TOKEN]/setWebhook" \
     -H "Content-Type: application/json" \
     -d '{"url": "https://votre-site.vercel.app/api/telegram-webhook"}'
```

3. **Remplacer** :
   - `[VOTRE_TOKEN]` par votre token bot
   - `votre-site.vercel.app` par votre vraie URL

### Vérification :
```bash
curl "https://api.telegram.org/bot[VOTRE_TOKEN]/getWebhookInfo"
```

## 🛠️ Dépannage

### Erreur "chat not found" :
- ✅ Avez-vous démarré une conversation avec votre bot ?
- ✅ Le Chat ID est-il correct ?
- ✅ Avez-vous redémarré le serveur après avoir modifié `.env.local` ?

### Le chat ne s'affiche pas :
- ✅ Vérifiez la console pour les erreurs JavaScript
- ✅ Redémarrez le serveur Next.js

### Messages non reçus :
- ✅ Token du bot correct ?
- ✅ Chat ID exact ?
- ✅ Conversation démarrée avec le bot ?

### Réponses Telegram non visibles sur le site :
- ✅ Webhook configuré sur un site déployé ?
- ✅ URL du webhook accessible publiquement ?
- ✅ Pas d'erreurs dans les logs ?

## ✨ Comment ça marche

### Mode simple (unidirectionnel) :
- **Visiteur écrit** → Message envoyé vers votre bot Telegram
- **Vous recevez** la notification instantanément sur votre téléphone

### Mode avancé (bidirectionnel) :
- **Visiteur écrit** → Message envoyé vers Telegram
- **Vous répondez** sur Telegram → **Réponse apparaît sur le site**
- **Communication en temps réel** dans les deux sens

## 🔧 Fonctionnalités du chat

- ✅ **Widget flottant** avec badge de notification
- ✅ **Messages en temps réel** vers Telegram
- ✅ **Interface moderne** avec animations
- ✅ **Nom d'utilisateur optionnel** avec bouton OK
- ✅ **Messages de confirmation** automatiques
- ✅ **Design cohérent** avec le site IPTV
- ✅ **Gestion d'erreurs** améliorée
- 🆕 **Réponses bidirectionnelles** (avec webhook)
- 🆕 **Polling temps réel** pour les nouvelles réponses
- 🆕 **Stockage des conversations**

## 📱 Sur votre téléphone vous recevrez :

```
🚨 Nouveau message du site IPTV

👤 Utilisateur: Jean Dupont
💬 Message: Bonjour, vos offres m'intéressent
⏰ Heure: 15:30:25
🌐 Page: /
📱 Mobile

---
💡 Répondez directement depuis Telegram
```

## 🛠️ Personnalisation possible

- Ajouter des **réponses automatiques**
- Créer un **système de tickets**
- **Intégrer d'autres pages** (chaines, prix)
- Ajouter des **boutons rapides** (FAQ, contact, etc.)
- **Base de données** pour persistance des conversations
- **Notifications push** pour les nouveaux messages

## 📧 Mode développement

Si Telegram n'est pas configuré, le chat fonctionne en **mode test** et affiche les messages dans la console du serveur.

## 🚀 Déploiement pour le webhook

Pour que les réponses Telegram apparaissent sur le site, vous devez déployer sur :
- **Vercel** (recommandé)
- **Netlify**
- **Railway**
- **Heroku**
- Tout hébergeur avec URL publique HTTPS 
import { NextRequest, NextResponse } from 'next/server';

// Configuration Telegram Bot
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Fonctions pour communiquer avec l'API centralisée
async function getActiveChat(userHash: string): Promise<string | null> {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
      
    const response = await fetch(`${baseUrl}/api/tickets-db?action=active_chat&userHash=${userHash}`);
    const data = await response.json();
    return data.ticketId;
  } catch (error) {
    console.error('Erreur récupération chat actif:', error);
    return null;
  }
}

async function createTicket(userName: string, message: string, userInfo: any): Promise<string> {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
      
    const response = await fetch(`${baseUrl}/api/tickets-db`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'create_ticket',
        userName,
        message,
        userInfo
      })
    });
    
    const data = await response.json();
    return data.ticketId;
  } catch (error) {
    console.error('Erreur création ticket:', error);
    return `T${Date.now()}`; // Fallback
  }
}

async function addMessageToTicket(ticketId: string, message: string, sender: 'user' | 'support'): Promise<boolean> {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
      
    const response = await fetch(`${baseUrl}/api/tickets-db`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'add_message',
        ticketId,
        message,
        sender
      })
    });
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Erreur ajout message:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, userName, timestamp, userAgent, page } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message requis' }, { status: 400 });
    }

    // Créer un hash unique pour cet utilisateur (basé sur son nom et user agent)
    const userHash = Buffer.from(userName + (userAgent || '')).toString('base64').slice(0, 10);
    
    // Vérifier si c'est un nouvel utilisateur ou une conversation existante
    let ticketId = await getActiveChat(userHash);
    let isNewTicket = false;
    
    if (!ticketId) {
      // Nouveau ticket pour ce client
      ticketId = await createTicket(userName, message, { userAgent, page, userHash });
      isNewTicket = true;
    } else {
      // Ajouter le message au ticket existant
      await addMessageToTicket(ticketId, message, 'user');
    }

    // Vérifier que les variables d'environnement sont configurées
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.log('📱 Variables Telegram non configurées, mode développement...');
      console.log('🎫 Ticket ID:', ticketId);
      console.log('👤 Utilisateur:', userName);
      console.log('💬 Message:', message);
      console.log('⏰ Timestamp:', timestamp);
      console.log('📱 Page:', page);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Message reçu (mode développement)',
        ticketId: ticketId,
        isNewTicket: isNewTicket
      });
    }

    // Extraire des infos du User Agent
    const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent || '');
    const device = isMobile ? '📱 Mobile' : '💻 Desktop';

    // Formatter le message pour Telegram avec informations du ticket
    const ticketStatus = isNewTicket ? '🆕 NOUVEAU TICKET' : '📝 RÉPONSE TICKET';
    
    const telegramMessage = `
${ticketStatus} \`${ticketId}\`

👤 *Client:* ${userName}
💬 *Message:* ${message}
⏰ *Heure:* ${new Date(timestamp).toLocaleString('fr-FR')}
🌐 *Page:* ${page || '/'}
${device}

---
💡 _Répondez avec \`/ticket ${ticketId}\` pour voir l'historique_
🛠️ _Commandes: \`/tickets\` \`/close ${ticketId}\` \`/help\`_`;

    // Envoyer vers Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'Markdown',
      }),
    });

    const telegramResult = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error('❌ Erreur Telegram:', telegramResult);
      
      // Messages d'erreur spécifiques
      if (telegramResult.description?.includes('chat not found')) {
        return NextResponse.json({ 
          error: 'Chat non trouvé. Avez-vous démarré une conversation avec votre bot ?' 
        }, { status: 400 });
      }
      
      if (telegramResult.description?.includes('bot was blocked')) {
        return NextResponse.json({ 
          error: 'Bot bloqué. Vérifiez votre bot Telegram.' 
        }, { status: 400 });
      }
      
      return NextResponse.json({ 
        error: `Erreur Telegram: ${telegramResult.description}` 
      }, { status: 500 });
    }

    console.log('✅ Message envoyé vers Telegram avec succès');
    console.log(`🎫 Ticket: ${ticketId} - ${isNewTicket ? 'NOUVEAU' : 'EXISTANT'}`);
    
    // Aussi enregistrer dans le chat pour l'affichage sur le site
    try {
      const baseUrl = process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : 'http://localhost:3000';
        
      await fetch(`${baseUrl}/api/chat-messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          sender: 'user'
        })
      });
    } catch (error) {
      console.error('Erreur enregistrement message:', error);
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Message envoyé vers Telegram avec succès',
      ticketId: ticketId,
      isNewTicket: isNewTicket
    });

  } catch (error) {
    console.error('❌ Erreur API chat:', error);
    return NextResponse.json({ 
      error: 'Erreur serveur interne' 
    }, { status: 500 });
  }
} 
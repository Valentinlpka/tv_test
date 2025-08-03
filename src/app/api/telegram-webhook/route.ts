import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Fonctions pour communiquer avec l'API centralisée
async function getTicketsData() {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
      
    const response = await fetch(`${baseUrl}/api/tickets-db`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur récupération tickets:', error);
    return { tickets: [], stats: { total: 0, open: 0, closed: 0, urgent: 0 } };
  }
}

async function getTicket(ticketId: string) {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
      
    const response = await fetch(`${baseUrl}/api/tickets-db?id=${ticketId}`);
    const data = await response.json();
    return data.ticket;
  } catch (error) {
    console.error('Erreur récupération ticket:', error);
    return null;
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

async function updateTicketStatus(ticketId: string, status: 'open' | 'closed' | 'pending') {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
      
    const response = await fetch(`${baseUrl}/api/tickets-db`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_status',
        ticketId,
        status
      })
    });
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Erreur mise à jour status:', error);
    return false;
  }
}

async function updateTicketPriority(ticketId: string, priority: 'low' | 'medium' | 'high' | 'urgent') {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
      
    const response = await fetch(`${baseUrl}/api/tickets-db`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_priority',
        ticketId,
        priority
      })
    });
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Erreur mise à jour priorité:', error);
    return false;
  }
}

// Fonction pour envoyer un message Telegram
async function sendTelegramMessage(text: string, chatId?: string) {
  if (!TELEGRAM_BOT_TOKEN) return;
  
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId || TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'Markdown'
      })
    });
  } catch (error) {
    console.error('Erreur envoi Telegram:', error);
  }
}

// Traiter les commandes Telegram
async function handleTelegramCommand(text: string, fromUser: any) {
  const command = text.toLowerCase().trim();
  
  // NOUVELLE COMMANDE: /reply T1001 message
  if (command.startsWith('/reply ')) {
    const parts = text.split(' ');
    const ticketId = parts[1]?.toUpperCase();
    const message = parts.slice(2).join(' ');
    
    if (!ticketId || !message) {
      return `❌ Format: \`/reply T1001 Votre message ici\`\n💡 Exemple: \`/reply T1001 Bonjour ! Comment puis-je vous aider ?\``;
    }
    
    const ticket = await getTicket(ticketId);
    if (!ticket) {
      return `❌ Ticket \`${ticketId}\` introuvable.\nUtilisez \`/tickets\` pour voir la liste.`;
    }
    
    // Ajouter le message au ticket
    const success = await addMessageToTicket(ticketId, message, 'support');
    
    if (success) {
      // Aussi l'ajouter au chat général pour l'affichage sur le site
      try {
        const baseUrl = process.env.VERCEL_URL 
          ? `https://${process.env.VERCEL_URL}` 
          : 'http://localhost:3000';
          
        await fetch(`${baseUrl}/api/chat-messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: `🎫 ${ticketId} - ${message}`,
            sender: 'support'
          })
        });
      } catch (error) {
        console.error('Erreur chat-messages:', error);
      }
      
      return `✅ Réponse envoyée au ticket \`${ticketId}\`\n👤 Client: ${ticket.userName}\n💬 Message: "${message}"`;
    } else {
      return `❌ Erreur lors de l'envoi de la réponse au ticket \`${ticketId}\``;
    }
  }
  
  if (command === '/tickets' || command === '/list') {
    const data = await getTicketsData();
    const { tickets, stats } = data;
    const openTickets = tickets.filter((t: any) => t.status === 'open');
    
    let response = `🎫 *GESTION DES TICKETS*\n\n`;
    response += `📊 *Résumé:*\n`;
    response += `• 🟢 Ouverts: ${stats.open}\n`;
    response += `• 🔴 Fermés: ${stats.closed}\n`;
    response += `• 📈 Total: ${stats.total}\n\n`;
    
    if (openTickets.length > 0) {
      response += `🟢 *Tickets ouverts:*\n`;
      openTickets.slice(0, 10).forEach((ticket: any) => {
        const priority = ticket.priority === 'urgent' ? '🚨' : ticket.priority === 'high' ? '🔴' : ticket.priority === 'medium' ? '🟡' : '🟢';
        response += `${priority} \`${ticket.id}\` - ${ticket.userName}\n`;
        response += `   "${ticket.subject}"\n`;
        response += `   📅 ${ticket.createdAt}\n\n`;
      });
      
      if (openTickets.length > 10) {
        response += `... et ${openTickets.length - 10} autres\n\n`;
      }
    }
    
    response += `💡 *Commandes:*\n`;
    response += `• \`/reply T1001 message\` - Répondre à un ticket\n`;
    response += `• \`/ticket T1001\` - Voir ticket\n`;
    response += `• \`/close T1001\` - Fermer ticket\n`;
    response += `• \`/reopen T1001\` - Rouvrir ticket\n`;
    response += `• \`/priority T1001 urgent\` - Changer priorité\n`;
    response += `• \`/stats\` - Statistiques détaillées`;
    
    return response;
  }
  
  if (command.startsWith('/ticket ')) {
    const ticketId = command.split(' ')[1]?.toUpperCase();
    const ticket = await getTicket(ticketId);
    
    if (!ticket) {
      return `❌ Ticket \`${ticketId}\` introuvable.\nUtilisez \`/tickets\` pour voir la liste.`;
    }
    
    const statusEmoji = ticket.status === 'open' ? '🟢' : ticket.status === 'closed' ? '🔴' : '🟡';
    const priorityEmoji = ticket.priority === 'urgent' ? '🚨' : ticket.priority === 'high' ? '🔴' : ticket.priority === 'medium' ? '🟡' : '🟢';
    
    let response = `🎫 *TICKET ${ticket.id}*\n\n`;
    response += `${statusEmoji} *Status:* ${ticket.status.toUpperCase()}\n`;
    response += `${priorityEmoji} *Priorité:* ${ticket.priority.toUpperCase()}\n`;
    response += `👤 *Client:* ${ticket.userName}\n`;
    if (ticket.userEmail) response += `📧 *Email:* ${ticket.userEmail}\n`;
    response += `📝 *Sujet:* ${ticket.subject}\n`;
    response += `📅 *Créé:* ${ticket.createdAt}\n`;
    response += `⏰ *Dernière activité:* ${ticket.lastActivity}\n\n`;
    
    response += `💬 *CONVERSATION:*\n`;
    ticket.messages.forEach((msg: any, index: number) => {
      const emoji = msg.sender === 'user' ? '👤' : '🎧';
      response += `${emoji} *${msg.sender === 'user' ? ticket.userName : 'Support'}* (${msg.timestamp}):\n`;
      response += `"${msg.text}"\n\n`;
    });
    
    response += `🛠️ *Actions:*\n`;
    response += `• \`/reply ${ticket.id} Votre réponse\` - Répondre\n`;
    if (ticket.status === 'open') {
      response += `• \`/close ${ticket.id}\` - Fermer le ticket\n`;
    } else {
      response += `• \`/reopen ${ticket.id}\` - Rouvrir le ticket\n`;
    }
    response += `• \`/priority ${ticket.id} urgent\` - Changer priorité`;
    
    return response;
  }
  
  if (command.startsWith('/close ')) {
    const ticketId = command.split(' ')[1]?.toUpperCase();
    const ticket = await getTicket(ticketId);
    
    if (!ticket) {
      return `❌ Ticket \`${ticketId}\` introuvable.`;
    }
    
    if (ticket.status === 'closed') {
      return `ℹ️ Le ticket \`${ticketId}\` est déjà fermé.`;
    }
    
    await updateTicketStatus(ticketId, 'closed');
    
    return `✅ Ticket \`${ticketId}\` fermé avec succès.\n👤 Client: ${ticket.userName}\n📝 Sujet: "${ticket.subject}"`;
  }
  
  if (command.startsWith('/reopen ')) {
    const ticketId = command.split(' ')[1]?.toUpperCase();
    const ticket = await getTicket(ticketId);
    
    if (!ticket) {
      return `❌ Ticket \`${ticketId}\` introuvable.`;
    }
    
    if (ticket.status === 'open') {
      return `ℹ️ Le ticket \`${ticketId}\` est déjà ouvert.`;
    }
    
    await updateTicketStatus(ticketId, 'open');
    
    return `🔓 Ticket \`${ticketId}\` rouvert avec succès.\n👤 Client: ${ticket.userName}`;
  }
  
  if (command.startsWith('/priority ')) {
    const parts = command.split(' ');
    const ticketId = parts[1]?.toUpperCase();
    const newPriority = parts[2]?.toLowerCase();
    
    if (!['low', 'medium', 'high', 'urgent'].includes(newPriority)) {
      return `❌ Priorité invalide. Utilisez: low, medium, high, urgent`;
    }
    
    const ticket = await getTicket(ticketId);
    if (!ticket) {
      return `❌ Ticket \`${ticketId}\` introuvable.`;
    }
    
    const oldPriority = ticket.priority;
    await updateTicketPriority(ticketId, newPriority as any);
    
    const priorityEmoji = newPriority === 'urgent' ? '🚨' : newPriority === 'high' ? '🔴' : newPriority === 'medium' ? '🟡' : '🟢';
    
    return `${priorityEmoji} Priorité du ticket \`${ticketId}\` changée de ${oldPriority} → *${newPriority}*`;
  }
  
  if (command === '/stats') {
    const data = await getTicketsData();
    const { tickets, stats } = data;
    const urgentTickets = tickets.filter((t: any) => t.priority === 'urgent' && t.status === 'open');
    const oldTickets = tickets.filter((t: any) => {
      const created = new Date(t.createdAt);
      const daysDiff = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff > 7 && t.status === 'open';
    });
    
    let response = `📊 *STATISTIQUES DÉTAILLÉES*\n\n`;
    response += `🎫 *Tickets totaux:* ${stats.total}\n`;
    response += `🟢 *Ouverts:* ${stats.open}\n`;
    response += `🔴 *Fermés:* ${stats.closed}\n`;
    response += `🚨 *Urgents:* ${stats.urgent}\n`;
    response += `⏰ *Anciens (>7j):* ${oldTickets.length}\n\n`;
    
    if (urgentTickets.length > 0) {
      response += `🚨 *Tickets urgents:*\n`;
      urgentTickets.forEach((ticket: any) => {
        response += `• \`${ticket.id}\` - ${ticket.userName}\n`;
      });
      response += `\n`;
    }
    
    response += `💡 *Actions recommandées:*\n`;
    if (urgentTickets.length > 0) response += `• Traiter les ${urgentTickets.length} tickets urgents\n`;
    if (oldTickets.length > 0) response += `• Vérifier les ${oldTickets.length} tickets anciens\n`;
    if (stats.open === 0) response += `• 🎉 Tous les tickets sont traités !\n`;
    
    return response;
  }
  
  if (command === '/help') {
    return `🤖 *AIDE - GESTION TICKETS*\n\n` +
           `📋 *Commandes principales:*\n` +
           `• \`/reply T1001 message\` - Répondre à un ticket\n` +
           `• \`/tickets\` - Liste des tickets\n` +
           `• \`/ticket T1001\` - Détails d'un ticket\n` +
           `• \`/close T1001\` - Fermer un ticket\n` +
           `• \`/reopen T1001\` - Rouvrir un ticket\n` +
           `• \`/priority T1001 urgent\` - Changer priorité\n` +
           `• \`/stats\` - Statistiques détaillées\n\n` +
           `📝 *Priorités disponibles:*\n` +
           `• \`low\` 🟢 - Faible\n` +
           `• \`medium\` 🟡 - Moyenne\n` +
           `• \`high\` 🔴 - Élevée\n` +
           `• \`urgent\` 🚨 - Urgente\n\n` +
           `💡 *Exemples:*\n` +
           `• \`/reply T1001 Bonjour ! Je peux vous aider ?\`\n` +
           `• \`/close T1001\`\n` +
           `• \`/priority T1001 urgent\``;
  }
  
  return null; // Pas une commande reconnue
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Vérifier que c'est bien notre bot
    if (!body.message || !TELEGRAM_BOT_TOKEN) {
      return NextResponse.json({ ok: true });
    }

    const message = body.message;
    const chatId = message.chat.id.toString();
    const text = message.text;
    const fromUser = message.from;

    // Ignorer les messages du bot lui-même et le /start
    if (message.from.is_bot || text?.startsWith('/start')) {
      return NextResponse.json({ ok: true });
    }

    console.log('📨 Message reçu de Telegram:');
    console.log(`👤 De: ${fromUser.first_name} ${fromUser.last_name || ''}`);
    console.log(`💬 Message: ${text}`);
    console.log(`🆔 Chat ID: ${chatId}`);

    // Vérifier si c'est une commande pour la gestion des tickets
    if (text?.startsWith('/')) {
      const response = await handleTelegramCommand(text, fromUser);
      if (response) {
        await sendTelegramMessage(response, chatId);
        return NextResponse.json({ ok: true });
      }
    }

    // Si ce n'est pas une commande, c'est une réponse support générale
    // (Pour les gens qui répondent sans /reply)
    const data = await getTicketsData();
    const openTickets = data.tickets.filter((t: any) => t.status === 'open');
    
    if (openTickets.length === 1) {
      // S'il n'y a qu'un seul ticket ouvert, on associe automatiquement
      const ticket = openTickets[0];
      await addMessageToTicket(ticket.id, text, 'support');
      
      await sendTelegramMessage(
        `✅ Réponse automatiquement associée au ticket \`${ticket.id}\` (${ticket.userName})\n\n` +
        `💡 Pour être plus précis, utilisez: \`/reply ${ticket.id} votre message\``,
        chatId
      );
    } else if (openTickets.length > 1) {
      // S'il y a plusieurs tickets, demander de préciser
      await sendTelegramMessage(
        `❓ Plusieurs tickets ouverts (${openTickets.length}). Précisez avec:\n\n` +
        `\`/reply T1001 votre message\`\n\n` +
        `📋 Ou tapez \`/tickets\` pour voir la liste`,
        chatId
      );
    } else {
      // Aucun ticket ouvert, réponse générale
      await sendTelegramMessage(
        `ℹ️ Aucun ticket ouvert. Votre message a été enregistré comme réponse générale.\n\n` +
        `📋 Tapez \`/tickets\` pour voir les tickets fermés`,
        chatId
      );
    }
    
    // Enregistrer le message comme réponse support dans le système de chat
    try {
      const baseUrl = process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : 'http://localhost:3000';
        
      await fetch(`${baseUrl}/api/chat-messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          sender: 'support'
        })
      });
    } catch (error) {
      console.error('Erreur enregistrement message:', error);
    }
    
    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('❌ Erreur webhook Telegram:', error);
    return NextResponse.json({ ok: true }); // Toujours répondre OK à Telegram
  }
}

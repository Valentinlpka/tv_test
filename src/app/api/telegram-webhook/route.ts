import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Base de données simple en mémoire pour les tickets (en production: vraie DB)
let tickets: Array<{
  id: string;
  userName: string;
  userEmail?: string;
  status: 'open' | 'closed' | 'pending';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  subject: string;
  messages: Array<{
    text: string;
    sender: 'user' | 'support';
    timestamp: string;
  }>;
  createdAt: string;
  lastActivity: string;
}> = [];

let ticketCounter = 1000;

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
  
  if (command === '/tickets' || command === '/list') {
    const openTickets = tickets.filter(t => t.status === 'open');
    const closedTickets = tickets.filter(t => t.status === 'closed');
    
    let response = `🎫 *GESTION DES TICKETS*\n\n`;
    response += `📊 *Résumé:*\n`;
    response += `• 🟢 Ouverts: ${openTickets.length}\n`;
    response += `• 🔴 Fermés: ${closedTickets.length}\n`;
    response += `• 📈 Total: ${tickets.length}\n\n`;
    
    if (openTickets.length > 0) {
      response += `🟢 *Tickets ouverts:*\n`;
      openTickets.slice(0, 10).forEach(ticket => {
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
    response += `• \`/ticket T1001\` - Voir ticket\n`;
    response += `• \`/close T1001\` - Fermer ticket\n`;
    response += `• \`/reopen T1001\` - Rouvrir ticket\n`;
    response += `• \`/priority T1001 urgent\` - Changer priorité\n`;
    response += `• \`/stats\` - Statistiques détaillées`;
    
    return response;
  }
  
  if (command.startsWith('/ticket ')) {
    const ticketId = command.split(' ')[1]?.toUpperCase();
    const ticket = tickets.find(t => t.id === ticketId);
    
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
    ticket.messages.forEach((msg, index) => {
      const emoji = msg.sender === 'user' ? '👤' : '🎧';
      response += `${emoji} *${msg.sender === 'user' ? ticket.userName : 'Support'}* (${msg.timestamp}):\n`;
      response += `"${msg.text}"\n\n`;
    });
    
    response += `🛠️ *Actions:*\n`;
    if (ticket.status === 'open') {
      response += `• \`/close ${ticket.id}\` - Fermer le ticket\n`;
    } else {
      response += `• \`/reopen ${ticket.id}\` - Rouvrir le ticket\n`;
    }
    response += `• \`/priority ${ticket.id} urgent\` - Changer priorité\n`;
    response += `• Répondez directement pour ajouter un message`;
    
    return response;
  }
  
  if (command.startsWith('/close ')) {
    const ticketId = command.split(' ')[1]?.toUpperCase();
    const ticket = tickets.find(t => t.id === ticketId);
    
    if (!ticket) {
      return `❌ Ticket \`${ticketId}\` introuvable.`;
    }
    
    if (ticket.status === 'closed') {
      return `ℹ️ Le ticket \`${ticketId}\` est déjà fermé.`;
    }
    
    ticket.status = 'closed';
    ticket.lastActivity = new Date().toLocaleString('fr-FR');
    
    return `✅ Ticket \`${ticketId}\` fermé avec succès.\n👤 Client: ${ticket.userName}\n📝 Sujet: "${ticket.subject}"`;
  }
  
  if (command.startsWith('/reopen ')) {
    const ticketId = command.split(' ')[1]?.toUpperCase();
    const ticket = tickets.find(t => t.id === ticketId);
    
    if (!ticket) {
      return `❌ Ticket \`${ticketId}\` introuvable.`;
    }
    
    if (ticket.status === 'open') {
      return `ℹ️ Le ticket \`${ticketId}\` est déjà ouvert.`;
    }
    
    ticket.status = 'open';
    ticket.lastActivity = new Date().toLocaleString('fr-FR');
    
    return `🔓 Ticket \`${ticketId}\` rouvert avec succès.\n👤 Client: ${ticket.userName}`;
  }
  
  if (command.startsWith('/priority ')) {
    const parts = command.split(' ');
    const ticketId = parts[1]?.toUpperCase();
    const newPriority = parts[2]?.toLowerCase();
    
    if (!['low', 'medium', 'high', 'urgent'].includes(newPriority)) {
      return `❌ Priorité invalide. Utilisez: low, medium, high, urgent`;
    }
    
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) {
      return `❌ Ticket \`${ticketId}\` introuvable.`;
    }
    
    const oldPriority = ticket.priority;
    ticket.priority = newPriority as any;
    ticket.lastActivity = new Date().toLocaleString('fr-FR');
    
    const priorityEmoji = newPriority === 'urgent' ? '🚨' : newPriority === 'high' ? '🔴' : newPriority === 'medium' ? '🟡' : '🟢';
    
    return `${priorityEmoji} Priorité du ticket \`${ticketId}\` changée de ${oldPriority} → *${newPriority}*`;
  }
  
  if (command === '/stats') {
    const openTickets = tickets.filter(t => t.status === 'open');
    const closedTickets = tickets.filter(t => t.status === 'closed');
    const urgentTickets = tickets.filter(t => t.priority === 'urgent' && t.status === 'open');
    const oldTickets = tickets.filter(t => {
      const created = new Date(t.createdAt);
      const daysDiff = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff > 7 && t.status === 'open';
    });
    
    let response = `📊 *STATISTIQUES DÉTAILLÉES*\n\n`;
    response += `🎫 *Tickets totaux:* ${tickets.length}\n`;
    response += `🟢 *Ouverts:* ${openTickets.length}\n`;
    response += `🔴 *Fermés:* ${closedTickets.length}\n`;
    response += `🚨 *Urgents:* ${urgentTickets.length}\n`;
    response += `⏰ *Anciens (>7j):* ${oldTickets.length}\n\n`;
    
    if (urgentTickets.length > 0) {
      response += `🚨 *Tickets urgents:*\n`;
      urgentTickets.forEach(ticket => {
        response += `• \`${ticket.id}\` - ${ticket.userName}\n`;
      });
      response += `\n`;
    }
    
    response += `💡 *Actions recommandées:*\n`;
    if (urgentTickets.length > 0) response += `• Traiter les ${urgentTickets.length} tickets urgents\n`;
    if (oldTickets.length > 0) response += `• Vérifier les ${oldTickets.length} tickets anciens\n`;
    if (openTickets.length === 0) response += `• 🎉 Tous les tickets sont traités !\n`;
    
    return response;
  }
  
  if (command === '/help') {
    return `🤖 *AIDE - GESTION TICKETS*\n\n` +
           `📋 *Commandes principales:*\n` +
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
           `💡 Répondez directement aux messages pour communiquer avec les clients.`;
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

    // Ignorer les messages du bot lui-même
    if (message.from.is_bot) {
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

    // Si ce n'est pas une commande, c'est peut-être une réponse à un ticket
    // Pour simplifier, on considère que tous les messages non-commandes sont des réponses générales
    
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

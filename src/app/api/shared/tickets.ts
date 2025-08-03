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
  userHash?: string; // Pour lier les chats
}> = [];

let ticketCounter = 1000;
const activeChats = new Map<string, string>(); // userHash -> ticketId

// Créer un nouveau ticket
export function createTicket(userName: string, message: string, userInfo: any): string {
  const ticketId = `T${ticketCounter++}`;
  
  const newTicket = {
    id: ticketId,
    userName,
    userEmail: userInfo.userEmail,
    status: 'open' as const,
    priority: 'medium' as const,
    subject: message.slice(0, 50) + (message.length > 50 ? '...' : ''),
    messages: [{
      text: message,
      sender: 'user' as const,
      timestamp: new Date().toLocaleString('fr-FR')
    }],
    createdAt: new Date().toLocaleString('fr-FR'),
    lastActivity: new Date().toLocaleString('fr-FR'),
    userHash: userInfo.userHash
  };
  
  tickets.push(newTicket);
  console.log(`🎫 Nouveau ticket créé: ${ticketId} pour ${userName}`);
  return ticketId;
}

// Ajouter un message à un ticket existant
export function addMessageToTicket(ticketId: string, message: string, sender: 'user' | 'support'): boolean {
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) return false;
  
  ticket.messages.push({
    text: message,
    sender,
    timestamp: new Date().toLocaleString('fr-FR')
  });
  ticket.lastActivity = new Date().toLocaleString('fr-FR');
  
  return true;
}

// Récupérer un ticket par ID
export function getTicket(ticketId: string) {
  return tickets.find(t => t.id === ticketId);
}

// Récupérer tous les tickets
export function getAllTickets() {
  return tickets;
}

// Changer le statut d'un ticket
export function updateTicketStatus(ticketId: string, status: 'open' | 'closed' | 'pending'): boolean {
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) return false;
  
  ticket.status = status;
  ticket.lastActivity = new Date().toLocaleString('fr-FR');
  return true;
}

// Changer la priorité d'un ticket
export function updateTicketPriority(ticketId: string, priority: 'low' | 'medium' | 'high' | 'urgent'): boolean {
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) return false;
  
  ticket.priority = priority;
  ticket.lastActivity = new Date().toLocaleString('fr-FR');
  return true;
}

// Gestion des chats actifs
export function getActiveChat(userHash: string): string | undefined {
  return activeChats.get(userHash);
}

export function setActiveChat(userHash: string, ticketId: string): void {
  activeChats.set(userHash, ticketId);
}

// Exporter les données pour debug
export function getTicketsData() {
  return { tickets, activeChats: Object.fromEntries(activeChats) };
} 
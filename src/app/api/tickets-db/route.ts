import { NextRequest, NextResponse } from 'next/server';

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
  userHash?: string;
}> = [];

let ticketCounter = 1000;
const activeChats = new Map<string, string>();

// GET - Récupérer tous les tickets ou un ticket spécifique
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ticketId = searchParams.get('id');
  const action = searchParams.get('action');
  const userHash = searchParams.get('userHash');
  
  if (action === 'active_chat' && userHash) {
    return NextResponse.json({ ticketId: activeChats.get(userHash) || null });
  }
  
  if (ticketId) {
    const ticket = tickets.find(t => t.id === ticketId.toUpperCase());
    return NextResponse.json({ ticket });
  }
  
  return NextResponse.json({ 
    tickets,
    activeChats: Object.fromEntries(activeChats),
    stats: {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      closed: tickets.filter(t => t.status === 'closed').length,
      urgent: tickets.filter(t => t.priority === 'urgent' && t.status === 'open').length
    }
  });
}

// POST - Créer un ticket ou ajouter une action
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;
    
    switch (action) {
      case 'create_ticket': {
        const { userName, message, userInfo } = data;
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
        if (userInfo.userHash) {
          activeChats.set(userInfo.userHash, ticketId);
        }
        
        console.log(`🎫 Nouveau ticket créé: ${ticketId} pour ${userName}`);
        return NextResponse.json({ success: true, ticketId, isNewTicket: true });
      }
      
      case 'add_message': {
        const { ticketId, message, sender } = data;
        const ticket = tickets.find(t => t.id === ticketId);
        if (!ticket) {
          return NextResponse.json({ success: false, error: 'Ticket non trouvé' });
        }
        
        ticket.messages.push({
          text: message,
          sender,
          timestamp: new Date().toLocaleString('fr-FR')
        });
        ticket.lastActivity = new Date().toLocaleString('fr-FR');
        
        return NextResponse.json({ success: true });
      }
      
      case 'update_status': {
        const { ticketId, status } = data;
        const ticket = tickets.find(t => t.id === ticketId);
        if (!ticket) {
          return NextResponse.json({ success: false, error: 'Ticket non trouvé' });
        }
        
        ticket.status = status;
        ticket.lastActivity = new Date().toLocaleString('fr-FR');
        
        return NextResponse.json({ success: true });
      }
      
      case 'update_priority': {
        const { ticketId, priority } = data;
        const ticket = tickets.find(t => t.id === ticketId);
        if (!ticket) {
          return NextResponse.json({ success: false, error: 'Ticket non trouvé' });
        }
        
        ticket.priority = priority;
        ticket.lastActivity = new Date().toLocaleString('fr-FR');
        
        return NextResponse.json({ success: true });
      }
      
      case 'set_active_chat': {
        const { userHash, ticketId } = data;
        activeChats.set(userHash, ticketId);
        return NextResponse.json({ success: true });
      }
      
      default:
        return NextResponse.json({ success: false, error: 'Action non reconnue' });
    }
    
  } catch (error) {
    console.error('Erreur API tickets-db:', error);
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
  }
} 
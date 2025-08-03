import { NextRequest, NextResponse } from 'next/server';

// Stockage simple en mémoire pour les messages (en production, utiliser une vraie DB)
let chatMessages: Array<{
  id: string;
  text: string;
  sender: 'user' | 'support';
  time: string;
  timestamp: number;
}> = [];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const since = parseInt(searchParams.get('since') || '0');
  
  // Retourner les messages plus récents que 'since'
  const newMessages = chatMessages.filter(msg => msg.timestamp > since);
  
  return NextResponse.json({
    messages: newMessages,
    timestamp: Date.now()
  });
}

export async function POST(request: NextRequest) {
  try {
    const { message, sender } = await request.json();
    
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: sender as 'user' | 'support',
      time: new Date().toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      timestamp: Date.now()
    };
    
    chatMessages.push(newMessage);
    
    // Garder seulement les 50 derniers messages pour éviter la surcharge mémoire
    if (chatMessages.length > 50) {
      chatMessages = chatMessages.slice(-50);
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('❌ Erreur chat messages:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
} 
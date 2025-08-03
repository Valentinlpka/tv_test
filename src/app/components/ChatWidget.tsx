'use client';
import { useEffect, useRef, useState } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Bonjour ! Je suis là pour vous aider. Posez-moi vos questions sur nos offres IPTV !",
      sender: "support",
      time: "Maintenant"
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [hasSetName, setHasSetName] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastTimestamp, setLastTimestamp] = useState(Date.now());
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [isNewTicket, setIsNewTicket] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Polling pour récupérer les nouvelles réponses de Telegram
  useEffect(() => {
    if (!isOpen) return;

    const pollForMessages = async () => {
      try {
        const response = await fetch(`/api/chat-messages?since=${lastTimestamp}`);
        const data = await response.json();
        
        if (data.messages && data.messages.length > 0) {
          setMessages(prev => [...prev, ...data.messages]);
          setLastTimestamp(data.timestamp);
        }
      } catch (error) {
        console.error('Erreur polling messages:', error);
      }
    };

    // Poll toutes les 2 secondes quand le chat est ouvert
    pollingRef.current = setInterval(pollForMessages, 2000);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [isOpen, lastTimestamp]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Si l'utilisateur n'a pas encore défini de nom, on utilise ce qu'il a écrit ou "Visiteur anonyme"
    const finalUserName = userName.trim() || 'Visiteur anonyme';
    if (!hasSetName) {
      setHasSetName(true);
    }

    const userMsg = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      time: new Date().toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Envoyer le message vers l'API (qui transmettra au bot Telegram)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: newMessage,
          userName: finalUserName,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          page: window.location.pathname
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Enregistrer les informations du ticket
        if (result.ticketId && !ticketId) {
          setTicketId(result.ticketId);
          setIsNewTicket(result.isNewTicket);
        }

        // Enregistrer le message utilisateur dans notre système
        await fetch('/api/chat-messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userMsg.text,
            sender: 'user'
          }),
        });

        // Message de confirmation automatique avec info ticket
        setTimeout(() => {
          let confirmationText = "";
          
          if (result.message.includes('développement')) {
            confirmationText = "✅ Message reçu en mode test ! (Telegram non configuré)";
          } else {
            confirmationText = `✅ Message envoyé ! ${result.isNewTicket ? '🎫 Nouveau ticket créé.' : 'Ticket mis à jour.'}`;
            if (result.ticketId) {
              confirmationText += `\nNuméro: ${result.ticketId}`;
            }
          }
          
          const autoReply = {
            id: Date.now() + 1,
            text: confirmationText,
            sender: "support",
            time: new Date().toLocaleTimeString('fr-FR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })
          };
          setMessages(prev => [...prev, autoReply]);
        }, 1000);
      } else {
        throw new Error(result.error || 'Erreur inconnue');
      }
    } catch (error) {
      console.error('Erreur envoi message:', error);
      const errorMsg = {
        id: Date.now() + 1,
        text: "❌ Problème de connexion. Le service sera bientôt disponible !",
        sender: "support", 
        time: new Date().toLocaleTimeString('fr-FR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setNewMessage('');
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSetName(true);
    const welcomeMsg = {
      id: Date.now(),
      text: `Parfait ${userName || 'cher visiteur'} ! Comment puis-je vous aider aujourd'hui ?`,
      sender: "support",
      time: new Date().toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    setMessages(prev => [...prev, welcomeMsg]);
  };

  return (
    <>
      {/* Bouton flottant */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 pulse-glow"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">💬</span>
              <span className="hidden md:block font-semibold">Chat Support</span>
            </div>
            {/* Badge de notification */}
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center blink">
              1
            </div>
          </button>
        )}
      </div>

      {/* Widget de chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-black/90 border border-white/20 rounded-xl shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-t-xl flex justify-between items-center">
            <div>
              <h3 className="text-white font-semibold">💬 Support StreamPro+</h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-blue-100">🟢 En ligne - Réponse rapide</span>
                {ticketId && (
                  <span className="bg-white/20 px-2 py-1 rounded text-blue-100">
                    🎫 {ticketId}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">{message.time}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Formulaire d'envoi */}
          <div className="p-4 border-t border-white/10">
            {!hasSetName && (
              <div className="mb-3">
                <form onSubmit={handleNameSubmit}>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Votre prénom (optionnel)"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
                    />
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs"
                    >
                      OK
                    </button>
                  </div>
                </form>
                <p className="text-xs text-gray-400 mt-1">Appuyez sur OK ou commencez directement à écrire</p>
              </div>
            )}
            
            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Tapez votre message..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
              />
              <button
                type="submit"
                disabled={isLoading || !newMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                📤
              </button>
            </form>
            
            <p className="text-xs text-gray-400 mt-2 text-center">
              🔒 Sécurisé • 🔄 Temps réel • 🎫 Ticket automatique
            </p>
          </div>
        </div>
      )}
    </>
  );
} 
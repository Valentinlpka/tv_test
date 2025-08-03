import ChatWidget from "./components/ChatWidget";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header avec navigation */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">StreamPro+</div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-blue-400 transition-colors">Accueil</a>
            <a href="/chaines" className="hover:text-blue-400 transition-colors">Chaînes</a>
            <a href="/prix" className="hover:text-blue-400 transition-colors">Prix</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
          </nav>
          <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold blink">
            PROMO 90%
          </div>
        </div>
      </header>

      {/* Hero Section avec pièges */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="floating">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            StreamPro+ Premium
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            🔥 OFFRE LIMITÉE : Plus de 50 000 chaînes HD/4K du monde entier
          </p>
        </div>
        
        {/* Faux compteur d'urgence */}
        <div className="bg-red-600/20 border border-red-500 rounded-lg p-4 mb-8 max-w-md mx-auto">
          <div className="text-red-300 text-sm font-semibold">⏰ OFFRE EXPIRE DANS :</div>
          <div className="text-red-100 text-2xl font-mono font-bold">02:47:33</div>
          <div className="text-red-300 text-xs">Plus que 47 places disponibles !</div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="text-left">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Pourquoi choisir StreamPro+ ?
            </h2>
            <ul className="space-y-3 text-blue-100">
              <li className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                50 000+ chaînes mondiales en HD/4K
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Films et séries illimités
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Sport en direct (Ligue 1, Premier League...)
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Compatible tous appareils
              </li>
              <li className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Assistance 24h/7j
              </li>
            </ul>
            
            <div className="mt-6">
              <a 
                href="/chaines" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center"
              >
                📺 Découvrir tous nos bouquets
              </a>
            </div>
          </div>
          
          {/* Fausse capture d'écran */}
          <div className="bg-black/40 rounded-lg p-4 border border-purple-500/30">
            <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 rounded flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📺</div>
                <div className="text-lg font-semibold">Interface StreamPro+</div>
                <div className="text-sm text-blue-300">50 000+ chaînes disponibles</div>
              </div>
            </div>
          </div>
        </div>

        {/* Prix suspects */}
        <div className="bg-black/30 rounded-xl p-8 mb-12 border border-purple-500/30">
          <h3 className="text-3xl font-bold mb-6 text-white">Tarifs Exceptionnels</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600">
              <div className="text-lg font-semibold text-gray-300">Découverte</div>
              <div className="text-gray-400 line-through text-lg">49,99€</div>
              <div className="text-4xl font-bold text-blue-400 mb-2">10€</div>
              <div className="text-sm text-gray-400 mb-4">/mois</div>
              <div className="text-sm text-gray-300">Tous les bouquets</div>
            </div>
            
            <div className="bg-purple-800/30 rounded-lg p-6 border-2 border-purple-400 pulse-glow relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                POPULAIRE
              </div>
              <div className="text-lg font-semibold text-purple-300">6 Mois</div>
              <div className="text-gray-400 line-through text-lg">299,99€</div>
              <div className="text-4xl font-bold text-purple-400 mb-2">30€</div>
              <div className="text-sm text-gray-400 mb-4">soit 5€/mois</div>
              <div className="text-sm text-purple-300">Meilleur rapport qualité/prix</div>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-6 border border-yellow-400">
              <div className="text-lg font-semibold text-yellow-300">12 Mois</div>
              <div className="text-gray-400 line-through text-lg">599,99€</div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">50€</div>
              <div className="text-sm text-gray-400 mb-4">soit 4,17€/mois</div>
              <div className="text-sm text-yellow-300">Économie maximale</div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <a 
              href="/prix" 
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:opacity-90 text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center font-semibold"
            >
              💰 Voir tous nos tarifs
            </a>
          </div>
        </div>

        {/* Témoignages suspects */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold mb-8 text-white">Témoignages Clients</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-black/30 rounded-lg p-6 border border-blue-500/30">
              <div className="text-yellow-400 mb-2">★★★★★</div>
              <p className="text-sm text-blue-100 mb-4">
                "Incroyable ! J'ai accès à toutes les chaînes du monde pour presque rien. Merci StreamPro+ !"
              </p>
              <div className="text-xs text-gray-400">- Marc D., Paris</div>
            </div>
            
            <div className="bg-black/30 rounded-lg p-6 border border-purple-500/30">
              <div className="text-yellow-400 mb-2">★★★★★</div>
              <p className="text-sm text-purple-100 mb-4">
                "Enfin un service qui tient ses promesses ! Qualité 4K parfaite, jamais de coupures."
              </p>
              <div className="text-xs text-gray-400">- Sophie L., Lyon</div>
            </div>
            
            <div className="bg-black/30 rounded-lg p-6 border border-green-500/30">
              <div className="text-yellow-400 mb-2">★★★★★</div>
              <p className="text-sm text-green-100 mb-4">
                "J'ai économisé plus de 1000€ par an ! Tous mes amis sont jaloux."
              </p>
              <div className="text-xs text-gray-400">- Thomas B., Marseille</div>
            </div>
          </div>
        </div>

        {/* Call to action agressif */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-xl p-8 text-center">
          <h3 className="text-3xl font-bold mb-4 text-white">⚡ DERNIÈRE CHANCE ⚡</h3>
          <p className="text-xl mb-6">Profitez de -90% avant que l'offre expire !</p>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105 pulse-glow mb-4">
            🚀 COMMANDER MAINTENANT - 10€
          </button>
          <div className="text-sm text-pink-100">
            ✅ Activation instantanée • ✅ Garantie satisfait ou remboursé • ✅ Support 24h/7j
          </div>
        </div>
      </section>

      {/* Footer minimaliste (suspect) */}
      <footer className="bg-black/40 border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="text-gray-400 text-sm">
            © 2024 StreamPro+. Tous droits réservés.
            <span className="block mt-2 text-xs text-gray-500">
              Site de démonstration à des fins éducatives - Ne pas utiliser pour de vrais achats
            </span>
          </div>
          <div className="mt-4">
            <a 
              href="/analyse" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              🔍 Analyser les pièges de ce site
            </a>
          </div>
        </div>
      </footer>

      {/* Widget de chat */}
      <ChatWidget />
    </div>
  );
}

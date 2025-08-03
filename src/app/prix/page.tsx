export default function Prix() {
  const offres = [
    {
      id: 'mensuel',
      nom: 'Découverte',
      duree: '1 Mois',
      prix: 10,
      prixBarre: 49.99,
      couleur: 'from-blue-600 to-blue-700',
      borderColor: 'border-blue-500',
      badge: null,
      economie: '-80%',
      description: 'Parfait pour essayer',
      avantages: [
        'Accès à tous les bouquets',
        '50 000+ chaînes HD/4K',
        'Support client 24h/7j',
        'Compatible tous appareils',
        'Activation instantanée'
      ]
    },
    {
      id: 'semestriel',
      nom: 'Populaire',
      duree: '6 Mois',
      prix: 30,
      prixBarre: 299.99,
      couleur: 'from-purple-600 to-purple-700',
      borderColor: 'border-purple-400',
      badge: 'PLUS POPULAIRE',
      badgeColor: 'bg-red-600',
      economie: '-90%',
      description: 'Le meilleur rapport qualité/prix',
      avantages: [
        'Tout du pack Découverte',
        'Contenu VOD illimité',
        'Catch-up TV 7 jours',
        'Enregistrement cloud',
        'Support prioritaire',
        'Garantie satisfait ou remboursé'
      ]
    },
    {
      id: 'annuel',
      nom: 'Premium',
      duree: '12 Mois',
      prix: 50,
      prixBarre: 599.99,
      couleur: 'from-yellow-500 to-yellow-600',
      borderColor: 'border-yellow-400',
      badge: 'MEILLEURE VALEUR',
      badgeColor: 'bg-green-600',
      economie: '-92%',
      description: 'Maximum d\'économies',
      avantages: [
        'Tout du pack Populaire',
        'Accès VIP exclusif',
        'Nouvelles chaînes en avant-première',
        'Multi-connexions (5 appareils)',
        'Support dédié',
        'Bonus : Films en avant-première'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">StreamPro+</div>
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="hover:text-blue-400 transition-colors">Accueil</a>
            <a href="/chaines" className="hover:text-blue-400 transition-colors">Chaînes</a>
            <a href="/prix" className="text-blue-400 font-semibold">Prix</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
          </nav>
          <a href="/" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
            ← Retour
          </a>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="floating">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              💰 Nos Tarifs Exceptionnels
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              🔥 PROMO LIMITÉE : Jusqu'à -92% sur nos abonnements premium !
            </p>
          </div>

          {/* Faux compteur d'urgence */}
          <div className="bg-red-600/20 border border-red-500 rounded-lg p-4 mb-8 max-w-lg mx-auto">
            <div className="text-red-300 text-sm font-semibold">⏰ OFFRE EXPIRE DANS :</div>
            <div className="text-red-100 text-3xl font-mono font-bold">01:23:45</div>
            <div className="text-red-300 text-xs">Ne ratez pas cette opportunité unique !</div>
          </div>

          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg p-4 mb-8 border border-green-500/30">
            <div className="text-green-300 font-semibold mb-2">✨ GARANTIES INCLUSES</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-100">
              <div>🔒 Paiement 100% sécurisé</div>
              <div>↩️ Satisfait ou remboursé 30j</div>
              <div>⚡ Activation en moins de 5 minutes</div>
            </div>
          </div>
        </section>

        {/* Grille des prix */}
        <section className="mb-12">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {offres.map((offre, index) => (
              <div 
                key={offre.id}
                className={`bg-black/30 rounded-xl p-8 border-2 ${offre.borderColor} relative hover:scale-105 transition-all duration-300 ${offre.id === 'semestriel' ? 'pulse-glow' : ''}`}
              >
                {/* Badge */}
                {offre.badge && (
                  <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 ${offre.badgeColor} text-white text-xs px-4 py-2 rounded-full font-bold`}>
                    {offre.badge}
                  </div>
                )}

                {/* En-tête de l'offre */}
                <div className="text-center mb-6">
                  <div className={`bg-gradient-to-r ${offre.couleur} rounded-lg p-4 mb-4`}>
                    <h3 className="text-2xl font-bold text-white mb-1">{offre.nom}</h3>
                    <p className="text-white/90 text-sm">{offre.description}</p>
                  </div>

                  {/* Prix */}
                  <div className="mb-4">
                    <div className="text-gray-400 line-through text-lg">{offre.prixBarre}€</div>
                    <div className="text-5xl font-bold text-white mb-2">{offre.prix}€</div>
                    <div className="text-sm text-gray-300">pour {offre.duree}</div>
                    <div className={`inline-block bg-red-600 text-white text-xs px-2 py-1 rounded-full mt-2 font-semibold`}>
                      ÉCONOMIE {offre.economie}
                    </div>
                  </div>

                  {/* Prix par mois */}
                  <div className="text-center mb-6">
                    <div className="text-gray-400 text-sm">
                      Soit seulement <span className="text-green-400 font-semibold">
                        {(offre.prix / (offre.duree === '1 Mois' ? 1 : offre.duree === '6 Mois' ? 6 : 12)).toFixed(2)}€/mois
                      </span>
                    </div>
                  </div>
                </div>

                {/* Avantages */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">✨ Inclus dans cette offre :</h4>
                  <ul className="space-y-3">
                    {offre.avantages.map((avantage, idx) => (
                      <li key={idx} className="flex items-start text-sm text-white/90">
                        <span className="text-green-400 mr-2 mt-0.5">✓</span>
                        {avantage}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bouton CTA */}
                <button className={`w-full bg-gradient-to-r ${offre.couleur} hover:opacity-90 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 mb-4`}>
                  🚀 CHOISIR CETTE OFFRE
                </button>

                <div className="text-center text-xs text-gray-400">
                  Activation automatique après paiement
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparatif des économies */}
        <section className="mb-12">
          <div className="bg-black/30 rounded-xl p-8 border border-green-500/30">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              💡 Calculateur d'Économies
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-blue-300 text-lg font-semibold mb-2">📊 Par rapport à Netflix + Canal+</div>
                <div className="text-3xl font-bold text-green-400 mb-2">-85%</div>
                <div className="text-blue-100 text-sm">
                  Vous économisez plus de 500€ par an !
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-purple-300 text-lg font-semibold mb-2">📈 Vs. Bouquets TV traditionnels</div>
                <div className="text-3xl font-bold text-green-400 mb-2">-90%</div>
                <div className="text-purple-100 text-sm">
                  10x plus de contenu pour 10x moins cher !
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-yellow-300 text-lg font-semibold mb-2">🎯 Comparé aux cinémas</div>
                <div className="text-3xl font-bold text-green-400 mb-2">-95%</div>
                <div className="text-yellow-100 text-sm">
                  L'équivalent de 1000+ places de cinéma !
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Méthodes de paiement */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            💳 Paiement Sécurisé & Facile
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {[
              { nom: 'Visa', icone: '💳' },
              { nom: 'Mastercard', icone: '💳' },
              { nom: 'PayPal', icone: '🅿️' },
              { nom: 'Apple Pay', icone: '📱' },
              { nom: 'Google Pay', icone: '🔵' },
              { nom: 'Virement', icone: '🏦' }
            ].map((paiement, index) => (
              <div 
                key={index}
                className="bg-black/30 rounded-lg p-4 border border-white/10 text-center hover:border-white/20 transition-all"
              >
                <div className="text-2xl mb-2">{paiement.icone}</div>
                <div className="text-xs text-white/90">{paiement.nom}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <div className="bg-green-600/20 border border-green-500 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-green-100 text-sm">
                🔒 <strong>Paiement SSL 256-bit</strong> - Vos données sont protégées
              </p>
            </div>
          </div>
        </section>

        {/* FAQ suspecte */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            ❓ Questions Fréquentes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-black/30 rounded-lg p-6 border border-blue-500/30">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">Est-ce vraiment légal ?</h3>
              <p className="text-blue-100 text-sm">
                Bien sûr ! Nous respectons toutes les réglementations en vigueur. 
                Notre service est 100% légal et sécurisé.
              </p>
            </div>
            
            <div className="bg-black/30 rounded-lg p-6 border border-purple-500/30">
              <h3 className="text-lg font-semibold text-purple-300 mb-3">Puis-je annuler à tout moment ?</h3>
              <p className="text-purple-100 text-sm">
                Absolument ! Aucun engagement. Vous pouvez résilier votre abonnement 
                à tout moment depuis votre espace client.
              </p>
            </div>
            
            <div className="bg-black/30 rounded-lg p-6 border border-green-500/30">
              <h3 className="text-lg font-semibold text-green-300 mb-3">Quelle est la qualité des flux ?</h3>
              <p className="text-green-100 text-sm">
                Qualité HD/4K garantie ! Nos serveurs haute performance assurent 
                un streaming parfait sans interruption.
              </p>
            </div>
            
            <div className="bg-black/30 rounded-lg p-6 border border-yellow-500/30">
              <h3 className="text-lg font-semibold text-yellow-300 mb-3">Support client disponible ?</h3>
              <p className="text-yellow-100 text-sm">
                Support 24h/7j par chat en ligne ! Notre équipe technique 
                répond à toutes vos questions en moins de 5 minutes.
              </p>
            </div>
          </div>
        </section>

        {/* Call to action final */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-xl p-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              ⚡ DERNIÈRE CHANCE ⚡
            </h2>
            <p className="text-xl text-pink-100 mb-6">
              Cette promotion se termine dans quelques heures !<br/>
              Ne laissez pas passer cette opportunité unique.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {offres.map((offre) => (
                <button 
                  key={offre.id}
                  className={`bg-gradient-to-r ${offre.couleur} hover:opacity-90 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105`}
                >
                  {offre.nom} - {offre.prix}€
                </button>
              ))}
            </div>
            
            <div className="text-sm text-pink-100">
              ✅ Activation instantanée • ✅ Tous les bouquets inclus • ✅ Support premium 24h/7j
            </div>
          </div>
        </section>

        {/* Note éducative */}
        <section className="mt-8">
          <div className="bg-orange-600/20 border border-orange-500 rounded-lg p-4 text-center">
            <p className="text-orange-100 text-sm">
              💡 <strong>Site de démonstration à des fins éducatives</strong> - 
              <a href="/analyse" className="underline hover:text-orange-200">
                Analysez les techniques de manipulation utilisées sur cette page
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
} 
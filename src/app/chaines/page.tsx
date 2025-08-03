export default function Chaines() {
  const bouquets = [
    {
      id: 'sport',
      nom: 'Sport Premium',
      couleur: 'from-green-600 to-emerald-600',
      icone: '⚽',
      description: 'Tous les sports en direct',
      chaines: [
        'beIN Sports 1-8 HD', 'RMC Sport 1-4 UHD', 'Eurosport 1-8 4K',
        'Canal+ Sport HD', 'L\'Équipe Live HD', 'ESPN 1-6 HD',
        'Sky Sports 1-12 HD', 'BT Sport 1-4 UHD', 'DAZN 1-2 4K',
        'Fox Sports 1-3 HD', 'NBA TV HD', 'NFL Network HD'
      ]
    },
    {
      id: 'cinema',
      nom: 'Cinéma & Séries',
      couleur: 'from-red-600 to-pink-600',
      icone: '🎬',
      description: 'Films et séries en première',
      chaines: [
        'Canal+ Cinéma UHD', 'OCS Max 4K', 'Netflix Premium',
        'Prime Video HD', 'Disney+ 4K', 'HBO Max UHD',
        'Paramount+ HD', 'Apple TV+ 4K', 'Hulu HD',
        'Cinemax HD', 'Starz HD', 'Showtime UHD'
      ]
    },
    {
      id: 'france',
      nom: 'Chaînes Françaises',
      couleur: 'from-blue-600 to-indigo-600',
      icone: '🇫🇷',
      description: 'Tout le paysage audiovisuel français',
      chaines: [
        'TF1 UHD', 'France 2 4K', 'France 3 HD', 'Canal+ UHD',
        'France 5 HD', 'M6 4K', 'Arte HD', 'C8 HD',
        'W9 HD', 'TMC HD', 'TFX HD', 'NRJ12 HD',
        'LCP HD', 'France 4 HD', 'BFM TV HD', 'CNews HD'
      ]
    },
    {
      id: 'international',
      nom: 'International',
      couleur: 'from-purple-600 to-violet-600',
      icone: '🌍',
      description: 'Chaînes du monde entier',
      chaines: [
        'BBC One-Four 4K', 'CNN International HD', 'Al Jazeera 4K',
        'RAI 1-3 HD', 'RTL Deutschland HD', 'TV5 Monde UHD',
        'Antena 3 HD', 'TVE Internacional HD', 'SRF 1-2 HD',
        'NHK World HD', 'CCTV International HD', 'Russia Today HD'
      ]
    },
    {
      id: 'enfants',
      nom: 'Jeunesse',
      couleur: 'from-yellow-500 to-orange-500',
      icone: '👶',
      description: 'Programmes pour toute la famille',
      chaines: [
        'Disney Channel 4K', 'Cartoon Network HD', 'Nickelodeon UHD',
        'Gulli HD', 'France 4 HD', 'Télétoon+ HD',
        'Boomerang HD', 'Disney Junior 4K', 'Nick Jr. HD',
        'Baby TV HD', 'Piwi+ HD', 'TiJi HD'
      ]
    },
    {
      id: 'documentaires',
      nom: 'Documentaires',
      couleur: 'from-teal-600 to-cyan-600',
      icone: '📚',
      description: 'Culture et découverte',
      chaines: [
        'National Geographic 4K', 'Discovery Channel UHD', 'History HD',
        'Arte HD', 'France 5 HD', 'Planète+ 4K',
        'Science et Vie TV HD', 'Ushuaïa TV HD', 'Animaux HD',
        'Chasse et Pêche HD', 'Seasons UHD', 'Trek HD'
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
            <a href="/chaines" className="text-blue-400 font-semibold">Chaînes</a>
            <a href="/prix" className="hover:text-blue-400 transition-colors">Prix</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
          </nav>
          <a href="/" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
            ← Retour
          </a>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Titre principal */}
        <section className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            📺 Nos Bouquets Premium
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Plus de 50 000 chaînes HD/4K organisées par thématiques
          </p>
          
          {/* Stats impressionnantes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-black/30 rounded-lg p-4 border border-blue-500/30">
              <div className="text-2xl font-bold text-blue-400">50 000+</div>
              <div className="text-sm text-blue-200">Chaînes HD/4K</div>
            </div>
            <div className="bg-black/30 rounded-lg p-4 border border-purple-500/30">
              <div className="text-2xl font-bold text-purple-400">180+</div>
              <div className="text-sm text-purple-200">Pays couverts</div>
            </div>
            <div className="bg-black/30 rounded-lg p-4 border border-green-500/30">
              <div className="text-2xl font-bold text-green-400">99.9%</div>
              <div className="text-sm text-green-200">Disponibilité</div>
            </div>
            <div className="bg-black/30 rounded-lg p-4 border border-yellow-500/30">
              <div className="text-2xl font-bold text-yellow-400">24/7</div>
              <div className="text-sm text-yellow-200">Support</div>
            </div>
          </div>
        </section>

        {/* Bouquets */}
        <section className="space-y-8">
          {bouquets.map((bouquet, index) => (
            <div 
              key={bouquet.id}
              className="bg-black/30 rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* En-tête du bouquet */}
                <div className="md:w-1/3">
                  <div className={`bg-gradient-to-r ${bouquet.couleur} rounded-xl p-6 text-center mb-4`}>
                    <div className="text-4xl mb-2">{bouquet.icone}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{bouquet.nom}</h3>
                    <p className="text-white/90 text-sm">{bouquet.description}</p>
                    <div className="mt-4 bg-white/20 rounded-lg px-3 py-1 text-sm font-semibold">
                      {bouquet.chaines.length} chaînes incluses
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <button className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-2 rounded-lg transition-all">
                      📋 Voir la liste complète
                    </button>
                  </div>
                </div>

                {/* Liste des chaînes */}
                <div className="md:w-2/3">
                  <h4 className="text-lg font-semibold text-white mb-4">Chaînes principales :</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {bouquet.chaines.map((chaine, chaineIndex) => (
                      <div 
                        key={chaineIndex}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors"
                      >
                        📡 {chaine}
                      </div>
                    ))}
                  </div>
                  
                  {/* Indication de plus de chaînes */}
                  <div className="mt-4 text-center">
                    <div className="text-white/60 text-sm">
                      ... et {Math.floor(Math.random() * 500) + 100} autres chaînes dans ce bouquet
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Section qualité */}
        <section className="mt-16 mb-12">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-8 border border-blue-500/30">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              🎯 Qualité Premium Garantie
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">📶</div>
                <h3 className="text-lg font-semibold text-blue-300 mb-2">4K/UHD</h3>
                <p className="text-blue-100 text-sm">
                  Qualité Ultra Haute Définition pour une expérience cinéma
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Zéro Buffering</h3>
                <p className="text-purple-100 text-sm">
                  Streaming fluide grâce à nos serveurs haute performance
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">🔄</div>
                <h3 className="text-lg font-semibold text-green-300 mb-2">MAJ Quotidiennes</h3>
                <p className="text-green-100 text-sm">
                  Nouvelles chaînes ajoutées tous les jours
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Compatibilité */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            📱 Compatible avec tous vos appareils
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { nom: 'Smart TV', icone: '📺' },
              { nom: 'Android', icone: '📱' },
              { nom: 'iPhone', icone: '📲' },
              { nom: 'iPad', icone: '📱' },
              { nom: 'PC/Mac', icone: '💻' },
              { nom: 'Android Box', icone: '📦' }
            ].map((appareil, index) => (
              <div 
                key={index}
                className="bg-black/30 rounded-lg p-4 border border-white/10 text-center hover:border-white/20 transition-all"
              >
                <div className="text-2xl mb-2">{appareil.icone}</div>
                <div className="text-sm text-white/90">{appareil.nom}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              🚀 Accédez à tous ces bouquets dès maintenant !
            </h2>
            <p className="text-xl text-pink-100 mb-6">
              Offre spéciale : -90% sur votre premier mois
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105 pulse-glow mb-4">
              ⭐ COMMANDER - Seulement 10€
            </button>
            <div className="text-sm text-pink-100">
              ✅ Accès instantané à tous les bouquets • ✅ Essai gratuit 7 jours • ✅ Résiliation à tout moment
            </div>
          </div>
        </section>

        {/* Note éducative */}
        <section className="mt-8">
          <div className="bg-orange-600/20 border border-orange-500 rounded-lg p-4 text-center">
            <p className="text-orange-100 text-sm">
              💡 <strong>Site de démonstration à des fins éducatives</strong> - 
              <a href="/analyse" className="underline hover:text-orange-200">
                Découvrez les pièges de ce type de site
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
} 
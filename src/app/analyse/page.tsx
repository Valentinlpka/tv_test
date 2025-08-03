export default function Analyse() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">Analyse des Pièges IPTV</div>
          <a href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            ← Retour au site exemple
          </a>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6 text-white text-center">
            🚨 Analyse des Techniques de Manipulation
          </h1>
          <div className="bg-orange-600/20 border border-orange-500 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-orange-200 mb-3">⚠️ Attention</h2>
            <p className="text-orange-100">
              Cette page analyse les techniques de manipulation utilisées sur le site vitrine précédent. 
              Ces méthodes sont couramment employées par des sites frauduleux pour tromper les consommateurs.
            </p>
          </div>
        </section>

        {/* Analyse des pièges */}
        <section className="space-y-8">
          
          {/* Piège 1: Urgence artificielle */}
          <div className="bg-black/30 rounded-xl p-8 border border-red-500/30">
            <h3 className="text-2xl font-bold text-red-400 mb-4">
              🕐 Piège #1 : Urgence Artificielle
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Ce que vous avez vu :</h4>
                <ul className="text-red-200 space-y-2">
                  <li>• Compteur de temps qui décompte</li>
                  <li>• "Plus que X places disponibles"</li>
                  <li>• "OFFRE LIMITÉE" qui clignote</li>
                  <li>• Remises de 90% "exceptionnelles"</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Pourquoi c'est suspect :</h4>
                <ul className="text-red-200 space-y-2">
                  <li>• Les vraies promos n'ont pas besoin de comptes à rebours</li>
                  <li>• Aucune limitation réelle n'existe</li>
                  <li>• Technique pour vous pousser à acheter sans réfléchir</li>
                  <li>• Les prix "barrés" sont souvent fictifs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Piège 2: Prix trop beaux */}
          <div className="bg-black/30 rounded-xl p-8 border border-yellow-500/30">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">
              💰 Piège #2 : Prix Irréalistes
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Ce que vous avez vu :</h4>
                <ul className="text-yellow-200 space-y-2">
                  <li>• 50 000 chaînes pour 9,99€/mois</li>
                  <li>• Réductions de 90% "permanentes"</li>
                  <li>• Promesses de contenu premium gratuit</li>
                  <li>• Accès "illimité" à tout</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">La réalité :</h4>
                <ul className="text-yellow-200 space-y-2">
                  <li>• Les services légaux coûtent bien plus cher</li>
                  <li>• Impossible d'avoir tous les droits pour ce prix</li>
                  <li>• Souvent des flux piratés de mauvaise qualité</li>
                  <li>• Votre argent finance des activités illégales</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Piège 3: Témoignages fictifs */}
          <div className="bg-black/30 rounded-xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">
              💬 Piège #3 : Faux Témoignages
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Signes suspects :</h4>
                <ul className="text-purple-200 space-y-2">
                  <li>• Tous les avis sont 5 étoiles</li>
                  <li>• Prénoms + initiale seulement</li>
                  <li>• Témoignages trop parfaits</li>
                  <li>• Aucune critique constructive</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Comment vérifier :</h4>
                <ul className="text-purple-200 space-y-2">
                  <li>• Chercher des avis sur des sites indépendants</li>
                  <li>• Méfiance si aucun avis négatif</li>
                  <li>• Vérifier l'ancienneté des témoignages</li>
                  <li>• Croiser les sources d'information</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Piège 4: Manque d'informations légales */}
          <div className="bg-black/30 rounded-xl p-8 border border-green-500/30">
            <h3 className="text-2xl font-bold text-green-400 mb-4">
              ⚖️ Piège #4 : Informations Légales Absentes
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Ce qui manque :</h4>
                <ul className="text-green-200 space-y-2">
                  <li>• Mentions légales complètes</li>
                  <li>• Adresse physique de l'entreprise</li>
                  <li>• Numéro SIRET/SIREN</li>
                  <li>• Conditions générales de vente claires</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Pourquoi c'est important :</h4>
                <ul className="text-green-200 space-y-2">
                  <li>• Obligation légale en France</li>
                  <li>• Permet de vérifier la légalité</li>
                  <li>• Facilite le recours en cas de problème</li>
                  <li>• Signe de transparence et sérieux</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Piège 5: Design trop parfait */}
          <div className="bg-black/30 rounded-xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">
              🎨 Piège #5 : Apparence Trompeuse
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Techniques visuelles :</h4>
                <ul className="text-blue-200 space-y-2">
                  <li>• Design moderne et professionnel</li>
                  <li>• Animations flashy pour impressionner</li>
                  <li>• Couleurs vives pour attirer l'attention</li>
                  <li>• Interface qui inspire confiance</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">La vérité :</h4>
                <ul className="text-blue-200 space-y-2">
                  <li>• Un beau site ne garantit pas la légalité</li>
                  <li>• Facile de copier le design d'autres sites</li>
                  <li>• Les escrocs investissent dans l'apparence</li>
                  <li>• Le contenu compte plus que la forme</li>
                </ul>
              </div>
            </div>
          </div>

        </section>

        {/* Conseils de protection */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            🛡️ Comment se protéger ?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-900/30 rounded-lg p-6 border border-green-500/50">
              <h3 className="text-xl font-semibold text-green-300 mb-4">✅ Bonnes pratiques</h3>
              <ul className="text-green-100 space-y-3">
                <li>• Vérifiez les mentions légales complètes</li>
                <li>• Recherchez des avis sur sites indépendants</li>
                <li>• Méfiez-vous des prix trop bas</li>
                <li>• Préférez les services officiels et légaux</li>
                <li>• Lisez les conditions générales</li>
                <li>• Vérifiez l'existence légale de l'entreprise</li>
              </ul>
            </div>
            
            <div className="bg-red-900/30 rounded-lg p-6 border border-red-500/50">
              <h3 className="text-xl font-semibold text-red-300 mb-4">❌ Signaux d'alarme</h3>
              <ul className="text-red-100 space-y-3">
                <li>• Compteurs de temps qui décomptent</li>
                <li>• Réductions énormes (50%)</li>
                <li>• Aucune information légale</li>
                <li>• Paiement uniquement par crypto ou virement</li>
                <li>• Promesses irréalistes</li>
                <li>• Pression pour acheter immédiatement</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Alternatives légales */}
        <section className="mt-16 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            📺 Alternatives Légales Recommandées
          </h2>
          
          <div className="bg-black/30 rounded-xl p-8 border border-blue-500/30">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-blue-300 mb-3">Services de Streaming</h3>
                <ul className="text-blue-100 space-y-2 text-sm">
                  <li>Netflix, Prime Video, Disney+</li>
                  <li>Salto, France.tv, 6play</li>
                  <li>OCS, Canal+</li>
                </ul>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-semibold text-purple-300 mb-3">Sport Légal</h3>
                <ul className="text-purple-100 space-y-2 text-sm">
                  <li>RMC Sport, beIN Sports</li>
                  <li>Eurosport Player</li>
                  <li>L'Équipe Live</li>
                </ul>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-semibold text-green-300 mb-3">TV Traditionnelle</h3>
                <ul className="text-green-100 space-y-2 text-sm">
                  <li>Box TV des FAI</li>
                  <li>TNT gratuite</li>
                  <li>Molotov TV (freemium)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
} 
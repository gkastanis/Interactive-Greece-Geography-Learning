const mountains = {
    'Όλυμπος': {
        article: 'ο',
        latitude: 40.0859,
        longitude: 22.3583,
        elevation: 2917, // in meters
        description: 'Το ψηλότερο βουνό της Ελλάδας, κατοικία των αρχαίων θεών'
    },
    'Παρνασσός': {
        article: 'ο',
        latitude: 38.5333,
        longitude: 22.6167,
        elevation: 2457,
        description: 'Ιερό βουνό του Απόλλωνα και των Μουσών'
    },
    'Σμόλικας': {
        article: 'ο',
        latitude: 40.0875,
        longitude: 20.9167,
        elevation: 2637,
        description: 'Το δεύτερο ψηλότερο βουνό της Ελλάδας'
    },
    'Ψηλορείτης': {
        article: 'ο',
        latitude: 35.2167,
        longitude: 24.7667,
        elevation: 2456,
        description: 'Το ψηλότερο βουνό της Κρήτης, τόπος γέννησης του Δία'
    },
    'Πήλιο': {
        article: 'το',
        latitude: 39.3967,
        longitude: 23.0419,
        elevation: 1624,
        description: 'Μυθικό σπίτι των Κενταύρων'
    },
    'Ταΰγετος': {
        article: 'ο',
        latitude: 37.05,
        longitude: 22.35,
        elevation: 2407,
        description: 'Το ψηλότερο βουνό της Πελοποννήσου'
    },
    'Άθως': {
        article: 'ο',
        latitude: 40.1564,
        longitude: 24.3284,
        elevation: 2033,
        description: 'Ιερό όρος και μοναστική πολιτεία'
    },
    'Δίρφυς': {
        article: 'ο',
        latitude: 38.6167,
        longitude: 23.85,
        elevation: 1743,
        description: 'Η ψηλότερη κορυφή της Εύβοιας'
    },
    'Χελμός': {
        article: 'ο',
        latitude: 38.0167,
        longitude: 22.2,
        elevation: 2355,
        description: 'Έδρα του τηλεσκοπίου Αρίσταρχος'
    },
    'Γκιώνα': {
        article: 'ο',
        latitude: 38.6667,
        longitude: 22.2833,
        elevation: 2510,
        description: 'Το ψηλότερο βουνό της Στερεάς Ελλάδας'
    },
    'Τύμφη': {
        article: 'η',
        latitude: 39.9833,
        longitude: 20.8167,
        elevation: 2497,
        description: 'Γνωστή για το φαράγγι του Βίκου'
    },
    'Βαρδούσια': {
        article: 'η',
        latitude: 38.7167,
        longitude: 22.1167,
        elevation: 2495,
        description: 'Μέρος της οροσειράς της Πίνδου'
    },
    'Γράμμος': {
        article: 'ο',
        latitude: 40.3667,
        longitude: 20.8833,
        elevation: 2520,
        description: 'Στα σύνορα με την Αλβανία'
    },
    'Παναχαϊκό': {
        article: 'ο',
        latitude: 38.2167,
        longitude: 21.8833,
        elevation: 1926,
        description: 'Με θέα στον Πατραϊκό κόλπο'
    },
    'Οίτη': {
        article: 'η',
        latitude: 38.8167,
        longitude: 22.2833,
        elevation: 2152,
        description: 'Τόπος θανάτου του Ηρακλή κατά τη μυθολογία'
    },
    'Μαίναλο': {
        article: 'ο',
        latitude: 37.6,
        longitude: 22.2833,
        elevation: 1981,
        description: 'Το μυθικό βουνό του θεού Πάνα'
    },
    'Λευκά Όρη': {
        article: 'τα',
        latitude: 35.2833,
        longitude: 24.0,
        elevation: 2454,
        description: 'Γνωστά και ως Μαδάρες στην Κρήτη'
    },
    'Παγγαίο': {
        article: 'το',
        latitude: 40.9167,
        longitude: 24.1000,
        elevation: 1956,
        description: 'Ιστορικό βουνό της Καβάλας, φημισμένο για τα αρχαία χρυσωρυχεία του'
    },
    'Βέρμιο': {
        article: 'το',
        latitude: 40.4667,
        longitude: 22.0167,
        elevation: 2052,
        description: 'Βουνό της Ημαθίας, με το χιονοδρομικό κέντρο Σελίου'
    },
    'Φαλακρό': {
        article: 'το',
        latitude: 41.2833,
        longitude: 24.0833,
        elevation: 2232,
        description: 'Βουνό της Δράμας, γνωστό για το χιονοδρομικό του κέντρο'
    },
    'Βόρας': {
        article: 'ο',
        latitude: 40.9333,
        longitude: 21.8833,
        elevation: 2524,
        description: 'Το τρίτο ψηλότερο βουνό της Ελλάδας, γνωστό και ως Καϊμακτσαλάν'
    },
    'Πιέρια': {
        article: 'τα',
        latitude: 40.2333,
        longitude: 22.2167,
        elevation: 2190,
        description: 'Οροσειρά που χωρίζει τη Μακεδονία από τη Θεσσαλία'
    },
    'Μενοίκιο': {
        article: 'το',
        latitude: 41.1667,
        longitude: 23.7833,
        elevation: 1963,
        description: 'Βουνό των Σερρών με πλούσια χλωρίδα και πανίδα'
    },
    'Όρβηλος': {
        article: 'ο',
        latitude: 41.3667,
        longitude: 23.6000,
        elevation: 2212,
        description: 'Βουνό στα σύνορα Ελλάδας-Βουλγαρίας, βόρεια των Σερρών'
    },
    'Βροντούς': {
        article: 'ο',
        latitude: 41.2833,
        longitude: 23.5833,
        elevation: 1849,
        description: 'Βουνό των Σερρών, γνωστό για τα μονοπάτια πεζοπορίας'
    },
    'Άσκιο': {
        article: 'το',
        latitude: 40.3167,
        longitude: 21.7000,
        elevation: 2111,
        description: 'Βουνό της Δυτικής Μακεδονίας, γνωστό και ως Σινιάτσικο'
    },
    'Καϊμακτσαλάν': {
        article: 'ο',
        latitude: 40.9333,
        longitude: 21.7833,
        elevation: 2524,
        description: 'Το τρίτο ψηλότερο βουνό της Ελλάδας'
    },
    'Δίκτη': {
        article: 'η',
        latitude: 35.1167,
        longitude: 25.4833,
        elevation: 2148,
        description: 'Ιερό βουνό της Κρήτης, σπήλαιο του Δία'
    },
    'Πάρνηθα': {
        article: 'η',
        latitude: 38.1667,
        longitude: 23.7167,
        elevation: 1413,
        description: 'Το ψηλότερο βουνό της Αττικής'
    },
    'Υμηττός': {
        article: 'ο',
        latitude: 37.9667,
        longitude: 23.8167,
        elevation: 1026,
        description: 'Γνωστό για το μέλι του από την αρχαιότητα'
    },
    'Μπέλες': {
        article: 'η',
        latitude: 41.3333,
        longitude: 22.9333,
        elevation: 2031,
        description: 'Οροσειρά στα σύνορα με τη Βόρεια Μακεδονία'
    },
    'Ροδόπη': {
        article: 'η',
        latitude: 41.5167,
        longitude: 24.6,
        elevation: 1827,
        description: 'Εκτεταμένη οροσειρά στα σύνορα με τη Βουλγαρία'
    },
    'Κίρκη': {
        article: 'η',
        latitude: 38.3667,
        longitude: 23.2333,
        elevation: 1510,
        description: 'Βουνό της Βοιωτίας'
    },
    'Κιθαιρώνας': {
        article: 'ο',
        latitude: 38.3167,
        longitude: 23.2333,
        elevation: 1409,
        description: 'Βουνό της Βοιωτίας'
    },
    'Παροναξίας': {
        article: 'ο',
        latitude: 37.3667,
        longitude: 22.7833,
        elevation: 1940,
        description: 'Βουνό της Αρκαδίας'
    },
    'Αϊνίνη': {
        article: 'η',
        latitude: 39.0667,
        longitude: 21.6333,
        elevation: 1864,
        description: 'Βουνό της Ευρυτανίας'
    },
    'Βαρδούσια': {
        article: 'η',
        latitude: 38.7167,
        longitude: 22.1167,
        elevation: 2495,
        description: 'Μέρος της οροσειράς της Πίνδου'
    },
    'Γκιώνα': {
        article: 'ο',
        latitude: 38.6667,
        longitude: 22.2833,
        elevation: 2510,
        description: 'Το ψηλότερο βουνό της Στερεάς Ελλάδας'
    },
    'Γράμμος': {
        article: 'ο',
        latitude: 40.3667,
        longitude: 20.8833,
        elevation: 2520,
        description: 'Στα σύνορα με την Αλβανία'
    },
    'Λύκος': {
        article: 'ο',
        latitude: 39.0667,
        longitude: 21.6333,
        elevation: 2234,
        description: 'Βουνό της Ευρυτανίας'
    },
    'Οίτη': {
        article: 'η',
        latitude: 38.8167,
        longitude: 22.2833,
        elevation: 2152,
        description: 'Τόπος θανάτου του Ηρακλή κατά τη μυθολογία'
    },
    'Παναιτωλικό': {
        article: 'το',
        latitude: 38.7,
        longitude: 21.5667,
        elevation: 1924,
        description: 'Βουνό της Αιτωλοακαρνανίας'
    },
    'Πάρνηθα': {
        article: 'η',
        latitude: 38.1667,
        longitude: 23.7167,
        elevation: 1413,
        description: 'Το ψηλότερο βουνό της Αττικής'
    },
    'Τύμφη': {
        article: 'η',
        latitude: 39.9833,
        longitude: 20.8167,
        elevation: 2497,
        description: 'Γνωστή για το φαράγγι του Βίκου'
    },
    'Φθιώτιδες': {
        article: 'οι',
        latitude: 38.9,
        longitude: 22.5,
        elevation: 1728,
        description: 'Βουνό της Φθιώτιδας'
    },
    'Φολόη': {
        article: 'η',
        latitude: 37.4667,
        longitude: 21.75,
        elevation: 2310,
        description: 'Βουνό της Ηλείας'
    },
    'Χελιδώνα': {
        article: 'η',
        latitude: 39.0667,
        longitude: 21.6333,
        elevation: 1974,
        description: 'Βουνό της Ευρυτανίας'
    },
    'Χορτιάτης': {
        article: 'ο',
        latitude: 40.5983,
        longitude: 23.1000,
        elevation: 1201,
        description: 'Βουνό της Θεσσαλονίκης, με πανοραμική θέα στον Θερμαϊκό κόλπο'
    },
    'Χολομώντας': {
        article: 'ο',
        latitude: 40.4500,
        longitude: 23.5167,
        elevation: 1165,
        description: 'Βουνό της Χαλκιδικής, γνωστό για τα πυκνά δάση του'
    }
};

const lakes = {
    'Λίμνη Τριχωνίδα': {
        article: 'η',
        latitude: 38.5667,
        longitude: 21.55,
        description: 'Η μεγαλύτερη φυσική λίμνη της Ελλάδας'
    },
    'Λίμνη Βόλβη': {
        article: 'η',
        latitude: 40.6833,
        longitude: 23.5833,
        description: 'Η δεύτερη μεγαλύτερη φυσική λίμνη'
    },
    'Λίμνη Πρέσπα': {
        article: 'η',
        latitude: 40.75,
        longitude: 21.0833,
        description: 'Αρχαία λίμνη που μοιράζεται με την Αλβανία και τη Βόρεια Μακεδονία'
    },
    'Λίμνη Πλαστήρα': {
        article: 'η',
        latitude: 39.2333,
        longitude: 21.7333,
        description: 'Τεχνητή λίμνη γνωστή για τη φυσική της ομορφιά'
    },
    'Λίμνη Κερκίνη': {
        article: 'η',
        latitude: 41.2,
        longitude: 23.1333,
        description: 'Σημαντικός υγρότοπος και καταφύγιο πουλιών'
    },
    'Λίμνη Παμβώτιδα': {
        article: 'η',
        latitude: 39.65,
        longitude: 20.85,
        description: 'Ιστορική λίμνη των Ιωαννίνων'
    },
    'Λίμνη Βεγορίτιδα': {
        article: 'η',
        latitude: 40.75,
        longitude: 21.7833,
        description: 'Η τέταρτη μεγαλύτερη λίμνη της Ελλάδας'
    },
    'Λίμνη Δόξα': {
        article: 'η',
        latitude: 37.9333,
        longitude: 22.2833,
        description: 'Τεχνητή λίμνη στην Πελοπόννησο'
    },
    'Λίμνη Κρεμαστών': {
        article: 'η',
        latitude: 38.9167,
        longitude: 21.5,
        description: 'Η μεγαλύτερη τεχνητή λίμνη της Ελλάδας'
    },
    'Λίμνη Υλίκη': {
        article: 'η',
        latitude: 38.4,
        longitude: 23.2833,
        description: 'Κύρια πηγή νερού για την Αθήνα'
    },
    'Λίμνη Καστοριάς': {
        article: 'η',
        latitude: 40.5167,
        longitude: 21.2833,
        description: 'Σε σχήμα οβάλ, σπίτι σπάνιων ειδών πουλιών'
    },
    'Λίμνη Μαραθώνα': {
        article: 'η',
        latitude: 38.15,
        longitude: 23.9,
        description: 'Ιστορική τεχνητή λίμνη κοντά στην Αθήνα'
    },
    'Λίμνη Μικρή Πρέσπα': {
        article: 'η',
        latitude: 40.75,
        longitude: 21.0833,
        description: 'Μοναδικό οικοσύστημα με σπάνια πτηνά'
    },
    'Λίμνη Πετρών': {
        article: 'η',
        latitude: 40.7167,
        longitude: 21.6833,
        description: 'Φυσική λίμνη στη Μακεδονία'
    },
    'Λίμνη Δοϊράνη': {
        article: 'η',
        latitude: 41.1833,
        longitude: 22.75,
        description: 'Λίμνη στα σύνορα με τη Βόρεια Μακεδονία'
    },
    'Λίμνη Λυσιμαχεία': {
        article: 'η',
        latitude: 38.5667,
        longitude: 21.3667,
        description: 'Φυσική λίμνη δίπλα στην Τριχωνίδα'
    },
    'Λίμνη Στυμφαλία': {
        article: 'η',
        latitude: 37.85,
        longitude: 22.4667,
        description: 'Αρχαία λίμνη, τόπος του άθλου του Ηρακλή'
    },
    'Λίμνη Κουρνά': {
        article: 'η',
        latitude: 35.3333,
        longitude: 24.2833,
        description: 'Η μοναδική φυσική λίμνη της Κρήτης'
    },
    'Λίμνη Ζηρού': {
        article: 'η',
        latitude: 39.2333,
        longitude: 20.95,
        description: 'Καρστική λίμνη στην Ήπειρο'
    },
    'Λίμνη Τζαραβίνας': {
        article: 'η',
        latitude: 39.8667,
        longitude: 20.6,
        description: 'Ορεινή λίμνη στην Ήπειρο'
    },
    'Λίμνη Χειμαδίτιδα': {
        article: 'η',
        latitude: 40.6167,
        longitude: 21.5833,
        description: 'Ρηχή λίμνη με πλούσια βιοποικιλότητα'
    },
    'Λίμνη Ζάζαρη': {
        article: 'η',
        latitude: 40.6333,
        longitude: 21.55,
        description: 'Μικρή λίμνη δίπλα στη Χειμαδίτιδα'
    },
    'Λίμνη Βιστωνίδα': {
        article: 'η',
        latitude: 41.0333,
        longitude: 25.1667,
        description: 'Λιμνοθάλασσα της Θράκης'
    },
    'Λίμνη Κορώνεια': {
        article: 'η',
        latitude: 40.6833,
        longitude: 23.15,
        description: 'Γνωστή και ως λίμνη Αγίου Βασιλείου'
    },
    'Λίμνη Ισμαρίδα': {
        article: 'η',
        latitude: 40.95,
        longitude: 25.3333,
        description: 'Η μοναδική φυσική λίμνη γλυκού νερού στη Θράκη'
    }
};

const rivers = {
    'Αλιάκμονας': {
        article: 'ο',
        coordinates: [
            { latitude: 40.4667, longitude: 22.2 },
            { latitude: 40.5333, longitude: 21.7 },
            { latitude: 40.45, longitude: 21.4167 },
            { latitude: 40.2833, longitude: 21.1833 }
        ],
        description: 'Το μεγαλύτερο ποτάμι της Ελλάδας'
    },
    'Αχελώος': {
        article: 'ο',
        coordinates: [
            { latitude: 39.0167, longitude: 21.55 },
            { latitude: 39.25, longitude: 21.4167 },
            { latitude: 39.3167, longitude: 21.25 }
        ],
        description: 'Ιερό ποτάμι της αρχαίας Ελλάδας'
    },
    'Πηνειός': {
        article: 'ο',
        coordinates: [
            { latitude: 39.8667, longitude: 22.75 },
            { latitude: 39.75, longitude: 22.2833 },
            { latitude: 39.6333, longitude: 22.0833 }
        ],
        description: 'Το κύριο ποτάμι της Θεσσαλίας'
    },
    'Αξιός': {
        article: 'ο',
        coordinates: [
            { latitude: 40.7, longitude: 22.7167 },
            { latitude: 40.8333, longitude: 22.6333 },
            { latitude: 41.0, longitude: 22.5167 }
        ],
        description: 'Σημαντικό ποτάμι της Μακεδονίας'
    },
    'Νέστος': {
        article: 'ο',
        coordinates: [
            { latitude: 41.1, longitude: 24.7167 },
            { latitude: 41.1333, longitude: 24.8833 },
            { latitude: 41.05, longitude: 25.1833 },
            { latitude: 40.85, longitude: 24.7833 },
            { latitude: 41.0833, longitude: 24.7167 },
            { latitude: 41.2167, longitude: 24.6333 },
            { latitude: 41.35, longitude: 24.5167 },
            { latitude: 41.4833, longitude: 24.4 }
        ],
        description: 'Γνωστό για το εντυπωσιακό του δέλτα'
    },
    'Έβρος': {
        article: 'ο',
        coordinates: [
            { latitude: 41.6833, longitude: 26.5667 },
            { latitude: 41.35, longitude: 26.5 },
            { latitude: 40.85, longitude: 26.0333 }
        ],
        description: 'Φυσικό σύνορο με την Τουρκία'
    },
    'Στρυμόνας': {
        article: 'ο',
        coordinates: [
            { latitude: 41.2833, longitude: 23.35 },
            { latitude: 41.1167, longitude: 23.5833 },
            { latitude: 40.7833, longitude: 23.85 }
        ],
        description: 'Σημαντικό ποτάμι της Μακεδονίας'
    },
    'Αλφειός': {
        article: 'ο',
        coordinates: [
            { latitude: 37.4833, longitude: 21.7 },
            { latitude: 37.5833, longitude: 21.8833 },
            { latitude: 37.6333, longitude: 22.0 }
        ],
        description: 'Κύριο ποτάμι της Πελοποννήσου'
    },
    'Άραχθος': {
        article: 'ο',
        coordinates: [
            { latitude: 39.0333, longitude: 21.0667 },
            { latitude: 39.15, longitude: 21.0833 },
            { latitude: 39.3167, longitude: 21.1167 },
            { latitude: 39.5, longitude: 21.1833 },
            { latitude: 39.6333, longitude: 21.2 }
        ],
        description: 'Κύριο ποτάμι της Ηπείρου'
    },
    'Θύαμις': {
        article: 'ο',
        coordinates: [
            { latitude: 39.6167, longitude: 20.1833 },
            { latitude: 39.55, longitude: 20.25 },
            { latitude: 39.3833, longitude: 20.1833 }
        ],
        description: 'Ποτάμι της Ηπείρου'
    },
    'Σπερχειός': {
        article: 'ο',
        coordinates: [
            { latitude: 38.8667, longitude: 22.5333 },
            { latitude: 38.9, longitude: 22.3167 },
            { latitude: 38.9167, longitude: 22.1667 },
            { latitude: 38.9, longitude: 22.0167 },
            { latitude: 38.8833, longitude: 21.8833 }
        ],
        description: 'Ρέει μέσα από την κοιλάδα της Λαμίας'
    }
};

const locations = {
    mountains,
    lakes,
    rivers
};

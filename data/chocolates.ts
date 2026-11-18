export interface Chocolate {
  id: string;
  name: string;
  arabicName: string;
  tagline: string;
  description: string;
  priceAED: number;
  category: 'Dark Chocolate' | 'Milk Chocolate' | 'White & Ruby' | 'Dubai Specials';
  cocoaPercentage: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  origin: string;
  ingredients: string[];
  allergens: string[];
  isBestseller?: boolean;
}

export const CHOCOLATES: Chocolate[] = [
  {
    id: "royal-gold-truffle",
    name: "Royal 24K Gold Truffle",
    arabicName: "كمأة الذهب الملكية عيار 24",
    tagline: "Pure 24K edible gold with 70% dark Valrhona ganache",
    description: "Our signature masterpiece. Hand-rolled 70% dark single-origin chocolate ganache, enrobed in fine Belgian couverture and delicately leafed with edible 24-karat gold from Florence.",
    priceAED: 85,
    category: "Dark Chocolate",
    cocoaPercentage: "70% Single Origin",
    badge: "24K Gold Crown",
    rating: 5.0,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1548741487-18d16a145e80?auto=format&fit=crop&w=800&q=80",
    origin: "Ecuadorian Arriba Cocoa",
    ingredients: ["Cocoa mass", "Cocoa butter", "Heavy cream", "24K Edible Gold Leaf", "Cane sugar", "Tahitian vanilla"],
    allergens: ["Dairy"],
    isBestseller: true
  },
  {
    id: "dubai-pistachio-kunafa",
    name: "Dubai Pistachio Kunafa Bonbon",
    arabicName: "بونبون كنافة الفستق دبي",
    tagline: "Crisp toasted kataifi with creamy roasted Iranian pistachios",
    description: "The viral sensation elevated into haute chocolaterie. Crisp golden toasted kataifi pastry threads folded with slow-roasted pistachio paste and tahini cream, wrapped in silky milk chocolate.",
    priceAED: 65,
    category: "Dubai Specials",
    cocoaPercentage: "42% Milk Chocolate",
    badge: "Dubai Special",
    rating: 4.9,
    reviewsCount: 238,
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80",
    origin: "Belgian Couverture & Kerman Pistachios",
    ingredients: ["Milk chocolate", "Kataifi dough", "Pistachio butter", "Tahini", "Sea salt", "Ghee"],
    allergens: ["Gluten", "Tree Nuts (Pistachio)", "Dairy", "Sesame"],
    isBestseller: true
  },
  {
    id: "salted-caramel-amber",
    name: "Salted Caramel Amber Pearl",
    arabicName: "لؤلؤة الكراميل المملح والعنبر",
    tagline: "Guerande sea salt & slow-simmered amber caramel",
    description: "Rich Normandy butter caramelized over open flames, tempered with hand-harvested Fleur de Sel from Guérande, encased in a shimmering golden-dusted milk chocolate sphere.",
    priceAED: 45,
    category: "Milk Chocolate",
    cocoaPercentage: "45% Swiss Milk",
    badge: "Award Winner",
    rating: 4.8,
    reviewsCount: 96,
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    origin: "Swiss Alps & Brittany Butter",
    ingredients: ["Cocoa butter", "Whole milk powder", "Heavy cream", "Guerande fleur de sel", "Invert sugar", "Natural amber extract"],
    allergens: ["Dairy"],
    isBestseller: false
  },
  {
    id: "madagascan-bourbon-vanilla",
    name: "Madagascan Bourbon Vanilla Blanc",
    arabicName: "فانيليا بوربون مدغشقر البيضاء",
    tagline: "Silky Ivory Coast white chocolate & Bourbon vanilla caviar",
    description: "Crafted from fresh cocoa butter, slow-infused for 48 hours with hand-scraped Madagascan Bourbon vanilla bean pods and kissed with crushed caramelized almonds.",
    priceAED: 50,
    category: "White & Ruby",
    cocoaPercentage: "36% Cocoa Butter",
    badge: "Artisan Pick",
    rating: 4.9,
    reviewsCount: 78,
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80",
    origin: "Ivory Coast & Sambava Madagascar",
    ingredients: ["Pure cocoa butter", "Whole milk powder", "Madagascan vanilla beans", "Roasted almonds", "Cane sugar"],
    allergens: ["Dairy", "Tree Nuts (Almond)"],
    isBestseller: false
  },
  {
    id: "dark-espresso-velvet",
    name: "Dark Espresso Velvet Noir",
    arabicName: "فيلفيت القهوة والاسبريسو الداكن",
    tagline: "Single-origin 80% dark cocoa with Italian ristretto infusion",
    description: "For the purist. Deep, smokey 80% dark chocolate from Saint Domingue infused with freshly pulled Italian ristretto espresso and dusted in Dutch alkalized cocoa.",
    priceAED: 40,
    category: "Dark Chocolate",
    cocoaPercentage: "80% Extra Dark",
    badge: "Intense 80%",
    rating: 4.7,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80",
    origin: "Saint Domingue Cocoa",
    ingredients: ["Cocoa mass", "Colombian arabica espresso", "Cocoa butter", "Raw demerara sugar", "Alkalized cocoa powder"],
    allergens: [],
    isBestseller: false
  },
  {
    id: "emirati-saffron-cardamom",
    name: "Emirati Royal Saffron & Cardamom",
    arabicName: "زعفران وهيل إماراتي ملكي",
    tagline: "Super Negin saffron, green cardamom & honeyed Gianduja",
    description: "A tribute to UAE hospitality. Fragrant green cardamom from Guatemala and Grade-1 Super Negin Persian saffron infused into velvety milk chocolate with a golden dust halo.",
    priceAED: 55,
    category: "Dubai Specials",
    cocoaPercentage: "50% Dark Milk",
    badge: "Heritage Exclusive",
    rating: 5.0,
    reviewsCount: 185,
    image: "https://images.unsplash.com/photo-1575372587186-50020ee3b970?auto=format&fit=crop&w=800&q=80",
    origin: "Emirati Majlis Collection",
    ingredients: ["Cocoa mass", "Super Negin saffron", "Green cardamom", "Local mountain wildflower honey", "Milk solids"],
    allergens: ["Dairy"],
    isBestseller: true
  },
  {
    id: "ruby-raspberry-romance",
    name: "Ruby Raspberry & Rose Jewel",
    arabicName: "ياقوت التوت البري وبتلات الورد",
    tagline: "Natural ruby cocoa with wild raspberry coulis & Damascus rose",
    description: "Berry-fruity ruby chocolate naturally colored by ruby cocoa beans, harboring a heart of tart wild mountain raspberry coulis and delicate essence of Damascus rose water.",
    priceAED: 48,
    category: "White & Ruby",
    cocoaPercentage: "47% Ruby Cocoa",
    badge: "Limited Edition",
    rating: 4.8,
    reviewsCount: 89,
    image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80",
    origin: "Brazil & Ecuador Ruby Harvest",
    ingredients: ["Ruby cocoa liquor", "Cocoa butter", "Wild raspberry puree", "Damascus rosewater", "Pectin", "Citric acid"],
    allergens: ["Dairy"],
    isBestseller: false
  },
  {
    id: "hazelnut-gianduja-royale",
    name: "Hazelnut Gianduja Royale",
    arabicName: "جياندويا البندق الملكي المقرمش",
    tagline: "Slow-roasted IGP Piedmont hazelnuts & crunchy wafer feuilletine",
    description: "An Italian tradition elevated. IGP certified Piedmont hazelnuts ground into an ultra-creamy gianduja paste, interspersed with crispy caramelized crepe dentelle shards.",
    priceAED: 52,
    category: "Milk Chocolate",
    cocoaPercentage: "38% Gianduja Milk",
    badge: "Connoisseur's Choice",
    rating: 4.9,
    reviewsCount: 167,
    image: "https://images.unsplash.com/photo-1542843137-8791a6904d14?auto=format&fit=crop&w=800&q=80",
    origin: "Piedmont Italy & Swiss Couverture",
    ingredients: ["IGP Piedmont hazelnuts (45%)", "Cocoa mass", "Cocoa butter", "Crepe dentelle feuilletine", "Sea salt"],
    allergens: ["Dairy", "Gluten", "Tree Nuts (Hazelnut)"],
    isBestseller: false
  }
];

-- ==========================================================
-- SUPABASE SQL SETUP FOR "chocolate-shop"
-- 1. Create 'chocolates' table & seed 8 sample chocolates
-- 2. Create 'orders' table for checkout saves
-- ==========================================================

-- 1. CHOCOLATES TABLE
CREATE TABLE IF NOT EXISTS public.chocolates (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    arabic_name TEXT,
    tagline TEXT,
    description TEXT,
    price_aed NUMERIC NOT NULL,
    category TEXT NOT NULL,
    cocoa_percentage TEXT,
    badge TEXT,
    rating NUMERIC DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 0,
    image TEXT,
    origin TEXT,
    ingredients TEXT[] DEFAULT '{}',
    allergens TEXT[] DEFAULT '{}',
    is_bestseller BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and allow anyone to read chocolates
ALTER TABLE public.chocolates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to chocolates" ON public.chocolates;
CREATE POLICY "Allow public read access to chocolates"
    ON public.chocolates FOR SELECT
    USING (true);

-- 2. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    emirate TEXT NOT NULL,
    address TEXT NOT NULL,
    delivery_time TEXT,
    gift_note TEXT,
    include_gift_wrap BOOLEAN DEFAULT FALSE,
    payment_method TEXT NOT NULL,
    items JSONB NOT NULL,
    subtotal_aed NUMERIC NOT NULL,
    delivery_fee_aed NUMERIC NOT NULL,
    discount_aed NUMERIC DEFAULT 0,
    total_aed NUMERIC NOT NULL,
    status TEXT DEFAULT 'Confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and allow anyone to insert new orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert to orders" ON public.orders;
CREATE POLICY "Allow public insert to orders"
    ON public.orders FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read own orders" ON public.orders;
CREATE POLICY "Allow public read own orders"
    ON public.orders FOR SELECT
    USING (true);

-- ==========================================================
-- SEED DATA: 8 SAMPLE CHOCOLATES IN AED
-- ==========================================================
INSERT INTO public.chocolates (id, name, arabic_name, tagline, description, price_aed, category, cocoa_percentage, badge, rating, reviews_count, image, origin, ingredients, allergens, is_bestseller)
VALUES 
(
    'royal-gold-truffle',
    'Royal 24K Gold Truffle',
    'كمأة الذهب الملكية عيار 24',
    'Pure 24K edible gold with 70% dark Valrhona ganache',
    'Our signature masterpiece. Hand-rolled 70% dark single-origin chocolate ganache, enrobed in fine Belgian couverture and delicately leafed with edible 24-karat gold from Florence.',
    85,
    'Dark Chocolate',
    '70% Single Origin',
    '24K Gold Crown',
    5.0,
    142,
    'https://images.unsplash.com/photo-1548741487-18d16a145e80?auto=format&fit=crop&w=800&q=80',
    'Ecuadorian Arriba Cocoa',
    ARRAY['Cocoa mass', 'Cocoa butter', 'Heavy cream', '24K Edible Gold Leaf', 'Cane sugar', 'Tahitian vanilla'],
    ARRAY['Dairy'],
    TRUE
),
(
    'dubai-pistachio-kunafa',
    'Dubai Pistachio Kunafa Bonbon',
    'بونبون كنافة الفستق دبي',
    'Crisp toasted kataifi with creamy roasted Iranian pistachios',
    'The viral sensation elevated into haute chocolaterie. Crisp golden toasted kataifi pastry threads folded with slow-roasted pistachio paste and tahini cream, wrapped in silky milk chocolate.',
    65,
    'Dubai Specials',
    '42% Milk Chocolate',
    'Dubai Special',
    4.9,
    238,
    'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
    'Belgian Couverture & Kerman Pistachios',
    ARRAY['Milk chocolate', 'Kataifi dough', 'Pistachio butter', 'Tahini', 'Sea salt', 'Ghee'],
    ARRAY['Gluten', 'Tree Nuts (Pistachio)', 'Dairy', 'Sesame'],
    TRUE
),
(
    'salted-caramel-amber',
    'Salted Caramel Amber Pearl',
    'لؤلؤة الكراميل المملح والعنبر',
    'Guerande sea salt & slow-simmered amber caramel',
    'Rich Normandy butter caramelized over open flames, tempered with hand-harvested Fleur de Sel from Guérande, encased in a shimmering golden-dusted milk chocolate sphere.',
    45,
    'Milk Chocolate',
    '45% Swiss Milk',
    'Award Winner',
    4.8,
    96,
    'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    'Swiss Alps & Brittany Butter',
    ARRAY['Cocoa butter', 'Whole milk powder', 'Heavy cream', 'Guerande fleur de sel', 'Invert sugar', 'Natural amber extract'],
    ARRAY['Dairy'],
    FALSE
),
(
    'madagascan-bourbon-vanilla',
    'Madagascan Bourbon Vanilla Blanc',
    'فانيليا بوربون مدغشقر البيضاء',
    'Silky Ivory Coast white chocolate & Bourbon vanilla caviar',
    'Crafted from fresh cocoa butter, slow-infused for 48 hours with hand-scraped Madagascan Bourbon vanilla bean pods and kissed with crushed caramelized almonds.',
    50,
    'White & Ruby',
    '36% Cocoa Butter',
    'Artisan Pick',
    4.9,
    78,
    'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
    'Ivory Coast & Sambava Madagascar',
    ARRAY['Pure cocoa butter', 'Whole milk powder', 'Madagascan vanilla beans', 'Roasted almonds', 'Cane sugar'],
    ARRAY['Dairy', 'Tree Nuts (Almond)'],
    FALSE
),
(
    'dark-espresso-velvet',
    'Dark Espresso Velvet Noir',
    'فيلفيت القهوة والاسبريسو الداكن',
    'Single-origin 80% dark cocoa with Italian ristretto infusion',
    'For the purist. Deep, smokey 80% dark chocolate from Saint Domingue infused with freshly pulled Italian ristretto espresso and dusted in Dutch alkalized cocoa.',
    40,
    'Dark Chocolate',
    '80% Extra Dark',
    'Intense 80%',
    4.7,
    110,
    'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80',
    'Saint Domingue Cocoa',
    ARRAY['Cocoa mass', 'Colombian arabica espresso', 'Cocoa butter', 'Raw demerara sugar', 'Alkalized cocoa powder'],
    ARRAY[]::TEXT[],
    FALSE
),
(
    'emirati-saffron-cardamom',
    'Emirati Royal Saffron & Cardamom',
    'زعفران وهيل إماراتي ملكي',
    'Super Negin saffron, green cardamom & honeyed Gianduja',
    'A tribute to UAE hospitality. Fragrant green cardamom from Guatemala and Grade-1 Super Negin Persian saffron infused into velvety milk chocolate with a golden dust halo.',
    55,
    'Dubai Specials',
    '50% Dark Milk',
    'Heritage Exclusive',
    5.0,
    185,
    'https://images.unsplash.com/photo-1575372587186-50020ee3b970?auto=format&fit=crop&w=800&q=80',
    'Emirati Majlis Collection',
    ARRAY['Cocoa mass', 'Super Negin saffron', 'Green cardamom', 'Local mountain wildflower honey', 'Milk solids'],
    ARRAY['Dairy'],
    TRUE
),
(
    'ruby-raspberry-romance',
    'Ruby Raspberry & Rose Jewel',
    'ياقوت التوت البري وبتلات الورد',
    'Natural ruby cocoa with wild raspberry coulis & Damascus rose',
    'Berry-fruity ruby chocolate naturally colored by ruby cocoa beans, harboring a heart of tart wild mountain raspberry coulis and delicate essence of Damascus rose water.',
    48,
    'White & Ruby',
    '47% Ruby Cocoa',
    'Limited Edition',
    4.8,
    89,
    'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80',
    'Brazil & Ecuador Ruby Harvest',
    ARRAY['Ruby cocoa liquor', 'Cocoa butter', 'Wild raspberry puree', 'Damascus rosewater', 'Pectin', 'Citric acid'],
    ARRAY['Dairy'],
    FALSE
),
(
    'hazelnut-gianduja-royale',
    'Hazelnut Gianduja Royale',
    'جياندويا البندق الملكي المقرمش',
    'Slow-roasted IGP Piedmont hazelnuts & crunchy wafer feuilletine',
    'An Italian tradition elevated. IGP certified Piedmont hazelnuts ground into an ultra-creamy gianduja paste, interspersed with crispy caramelized crepe dentelle shards.',
    52,
    'Milk Chocolate',
    '38% Gianduja Milk',
    'Connoisseur''s Choice',
    4.9,
    167,
    'https://images.unsplash.com/photo-1542843137-8791a6904d14?auto=format&fit=crop&w=800&q=80',
    'Piedmont Italy & Swiss Couverture',
    ARRAY['IGP Piedmont hazelnuts (45%)', 'Cocoa mass', 'Cocoa butter', 'Crepe dentelle feuilletine', 'Sea salt'],
    ARRAY['Dairy', 'Gluten', 'Tree Nuts (Hazelnut)'],
    FALSE
)
ON CONFLICT (id) DO UPDATE 
SET 
    name = EXCLUDED.name,
    price_aed = EXCLUDED.price_aed,
    description = EXCLUDED.description;

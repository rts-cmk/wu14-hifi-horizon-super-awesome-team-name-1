import { config } from 'dotenv'

config()

import { productColors, productDescriptions, productImages, productSpecifications, products } from '@repo/shared'
import db from './index'

const seedProducts = [
    {
        title: 'Harbeth HL Compact 7ES-2',
        brand: 'Harbeth',
        category: 'Speakers',
        price: 425000,
        stock: 4,
        descriptions: [
            "The Harbeth HL Compact 7ES-2 stands as one of the most celebrated loudspeakers in high-fidelity audio, continuing the legendary lineage of BBC-engineered monitors. At its heart lies Harbeth's proprietary RADIAL² cone technology—a thin-walled polypropylene driver developed through years of research into polymer chemistry and acoustic behaviour. This 200mm bass/midrange unit delivers the transparent, uncoloured midrange that has made Harbeth the reference standard for recording studios, broadcast facilities, and discerning audiophiles worldwide. The critically-damped cabinet, constructed from 18mm birch plywood with proprietary constrained-layer damping, eliminates resonance-induced colouration while the front-firing reflex port ensures consistent bass response regardless of room placement.",
            'Hand-built at the Harbeth factory in Lindfield, England, each speaker undergoes rigorous quality control and a 48-hour burn-in period before shipping. The crossover network uses premium polypropylene capacitors and air-core inductors for pristine signal integrity.'
        ],
        colors: [
            { hex: '#5D3A1A', name: 'Cherry' },
            { hex: '#2B1810', name: 'Walnut' },
            { hex: '#1A1A1A', name: 'Black' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/hojtalere/harbeth_hl7es2.jpg',
                alt: 'Harbeth HL Compact 7ES-2 Loudspeaker in Cherry Wood Finish'
            }
        ],
        specifications: [
            { label: 'Frequency Response', value: '40Hz - 20kHz ±3dB' },
            { label: 'Sensitivity', value: '86dB/1W/1m' },
            { label: 'Nominal Impedance', value: '8 Ohms (minimum 6.5 Ohms)' },
            { label: 'Recommended Amplifier Power', value: '25W - 150W RMS' },
            { label: 'Bass/Mid Driver', value: '200mm RADIAL² polymer cone' },
            { label: 'Tweeter', value: '25mm aluminium dome, ferro-fluid cooled' },
            { label: 'Crossover Frequency', value: '3.2kHz, 2nd order' },
            { label: 'Dimensions (H×W×D)', value: '520 × 272 × 305mm' },
            { label: 'Weight', value: '13.2kg per speaker' },
            { label: 'Cabinet Material', value: '18mm birch plywood, real wood veneer' }
        ]
    },
    {
        title: 'Bösendorfer VCS Wall Speaker',
        brand: 'Bösendorfer',
        category: 'Speakers',
        price: 899000,
        stock: 2,
        descriptions: [
            "Born from over 190 years of Viennese piano-making excellence, the Bösendorfer VCS Wall Speaker represents an unprecedented fusion of traditional craftsmanship and advanced acoustic engineering. The speaker's resonance chamber is constructed using the same proprietary spruce tonewood and hand-finishing techniques employed in Bösendorfer's legendary Imperial grand pianos, creating a uniquely natural tonal character that simply cannot be replicated through conventional speaker manufacturing. The driver complement includes a custom 165mm midrange unit with a cone material derived from piano soundboard spruce fibres, flanked by dual 130mm bass drivers and a ribbon tweeter capable of extending beyond 40kHz for complete high-resolution audio compatibility.",
            'Each VCS Wall Speaker is hand-assembled in Vienna by master craftsmen, with the cabinet receiving the same multi-coat lacquer finish found on concert grand pianos. Limited production ensures exclusivity and uncompromising attention to detail.'
        ],
        colors: [
            { hex: '#0A0A0A', name: 'Piano Black' },
            { hex: '#F5F0E6', name: 'Ivory' },
            { hex: '#2C1810', name: 'Mahogany' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/hojtalere/boesendorfer_vcs_wall.gif',
                alt: 'Bösendorfer VCS Wall-Mounted Loudspeaker in Piano Black Lacquer'
            }
        ],
        specifications: [
            { label: 'Frequency Response', value: '35Hz - 42kHz (-6dB)' },
            { label: 'Sensitivity', value: '89dB/2.83V/1m' },
            { label: 'Nominal Impedance', value: '4 Ohms' },
            { label: 'Recommended Amplifier Power', value: '50W - 300W RMS' },
            { label: 'Driver Configuration', value: '2× 130mm bass, 1× 165mm mid, ribbon tweeter' },
            { label: 'Cabinet Construction', value: 'Resonance-tuned spruce tonewood' },
            { label: 'Finish', value: 'Hand-applied polyester piano lacquer' },
            { label: 'Mounting', value: 'Wall-mount with adjustable bracket included' },
            { label: 'Dimensions (H×W×D)', value: '680 × 320 × 180mm' },
            { label: 'Weight', value: '18.5kg per speaker' }
        ]
    },
    {
        title: 'Harbeth P3ESR',
        brand: 'Harbeth',
        category: 'Speakers',
        price: 289000,
        stock: 6,
        descriptions: [
            "The Harbeth P3ESR carries forward the spirit of the legendary BBC LS3/5A—the most revered mini-monitor in audio history—while incorporating Harbeth's latest RADIAL² driver technology for significantly improved dynamics, reduced distortion, and enhanced bass extension. Despite its compact 306mm height, the P3ESR delivers a remarkably expansive soundstage with pinpoint imaging that belies its diminutive dimensions. The 110mm RADIAL² bass/midrange driver operates in a sealed (infinite baffle) enclosure, ensuring tight, well-controlled bass response that integrates seamlessly into any room environment without the unpredictable boundary effects associated with ported designs.",
            'The P3ESR excels in near-field desktop applications, intimate listening rooms, and as rear surrounds in premium home cinema installations. Its exceptional coherence makes it a favourite among recording engineers and mastering professionals.'
        ],
        colors: [
            { hex: '#5D3A1A', name: 'Cherry' },
            { hex: '#1A1A1A', name: 'Black' },
            { hex: '#E8E4DF', name: 'White Oak' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/hojtalere/harbeth_p3es2.jpg',
                alt: 'Harbeth P3ESR Compact Monitor in Cherry Finish'
            }
        ],
        specifications: [
            { label: 'Frequency Response', value: '75Hz - 20kHz ±3dB' },
            { label: 'Sensitivity', value: '83.5dB/1W/1m' },
            { label: 'Nominal Impedance', value: '6 Ohms' },
            { label: 'Recommended Amplifier Power', value: '15W - 50W RMS' },
            { label: 'Bass/Mid Driver', value: '110mm RADIAL² polymer cone' },
            { label: 'Tweeter', value: '19mm aluminium dome' },
            { label: 'Enclosure Type', value: 'Sealed (infinite baffle)' },
            { label: 'Crossover Frequency', value: '3.5kHz' },
            { label: 'Dimensions (H×W×D)', value: '306 × 190 × 186mm' },
            { label: 'Weight', value: '6.3kg per speaker' }
        ]
    },
    {
        title: 'Harbeth Monitor 30',
        brand: 'Harbeth',
        category: 'Speakers',
        price: 569000,
        stock: 3,
        descriptions: [
            "The Harbeth Monitor 30 represents the ultimate expression of the two-way monitor concept, engineered without compromise for professional broadcast monitoring and audiophile reference applications. The larger cabinet volume compared to the Compact 7 allows the 200mm RADIAL² driver to operate with greater authority in the critical bass-to-midrange region, delivering effortless dynamics and superior bass extension down to 35Hz in-room. Originally developed for the BBC's Studio 3 monitoring requirements, this speaker reveals every nuance of a recording with forensic precision while maintaining the musical engagement that distinguishes Harbeth from clinical-sounding alternatives.",
            'The Monitor 30 rewards quality amplification and source components, scaling beautifully with system upgrades. Its relatively benign impedance curve makes it compatible with both valve and solid-state amplification.'
        ],
        colors: [
            { hex: '#5D3A1A', name: 'Cherry' },
            { hex: '#2B1810', name: 'Walnut' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/hojtalere/harbeth_monitor30.jpg',
                alt: 'Harbeth Monitor 30 Professional Reference Speaker'
            }
        ],
        specifications: [
            { label: 'Frequency Response', value: '35Hz - 20kHz ±3dB' },
            { label: 'Sensitivity', value: '85dB/1W/1m' },
            { label: 'Nominal Impedance', value: '6 Ohms (minimum 5.5 Ohms)' },
            { label: 'Recommended Amplifier Power', value: '40W - 200W RMS' },
            { label: 'Bass/Mid Driver', value: '200mm RADIAL² polymer cone' },
            { label: 'Tweeter', value: '25mm SEAS aluminium dome' },
            { label: 'Crossover Frequency', value: '2.8kHz, 2nd order acoustic' },
            { label: 'Dimensions (H×W×D)', value: '635 × 277 × 315mm' },
            { label: 'Weight', value: '16.1kg per speaker' },
            { label: 'Recommended Stand Height', value: '400-500mm' }
        ]
    },
    {
        title: 'Epos M5',
        brand: 'Epos',
        category: 'Speakers',
        price: 89000,
        stock: 8,
        descriptions: [
            'The Epos M5 brings genuine British high-fidelity engineering to an accessible price point without the sonic compromises typical of budget speakers. The 130mm polypropylene-cone woofer, designed in collaboration with Danish driver specialist Vifa, delivers surprising bass weight and dynamic punch from its compact enclosure, while the 25mm soft-dome tweeter provides smooth, extended high frequencies without the harshness that plagues many affordable designs. The carefully braced MDF cabinet minimises resonance, and the rear-firing reflex port has been precisely tuned to extend bass response while maintaining transient accuracy.',
            'Ideal as a starter audiophile system, bedroom/office speakers, or high-quality surround channels. The M5 punches well above its price class with natural tonal balance and engaging musical presentation.'
        ],
        colors: [
            { hex: '#1A1A1A', name: 'Black' },
            { hex: '#5D3A1A', name: 'Cherry' },
            { hex: '#4A4A4A', name: 'Graphite' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/hojtalere/epos_m5.gif',
                alt: 'Epos M5 Bookshelf Loudspeaker in Black Ash'
            }
        ],
        specifications: [
            { label: 'Frequency Response', value: '55Hz - 20kHz ±3dB' },
            { label: 'Sensitivity', value: '87dB/2.83V/1m' },
            { label: 'Nominal Impedance', value: '4 Ohms (minimum 3.6 Ohms)' },
            { label: 'Recommended Amplifier Power', value: '20W - 80W RMS' },
            { label: 'Bass/Mid Driver', value: '130mm polypropylene cone' },
            { label: 'Tweeter', value: '25mm soft dome' },
            { label: 'Crossover Frequency', value: '2.9kHz' },
            { label: 'Enclosure Type', value: 'Bass reflex (rear port)' },
            { label: 'Dimensions (H×W×D)', value: '267 × 150 × 195mm' },
            { label: 'Weight', value: '4.2kg per speaker' }
        ]
    },
    {
        title: 'Manley Neo-Classic 300B',
        brand: 'Manley',
        category: 'Power Amplifiers',
        price: 899000,
        stock: 2,
        descriptions: [
            "The Manley Neo-Classic 300B is a masterwork of single-ended triode amplification, employing the legendary Western Electric 300B directly-heated triode valve in a meticulously optimised Class A circuit. Each amplifier delivers 11 watts of the purest, most harmonically rich power available—sufficient to drive high-efficiency loudspeakers (90dB+ sensitivity) to concert hall levels with breathtaking realism. The hand-wound output transformers, designed and manufactured in-house at Manley's Chino, California facility, feature interleaved windings and premium grain-oriented steel cores for bandwidth extending from 18Hz to 65kHz. Point-to-point wiring using silver-bearing solder and military-grade components ensures signal integrity and decades of reliable service.",
            'The Neo-Classic 300B represents the pinnacle of American valve amplifier craftsmanship. Each unit is hand-built, tested, and personally signed by a Manley technician before shipping.'
        ],
        colors: [
            { hex: '#C0C0C0', name: 'Silver' },
            { hex: '#B8860B', name: 'Gold' },
            { hex: '#1A1A1A', name: 'Black' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/effektforstaerkere/manley_neoclassic300b.jpg',
                alt: 'Manley Neo-Classic 300B Single-Ended Triode Monoblock Amplifier'
            }
        ],
        specifications: [
            { label: 'Output Power', value: '11W RMS Class A single-ended' },
            { label: 'Frequency Response', value: '18Hz - 65kHz (-1dB)' },
            { label: 'Output Impedance', value: '4, 8, 16 Ohm taps' },
            { label: 'Input Sensitivity', value: '750mV for full output' },
            { label: 'Input Impedance', value: '100kΩ' },
            { label: 'Valve Complement', value: '1× 300B, 1× 6SL7GT, 1× 5AR4 rectifier' },
            { label: 'THD', value: '<1% at 8W' },
            { label: 'Hum & Noise', value: '>80dB below rated output' },
            { label: 'Dimensions (H×W×D)', value: '235 × 280 × 445mm' },
            { label: 'Weight', value: '27.2kg per monoblock' }
        ]
    },
    {
        title: 'Manley Snapper Monoblock',
        brand: 'Manley',
        category: 'Power Amplifiers',
        price: 749000,
        stock: 3,
        descriptions: [
            "The Manley Snapper monoblock amplifier combines the romance of EL34 pentode valves with the practicality of switchable triode/ultralinear operation, allowing you to tailor the sound to your speakers and musical preferences. In ultralinear mode, each Snapper delivers a robust 100 watts of dynamic, punchy power capable of driving virtually any loudspeaker to satisfying levels. Switch to triode mode, and the power drops to 50 watts while the midrange takes on an even more liquid, three-dimensional character that valve aficionados treasure. The fully balanced differential input stage, borrowed from Manley's professional studio equipment, provides exceptional common-mode noise rejection and compatibility with balanced source components.",
            'Sold as a pair, the Snappers offer genuine high-end valve amplification with the flexibility to work with speakers ranging from 88dB to 95dB sensitivity. Hand-built in California with a lifetime warranty to the original owner.'
        ],
        colors: [
            { hex: '#C0C0C0', name: 'Silver' },
            { hex: '#B8860B', name: 'Gold' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/effektforstaerkere/manley_snapper.jpg',
                alt: 'Manley Snapper Monoblock Power Amplifier'
            }
        ],
        specifications: [
            { label: 'Output Power', value: '100W ultralinear / 50W triode' },
            { label: 'Frequency Response', value: '15Hz - 80kHz (-1dB)' },
            { label: 'Output Impedance', value: '4 and 8 Ohm taps' },
            { label: 'Input Sensitivity', value: '1.1V balanced, 550mV unbalanced' },
            { label: 'Input Impedance', value: '100kΩ balanced, 50kΩ unbalanced' },
            { label: 'Valve Complement', value: '4× EL34, 2× 12AT7' },
            { label: 'THD', value: '<0.5% at 50W' },
            { label: 'Dimensions (H×W×D)', value: '190 × 235 × 430mm' },
            { label: 'Weight', value: '22.7kg per monoblock' },
            { label: 'Warranty', value: 'Lifetime to original owner' }
        ]
    },
    {
        title: 'Manley Mahi Monoblock',
        brand: 'Manley',
        category: 'Power Amplifiers',
        price: 529000,
        stock: 4,
        descriptions: [
            'The Manley Mahi (Hawaiian for "strong") packs serious valve amplification into a compact, elegant package that defies its modest footprint. Using a quartet of EL84 pentodes in push-pull configuration, each Mahi delivers 40 watts in ultralinear mode or 20 watts in triode—ample power for speakers of 89dB sensitivity or higher. The fully regulated power supply ensures stable, consistent performance regardless of mains voltage fluctuations, while the auto-bias circuit eliminates the need for periodic valve adjustments. The distinctive industrial design, with exposed transformers and machined aluminium chassis, makes a bold visual statement.',
            'The Mahi represents exceptional value in the valve monoblock category, delivering the Manley house sound—dynamic, detailed, and musically engaging—at an accessible price point. Sold as a matched pair.'
        ],
        colors: [
            { hex: '#C0C0C0', name: 'Silver' },
            { hex: '#B8860B', name: 'Gold' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/effektforstaerkere/manley_mahi.jpg',
                alt: 'Manley Mahi Compact Monoblock Amplifier'
            }
        ],
        specifications: [
            { label: 'Output Power', value: '40W ultralinear / 20W triode' },
            { label: 'Frequency Response', value: '20Hz - 35kHz (-1dB)' },
            { label: 'Output Impedance', value: '4 and 8 Ohm taps' },
            { label: 'Input Sensitivity', value: '1.2V for full output' },
            { label: 'Valve Complement', value: '4× EL84, 1× 12AT7' },
            { label: 'Bias', value: 'Automatic (cathode bias)' },
            { label: 'Damping Factor', value: '>12' },
            { label: 'Dimensions (H×W×D)', value: '152 × 178 × 356mm' },
            { label: 'Weight', value: '11.3kg per monoblock' },
            { label: 'Power Consumption', value: '150W per monoblock' }
        ]
    },
    {
        title: 'Parasound Halo A23',
        brand: 'Parasound',
        category: 'Power Amplifiers',
        price: 189000,
        stock: 6,
        descriptions: [
            "The Parasound Halo A23 brings legendary circuit designer John Curl's expertise to a remarkably affordable stereo power amplifier. Curl's direct-coupled, wide-bandwidth topology—refined over decades of professional and audiophile product development—delivers 125 watts per channel into 8 ohms with high current capability (45 amperes peak per channel) for authoritative control over demanding loudspeaker loads. The class A/AB output stage operates in pure Class A for the first 10 watts before transitioning seamlessly to AB, ensuring sweet, liquid sonics at typical listening levels. Premium components throughout include Nichicon and Panasonic audio-grade capacitors, polystyrene capacitors in the signal path, and gold-plated input connectors.",
            "The A23 offers genuine high-end amplification for those unwilling to sacrifice performance for price. It bridges or biamps seamlessly and makes an exceptional match for Parasound's acclaimed Halo preamplifiers."
        ],
        colors: [
            { hex: '#1A1A1A', name: 'Black' },
            { hex: '#C0C0C0', name: 'Silver' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/effektforstaerkere/parasound_haloa23.jpg',
                alt: 'Parasound Halo A23 Stereo Power Amplifier'
            }
        ],
        specifications: [
            { label: 'Output Power', value: '125W × 2 @ 8Ω, 225W × 2 @ 4Ω' },
            { label: 'Bridged Output', value: '400W @ 8Ω mono' },
            { label: 'Frequency Response', value: '5Hz - 100kHz (+0/-3dB)' },
            { label: 'THD', value: '<0.03% at full power' },
            { label: 'Signal-to-Noise', value: '>113dB IHF-A weighted' },
            { label: 'Damping Factor', value: '>800 @ 20Hz' },
            { label: 'Input Sensitivity', value: '1.0V for rated output' },
            { label: 'Current Capacity', value: '45A peak per channel' },
            { label: 'Dimensions (H×W×D)', value: '133 × 445 × 381mm' },
            { label: 'Weight', value: '14.5kg' }
        ]
    },
    {
        title: 'Manley Stingray Integrated',
        brand: 'Manley',
        category: 'Integrated Amplifiers',
        price: 649000,
        stock: 3,
        descriptions: [
            'The Manley Stingray has achieved iconic status among integrated amplifiers, combining striking retro-futuristic aesthetics with serious audiophile performance. Eight EL84 pentodes in push-pull configuration deliver 50 watts per channel of sweet, dynamic power through a passive preamplifier section that maintains absolute signal purity. The distinctive chrome chassis with blue VU meters and sculpted side panels makes an unmistakable visual statement, while the internal construction—point-to-point wired with premium passive components—ensures decades of reliable service. Five high-level inputs plus a substantial headphone amplifier output provide complete system flexibility.',
            "The Stingray has graced the covers of audio magazines worldwide and earned countless awards. It remains Manley's best-selling product, beloved by audiophiles and design enthusiasts alike."
        ],
        colors: [
            { hex: '#C0C0C0', name: 'Silver' },
            { hex: '#1E90FF', name: 'Blue' },
            { hex: '#B8860B', name: 'Gold' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/int_forstaerkere/Manley_Stingray.jpg',
                alt: 'Manley Stingray Integrated Tube Amplifier'
            }
        ],
        specifications: [
            { label: 'Output Power', value: '50W × 2 ultralinear Class A/B' },
            { label: 'Frequency Response', value: '20Hz - 40kHz (-1dB)' },
            { label: 'Input Sensitivity', value: '380mV for full output' },
            { label: 'Input Impedance', value: '25kΩ' },
            { label: 'Valve Complement', value: '8× EL84, 2× 12AT7' },
            { label: 'Inputs', value: '5× line-level RCA' },
            { label: 'Headphone Output', value: '32Ω - 300Ω compatible' },
            { label: 'Dimensions (H×W×D)', value: '190 × 432 × 330mm' },
            { label: 'Weight', value: '18.1kg' },
            { label: 'Finish', value: 'Chrome with blue meters' }
        ]
    },
    {
        title: 'Creek 5350SE Integrated',
        brand: 'Creek',
        category: 'Integrated Amplifiers',
        price: 149000,
        stock: 5,
        descriptions: [
            "The Creek 5350SE represents the pinnacle of Creek's Classic series, incorporating three decades of British integrated amplifier refinement into a singularly musical package. The Special Edition designation signals upgraded components throughout: premium Elna Silmic II electrolytic capacitors, polypropylene film capacitors in the signal path, and a substantially uprated toroidal transformer for improved dynamics and current delivery. The 85-watt Class A/B output stage drives real-world loudspeaker loads with authority, while the minimalist signal path—just four gain stages from input to output—preserves the music's natural texture and dimensionality.",
            "Creek's house sound—transparent, rhythmically engaging, and tonally neutral—has earned critical acclaim for over 30 years. The 5350SE continues this tradition with subtle refinements that reward careful listening."
        ],
        colors: [
            { hex: '#C0C0C0', name: 'Silver' },
            { hex: '#1A1A1A', name: 'Black' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/int_forstaerkere/creek_classic5350SE.jpg',
                alt: 'Creek Classic 5350SE Integrated Amplifier in Silver'
            }
        ],
        specifications: [
            { label: 'Output Power', value: '85W × 2 @ 8Ω, 120W × 2 @ 4Ω' },
            { label: 'Frequency Response', value: '5Hz - 80kHz (+0/-1dB)' },
            { label: 'THD', value: '<0.01% at rated power' },
            { label: 'Signal-to-Noise', value: '>100dB (A-weighted)' },
            { label: 'Input Sensitivity', value: '300mV for full output' },
            { label: 'Inputs', value: '6× line-level, tape loop' },
            { label: 'Preamp Output', value: 'Fixed and variable' },
            { label: 'Dimensions (H×W×D)', value: '80 × 430 × 310mm' },
            { label: 'Weight', value: '8.2kg' },
            { label: 'Standby Power', value: '<0.5W' }
        ]
    },
    {
        title: 'Creek A50i Integrated',
        brand: 'Creek',
        category: 'Integrated Amplifiers',
        price: 89000,
        stock: 7,
        descriptions: [
            "The Creek A50i delivers the company's signature musical transparency at an accessible price point, making genuine high-fidelity sound available to budget-conscious enthusiasts. The 50-watt Class AB output stage employs a careful selection of transistors for optimal linearity, while the discrete preamplifier section avoids integrated circuits in the signal path for superior sonic purity. The robust power supply features a generously-rated toroidal transformer and substantial reservoir capacitance for dynamic headroom that belies the modest power rating.",
            'An ideal first serious amplifier for those stepping up from mass-market equipment. The A50i reveals the music in your sources while driving most bookshelf and medium-sensitivity floor-standing speakers with ease.'
        ],
        colors: [
            { hex: '#C0C0C0', name: 'Silver' },
            { hex: '#1A1A1A', name: 'Black' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/int_forstaerkere/creek_a50I.jpg',
                alt: 'Creek A50i Integrated Amplifier'
            }
        ],
        specifications: [
            { label: 'Output Power', value: '50W × 2 @ 8Ω, 75W × 2 @ 4Ω' },
            { label: 'Frequency Response', value: '10Hz - 60kHz (+0/-1dB)' },
            { label: 'THD', value: '<0.02% at rated power' },
            { label: 'Signal-to-Noise', value: '>95dB (A-weighted)' },
            { label: 'Input Sensitivity', value: '350mV for full output' },
            { label: 'Inputs', value: '5× line-level RCA' },
            { label: 'Preamp Output', value: 'Variable' },
            { label: 'Dimensions (H×W×D)', value: '70 × 430 × 280mm' },
            { label: 'Weight', value: '6.1kg' },
            { label: 'Power Consumption', value: '150W maximum' }
        ]
    },
    {
        title: 'Creek Destiny Integrated',
        brand: 'Creek',
        category: 'Integrated Amplifiers',
        price: 289000,
        stock: 4,
        descriptions: [
            "The Creek Destiny Integrated represents Creek's statement in the integrated amplifier category, incorporating the company's most sophisticated circuit topologies and premium component selection. The unique modular architecture accepts optional plug-in cards for DAC and phono stage functionality, transforming the Destiny into a complete high-end system hub. The 100-watt output stage employs Creek's proprietary Class G topology for exceptional efficiency without sonic compromise, while the massive power supply—featuring twin toroidal transformers and extensive regulation—ensures bottomless current reserves for dynamic peaks.",
            'The Destiny rewards system matching with high-quality sources and revealing loudspeakers. It scales gracefully with upgrades and serves as a genuine long-term audio investment.'
        ],
        colors: [
            { hex: '#C0C0C0', name: 'Silver' },
            { hex: '#1A1A1A', name: 'Black' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/int_forstaerkere/creek_destinyamp.jpg',
                alt: 'Creek Destiny Integrated Amplifier'
            }
        ],
        specifications: [
            { label: 'Output Power', value: '100W × 2 @ 8Ω, 160W × 2 @ 4Ω' },
            { label: 'Frequency Response', value: '2Hz - 200kHz (+0/-3dB)' },
            { label: 'THD', value: '<0.005% at 50W' },
            { label: 'Signal-to-Noise', value: '>108dB (A-weighted)' },
            { label: 'Input Sensitivity', value: '280mV for full output' },
            { label: 'Inputs', value: '6× line-level + optional modules' },
            { label: 'Optional Modules', value: 'DAC, MM/MC Phono' },
            { label: 'Dimensions (H×W×D)', value: '90 × 430 × 350mm' },
            { label: 'Weight', value: '12.4kg' },
            { label: 'Remote Control', value: 'Aluminium system remote included' }
        ]
    },
    {
        title: 'Parasound Classic 7100',
        brand: 'Parasound',
        category: 'Preamplifiers',
        price: 129000,
        stock: 4,
        descriptions: [
            'The Parasound Classic 7100 bridges the gap between home cinema convenience and two-channel audiophile performance, offering comprehensive surround processing alongside a purist stereo signal path. When configured for two-channel listening, the 7100 bypasses all digital processing and delivers pure analog preamplification through John Curl-designed gain stages. Seven analog inputs, including a dedicated phono input, accommodate any source combination, while Zone 2 outputs enable multi-room audio distribution without compromising main system performance.',
            "An excellent choice for enthusiasts who demand both home theater capability and uncompromised stereo reproduction. The 7100's flexible architecture adapts to evolving system requirements."
        ],
        colors: [
            { hex: '#1A1A1A', name: 'Black' },
            { hex: '#C0C0C0', name: 'Silver' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/forforstaerkere/parasound_classic7100.jpg',
                alt: 'Parasound Classic 7100 Home Theater Processor'
            }
        ],
        specifications: [
            { label: 'Analog Inputs', value: '7× stereo RCA (incl. phono)' },
            { label: 'Digital Inputs', value: '4× optical, 2× coaxial' },
            { label: 'THD (analog bypass)', value: '<0.005%' },
            { label: 'Signal-to-Noise', value: '>110dB (A-weighted)' },
            { label: 'Frequency Response', value: '5Hz - 100kHz (+0/-0.5dB)' },
            { label: 'Outputs', value: '7.1 pre-out, Zone 2' },
            { label: 'Phono Input', value: 'MM, 47kΩ' },
            { label: 'Dimensions (H×W×D)', value: '108 × 445 × 330mm' },
            { label: 'Weight', value: '6.8kg' },
            { label: 'Remote Control', value: 'IR learning remote included' }
        ]
    },
    {
        title: 'Pro-Ject Pre Box S2 Digital',
        brand: 'Pro-Ject',
        category: 'Preamplifiers',
        price: 49000,
        stock: 8,
        descriptions: [
            'The Pro-Ject Pre Box S2 Digital packs an astonishing feature set into an impossibly compact chassis: a premium ESS Sabre ES9038Q2M DAC chip, MQA hardware decoding, a capable headphone amplifier, and preamplifier outputs—all in a box smaller than a paperback book. The Sabre DAC delivers reference-class conversion with THD figures that compete with units costing five times the price, while the fully balanced internal architecture maximises dynamic range. USB, optical, and coaxial digital inputs accommodate computers, streamers, and disc transports, while the analog input allows connection of turntables with built-in phono stages.',
            'The Pre Box S2 Digital represents exceptional value for desktop audiophiles, headphone enthusiasts, or anyone seeking high-resolution playback in a minimal footprint.'
        ],
        colors: [
            { hex: '#1A1A1A', name: 'Black' },
            { hex: '#C0C0C0', name: 'Silver' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/forforstaerkere/Project_prebox.jpg',
                alt: 'Pro-Ject Pre Box S2 Digital DAC/Preamp'
            }
        ],
        specifications: [
            { label: 'DAC Chip', value: 'ESS Sabre ES9038Q2M' },
            { label: 'Digital Inputs', value: 'USB, optical, coaxial' },
            { label: 'Sample Rates', value: 'PCM up to 768kHz/32-bit, DSD512' },
            { label: 'MQA', value: 'Full hardware decoding' },
            { label: 'THD+N', value: '<0.0003%' },
            { label: 'Dynamic Range', value: '>120dB' },
            { label: 'Headphone Output', value: '32Ω - 600Ω' },
            { label: 'Analog Input', value: '1× stereo RCA' },
            { label: 'Dimensions (H×W×D)', value: '37 × 103 × 144mm' },
            { label: 'Weight', value: '0.54kg' }
        ]
    },
    {
        title: 'Creek OBH-22 Passive Preamp',
        brand: 'Creek',
        category: 'Preamplifiers',
        price: 45000,
        stock: 6,
        descriptions: [
            'The Creek OBH-22 demonstrates that the purest signal path is often no path at all, using only a precision 24-position stepped attenuator for volume control without any active gain stages, coupling capacitors, or feedback loops to colour the sound. Each resistor in the attenuator is individually laser-trimmed to 0.1% tolerance for perfect channel matching across the entire volume range. The result is a component that adds nothing and takes nothing away—the ultimate transparent link between source and power amplifier for systems where the source output is sufficient to drive the power amplifier directly.',
            'Ideal for systems with high-output DACs or CD players and sensitive power amplifiers. The OBH-22 reveals system improvements that active preamps can mask.'
        ],
        colors: [{ hex: '#C0C0C0', name: 'Silver' }],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/forforstaerkere/Creek_OBH_22_Passive_Preamp.jpg',
                alt: 'Creek OBH-22 Passive Preamplifier'
            }
        ],
        specifications: [
            { label: 'Type', value: 'Passive resistive attenuator' },
            { label: 'Inputs', value: '4× stereo RCA' },
            { label: 'Outputs', value: '2× stereo RCA' },
            { label: 'Volume Control', value: '24-position stepped attenuator' },
            { label: 'Resistor Tolerance', value: '0.1%' },
            { label: 'Channel Balance', value: '<0.05dB' },
            { label: 'Crosstalk', value: '>90dB @ 10kHz' },
            { label: 'Input Impedance', value: 'Equal to load impedance' },
            { label: 'Dimensions (H×W×D)', value: '55 × 103 × 145mm' },
            { label: 'Weight', value: '1.2kg' }
        ]
    },
    {
        title: 'Parasound Halo P3 Preamplifier',
        brand: 'Parasound',
        category: 'Preamplifiers',
        price: 149000,
        stock: 4,
        descriptions: [
            "The Parasound Halo P3 delivers John Curl's sophisticated analog circuit design in a dedicated two-channel preamplifier with thoughtful features for the vinyl enthusiast. The built-in phono stage accommodates both moving magnet and high-output moving coil cartridges with selectable gain and loading, while the Class A line stage employs premium polystyrene capacitors and discrete transistors for exceptional transparency. The motorised volume control uses an Alps Blue Velvet potentiometer for smooth, precise adjustment, and the substantial outboard power supply isolates noisy transformer fields from sensitive circuitry.",
            "The P3 pairs naturally with Parasound's Halo power amplifiers but performs beautifully with any quality amplification. An excellent choice for analogue-focused systems."
        ],
        colors: [
            { hex: '#1A1A1A', name: 'Black' },
            { hex: '#C0C0C0', name: 'Silver' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/forforstaerkere/parasound_halop3.jpg',
                alt: 'Parasound Halo P3 Analog Preamplifier'
            }
        ],
        specifications: [
            { label: 'Line Inputs', value: '6× stereo RCA' },
            { label: 'Phono Input', value: 'MM/MC with adjustable gain' },
            { label: 'THD', value: '<0.005% at 2V output' },
            { label: 'Signal-to-Noise', value: '>114dB (line), >80dB (phono MM)' },
            { label: 'Frequency Response', value: '5Hz - 100kHz (+0/-0.5dB)' },
            { label: 'Gain', value: '12dB (line), 40/60dB (phono)' },
            { label: 'Headphone Output', value: '1× 6.35mm' },
            { label: 'Dimensions (H×W×D)', value: '95 × 445 × 305mm' },
            { label: 'Weight', value: '6.4kg' },
            { label: 'Power Supply', value: 'External regulated' }
        ]
    },
    {
        title: 'Creek Classic CD Player',
        brand: 'Creek',
        category: 'CD Players',
        price: 89000,
        stock: 5,
        descriptions: [
            "The Creek Classic CD player approaches digital playback with the same minimalist philosophy that has defined Creek's amplifier designs for three decades. A carefully-selected Philips transport mechanism provides reliable, accurate disc reading, while the 24-bit DAC section employs Creek's proprietary filtering algorithms for natural, un-fatiguing sound that avoids the clinical sterility plaguing many digital sources. The analog output stage, derived from Creek's acclaimed integrated amplifiers, ensures the signal reaches your preamp with its musicality intact.",
            "An honest, musically-engaging CD player that reveals the quality of your recordings without artificial enhancement. Matches perfectly with Creek's Classic series amplifiers."
        ],
        colors: [
            { hex: '#C0C0C0', name: 'Silver' },
            { hex: '#1A1A1A', name: 'Black' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/cd_afspillere/creek_classic_cd.jpg',
                alt: 'Creek Classic CD Player in Silver'
            }
        ],
        specifications: [
            { label: 'DAC', value: '24-bit delta-sigma' },
            { label: 'Frequency Response', value: '20Hz - 20kHz (±0.2dB)' },
            { label: 'THD+N', value: '<0.002%' },
            { label: 'Signal-to-Noise', value: '>105dB (A-weighted)' },
            { label: 'Dynamic Range', value: '>98dB' },
            { label: 'Outputs', value: 'RCA analog, coaxial digital' },
            { label: 'Transport', value: 'Philips slot-loading' },
            { label: 'Dimensions (H×W×D)', value: '70 × 430 × 280mm' },
            { label: 'Weight', value: '4.8kg' },
            { label: 'Remote', value: 'System remote included' }
        ]
    },
    {
        title: 'Creek Evo CD Player',
        brand: 'Creek',
        category: 'CD Players',
        price: 129000,
        stock: 4,
        descriptions: [
            "The Creek Evo CD elevates Creek's digital source performance with an upgraded Wolfson DAC chip and Creek's proprietary digital filter architecture, delivering enhanced resolution and superior rhythmic precision compared to the Classic series. The transport mechanism now incorporates anti-vibration mounting and improved servo control for more accurate disc reading, particularly with aged or slightly damaged discs. The fully discrete analog output stage features upgraded capacitors and regulated power supplies for each channel, minimising crosstalk and maximising dynamic range.",
            "The Evo CD represents the sweet spot in Creek's digital lineup: genuine high-end performance without flagship pricing. Excellent paired with the Evo integrated amplifier."
        ],
        colors: [
            { hex: '#C0C0C0', name: 'Silver' },
            { hex: '#1A1A1A', name: 'Black' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/cd_afspillere/creek_evo_cd.jpg',
                alt: 'Creek Evo CD Player'
            }
        ],
        specifications: [
            { label: 'DAC', value: 'Wolfson WM8740 24-bit' },
            { label: 'Frequency Response', value: '20Hz - 20kHz (±0.1dB)' },
            { label: 'THD+N', value: '<0.001%' },
            { label: 'Signal-to-Noise', value: '>108dB (A-weighted)' },
            { label: 'Dynamic Range', value: '>100dB' },
            { label: 'Outputs', value: 'RCA analog, coaxial digital' },
            { label: 'Digital Filter', value: 'Selectable slow/fast roll-off' },
            { label: 'Dimensions (H×W×D)', value: '70 × 430 × 300mm' },
            { label: 'Weight', value: '5.4kg' },
            { label: 'Display', value: 'Dimmable fluorescent' }
        ]
    },
    {
        title: 'Creek Destiny CD Player',
        brand: 'Creek',
        category: 'CD Players',
        price: 249000,
        stock: 3,
        descriptions: [
            "The Creek Destiny CD represents Creek's flagship statement in digital disc playback, incorporating dual Wolfson WM8742 DACs in differential configuration for exceptional channel separation and vanishingly low distortion. A dedicated femtosecond clock generator virtually eliminates jitter—the timing errors that rob digital playback of its immediacy and presence—while the fully-balanced analog output stage ensures the signal's purity is maintained to the output connectors. The heavy extruded aluminium chassis incorporates sophisticated vibration damping, and each digital and analog section receives power from independently regulated supplies.",
            'The Destiny CD is a genuine reference-class digital source that competes with players costing significantly more. Its balanced outputs are particularly recommended for maximum performance.'
        ],
        colors: [
            { hex: '#C0C0C0', name: 'Silver' },
            { hex: '#1A1A1A', name: 'Black' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/cd_afspillere/creek_Destiny_CD.jpg',
                alt: 'Creek Destiny Reference CD Player'
            }
        ],
        specifications: [
            { label: 'DAC', value: 'Dual Wolfson WM8742 (differential)' },
            { label: 'Frequency Response', value: '20Hz - 20kHz (±0.05dB)' },
            { label: 'THD+N', value: '<0.0005%' },
            { label: 'Signal-to-Noise', value: '>112dB (A-weighted)' },
            { label: 'Dynamic Range', value: '>105dB' },
            { label: 'Outputs', value: 'RCA, XLR balanced, digital' },
            { label: 'Clock', value: 'Femtosecond precision' },
            { label: 'Dimensions (H×W×D)', value: '90 × 430 × 350mm' },
            { label: 'Weight', value: '7.8kg' },
            { label: 'Optional', value: 'External power supply upgrade' }
        ]
    },
    {
        title: 'Exposure 2010S CD Player',
        brand: 'Exposure',
        category: 'CD Players',
        price: 119000,
        stock: 4,
        descriptions: [
            'The Exposure 2010S CD player combines thoughtful British engineering with a focus on musical engagement over technical specifications. The PCM1716 DAC chip, selected for its natural, analogue-like presentation, feeds a discrete transistor output stage that adds no signature of its own while providing the current capability to drive long cable runs and demanding loads. The Sanyo transport mechanism offers excellent error correction and tracking stability, while the minimalist digital filtering avoids the pre-ringing artifacts that can harden transients in oversampling designs.',
            'The 2010S delivers that elusive quality of musical flow—the sense of rhythm and timing that makes extended listening sessions effortless and enjoyable.'
        ],
        colors: [
            { hex: '#1A1A1A', name: 'Black' },
            { hex: '#C0C0C0', name: 'Silver' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/cd_afspillere/Exp_2010S_CD.gif',
                alt: 'Exposure 2010S CD Player in Black'
            }
        ],
        specifications: [
            { label: 'DAC', value: 'Burr-Brown PCM1716' },
            { label: 'Frequency Response', value: '20Hz - 20kHz (±0.5dB)' },
            { label: 'THD+N', value: '<0.003%' },
            { label: 'Signal-to-Noise', value: '>103dB (A-weighted)' },
            { label: 'Dynamic Range', value: '>96dB' },
            { label: 'Outputs', value: 'RCA analog, coaxial digital' },
            { label: 'Transport', value: 'Sanyo drawer-loading' },
            { label: 'Dimensions (H×W×D)', value: '85 × 440 × 300mm' },
            { label: 'Weight', value: '5.2kg' },
            { label: 'Finish', value: 'Black or silver' }
        ]
    },
    {
        title: 'Jolida JD102B Tube Integrated',
        brand: 'Jolida',
        category: 'Tube Amplifiers',
        price: 99000,
        stock: 5,
        descriptions: [
            'The Jolida JD102B introduces listeners to the magic of vacuum tube amplification without requiring a second mortgage. Four EL84 pentodes in push-pull configuration deliver 20 watts per channel of the warm, dimensional sound that has attracted audiophiles to tube equipment for generations. The chassis is solidly constructed with a heavy steel base and decorative chrome cage protecting the glowing valves, while the hand-wired signal path uses quality components throughout. The 102B proves that entry-level pricing need not mean entry-level sonics.',
            'An exceptional gateway to tube amplification for the curious audiophile. Pairs beautifully with efficient bookshelf speakers for a sublime desktop or small-room system.'
        ],
        colors: [
            { hex: '#1A1A1A', name: 'Black' },
            { hex: '#C0C0C0', name: 'Silver' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/roer_forstaerkere/jolida_JD102b.jpg',
                alt: 'Jolida JD102B Tube Integrated Amplifier'
            }
        ],
        specifications: [
            { label: 'Output Power', value: '20W × 2 Class AB push-pull' },
            { label: 'Frequency Response', value: '25Hz - 30kHz (-3dB)' },
            { label: 'THD', value: '<1% at rated power' },
            { label: 'Signal-to-Noise', value: '>85dB' },
            { label: 'Valve Complement', value: '4× EL84, 2× 12AX7' },
            { label: 'Inputs', value: '4× line-level RCA' },
            { label: 'Output Impedance', value: '4 and 8 Ohm taps' },
            { label: 'Dimensions (H×W×D)', value: '180 × 305 × 280mm' },
            { label: 'Weight', value: '13kg' },
            { label: 'Tube Cage', value: 'Chrome, removable' }
        ]
    },
    {
        title: 'Jolida JD302B Tube Integrated',
        brand: 'Jolida',
        category: 'Tube Amplifiers',
        price: 149000,
        stock: 4,
        descriptions: [
            'The Jolida JD302B steps up to EL34 output valves—the tube that powered the legendary Marshall guitar amplifiers and countless British hi-fi classics—delivering 50 watts per channel with the rich, euphonic midrange that has made the EL34 an enduring audiophile favourite. The beefier output transformers and upgraded power supply handle dynamic peaks with ease, driving even relatively inefficient speakers to satisfying levels. The dual-mono preamplifier section employs 12AX7 and 12AT7 valves for additional gain and drive capability.',
            'The JD302B represents the sweet spot in the Jolida lineup: sufficient power for most speakers with the sonic refinement that rewards careful system matching.'
        ],
        colors: [
            { hex: '#1A1A1A', name: 'Black' },
            { hex: '#C0C0C0', name: 'Silver' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/roer_forstaerkere/jolida_JD302b.jpg',
                alt: 'Jolida JD302B EL34 Tube Integrated Amplifier'
            }
        ],
        specifications: [
            { label: 'Output Power', value: '50W × 2 Class AB push-pull' },
            { label: 'Frequency Response', value: '18Hz - 40kHz (-3dB)' },
            { label: 'THD', value: '<0.5% at 30W' },
            { label: 'Signal-to-Noise', value: '>88dB' },
            { label: 'Valve Complement', value: '4× EL34, 2× 12AX7, 2× 12AT7' },
            { label: 'Inputs', value: '5× line-level RCA' },
            { label: 'Output Impedance', value: '4 and 8 Ohm taps' },
            { label: 'Dimensions (H×W×D)', value: '200 × 380 × 330mm' },
            { label: 'Weight', value: '21kg' },
            { label: 'Bias', value: 'User-adjustable with built-in meter' }
        ]
    },
    {
        title: 'Jolida JD502B Tube Integrated',
        brand: 'Jolida',
        category: 'Tube Amplifiers',
        price: 229000,
        stock: 3,
        descriptions: [
            "The Jolida JD502B employs KT88 beam tetrodes—the valve originally developed for demanding industrial applications but prized by audiophiles for its commanding bass authority and extended bandwidth. Each channel delivers 60 watts in ultralinear mode or 30 watts in triode, with a front-panel switch allowing real-time comparison between the two modes' distinct sonic characters. The substantially-wound output transformers handle the KT88's prodigious current capability without saturation, maintaining control over bass-hungry loudspeakers that would defeat lesser amplifiers.",
            "Jolida's flagship integrated amplifier, capable of driving virtually any speaker load while retaining the musical warmth and dimensional soundstage that defines quality tube amplification."
        ],
        colors: [
            { hex: '#1A1A1A', name: 'Black' },
            { hex: '#C0C0C0', name: 'Silver' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/roer_forstaerkere/jolida_JD502b.jpg',
                alt: 'Jolida JD502B KT88 Tube Integrated Amplifier'
            }
        ],
        specifications: [
            { label: 'Output Power', value: '60W × 2 ultralinear / 30W × 2 triode' },
            { label: 'Frequency Response', value: '12Hz - 60kHz (-3dB)' },
            { label: 'THD', value: '<0.3% at 40W' },
            { label: 'Signal-to-Noise', value: '>90dB' },
            { label: 'Valve Complement', value: '4× KT88, 2× 12AX7, 2× 12AT7' },
            { label: 'Inputs', value: '5× line-level RCA' },
            { label: 'Output Impedance', value: '4 and 8 Ohm taps' },
            { label: 'Dimensions (H×W×D)', value: '220 × 420 × 380mm' },
            { label: 'Weight', value: '28kg' },
            { label: 'Operation Mode', value: 'Switchable triode/ultralinear' }
        ]
    },
    {
        title: 'Jolida JD202A Tube Integrated',
        brand: 'Jolida',
        category: 'Tube Amplifiers',
        price: 79000,
        stock: 6,
        descriptions: [
            'The Jolida JD202A offers a compelling entry point into EL34 tube amplification, delivering 40 watts per channel at a price that undercuts many respected solid-state integrateds. The simplified circuit topology—two gain stages before the output valves—minimises signal degradation while the robust construction ensures years of reliable service. The warm, romantic sound signature works particularly well with bright-sounding modern speakers, adding body and dimensionality that transforms the listening experience.',
            'Represents outstanding value in the tube integrated category. Perfect for those exploring vacuum tube sound for the first time.'
        ],
        colors: [
            { hex: '#1A1A1A', name: 'Black' },
            { hex: '#C0C0C0', name: 'Silver' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/roer_forstaerkere/jolida_JD202a.jpg',
                alt: 'Jolida JD202A Budget Tube Integrated'
            }
        ],
        specifications: [
            { label: 'Output Power', value: '40W × 2 Class AB push-pull' },
            { label: 'Frequency Response', value: '20Hz - 35kHz (-3dB)' },
            { label: 'THD', value: '<1% at rated power' },
            { label: 'Signal-to-Noise', value: '>82dB' },
            { label: 'Valve Complement', value: '4× EL34, 2× 12AX7' },
            { label: 'Inputs', value: '4× line-level RCA' },
            { label: 'Output Impedance', value: '4 and 8 Ohm taps' },
            { label: 'Dimensions (H×W×D)', value: '190 × 340 × 300mm' },
            { label: 'Weight', value: '18kg' },
            { label: 'Bias', value: 'Fixed (auto-bias)' }
        ]
    },
    {
        title: 'Jolida JD300B SET Amplifier',
        brand: 'Jolida',
        category: 'Tube Amplifiers',
        price: 329000,
        stock: 2,
        descriptions: [
            'The Jolida JD300B honours the legendary Western Electric 300B directly-heated triode in a refined single-ended Class A design that prioritises midrange purity above all other considerations. Each channel produces 8 watts of the cleanest, most harmonically-natural power available—an output level that demands high-efficiency loudspeakers (93dB+ sensitivity) but rewards the commitment with a midrange transparency and three-dimensional imaging that no push-pull design can quite match. The hand-wound output transformers use premium M6 silicon steel cores and interleaved windings for extended bandwidth.',
            'For the SET devotee seeking the 300B experience without bespoke pricing. Requires careful speaker matching but delivers world-class results with appropriate partners.'
        ],
        colors: [
            { hex: '#1A1A1A', name: 'Black' },
            { hex: '#B8860B', name: 'Gold' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/roer_forstaerkere/jolida_JD300b.jpg',
                alt: 'Jolida JD300B Single-Ended Triode Amplifier'
            }
        ],
        specifications: [
            { label: 'Output Power', value: '8W × 2 Class A single-ended' },
            { label: 'Frequency Response', value: '20Hz - 45kHz (-3dB)' },
            { label: 'THD', value: '<2% at 6W' },
            { label: 'Signal-to-Noise', value: '>80dB' },
            { label: 'Valve Complement', value: '2× 300B, 2× 12AX7, 1× 5AR4 rectifier' },
            { label: 'Inputs', value: '3× line-level RCA' },
            { label: 'Output Impedance', value: '4 and 8 Ohm taps' },
            { label: 'Dimensions (H×W×D)', value: '210 × 360 × 350mm' },
            { label: 'Weight', value: '22kg' },
            { label: 'Recommended Speakers', value: '93dB+ sensitivity' }
        ]
    },
    {
        title: 'Creek Classic DVD Player',
        brand: 'Creek',
        category: 'DVD Players',
        price: 69000,
        stock: 4,
        descriptions: [
            "The Creek Classic DVD player extends Creek's audio expertise to video disc playback, prioritising sound quality without neglecting picture performance. The dedicated two-channel audio board features Creek's signature analog output stage with quality film capacitors and discrete transistors, ensuring CD and DVD-Audio playback rivals dedicated audio players. Video processing employs Faroudja DCDi deinterlacing for smooth, film-like motion rendering from interlaced sources.",
            'A sensible choice for systems where DVD playback is occasional but audio quality cannot be compromised. Excellent CD transport functionality via the digital output.'
        ],
        colors: [
            { hex: '#C0C0C0', name: 'Silver' },
            { hex: '#1A1A1A', name: 'Black' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/dvdafspillere/creek_classic.jpg',
                alt: 'Creek Classic DVD Player'
            }
        ],
        specifications: [
            { label: 'Video Outputs', value: 'Component, S-Video, composite' },
            { label: 'Audio DAC', value: '24-bit/192kHz stereo' },
            { label: 'Audio Outputs', value: 'Stereo RCA, digital coaxial' },
            { label: 'Video Processing', value: 'Faroudja DCDi deinterlacing' },
            { label: 'Supported Formats', value: 'DVD-Video, DVD-Audio, CD, MP3' },
            { label: 'Frequency Response', value: '20Hz - 20kHz (±0.5dB)' },
            { label: 'Signal-to-Noise', value: '>100dB (A-weighted)' },
            { label: 'Dimensions (H×W×D)', value: '70 × 430 × 280mm' },
            { label: 'Weight', value: '4.2kg' },
            { label: 'Remote', value: 'Full-function included' }
        ]
    },
    {
        title: 'Parasound D200 Universal Player',
        brand: 'Parasound',
        category: 'DVD Players',
        price: 59000,
        stock: 5,
        descriptions: [
            'The Parasound D200 delivers versatile disc playback with particular attention to audio performance, incorporating a premium Burr-Brown DAC section typically found in dedicated CD players. Progressive scan output and quality video processing ensure excellent picture quality from DVD-Video content, while the audiophile-grade analog outputs reveal SACD and DVD-Audio with impressive resolution. The robust build quality and thoughtful feature set make the D200 an excellent all-in-one disc solution.',
            'Ideal for systems where space or budget constraints preclude separate CD and DVD players. The analog audio outputs genuinely satisfy audiophile expectations.'
        ],
        colors: [
            { hex: '#1A1A1A', name: 'Black' },
            { hex: '#C0C0C0', name: 'Silver' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/dvdafspillere/parasound_d200.jpg',
                alt: 'Parasound D200 Universal Disc Player'
            }
        ],
        specifications: [
            { label: 'Video Outputs', value: 'HDMI, component, composite' },
            { label: 'Audio DAC', value: 'Burr-Brown 24-bit/192kHz' },
            { label: 'Audio Outputs', value: '5.1 analog, stereo RCA, digital' },
            { label: 'Supported Formats', value: 'DVD-V, DVD-A, SACD, CD, HDCD' },
            { label: 'HDMI', value: 'Version 1.3 with 1080p upscaling' },
            { label: 'Frequency Response', value: '20Hz - 20kHz (±0.3dB)' },
            { label: 'Signal-to-Noise', value: '>105dB (A-weighted)' },
            { label: 'Dimensions (H×W×D)', value: '85 × 430 × 305mm' },
            { label: 'Weight', value: '4.8kg' },
            { label: 'Remote', value: 'Universal learning remote' }
        ]
    },
    {
        title: 'Exposure 2010S DVD Player',
        brand: 'Exposure',
        category: 'DVD Players',
        price: 89000,
        stock: 3,
        descriptions: [
            "The Exposure 2010S DVD extends the acclaimed 2010S series to include video playback, maintaining Exposure's focus on musical performance in a versatile disc player. The substantial discrete analog output stage derives directly from Exposure's integrated amplifier designs, providing the current capability and low output impedance necessary for optimal cable driving performance. The transport mechanism offers excellent error correction for reliable playback of imperfect discs.",
            'An excellent choice for systems where the DVD player doubles as primary CD source. British engineering ensures long-term reliability and consistent performance.'
        ],
        colors: [
            { hex: '#1A1A1A', name: 'Black' },
            { hex: '#C0C0C0', name: 'Silver' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/dvdafspillere/exposure_2010S.jpg',
                alt: 'Exposure 2010S DVD Player'
            }
        ],
        specifications: [
            { label: 'Video Outputs', value: 'Component, S-Video, composite' },
            { label: 'Audio DAC', value: '24-bit/96kHz' },
            { label: 'Audio Outputs', value: 'Stereo RCA, coaxial digital' },
            { label: 'Supported Formats', value: 'DVD-Video, CD, CD-R/RW' },
            { label: 'Video Processing', value: 'Progressive scan' },
            { label: 'Frequency Response', value: '20Hz - 20kHz (±0.5dB)' },
            { label: 'Signal-to-Noise', value: '>100dB (A-weighted)' },
            { label: 'Dimensions (H×W×D)', value: '85 × 440 × 300mm' },
            { label: 'Weight', value: '5.0kg' },
            { label: 'Finish', value: 'Black or silver' }
        ]
    },
    {
        title: 'Parasound Halo D3 Universal Player',
        brand: 'Parasound',
        category: 'DVD Players',
        price: 149000,
        stock: 3,
        descriptions: [
            "The Parasound Halo D3 represents the company's flagship statement in universal disc playback, combining reference-class video processing with John Curl-designed analog audio stages. Premium Burr-Brown PCM1792 DACs deliver exceptional resolution from CD, SACD, and DVD-Audio sources, while balanced XLR outputs ensure the signal reaches external amplification with maximum integrity. HDMI 1.3 with 1080p upscaling provides stunning picture quality from standard-definition DVDs, and the heavy machined aluminium chassis minimises vibration-induced artifacts.",
            'The D3 serves as a genuine high-end source component for both audio and video systems. Its balanced analog outputs are particularly recommended for critical listening.'
        ],
        colors: [
            { hex: '#1A1A1A', name: 'Black' },
            { hex: '#C0C0C0', name: 'Silver' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/dvdafspillere/parasound_halod3.jpg',
                alt: 'Parasound Halo D3 Reference Universal Player'
            }
        ],
        specifications: [
            { label: 'Video Outputs', value: 'HDMI 1.3, component' },
            { label: 'Audio DAC', value: 'Burr-Brown PCM1792 (dual)' },
            { label: 'Audio Outputs', value: '7.1 RCA, stereo XLR, stereo RCA' },
            { label: 'Supported Formats', value: 'DVD-A, SACD, CD, DVD-V, HDCD' },
            { label: 'HDMI', value: 'Version 1.3 with full resolution audio' },
            { label: 'THD', value: '<0.0008% (stereo analog)' },
            { label: 'Signal-to-Noise', value: '>115dB (A-weighted)' },
            { label: 'Dimensions (H×W×D)', value: '105 × 445 × 380mm' },
            { label: 'Weight', value: '8.2kg' },
            { label: 'Chassis', value: 'Machined aluminium, isolated transport' }
        ]
    },
    {
        title: 'Pro-Ject Debut III (Black)',
        brand: 'Pro-Ject',
        category: 'Turntables',
        price: 39900,
        stock: 10,
        descriptions: [
            'The Pro-Ject Debut III has achieved legendary status as the turntable that introduced a generation of music lovers to the magic of vinyl playback. The heavy 300mm steel platter, driven by a precision-ground belt from a low-vibration synchronous motor, provides exceptional speed stability and silent operation. The high-mass MDF plinth is bonded with a resonance-damping compound that eliminates the hollow coloration plaguing lesser turntables. Pre-fitted with the Ortofon OM 5E cartridge, the Debut III delivers satisfying performance straight from the box.',
            'The perfect first serious turntable for vinyl newcomers or anyone seeking honest high-fidelity analogue playback at a sensible price.'
        ],
        colors: [{ hex: '#1A1A1A', name: 'Black' }],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/pladespillere/Pro_ject_Debut_3_bl.jpg',
                alt: 'Pro-Ject Debut III Turntable in High-Gloss Black'
            }
        ],
        specifications: [
            { label: 'Drive System', value: 'Belt drive, AC synchronous motor' },
            { label: 'Speeds', value: '33⅓ and 45 RPM (manual change)' },
            { label: 'Platter', value: '300mm pressed steel, felt mat' },
            { label: 'Tonearm', value: '8.6" aluminium, 7g effective mass' },
            { label: 'Cartridge', value: 'Ortofon OM 5E (pre-fitted)' },
            { label: 'Wow & Flutter', value: '<0.10%' },
            { label: 'Signal-to-Noise', value: '>68dB' },
            { label: 'Dimensions (H×W×D)', value: '118 × 415 × 320mm' },
            { label: 'Weight', value: '5.6kg' },
            { label: 'Included', value: 'Dust cover, phono cable' }
        ]
    },
    {
        title: 'Pro-Ject Debut III (Red)',
        brand: 'Pro-Ject',
        category: 'Turntables',
        price: 39900,
        stock: 6,
        descriptions: [
            'The Pro-Ject Debut III in high-gloss red brings contemporary style to the acclaimed Debut platform without altering its proven sonic formula. The striking lacquer finish is applied in multiple coats and hand-polished to a mirror shine, transforming the turntable into a statement piece that demands attention in any room. Beneath the glamorous exterior, the same precision engineering—low-resonance plinth, synchronous motor, and carefully-calibrated tonearm—delivers the musically-engaging performance that has earned the Debut III worldwide acclaim.',
            'For the design-conscious music lover who refuses to compromise on either aesthetics or sound quality. Makes a striking centrepiece for modern interiors.'
        ],
        colors: [{ hex: '#CC0000', name: 'Red' }],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/pladespillere/Pro_ject_Debut_III_red_1.jpg',
                alt: 'Pro-Ject Debut III Turntable in High-Gloss Red'
            }
        ],
        specifications: [
            { label: 'Drive System', value: 'Belt drive, AC synchronous motor' },
            { label: 'Speeds', value: '33⅓ and 45 RPM (manual change)' },
            { label: 'Platter', value: '300mm pressed steel, felt mat' },
            { label: 'Tonearm', value: '8.6" aluminium, 7g effective mass' },
            { label: 'Cartridge', value: 'Ortofon OM 5E (pre-fitted)' },
            { label: 'Wow & Flutter', value: '<0.10%' },
            { label: 'Signal-to-Noise', value: '>68dB' },
            { label: 'Dimensions (H×W×D)', value: '118 × 415 × 320mm' },
            { label: 'Weight', value: '5.6kg' },
            { label: 'Finish', value: 'Multi-coat high-gloss lacquer' }
        ]
    },
    {
        title: 'Pro-Ject Debut III (Yellow)',
        brand: 'Pro-Ject',
        category: 'Turntables',
        price: 39900,
        stock: 4,
        descriptions: [
            "The Pro-Ject Debut III in vibrant yellow challenges the notion that serious audio equipment must be visually conservative. This eye-catching finish, applied with the same multi-coat lacquer process used in automotive applications, makes an unmistakable statement while the underlying engineering remains true to Pro-Ject's performance-first philosophy. The contrast between the brilliant yellow plinth and the black tonearm creates a striking visual that photographs beautifully for social media sharing.",
            'Perfect for creative spaces, recording studios, or anyone who believes audio equipment should express personality as well as performance.'
        ],
        colors: [{ hex: '#FFD700', name: 'Yellow' }],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/pladespillere/Pro_ject_Debut_III_yellow_1.jpg',
                alt: 'Pro-Ject Debut III Turntable in High-Gloss Yellow'
            }
        ],
        specifications: [
            { label: 'Drive System', value: 'Belt drive, AC synchronous motor' },
            { label: 'Speeds', value: '33⅓ and 45 RPM (manual change)' },
            { label: 'Platter', value: '300mm pressed steel, felt mat' },
            { label: 'Tonearm', value: '8.6" aluminium, 7g effective mass' },
            { label: 'Cartridge', value: 'Ortofon OM 5E (pre-fitted)' },
            { label: 'Wow & Flutter', value: '<0.10%' },
            { label: 'Signal-to-Noise', value: '>68dB' },
            { label: 'Dimensions (H×W×D)', value: '118 × 415 × 320mm' },
            { label: 'Weight', value: '5.6kg' },
            { label: 'Finish', value: 'Multi-coat high-gloss lacquer' }
        ]
    },
    {
        title: 'Pro-Ject RPM 5 Carbon',
        brand: 'Pro-Ject',
        category: 'Turntables',
        price: 89000,
        stock: 5,
        descriptions: [
            "The Pro-Ject RPM 5 Carbon introduces Pro-Ject's distinctive inverted bearing design and skeletal plinth architecture to the mid-price turntable category. The heavy acrylic platter sits on an inverted precision bearing—with the ball at the bottom and the cup at the top—for superior speed stability and reduced rumble. The 9-inch carbon-fibre tonearm offers exceptional rigidity with minimal effective mass, tracking groove modulations with finesse that reveals subtle musical details. The open-frame plinth eliminates the resonant surface area that colours the sound of conventional designs.",
            'The RPM 5 represents a significant performance upgrade from entry-level turntables, revealing musical layers that lesser designs simply cannot extract from the groove.'
        ],
        colors: [
            { hex: '#1A1A1A', name: 'Black' },
            { hex: '#F5F5F5', name: 'White' }
        ],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/pladespillere/Pro_ject_rpm_5.jpg',
                alt: 'Pro-Ject RPM 5 Carbon Turntable'
            }
        ],
        specifications: [
            { label: 'Drive System', value: 'Belt drive, DC motor with generator' },
            { label: 'Speeds', value: '33⅓ and 45 RPM (electronic change)' },
            { label: 'Platter', value: 'Acrylic, 1.7kg' },
            { label: 'Tonearm', value: '9" carbon fibre, 8.5g effective mass' },
            { label: 'Bearing', value: 'Inverted stainless steel/ceramic' },
            { label: 'Wow & Flutter', value: '<0.05%' },
            { label: 'Signal-to-Noise', value: '>72dB' },
            { label: 'Dimensions (H×W×D)', value: '150 × 395 × 350mm' },
            { label: 'Weight', value: '5.5kg (without platter)' },
            { label: 'Cartridge', value: 'Not included (upgradeable)' }
        ]
    },
    {
        title: 'Pro-Ject RPM 10 Carbon',
        brand: 'Pro-Ject',
        category: 'Turntables',
        price: 249000,
        stock: 2,
        descriptions: [
            "The Pro-Ject RPM 10 Carbon represents Pro-Ject's statement in high-end analogue playback, incorporating technologies trickled down from their reference Audio Systems designs. The revolutionary magnetic bearing suspends the 4kg vinyl/aluminium sandwich platter with zero physical contact, completely eliminating bearing friction and the rumble it produces. The 10-inch carbon-aluminium tonearm provides exceptional tracking ability across the entire record surface, while the inverted motor mounting and dual-belt drive ensure speed stability that approaches the theoretical limits of belt-drive technology.",
            'For the committed vinyl enthusiast seeking reference-class performance without the extreme pricing of bespoke designs. Rewards premium cartridge investment.'
        ],
        colors: [{ hex: '#1A1A1A', name: 'Black' }],
        images: [
            {
                url: 'https://ogio6p9evtq9owhw.public.blob.vercel-storage.com/products/pladespillere/Pro_ject_rpm10.jpg',
                alt: 'Pro-Ject RPM 10 Carbon Reference Turntable'
            }
        ],
        specifications: [
            { label: 'Drive System', value: 'Belt drive, precision DC motor' },
            { label: 'Speeds', value: '33⅓ and 45 RPM (electronic)' },
            { label: 'Platter', value: 'Vinyl/aluminium sandwich, 4kg' },
            { label: 'Tonearm', value: '10" carbon-aluminium, 9g effective mass' },
            { label: 'Bearing', value: 'Magnetic suspension (non-contact)' },
            { label: 'Wow & Flutter', value: '<0.02%' },
            { label: 'Signal-to-Noise', value: '>80dB' },
            { label: 'Dimensions (H×W×D)', value: '180 × 460 × 360mm' },
            { label: 'Weight', value: '11kg (complete)' },
            { label: 'Recommended Cartridge', value: 'High-compliance MC or MM' }
        ]
    }
]

async function seed() {
    // biome-ignore lint/suspicious/noConsole: seed script needs output
    console.log('starting seed...')

    for (const product of seedProducts) {
        // biome-ignore lint/suspicious/noConsole: seed script needs output
        console.log(`creating: ${product.title}`)

        const [insertedProduct] = await db
            .insert(products)
            .values({
                title: product.title,
                brand: product.brand,
                category: product.category,
                price: product.price,
                stock: product.stock
            })
            .returning()

        if (!insertedProduct) {
            console.error(`failed to insert product: ${product.title}`)
            continue
        }

        await db.insert(productDescriptions).values(
            product.descriptions.map((content, index) => ({
                productId: insertedProduct.id,
                content,
                sortOrder: index
            }))
        )

        await db.insert(productColors).values(
            product.colors.map(color => ({
                productId: insertedProduct.id,
                hex: color.hex,
                name: color.name
            }))
        )

        await db.insert(productImages).values(
            product.images.map(img => ({
                productId: insertedProduct.id,
                url: img.url,
                alt: img.alt
            }))
        )

        if (product.specifications.length > 0) {
            await db.insert(productSpecifications).values(
                product.specifications.map(spec => ({
                    productId: insertedProduct.id,
                    label: spec.label,
                    value: spec.value
                }))
            )
        }
    }

    // biome-ignore lint/suspicious/noConsole: seed script needs output
    console.log('seed completed successfully!')
    // biome-ignore lint/suspicious/noConsole: seed script needs output
    console.log(`total products: ${seedProducts.length}`)
    process.exit(0)
}

seed().catch(err => {
    console.error('seed failed:', err)
    process.exit(1)
})

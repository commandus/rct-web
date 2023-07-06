export class Symbol {
    public id = 0;
    public sym = "";
    public description = "";
    public unit = "";
    public pow10 = 0;                            ///< power of 10

    private static prefixes: string[] = [
        "",
        "к",    // kilo - start here
        "М",    // mega
        "Г",    // giga
        "Т",    // tera
        "П",
        "Е",
        "З",
        "И",
        "Р",
        "Кв"
    ];
    
    private static prefixesPart: string[] = [
        "",
        "м",    // milli
        "мк",   // micro - start here
        "н",    // nano
        "п",    // pico
        "ф",    // femto
        "а",
        "з",
        "и",
        "р",
        "кв"
    ];

    private static unitNames: string[] = [
        "Ф",    // C Емкость -12
        "Гн",   // L Индуктивность -12
        "Ом",   // R Сопроствление 0
        "А",    // Ток 0
        "В",    // Напряжение 0
        "Вт"    // Мощность 0
    ];

    private static measurePow10 = [
        -12,    // C Емкость -12
        -12,    // L Индуктивность -12
        0,      // R Сопроствление 0
        0,      // Ток 0
        0,      // Напряжение 0
        0       // Мощность 0
    ];

    private static pow10table = [ 1n, 10n, 100n, 1000n, 10000n, 100000n, 1000000n, 10000000n,
        100000000n, 1000000000n, 10000000000n, 100000000000n, 1000000000000n ];
    
    private static val1000(value: bigint, initialPow10: number): string {
        let v: bigint = value;
        const initialPowIdx = initialPow10 / 3;
        for (let i = 0; i < 11; i++) {
            if (v < 1000) {
                let idx = i + initialPowIdx;
                if (idx >= 0)
                    return v + ' ' + Symbol.prefixes[idx];
                else
                    return v + ' ' + Symbol.prefixesPart[-idx];
            }
            v /= 1000n;
        }
        return "";
    }
    
    
    public static nominal2string(
        symbol: string, 
        value: string
    ) : string {
        const b = BigInt.asUintN(64, BigInt(value));
        switch(symbol) {
            case 'C':
                return Symbol.val1000(b, -12) + 'Ф';
            case 'F':
                return Symbol.val1000(b, 0) + 'А';
            case 'G':
                return Symbol.val1000(b, 0) + 'В';
            case 'L':
                return Symbol.val1000(b, -12) + 'Гн';
            case 'M':
                return Symbol.val1000(b, 0) + 'Вт';
            case 'Q':
                return Symbol.val1000(b, 0) + 'А';
            case 'R':
                return Symbol.val1000(b, 0) + 'Ом';
            case 'S':
                return Symbol.val1000(b, 0) + 'А';
            case 'T':
                return Symbol.val1000(b, 0) + 'Вт';
            default:
        }
        return b.toString();
    }

    static string2nominal(
        symbol: string,
        value: string
    ): bigint
    {
        const eolp = value.length;
        let start = 0;
        let finish = eolp;

        // skip spaces if exists
        for (let p = start; p < eolp; p++) {
            if (!(value[p] == ' ')) {
                start = p;
                break;
            }
        }
        // try read nominal
        for (let p = start; p < eolp; p++) {
            if (!(value[p] >= '0' && value[p] <= '9')) {
                finish = p;
                break;
            }
        }

        if (!(finish > start))
            return 0n;
        let nominal = BigInt.asUintN(64, BigInt(value.substring(start, finish)));

        start = finish;

        // skip spaces if exists
        for (let p = start; p < eolp; p++) {
            if (!(value[p] == ' ')) {
                finish = p;
                break;
            }
        }

        // try find out measure unit and prefixes
        // try to find out prefix
        start = finish;
        let idx = -1;
        for (let pf = 1; pf < 11; pf++) {
            if (value.indexOf(Symbol.prefixes[pf], start) == start) {
                // found prefix
                finish = start + Symbol.prefixes[pf].length;
                idx = pf;
                break;
            }
        }

        let pow10Index = 0;
        const hasPrefix = finish > start;
        if (hasPrefix) {
            pow10Index = idx;
        } else {
            // try to find out prefixPart
            for (let pf = 2; pf < 11; pf++) {
                if (value.indexOf(Symbol.prefixesPart[pf], start) == start) {
                    // found prefix
                    finish = start + Symbol.prefixesPart[pf].length;
                    idx = pf;
                    break;
                }
            }
        }
        const hasPrefixPart = !hasPrefix && (finish > start);
        if (hasPrefixPart) {
            pow10Index = - idx;
        }

        // try to find out unit
        start = finish;
        for (let ui = 0; ui < 6; ui++) {
            if (value.indexOf(Symbol.unitNames[ui], start) == start) {
                // found unit name
                finish = start + Symbol.unitNames[ui].length;
                let dp = - Symbol.measurePow10[ui] + pow10Index * 3;
                if (dp < 0)
                    nominal /= Symbol.pow10table[- dp];
                else
                    nominal *= Symbol.pow10table[dp];
                break;
            }
        }
        return nominal;
    }
}

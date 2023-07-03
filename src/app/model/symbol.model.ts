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
            case 'L:':
                return Symbol.val1000(b, -12) + 'Гн';
            case 'R':
                return Symbol.val1000(b, 0) + 'Ом';
            default:
        }
        return '';
    }

}

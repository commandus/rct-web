import { Card } from "./card.model";

export class Symbol {
    public id = 0;
    public sym = '';
    public description = '';
    public unit = '';
    public pow10 = 0;                            ///< power of 10

    constructor(value: any = {}) {
        this.reset();
        try {
          let v;
          if (typeof value == 'string') {
                v = JSON.parse(value);
          } else {
              v = value;
          }
          if (typeof v !== 'undefined') {
              this.assign(v);
          }
        } catch (error) {
          
        }
    }

    public assign(value: object): any {
        if (typeof value !== 'undefined') {
            Object.assign(this, value);
        }
    }
  
    private reset() {
        this.id = 0;
        this.sym = '';
        this.description = '';
        this.unit = '';
        this.pow10 = 0;                            ///< power of 10
    }

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
        "Ом",   // R Сопротивление 0
        "А",    // Ток 0
        "В",    // Напряжение 0
        "Вт"    // Мощность 0
    ];

    public static componentUnitNameS(component: string): string
    {
        const c = component.charAt(0);
        switch (c) {
            case 'C':
                return Symbol.unitNames[0];
            case 'F':
            case 'Q':
            case 'S':
                return Symbol.unitNames[3];
            case 'G':
                return Symbol.unitNames[4];
            case 'L':
                return Symbol.unitNames[1];
            case 'M':
            case 'T':
                return Symbol.unitNames[5];
            case 'R':
                return Symbol.unitNames[2];
        }
        return '';
    };

    private static addUnitName(unit: string, value: string[]) : string[] {
        let r: string[] = [];
        value.forEach(e => {
            r.push(e + unit);
        });
        return r;
    }

    public static componentPrefix(componentNumber: number): string[]
    {
        const u = Symbol.componentUnitName(componentNumber);
        if (componentNumber == 18)
            return Symbol.addUnitName(u, this.prefixes);
        else
            if ((componentNumber == 3) || (componentNumber == 12) || (componentNumber == 19))
                return Symbol.addUnitName(u, this.prefixesPart);
            else
                return [u];

    }

    private static componentUnitIndex(componentNumber: number): number
    {
        // ABCDEFGHIJKLMNOPQRSTUVWXYZ
        // 12345678901234567890123456
        //          1         2
        let idx = -1;
        if (componentNumber == 3)
            idx = 0;
        else
            if ((componentNumber == 6) || (componentNumber == 17) || (componentNumber == 19))
                idx = 3;
            else
                if (componentNumber == 7)
                    idx = 3;
                else
                    if (componentNumber == 12)
                        idx = 1;
                    else
                        if ((componentNumber == 13) || (componentNumber == 20))
                            idx = 5;
                        else
                            if (componentNumber == 18)
                                idx = 2;
        return idx;
    }

    public static componentUnitName(componentNumber: number): string
    {
        const idx = Symbol.componentUnitIndex(componentNumber);
        if (idx >= 0)
            return Symbol.unitNames[idx];
        else
            return '';
    }

    private static measurePow10 = [
        -12,    // C Емкость -12
        -12,    // L Индуктивность -12
        0,      // R Сопротивление 0
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
                    return v + Symbol.prefixes[idx];
                else
                    return v + Symbol.prefixesPart[-idx];
            }
            v /= 1000n;
        }
        return "";
    }

    public static nominal2stringById(
        symbol_id: number, 
        value: string
    ) : string {
        const idx = Symbol.componentUnitIndex(symbol_id);
        if (idx < 0)
            return '';
        const b = BigInt.asUintN(64, BigInt(value));
        return Symbol.val1000(b, Symbol.measurePow10[idx]) + Symbol.unitNames[idx];
    }

    private static componentById(id: number): string {
        if (id < 1 || id > 26)
            return '';
        return String.fromCharCode(id + 64); // ASCII 'A' = 65
    }

    private static componentIdByname(c: string): number {
        if (!c || c.length > 1)
            return -1;
        const u = c.toUpperCase();
        const r = u.charCodeAt(0) - 64;    // ASCII 'A' = 65
        if (r < 1 || r > 26)
            return -1;
        return r;
    }

    public static nominal2string(
        symbol: string, 
        value: string
    ) : string {

        const sid = Symbol.componentIdByname(symbol);
        if (sid < 0)
            return '';
        return Symbol.nominal2stringById(sid, value);
    }

    public static nameOrNominal(card: Card) : string
    {
        const idx = Symbol.componentUnitIndex(card.symbol_id);
        if (idx < 0)
            return card.name;
        return Symbol.nominal2stringById(card.symbol_id, card.nominal);
    }

    public static string2nominal(
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

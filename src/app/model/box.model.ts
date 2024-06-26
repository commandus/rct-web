export class Box {
    public id = 0;                              ///< in chBox() reserved for '=' operation when a new box assigned
    public box_id = 0n;                         ///< uint64 repesented as string
    public name = '';
    public uname = '';                          ///< uppercase name for search
    // angular
    public box_id_name = '';

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
        this.box_id = 0n;                       ///< uint64 repesented as string
        this.name = '';
        this.uname = '';                        ///< uppercase name for search
        this.box_id_name = '';
    }

    public empty() {
        return this.box_id == 0n;
    }

    private static getBoxDepth(boxes: bigint) {
        let boxCnt = 0;
        if (boxes & 0xffffn)
            boxCnt = 4;
        else
        if (boxes & 0xffff0000n)
            boxCnt = 3;
        else
        if (boxes & 0xffff00000000n)
            boxCnt = 2;
        else
        if (boxes & 0xffff000000000000n)
            boxCnt = 1;
        return boxCnt;
    }

    /**
     * Return string representation of the box path
     * @param boxes box identifier e.g. '35747326337220608'
     * @returns '127-1'
     */
    public static box2string(
        boxes: string
    ): string 
    {
        const b = BigInt.asUintN(64, BigInt(boxes));
        return Box.boxBigint2string(b);
    }

    /**
     * Return string representation of the box path
     * @param boxes box identifier e.g. '35747326337220608'
     * @returns '127-1'
     */
    public static boxBigint2string(
        b: bigint | string
    ): string
    {
        if (typeof(b) == 'string')
            b = BigInt.asUintN(64, BigInt(b));    
        let ss = "";
        let shift = 6n * 8n;
        ss += (b >> shift);
        for (let i = Box.getBoxDepth(b); i > 1; i--) {
            shift -= 16n;
            ss += '-' + ((b >> shift) & 0xffffn);
        }
        if (ss == '0')
            ss = '';
        return ss;
    }

    /**
     * Return box identifier from the box path
     * @param value string representation of the box path e.g. '127-1'
     * @returns box identifier e.g. '35747326337220608'
     */
    static string2box(
        value: string
    ): string {
        let retBoxes = 0n;
        
        // skip spaces if exists
        let s = 0;
    
        let blocks = 0;
        for (let block = 0; block < 4; block++) {
            let f = value.length;
            // skip separator(s)
            for (let p = s; p < f; p++) {
                const c = value.substring(p, p + 1);
                if (c >= '0' && c <= '9') {
                    s = p;
                    break;
                }
            }
            // find out end of the number block
            for (let p = s; p < f; p++) {
                const c = value.substring(p, p + 1);
                if (!(c >= '0' && c <= '9')) {
                    f = p;
                    break;
                }
            }
            // nothing found
            if (f <= s)
                break;
            // has box number, try to read
            let sv = value.substring(s, f);
            const b = BigInt(sv);
            retBoxes |= (b & 0xffffn) << BigInt(((3 - block) * 16));
            blocks++;
            s = f;
        }
        return retBoxes.toString();
    }

        /**
     * Return box identifier from the box path
     * @param value string representation of the box path e.g. '127-1'
     * @returns box identifier e.g. '35747326337220608'
     */
    static string2boxBigint(
        value: string
    ): bigint {
        let retBoxes = 0n;
        
        // skip spaces if exists
        let s = 0;
    
        let blocks = 0;
        for (let block = 0; block < 4; block++) {
            let f = value.length;
            // skip separator(s)
            for (let p = s; p < f; p++) {
                const c = value.substring(p, p + 1);
                if (c >= '0' && c <= '9') {
                    s = p;
                    break;
                }
            }
            // find out end of the number block
            for (let p = s; p < f; p++) {
                const c = value.substring(p, p + 1);
                if (!(c >= '0' && c <= '9')) {
                    f = p;
                    break;
                }
            }
            // nothing found
            if (f <= s)
                break;
            // has box number, try to read
            let sv = value.substring(s, f);
            const b = BigInt(sv);
            retBoxes |= (b & 0xffffn) << BigInt(((3 - block) * 16));
            blocks++;
            s = f;
        }
        return retBoxes;
    }
    
}

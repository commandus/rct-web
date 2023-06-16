export class Box {
    public id = 0;                          ///< in chBox() reserved for '=' operation when a new box assigned
    public box_id = "";                     ///< uint64 repesented as string
    public name = "";
    public uname = "";                       ///< uppercase name for search
    // angular
    public box_id_name = "";

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


    public static box2string(
        boxes: string
    ): string 
    {
        const b = BigInt.asUintN(64, BigInt(boxes));
        let ss = "";
        let shift = 6n * 8n;
        ss += (b >> shift);
        for (let i = Box.getBoxDepth(b); i > 1; i--) {
            shift -= 16n;
            ss += '-' + ((b >> shift) & 0xffffn);
        }
        return ss;
    }
}

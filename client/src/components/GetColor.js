const GetColor = (letter) => {

    const mapColor = {
        a : "#002e6e",
        b : "#00b9f1",
        c : "#4267b2",
        d : "#4a4a4a",
        e : "#506487",
        f : "#d34f59",
        g : "#ff9900",
        h : "#64943e",
        i : "#4fce5d",
        j : "#4285f4",
        k : "#435a64",
        l : "#1d7c48",
        m : "#00b359",
        n : "#5dcd11",
        o : "#665cac",
        p : "#cd201f",
        q : "#5f6368",
        r : "#26beff",
        s : "#f44747",
        t : "#0e68ce",
        u : "#3c4043",
        v : "#80868b",
        w : "#d89217",
        x : "#c0283a",
        y : "#ff1f57",
        z : "#160585"
    }

    return mapColor[letter]
}

export default GetColor

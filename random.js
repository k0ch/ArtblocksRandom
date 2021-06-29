const PERLIN_YWRAPB = 4;
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
const PERLIN_ZWRAPB = 8;
const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
const PERLIN_SIZE = 4095;
const PERLIN_OCTAVES = 4; // default to medium smooth
const PERLIN_AMP_FALLOFF = 0.5; // 50% reduction/octave
const RANDOM_DEC_PRECISION = 1000;

const scaled_cosine = i => 0.5 * (1.0 - Math.cos(i * Math.PI));

class RandomAB {

    constructor(seed)
    {
        // Seed must be a nonzero integer
        this.seed = seed;
        this.perlin = null;
    }

    random_decimal()
    {
        // Returns a value between [0, 1)
        this.seed ^= this.seed << 13;
        this.seed ^= this.seed >> 17;
        this.seed ^= this.seed << 5;
        return ((this.seed < 0 ? ~this.seed + 1 : this.seed) % RANDOM_DEC_PRECISION) / RANDOM_DEC_PRECISION;
    }

    random_between(a, b)
    {
        // Returns a value between [a, b)
        return a + (b - a) * this.random_decimal();
    }

    random_int(a, b)
    {
        // Returns an integer between [a, b]
        return Math.floor(this.random_between(a, b+1));
    }

    random_choice(x)
    {
        // Returns an element from list (x must be a list)
        return x[Math.floor(this.random_between(0, x.length * 0.99))];
    }

    noise(x, y) 
    {
        // Perlin noise function for 2 dimensions, based on p5js noise function
        // Receives x and y coordinates
        // Returns a value between (0, 1)

        if (this.perlin == null) {
            this.perlin = new Array(PERLIN_SIZE + 1);
            for (let i = 0; i < PERLIN_SIZE + 1; i++) {
                this.perlin[i] = this.random_decimal();
            }
        }

        if (x < 0) {
            x = -x;
        }
        if (y < 0) {
            y = -y;
        }

        let xi = Math.floor(x), yi = Math.floor(y);
        let xf = x - xi;
        let yf = y - yi;
        let rxf, ryf;

        let r = 0;
        let ampl = 0.5;

        let n1, n2, n3;

        for (let o = 0; o < PERLIN_OCTAVES; o++) {
            let of = xi + (yi << PERLIN_YWRAPB);

            rxf = scaled_cosine(xf);
            ryf = scaled_cosine(yf);

            n1 = this.perlin[of & PERLIN_SIZE];
            n1 += rxf * (this.perlin[(of + 1) & PERLIN_SIZE] - n1);
            n2 = this.perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
            n2 += rxf * (this.perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);

            of += PERLIN_ZWRAP;
            n2 = this.perlin[of & PERLIN_SIZE];
            n2 += rxf * (this.perlin[(of + 1) & PERLIN_SIZE] - n2);
            n3 = this.perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
            n3 += rxf * (this.perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);

            n1 += n2 - n1;

            r += n1 * ampl;
            ampl *= PERLIN_AMP_FALLOFF;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;

            if (xf >= 1.0) {
                xi++;
                xf--;
            }
            if (yf >= 1.0) {
                yi++;
                yf--;
            }
        }
        return r;
    }
}

module.exports = RandomAB;

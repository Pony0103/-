/**
 * 請參考 human.ts 的語法完成 Rational 類
 */
export class Rational {
    // todo: ...
    numerator: number;
    denominator: number;
    normalized: () => Rational;

    constructor(numerator: number, denominator: number) {
        if (denominator === 0) {
            throw new Error("分母不能為0");
        }
        this.numerator = numerator;
        this.denominator = denominator;
        this.normalized = () => {
            const gcd = this.getGCD(Math.abs(this.numerator), Math.abs(this.denominator));
            return new Rational(this.numerator / gcd, this.denominator / gcd);
        };
    }

    normalize(): Rational {
        return this.normalized();
    }

    private getGCD(a: number, b: number): number {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    equals(other: Rational): boolean {
        const r1 = this.normalize();
        const r2 = other.normalize();
        return r1.numerator === r2.numerator && r1.denominator === r2.denominator;
    }

    isWhole(): boolean {
        const normalized = this.normalize();
        if (normalized.denominator === 1) {
            return true;
        }
        return (normalized.numerator % normalized.denominator) === 0;
    }

    isDecimal(): boolean {
        return !this.isWhole();
    }

    toString(): string {
        return `${this.numerator}/${this.denominator}`;
    }

    static _parseRational(numerators: string[], denominators: string[]): Rational {
        const numeratorStr = numerators.join('');
        const denominatorStr = denominators.join('');
        return new Rational(parseInt(numeratorStr), parseInt(denominatorStr));
    }

    static parseRational(rationalStr: string): Rational {
        const [numerator, denominator] = rationalStr.split('/').map(Number);
        return new Rational(numerator, denominator);
    }
}
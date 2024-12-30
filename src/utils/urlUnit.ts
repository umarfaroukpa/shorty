// urlUnit.ts
export function someUtilityFunction(input: string): string {
    if (!input) {
        throw new Error('Invalid input');
    }
    return `Processed: ${input}`;
}

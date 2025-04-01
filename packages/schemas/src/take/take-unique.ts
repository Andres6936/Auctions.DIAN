export const takeUniqueOrThrow = <T>(values: T[], message: string): T => {
    if (values.length !== 1)
        throw new Error(`Found non unique or nonexistent value: ${message}`);
    return values[0]!;
}

export const takeMaybeUniqueOrThrow = <T>(values: T[], message: string): T | null => {
    if (values.length > 1)
        throw new Error(`Found non unique value: ${message}`);
    return values.at(0) || null;
}
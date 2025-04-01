const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
});

export const formatMoney = (value: number | string) =>
    typeof value === 'string' ? formatter.format(+value) : formatter.format(value)
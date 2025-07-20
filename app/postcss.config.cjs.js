module.exports = {
    plugins: {
        'postcss-preset-mantine': {},
        'postcss-simple-vars': {
            variables: {
                'mantine-breakpoint-xs': '600px',
                'mantine-breakpoint-sm': '768px',
                'mantine-breakpoint-md': '1024px',
                'mantine-breakpoint-lg': '1280px',
                'mantine-breakpoint-xl': '1440px',
            },
        },
    },
};
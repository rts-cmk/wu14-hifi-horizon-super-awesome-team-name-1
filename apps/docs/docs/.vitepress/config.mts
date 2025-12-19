import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'Dev Docs',
    description: 'Documentation for the Web and Backend monorepo',
    cleanUrls: true,
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Frontend', link: '/frontend' },
            { text: 'Backend', link: '/backend' }
        ],

        sidebar: [
            {
                text: 'Guide',
                items: [
                    { text: 'Introduction', link: '/' },
                    { text: 'Integration', link: '/integration' }
                ]
            },
            {
                text: 'Frontend',
                items: [{ text: 'Overview', link: '/frontend' }]
            },
            {
                text: 'Backend',
                items: [{ text: 'Overview', link: '/backend' }]
            }
        ],

        socialLinks: []
    }
})

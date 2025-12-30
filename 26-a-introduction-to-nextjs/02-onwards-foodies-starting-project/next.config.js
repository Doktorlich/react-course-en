/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mguu6lt2pkfx7hlh.public.blob.vercel-storage.com',
                port: '',
                pathname: '/**', // разрешить все пути
            },
            // Можно добавить другие домены
            {
                protocol: 'https',
                hostname: '**.public.blob.vercel-storage.com', // или с подстановкой
            },
        ],

    }
}

module.exports = nextConfig
BLOB_READ_WRITE_TOKEN=""
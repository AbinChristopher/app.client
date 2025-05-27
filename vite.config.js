import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

export default defineConfig(({ mode }) => {
    const isDev = mode === 'development';

    const config = {
        plugins: [plugin()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            proxy: {
                '^/weatherforecast': {
                    target: 'https://localhost:7113',
                    secure: false
                }
            },
            port: 60103
        }
    };

    if (isDev) {
        const baseFolder =
            env.APPDATA !== undefined && env.APPDATA !== ''
                ? `${env.APPDATA}/ASP.NET/https`
                : `${env.HOME}/.aspnet/https`;

        const certificateName = "app.client";
        const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
        const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

        if (!fs.existsSync(baseFolder)) {
            fs.mkdirSync(baseFolder, { recursive: true });
        }

        if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
            if (
                child_process.spawnSync(
                    'dotnet',
                    ['dev-certs', 'https', '--export-path', certFilePath, '--format', 'Pem', '--no-password'],
                    { stdio: 'inherit' }
                ).status !== 0
            ) {
                console.warn("Could not create certificate. Falling back to HTTP.");
            }
        }

        if (fs.existsSync(certFilePath) && fs.existsSync(keyFilePath)) {
            config.server.https = {
                key: fs.readFileSync(keyFilePath),
                cert: fs.readFileSync(certFilePath),
            };
        }
    }

    return config;
});
